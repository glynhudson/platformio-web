!function(){"use strict";angular.module("siteApp",["ngAnimate","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","viewhead","angulartics","angulartics.google.analytics","hljs","ngDisqus","relativeDate"]).constant("siteConfig",{apiURL:9e3===parseInt(location.port)?"http://localhost:8080":"http://api.platformio.org"})}(),function(){"use strict";function a(a,b){return{responseError:function(c){return 404===c.status&&(b.location.href="#!/404"),a.reject(c)}}}function b(a,b,c,d){a.hashPrefix("!"),c.setShortname("platformio"),d.interceptors.push("httpErrorInterceptor"),b.when("/",{templateUrl:"views/home.html"}).when("/get-started",{templateUrl:"views/get_started.html"}).when("/platforms/:platformType?",{templateUrl:"views/platforms.html",controller:"PlatformsController",controllerAs:"vm"}).when("/boards/:vendorType?",{templateUrl:"views/boards.html",controller:"BoardsController",controllerAs:"vm"}).when("/lib",{templateUrl:"views/lib_main.html",controller:"LibMainController",controllerAs:"vm",resolve:{libStats:["dataService",function(a){return a.getLibStats().$promise}]}}).when("/lib/search",{templateUrl:"views/lib_search.html",controller:"LibSearchController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibSearchResult({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/examples",{templateUrl:"views/lib_examples.html",controller:"LibExamplesController",controllerAs:"vm",resolve:{searchResult:["$location","dataService",function(a,b){var c=a.search();return b.getLibExamples({query:c.query,page:c.page?parseInt(c.page):1}).$promise}]}}).when("/lib/show/:libId/:libName",{templateUrl:"views/lib_show.html",controller:"LibShowController",controllerAs:"vm",resolve:{libInfo:["$route","dataService",function(a,b){return b.getLibInfo(a.current.params.libId).$promise}]}}).when("/who-uses",{templateUrl:"views/who_uses.html"}).when("/404",{templateUrl:"views/404.html"}).otherwise({redirectTo:"/404"})}angular.module("siteApp").factory("httpErrorInterceptor",a).config(b),a.$inject=["$q","$window"],b.$inject=["$locationProvider","$routeProvider","$disqusProvider","$httpProvider"]}(),function(){"use strict";function a(a,b){function c(c){return a(b.apiURL+"/lib/search",c).get()}function d(c){return a(b.apiURL+"/lib/examples",c).get()}function e(c){return a(b.apiURL+"/lib/info/"+c).get()}function f(c){return a(b.apiURL+"/lib/download/"+c).get()}function g(){return a(b.apiURL+"/lib/stats").get()}function h(){return[{name:"arduino",title:"Arduino"},{name:"energia",title:"Energia"}]}function i(){return[{name:"atmelavr",title:"Atmel AVR"},{name:"atmelsam",title:"Atmel SAM"},{name:"timsp430",title:"TI MSP430"},{name:"titiva",title:"TI TIVA"},{name:"teensy",title:"Teensy"}]}return{getLibSearchResult:c,getLibExamples:d,getLibInfo:e,getLibDlUrl:f,getLibStats:g,getFrameworks:h,getPlatforms:i}}angular.module("siteApp").factory("dataService",a),a.$inject=["$resource","siteConfig"]}(),function(){"use strict";function a(a){function b(b){a.open({templateUrl:"views/lib_search_examples.html",controller:"LibModalSEController",controllerAs:"vm",size:"lg",resolve:{searchPath:function(){return b}}})}return{showSearchExamples:b}}angular.module("siteApp").factory("siteUtils",a),a.$inject=["$modal"]}(),function(){"use strict";function a(a){function b(b,c){a(function(){if("undefined"!=typeof addthis){var a=b.lib.frameworks.join(" #"),d=b.lib.keywords.join(" #");a.length>0&&(a="#"+a),d.length>0&&(d="#"+d);var e={data_track_clickback:!1,data_track_addressbar:!1,data_ga_property:"UA-1768265-8",data_ga_social:!0},f={url:"http://platformio.org/#!/lib/show/"+b.lib.id+"/"+b.lib.name,title:b.lib.name+" library"+(a?" for ":"")+a,description:b.lib.description+" "+d,templates:{twitter:"{{title}} {{url}} via @PlatformIO_Org "+d},url_transforms:{shorten:{twitter:"bitly"}}};addthis.init(),addthis.toolbox(c[0],e,f)}})}var c={link:b,restrict:"A",transclude:!0,replace:!0,scope:{lib:"="},template:"<div ng-transclude></div>"};return c}angular.module("siteApp").directive("addthisLib",a),a.$inject=["$timeout"]}(),function(){"use strict";function a(){return function(a,b){var c=a;return angular.forEach(b,function(b){"name"in b&&"title"in b&&b.name===a&&(c=b.title)}),c}}angular.module("siteApp").filter("nameToTitle",a)}(),function(){"use strict";function a(a,b){function c(b){return new RegExp(b).test(a.path())}var d=this;d.isRouteActive=c,d.isPhJSCrawler=-1!==b.navigator.userAgent.indexOf("PhantomJS")}angular.module("siteApp").controller("MainController",a),a.$inject=["$location","$window"]}(),function(){"use strict";function a(a,b){function c(a){b.location.href="#!/platforms/"+a}function d(){var b={atmelavr:{title:"Atmel AVR",active:!1},timsp430:{title:"TI MSP430",active:!1},titiva:{title:"TI TIVA",active:!1},creating:{title:"Creating Platform",active:!1}},c="atmelavr";return a.hasOwnProperty("platformType")&&(c=a.platformType),angular.forEach(b,function(a,d){b[d].active=d===c}),b}var e=this;e.changePlatform=c,e.platforms=d(),e.activePlatform="",angular.forEach(e.platforms,function(a,b){a.active&&(e.activePlatform=b)})}angular.module("siteApp").controller("PlatformsController",a),a.$inject=["$routeParams","$window"]}(),function(){"use strict";function a(a,b){function c(a){b.location.href="#!/boards/"+a}function d(){var b={arduino:{title:"Arduino",active:!1},engduino:{title:"Engduino",active:!1},microduino:{title:"Microduino",active:!1},raspduino:{title:"Raspduino",active:!1},timsp430:{title:"TI MSP430 LaunchPads",active:!1},titiva:{title:"TI Tiva C LaunchPads",active:!1}},c="arduino";return a.hasOwnProperty("vendorType")&&(c=a.vendorType),angular.forEach(b,function(a,d){b[d].active=d===c}),b}var e=this;e.changeVendor=c,e.vendors=d(),e.activeVendor="",angular.forEach(e.vendors,function(a,b){a.active&&(e.activeVendor=b)})}angular.module("siteApp").controller("BoardsController",a),a.$inject=["$routeParams","$window"]}(),function(){"use strict";function a(a,b){function c(){a.url("/lib/search?query="+encodeURIComponent(d.searchQuery))}var d=this;d.submitSearchForm=c,d.searchQuery="",d.stats=b,d.searchPath="#!/lib/search",d.searchInputPlaceholder="Search for library ..."}angular.module("siteApp").controller("LibMainController",a),a.$inject=["$location","libStats"]}(),function(){"use strict";function a(a,b,c){function d(c){a.location.href=e.searchPath+"?query="+c,b.close()}var e=this;e.searchPath=c,e.search=d}angular.module("siteApp").controller("LibModalSEController",a),a.$inject=["$window","$modalInstance","searchPath"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){var a={description:[],keywords:[]};return angular.forEach(h.searchResult.items,function(c){a.description.push(c.name),a.keywords=a.keywords.concat(c.name.split("-")),angular.forEach(["frameworks","platforms"],function(d){angular.forEach(c[d],function(c){var e=b("nameToTitle")(c,h[d]);a.description.push(e),a.keywords=a.keywords.concat([c,e])})})}),angular.forEach(["description","keywords"],function(b){a[b]=a[b].filter(function(a,b,c){return c.indexOf(a)===b})}),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function g(){a.search({query:encodeURIComponent(h.searchQuery),page:h.searchResult.page})}var h=this,i=a.search();h.siteUtils=d,h.frameworks=c.getFrameworks(),h.platforms=c.getPlatforms(),h.searchQuery="",h.searchResult=e,h.meta=f(),h.submitSearchForm=g,h.pageChanged=g,h.searchPath="#!/lib/search",h.searchInputPlaceholder="Search for library ...",i.query&&i.query.length&&(h.searchQuery=decodeURIComponent(i.query))}angular.module("siteApp").controller("LibSearchController",a),a.$inject=["$location","$filter","dataService","siteUtils","searchResult"]}(),function(){"use strict";function a(a,b,c,d,e,f){function g(){var a={title:j.lib.name,keywords:j.lib.keywords.slice(0),description:j.lib.description},b=[];angular.forEach(j.lib.authors,function(a){b.push(a.name)}),b.length&&(a.title+=" by "+b.join(", "));var d=[];return angular.forEach(["frameworks","platforms"],function(b){angular.forEach(j.lib[b],function(e){var f=c("nameToTitle")(e,j[b]);a.keywords.push(e),d.push(f)})}),d.length&&(a.keywords=a.keywords.concat(d),a.description+=" for "+d.join(", ")),a.keywords=a.keywords.join(", "),a}function h(){var a=[];return j.lib.examples.length?(angular.forEach(j.lib.examples,function(b){var c=b.split("/");a.push({url:b,name:c[c.length-1]})}),a):a}function i(){d.eventTrack("Download",{category:"Library",label:"#"+j.lib.id+" "+j.lib.name});var b=e.getLibDlUrl(j.lib.id).$promise;b.then(function(b){a.location.href=b.url+"?filename="+[j.lib.name,j.lib.version.name,j.lib.id].join("_")})}var j=this;j.frameworks=e.getFrameworks(),j.platforms=e.getPlatforms(),j.lib=f,j.meta=g(),j.examples=h(),j.currentExample={},j.downloadLib=i,j.examples.length&&(j.currentExample=j.examples[0]);var k=b.search();k.example&&angular.forEach(j.examples,function(a){return a.name===k.example?void(j.currentExample=a):void 0})}angular.module("siteApp").controller("LibShowController",a),a.$inject=["$window","$location","$filter","$analytics","dataService","libInfo"]}(),function(){"use strict";function a(a,b,c,d,e,f,g){function h(){var a={description:[],keywords:[]};return angular.forEach(l.searchResult.items,function(b){a.description=a.description.concat([b.lib.name,b.name]),a.keywords=a.keywords.concat(b.name.split(/[\-\_\.]/))}),a.description=a.description.filter(k),a.keywords=a.keywords.filter(k),a.description=a.description.join(", "),a.keywords=a.keywords.join(", "),a}function i(){a.search({query:encodeURIComponent(l.searchQuery),page:l.searchResult.page})}function j(a){var e,f,g=20;a.showFullCode=!1,a.shortCode="Loading...",e=c.get(a.url),e||(f=d.defer(),b.get(a.url,{cache:c,transformResponse:function(a){return a}}).success(function(a){f.resolve(a)}).error(function(a){console.log(a),f.resolve("Can't load an example code")}),e=f.promise),d.when(e).then(function(b){angular.isArray(b)?b=b[1]:angular.isObject(b)&&(b=b.data),b=b.replace(/(?:\s*\/\*[\s\S]+?\*\/\s*|\s*\/\/[\s\S]+?$\s)/m,""),a.shortCode=b.split("\n",g).splice(0,g).join("\n")})}function k(a,b,c){return c.indexOf(a)===b}var l=this,m=a.search();l.siteUtils=f,l.frameworks=e.getFrameworks(),l.platforms=e.getPlatforms(),l.searchQuery="",l.searchResult=g,l.meta=h(),l.submitSearchForm=i,l.pageChanged=i,l.searchPath="#!/lib/examples",l.searchInputPlaceholder="Search for example ...",m.query&&m.query.length&&(l.searchQuery=decodeURIComponent(m.query)),angular.forEach(l.searchResult.items,function(a){j(a)})}angular.module("siteApp").controller("LibExamplesController",a),a.$inject=["$location","$http","$templateCache","$q","dataService","siteUtils","searchResult"]}();