!(function(t){"use strict";var e={presets:{onOpen:function(){},onClose:function(){},onUpdate:function(){},onResize:function(){},onMove:function(){},onShow:function(){},onHide:function(){},size:{x:600,y:450},sizeLoading:{x:200,y:150},marginInner:{x:20,y:20},marginImage:{x:50,y:75},handler:!1,target:null,closable:!0,closeBtn:!0,zIndex:65555,overlayOpacity:.7,classWindow:"",classOverlay:"",overlayFx:{},resizeFx:{},contentFx:{},parse:!1,parseSecure:!1,shadow:!0,overlay:!0,document:null,ajaxOptions:{}},initialize:function(t){return this.options?this:(this.presets=Object.merge(this.presets,t),this.doc=this.presets.document||document,this.options={},this.setOptions(this.presets).build(),this.bound={window:this.reposition.bind(this,[null]),scroll:this.checkTarget.bind(this),close:this.close.bind(this),key:this.onKey.bind(this)},this.isOpen=this.isLoading=!1,this)},build:function(){if(this.overlay=new Element("div",{id:"sbox-overlay","aria-hidden":"true",styles:{zIndex:this.options.zIndex},tabindex:-1}),this.win=new Element("div",{id:"sbox-window",role:"dialog","aria-hidden":"true",styles:{zIndex:this.options.zIndex+2}}),this.options.shadow)if(Browser.chrome||Browser.safari&&Browser.version>=3||Browser.opera&&Browser.version>=10.5||Browser.firefox&&Browser.version>=3.5||Browser.ie&&Browser.version>=9)this.win.addClass("shadow");else if(!Browser.ie6){var t=new Element("div",{class:"sbox-bg-wrap"}).inject(this.win),e=function(t){this.overlay.fireEvent("click",[t])}.bind(this);["n","ne","e","se","s","sw","w","nw"].each((function(i){new Element("div",{class:"sbox-bg sbox-bg-"+i}).inject(t).addEvent("click",e)}))}this.content=new Element("div",{id:"sbox-content"}).inject(this.win),this.closeBtn=new Element("a",{id:"sbox-btn-close",href:"#",role:"button"}).inject(this.win),this.closeBtn.setProperty("aria-controls","sbox-window"),this.fx={overlay:new Fx.Tween(this.overlay,Object.merge({property:"opacity",onStart:Events.prototype.clearChain,duration:250,link:"cancel"},this.options.overlayFx)).set(0),win:new Fx.Morph(this.win,Object.merge({onStart:Events.prototype.clearChain,unit:"px",duration:750,transition:Fx.Transitions.Quint.easeOut,link:"cancel",unit:"px"},this.options.resizeFx)),content:new Fx.Tween(this.content,Object.merge({property:"opacity",duration:250,link:"cancel"},this.options.contentFx)).set(0)},document.id(this.doc.body).adopt(this.overlay,this.win)},assign:function(t,i){return(document.id(t)||$$(t)).addEvent("click",(function(){return!e.fromElement(this,i)}))},open:function(t,e){if(this.initialize(),null!=this.element&&this.trash(),this.element=document.id(t)||!1,this.setOptions(Object.merge(this.presets,e||{})),this.element&&this.options.parse){var i=this.element.getProperty(this.options.parse);i&&(i=JSON.decode(i,this.options.parseSecure))&&this.setOptions(i)}this.url=(this.element?this.element.get("href"):t)||this.options.url||"",this.assignOptions();var s=s||this.options.handler;if(s)return this.setContent(s,this.parsers[s].call(this,!0));var n=!1;return this.parsers.some((function(t,e){var i=t.call(this);return!!i&&(n=this.setContent(e,i),!0)}),this)},fromElement:function(t,e){return this.open(t,e)},assignOptions:function(){this.overlay.addClass(this.options.classOverlay),this.win.addClass(this.options.classWindow)},close:function(t){var e="domevent"==typeOf(t);return e&&t.stop(),!this.isOpen||e&&!Function.from(this.options.closable).call(this,t)?this:(this.fx.overlay.start(0).chain(this.toggleOverlay.bind(this)),this.win.setProperty("aria-hidden","true"),this.fireEvent("onClose",[this.content]),this.trash(),this.toggleListeners(),this.isOpen=!1,this)},trash:function(){this.element=this.asset=null,this.content.empty(),this.options={},this.removeEvents().setOptions(this.presets).callChain()},onError:function(){this.asset=null,this.setContent("string",this.options.errorMsg||"An error occurred")},setContent:function(t,e){return!!this.handlers[t]&&(this.content.className="sbox-content-"+t,this.applyTimer=this.applyContent.delay(this.fx.overlay.options.duration,this,this.handlers[t].call(this,e)),this.overlay.retrieve("opacity")?this:(this.toggleOverlay(!0),this.fx.overlay.start(this.options.overlayOpacity),this.reposition()))},applyContent:function(t,e){(this.isOpen||this.applyTimer)&&(this.applyTimer=clearTimeout(this.applyTimer),this.hideContent(),t?(this.isLoading&&this.toggleLoading(!1),this.fireEvent("onUpdate",[this.content],20)):this.toggleLoading(!0),t&&(["string","array"].contains(typeOf(t))?this.content.set("html",t):this.content.adopt(t)),this.callChain(),this.isOpen?this.resize(e):(this.toggleListeners(!0),this.resize(e,!0),this.isOpen=!0,this.win.setProperty("aria-hidden","false"),this.fireEvent("onOpen",[this.content])))},resize:function(t,e){this.showTimer=clearTimeout(this.showTimer||null);var i=this.doc.getSize(),s=this.doc.getScroll();this.size=Object.merge(this.isLoading?this.options.sizeLoading:this.options.size,t);var n=self.getSize();if(this.size.x==n.x&&(this.size.y=this.size.y-50,this.size.x=this.size.x-20),i.x>979)var o={width:this.size.x,height:this.size.y,left:(s.x+(i.x-this.size.x-this.options.marginInner.x)/2).toInt(),top:(s.y+(i.y-this.size.y-this.options.marginInner.y)/2).toInt()};else var o={width:i.x-40,height:i.y,left:(s.x+10).toInt(),top:(s.y+20).toInt()};return this.hideContent(),e?(this.win.setStyles(o),this.showTimer=this.showContent.delay(50,this)):this.fx.win.start(o).chain(this.showContent.bind(this)),this.reposition()},toggleListeners:function(t){var e=t?"addEvent":"removeEvent";this.closeBtn[e]("click",this.bound.close),this.overlay[e]("click",this.bound.close),this.doc[e]("keydown",this.bound.key)[e]("mousewheel",this.bound.scroll),this.doc.getWindow()[e]("resize",this.bound.window)[e]("scroll",this.bound.window)},toggleLoading:function(t){this.isLoading=t,this.win[t?"addClass":"removeClass"]("sbox-loading"),t&&(this.win.setProperty("aria-busy",t),this.fireEvent("onLoading",[this.win]))},toggleOverlay:function(t){if(this.options.overlay){var e=this.doc.getSize().x;this.overlay.set("aria-hidden",t?"false":"true"),this.doc.body[t?"addClass":"removeClass"]("body-overlayed"),t?this.scrollOffset=this.doc.getWindow().getSize().x-e:this.doc.body.setStyle("margin-right","")}},showContent:function(){this.content.get("opacity")&&this.fireEvent("onShow",[this.win]),this.fx.content.start(1)},hideContent:function(){this.content.get("opacity")||this.fireEvent("onHide",[this.win]),this.fx.content.cancel().set(0)},onKey:function(t){switch(t.key){case"esc":this.close(t);case"up":case"down":return!1}},checkTarget:function(t){return t.target!==this.content&&this.content.contains(t.target)},reposition:function(){var t=this.doc.getSize(),e=this.doc.getScroll(),i=this.doc.getScrollSize(),s=this.overlay.getStyles("height"),n=parseInt(s.height);return i.y>n&&t.y>=n&&(this.overlay.setStyles({width:i.x+"px",height:i.y+"px"}),this.win.setStyles({left:(e.x+(t.x-this.win.offsetWidth)/2-this.scrollOffset).toInt()+"px",top:(e.y+(t.y-this.win.offsetHeight)/2).toInt()+"px"})),this.fireEvent("onMove",[this.overlay,this.win])},removeEvents:function(t){return this.$events?(t?this.$events[t]&&(this.$events[t]=null):this.$events=null,this):this},extend:function(t){return Object.append(this,t)},handlers:new Hash,parsers:new Hash};e.extend(new Events(function(){})).extend(new Options(function(){})).extend(new Chain(function(){})),e.parsers.extend({image:function(t){return!(!t&&!/\.(?:jpg|png|gif)$/i.test(this.url))&&this.url},clone:function(t){if(document.id(this.options.target))return document.id(this.options.target);if(this.element&&!this.element.parentNode)return this.element;var e=this.url.match(/#([\w-]+)$/);return e?document.id(e[1]):!!t&&this.element},ajax:function(t){return!!(t||this.url&&!/^(?:javascript|#)/i.test(this.url))&&this.url},iframe:function(t){return!(!t&&!this.url)&&this.url},string:function(t){return!0}}),e.handlers.extend({image:function(t){var e,i=new Image;return this.asset=null,i.onload=i.onabort=i.onerror=function(){if(i.onload=i.onabort=i.onerror=null,!i.width)return void this.onError.delay(10,this);var t=this.doc.getSize();t.x-=this.options.marginImage.x,t.y-=this.options.marginImage.y,e={x:i.width,y:i.height};for(var s=2;s--;)e.x>t.x?(e.y*=t.x/e.x,e.x=t.x):e.y>t.y&&(e.x*=t.y/e.y,e.y=t.y);e.x=e.x.toInt(),e.y=e.y.toInt(),this.asset=document.id(i),i=null,this.asset.width=e.x,this.asset.height=e.y,this.applyContent(this.asset,e)}.bind(this),i.src=t,i&&i.onload&&i.complete&&i.onload(),this.asset?[this.asset,e]:null},clone:function(t){return t?t.clone():this.onError()},adopt:function(t){return t?t:this.onError()},ajax:function(t){var e=this.options.ajaxOptions||{};this.asset=new Request.HTML(Object.merge({method:"get",evalScripts:!1},this.options.ajaxOptions)).addEvents({onSuccess:function(t){this.applyContent(t),null===e.evalScripts||e.evalScripts||Browser.exec(this.asset.response.javascript),this.fireEvent("onAjax",[t,this.asset]),this.asset=null}.bind(this),onFailure:this.onError.bind(this)}),this.asset.send.delay(10,this.asset,[{url:t}])},iframe:function(t){var e=this.doc.getSize();if(e.x>979)var i=this.options.size.x,s=this.options.size.y;else var i=e.x,s=e.y-50;return this.asset=new Element("iframe",Object.merge({src:t,frameBorder:0,width:i,height:s},this.options.iframeOptions)),this.options.iframePreload?(this.asset.addEvent("load",function(){this.applyContent(this.asset.setStyle("display",""))}.bind(this)),this.asset.setStyle("display","none").inject(this.content),!1):this.asset},string:function(t){return t}}),e.handlers.url=e.handlers.ajax,e.parsers.url=e.parsers.ajax,e.parsers.adopt=e.parsers.clone,t.SqueezeBox=e})(window);

