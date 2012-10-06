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
monotonicity properties are preserved. Another is the cartesian_to_polar transform, which converts two axes into magnitude and angle and is suitable for turning bar charts into ring charts. The third is bounding,
which linearly transforms space such that some bounding box is mapped to the unit square. The typical nesting is x_arctangent(cartesian_to_polar(zoom(data))), where the zoom step changes with user input (see
"viewports").

Transformations provide two methods, transform(v) and inverse(). t.inverse().inverse().transform(v) should be equivalent to t.transform(v), though t.inverse().transform(t.transform(v)) might not be
equivalent to v in some cases.

Incidentally, the arctangent/tangent transforms normalize to (-1, 1) while the cartesian_to_polar coordinate transforms have Y components that vary from 0 to τ. This is deliberate. It's written this way
so that you can use the cartesian_to_polar coordinate output directly with the canvas context's arc() method, and so that if you're compressing space with the arctangent transform you can then do a
scale(x, x) transformation to make it fit inside a 2x by 2x box centered at the origin.

Infinity isn't really infinity. Instead, it's a number that corresponds to the reciprocal of the machine epsilon (FP rounding error). This means that "infinite" values can be worked with normally. See
http://en.wikipedia.org/wiki/Machine_epsilon for ways to compute it.

      tau     = Math.PI * 2,            atan_scale = 2 / Math.PI,  scaled_atan(x) = Math.atan(x) * atan_scale,        clip(x)                  = x /-Math.max/ -1 /-Math.min/ 1,
      epsilon = 2.220446049250313e-16,  infinity   = 1 / epsilon,  scaled_tan(x)  = clip(x / atan_scale) /!Math.tan,  componentwise(f1, f2)(v) = [f1(v[0]), f2(v[1])],

      x_tangent          = capture [transform = componentwise(scaled_tan, "_".qf), inverse() = x_arctangent],  x_arctangent = capture [transform = componentwise(scaled_atan, "_".qf), inverse() = x_tangent],
      y_tangent          = capture [transform = componentwise("_".qf, scaled_tan), inverse() = y_arctangent],  y_arctangent = capture [transform = componentwise("_".qf, scaled_atan), inverse() = y_tangent],
      polar_to_cartesian = capture [transform(v, d = v[0],      t = v[1])                   = [d * Math.cos(t), d * Math.sin(t)], inverse() = cartesian_to_polar],
      cartesian_to_polar = capture [transform(v, d = v /!vnorm, t = Math.atan2(v[0], v[1])) = [d, (t + tau) % tau],               inverse() = polar_to_cartesian],

      bounding_box(b)    = capture [transform(v) = b /~intern/ v, inverse() = identity_transform],  identity_transform = capture [transform(v) = v, inverse() = this],

      // Arguments to composite() are ordered like composed functions: composite(t1, t2, t3).transform(x) = t1.transform(t2.transform(t3.transform(x)))
      composite(ts = arguments) = capture [transform(v) = ts /! [v] [x.transform(x0)] -seq, inverse() = this.inverse_ -dcq- composite.apply(this, +ts *[x.inverse()] -seq) /se[it.inverse_ = this]],

# Boxes and rectangles

In Splunge terminology, a "box" is a region in space with no additional attributes, and a "rectangle" is a box with some data associated with it. In practice, the "rectangle" function is used to
represent a piece of chart data and the "box" function is used to represent data-less things like bounding boxes and transformation bounds. Boxes also support interpolation and are invertible linear
transformations.

## Representing data elements

Each data element is a rectangle or series of rectangles that can later be transformed into cartesian_to_polar coordinates to become arc slices. Each rectangle has arbitrary coordinates, though you'll probably want
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

                                                                                       toString()        = '[[#{this.v[0]}, #{this.v[1]}] -> [#{this.dv[0]}, #{this.dv[1]}]]',
                        intern(v) = v |-vmax| this.v |-vmin| this.v /-vplus/ this.dv,  map_corners(f)    = rectangle(this.data, c1, c2 /-vminus/ c1) -where [c1 = f(this.v), c2 = f(this.v /-vplus/ this.dv)],
                        plus(b)   = box(this.v /-vplus/ b.v, this.dv /-vplus/ b.dv),   transform_with(t) = this /~map_corners/ "t /~transform/ _".qf,
                        scale(x)  = box(this.v /-vscale/ x,  this.dv /-vscale/ x),     bound()           = this,
                        times(v)  = box(this.v, v /-vtimes/ this.dv),                  inverse()         = box(this.v /-vscale/ -1, [1 / this.dv[0], 1 / this.dv[1]])],

    box(v, dv)                             = new box_ctor(v, dv),       translate(v) = new box_ctor(v, [1, 1]),  bound_everything = box([-infinity, -infinity], [2 * infinity, 2 * infinity]),
    rectangle(data, v, dv, b = box(v, dv)) = b.data /eq.data -then- b,  scale(v)     = new box_ctor([0, 0], v),  bound_nothing    = box([        0,         0], [           0,            0]),

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

    cons(first, rest_fn) = new cons_ctor(first, rest_fn),  cons_from_array(xs)  = xs /! [null] [cons(x, k(x0))] -seq,  cons_to_array(c)    = reduce(c, [], given[x, rest] [[x] /~concat/ rest()]),
    k(x)()               = x,                              list(xs = arguments) = cons_from_array(+xs -seq),           reduce(xs, x_fn, f) = xs ? xs.reduce ? xs.reduce(x_fn, f) : f(xs, x_fn) : x_fn(),

    cons_ctor = given[first, rest_fn][this.first = first, this.rest = rest_fn, this.bound_ = bound_everything /~intersect/ this.first.bound(), null] -se- it.prototype /-$.merge/
                capture [reduce(x_fn, f, r = this.rest) = f.call(this, this.first, "rest ? rest.reduce(x_fn, f) : x_fn(), where [rest = r()]".qf),  transform_with(t) = map("_.transform_with(t)".qf, this),
                         toString(force)                = '#{this.first} :: #{force ? this.rest() && this.rest().toString(force) : "..."}',         bound()           = this.bound_,
                         interpolate(l, x)              = list_interpolation(this, l, x)],

    map(f, xs)    = reduce(xs, null /!k, given[x, rest] [cons(f(x), rest)]),               append(xs, ys_f) = reduce(xs, ys_f, cons) || ys_f(),                   first(xs) = xs && xs.first,
    filter(f, xs) = reduce(xs, null /!k, given[x, rest] [f(x) ? cons(x, rest) : rest()]),  each(f, xs)      = reduce(xs, xs /!k, given[x, rest] [f(x), rest()]),

    take_outer_while(f, xs) = reduce(xs, null /!k, given[x, rest] [f(this) ? cons(x, rest) : null]),
    descend_while(f, xs)    = !xs || xs.reduce ? reduce(take_outer_while(f, xs), null /!k, given[x, rest] [descend_while(f, x) /-append/ rest]) : list(xs),

## Artificial bounding

This is used as a workaround for indefinite hierarchies that arise from laziness. We need a way to find the bounding box of a potentially infinite list of items. Instead of blocking until we know the
answer definitely, we sidestep the problem by saying that the data we care about is clipped to a box that has at most one infinite dimension. This lets us, for example, have an infinitely tall stack of
things that is known to have a specified finite width. When the infinite tower is panned horizontally offscreen, none of it needs to be rendered because we know no element can escape the bounding box.

You can use the bounded() function to introduce a bounding box onto an object, usually a cons cell, whose bounding box is too large or unknown. This bounding box will be used to figure out when we can
skip rendering for a particular element. You'll probably use x_stack() and y_stack() more often.

    bounded(s, box) = capture [bound() = box, reduce(x, f) = f(s, x)],  x_shadow(s, bound) = bounded(s, bound /~times/ [1/0, 1]),  y_shadow(s, bound) = bounded(s, bound /~times/ [1, 1/0]),

    x_compressed(xs, h) = xs /~transform_with/ scale([h / xs.reduce(0 /!k, given[x, rest][x.bound()[0] + rest()]), 1]),  x_stack(xs) = x_shadow(xs, xs.first.bound()),
    y_compressed(xs, h) = xs /~transform_with/ scale([h / xs.reduce(0 /!k, given[x, rest][x.bound()[0] + rest()]), 1]),  y_stack(xs) = y_shadow(xs, xs.first.bound()),

## Data interpolation

This isn't too complicated, but it is a little subtle. The idea is to be able to support stuff like animations across data changes. In order to do this, we need to handle a few different cases:

    1. An object's bounds change. This is trivial: just interpolate the bounding boxes.
    2. An object is added or deleted. Scale the object from [0, 0] to [1, 1] or vice versa -- but don't change its location.

This transformation is performed as a reduction on the resulting data, so it, like other transformations, happens lazily. Because we've fabricated infinity, you can use this function with infinite
bounds without anything catastrophic happening (though I think it's possible that you'll lose some precision in certain cases).

    scale_size(l, x, b = l.bound()) = l.transform_with(translate(b.v) / scale([x, x]) /-composite/ translate([-b.v[0], -b.v[1]])),
    list_interpolation(l1, l2, x)   = x === 0 ? l1 : x === 1 ? l2 : l1 === l2 ? l1 : l1 === null ? scale_size(l2, 1 - x) : l2 === null ? scale_size(l1, x) :
                                      list_interpolation(l1.first, l2.first, x).transform_with(l1.bound().interpolate(l2.bound(), x) /-composite/ l1.bound().inverse())
                                      /-cons/ "list_interpolation(l1.rest(), l2.rest(), x)".qf,

# Rendering

The most important/difficult aspect of rendering is drawing the paths that represent objects. These functions do that for you, at the same time using some optimizations to avoid rendering elements that
won't be visible. We can do this because of the way bounding boxes work: the bounding box of any given stack completely contains the bounding boxes of its children (except for certain cases involving
lazy data; see above). Under this assumption, we can stop rendering when the intersection between the bounding box and the view area is too small.

When this happens depends on the view transform. If something like the arctangent transformation is used, then all space is theoretically visible, but it will become arbitrarily small as the distance
from the focal point increases. Using a minimal-area heuristic is ideal for situations like this, and it also covers the usual clipping case.

    viewport_bounds = box([-200, -200], [400, 400]),
    draw(path)(box) = path(box)(my_context) -then- my_context.fill(),
    render(data)    = each(draw(arc_path), descend_while("_.intersect(viewport_bounds).area() > 0.01".qf, data))

Using descendants_while() like this will exploit bound transitivity so that you can render infinitely large datasets. each() is required to force the resulting list. If your data consists of elements
constructed via rectangle(), then each box passed to draw(arc_path)() will have a .data attribute corresponding to the first argument to rectangle().

The arc_path() function is coded strangely, but it needs to be this way. Here's the story. If you're using arc_path to render your data, then you're rendering data whose coordinates are specified in
polar form -- so your boxes are in the form [[rho, theta], [drho, dtheta]]. And if the user is going to interact with this meaningfully, you'll need to convert any mouse coordinates into polar form as
well, so one of the view transformations will be polar_to_cartesian so that you get the inverse cartesian_to_polar operating on the mouse coordinates.

Well, one of the side-effects of having a view transformation is that your data will be transformed prior to being rendered: so all of those polar coordinates our data used to have will be converted to
regular Cartesian coordinates via the polar_to_cartesian transform. However, the arc() method uses polar coordinates. So we undo the transformation right before rendering the arc. Note that this is a
hack that breaks some stuff; in particular, any transformations you make after polar_to_cartesian() must preserve the polar coordinates of those points; otherwise your arcs won't render properly (because
the transformation legitimately breaks the arcs, not due to a bug here).

      no_path(b)(c)                                              = null,
      rectangle_path(b)(c)                                       = c.beginPath() -then- c.rect(b.v[0], b.v[1], b.dv[0], b.dv[1]),
      arc_path(b, p = b /~transform_with/ cartesian_to_polar)(c) = c.beginPath() -then- c.arc(0, 0, p.v[0], p.v[1], p.v[1] + p.dv[1], true) -then- c.arc(0, 0, p.v[0] + p.dv[0], p.v[1] + p.dv[1], p.v[1]),

      using [caterwaul.vector('v', 2)]]});