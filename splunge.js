caterwaul.module( 'vector' , (function(qs,qs1,qs2,qs3,qs4,qs5,qs6,qs7,qs8,qs9,qsa,qsb,qsc,qsd,qse,qsf,qsg,qsh,qsi,qsj,qsk,qsl,qsm,qsn,qso,qsp,qsq,qsr,qss,qst,qsu,qsv,qsw,qsx,qsy,qsz,qs10,qs11,qs12,qs13,qs14,qs15,qs16,qs17,qs18,qs19,qs1a) {var result= (function($) { (function() {var generator=function(base,composite) {;
return function(n,prefix) {;
return(function() {var compiled_base=base(n) ;
return rename($.merge( {} ,compiled_base,composite(compiled_base) ) ,prefix) } ) .call(this) } } ,rename=function(o,prefix) {;
return(function(xs) {var x,x0,xi,xl,xr;
var xr=new xs.constructor() ;
for(var x in xs)if(Object.prototype.hasOwnProperty.call(xs,x) )xr[ ( '' + (prefix|| "" ) + '' + (x) + '' ) ] =xs[x] ;
return xr} ) .call(this,o) } ,compile_function=function(xs,e) {;
return $.compile( (qs) .replace( {_formals:xs,_e:e} ) ) } ,base_v=function(n) {;
return(function() {var r=function(n,formals,wrap,fold,each) {;
return(function() {var body= (wrap) .replace( {x: (function(xs) {var x,x0,xi,xl,xr;
for(var x0=xs[0] ,xi=1,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,x0= ( (fold) .replace( {x:x0,y:x} ) ) ;
return x0} ) .call(this, (function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( ( (each) .replace( {i: ( '' + (x) + '' ) } ) ) ) ;
return xr} ) .call(this, (function(i,u,s) {if( (u-i) *s<=0)return[] ;
for(var r= [] ,d=u-i;
d>0?i<u
:i>u;
i+=s)r.push(i) ;
return r} ) ( (0) , (n) , (1) ) ) ) } ) ;
return compile_function(formals,body) } ) .call(this) } ;
return{plus:r(n,qs1,qs2,qs3,qs4) ,times:r(n,qs5,qs6,qs7,qs8) ,minus:r(n,qs9,qsa,qsb,qsc) ,scale:r(n,qsd,qse,qsf,qsg) ,dot:r(n,qsh,qsi,qsj,qsk) ,norm:r(n,qsl,qsm,qsn,qso) ,min:r(n,qsp,qsq,qsr,qss) ,max:r(n,qst,qsu,qsv,qsw) ,macv:r(n,qsx,qsy,qsz,qs10) ,macs:r(n,qs11,qs12,qs13,qs14) } } ) .call(this) } ,composite_v=function(base) {;
return(function() {var ref_compile=function(functions,formals,body) {;
return(function() {var new_body= (body) .replace( (function(xs) {var x,x0,xi,xl,xr;
var xr=new xs.constructor() ;
for(var k in xs)if(Object.prototype.hasOwnProperty.call(xs,k) )x=xs[k] ,xr[k] = (new $.ref(x) ) ;
return xr} ) .call(this,functions) ) ;
return compile_function(formals,new_body) } ) .call(this) } ;
return{unit:ref_compile(base,qs15,qs16) ,proj:ref_compile(base,qs17,qs18) ,orth:ref_compile(base,qs19,qs1a) } } ) .call(this) } ;
return $.vector=generator(base_v,composite_v) } ) .call(this) } ) ;
result.caterwaul_expression_ref_table= {qs: ( "new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"_e\" ) ) ) ) )" ) ,qs1: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qs2: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qs3: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qs4: ( "new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) )" ) ,qs5: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qs6: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qs7: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qs8: ( "new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) )" ) ,qs9: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qsa: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qsb: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qsc: ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) )" ) ,qsd: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qse: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qsf: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qsg: ( "new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"b\" ) )" ) ,qsh: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qsi: ( "new caterwaul.syntax( \"x\" )" ) ,qsj: ( "new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qsk: ( "new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) )" ) ,qsl: ( "new caterwaul.syntax( \"a\" )" ) ,qsm: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"Math\" ) ,new caterwaul.syntax( \"sqrt\" ) ) ,new caterwaul.syntax( \"x\" ) )" ) ,qsn: ( "new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qso: ( "new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) )" ) ,qsp: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qsq: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qsr: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qss: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"Math\" ) ,new caterwaul.syntax( \"min\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) ) )" ) ,qst: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qsu: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qsv: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) )" ) ,qsw: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"Math\" ) ,new caterwaul.syntax( \"max\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) ) )" ) ,qsx: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) ) ,new caterwaul.syntax( \"c\" ) )" ) ,qsy: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qsz: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) ) )" ) ,qs10: ( "new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"c\" ) ,new caterwaul.syntax( \"i\" ) ) ) )" ) ,qs11: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) ) ,new caterwaul.syntax( \"c\" ) )" ) ,qs12: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"x\" ) )" ) ,qs13: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"x\" ) ,new caterwaul.syntax( \"y\" ) ) )" ) ,qs14: ( "new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"i\" ) ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"c\" ) ,new caterwaul.syntax( \"i\" ) ) ) )" ) ,qs15: ( "new caterwaul.syntax( \"a\" )" ) ,qs16: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"scale\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"1.0\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"norm\" ) ,new caterwaul.syntax( \"a\" ) ) ) ) )" ) ,qs17: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qs18: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"scale\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"dot\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) ) ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"dot\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"b\" ) ) ) ) ) )" ) ,qs19: ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) )" ) ,qs1a: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"minus\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"scale\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"dot\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"a\" ) ,new caterwaul.syntax( \"b\" ) ) ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"dot\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"b\" ) ,new caterwaul.syntax( \"b\" ) ) ) ) ) ) ) )" ) } ;
return(result) } ) .call(this,new caterwaul.syntax( "(" ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "_e" ) ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "Math" ) ,new caterwaul.syntax( "sqrt" ) ) ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "Math" ) ,new caterwaul.syntax( "min" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "Math" ) ,new caterwaul.syntax( "max" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "c" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "c" ) ,new caterwaul.syntax( "i" ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "c" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "x" ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "," ,new caterwaul.syntax( "x" ) ,new caterwaul.syntax( "y" ) ) ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "i" ) ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "c" ) ,new caterwaul.syntax( "i" ) ) ) ) ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "scale" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "1.0" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "norm" ) ,new caterwaul.syntax( "a" ) ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "scale" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "dot" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "dot" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "b" ) ) ) ) ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "minus" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "scale" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "dot" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "a" ) ,new caterwaul.syntax( "b" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "dot" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "b" ) ,new caterwaul.syntax( "b" ) ) ) ) ) ) ) ) ) ) ;

caterwaul.module( 'splunge' ,function($) {$.splunge= (function() {var(function() {var, ;
return tau=Math.PI*2,atan_scale=2/Math.PI,scaled_atan=function(x) {;
return Math.atan(x) *atan_scale} ,clip=function(x) {;
return Math.min(Math.max(x, -1) ,1) } ,id=function(x) {;
return x} ,scaled_tan=function(x) {;
return Math.tan(clip(x/atan_scale) ) } ,componentwise=function(f1,f2) {;
return function(v) {;
return[f1(v[0] ) ,f2(v[1] ) ] } } ,x_tangent= {transform:componentwise(scaled_tan,id) ,inverse:function() {;
return x_arctangent} } ,x_arctangent= {transform:componentwise(scaled_atan,id) ,inverse:function() {;
return x_tangent} } ,y_tangent= {transform:componentwise(id,scaled_tan) ,inverse:function() {;
return y_arctangent} } ,y_arctangent= {transform:componentwise(id,scaled_atan) ,inverse:function() {;
return y_tangent} } ,polar_to_cartesian= {transform:function(v) {var d=v[0] ;
var t=v[1] ;
return[d*Math.cos(t) ,d*Math.sin(t) ] } ,inverse:function() {;
return cartesian_to_polar} } ,cartesian_to_polar= {transform:function(v) {var d=vnorm(v) ;
var t=Math.atan2(v[0] ,v[1] ) ;
return[d, (t+tau) %tau] } ,inverse:function() {;
return polar_to_cartesian} } ,bounding_box=function(b) {;
return{transform:function(v) {;
return(b) .intern(v) } ,inverse:function() {;
return identity_transform} } } ,identity_transform= {transform:function(v) {;
return v} ,inverse:function() {;
return this} } ,composite=function() {var ts=arguments;
return{transform:function(v) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (v) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (x.transform(x0) ) ;
return x0} ) .call(this,ts) } ,inverse:function() {;
return this.inverse_!==void 0?this.inverse_
:this.inverse_= (function(it) {return it.inverse_=this,it} ) .call(this, (composite.apply(this, (function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( (x.inverse() ) ) ;
return xr} ) .call(this,Array.prototype.slice.call( (ts) ) ) ) ) ) } } } ,box_ctor= (function(it) {return $.merge(it.prototype, {area:function() {;
return this.dv[0] *this.dv[1] } ,contains:function(v) {;
return v[0] >=this.v[0] &&v[1] >=this.v[1] &&v[0] <=this.v[0] +this.dv[0] &&v[1] <=this.v[1] +this.dv[1] } ,interpolate:function(b,x) {;
return(this.scale(1-x) ) .plus(b.scale(x) ) } ,intersect:function(b) {;
return(this) .map_corners(function(_) {return(b) .intern(_) } ) } ,transform:function(v) {;
return vplus(this.v,vtimes(v,this.dv) ) } ,union:function(b) {;
return(function() {var c1=vmin(this.v,b.v) ,c2=vmax(vplus(this.v,this.dv) ,vplus(b.v,b.dv) ) ;
return box(c1,vminus(c2,c1) ) } ) .call(this) } ,toString:function() {;
return( '[[' + (this.v[0] ) + ', ' + (this.v[1] ) + '] -> [' + (this.dv[0] ) + ', ' + (this.dv[1] ) + ']]' ) } ,intern:function(v) {;
return vmin(vmax(v,this.v) ,vplus(this.v,this.dv) ) } ,map_corners:function(f) {;
return(function() {var c1=f(this.v) ,c2=f(vplus(this.v,this.dv) ) ;
return rectangle(this.data,c1,vminus(c2,c1) ) } ) .call(this) } ,plus:function(b) {;
return box(vplus(this.v,b.v) ,vplus(this.dv,b.dv) ) } ,transform_with:function(t) {;
return(this) .map_corners(function(_) {return(t) .transform(_) } ) } ,scale:function(x) {;
return box(vscale(this.v,x) ,vscale(this.dv,x) ) } ,bound:function() {;
return this} ,times:function(v) {;
return box(this.v,vtimes(v,this.dv) ) } ,inverse:function() {;
return box(vscale(this.v, -1) , [1/this.dv[0] ,1/this.dv[1] ] ) } } ) ,it} ) .call(this, ( (function(v,dv) {return this.v=v,this.dv=dv,null} ) ) ) ,box=function(v,dv) {;
return new box_ctor(v,dv) } ,translate=function(v) {;
return new box_ctor(v, [1,1] ) } ,bound_everything=box( [ -1/0, -1/0] , [1/0,1/0] ) ,rectangle=function(data,v,dv) {var b=box(v,dv) ;
return(b.data=data,b) } ,scale=function(v) {;
return new box_ctor( [0,0] ,v) } ,bound_nothing=box( [0,0] , [0,0] ) ,cons=function(first,rest_fn) {;
return new cons_ctor(first,rest_fn) } ,cons_from_array=function(xs) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (null) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (cons(x,k(x0) ) ) ;
return x0} ) .call(this,xs) } ,cons_to_array=function(c) {;
return reduce(c, [] , (function(x,rest) {return( [x] ) .concat(rest() ) } ) ) } ,k=function(x) {;
return function() {;
return x} } ,list=function() {var xs=arguments;
return cons_from_array(Array.prototype.slice.call( (xs) ) ) } ,reduce=function(xs,x_fn,f) {;
return xs?xs.reduce?xs.reduce(x_fn,f) 
:f(xs,x_fn) 
:x_fn() } ,cons_ctor= (function(it) {return $.merge(it.prototype, {reduce:function(x_fn,f) {var r=this.rest;
return f.call(this,this.first,function(_) {return(function() {var rest=r() ;
return rest?rest.reduce(x_fn,f) 
:x_fn() } ) .call(this) } ) } ,transform_with:function(t) {;
return map(function(_) {return _.transform_with(t) } ,this) } ,toString:function(force) {;
return( '' + (this.first) + ' :: ' + (force?this.rest() &&this.rest() .toString(force) 
: "..." ) + '' ) } ,bound:function() {;
return this.bound_} ,interpolate:function(l,x) {;
return list_interpolation(this,l,x) } } ) ,it} ) .call(this, ( (function(first,rest_fn) {return this.first=first,this.rest=rest_fn,this.bound_= (bound_everything) .intersect(this.first.bound() ) ,null} ) ) ) ,map=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return cons(f(x) ,rest) } ) ) } ,append=function(xs,ys_f) {;
return reduce(xs,ys_f,cons) ||ys_f() } ,first=function(xs) {;
return xs&&xs.first} ,filter=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(x) ?cons(x,rest) 
:rest() } ) ) } ,each=function(f,xs) {;
return reduce(xs,k(xs) , (function(x,rest) {return f(x) ,rest() } ) ) } ,take_outer_while=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(this) ?cons(x,rest) 
:null} ) ) } ,descend_while=function(f,xs) {;
return!xs||xs.reduce?reduce(take_outer_while(f,xs) ,k(null) , (function(x,rest) {return append(descend_while(f,x) ,rest) } ) ) 
:list(xs) } ,bounded=function(s,box) {;
return{bound:function() {;
return box} ,reduce:function(x,f) {;
return f(s,x) } } } ,x_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1/0,1] ) ) } ,y_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1,1/0] ) ) } ,x_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,x_stack=function(xs) {;
return x_shadow(xs,xs.first.bound() ) } ,y_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,y_stack=function(xs) {;
return y_shadow(xs,xs.first.bound() ) } ,scale_size=function(l,x) {var b=l.bound() ;
return l.transform_with(composite(translate(b.v) ,scale( [x,x] ) ,translate( [ -b.v[0] , -b.v[1] ] ) ) ) } ,list_interpolation=function(l1,l2,x) {;
return x===0?l1
:x===1?l2
:l1===l2?l1
:l1===null?scale_size(l2,1-x) 
:l2===null?scale_size(l1,x) 
:cons(list_interpolation(l1.first,l2.first,x) .transform_with(composite(l1.bound() .interpolate(l2.bound() ,x) ,l1.bound() .inverse() ) ) ,function(_) {return list_interpolation(l1.rest() ,l2.rest() ,x) } ) } ,no_path=function(b) {;
return function(c) {;
return null} } ,rectangle_path=function(b) {;
return function(c) {;
return(c.beginPath() ,c.rect(b.v[0] ,b.v[1] ,b.dv[0] ,b.dv[1] ) ) } } ,arc_path=function(b) {var p= (b) .transform_with(cartesian_to_polar) ;
return function(c) {;
return( (c.beginPath() ,c.arc(0,0,p.v[0] ,p.v[1] ,p.v[1] +p.dv[1] ,true) ) ,c.arc(0,0,p.v[0] +p.dv[0] ,p.v[1] +p.dv[1] ,p.v[1] ) ) } } } ) .call(this) ;
return{ (function() {var, ;
return tau=Math.PI*2,atan_scale=2/Math.PI,scaled_atan=function(x) {;
return Math.atan(x) *atan_scale} ,clip=function(x) {;
return Math.min(Math.max(x, -1) ,1) } ,id=function(x) {;
return x} ,scaled_tan=function(x) {;
return Math.tan(clip(x/atan_scale) ) } ,componentwise=function(f1,f2) {;
return function(v) {;
return[f1(v[0] ) ,f2(v[1] ) ] } } ,x_tangent= {transform:componentwise(scaled_tan,id) ,inverse:function() {;
return x_arctangent} } ,x_arctangent= {transform:componentwise(scaled_atan,id) ,inverse:function() {;
return x_tangent} } ,y_tangent= {transform:componentwise(id,scaled_tan) ,inverse:function() {;
return y_arctangent} } ,y_arctangent= {transform:componentwise(id,scaled_atan) ,inverse:function() {;
return y_tangent} } ,polar_to_cartesian= {transform:function(v) {var d=v[0] ;
var t=v[1] ;
return[d*Math.cos(t) ,d*Math.sin(t) ] } ,inverse:function() {;
return cartesian_to_polar} } ,cartesian_to_polar= {transform:function(v) {var d=vnorm(v) ;
var t=Math.atan2(v[0] ,v[1] ) ;
return[d, (t+tau) %tau] } ,inverse:function() {;
return polar_to_cartesian} } ,bounding_box=function(b) {;
return{transform:function(v) {;
return(b) .intern(v) } ,inverse:function() {;
return identity_transform} } } ,identity_transform= {transform:function(v) {;
return v} ,inverse:function() {;
return this} } ,composite=function() {var ts=arguments;
return{transform:function(v) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (v) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (x.transform(x0) ) ;
return x0} ) .call(this,ts) } ,inverse:function() {;
return this.inverse_!==void 0?this.inverse_
:this.inverse_= (function(it) {return it.inverse_=this,it} ) .call(this, (composite.apply(this, (function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( (x.inverse() ) ) ;
return xr} ) .call(this,Array.prototype.slice.call( (ts) ) ) ) ) ) } } } ,box_ctor= (function(it) {return $.merge(it.prototype, {area:function() {;
return this.dv[0] *this.dv[1] } ,contains:function(v) {;
return v[0] >=this.v[0] &&v[1] >=this.v[1] &&v[0] <=this.v[0] +this.dv[0] &&v[1] <=this.v[1] +this.dv[1] } ,interpolate:function(b,x) {;
return(this.scale(1-x) ) .plus(b.scale(x) ) } ,intersect:function(b) {;
return(this) .map_corners(function(_) {return(b) .intern(_) } ) } ,transform:function(v) {;
return vplus(this.v,vtimes(v,this.dv) ) } ,union:function(b) {;
return(function() {var c1=vmin(this.v,b.v) ,c2=vmax(vplus(this.v,this.dv) ,vplus(b.v,b.dv) ) ;
return box(c1,vminus(c2,c1) ) } ) .call(this) } ,toString:function() {;
return( '[[' + (this.v[0] ) + ', ' + (this.v[1] ) + '] -> [' + (this.dv[0] ) + ', ' + (this.dv[1] ) + ']]' ) } ,intern:function(v) {;
return vmin(vmax(v,this.v) ,vplus(this.v,this.dv) ) } ,map_corners:function(f) {;
return(function() {var c1=f(this.v) ,c2=f(vplus(this.v,this.dv) ) ;
return rectangle(this.data,c1,vminus(c2,c1) ) } ) .call(this) } ,plus:function(b) {;
return box(vplus(this.v,b.v) ,vplus(this.dv,b.dv) ) } ,transform_with:function(t) {;
return(this) .map_corners(function(_) {return(t) .transform(_) } ) } ,scale:function(x) {;
return box(vscale(this.v,x) ,vscale(this.dv,x) ) } ,bound:function() {;
return this} ,times:function(v) {;
return box(this.v,vtimes(v,this.dv) ) } ,inverse:function() {;
return box(vscale(this.v, -1) , [1/this.dv[0] ,1/this.dv[1] ] ) } } ) ,it} ) .call(this, ( (function(v,dv) {return this.v=v,this.dv=dv,null} ) ) ) ,box=function(v,dv) {;
return new box_ctor(v,dv) } ,translate=function(v) {;
return new box_ctor(v, [1,1] ) } ,bound_everything=box( [ -1/0, -1/0] , [1/0,1/0] ) ,rectangle=function(data,v,dv) {var b=box(v,dv) ;
return(b.data=data,b) } ,scale=function(v) {;
return new box_ctor( [0,0] ,v) } ,bound_nothing=box( [0,0] , [0,0] ) ,cons=function(first,rest_fn) {;
return new cons_ctor(first,rest_fn) } ,cons_from_array=function(xs) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (null) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (cons(x,k(x0) ) ) ;
return x0} ) .call(this,xs) } ,cons_to_array=function(c) {;
return reduce(c, [] , (function(x,rest) {return( [x] ) .concat(rest() ) } ) ) } ,k=function(x) {;
return function() {;
return x} } ,list=function() {var xs=arguments;
return cons_from_array(Array.prototype.slice.call( (xs) ) ) } ,reduce=function(xs,x_fn,f) {;
return xs?xs.reduce?xs.reduce(x_fn,f) 
:f(xs,x_fn) 
:x_fn() } ,cons_ctor= (function(it) {return $.merge(it.prototype, {reduce:function(x_fn,f) {var r=this.rest;
return f.call(this,this.first,function(_) {return(function() {var rest=r() ;
return rest?rest.reduce(x_fn,f) 
:x_fn() } ) .call(this) } ) } ,transform_with:function(t) {;
return map(function(_) {return _.transform_with(t) } ,this) } ,toString:function(force) {;
return( '' + (this.first) + ' :: ' + (force?this.rest() &&this.rest() .toString(force) 
: "..." ) + '' ) } ,bound:function() {;
return this.bound_} ,interpolate:function(l,x) {;
return list_interpolation(this,l,x) } } ) ,it} ) .call(this, ( (function(first,rest_fn) {return this.first=first,this.rest=rest_fn,this.bound_= (bound_everything) .intersect(this.first.bound() ) ,null} ) ) ) ,map=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return cons(f(x) ,rest) } ) ) } ,append=function(xs,ys_f) {;
return reduce(xs,ys_f,cons) ||ys_f() } ,first=function(xs) {;
return xs&&xs.first} ,filter=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(x) ?cons(x,rest) 
:rest() } ) ) } ,each=function(f,xs) {;
return reduce(xs,k(xs) , (function(x,rest) {return f(x) ,rest() } ) ) } ,take_outer_while=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(this) ?cons(x,rest) 
:null} ) ) } ,descend_while=function(f,xs) {;
return!xs||xs.reduce?reduce(take_outer_while(f,xs) ,k(null) , (function(x,rest) {return append(descend_while(f,x) ,rest) } ) ) 
:list(xs) } ,bounded=function(s,box) {;
return{bound:function() {;
return box} ,reduce:function(x,f) {;
return f(s,x) } } } ,x_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1/0,1] ) ) } ,y_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1,1/0] ) ) } ,x_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,x_stack=function(xs) {;
return x_shadow(xs,xs.first.bound() ) } ,y_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,y_stack=function(xs) {;
return y_shadow(xs,xs.first.bound() ) } ,scale_size=function(l,x) {var b=l.bound() ;
return l.transform_with(composite(translate(b.v) ,scale( [x,x] ) ,translate( [ -b.v[0] , -b.v[1] ] ) ) ) } ,list_interpolation=function(l1,l2,x) {;
return x===0?l1
:x===1?l2
:l1===l2?l1
:l1===null?scale_size(l2,1-x) 
:l2===null?scale_size(l1,x) 
:cons(list_interpolation(l1.first,l2.first,x) .transform_with(composite(l1.bound() .interpolate(l2.bound() ,x) ,l1.bound() .inverse() ) ) ,function(_) {return list_interpolation(l1.rest() ,l2.rest() ,x) } ) } ,no_path=function(b) {;
return function(c) {;
return null} } ,rectangle_path=function(b) {;
return function(c) {;
return(c.beginPath() ,c.rect(b.v[0] ,b.v[1] ,b.dv[0] ,b.dv[1] ) ) } } ,arc_path=function(b) {var p= (b) .transform_with(cartesian_to_polar) ;
return function(c) {;
return( (c.beginPath() ,c.arc(0,0,p.v[0] ,p.v[1] ,p.v[1] +p.dv[1] ,true) ) ,c.arc(0,0,p.v[0] +p.dv[0] ,p.v[1] +p.dv[1] ,p.v[1] ) ) } } } ) .call: (function() {var, ;
return tau=Math.PI*2,atan_scale=2/Math.PI,scaled_atan=function(x) {;
return Math.atan(x) *atan_scale} ,clip=function(x) {;
return Math.min(Math.max(x, -1) ,1) } ,id=function(x) {;
return x} ,scaled_tan=function(x) {;
return Math.tan(clip(x/atan_scale) ) } ,componentwise=function(f1,f2) {;
return function(v) {;
return[f1(v[0] ) ,f2(v[1] ) ] } } ,x_tangent= {transform:componentwise(scaled_tan,id) ,inverse:function() {;
return x_arctangent} } ,x_arctangent= {transform:componentwise(scaled_atan,id) ,inverse:function() {;
return x_tangent} } ,y_tangent= {transform:componentwise(id,scaled_tan) ,inverse:function() {;
return y_arctangent} } ,y_arctangent= {transform:componentwise(id,scaled_atan) ,inverse:function() {;
return y_tangent} } ,polar_to_cartesian= {transform:function(v) {var d=v[0] ;
var t=v[1] ;
return[d*Math.cos(t) ,d*Math.sin(t) ] } ,inverse:function() {;
return cartesian_to_polar} } ,cartesian_to_polar= {transform:function(v) {var d=vnorm(v) ;
var t=Math.atan2(v[0] ,v[1] ) ;
return[d, (t+tau) %tau] } ,inverse:function() {;
return polar_to_cartesian} } ,bounding_box=function(b) {;
return{transform:function(v) {;
return(b) .intern(v) } ,inverse:function() {;
return identity_transform} } } ,identity_transform= {transform:function(v) {;
return v} ,inverse:function() {;
return this} } ,composite=function() {var ts=arguments;
return{transform:function(v) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (v) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (x.transform(x0) ) ;
return x0} ) .call(this,ts) } ,inverse:function() {;
return this.inverse_!==void 0?this.inverse_
:this.inverse_= (function(it) {return it.inverse_=this,it} ) .call(this, (composite.apply(this, (function(xs) {var x,x0,xi,xl,xr;
for(var xr=new xs.constructor() ,xi=0,xl=xs.length;
xi<xl;
 ++xi)x=xs[xi] ,xr.push( (x.inverse() ) ) ;
return xr} ) .call(this,Array.prototype.slice.call( (ts) ) ) ) ) ) } } } ,box_ctor= (function(it) {return $.merge(it.prototype, {area:function() {;
return this.dv[0] *this.dv[1] } ,contains:function(v) {;
return v[0] >=this.v[0] &&v[1] >=this.v[1] &&v[0] <=this.v[0] +this.dv[0] &&v[1] <=this.v[1] +this.dv[1] } ,interpolate:function(b,x) {;
return(this.scale(1-x) ) .plus(b.scale(x) ) } ,intersect:function(b) {;
return(this) .map_corners(function(_) {return(b) .intern(_) } ) } ,transform:function(v) {;
return vplus(this.v,vtimes(v,this.dv) ) } ,union:function(b) {;
return(function() {var c1=vmin(this.v,b.v) ,c2=vmax(vplus(this.v,this.dv) ,vplus(b.v,b.dv) ) ;
return box(c1,vminus(c2,c1) ) } ) .call(this) } ,toString:function() {;
return( '[[' + (this.v[0] ) + ', ' + (this.v[1] ) + '] -> [' + (this.dv[0] ) + ', ' + (this.dv[1] ) + ']]' ) } ,intern:function(v) {;
return vmin(vmax(v,this.v) ,vplus(this.v,this.dv) ) } ,map_corners:function(f) {;
return(function() {var c1=f(this.v) ,c2=f(vplus(this.v,this.dv) ) ;
return rectangle(this.data,c1,vminus(c2,c1) ) } ) .call(this) } ,plus:function(b) {;
return box(vplus(this.v,b.v) ,vplus(this.dv,b.dv) ) } ,transform_with:function(t) {;
return(this) .map_corners(function(_) {return(t) .transform(_) } ) } ,scale:function(x) {;
return box(vscale(this.v,x) ,vscale(this.dv,x) ) } ,bound:function() {;
return this} ,times:function(v) {;
return box(this.v,vtimes(v,this.dv) ) } ,inverse:function() {;
return box(vscale(this.v, -1) , [1/this.dv[0] ,1/this.dv[1] ] ) } } ) ,it} ) .call(this, ( (function(v,dv) {return this.v=v,this.dv=dv,null} ) ) ) ,box=function(v,dv) {;
return new box_ctor(v,dv) } ,translate=function(v) {;
return new box_ctor(v, [1,1] ) } ,bound_everything=box( [ -1/0, -1/0] , [1/0,1/0] ) ,rectangle=function(data,v,dv) {var b=box(v,dv) ;
return(b.data=data,b) } ,scale=function(v) {;
return new box_ctor( [0,0] ,v) } ,bound_nothing=box( [0,0] , [0,0] ) ,cons=function(first,rest_fn) {;
return new cons_ctor(first,rest_fn) } ,cons_from_array=function(xs) {;
return(function(xs) {var x,x0,xi,xl,xr;
for(var xl=xs.length-1,xi=xl,x0= (null) ;
xi>=0;
 --xi)x=xs[xi] ,x0= (cons(x,k(x0) ) ) ;
return x0} ) .call(this,xs) } ,cons_to_array=function(c) {;
return reduce(c, [] , (function(x,rest) {return( [x] ) .concat(rest() ) } ) ) } ,k=function(x) {;
return function() {;
return x} } ,list=function() {var xs=arguments;
return cons_from_array(Array.prototype.slice.call( (xs) ) ) } ,reduce=function(xs,x_fn,f) {;
return xs?xs.reduce?xs.reduce(x_fn,f) 
:f(xs,x_fn) 
:x_fn() } ,cons_ctor= (function(it) {return $.merge(it.prototype, {reduce:function(x_fn,f) {var r=this.rest;
return f.call(this,this.first,function(_) {return(function() {var rest=r() ;
return rest?rest.reduce(x_fn,f) 
:x_fn() } ) .call(this) } ) } ,transform_with:function(t) {;
return map(function(_) {return _.transform_with(t) } ,this) } ,toString:function(force) {;
return( '' + (this.first) + ' :: ' + (force?this.rest() &&this.rest() .toString(force) 
: "..." ) + '' ) } ,bound:function() {;
return this.bound_} ,interpolate:function(l,x) {;
return list_interpolation(this,l,x) } } ) ,it} ) .call(this, ( (function(first,rest_fn) {return this.first=first,this.rest=rest_fn,this.bound_= (bound_everything) .intersect(this.first.bound() ) ,null} ) ) ) ,map=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return cons(f(x) ,rest) } ) ) } ,append=function(xs,ys_f) {;
return reduce(xs,ys_f,cons) ||ys_f() } ,first=function(xs) {;
return xs&&xs.first} ,filter=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(x) ?cons(x,rest) 
:rest() } ) ) } ,each=function(f,xs) {;
return reduce(xs,k(xs) , (function(x,rest) {return f(x) ,rest() } ) ) } ,take_outer_while=function(f,xs) {;
return reduce(xs,k(null) , (function(x,rest) {return f(this) ?cons(x,rest) 
:null} ) ) } ,descend_while=function(f,xs) {;
return!xs||xs.reduce?reduce(take_outer_while(f,xs) ,k(null) , (function(x,rest) {return append(descend_while(f,x) ,rest) } ) ) 
:list(xs) } ,bounded=function(s,box) {;
return{bound:function() {;
return box} ,reduce:function(x,f) {;
return f(s,x) } } } ,x_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1/0,1] ) ) } ,y_shadow=function(s,bound) {;
return bounded(s, (bound) .times( [1,1/0] ) ) } ,x_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,x_stack=function(xs) {;
return x_shadow(xs,xs.first.bound() ) } ,y_compressed=function(xs,h) {;
return(xs) .transform_with(scale( [h/xs.reduce(k(0) , (function(x,rest) {return x.bound() [0] +rest() } ) ) ,1] ) ) } ,y_stack=function(xs) {;
return y_shadow(xs,xs.first.bound() ) } ,scale_size=function(l,x) {var b=l.bound() ;
return l.transform_with(composite(translate(b.v) ,scale( [x,x] ) ,translate( [ -b.v[0] , -b.v[1] ] ) ) ) } ,list_interpolation=function(l1,l2,x) {;
return x===0?l1
:x===1?l2
:l1===l2?l1
:l1===null?scale_size(l2,1-x) 
:l2===null?scale_size(l1,x) 
:cons(list_interpolation(l1.first,l2.first,x) .transform_with(composite(l1.bound() .interpolate(l2.bound() ,x) ,l1.bound() .inverse() ) ) ,function(_) {return list_interpolation(l1.rest() ,l2.rest() ,x) } ) } ,no_path=function(b) {;
return function(c) {;
return null} } ,rectangle_path=function(b) {;
return function(c) {;
return(c.beginPath() ,c.rect(b.v[0] ,b.v[1] ,b.dv[0] ,b.dv[1] ) ) } } ,arc_path=function(b) {var p= (b) .transform_with(cartesian_to_polar) ;
return function(c) {;
return( (c.beginPath() ,c.arc(0,0,p.v[0] ,p.v[1] ,p.v[1] +p.dv[1] ,true) ) ,c.arc(0,0,p.v[0] +p.dv[0] ,p.v[1] +p.dv[1] ,p.v[1] ) ) } } } ) .call} } ) .call(this) } ) ;
