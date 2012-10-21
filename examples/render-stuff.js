var s          = caterwaul.splunge;
var su         = caterwaul.splunge_ui;
var the_canvas = document.getElementById('chart');
var data       = {foo: 3, bar: 1, bif: 8, baz: 10};

var unstacked_boxes = [];
for (var k in data)
  if (data.hasOwnProperty(k))
    unstacked_boxes.push(
      s.rectangle(k, [0, 0], [1, data[k]]));

var stacked_boxes = s.y_stack(unstacked_boxes);
var chart_data    = s.bounded(stacked_boxes);

var chart = s.radial_chart(chart_data, {view: s.centered_in(the_canvas)});
var context = the_canvas.getContext('2d');
var color_element = function (element) {
  return su.rgba(0, 0, data[element.data] / 15, 0.8);
};
var render = su.chart_renderer(color_element, context);

context.strokeStyle = 'white';
render(chart);
