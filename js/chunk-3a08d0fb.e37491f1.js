(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3a08d0fb"],{"0389":function(e,t,n){"use strict";var a=n("5530"),u=n("7a23"),c=function(e){return Object(u["x"])("data-v-263088b5"),e=e(),Object(u["v"])(),e},r=["value","disabled"],o=c((function(){return Object(u["h"])("option",{disabled:"",value:""},"-- 請選擇城市 --",-1)})),i=["value"];function s(e,t,n,c,s,l){var b=Object(u["C"])("InputGroup");return Object(u["u"])(),Object(u["e"])(b,{label:"城市搜尋"},{default:Object(u["I"])((function(){return[Object(u["h"])("select",Object(u["o"])({class:"field",value:n.modelValue},Object(a["a"])(Object(a["a"])({},e.$attrs),{},{onChange:function(t){e.$emit("update:modelValue",t.target.value),n.searchHandler()}}),{disabled:!l.initMap}),[o,(Object(u["u"])(!0),Object(u["g"])(u["a"],null,Object(u["A"])(n.cities,(function(e){return Object(u["u"])(),Object(u["g"])("option",{key:e.City,value:e.City},Object(u["E"])(e.CityName),9,i)})),128))],16,r)]})),_:1})}n("d81d");var l=n("76ff"),b={components:{InputGroup:l["a"]},props:{modelValue:{type:String,default:""},searchHandler:{type:Function,required:!0},cities:{type:Array,required:!0}},computed:{initMap:function(){return this.$store.state.map.OSM}}},f=(n("4e19"),n("d959")),d=n.n(f);const p=d()(b,[["render",s],["__scopeId","data-v-263088b5"]]);var v=p;t["a"]=v},"0d7d":function(e,t,n){},"1fba":function(e,t,n){"use strict";n.r(t);var a=n("1da1"),u=(n("96cf"),n("d81d"),n("d3b7"),n("159b"),n("7a23")),c=n("5502"),r=n("b824"),o={isRouteNameContainKeywords:function(e,t){return e&&-1!==e.indexOf(t)}},i=n("f5d03"),s=n("0389"),l=n("fcd9"),b={class:"busSearchList"},f={class:"route"},d={class:"name"};function p(e,t,n,a,c,r){var o=Object(u["C"])("AppLink");return Object(u["u"])(),Object(u["g"])("ul",b,[(Object(u["u"])(!0),Object(u["g"])(u["a"],null,Object(u["A"])(n.busResult,(function(e){return Object(u["u"])(),Object(u["g"])("li",{key:e.RouteUID},[Object(u["j"])(o,{to:{name:"bus-detail",params:{city:n.city,route:e.RouteName.Zh_tw,id:e.RouteUID}}},{default:Object(u["I"])((function(){return[Object(u["h"])("p",f,Object(u["E"])(e.RouteName.Zh_tw),1),Object(u["h"])("p",d,Object(u["E"])(a.formateBusName(e)),1)]})),_:2},1032,["to"])])})),128))])}n("99af");var v=n("aac4"),O={components:{AppLink:v["a"]},props:{busResult:{type:Array},city:{type:String}},setup:function(e){function t(e){var t=e.DepartureStopNameZh,n=e.DestinationStopNameZh,a=e.detail.Stops,u=a.length;return t||(t=a[u-1].StopName.Zh_tw),n||(n=a[0].StopName.Zh_tw),2===e.Direction?t:"".concat(t,"－").concat(n)}return Object(u["G"])((function(){return e.busResult}),(function(){window.scrollTo({top:0})})),{formateBusName:t}}},j=(n("24e7"),n("d959")),h=n.n(j);const m=h()(O,[["render",p],["__scopeId","data-v-59d799ec"]]);var y=m,g=y,I={class:"bus-index"},S={class:"page-search-content"},_={key:0,class:"page-search-remind"},N={setup:function(e){var t=Object(c["c"])(),n=t.state,b=t.commit,f=t.dispatch,d=o.isRouteNameContainKeywords,p=Object(u["z"])(""),v=Object(u["z"])(""),O=Object(u["z"])([]),j=Object(u["c"])((function(){return n.map.OSM})),h=Object(u["c"])((function(){return n.bus.busRoutes})),m=Object(u["c"])((function(){return n.bus.busCity})),y=Object(u["c"])((function(){return n.bus.busKeyWords}));function N(){p.value=m.value,y.value?(v.value=y.value,A()):O.value=h.value}function w(){return E.apply(this,arguments)}function E(){return E=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return f("showLoader",!0),V(),e.next=4,f("bus/getBusTotalData",p.value);case 4:R(),O.value=h.value,f("showLoader",!1);case 7:case"end":return e.stop()}}),e)}))),E.apply(this,arguments)}function R(){b("bus/SET_BUS_CITY",p.value)}function k(){b("bus/SET_BUS_KEYWORDS",v.value)}function V(){v.value="",b("bus/SET_BUS_KEYWORDS","")}function A(){k(),O.value=C()}function C(){var e=[];return h.value.forEach((function(t){var n=t.RouteName,a=t.DepartureStopNameZh,u=t.DestinationStopNameZh;return d(n.Zh_tw,v.value)||d(a,v.value)||d(u,v.value)?e.push(t):void 0})),e}return j.value&&f("map/clearBusMap"),h.value&&N(),function(e,t){return Object(u["u"])(),Object(u["g"])("div",I,[Object(u["j"])(Object(u["F"])(i["a"]),{title:"公車/客運時刻表"},{default:Object(u["I"])((function(){return[Object(u["j"])(Object(u["F"])(s["a"]),{modelValue:p.value,"onUpdate:modelValue":t[0]||(t[0]=function(e){return p.value=e}),cities:Object(u["F"])(r),searchHandler:w},null,8,["modelValue","cities"]),Object(u["j"])(Object(u["F"])(l["a"]),{modelValue:v.value,"onUpdate:modelValue":t[1]||(t[1]=function(e){return v.value=e}),disabled:!p.value,result:O.value,keywordSearch:A},null,8,["modelValue","disabled","result"])]})),_:1}),Object(u["h"])("div",S,[0===O.value.length?(Object(u["u"])(),Object(u["g"])("div",_," 請選擇城市 ")):(Object(u["u"])(),Object(u["e"])(Object(u["F"])(g),{key:1,busResult:O.value,city:p.value},null,8,["busResult","city"]))])])}}};n("f22a");const w=h()(N,[["__scopeId","data-v-6dcb5670"]]);var E=w;t["default"]=E},"24e7":function(e,t,n){"use strict";n("8113")},"3c48":function(e,t,n){},"408a":function(e,t,n){var a=n("e330");e.exports=a(1..valueOf)},"4e19":function(e,t,n){"use strict";n("0d7d")},5899:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(e,t,n){var a=n("e330"),u=n("1d80"),c=n("577e"),r=n("5899"),o=a("".replace),i="["+r+"]",s=RegExp("^"+i+i+"*"),l=RegExp(i+i+"*$"),b=function(e){return function(t){var n=c(u(t));return 1&e&&(n=o(n,s,"")),2&e&&(n=o(n,l,"")),n}};e.exports={start:b(1),end:b(2),trim:b(3)}},"76ff":function(e,t,n){"use strict";var a=n("7a23"),u={class:"input-group"},c={key:0,class:"input-label"};function r(e,t,n,r,o,i){return Object(a["u"])(),Object(a["g"])("div",u,[n.label?(Object(a["u"])(),Object(a["g"])("label",c,Object(a["E"])(n.label),1)):Object(a["f"])("",!0),Object(a["B"])(e.$slots,"default",{},void 0,!0)])}var o={props:{label:{type:String}}},i=(n("8d9f"),n("d959")),s=n.n(i);const l=s()(o,[["render",r],["__scopeId","data-v-927c45b6"]]);var b=l;t["a"]=b},8113:function(e,t,n){},"8d9f":function(e,t,n){"use strict";n("3c48")},"9c9f":function(e,t,n){"use strict";n("b72b")},a320:function(e,t,n){"use strict";n("f1ba")},a9e3:function(e,t,n){"use strict";var a=n("83ab"),u=n("da84"),c=n("e330"),r=n("94ca"),o=n("6eeb"),i=n("1a2d"),s=n("7156"),l=n("3a9b"),b=n("d9b5"),f=n("c04e"),d=n("d039"),p=n("241c").f,v=n("06cf").f,O=n("9bf2").f,j=n("408a"),h=n("58a8").trim,m="Number",y=u[m],g=y.prototype,I=u.TypeError,S=c("".slice),_=c("".charCodeAt),N=function(e){var t=f(e,"number");return"bigint"==typeof t?t:w(t)},w=function(e){var t,n,a,u,c,r,o,i,s=f(e,"number");if(b(s))throw I("Cannot convert a Symbol value to a number");if("string"==typeof s&&s.length>2)if(s=h(s),t=_(s,0),43===t||45===t){if(n=_(s,2),88===n||120===n)return NaN}else if(48===t){switch(_(s,1)){case 66:case 98:a=2,u=49;break;case 79:case 111:a=8,u=55;break;default:return+s}for(c=S(s,2),r=c.length,o=0;o<r;o++)if(i=_(c,o),i<48||i>u)return NaN;return parseInt(c,a)}return+s};if(r(m,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var E,R=function(e){var t=arguments.length<1?0:y(N(e)),n=this;return l(g,n)&&d((function(){j(n)}))?s(Object(t),n,R):t},k=a?p(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),V=0;k.length>V;V++)i(y,E=k[V])&&!i(R,E)&&O(R,E,v(y,E));R.prototype=g,g.constructor=R,o(u,m,R)}},b3f8:function(e,t,n){},b72b:function(e,t,n){},f1ba:function(e,t,n){},f22a:function(e,t,n){"use strict";n("b3f8")},f5d03:function(e,t,n){"use strict";var a=n("7a23"),u={class:"page-top"},c={class:"pageTitle"};function r(e,t,n,r,o,i){return Object(a["u"])(),Object(a["g"])("div",u,[Object(a["h"])("h1",c,Object(a["E"])(n.title),1),Object(a["h"])("form",{class:"search-form",onSubmit:t[0]||(t[0]=Object(a["J"])((function(){}),["prevent"]))},[Object(a["B"])(e.$slots,"default",{},void 0,!0)],32)])}var o={props:{title:{type:String,required:!0}}},i=(n("a320"),n("d959")),s=n.n(i);const l=s()(o,[["render",r],["__scopeId","data-v-4297d960"]]);var b=l;t["a"]=b},fcd9:function(e,t,n){"use strict";var a=n("7a23"),u={class:"keyword-wrap"},c=["value","placeholder"];function r(e,t,n,r,o,i){var s=Object(a["C"])("InputGroup");return Object(a["u"])(),Object(a["e"])(s,{class:"cityKeywordInput",label:"關鍵字搜尋"},{default:Object(a["I"])((function(){return[Object(a["h"])("div",u,[Object(a["h"])("input",Object(a["o"])({class:"field",type:"text"},e.$attrs,{value:n.modelValue,onInput:t[0]||(t[0]=function(t){return e.$emit("update:modelValue",t.target.value)}),placeholder:i.hasResult?"請輸入關鍵字":"請先選擇城市"}),null,16,c),Object(a["h"])("button",{class:"search",onClick:t[1]||(t[1]=function(){return n.keywordSearch&&n.keywordSearch.apply(n,arguments)})},"搜尋")])]})),_:1})}n("a9e3");var o=n("76ff"),i={components:{InputGroup:o["a"]},props:{modelValue:{type:[String,Number],default:""},result:{type:Array},keywordSearch:{type:Function}},computed:{hasResult:function(){return this.result.length>0}}},s=(n("9c9f"),n("d959")),l=n.n(s);const b=l()(i,[["render",r],["__scopeId","data-v-52eb5e30"]]);var f=b;t["a"]=f}}]);
//# sourceMappingURL=chunk-3a08d0fb.e37491f1.js.map