var JSwitcher=function(e,t,n){"use strict";var i,o,c,l,r={onShow:function(){},onHide:function(){},cookieName:"switcher",togglerSelector:"a",elementSelector:"div.tab",elementPrefix:"page-"},h=function(e,t,n){if(i=jQuery.noConflict(),i.extend(r,n),o=i(e).find(r.togglerSelector),c=i(t).find(r.elementSelector),0!==o.length&&o.length===c.length){d(),o.each((function(){i(this).on("click",(function(){a(i(this).attr("id"))}))}));var l=document.location.hash.substring(1);l?a(l):o.length&&a(o.first().attr("id"))}},a=function(e){var t=i("#"+e),n=i("#"+r.elementPrefix+e);return 0===t.length||0===n.length||e===l?this:(l&&(s(i("#"+r.elementPrefix+l)),i("#"+l).removeClass("active")),f(n),t.addClass("active"),l=e,document.location.hash=l,void i(window).scrollTop(0))},s=function(e){r.onShow(e),i(e).hide()},d=function(){c.hide(),o.removeClass("active")},f=function(e){r.onHide(e),i(e).show()};return h(e,t,n),{display:a,hide:s,hideAll:d,show:f}};

