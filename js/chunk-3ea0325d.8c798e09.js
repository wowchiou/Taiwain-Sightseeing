(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ea0325d"],{"09ec":function(t,e,n){"use strict";var c=n("7a23"),o=function(t){return Object(c["x"])("data-v-5920ba80"),t=t(),Object(c["v"])(),t},a=o((function(){return Object(c["h"])("i",{class:"fas fa-arrow-left"},null,-1)}));function r(t,e,n,o,r,u){var i=Object(c["C"])("AppButton");return Object(c["u"])(),Object(c["e"])(i,{class:"back-button",onClick:u.backHandler},{default:Object(c["I"])((function(){return[a]})),_:1},8,["onClick"])}var u={class:"appButton"};function i(t,e,n,o,a,r){var i=Object(c["C"])("AppLink");return Object(c["u"])(),Object(c["g"])("div",u,[Object(c["j"])(i,{to:n.to},{default:Object(c["I"])((function(){return[Object(c["B"])(t.$slots,"default",{},void 0,!0)]})),_:3},8,["to"])])}var b=n("aac4"),l={components:{AppLink:b["a"]},props:{to:{type:[String,Object],default:"false"},icon:{type:Boolean}}},s=(n("8926"),n("d959")),j=n.n(s);const d=j()(l,[["render",i],["__scopeId","data-v-7b300988"]]);var O=d,f=O,p={components:{AppButton:f},methods:{backHandler:function(){this.$router.back()}}};n("6efd");const v=j()(p,[["render",r],["__scopeId","data-v-5920ba80"]]);var y=v;e["a"]=y},"199d":function(t,e,n){},"2bd0":function(t,e,n){},5094:function(t,e,n){"use strict";n("b6b6")},"6efd":function(t,e,n){"use strict";n("b928")},8926:function(t,e,n){"use strict";n("199d")},acb0:function(t,e,n){"use strict";n("2bd0")},b2de:function(t,e,n){"use strict";n.r(e);var c=n("1da1"),o=(n("96cf"),n("d81d"),n("7db0"),n("d3b7"),n("e9c4"),n("7a23")),a=n("5502"),r=n("09ec");n("a4d3"),n("e01a"),n("d28b"),n("3ca3"),n("ddb0");function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}var i={class:"travelDetailItem"},b={key:0},l=["innerHTML"],s=["src","alt"],j={key:3};function d(t,e,n,c,a,r){return Object(o["u"])(),Object(o["g"])("div",i,[n.title?(Object(o["u"])(),Object(o["g"])("h3",b,Object(o["E"])(n.title),1)):Object(o["f"])("",!0),"object"!==u(n.content)&&n.content?(Object(o["u"])(),Object(o["g"])("p",{key:1,innerHTML:n.content},null,8,l)):"object"===u(n.content)?(Object(o["u"])(),Object(o["g"])("img",{key:2,src:n.content.src,alt:n.content.alt},null,8,s)):(Object(o["u"])(),Object(o["g"])("p",j,"未提供資料")),Object(o["B"])(t.$slots,"default",{},void 0,!0)])}var O={props:["title","content"]},f=(n("5094"),n("d959")),p=n.n(f);const v=p()(O,[["render",d],["__scopeId","data-v-2487396a"]]);var y=v,m=y,k={key:0,class:"detail"},g={class:"title"},h={class:"content"},w={props:{id:{type:String,required:!0},page:{type:String,required:!0}},setup:function(t){var e=t,n=Object(a["c"])(),u=n.state,i=n.dispatch,b=Object(o["z"])(null),l=Object(o["c"])((function(){return u.map.OSM||null}));function s(t){return"{}"===JSON.stringify(t)}return Object(o["H"])(Object(c["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(l.value){t.next=2;break}return t.abrupt("return");case 2:i("showLoader",!0),n=e.page,i("travel/fetchTravelData",n).then((function(t){b.value=t.find((function(t){return t["".concat(n,"ID")]===e.id}));var c=b.value.Position,o=c.PositionLat,a=c.PositionLon;i("map/setTravelMarkers",{page:n,markers:[{position:[o,a],name:b.value["".concat(n,"Name")],id:b.value["".concat(n,"ID")]}]}),u.map.OSM.setView([o,a],15),i("showLoader",!1)}));case 5:case"end":return t.stop()}}),t)})))),function(e,n){return b.value?(Object(o["u"])(),Object(o["g"])("div",k,[Object(o["h"])("div",g,[Object(o["j"])(Object(o["F"])(r["a"])),Object(o["h"])("h1",null,Object(o["E"])(b.value["".concat(t.page,"Name")]),1)]),Object(o["h"])("div",h,[Object(o["j"])(Object(o["F"])(m),{title:"地址",content:b.value.Address},null,8,["content"]),Object(o["j"])(Object(o["F"])(m),{title:"電話",content:b.value.Phone},null,8,["content"]),Object(o["j"])(Object(o["F"])(m),{title:"營業時間",content:b.value.OpenTime},null,8,["content"]),Object(o["j"])(Object(o["F"])(m),{title:"旅遊資訊",content:b.value.TravelInfo},null,8,["content"]),s(b.value.Picture)?Object(o["f"])("",!0):(Object(o["u"])(),Object(o["e"])(Object(o["F"])(m),{key:0,title:"旅遊圖片",content:{src:b.value.Picture.PictureUrl1,alt:b.value.Picture.PictureDescription1}},null,8,["content"])),b.value.DescriptionDetail?(Object(o["u"])(),Object(o["e"])(Object(o["F"])(m),{key:1,title:"地點說明",content:b.value.DescriptionDetail},null,8,["content"])):Object(o["f"])("",!0)])])):Object(o["f"])("",!0)}}};n("acb0");const S=p()(w,[["__scopeId","data-v-5b5b95f2"]]);var I=S;e["default"]=I},b6b6:function(t,e,n){},b928:function(t,e,n){}}]);
//# sourceMappingURL=chunk-3ea0325d.8c798e09.js.map