caterwaul.module( 'splunge' ,function($) {$.splunge=function(data) {;
return $.splunge.create(data) } ,$.merge($.splunge, (function() {var tau=2*Math.PI,bbox=function(h) {;
return(function() {var b=function(h,x0,y0,dy) {;
return h.bbox?h.bbox
:h.bbox= (function() {var self_x0=x0+ (h.x0||0) ,self_dx=h.dx||1,new_x0=self_x0+self_dx,new_y0=y0+h.y0*dy,new_dy=dy*h.dy;
return(h.xs&& (function(cs) {var c,c0,ci,cl,cr;
for(var ci=0,cl=cs.length;
ci<cl;
 ++ci)c=cs[ci] , (b(c,new_x0,new_y0,new_dy) ) ;
return cs} ) .call(this,h.xs) , {x0:self_x0,dx: (h.dx||1) + (h.xs? (function(xs) {var x,x0,xi,xl,xr;
for(var x0= (0) ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,x0= (Math.max(x0,x.bbox.dx) ) ;
return x0} ) .call(this,h.xs) 
:0) ,self_dx:self_dx,y0:new_y0,dy:new_dy} ) } ) .call(this) } ;
return b(h,0,0,1) } ) .call(this) } ,base=function(b) {;
return{x:b.x0,y:b.y0} } ,mix=function(a,b) {;
return{x:a.x,y:b.y} } ,d=function(b) {;
return{x:b.dx,y:b.dy} } ,project=function(b,x) {;
return{x:b.x0+b.dx*x,y:b.y0+b.dy*x} } ,self_bbox=function(h) {;
return h.self_bbox?h.self_bbox
:h.self_bbox= (function(it) {return it.dx=it.self_dx,it} ) .call(this, ( (function(o) {for(var r= {} ,i=0,l=o.length,x;
i<l;
 ++i)x=o[i] ,r[x[0] ] =x[1] ;
return r} ) .call(this, ( (function(o) {var ps= [] ;
for(var k in o)Object.prototype.hasOwnProperty.call(o,k) &&ps.push( [k,o[k] ] ) ;
return ps} ) .call(this, (bbox(h) ) ) ) ) ) ) } ,normalized=function(xs,h) { (h?h
:h=1) ;
return(function() {var y=0,ymax= (function(xs) {var x,x0,xi,xl,xr;
for(var x0= (0) ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,x0= (x0+x.dy) ;
return x0} ) .call(this,xs) *h;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( ( (function(it) {return y+=it.dy,it} ) .call(this, ($.merge(x, {y0:y,dy:x.dy/ymax} ) ) ) ) ) ;
return xr} ) .call(this,xs) } ) .call(this) } ,descendant_count=function(h) {;
return h.descendant_count?h.descendant_count
:h.descendant_count=1+ (h.xs? (function(xs) {var x,x0,xi,xl,xr;
for(var x0= (0) ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,x0= (x0+descendant_count(x) ) ;
return x0} ) .call(this,h.xs) 
:0) } ,discrete_tree=function(xs) {;
return normalized( (function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( ($.merge(x, {dy:descendant_count(x) } ) ) ) ;
return xr} ) .call(this,xs) ) } ,interpolate=function(t1,t2,x) {;
return add(scale(t1,1.0-x) ,scale(t2,x) ) } ,add=function(t1,t2) {;
return{x0:t1.x0+t2.x0,dx:t1.dx+t2.dx,y0:t1.y0+t2.y0,dy:t1.dy+t2.dy} } ,scale=function(t,x) {;
return{x0:t.x0*x,dx:t.dx*x,y0:t.y0*x,dy:t.dy*x} } ,inverse=function(t,p) {;
return{x:Math.tan( (Math.sqrt(p.x*p.x+p.y*p.y) -0.5) *Math.PI) *t.dx+t.x0,y: (Math.atan2(p.y,p.x) /tau+1) %1*t.dy+t.y0} } ,transform=function(t,p) {;
return(function() {var d=Math.atan( (p.x-t.x0) /t.dx) /Math.PI+0.5,angle=Math.min(Math.max( (p.y-t.y0) /t.dy*tau,0) ,tau) ;
return{x:d*Math.cos(angle) ,y:d*Math.sin(angle) ,d:d,angle:angle} } ) .call(this) } ,point_hits=function(p,h) {;
return(function(it) {return p.x>=it.x0&&p.y>=it.y0&&p.y<=it.y0+it.dy&&it} ) .call(this, (bbox(h) ) ) } ,point_hits_self=function(p,h) {;
return(function(it) {return it&&p.x<=it.x0+it.self_dx} ) .call(this, (point_hits(p,h) ) ) } ,find_by_transformed=function(h,t,p) {;
return find_by_point(h,inverse(t,p) ) } ,find_by_point=function(h,p) {;
return point_hits(p,h) && (point_hits_self(p,h) ?h
:h.xs&& (function(xs) {var x,x0,xi,xl,xr;
for(var x=xs[0] ,xi=0,xl=xs.length,x1;
xi<xl;
 ++xi) {x=xs[xi] ;
if(x1= (find_by_point(x,p) ) )return x1}return false} ) .call(this,h.xs) ) } ,arc_path=function(h,t) {;
return function(c) {;
return(function() {var p1=base(self_bbox(h) ) ,p2=project(self_bbox(h) ,1) ,c1=transform(t,p1) ,c3=transform(t,p2) ,c2=transform(t,mix(p2,p1) ) ,c4=transform(t,mix(p1,p2) ) ;
return( ( ( (c.moveTo(c1.x,c1.y) ,c.lineTo(c2.x,c2.y) ) ,c.arc(0,0,c2.d,c2.angle,c3.angle) ) ,c.lineTo(c4.x,c4.y) ) ,c.arc(0,0,c4.d,c4.angle,c1.angle,true) ) } ) .call(this) } } ,is_visible=function(h,t) {;
return bbox(h) .y0+h.bbox.dy>t.y0&&h.bbox.y0<t.y0+t.dy} ,transformed_width=function(h,t) {;
return transform(t,project(self_bbox(h) ,1) ) .d-transform(t,base(bbox(h) ) ) .d} ,paths=function(h,t) {;
return function(f) {;
return f(arc_path(h,t) ,h,t) && (h.xs&& (function(xs) {var x,x0,xi,xl,xr;
for(var xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] , (is_visible(x,t) &&paths(x,t) (f) ) ;
return xs} ) .call(this,h.xs) ) } } ;
return{tau:tau,bbox:bbox,base:base,mix:mix,d:d,project:project,self_bbox:self_bbox,normalized:normalized,descendant_count:descendant_count,discrete_tree:discrete_tree,interpolate:interpolate,add:add,scale:scale,inverse:inverse,transform:transform,point_hits:point_hits,point_hits_self:point_hits_self,find_by_transformed:find_by_transformed,find_by_point:find_by_point,arc_path:arc_path,is_visible:is_visible,transformed_width:transformed_width,paths:paths} } ) .call(this) ) } ) ;
