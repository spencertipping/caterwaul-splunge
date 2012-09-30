Splunge hierarchical ring charts | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Splunge constructs hierarchical ring charts and provides forward and backward transformations that allow you to easily map user actions to logical data elements. It then defines an interaction layer that
maps mouse events to zoom/pan/hover/select actions, which are exposed as jQuery events. This library uses the <canvas> element for rendering.

Data is specified functionally, which gives you a great deal of flexibility. In particular, it lets you (1) construct the data lazily (though the lazy process must be synchronous), (2) use custom
rendering and hit detection, and (3) process infinite data sets, provided that you use some heuristic to limit the number of objects you try to render.

## Representing data elements

Each data element is a rectangle or series of rectangles that can later be transformed into polar coordinates to become arc slices. Each rectangle has arbitrary coordinates, though you'll probably want
to use a layout function if you want to create a normal chart easily. For example, you can produce a one-ring pie chart by stacking rectangles of equal widths:

    data = {foo: 3, bar: 5, bif: 2, baz: 6},
    chart_objects = stack(data /pairs *[rectangle(x[0], [0, 0], [1, x[1]])] -seq, {v: [0, 1]}),

The stack() function accumulates an offset from the dot product of the given vector and the bounding box offset of each entry. In this case we specified the vector [0, 1], so stacking proceeds
vertically. You can also use it to stack descendants, something that is done automatically by the hierarchy() function.

    caterwaul.module('splunge', ':all', function ($) {
    $.splunge = wcapture [

# Transformations

Transformations act on dimensions and bounding boxes. They can modify space in any way that preserves the monotonicity properties of stacks. (They can also violate the property, but doing so may cause
incorrect render output.) In addition to transforming things forwards, they must also provide inverses. This allows externally-generated points such as mouse input to be mapped back through the
transformation into logical space for event processing.

Splunge comes with three transformations. One, the arctangent transform, is used to visually compress data along an axis. The axis that it transforms is compressed from (-∞, ∞) to (-1, 1), and
monotonicity properties are preserved. Another is the polar transform, which converts two axes into magnitude and angle and is suitable for turning bar charts into ring charts. The third is bounding,
which linearly transforms space such that some bounding box is mapped to the unit square. The typical nesting is x_arctangent(polar(zoom(data))), where the zoom step changes with user input.

Transformations provide two methods, transform(v) and inverse(). t.inverse().inverse().transform(v) should be equivalent to t.transform(v).

      atan_scale = 2 / Math.PI,  scaled_atan(x) = Math.atan(x) * atan_scale,  scaled_tan(x) = clip(x / atan_scale) /!Math.tan,  clip(x)                  = x /-Math.max/ -1 /-Math.min/ 1,
                                 identity(x)    = x,                                                                            componentwise(f1, f2)(v) = [f1(v[0]), f2(v[1])],

      x_tangent = capture [transform = componentwise(scaled_tan, identity), inverse() = x_arctangent],  x_arctangent = capture [transform = componentwise(scaled_atan, identity), inverse() = x_tangent],
      y_tangent = capture [transform = componentwise(identity, scaled_tan), inverse() = y_arctangent],  y_arctangent = capture [transform = componentwise(identity, scaled_atan), inverse() = y_tangent],

      inverse_polar = capture [transform(v, d = v /!vnorm, t = Math.atan2(v[0], v[1])) = [d, t],                             inverse() = polar],
      polar         = capture [transform(v, d = v[0],      t = v[1])                   = [d * Math.cos(t), d * Math.sin(t)], inverse() = inverse_polar],

# Boxes and rectangles

In Splunge terminology, a "box" is a region in space with no additional attributes, and a "rectangle" is a box with some data associated with it. In practice, the "rectangle" function is used to
represent a piece of chart data and the "box" function is used to represent data-less things like bounding boxes and transformation bounds. Boxes also support interpolation and are invertible linear
transformations.

      rectangle(data, v, dv) = box(v, dv) -se- it.data /eq.data,
      box(v, dv)             = new box_ctor(v, dv),
      translate(v)           = new box_ctor(v, [1, 1]),
      box_ctor               = given[v, dv][this.v = v, this.dv = dv]
                               -se- it.prototype /-$.merge/ capture [area()            = this.dv[0] * this.dv[1],               plus(b)   = box(this.v /-vplus/ b.v, this.dv /-vplus/ b.dv),
                                                                     interpolate(b, x) = this.scale(1 - x) /~plus/ b.scale(x),  scale(x)  = box(this.v /-vscale/ x,  this.dv /-vscale/ x),
                                                                     transform(v)      = this.v |-vplus| v /-vtimes/ this.dv,   inverse() = box(this.v /-vscale/ -1, [1 / this.dv[0], 1 / this.dv[1]]),

                                                                     bound()           = this,
                                                                     union(b)          = box(c1, c2 /-vminus/ c1) -where [c1 = this.v                  |-vmin| b.v,
                                                                                                                          c2 = this.v /-vplus/ this.dv |-vmax| b.v /-vplus/ b.dv],

                                                                     transform_with(t) = this /~map_corners/ "t.transform(_)".qf,
                                                                     contains(v)       = v[0] >= this.v[0] && v[1] >= this.v[1] && v[0] <= this.v[0] + this.dv[0] && v[1] <= this.v[1] + this.dv[1],
                                                                     map_corners(f)    = box(c1, c2 /-vminus/ c1) -where [c1 = f(this.v), c2 = f(this.v /-vplus/ this.dv)]],

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

Note that lazy stacks don't store the values that come from next() by default. This means that the random number example above would render differently each time. In order to fix this, you should use a
persistent_lazy_stack(), which does cache its next() value:

    infinite_stack = persistent_lazy_stack(rectangle_for_number(Math.random()), "infinite_stack()".qf, [0, 1])

AJAX loading is a case where this distinction matters. You don't know whether a backgrounded AJAX load will complete before its data is requested, so you want to use a regular lazy_stack() to allow for
mutability.

      stack(xs, v)                   = array_stack(xs, 0, v),
      stack_object(o)                = o /-$.merge/ capture [transform_with(t)        = transformed_stack(this, t),
                                                             each(f, n = this.next()) = f(this.first()) -and- n /~each/ f /when.n],

      lazy_stack_object(o)           = (o.bound(b = this.first().bound()) = box(b.v, [b.dv[0]/0 || 0, b.dv[1]/0 || 0])) -then- stack_object(o),

      array_stack(xs, i, v)          = capture [first() = xs[i],  bound(b = this.first().bound(), n = this.next()) = n ? b.union(n.bound()) : b,
                                                next()  = this.next_ -dcq- array_stack(xs, i + 1, v) /~transform_with/ translate(this.first().bound().dv /-vproj/ v) -when [i < xs.length]] /!stack_object,

      transformed_stack(s, t)        = capture [first() = s.first().transform_with(t),  next(n = s.next()) = transformed_stack(n, t) -when.n,  bound() = s.bound().transform_with(t)] /!stack_object,
      lazy_stack(x, f, v)            = capture [first() = x,                            next()             = f(x)]                  /!lazy_stack_object,
      persistent_lazy_stack(x, f, v) = capture [first() = x,                            next()             = this.next_ -dcq- f(x)] /!lazy_stack_object,

# Rendering

The most important/difficult aspect of rendering is drawing the paths that represent objects. These functions do that for you, at the same time using some optimizations to avoid rendering elements that
won't be visible.

      rectangle_path(b, c) = c.rect(b.v[0], b.v[1], b.v[0] + b.dv[0], b.v[1] + b.dv[1]),
      arc_path(b, c)       = c.save() -then- c.rotate(b.v[1]) -then- c.arc(0, 0, b.v[0], 0, b.dv[1]) -then- c.arc(0, 0, b.v[0] + b.dv[0], b.dv[1], 0, true) -then- c.lineTo(b.v[0], 0) -then- c.restore(),

    // TODO: fix everything below

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