# Splunge charting library

Splunge is a charting library designed to render cool-looking interactive visualizations of large or infinite datasets in a way that is reasonably intuitive to work with. See the [Cantor set
example](http://spencertipping.com/caterwaul-splunge/test/cantor-click.html), for instance. You can also draw multiple charts on the same canvas, as in [this
example](http://spencertipping.com/caterwaul-splunge/test/cantor-hover.html). There are some examples in `test/`, but they are written in Caterwaul. This readme covers its usage from vanilla Javascript.

## Setup

If you are using Caterwaul, include the `caterwaul-splunge.js` file. Otherwise, just include `splunge.js` or `splunge.min.js`. In either case you'll access Splunge via the `caterwaul` global, which is
useful because Caterwaul knows how to do jQuery-style noConflict via the `deglobalize()` function. You probably won't care about this. So here's the setup for a minimal Splunge chart:

    <!doctype html>
    <html>
    <head>
      <script src='splunge.min.js'></script>
    </head>
    <body>
      <canvas id='chart'></canvas>
      <script src='render-stuff.js'></script>
    </body>
    </html>

Splunge has no dependencies on jQuery or other libraries and is under 4K minified and gzipped.

## Data and charts

The first thing you'll need to do is create some data. Let's create a noninteractive ring chart to start with. The way you do this is by creating a stacked bar graph and then wrapping it around the
origin with a `radial_chart`. Here's what `render-stuff.js` should look like so far:

    var s          = caterwaul.splunge;
    var su         = caterwaul.splunge_ui;
    var the_canvas = document.getElementById('chart');
    var data       = {foo: 3, bar: 1, bif: 8, baz: 10};

The first thing we need to do is map each data element into a box. Boxes are Splunge's basic display unit; basically, a box is a rectangle that represents a chart item. For the data above we can just
create a flat list of boxes and stack them along the Y axis, which gets mapped to the angle of the radial chart:

    var unstacked_boxes = [];
    for (var k in data)
      if (data.hasOwnProperty(k))
        unstacked_boxes.push(s.rectangle(k, [0, 0], [1, data[k]]));

Boxes are specified by a 2-vector of their corner and a 2-vector of their size, as shown here. We don't care where the boxes are placed right now, since we're about to have Splunge stack them for us.
The `rectangle()` function, incidentally, builds a box but attaches some data to it in the process. This value is arbitrary, but in this case is the item's name. We'll use this later to show the user
which item they are hovering over.

    var stacked_boxes = s.y_stack(unstacked_boxes);
    var chart_data    = s.bounded(stacked_boxes);

The `bounded()` function takes an array of boxes (or other bounded things) and returns a parent for them. It computes the bounding box union, which Splunge uses internally to figure out how much stuff
it needs to render. Infinite bounding boxes are allowed and necessary for some situations like the Cantor set, which is nominally displayed onscreen in its entirety. Splunge stops rendering things when
their visible pixel area decreases beyond some point.

The next step now is to create the chart and render it to the screen. In order to do this, we need to figure out how we want to shade our data. I'm going to start with grayscale, which is easy in
Splunge because we can specify colors in HSV:

    var chart         = s.radial_chart(chart_data, {view: s.centered_in(the_canvas)});
    var context       = the_canvas.getContext('2d');
    var color_element = function (element) {
      return su.rgba(0, 0, data[element.data] / 15, 0.8);
    };
    var render = su.chart_renderer(color_element, context);
    context.strokeStyle = 'white';
    render(chart);

And that's it! We now have [this](http://spencertipping.com/caterwaul-splunge/examples/readme-example.html).