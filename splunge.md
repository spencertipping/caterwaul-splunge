Splunge hierarchical ring charts | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Splunge constructs hierarchical ring charts and provides forward and backward transformations that allow you to easily map user actions to logical data elements. It then defines an interaction layer that
maps mouse events to zoom/pan/hover/select actions, which are exposed as jQuery events. This library uses the <canvas> element for rendering.

Data is specified functionally, which gives you a great deal of flexibility. In particular, it lets you (1) construct the data lazily (though the lazy process must be synchronous), (2) use custom
rendering and hit detection, and (3) process infinite data sets, provided that you use transformation derivatives to render only a finite portion.

## Quick example

You need to do two things to use Splunge. The first is to transform your data into functional form. This is normally a fairly trivial thing to do; for instance, suppose you are constructing an n-level
pie chart, where each data element is either an object that contains an arbitrary number that represents its relative size, or a string that is assumed to be sized uniformly:

    data = {name: 'foo', quantity: 5, children: [{name: 'bar', quantity: 4, children: ['x', 'y', 'z']},
                                                 {name: 'bif', quantity: 6, children: ['3', '4', '5']}]}

The fastest way to get this data into an interactive hierarchical ring chart is to use the ring_chart() function with a rectangular hierarchy projection:

    chart = ring_chart(rectangular_hierarchy({children: "_.children".qf,
                                              size:     "{x: 1, y: _.quantity || 1}".qf})),
    viewport = chart($('#my-canvas')).data(data)

## Data transformation and rendering

Let's start with the rectangular hierarchy transform we had from the last section:

    projection = rectangular_hierarchy({children: "_.children".qf,
                                        size:     "{x: 1, y: _.quantity || 1}".qf})

Now we need to render it to the screen. We could easily enough render it as rectangles like this:

    render = each(projection, draw(my_canvas.getContext('2d')))
             -where [draw(c)(node) = c.fillRect(node.bounds.x, node.bounds.y,
                                                node.bounds.x + node.bounds.dx, node.bounds.y + node.bounds.dy)]

Rendering this into arc space can be done using a combination of the axial arctangent transform and the ring transform. We'll also have to change our drawing method, since we want arcs instead of
rectangles to show up on the canvas:

    render = each_while(large_enough, compose(ring, arctangent_x, projection), draw(...))
             -where [large_enough(n) = n.bounds.dx * n.bounds.dy > 0.01,
                     draw(c)(node)   = c.beginPath() -then- c.save() -then- c.rotate(node.bounds.y) -then-
                                       c.moveTo(node.bounds.x, 0) -then- c.lineTo(node.bounds.x + node.bounds.dx, 0) -then-
                                       c.arc(0, 0, node.bounds.x + node.bounds.dx, 0, node.bounds.dy) -then-
                                       c.rotate(node.bounds.dy) -then-
                                       c.lineTo(node.bounds.x, 0) -then-
                                       c.arc(0, 0, node.bounds.x, 0, -node.bounds.dy) -then-
                                       c.fill()]

    caterwaul.module('splunge', ':all', function ($) {
    $.splunge = wcapture [

# Transformation layer

We transform points in two different ways here. First, we transform the graph rectangles into arcs by height. The idea here is that a vertically-stacked bar becomes a circle of arc segments. We also
transform bounding boxes into circular regions. Second, we back-transform mouse coordinates into rectangular space. This is done so we can figure out which segment of data the user is interacting with.

A circular transformation has the following fields, each of which is a continuous variable:

    1. x0: the current focal point for scaling.
    2. dx: the current focal scale factor.
    3. y0: the current zero point (= 0 degrees).
    4. dy: the current height (= 360 degrees).

Transformations are immutable and support linear combination. This is used to navigate smoothly through various levels of the tree. Some rules that govern the circular projection:

    1. Circles are drawn with no overlap, even if the current dy is smaller than the data limits. Excess area is clipped.
    2. Horizontal projection is computed using the arctangent as the integral. We don't end up using the derivative for anything.

Interaction is also handled here. The only rule is that the view focuses on the object where the user clicks. We also emit jQuery events on the <canvas> element whenever the user hovers, unhovers,
clicks, etc, on an individual data element.

      interpolate(t1, t2, x) = scale(t1, 1.0 - x) /-plus/ scale(t2, x),  plus(t1, t2)  = {x0: t1.x0 + t2.x0, dx: t1.dx + t2.dx, y0: t1.y0 + t2.y0, dy: t1.dy + t2.dy},
                                                                         scale(t, x)   = {x0: t.x0  * x,     dx: t.dx  * x,     y0: t.y0  * x,     dy: t.dy  * x},
                                                                         union(t1, t2) = min /-bound/ max
                                                                                         -where [p1 = t1 /!base, p2 = t1 /-project/ 1, p3 = t2 /!base, p4 = t2 /-project/ 1,
                                                                                                 min = [p1, p2, p3, p4] /['x0 dx y0 dy'.qw *k[[k, x[k] /-Math.min/ x0[k]]] /object -seq] -seq,
                                                                                                 max = [p1, p2, p3, p4] /['x0 dx y0 dy'.qw *k[[k, x[k] /-Math.max/ x0[k]]] /object -seq] -seq],
      tau                    = 2 * Math.PI,
      inverse(t, p)          = {x: Math.tan((Math.sqrt(p.x * p.x + p.y * p.y) /-Math.min/ 1.0 - 0.5) * Math.PI) * t.dx + t.x0, y: (Math.atan2(p.y, p.x) / tau + 1) % 1 * t.dy + t.y0},
      transform(t, p)        = {x: d * Math.cos(angle), y: d * Math.sin(angle), d: d, angle: angle} -where [d     = Math.atan((p.x - t.x0) / t.dx) / Math.PI + 0.5,
                                                                                                            angle = (p.y - t.y0) / t.dy * tau |-Math.max| 0 |-Math.min| tau],

## Animation functions

This simplifies viewport creation. Chances are, you want to give the user a way to pan around the graph, zoom to particular segments, etc. This interface lets you do that without introducing too much
conceptual overhead. In particular, it encapsulates animations. The second argument passed to the viewport() function is a callback that will be invoked on the transform each time it is changed during
an animation.

    cosine(x)                   = Math.cos(x * Math.PI) * -0.5 + 0.5,    // Tween function, not an alias to Math.cos()
    viewport(initial, f)        = wcapture [_transform = initial,  stop()                      = clearInterval(_interval) -then [_interval = null] -when._interval,
                                            _interval  = null,     animate(t, duration, tween) = stop() <then> _interval -eq- interpolator(_transform, t, +new Date,
                                                                                                                                           duration || 400, tween || cosine) /-setInterval/ 40,
                                                                   transform(t)                                 = t ? f(_transform = t) : _transform,
                                                                   interpolator(s, t, c, d, i)(now = +new Date) = stop() -then- now /eq[c + d] -when [now > c + d] <then>
                                                                                                                  interpolate(s, t, i((now - c) / d)) /!transform],

    default_viewport(canvas, t) = t /or.{x0: 0, dx: 1, y0: 0, dy: 1} /-viewport/ default_renderer(canvas),

## Interaction

You can set up any kind of interaction model you want to, but Splunge provides some defaults that allow the user to pan around the data, change zoom levels, and select nodes. These actions are emitted
as events on the <canvas> element that contains the chart, and the events that are fired contain metadata about which data element was clicked on, hovered, unhovered, etc. If you are using this
interaction model, you should set up rendering that is triggered by the 'splunge_render' event:

    $('#my-canvas').bind('splunge_render', my_render_function)

You can use default_renderer() to simplify this process. The default mouse/keybindings are:

    Mouse drag          pan across data by adjusting the viewport's x0 and y0
    Shift + mouse drag  zoom data by adjusting the viewport's dx and dy
    Ctrl + click        zoom to element

The canvas given to default_interaction() can be either a jQuery object or a canvas element.

    drag_events(canvas)            = self.mousedown(start_dragging).data('splunge_drag_delta_installed', true) -unless- self.data('splunge_drag_delta_installed') -then- self
                                     -where [last_x = 0, last_y = 0, dragging = false, last_selected = null, $doc = jQuery(document), self = jQuery(canvas),
                                             record(x, y)      = last_x /eq.x -then- last_y /eq.y,
                                             start_dragging(e) = record(e.pageX, e.pageY) -then- $doc /~mousemove/ drag /~mouseup/ stop_dragging,
                                             stop_dragging(e)  = $doc.unbind('mousemove', drag).unbind('mouseup', stop_dragging),
                                             drag(e)           = self.trigger('drag_delta', {} / e /-$.merge/ {dx: e.pageX - last_x, dy: e.pageY - last_y}) -then- record(e.pageX, e.pageY)],

    default_interaction(canvas, v) = drag_events(canvas).on('drag_delta', pan_or_scale)
                                     -where [x_scale(v) = v.transform().dx,  pan_or_scale(e) = e.shiftKey ? scale(e) : pan(e),
                                             y_scale(v) = v.transform().dy,  scale(e)        = v.transform(v.transform() /!base |-plus| times(v.transform() /!d, {x: e.dx, y: e.dy}))],

## Back-transformed point logic

This is used so that the user can click on curved graph elements. We back-transform the point into logical graph space so that we can use normal rectangular bounds. Note that the functions here operate
under the assumption that parent Y-bounds contain child Y-bounds.

    point_hits(p, h)             = bbox(h) -re [p.x >= it.x0 && p.y >= it.y0 && p.y <= it.y0 + it.dy && it],
    point_hits_self(p, h)        = point_hits(p, h) -re [it && p.x <= it.x0 + it.dx],
    find_by_transformed(h, t, p) = find_by_point(h, inverse(t, p)),
    find_by_point(h, p)          = point_hits(p, h) && (point_hits_self(p, h) ? h : h.xs && h.xs |[find_by_point(x, p)] |seq),

## Rendering functions

Stuff to draw arc slices. It's up to you to actually draw things, but these functions construct paths that you can later fill in or draw outlines for. (These same paths are not used for testing
pointer-shape intersection; see above for that.) The paths() function renders all paths for the given hierarchy. It closes over the hierarchy and transform, and the following invocation expects a
per-path callback to render each segment. That function is invoked on the path, the data tree it represents, and the current rendering transform. If the callback returns a falsy value, its children are
not rendered.

    single_path(h, t)(c) = c.moveTo(c1.x, c1.y) -then- c.lineTo(c2.x, c2.y) -then- c.arc(0, 0, c2.d, c2.angle, c3.angle) -then- c.lineTo(c4.x, c4.y)
                                                -then- c.arc(0, 0, c4.d, c4.angle, c1.angle, true) -where [p1 = h /!bbox /!base,             p2 = h /!bbox /-project/ 1,
                                                                                                           c1 = transform(t, p1),            c3 = transform(t, p2),
                                                                                                           c2 = transform(t, p2 /-mix/ p1),  c4 = transform(t, p1 /-mix/ p2)],

    dt(t, p1, p2)        = tp1 /pairs *[[x[0], tp2[x[0]] - x[1]]] /object -seq -where [tp1 = t /-transform/ p1, tp2 = t /-transform/ p2],
    is_visible(h, t)     = bbox(h).y0 + h.bbox.dy > t.y0 && h.bbox.y0 < t.y0 + t.dy,
    paths(h, t)(f)       = f(single_path(h, t), h, t) <and> h.xs *![paths(x, t)(f) -when- is_visible(x, t)] -seq -when- h.xs],

    using [caterwaul.vector(2, 'v2')]});