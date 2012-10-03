Splunge hierarchical ring charts | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Splunge constructs hierarchical ring charts and provides forward and backward transformations that allow you to easily map user actions to logical data elements. It then defines an interaction layer that
maps mouse events to zoom/pan/hover/select actions, which are exposed as jQuery events. This library uses the <canvas> element for rendering.

Data is specified functionally, which gives you a great deal of flexibility. In particular, it lets you (1) construct the data lazily (though the lazy process must be synchronous), (2) use custom
rendering and hit detection, and (3) process infinite data sets, provided that you use some heuristic to limit the number of objects you try to render.

    caterwaul.module('splunge', ':all', function ($) {
      $.splunge = wcapture [

# Transformations

Transformations act on dimensions and bounding boxes. They can modify space in any way that preserves the monotonicity properties of stacks. (They can also violate the property, but doing so may cause
incorrect render output.) In addition to transforming things forwards, they must also provide inverses. This allows externally-generated points such as mouse input to be mapped back through the
transformation into logical space for event processing.

Splunge comes with three transformations. One, the arctangent transform, is used to visually compress data along an axis. The axis that it transforms is compressed from (-∞, ∞) to (-1, 1), and
monotonicity properties are preserved. Another is the polar transform, which converts two axes into magnitude and angle and is suitable for turning bar charts into ring charts. The third is bounding,
which linearly transforms space such that some bounding box is mapped to the unit square. The typical nesting is x_arctangent(polar(zoom(data))), where the zoom step changes with user input (see
"viewports").

Transformations provide two methods, transform(v) and inverse(). t.inverse().inverse().transform(v) should be equivalent to t.transform(v), though t.inverse().transform(t.transform(v)) might not be
equivalent to v in some cases.

Incidentally, the arctangent/tangent transforms normalize to (-1, 1) while the polar coordinate transforms have Y components that vary from -π to π. This is deliberate. It's written this way so that you
can use the polar coordinate output directly with the canvas context's arc() method, and so that if you're compressing space with the arctangent transform you can then do a scale(x, x) transformation to
make it fit inside a 2x by 2x box centered at the origin.

      tau = Math.PI * 2,  atan_scale = 2 / Math.PI,  scaled_atan(x) = Math.atan(x) * atan_scale,        clip(x)                  = x /-Math.max/ -1 /-Math.min/ 1,
                          id(x)      = x,            scaled_tan(x)  = clip(x / atan_scale) /!Math.tan,  componentwise(f1, f2)(v) = [f1(v[0]), f2(v[1])],

      x_tangent     = capture [transform = componentwise(scaled_tan, id), inverse() = x_arctangent],  x_arctangent = capture [transform = componentwise(scaled_atan, id), inverse() = x_tangent],
      y_tangent     = capture [transform = componentwise(id, scaled_tan), inverse() = y_arctangent],  y_arctangent = capture [transform = componentwise(id, scaled_atan), inverse() = y_tangent],
      inverse_polar = capture [transform(v, d = v[0],      t = v[1])                   = [d * Math.cos(t), d * Math.sin(t)], inverse() = polar],
      polar         = capture [transform(v, d = v /!vnorm, t = Math.atan2(v[0], v[1])) = [d, t],                             inverse() = inverse_polar],

      // Arguments to composite() are ordered like composed functions: composite(t1, t2, t3).transform(x) = t1.transform(t2.transform(t3.transform(x)))
      composite(ts = arguments) = capture [transform(v) = ts /[v][xs[xl - xi - 1].transform(x0)] -seq, inverse() = this.inverse_ -dcq- composite.apply(this, +ts *[x.inverse()] -seq) /se[it.inverse_ = this]],

# Boxes and rectangles

In Splunge terminology, a "box" is a region in space with no additional attributes, and a "rectangle" is a box with some data associated with it. In practice, the "rectangle" function is used to
represent a piece of chart data and the "box" function is used to represent data-less things like bounding boxes and transformation bounds. Boxes also support interpolation and are invertible linear
transformations.

## Representing data elements

Each data element is a rectangle or series of rectangles that can later be transformed into polar coordinates to become arc slices. Each rectangle has arbitrary coordinates, though you'll probably want
to use a layout function if you want to create a normal chart easily. For example, you can produce a one-ring pie chart by stacking rectangles of equal widths:

    data = {foo: 3, bar: 5, bif: 2, baz: 6},
    chart_objects = y_stack(cons_from_array(data /pairs *[rectangle(x[0], [0, 0], [1, x[1]])] -seq)),

The stack() function accumulates an offset from the dot product of the given vector and the bounding box offset of each entry. In this case we specified the vector [0, 1], so stacking proceeds
vertically. You can also use it to stack descendants, though if your charts are large or infinite you will want to create a cons function that lazily produces elements.

    box_ctor = given[v, dv][this.v = v, this.dv = dv, null] -se- it.prototype /-$.merge/
               capture [area()            = this.dv[0] * this.dv[1],               contains(v)  = v[0] >= this.v[0] && v[1] >= this.v[1] && v[0] <= this.v[0] + this.dv[0] && v[1] <= this.v[1] + this.dv[1],
                        interpolate(b, x) = this.scale(1 - x) /~plus/ b.scale(x),  intersect(b) = this /~map_corners/ "b /~intern/ _".qf,
                        transform(v)      = this.v |-vplus| v /-vtimes/ this.dv,   union(b)     = box(c1, c2 /-vminus/ c1) -where [c1 = this.v                  |-vmin| b.v,
                                                                                                                                   c2 = this.v /-vplus/ this.dv |-vmax| b.v /-vplus/ b.dv],

                        intern(v) = v |-vmax| this.v |-vmin| this.v /-vplus/ this.dv,  map_corners(f)    = rectangle(this.data, c1, c2 /-vminus/ c1) -where [c1 = f(this.v), c2 = f(this.v /-vplus/ this.dv)],
                        plus(b)   = box(this.v /-vplus/ b.v, this.dv /-vplus/ b.dv),   transform_with(t) = this /~map_corners/ "t /~transform/ _".qf,
                        scale(x)  = box(this.v /-vscale/ x,  this.dv /-vscale/ x),     bound()           = this,
                        times(v)  = box(this.v, v /-vtimes/ this.dv),                  inverse()         = box(this.v /-vscale/ -1, [1 / this.dv[0], 1 / this.dv[1]])],

    box(v, dv)                             = new box_ctor(v, dv),       translate(v) = new box_ctor(v, [1, 1]),  bound_everything = box([-1/0, -1/0], [1/0, 1/0]),
    rectangle(data, v, dv, b = box(v, dv)) = b.data /eq.data -then- b,  scale(v)     = new box_ctor([0, 0], v),  bound_nothing    = box([   0,    0], [  0,   0]),

# Infinite data sets

You can render and interact with infinite data sets provided that you specify some limit on what gets rendered. Usually this involves either things being out of bounds or things being too small to be
visible. In either case, you need a way to infer properties of some elements from properties of others; generally this means using a hierarchy and some kind of induction against that hierarchy. This
happens automatically with list structures, which have the property that if xs.rest() = y, then xs.bound() contains y.bound().

## Transformation and traversal

List data is designed to be transformed incrementally. Traversal is expressed as a lazy left reduction with a lazily-computed rightmost value. For example:

    length(s)   = s.reduce(k(0), given[x, rest][1 + rest()])       // this forces the whole list
    identity(s) = s.reduce(k(null), cons)                          // null marks the end of a list

Any object that supports the reduce(x, f) and bound() methods can be rendered as a graph element. Cons cells as defined here do not have enough information to be rendered safely if they are infinite,
though they will work just fine (albeit inefficiently) for small finite datasets. You should use bounded(), x_shadow(), or y_shadow() for large or infinite data sets.

    cons(first, rest_fn) = new cons_ctor(first, rest_fn),  cons_from_array(xs)  = xs /[null][cons(x, k(x0))] -seq,  cons_to_array(c)    = reduce(c, [], given[x, rest] [[x] /~concat/ rest()]),
    k(x)()               = x,                              list(xs = arguments) = cons_from_array(+xs -seq),        reduce(xs, x_fn, f) = xs ? xs.reduce ? xs.reduce(x_fn, f) : f(xs, x_fn) : x_fn(),

    cons_ctor = given[first, rest_fn][this.first = first, this.rest = rest_fn, null] -se- it.prototype /-$.merge/
                capture [reduce(x_fn, f, r = this.rest) = f(this.first, "rest ? rest.reduce(x_fn, f) : x_fn(), where [rest = r()]".qf),  transform_with(t) = map("_.transform_with(t)".qf, this),
                                                                                                                                         bound()           = bound_everything],

    map(f, xs)    = reduce(xs, null /!k, given[x, rest] [cons(f(x), rest)]),               append(xs, ys_f) = xs ? xs.reduce(ys_f, cons) : ys_f(),
    filter(f, xs) = reduce(xs, null /!k, given[x, rest] [f(x) ? cons(x, rest) : rest()]),  each(f, xs)      = reduce(xs, xs /!k, given[x, rest] [f(x), rest()]),

    take_while(f, xs)    = reduce(xs, null /!k, given[x, rest] [f(x) ? cons(x, rest) : null]),
    descend_while(f, xs) = !xs || xs.reduce ? reduce(take_while(f, xs), null /!k, given[x, rest] [descend_while(f, x) /-append/ rest]) : list(xs),

## Artificial bounding

This is used as a workaround for indefinite hierarchies that arise from laziness. We need a way to find the bounding box of a potentially infinite list of items. Instead of blocking until we know the
answer definitely, we sidestep the problem by saying that the data we care about is clipped to a box that has at most one infinite dimension. This lets us, for example, have an infinitely tall stack of
things that is known to have a specified finite width. When the infinite tower is panned horizontally offscreen, none of it needs to be rendered because we know no element can escape the bounding box.

You can use the bounded() function to introduce a bounding box onto an object, usually a cons cell, whose bounding box is too large or unknown. This bounding box will be used to figure out when we can
skip rendering for a particular element. You'll probably use x_stack() and y_stack() more often.

    bounded(s, box) = capture [bound() = box, reduce(x, f) = f(s, x)],  x_shadow(s, bound) = bounded(s, bound /~times/ [1/0, 1]),  y_shadow(s, bound) = bounded(s, bound /~times/ [1, 1/0]),

    x_compressed(xs, h) = xs /~transform_with/ scale([h / xs.reduce(0 /!k, given[x, rest][x.bound()[0] + rest()]), 1]),  x_stack(xs) = x_shadow(xs, xs.first.bound()),
    y_compressed(xs, h) = xs /~transform_with/ scale([h / xs.reduce(0 /!k, given[x, rest][x.bound()[0] + rest()]), 1]),  y_stack(xs) = y_shadow(xs, xs.first.bound()),

# Rendering

The most important/difficult aspect of rendering is drawing the paths that represent objects. These functions do that for you, at the same time using some optimizations to avoid rendering elements that
won't be visible. We can do this because of the way bounding boxes work: the bounding box of any given stack completely contains the bounding boxes of its children (except for certain cases involving
lazy data; see above). Under this assumption, we can stop rendering when the intersection between the bounding box and the view area is too small.

When this happens depends on the view transform. If something like the arctangent transformation is used, then all space is theoretically visible, but it will become arbitrarily small as the distance
from the focal point increases. Using a minimal-area heuristic is ideal for situations like this, and it also covers the usual clipping case.

If you are using polar coordinate transformations within a rectangular viewport (e.g. a canvas), you'll want to use arc_bound() to accurately compute the visible bounding box of an arc. This is necessary
because the polar coordinate transformation does not preserve rectangular structure. arc_bound(b) will return the rectangular boundaries of the polar-coordinate bounding box specified by b. For example:

    viewport_bounds = box([-200, -200], [400, 400]),
    draw(path)(box) = my_context.beginPath() -then- path(box, my_context) -then- my_context.fill(),
    render(data)    = each(draw(arc_path), descend_while("_.intersect(viewport_bounds).area() > 0.01".qf, data))

Using descendants_while() like this will exploit bound transitivity so that you can render infinitely large datasets. each() is required to force the resulting list. If your data consists of elements
constructed via rectangle(), then each box passed to draw(arc_path)() will have a .data attribute corresponding to the first argument to rectangle().

      rectangle_path(b, c) = c.rect(b.v[0], b.v[1], b.v[0] + b.dv[0], b.v[1] + b.dv[1]),
      arc_path(b, c)       = c.save() -then- c.arc(0, 0, b.v[0], b.v[1], b.dv[1]) -then- c.arc(0, 0, b.v[0] + b.dv[0], b.v[1] + b.dv[1], 0, true) -then- c.restore(),

      arc_bound(b, p = b /~transform_with/ inverse_polar, cp1 = polar /~transform/ [p.v[0], p.v[1] + p.dv[1]], cp2 = polar /~transform/ [p.v[0] + p.dv[0], p.v[1]]) = b /~union/ box(cp1, cp2),

# Viewports

Viewports help manage user interaction. This includes mouse input, some rendering details, maintaining a "current zoom", animation, and viewport-arc intersection. The result is a jQuery-wrapped <canvas>
element that you can drop onto a page and use to plot data easily.

Structurally speaking, a viewport consists of a rendering surface, an untransformed data set, a zoom transform, and view transform. The zoom transform is the only variant in most cases, though any of
these pieces can be changed. For a ring chart, for example, the transformations look like this:

    viewport(data = my_data,
             zoom_transform = translate([0, 0]),
             view_transform = composite([-200, -200] /-box/ [400, 400], x_arctangent, polar))     // polar-transform coordinates, then compress x (distance), then map to screen coordinates

## Immutability and animation

Viewport objects aren't mutable, but they do support animation. This is done using time-variant viewport interpolation. For example:

    animation = start_viewport.animate(end_viewport, 400, cosine_tween),
    i = setInterval("canvas.val(animation.viewport()), clearInterval(i) -when- animation.is_complete()".qf, 30)

This immutability allows you to store previous viewports (e.g. for bookmarking), including the immutable data they pointed to as well as the immutable zoom and view transformations.

    viewport(data, zoom, post_zoom, view) = new viewport_ctor(data, zoom, post_zoom, view),
    viewport_ctor = given[data, zoom, post_zoom, view] [this.data = data, this.zoom = zoom, this.post_zoom = post_zoom, this.view = view, null] -se- it.prototype /-$.merge/
                    capture [transformed_data()           = this.data /~transform_with/ this.zoom /~transform_with/ this.post_zoom,  with_zoom(z) = viewport(this.data, z, this.post_zoom, this.view),
                             animate(to, duration, tween) = animation(this, to, duration || 400, tween || cosine_tween),             with_data(d) = viewport(d, this.zoom, this.post_zoom, this.view),
                             interpolate(v, x)            = this /~with_zoom/ this.zoom.interpolate(v.zoom, x),

                             find(v, vi = this.view.inverse().transform(v)) = descend_while("_.bound() /~contains/ vi".qf, this.transformed_data()).first,

                             change_offset(p1, p2) = this |~with_zoom| this.zoom /~transform_with/ translate(p1).inverse() /~transform_with/ translate(p2),
                             change_scale(p1, p2)  = this |~with_zoom| this.zoom /~transform_with/ scale    (p1).inverse() /~transform_with/ scale(p2)],

    cosine_tween(x)                    = Math.cos(x * Math.PI) * -0.5 + 0.5,
    animation(v1, v2, duration, tween) = capture [start         = +new Date,                      viewport() = v1.interpolate(v2, this.factor()),
                                                  is_complete() = +new Date - start >= duration,  factor()   = 1 /-Math.min/ tween((+new Date - start) / duration)],

## Interaction

You can set up any kind of interaction model you want to, but Splunge provides some defaults that allow the user to pan around the data, change zoom levels, and select nodes. These actions are emitted
as events on the <canvas> element that contains the chart, and the events that are fired contain metadata about which data element was clicked on, hovered, unhovered, etc. If you are using this
interaction model, you should set up rendering that is triggered by the 'splunge_render' event:

    $('#my-canvas').on('splunge_render', my_render_function)
    -where [viewport_bounds       = box([0, 0], [400, 400]),
            draw(path)(box)       = my_context.beginPath() -then- path(box, my_context) -then- my_context.fill(),
            render(data)          = each(draw(arc_path), descendants_while("_.intersect(viewport_bounds).area() > 0.01".qf, data)),
            my_context            = $('#my-canvas').getContext('2d'),
            my_render_function(e) = render($(this).val().transformed_data())]

The default mouse/keybindings are:

    Mouse drag          pan by adjusting the viewport's zoom translation
    Shift + mouse drag  zoom by adjusting the viewport's zoom scale
    Ctrl + click        zoom to element

The canvas given to default_interaction() can be either a jQuery object or a canvas element. You can also receive mouse events per data item by listening for splunge_mouse{down,up,out,over,move}. These
events give you the original pageX and pageY coordinates along with the points transformed into data-space.

    drag_events(canvas) = self.mousedown(start_dragging).data('splunge_drag_delta_installed', true) -unless- self.data('splunge_drag_delta_installed') -then- self
                          -where [last_x = 0, last_y = 0, dragging = false, last_selected = null, $doc = jQuery(document), self = jQuery(canvas),
                                  record(x, y)      = last_x /eq.x -then- last_y /eq.y,
                                  start_dragging(e) = record(e.pageX, e.pageY) -then- $doc /~mousemove/ drag /~mouseup/ stop_dragging,
                                  stop_dragging(e)  = $doc.unbind('mousemove', drag).unbind('mouseup', stop_dragging),
                                  drag(e)           = self.trigger('splunge_drag_delta', {p1: [last_x - x, last_y - y], p2: [e.pageX - x, e.pageY - y]}) -then- record(e.pageX, e.pageY)
                                                      -where [o = self.offset(), x = o.left, y = o.top]],

    viewport_mapping(b, dv)              = box(b.v /-vtimes/ dv, b.dv /-vtimes/ dv),
    default_ring_viewport(data, options) = viewport(data, options.zoom || [0, 0] /!translate, x_arctangent, polar),

    default_interaction(canvas, v) = drag_events(canvas).on('splunge_drag_delta', pan_or_scale).modus("jQuery(this).data('splunge_viewport')".qf,
                                                                                                      "jQuery(this).data('splunge_viewport', _).trigger('splunge_render')".qf).val(v)

                                     -where [self               = jQuery(canvas),                  pan(d)    = "_.change_offset(unview(d.p1), unview(d.p2))".qf /!change,
                                             pan_or_scale(e, d) = e.shiftKey ? scale(d) : pan(d),  scale(d)  = "_.change_scale (unview(d.p1), unview(d.p2))".qf /!change,
                                             change(f)          = self.val(f(self.val())),         unview(v) = self.val().view.inverse().transform(v)]],  using [caterwaul.vector(2, 'v')]});