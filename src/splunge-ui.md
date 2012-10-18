Splunge charting UI | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

Splunge provides a way to create charts, but often you will want to do more than this when displaying data. This is the missing piece. It includes functions for rendering and shading data, ways to map
screen coordinates back into data-space, and functions for doing things like rendering sub-charts focused on a particular data element.

    caterwaul.module('splunge.ui', ':all', function ($) {
      $.splunge_ui = wcapture [

# Color generation

This is a function that maps HSV coordinates to RGB. We use this later on: hue corresponds to some scalar quantity of the data (or just its Y-coordinate), and saturation corresponds to its level of focus
or relevance. We would decrease the saturation if, for instance, the user popped up a sub-chart on top of the original and therefore was no longer focused on the original for a moment. Value varies by
whether the user is hovering on something. HSV values are always in the range [0, 1], as are the generated RGB values.

If you are rendering into a canvas and want a fillStyle or strokeStyle, you can use rgba() to get a properly-formatted string from an HSVA color.

      rgba(h, s, v, a, cs = rgb(h, s, v))                                                               = 'rgba(#{cs[0] * 255 >>> 0}, #{cs[1] * 255 >>> 0}, #{cs[2] * 255 >>> 0}, #{a})',
      rgb(h, s, v, c = v * s, x = 1 - Math.abs(h*6 % 2 - 1), m = v - c, c1 = c + m, c2 = x + m, c3 = m) = h < 1/2 ? h < 1/6 ? [c1, c2, c3] : h < 1/3 ? [c2, c1, c3] : [c3, c1, c2] :
                                                                                                                    h < 2/3 ? [c3, c2, c1] : h < 5/6 ? [c2, c3, c1] : [c1, c3, c2],

# Animation

Uses setInterval and measures 'real time' between calls to find interpolation points. You can supply your own interpolator, or use the default cosine interpolation used by many frameworks including
jQuery. Generally you would store the duration and tween values using currying, as for the animate() definition below. Animation functions return the interval used to drive the loop, so you can call
clearInterval on the result to stop the animation.

      animator(duration, tween)(f, i = null, start = +new Date) = i = setInterval(Math.min(1, (now - start) / duration) /!tween /!f <then>
                                                                                  clearInterval(i) -then- f(1, true) -when [now - start > duration], where [now = +new Date], given.e, 30),
      cosine_tween(x) = Math.cos(x * Math.PI) * -0.5 + 0.5,
      animate         = animator(400, cosine_tween),

# Rendering

Most of the time you will probably want to fill in chart elements and stroke a border to provide some visual space between them. The only real variant is the color (and opacity) of the fill. This can
easily be set up by using a 'get the color' callback given a data item and its focused/hovered/etc status. The line width and color are invariant wrt the rendering process, so you can set those up either
ahead-of-time or per-element using a side-effect in the color_fn in the unlikely event that you do need to change them.

Within these rendering functions, the line style and background color are assumed to be the same thing.

      renderer(color_fn, context)(path_fn, element)   = path_fn(context) <then> context.fillStyle -eq- color_fn(element) <then> context.fill() <then> context.stroke(),
      chart_renderer(color_fn, context, limit)(chart) = context.fillStyle -eq- context.strokeStyle <then> context.fillRect(v.v[0] - v.dv[0], v.v[1] - v.dv[1], 2*v.dv[0], 2*v.dv[1]) -where [v = chart.view_]
                                                                                                   <then> chart.with_context(context, chart.render(renderer(color_fn, c), limit) -given.c)],
      using [caterwaul.splunge]});