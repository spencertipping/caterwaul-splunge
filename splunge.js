(function(f){return f(f)})(function(initializer){var calls_init=function(){var f=function(){return f.init.apply(f,arguments)};return f},original_global=typeof caterwaul==="undefined"?undefined:caterwaul,caterwaul_global=calls_init();
caterwaul_global.deglobalize=function(){caterwaul=original_global;return caterwaul_global};caterwaul_global.core_initializer=initializer;caterwaul_global.context=this;
caterwaul_global.merge=(function(o){for(var k in o){if(o.hasOwnProperty(k)){return true}}})({toString:true})?function(o){for(var i=1,l=arguments.length,_;i<l;++i){if(_=arguments[i]){for(var k in _){if(has(_,k)){o[k]=_[k]
}}}}return o}:function(o){for(var i=1,l=arguments.length,_;i<l;++i){if(_=arguments[i]){for(var k in _){if(has(_,k)){o[k]=_[k]}}if(_.toString&&!/\[native code\]/.test(_.toString.toString())){o.toString=_.toString
}}}return o},caterwaul_global.modules=[];caterwaul_global.module=function(name,transform,f){if(arguments.length===1){return caterwaul_global[name+"_initializer"]
}name+"_initializer" in caterwaul_global||caterwaul_global.modules.push(name);f||(f=transform,transform=null);(caterwaul_global[name+"_initializer"]=transform?caterwaul_global(transform)(f):f)(caterwaul_global);
return caterwaul_global};return caterwaul=caterwaul_global});
caterwaul.module("numeric-offline-2", function ($) {$.numeric_offline_2 = {vplus: (function (a, b) {return[a[0] + b[0] ,a[1] + b[1]]}),
vtimes: (function (a, b) {return[a[0] * b[0] ,a[1] * b[1]]}),
vminus: (function (a, b) {return[a[0] - b[0] ,a[1] - b[1]]}),
vscale: (function (a, b) {return[a[0] * b,a[1] * b]}),
vdot: (function (a, b) {return a[0] * b[0] +a[1] * b[1]}),
vnorm: (function (a) {return Math.sqrt(a[0] * a[0] +a[1] * a[1])}),
vmin: (function (a, b) {return[Math.min(a[0] , b[0]) ,Math.min(a[1] , b[1])]}),
vmacv: (function (a, b, c) {return[ [a[0] + b[0] * c[0] ,a[1] + b[1] * c[1]]]}),
vmax: (function (a, b) {return[Math.max(a[0] , b[0]) ,Math.max(a[1] , b[1])]}),
vmacs: (function (a, b, c) {return[ [a[0] + b * c[0] ,a[1] + b * c[1]]]}),
vunit: (function (e,e1) {var result= ( (function (a) {return e(a, 1.0 /e1(a))})) ; ;return(result)}) .call(this, (function (a, b) {return[a[0] * b,a[1] * b]}) , (function (a) {return Math.sqrt(a[0] * a[0] +a[1] * a[1])})),
vproj: (function (e,e1) {var result= ( (function (a, b) {return e(b,e1(a, b) /e1(b, b))})) ; ;return(result)}) .call(this, (function (a, b) {return[a[0] * b,a[1] * b]}) , (function (a, b) {return a[0] * b[0] +a[1] * b[1]})),
vorth: (function (e,e1,e2) {var result= ( (function (a, b) {return e(a,e1(b,e2(a, b) /e2(b, b)))})) ; ;return(result)}) .call(this, (function (a, b) {return[a[0] - b[0] ,a[1] - b[1]]}) , (function (a, b) {return[a[0] * b,a[1] * b]}) , (function (a, b) {return a[0] * b[0] +a[1] * b[1]}))}});

caterwaul.module( 'splunge' , (function (e) {var result= ( function ($) { (function () {var vplus=e.vplus,vtimes=e.vtimes,vminus=e.vminus,vscale=e.vscale,vdot=e.vdot,vnorm=e.vnorm,vmin=e.vmin,vmacv=e.vmacv,vmax=e.vmax,vmacs=e.vmacs,vunit=e.vunit,vproj=e.vproj,vorth=e.vorth
; return $.splunge = (function () {var tau = Math.PI * 2, atan_scale = 2 / Math.PI, scaled_atan =function (x) { 
; return Math.atan(x) * atan_scale} , clip =function (x) { 
; return Math.min(Math.max( x, -1) , 1)} , epsilon = 2.220446049250313e-16, infinity = 1 / epsilon, scaled_tan =function (x) { 
; return Math.tan(clip(x) / atan_scale)} , componentwise =function (f1, f2) { 
; return function (v) { 
; return [f1(v[0]) , f2(v[1])]}} , x_tangent = {transform: componentwise(scaled_tan,function (_) {return _}) , inverse:function () { 
; return x_arctangent}} , x_arctangent = {transform: componentwise(scaled_atan,function (_) {return _}) , inverse:function () { 
; return x_tangent}} , y_tangent = {transform: componentwise(function (_) {return _} , scaled_tan) , inverse:function () { 
; return y_arctangent}} , y_arctangent = {transform: componentwise(function (_) {return _} , scaled_atan) , inverse:function () { 
; return y_tangent}} , polar_to_cartesian = {transform:function (v) {var d = v[0] 
;var t = v[1] 
; return [d * Math.cos(t) , d * Math.sin(t)]} , inverse:function () { 
; return cartesian_to_polar}} , cartesian_to_polar = {transform:function (v) {var d =vnorm( v) 
;var t = Math.atan2(v[0] , v[1]) 
; return [d, t]} , inverse:function () { 
; return polar_to_cartesian}} , bounding_box =function (b) { 
; return{transform:function (v) { 
; return( b) .intern( v)} , inverse:function () { 
; return identity_transform}}} , identity_transform = {transform:function (v) { 
; return v} , inverse:function () { 
; return this}} , composite =function () {var ts = arguments
; return{transform:function (v) { 
; return(function (xs) {var x, x0, xi, xl, xr
;for (var xl = xs.length - 1, xi = xl, x0 = (v) 
; xi >= 0
; --xi) x = xs[xi] , x0 = (x.transform(x0)) 
; return x0}) .call(this, ts)} , inverse:function () { 
; return this.inverse_ !== void 0 ? this.inverse_: this.inverse_ = (function (it) {return it.inverse_ = this, it}) .call(this, ( composite.apply(this, (function (xs) {var x, x0, xi, xl, xr
;for (var xr = new xs.constructor() , xi = 0, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , xr.push( (xs[xl - xi - 1] .inverse())) 
; return xr}) .call(this,Array.prototype.slice.call( (ts))))))}}} , box_ctor = (function (it) {return $.merge( it.prototype, {area:function () { 
; return Math.abs(this.dv[0] * this.dv[1])} , contains:function (v) { 
; return v[0] >= this.v[0] && v[1] >= this.v[1] && v[0] <= this.v[0] + this.dv[0] && v[1] <= this.v[1] + this.dv[1]} , interpolate:function (b, x) { 
; return( this.scale(1 - x)) .plus( b.scale(x))} , intersect:function (b) { 
; return( this) .map_corners(function (_) {return(b) .intern( _)})} , transform:function (v) { 
; return vplus( this.v,vtimes( v, this.dv))} , union:function (b) { 
; return(function () {var c1 =vmin( this.v, b.v) , c2 =vmax(vplus( this.v, this.dv) ,vplus( b.v, b.dv)) 
; return box(c1,vminus( c2, c1))}) .call(this)} , transform_v_with:function (t) { 
; return box( t.transform(this.v) , this.dv)} , transform_dv_with:function (t) { 
; return box( this.v, t.transform(this.dv))} , children:function () { 
; return []} , toString:function () { 
; return( '[' + (this.v[0]) + ',' + (this.v[1]) + ' -> ' + (this.dv[0]) + ',' + (this.dv[1]) + ']')} , intern:function (v) { 
; return vmin(vmax( v, this.v) ,vplus( this.v, this.dv))} , map_corners:function (f) { 
; return(function () {var c1 = f(this.v) , c2 = f(vplus(this.v, this.dv)) 
; return rectangle(this.data, c1,vminus( c2, c1))}) .call(this)} , plus:function (b) { 
; return box(vplus(this.v, b.v) ,vplus( this.dv, b.dv))} , transform_with:function (t) { 
; return( this) .map_corners(function (_) {return(t) .transform( _)})} , scale:function (x) { 
; return box(vscale(this.v, x) ,vscale( this.dv, x))} , bound:function () { 
; return this} , times:function (v) { 
; return box(this.v,vtimes( v, this.dv))} , inverse:function () { 
; return box( [ -this.v[0] / this.dv[0] , -this.v[1] / this.dv[1]] , [1 / this.dv[0] , 1 / this.dv[1]])}}) , it}) .call(this, ( (function (v, dv) {return this.v = v, this.dv = dv, null}))) , box =function (v, dv) { 
; return new box_ctor(v, dv)} , translate =function (v) { 
; return new box_ctor(v, [1, 1])} , bound_everything = box( [ -infinity, -infinity] , [2 * infinity, 2 * infinity]) , rectangle =function (data, v, dv) {var b = box(v, dv) 
; return( b.data =data, b)} , scale =function (v) { 
; return new box_ctor( [0, 0] , v)} , bound_nothing = box( [ 0, 0] , [ 0, 0]) , by =function (f) { 
; return function (a, b) { 
; return f(a) - f(b)}} , dot_ordering =function (bound, x) {var b = x.bound() 
; return vdot(vminus( b.v, bound.v) , bound.dv)} , bounded =function (xs) { 
; return(function () {var bound = (function (xs) {var x, x0, xi, xl, xr
;for (var x0 = xs[0] , xi = 1, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , x0 = ( (x0) .union( x)) 
; return x0}) .call(this, (function (xs) {var x, x0, xi, xl, xr
;for (var xr = new xs.constructor() , xi = 0, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , xr.push( (x.bound())) 
; return xr}) .call(this, xs)) , children = ( xs.slice()) .sort( by(function (_) {return dot_ordering(bound, _)})) 
; return{bound:function () { 
; return bound} , children:function () { 
; return children} , transform_with:function (t) { 
; return bounded( (function (xs) {var x, x0, xi, xl, xr
;for (var xr = new xs.constructor() , xi = 0, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , xr.push( (x.transform_with(t))) 
; return xr}) .call(this,this.children()))} , interpolate:function (b, x) { 
; return bounded_interpolation(this, b, x)}}}) .call(this)} , find_point =function (v, b) { 
; return( b.bound()) .contains( v) ? (function (xs) {var x, x0, xi, xl, xr
;for (var x = xs[0] , xi = 0, xl = xs.length, x1
; xi < xl
; ++xi) {x = xs[xi] 
; if (x1 = (find_point(v, x))) return x1} return false}) .call(this, b.children()) || b: null} , scale_size =function (l, x) {var b = l.bound() 
; return l.transform_with(composite(translate(b.v) , scale( [x, x]) , translate( [ -b.v[0] , -b.v[1]])))} , bounded_interpolation =function (l1, l2, x) { 
; return x === 0 ? l1: x === 1 ? l2: l1 === l2 ? l1: bounded( [scale_size(l1, 1 - x) , scale_size(l2, x)])} , descend_while =function (f, x) { 
; return f(x) ? ( [x]) .concat( ( (function (xs) {var x, x0, xi, xl, xr
;for (var xr = new xs.constructor() , xi = 0, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , xr.push.apply(xr, Array.prototype.slice.call( (descend_while(f, x)))) 
; return xr}) .call(this, x.children()))): []} , no_path =function (b) { 
; return function (c) { 
; return null}} , rectangle_path =function (b) { 
; return function (c) { 
; return( c.beginPath() , c.rect(b.v[0] , b.v[1] , b.dv[0] , b.dv[1]))}} , arc_path =function (b) {var p = ( b) .transform_with( cartesian_to_polar) 
; return function (c) { 
; return( ( c.beginPath() , c.arc(0, 0, p.v[0] , p.v[1] , p.v[1] + p.dv[1] , true)) , c.arc(0, 0, p.v[0] + p.dv[0] , p.v[1] + p.dv[1] , p.v[1]))}} , transformed_delta =function (t, v) {var tv = t.transform(v) 
; return function (dv) { 
; return vminus( t.transform(vplus(v, dv)) , tv)}} , pan =function (b, dv) { 
; return( b) .transform_v_with( translate(dv) .inverse())} , context_box =function (b) { 
; return function (c) { 
; return( ( c.translate(b.v[0] , b.v[1]) , c.scale(b.dv[0] , b.dv[1])) , c)}} , zoom =function (b, dv) { 
; return( b) .transform_dv_with( scale(dv) .inverse())} , centered_in =function (c) {var w = +c.width
;var h = +c.height
;var m =Math.min( w, h) 
; return box( [w >> 1, h >> 1] , [m >> 1, m >> 1])} , chart_ctor = (function (it) {return $.merge( it.prototype, {slice:function (s, d, v) { 
; return new this.constructor(this.transform_, this.path_, this.area_, v || this.view_, s || this.slice_, d || this.data_)} , interpolate:function (c, x) { 
; return this.slice(this.slice_.interpolate(c.slice_, x) , this.data_.interpolate(c.data_, x) , this.view_.interpolate(c.view_, x))} , transformed_data:function () { 
; return( this.data_) .transform_with(composite( this.transform_, this.slice_))} , visible_data:function (limit) { 
; return descend_while( (function () {var area_fn = this.area_, limit_area = limit / this.view_.area() 
; return function (_) {return area_fn(_.bound()) > limit_area}}) .call(this) , this.transformed_data())} , transform_context:function (c) { 
; return(function (it) {return c.lineWidth /=Math.max( this.view_.dv[0] , this.view_.dv[1]) , it}) .call(this, ( context_box(this.view_) (c)))} , transform:function () { 
; return this.composite_transform_ !== void 0 ? this.composite_transform_: this.composite_transform_ = composite(this.view_, this.transform_, this.slice_)} , with_context:function (c, f) { 
; return(function () {var r = null
; return( ( ( c.save() , r =f.call(this, this.transform_context(c))) , c.restore()) , r)}) .call(this)} , render:function (f, limit) { 
; return(function (xs) {var x, x0, xi, xl, xr
;for (var xi = 0, xl = xs.length
; xi < xl
; ++xi) x = xs[xi] , (x.children() .length || f(this.path_(x.bound()))) 
; return xs}) .call(this, this.visible_data(limit || 1))} , find:function (v) { 
; return find_point(this.transform() .inverse() .transform(v) , this.data_)}}) , it}) .call(this, ( (function (transform, path, area, view, slice, data) {return this.transform_ = transform, this.path_ = path, this.area_ = area, this.view_ = view, this.slice_ = slice, this.data_ = data, null}))) , rectangular_chart =function (data, options) {var options =$.merge( {} , rectangular_defaults, options) 
; return new chart_ctor(options.transform, rectangle_path, options.area, options.view, options.slice, data)} , radial_chart =function (data, options) {var options =$.merge( {} , radial_defaults, options) 
; return new chart_ctor(options.transform, arc_path, options.area, options.view, options.slice, data)} , polar_area =function (box) { 
; return Math.abs( box.dv[1] * (2 * box.v[0] * box.dv[0] + box.dv[0] * box.dv[0]))} , rectangular_defaults = {transform: x_arctangent, slice:scale( [1, 1]) , area:function (_) {return _.area()}} , radial_defaults = {transform:composite( polar_to_cartesian, scale( [1, Math.PI]) , x_arctangent) , slice:scale( [1, 1]) , area:function (_) {return polar_area(_.transform_with(cartesian_to_polar))}} , unit_bound = bounding_box(box( [ -1, -1] , [2, 2])) , radial_bound = bounding_box(box( [ -1, -Math.PI] , [2, tau - epsilon])) 
; return{ tau: tau, atan_scale: atan_scale, scaled_atan: scaled_atan, clip: clip, epsilon: epsilon, infinity: infinity, scaled_tan: scaled_tan, componentwise: componentwise, x_tangent: x_tangent, x_arctangent: x_arctangent, y_tangent: y_tangent, y_arctangent: y_arctangent, polar_to_cartesian: polar_to_cartesian, cartesian_to_polar: cartesian_to_polar, bounding_box: bounding_box, identity_transform: identity_transform, composite: composite, box_ctor: box_ctor, box: box, translate: translate, bound_everything: bound_everything, rectangle: rectangle, scale: scale, bound_nothing: bound_nothing, by: by, dot_ordering: dot_ordering, bounded: bounded, find_point: find_point, scale_size: scale_size, bounded_interpolation: bounded_interpolation, descend_while: descend_while, no_path: no_path, rectangle_path: rectangle_path, arc_path: arc_path, transformed_delta: transformed_delta, pan: pan, context_box: context_box, zoom: zoom, centered_in: centered_in, chart_ctor: chart_ctor, rectangular_chart: rectangular_chart, radial_chart: radial_chart, polar_area: polar_area, rectangular_defaults: rectangular_defaults, radial_defaults: radial_defaults, unit_bound: unit_bound, radial_bound: radial_bound}}) .call(this)}) .call(this)}) 
;result.caterwaul_expression_ref_table = {e: ( "caterwaul.numeric_offline_2")} 
;return(result)}) .call(this,caterwaul.numeric_offline_2)) 
;