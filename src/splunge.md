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

      atan_scale = 2 / Math.PI,  scaled_atan(x) = Math.atan(x) * atan_scale,        clip(x)                  = x /-Math.max/ -1 /-Math.min/ 1,
      id(x)      = x,            scaled_tan(x)  = clip(x / atan_scale) /!Math.tan,  componentwise(f1, f2)(v) = [f1(v[0]), f2(v[1])],

      x_tangent     = capture [transform = componentwise(scaled_tan, id), inverse() = x_arctangent],  x_arctangent = capture [transform = componentwise(scaled_atan, id), inverse() = x_tangent],
      y_tangent     = capture [transform = componentwise(id, scaled_tan), inverse() = y_arctangent],  y_arctangent = capture [transform = componentwise(id, scaled_atan), inverse() = y_tangent],
      inverse_polar = capture [transform(v, d = v /!vnorm, t = Math.atan2(v[0], v[1])) = [d, t],                             inverse() = polar],
      polar         = capture [transform(v, d = v[0],      t = v[1])                   = [d * Math.cos(t), d * Math.sin(t)], inverse() = inverse_polar],

      composite(ts = arguments) = capture [transform(v) = ts /[v][x(x0)] -seq, inverse() = composite.apply(this, ts *[ts[xl - xi - 1].inverse()] -seq)],

# Boxes and rectangles

In Splunge terminology, a "box" is a region in space with no additional attributes, and a "rectangle" is a box with some data associated with it. In practice, the "rectangle" function is used to
represent a piece of chart data and the "box" function is used to represent data-less things like bounding boxes and transformation bounds. Boxes also support interpolation and are invertible linear
transformations.

## Representing data elements

Each data element is a rectangle or series of rectangles that can later be transformed into polar coordinates to become arc slices. Each rectangle has arbitrary coordinates, though you'll probably want
to use a layout function if you want to create a normal chart easily. For example, you can produce a one-ring pie chart by stacking rectangles of equal widths:

    data = {foo: 3, bar: 5, bif: 2, baz: 6},
    chart_objects = stack(data /pairs *[rectangle(x[0], [0, 0], [1, x[1]])] -seq, [0, 1]),

The stack() function accumulates an offset from the dot product of the given vector and the bounding box offset of each entry. In this case we specified the vector [0, 1], so stacking proceeds
vertically. You can also use it to stack descendants, though if your charts are large you will want to consider using lazy_stack().

    rectangle(data, v, dv, b = box(v, dv)) = b.data /eq.data -then- b,
    box(v, dv)   = new box_ctor(v, dv),
    translate(v) = new box_ctor(v, [1, 1]),
    box_ctor     = given[v, dv][this.v = v, this.dv = dv]
                   -se- it.prototype /-$.merge/ capture [area()            = this.dv[0] * this.dv[1],               plus(b)   = box(this.v /-vplus/ b.v, this.dv /-vplus/ b.dv),
                                                         interpolate(b, x) = this.scale(1 - x) /~plus/ b.scale(x),  scale(x)  = box(this.v /-vscale/ x,  this.dv /-vscale/ x),
                                                         transform(v)      = this.v |-vplus| v /-vtimes/ this.dv,   inverse() = box(this.v /-vscale/ -1, [1 / this.dv[0], 1 / this.dv[1]]),

                                                         bound()           = this,
                                                         intersect(b)      = this /~map_corners/ "b /~intern/ _".qf,
                                                         union(b)          = box(c1, c2 /-vminus/ c1) -where [c1 = this.v                  |-vmin| b.v,
                                                                                                              c2 = this.v /-vplus/ this.dv |-vmax| b.v /-vplus/ b.dv],

                                                         intern(v)         = v |-vmax| this.v |-vmin| this.v /-vplus/ this.dv,
                                                         transform_with(t) = this /~map_corners/ "t /~transform/ _".qf,
                                                         contains(v)       = v[0] >= this.v[0] && v[1] >= this.v[1] && v[0] <= this.v[0] + this.dv[0] && v[1] <= this.v[1] + this.dv[1],
                                                         map_corners(f)    = rectangle(this.data, c1, c2 /-vminus/ c1) -where [c1 = f(this.v), c2 = f(this.v /-vplus/ this.dv)]],

# Infinite data sets

You can render and interact with infinite data sets provided that you specify some limit on what gets rendered. Usually this involves either things being out of bounds or things being too small to be
visible. In either case, you need a way to infer properties of some elements from properties of others; generally this means using a hierarchy and some kind of induction against that hierarchy. For
example, stacked elements are monotonically increasing in the direction vector (we tacitly assume nonnegative vectors to make this possible). This means that we can ignore the "next" of any collection
whose current item is invisible and whose vector dictates that further items are less visible.

This kind of inductive logic is built into most of the chart element functions that Splunge provides. Specifically:

    stack(xs, v)                        assumes that v · xs[i] ≤ v · xs[i+1]
    hierarchy(xs, children_fn, vs, vc)  assumes stack(xs, vs) and stack(children_fn(xs[i]), vc) ∀i

The problem with stack() is that it eagerly evaluates its children. If you want to build an infinite series of values, you'll need to delay part of the evaluation; this can be done using lazy_stack().
lazy_stack() is an unfolding function that produces values as needed, but not eagerly. If asked for a bounding box, it returns an object whose dimensions are infinite along any nonzero axes of its
vector; this is a conservative approximation given that no further information is known. For example, here's a lazy_stack() of random numbers:

    rectangle_for_number(n) = rectangle(n, [0, 0], [1, n]),
    infinite_stack() = lazy_stack(rectangle_for_number(Math.random()), "infinite_stack()".qf, [0, 1])

Lazy stacks obey the following:

    lazy_stack(x, f, v).first() = x
    lazy_stack(x, f, v).next()  = lazy_stack(f(x), f, v)

Lazy stack bounds are not always accurate in certain cases. In particular, the first object in the lazy stack is assumed to shadow all other objects in the axis perpendicular to v. For example, suppose
you have a horizontal line of boxes, so v = [1, 0]. The lazy stack assumes that the first object in the stack is taller than anything to its right, and that nothing to its right falls below it; this
assumption is observable by the fact that the bounding box is infinitely wide, but only accounts for the vertical aspect of the first object.

Note that lazy stacks don't store the values that come from next() by default. This means that the random number example above would render differently each time. In order to fix this, you should use a
persistent_lazy_stack(), which does cache its next() value:

    infinite_stack = persistent_lazy_stack(rectangle_for_number(Math.random()), "infinite_stack()".qf, [0, 1])

AJAX loading is another case where this distinction matters. You don't know whether a backgrounded AJAX load will complete before its data is requested, so you want to use a regular lazy_stack() to allow
for mutability (a persistent_lazy_stack() would remember a cache miss and not give you a chance to insert the correct data).

## Transformation and traversal

Stacked data is designed to be transformed incrementally. Traversal is expressed as a lazy reduction. For example:

    length(s)            = s.reduce(0, given[x, rest][1 + rest()])
    depth_first(s, rest) = s.reduce(false, given[x, rest][this.cons(x, x.reduce ? "x.reduce(rest, depth_first)"

    stack(xs, v)                   = array_stack(xs, 0, v),
    stack_object(o, v)             = o /-$.merge/ capture [transform_with(t)             = transformed_stack(this, t),
                                                           cons(first, next_fn)          = capture [first() = first, next = next_fn || "o".qf] /-lazy_stack_object/ v,
                                                           append(s, n = this.next())    = this.reduce(s, this.cons),
                                                           reduce(x, f, n = this.next()) = f.call(this, this.first(), n ? "n.reduce(arguments.length === 1 ? _ : x, f)".qf
                                                                                                                        : "arguments.length === 1 ? _ : x".qf)],
    lazy_stack_object(o, v)        = stack_object(o, v) /-$.merge/
                                     capture [bound(b = this.first().bound(), n = this.next_) = n ? b /~union/ n.bound() : n === false ? b : b.v /-box/ [v[0]/0 || b.dv[0], v[1]/0 || b.dv[1]]],

    array_stack(xs, i, v)          = capture [first() = xs[i],  bound(b = this.first().bound(), n = this.next()) = this.bound_ -dcq [n ? b.union(n.bound()) : b],
                                              next()  = this.next_ -dcq- array_stack(xs, i + 1, v)
                                                                         /~transform_with/ translate(v |-vscale| this.first().bound().dv /-vdot/ v) -when [i < xs.length]] /-stack_object/ v,

    transformed_stack(s, t)        = s && capture [first() = s.first().transform_with(t),  next() = transformed_stack(s.next(), t),  bound() = s.bound().transform_with(t)] /-stack_object/ v,
    lazy_stack(x, f, v)            =      capture [first() = x,                            next() = f(x)]                  /-lazy_stack_object/ v,
    persistent_lazy_stack(x, f, v) =      capture [first() = x,                            next() = this.next_ -dcq- f(x)] /-lazy_stack_object/ v,

# Rendering

The most important/difficult aspect of rendering is drawing the paths that represent objects. These functions do that for you, at the same time using some optimizations to avoid rendering elements that
won't be visible. We can do this because of the way bounding boxes work: the bounding box of any given stack completely contains the bounding boxes of its children (except for certain cases involving
lazy data; see above). Under this assumption, we can stop rendering when the intersection between the bounding box and the view area is too small.

When this happens depends on the view transform. If something like the arctangent transformation is used, then all space is theoretically visible, but it will become arbitrarily small as the distance
from the focal point increases. Using a minimal-area heuristic is ideal for situations like this, and it also covers the usual clipping case.

If you are using polar coordinate transformations within a rectangular viewport (e.g. a canvas), you'll want to use arc_bound() to accurately compute the visible bounding box of an arc. This is necessary
because the polar coordinate transformation does not preserve rectangular structure. arc_bound(b) will return the rectangular boundaries of the polar-coordinate bounding box specified by b. So your
render function might look like this:

    draw_arc(b) = context.beginPath() -then- arc_path(b, context) -then- context.fill(),
    viewport_bound = box([-200, -200], [400, 400]),
    each_when("arc_bound(_).intersect(viewport_bound).area() > 0.01".qf)(my_data, when_data(draw_arc))

Using each_when() like this will exploit bound transitivity so that you can render infinitely large datasets. If your render function returns false for some object, that object's siblings (stack-wise)
will not be rendered. It isn't a problem if your function returns undefined, as above.

      when_data(f)(x)       = x.data === void 0 || f.apply(this, arguments),  rectangle_path(b, c) = c.rect(b.v[0], b.v[1], b.v[0] + b.dv[0], b.v[1] + b.dv[1]),
      each_when(cond)(s, f) = s /~each/ "f(_) -when- cond(_)".qf,             arc_path(b, c)       = c.save() -then- c.rotate(b.v[1]) -then- c.arc(0, 0, b.v[0], 0, b.dv[1]) -then-
                                                                                                     c.arc(0, 0, b.v[0] + b.dv[0], b.dv[1], 0, true) -then- c.lineTo(b.v[0], 0) -then- c.restore(),

      arc_bound(b, p = b /~transform_with/ inverse_polar, cp1 = polar /~transform/ [p.v[0], p.v[1] + p.dv[1]], cp2 = polar /~transform/ [p.v[0] + p.dv[0], p.v[1]]) = b /~union/ box(cp1, cp2),

# Viewports

Viewports help manage user interaction. This includes mouse input, some rendering details, maintaining a "current zoom", animation, and viewport-arc intersection. The result is a jQuery-wrapped <canvas>
element that you can drop onto a page and use to plot data easily.

Structurally speaking, a viewport consists of a rendering surface, an untransformed data set, a zoom transform, and view transform. The zoom transform is the only variant in most cases, though any of
these pieces can be changed. For a ring chart, for example, the transformations look like this:

    viewport(data = my_data,
             zoom_transform = translate([0, 0]),
             view_transform = composite(x_arctangent, polar))

## Immutability and animation

Viewport objects aren't mutable, but they do support animation. This is done using time-variant viewport interpolation. For example:

    animation = start_viewport.animate(end_viewport, 400, cosine_tween),
    i = setInterval("animation_viewport.viewport(), clearInterval(i) -when- animation_viewport.is_complete()".qf, 30)

This paradigm allows you to do things like bookmark previous viewports, including the immutable data they pointed to as well as the immutable zoom and view transformations.

    viewport(data, zoom, view) = capture [transformed_data()           = data /~transform_with/ zoom /~transform_with/ view,           with_zoom(z) = viewport(data, z, view),
                                          animate(to, duration, tween) = animation(this, to, duration || 400, tween || cosine_tween),  with_data(d) = viewport(d, zoom, view),

                                          zoom() = zoom,  view() = view,  data() = data,
                                          find(v) = data.find("_.data !== void 0 ? _.bound().contains(v) : _.bound().contains(v)

                                          scale(x) = this.with_zoom(zoom /~scale/ x),
                                          ],

    animation(v1, v2, 

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

    using [caterwaul.vector(2, 'v')]]});