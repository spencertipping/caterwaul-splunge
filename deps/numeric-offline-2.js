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
