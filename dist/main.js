!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=1)}([function(e,t,n){var a=function(e){"use strict";var t=Object.prototype,n=t.hasOwnProperty,a="function"==typeof Symbol?Symbol:{},r=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",i=a.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(e){c=function(e,t,n){return e[t]=n}}function d(e,t,n,a){var r=t&&t.prototype instanceof u?t:u,o=Object.create(r.prototype),i=new b(a||[]);return o._invoke=function(e,t,n){var a="suspendedStart";return function(r,o){if("executing"===a)throw new Error("Generator is already running");if("completed"===a){if("throw"===r)throw o;return S()}for(n.method=r,n.arg=o;;){var i=n.delegate;if(i){var c=E(i,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===a)throw a="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);a="executing";var d=s(e,t,n);if("normal"===d.type){if(a=n.done?"completed":"suspendedYield",d.arg===l)continue;return{value:d.arg,done:n.done}}"throw"===d.type&&(a="completed",n.method="throw",n.arg=d.arg)}}}(e,n,i),o}function s(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(e){return{type:"throw",arg:e}}}e.wrap=d;var l={};function u(){}function h(){}function p(){}var m={};m[r]=function(){return this};var v=Object.getPrototypeOf,f=v&&v(v(w([])));f&&f!==t&&n.call(f,r)&&(m=f);var g=p.prototype=u.prototype=Object.create(m);function y(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function C(e,t){var a;this._invoke=function(r,o){function i(){return new t((function(a,i){!function a(r,o,i,c){var d=s(e[r],e,o);if("throw"!==d.type){var l=d.arg,u=l.value;return u&&"object"==typeof u&&n.call(u,"__await")?t.resolve(u.__await).then((function(e){a("next",e,i,c)}),(function(e){a("throw",e,i,c)})):t.resolve(u).then((function(e){l.value=e,i(l)}),(function(e){return a("throw",e,i,c)}))}c(d.arg)}(r,o,a,i)}))}return a=a?a.then(i,i):i()}}function E(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,E(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var a=s(n,e.iterator,t.arg);if("throw"===a.type)return t.method="throw",t.arg=a.arg,t.delegate=null,l;var r=a.arg;return r?r.done?(t[e.resultName]=r.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):r:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function L(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function x(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function b(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(L,this),this.reset(!0)}function w(e){if(e){var t=e[r];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,o=function t(){for(;++a<e.length;)if(n.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=void 0,t.done=!0,t};return o.next=o}}return{next:S}}function S(){return{value:void 0,done:!0}}return h.prototype=g.constructor=p,p.constructor=h,h.displayName=c(p,i,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===h||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,p):(e.__proto__=p,c(e,i,"GeneratorFunction")),e.prototype=Object.create(g),e},e.awrap=function(e){return{__await:e}},y(C.prototype),C.prototype[o]=function(){return this},e.AsyncIterator=C,e.async=function(t,n,a,r,o){void 0===o&&(o=Promise);var i=new C(d(t,n,a,r),o);return e.isGeneratorFunction(n)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},y(g),c(g,i,"Generator"),g[r]=function(){return this},g.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var a=t.pop();if(a in e)return n.value=a,n.done=!1,n}return n.done=!0,n}},e.values=w,b.prototype={constructor:b,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(x),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function a(n,a){return i.type="throw",i.arg=e,t.next=n,a&&(t.method="next",t.arg=void 0),!!a}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],i=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),d=n.call(o,"finallyLoc");if(c&&d){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!d)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(e,t){for(var a=this.tryEntries.length-1;a>=0;--a){var r=this.tryEntries[a];if(r.tryLoc<=this.prev&&n.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,l):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),x(n),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var a=n.completion;if("throw"===a.type){var r=a.arg;x(n)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:w(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},e}(e.exports);try{regeneratorRuntime=a}catch(e){Function("r","regeneratorRuntime = r")(a)}},function(e,t,n){"use strict";n.r(t);n(0);var a=function(e){return d3.csv("https://raw.githubusercontent.com/shanto20-dev/leagueofdata/main/data/2021_Match_Data.csv").then((function(t){return t.filter((function(t){return t.player.toLowerCase()===e.toLowerCase()}))}))};function r(e){var t={};a(e).then((function(n){var a=[],r=[],c=[],u=[],h=[],p=[],m=[],v=[];if(n.length){n.forEach((function(e){a.push(e.champion),r.push(e.totalcs),c.push(e.damagetakenperminute),u.push(e.dpm),h.push(e.earnedgold),p.push(e.kills),m.push(e.assists),v.push(e.deaths)})),a.forEach((function(e){t[e]||(t[e]=0),t[e]++})),l(t,e);var f=d3.mean(r);o(e,f);var g=d3.mean(u),y=d3.mean(c);d([{name:"Average DMG Given per minute",amount:g},{name:"Average DMG Taken per minute",amount:y}],e);var C=d3.mean(h);i(C,e);var E=d3.sum(p),L=d3.sum(m),x=d3.sum(v);s([{name:"Kills",amount:E},{name:"Assists",amount:L},{name:"Deaths",amount:x}],e)}else{var b=document.querySelector(".pic-container"),w=document.createElement("h1");w.textContent="Unfortunately, we do not have data on this player. Our dataset is limited to professional players in the 2021 season from January to April.",w.classList.add("no-exist-header"),b.appendChild(w)}}))}var o=function(e,t){var n=0,a=new IntersectionObserver((function(a,r){a.forEach((function(a){a.isIntersecting&&0===n&&(!function(e,t){var n=document.querySelector(".cs-div"),a=document.createElement("h1");a.innerHTML="".concat(e,' sure loves to mess up those minions. They usually have an average CS of <span style="color:#cc0000">').concat(t,"</span> by the end of the game!"),a.classList.add("csStat"),n.appendChild(a);var r=document.createElement("div");r.classList.add("minion-div"),n.appendChild(r)}(e,t),n++)}))}),{root:null,rootMargin:"0px",threshold:.9}),r=document.querySelector(".cs-div");a.observe(r)},i=function(e,t){var n=0,a=new IntersectionObserver((function(a,r){a.forEach((function(a){a.isIntersecting&&0===n&&(c(),setTimeout((function(){!function(e,t){var n=document.querySelector(".gold-div"),a=document.createElement("h1");a.innerHTML="".concat(e,' is quite certainly getting that bread. They end up earning an average of <span style="color:#ffd736">').concat(t,"</span> gold each game!"),a.classList.add("goldStat"),n.appendChild(a);var r=document.createElement("div");r.classList.add("gold-pic-div"),n.appendChild(r);var o=document.createElement("div");o.classList.add("gold-pic1"),r.appendChild(o);var i=document.createElement("div");i.classList.add("gold-pic2"),r.appendChild(i)}(t,e)}),1500),n++)}))}),{root:null,rootMargin:"0px",threshold:.5}),r=document.querySelector(".gold-div");a.observe(r)},c=function(){for(var e=document.querySelector(".gold-div"),t=0;t<75;t++)setTimeout((function(){var t=document.createElement("span");t.classList.add("coin"),t.style.top="0",t.style.marginLeft="".concat(Math.floor(100*Math.random())+1+"%"," "),t.style.marginRight="".concat(Math.floor(100*Math.random())+1+"%"),t.style.marginTop="".concat(Math.floor(50*Math.random())+1+"%"),e.appendChild(t)}),Math.floor(50*Math.random())+1);setTimeout((function(){document.querySelectorAll(".coin").forEach((function(e){return e.remove()}))}),2e3)},d=function(e,t){var n=0,a=new IntersectionObserver((function(a,r){a.forEach((function(a){a.isIntersecting&&0===n&&(u(e,t),n++)}))}),{root:null,rootMargin:"0px",threshold:.9}),r=document.querySelector(".damage-div");a.observe(r)},s=function(e,t){var n=0,a=new IntersectionObserver((function(a,r){a.forEach((function(a){a.isIntersecting&&0===n&&(h(e,t),n++)}))}),{root:null,rootMargin:"0px",threshold:.9}),r=document.querySelector(".kda-div");a.observe(r)},l=function(e,t){var n=[];Object.keys(e).forEach((function(t){var a={champName:t,timesPlayed:e[t]};n.push(a)})),n=n.sort((function(e,t){return d3.descending(e.timesPlayed,t.timesPlayed)})).slice(0,5);var a=document.querySelector(".pic-container"),r=document.createElement("div");r.setAttribute("class","champs-graph-container"),a.appendChild(r);var o=document.createElement("h1");o.textContent="".concat(t,"'s Favorite Champions"),o.classList.add("played-champs-header"),r.append(o);var i=50,c=50,d=50,s=50,l=d3.select(".champs-graph-container").append("svg").attr("height",500-i-c).attr("width",1e3-d-s).attr("viewBox",[0,0,1e3,500]),u=d3.scaleBand().domain(d3.range(n.length)).range([d,1e3-s]).padding(.1),h=d3.scaleLinear().domain([0,20]).range([500-c,i]);l.append("g").attr("fill","royalblue").selectAll("rect").data(n.sort((function(e,t){return d3.descending(e.timesPlayed,t.timesPlayed)}))).join("rect").attr("x",(function(e,t){return u(t)})).attr("y",(function(e){return h(0)})).attr("height",(function(e){return h(0)-h(0)})).attr("width",u.bandwidth()).attr("class","favorite-champ-rect");d3.select("favorite-champ-rect").append("div").attr("class","tooltip").style("display","none");l.append("text").attr("transform","rotate(-90)").attr("y",0-d).attr("x",-250).attr("dy",".006em").style("text-anchor","middle").text("Times Played 2021 Season"),l.selectAll("rect").transition().duration(800).attr("y",(function(e){return h(e.timesPlayed)})).attr("height",(function(e){return h(0)-h(e.timesPlayed)})),l.append("g").call((function(e){e.attr("transform","translate(0, ".concat(500-c,")")).call(d3.axisBottom(u).tickFormat((function(e){return n[e].champName}))).attr("font-size","20px")})),l.append("g").call((function(t){t.attr("transform","translate(".concat(d,"), 0)")).call(d3.axisLeft(h).ticks(null,e.format)).attr("font-size","20px")})),l.node()},u=function(e,t){var n=document.querySelector(".damage-div"),a=document.createElement("div");a.setAttribute("class","damage-graph-container"),n.appendChild(a);var r=document.createElement("h1");r.textContent="".concat(t," taketh damage as they giveth"),r.classList.add("damage-graph-header"),a.append(r);var o=50,i=50,c=50,d=50,s=d3.select(".damage-div").append("svg").attr("height",500-o-i).attr("width",1e3-c-d).attr("viewBox",[0,0,1e3,500]),l=d3.scaleBand().domain(d3.range(2)).range([c,1e3-d]).padding(.1),u=d3.scaleLinear().domain([0,1e3]).range([500-i,o]);s.append("g").selectAll("rect").data(e).join("rect").attr("x",(function(e,t){return l(t)})).attr("y",(function(e){return u(0)})).attr("height",(function(e){return u(0)-u(0)})).attr("width",l.bandwidth()).attr("class",(function(e,t){return"damage-rect-".concat(e.name)})),s.selectAll("rect").transition().duration(2e3).attr("y",(function(e){return u(e.amount)})).attr("height",(function(e){return u(0)-u(e.amount)})),s.append("g").call((function(t){t.attr("transform","translate(0, ".concat(500-i,")")).call(d3.axisBottom(l).tickFormat((function(t){return e[t].name}))).attr("font-size","20px")})),s.append("g").call((function(t){t.attr("transform","translate(".concat(c,"), 0)")).call(d3.axisLeft(u).ticks(null,e.format)).attr("font-size","20px")})),s.node()},h=function(e,t){var n=document.querySelector(".kda-div"),a=document.createElement("div");a.setAttribute("class","kda-graph-container"),n.appendChild(a);var r=document.createElement("h1");r.textContent="".concat(t,"'s total kills, deaths, and assists this season"),r.classList.add("kda-graph-header"),a.append(r);var o=50,i=50,c=50,d=50,s=d3.select(".kda-div").append("svg").attr("height",500-o-i).attr("width",1e3-c-d).attr("viewBox",[0,0,1e3,500]),l=d3.scaleBand().domain(d3.range(3)).range([c,1e3-d]).padding(.1),u=d3.scaleLinear().domain([0,300]).range([500-i,o]);s.append("g").selectAll("rect").data(e).join("rect").attr("x",(function(e,t){return l(t)})).attr("y",(function(e){return u(0)})).attr("height",(function(e){return u(0)-u(0)})).attr("width",l.bandwidth()).attr("class",(function(e,t){return"kda-rect-".concat(e.name)})).attr("fill","blue"),s.selectAll("rect").transition().duration(2e3).attr("y",(function(e){return u(e.amount)})).attr("height",(function(e){return u(0)-u(e.amount)})),s.append("g").call((function(t){t.attr("transform","translate(0, ".concat(500-i,")")).call(d3.axisBottom(l).tickFormat((function(t){return e[t].name}))).attr("font-size","20px")})),s.append("g").call((function(t){t.attr("transform","translate(".concat(c,"), 0)")).call(d3.axisLeft(u).ticks(null,e.format)).attr("font-size","20px")})),s.node()};document.addEventListener("DOMContentLoaded",(function(){console.log("DOM Loaded");var e=document.querySelector(".search");e.addEventListener("keyup",(function(t){if(13===t.keyCode&&""!==e.value){t.preventDefault();var n=e.value;document.querySelector(".splash").remove();var a=document.createElement("h1");a.textContent="".concat(n.toUpperCase()),a.setAttribute("class","player-header");var o=document.querySelector(".page-container");o.appendChild(a),document.querySelector("body").classList.add("player-page");var i=document.createElement("div");i.setAttribute("class","pic-container"),o.appendChild(i);var c=document.createElement("div");c.setAttribute("class","gamer-image"),i.appendChild(c),setTimeout((function(){r("".concat(n))}),800);var d=document.createElement("div");d.classList.add("cs-div");var s=document.createElement("h1");s.textContent="Those Darn Minions",s.classList.add("average-cs-header"),o.appendChild(d),d.appendChild(s);var l=document.createElement("div");l.classList.add("damage-div");var u=document.createElement("h1");u.textContent="The Damage Has Been Done",u.classList.add("average-cs-header"),o.appendChild(l),l.appendChild(u);var h=document.createElement("div");h.classList.add("gold-div");var p=document.createElement("h1");p.textContent="CHA-CHING!",p.classList.add("average-cs-header"),o.appendChild(h),h.appendChild(p);var m=document.createElement("div");m.classList.add("kda-div");var v=document.createElement("h1");v.textContent="Killing Me Softly",v.classList.add("average-cs-header"),o.appendChild(m),m.appendChild(v)}})),document.querySelector("#fakerButton").addEventListener("click",(function(){document.querySelector(".splash").remove();var e=document.createElement("h1");e.textContent="Faker",e.setAttribute("class","player-header");var t=document.querySelector(".page-container");t.appendChild(e),document.querySelector("body").classList.add("player-page");var n=document.createElement("div");n.setAttribute("class","pic-container"),t.appendChild(n);var a=document.createElement("div");a.setAttribute("class","faker-image"),n.appendChild(a),setTimeout((function(){r("Faker")}),800);var o=document.createElement("div");o.classList.add("cs-div");var i=document.createElement("h1");i.textContent="Those Darn Minions",i.classList.add("average-cs-header"),t.appendChild(o),o.appendChild(i);var c=document.createElement("div");c.classList.add("damage-div");var d=document.createElement("h1");d.textContent="The Damage Has Been Done",d.classList.add("average-cs-header"),t.appendChild(c),c.appendChild(d);var s=document.createElement("div");s.classList.add("gold-div");var l=document.createElement("h1");l.textContent="CHA-CHING!",l.classList.add("average-cs-header"),t.appendChild(s),s.appendChild(l);var u=document.createElement("div");u.classList.add("kda-div");var h=document.createElement("h1");h.textContent="Killing Me Softly",h.classList.add("average-cs-header"),t.appendChild(u),u.appendChild(h)})),document.querySelector("#bangButton").addEventListener("click",(function(){document.querySelector(".splash").remove();var e=document.createElement("h1");e.textContent="Bang",e.setAttribute("class","player-header");var t=document.querySelector(".page-container");t.appendChild(e),document.querySelector("body").classList.add("player-page");var n=document.createElement("div");n.setAttribute("class","pic-container"),t.appendChild(n);var a=document.createElement("div");a.setAttribute("class","bang-image"),n.appendChild(a),setTimeout((function(){r("Bang")}),800);var o=document.createElement("div");o.classList.add("cs-div");var i=document.createElement("h1");i.textContent="Those Darn Minions",i.classList.add("average-cs-header"),t.appendChild(o),o.appendChild(i);var c=document.createElement("div");c.classList.add("damage-div");var d=document.createElement("h1");d.textContent="The Damage Has Been Done",d.classList.add("average-cs-header"),t.appendChild(c),c.appendChild(d);var s=document.createElement("div");s.classList.add("gold-div");var l=document.createElement("h1");l.textContent="CHA-CHING!",l.classList.add("average-cs-header"),t.appendChild(s),s.appendChild(l);var u=document.createElement("div");u.classList.add("kda-div");var h=document.createElement("h1");h.textContent="Killing Me Softly",h.classList.add("average-cs-header"),t.appendChild(u),u.appendChild(h)})),document.querySelector("#jensenButton").addEventListener("click",(function(){document.querySelector(".splash").remove();var e=document.createElement("h1");e.textContent="Jensen",e.setAttribute("class","player-header");var t=document.querySelector(".page-container");t.appendChild(e),document.querySelector("body").classList.add("player-page");var n=document.createElement("div");n.setAttribute("class","pic-container"),t.appendChild(n);var a=document.createElement("div");a.setAttribute("class","jensen-image"),n.appendChild(a),setTimeout((function(){r("Jensen")}),800);var o=document.createElement("div");o.classList.add("cs-div");var i=document.createElement("h1");i.textContent="Those Darn Minions",i.classList.add("average-cs-header"),t.appendChild(o),o.appendChild(i);var c=document.createElement("div");c.classList.add("damage-div");var d=document.createElement("h1");d.textContent="The Damage Has Been Done",d.classList.add("average-cs-header"),t.appendChild(c),c.appendChild(d);var s=document.createElement("div");s.classList.add("gold-div");var l=document.createElement("h1");l.textContent="CHA-CHING!",l.classList.add("average-cs-header"),t.appendChild(s),s.appendChild(l);var u=document.createElement("div");u.classList.add("kda-div");var h=document.createElement("h1");h.textContent="Killing Me Softly",h.classList.add("average-cs-header"),t.appendChild(u),u.appendChild(h)}))}))}]);
//# sourceMappingURL=main.js.map