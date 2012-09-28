Splunge charting | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Splunge is a charting library that consists of three layers. The lowest level contains vector-space transformations that are used to turn stacked bar charts into circularly-tessellated rings.
This layer also inverse-transforms mouse coordinates. (Not all transformations use triangles; rectangles can be transformed into arcs in certain situations.)

The next layer up manages the physics of graph display. This involves modeling all of the view transformations as objects with mass and velocity, and using gravitational fields to pull them
into the right places. Above this is the data interpretation layer, which assigns objects to data elements and puts them into a rectangular vector space. This layer is responsible for slicing
unstructured data into lists of stacked bar-trees.

    caterwaul.module('splunge', ':all', function ($) {
      $.splunge(data) = path, // jquery in canvas.splunge -se- render(data, it),
    //  se [it /-$.merge/ slice_methods],

# Interpretation layer

Bars come in hierarchies, where children appear to the right and siblings are stacked vertically. Independent hierarchies are placed left/right and are laid out according to bounding boxes.
The data format looks like this per hierarchy:

    [{label: 'foo', value: 5, xs: [...]}, ...]

## Rendering

We need to figure out the bounding box of each sub-hierarchy so that we can assign angles to stacked bar heights (basically, back-transforming them into the unit interval). The coordinates
we're interested in are x0, dx, y0, and dy. Every object is assumed to have the same width; this keeps siblings aligned across circular transformation. The data layout is chosen so that
bounding boxes and transformations have identical semantics and representation.

Bounding box computation involves adding a 'bbox' attribute to each data node. The bbox tracks the cumulative offset of that node; that is, the x0 will be linear in the depth, the dx will be
the maximum depth of any descendant, the y0 will be the absolute Y-coordinate of this node (scaled within its parents), and the dy will be the absolute height of this node. Note that these
bounding boxes are then transformed into sector arcs by the transformation layer.

    where [tau     = 2 * Math.PI,
           bbox(h) = b(h, 0, 0, 1) -where [b(h, x0, y0, dy) = h.bbox <ocq> h.xs *!c[b(c, x0 + 1, y, new_dy) -then [y += c.value * new_dy]] -seq -when- h.xs
                                                                           -then- {x0: x0, dx: 1 + (h.xs ? h.xs /[0][x0 /-Math.max/ x.bbox.dx] /seq : 0), y0: y0, dy: dy * h.value}
                                                                           -where [ymax   = h.xs ? h.xs /[0][x0 + x.value] -seq : 0,
                                                                                   y      = 0,
                                                                                   new_dy = dy / ymax]],
           base(b) = {x: b.x0, y: b.y0},  mix(a, b)     = {x: a.x, y: b.y},
           d(b)    = {x: b.dx, y: b.dy},  project(b, x) = {x: b.x0 + b.dx * x, y: b.y0 + b.dy * x},

# Transformation layer

We transform points in two different ways here. First, we transform the graph rectangles into arcs by height. The idea here is that a vertically-stacked bar becomes a circle of arc segments.
We also transform bounding boxes into circular regions. Second, we back-transform mouse coordinates into rectangular space. This is done so we can figure out which segment of data the user is
interacting with.

A circular transformation has the following fields, each of which is a continuous variable:

    1. x0: the current focal point for scaling.
    2. dx: the current focal scale factor.
    3. y0: the current zero point (= 0 degrees).
    4. dy: the current height (= 360 degrees).

Transformations are immutable and support linear combination. This is used to navigate smoothly through various levels of the tree. Some rules that govern the circular projection:

    1. Circles are drawn with no overlap, even if the current dy is smaller than the data limits. Excess area is clipped.
    2. Horizontal projection is computed using the arctangent as the integral. We don't end up using the derivative for anything.

Interaction is also handled here. The only rule is that the view focuses on the object where the user clicks. We also emit jQuery events on the <canvas> element whenever the user hovers,
unhovers, clicks, etc, on an individual data element.

             interpolate(t1, t2, x) = scale(t1, 1.0 - x) /-add/ scale(t2, x),  add(t1, t2) = {x0: t1.x0 + t2.x0, dx: t1.dx + t2.dx, y0: t1.y0 + t2.y0, dy: t1.dy + t2.dy},
                                                                               scale(t, x) = {x0: t.x0  * x,     dx: t.dx  * x,     y0: t.y0  * x,     dy: t.dy  * x},

             inverse(t, p)          = {x: Math.tan((Math.sqrt(p.x * p.x + p.y * p.y) - 0.5) * tau * t.dx + t.x0), y: Math.atan2(p.x, p.y) * t.dy + t.y0},
             transform(t, p)        = {x: d * Math.cos(angle), y: d * Math.sin(angle), d: d, angle: angle} -where [d     = Math.atan((p.x - t.x0) / t.dx) / tau + 0.5,
                                                                                                                   angle = (p.y - t.y0) / t.dy * tau |-Math.max| 0 |-Math.min| tau],
             point_hits_desc(p, h)  = bbox(h) -re [p.x >= it.x0 && p.y >= it.y0 && p.y <= it.y0 + it.dy && it],
             point_hits_self(p, h)  = point_hits_desc(p, h) -re [it && p.x <= it.x0 + it.dy],

             arc_path(h, t)(c)      = c.moveTo(c1.x, c1.y) -then- c.lineTo(c2.x, c2.y) -then- c.arc(0, 0, c2.d, c2.angle, c3.angle) -then- c.lineTo(c4.x, c4.y)
                               -then- c.arc(0, 0, c4.d, c4.angle, c1.angle, true) -where [p1 = h /!bbox /!base,             p2 = h /!bbox /-project/ 1,
                                                                                          c1 = transform(t, p1),            c3 = transform(t, p2),
                                                                                          c2 = transform(t, p2 /-mix/ p1),  c4 = transform(t, p1 /-mix/ p2)],

             path(h, t)(c, f)       = arc_path(h, t)(c) -then- f(c, h) <then> h.xs *![path(x, t)(c, f)] -seq -when- h.xs]});