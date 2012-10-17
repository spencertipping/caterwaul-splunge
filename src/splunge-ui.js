caterwaul.module( 'splunge.ui' , (function (e1) {var result= ( function ($) { (function () {var tau=e1.tau,atan_scale=e1.atan_scale,scaled_atan=e1.scaled_atan,clip=e1.clip,epsilon=e1.epsilon,infinity=e1.infinity,scaled_tan=e1.scaled_tan,componentwise=e1.componentwise,x_tangent=e1.x_tangent,x_arctangent=e1.x_arctangent,y_tangent=e1.y_tangent,y_arctangent=e1.y_arctangent,polar_to_cartesian=e1.polar_to_cartesian,cartesian_to_polar=e1.cartesian_to_polar,bounding_box=e1.bounding_box,identity_transform=e1.identity_transform,composite=e1.composite,box_ctor=e1.box_ctor,box=e1.box,translate=e1.translate,bound_everything=e1.bound_everything,rectangle=e1.rectangle,scale=e1.scale,bound_nothing=e1.bound_nothing,x_stack=e1.x_stack,y_stack=e1.y_stack,renderable=e1.renderable,bounded=e1.bounded,scale_size=e1.scale_size,bounded_interpolation=e1.bounded_interpolation,find_point=e1.find_point,descend_while=e1.descend_while,no_path=e1.no_path,rectangle_path=e1.rectangle_path,arc_path=e1.arc_path,transformed_delta=e1.transformed_delta,pan=e1.pan,context_box=e1.context_box,zoom=e1.zoom,centered_in=e1.centered_in,chart_ctor=e1.chart_ctor,rectangular_chart=e1.rectangular_chart,radial_chart=e1.radial_chart,polar_area=e1.polar_area,rectangular_defaults=e1.rectangular_defaults,radial_defaults=e1.radial_defaults;
 return $.splunge_ui = (function () {var rgba =function (h, s, v, a) {var cs = rgb(h, s, v) ;
 return( 'rgba(' + (cs[0] * 255 >>> 0) + ', ' + (cs[1] * 255 >>> 0) + ', ' + (cs[2] * 255 >>> 0) + ', ' + (a) + ')')} , rgb =function (h, s, v) {var c = v * s;
var x = 1 - Math.abs(h*6 % 2 - 1) ;
var m = v - c;
var c1 = c + m;
var c2 = x + m;
var c3 = m;
 return h < 0.5 ? h < 1/6 ? [c1, c2, c3 ]: h < 1/3 ? [c2, c1, c3 ]: [c3, c1, c2 ]: h < 2/3 ? [c3, c2, c1 ]: h < 5/6 ? [c2, c3, c1 ]: [c3, c2, c1]} , animator =function (duration, tween) { ;
 return function (f) {var i = null;
var start = +new Date;
 return i = setInterval( (function (e) {return(function () {var now = +new Date;
 return(f(tween(Math.min(1, (now - start) / duration))) ,now - start > duration && ( clearInterval(i) , f(1, true)))}) .call(this)}) , 30)}} , cosine_tween =function (x) { ;
 return Math.cos(x * Math.PI) * -0.5 + 0.5} , animate = animator(400, cosine_tween) , renderer =function (color_fn, context) { ;
 return function (path_fn, element) { ;
 return( ( ( path_fn(context) , context.fillStyle = color_fn(element)) , context.fill()) , context.stroke())}} , chart_renderer =function (color_fn, context, limit) { ;
 return function (chart) { ;
 return( ( context.fillStyle = context.strokeStyle, context.fillRect( -1e8, -1e8, 2e8, 2e8)) , chart.with_context(context, (function (c) {return chart.render(renderer(color_fn, c) , limit)})))}} ;
 return{ rgba: rgba, rgb: rgb, animator: animator, cosine_tween: cosine_tween, animate: animate, renderer: renderer, chart_renderer: chart_renderer}}) .call(this)}) .call(this)}) ;
result.caterwaul_expression_ref_table = {e1: ( "caterwaul.splunge")} ;
return(result)}) .call(this,caterwaul.splunge)) ;
