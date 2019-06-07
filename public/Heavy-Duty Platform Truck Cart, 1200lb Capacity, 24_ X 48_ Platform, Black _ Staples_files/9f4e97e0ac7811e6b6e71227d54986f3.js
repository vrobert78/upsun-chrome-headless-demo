(function(){Function.prototype.bind=Function.prototype.bind||function(a){var e=this;return function(){return e.apply(a,arguments)}}})();var EMPTY_FUN=function(){},UNDEF;
(function(){function a(){}var e=null;try{e=(0,eval)("this")||function(){return this}()}catch(b){}a.global=function(){return e};a.namespace=function(b,g,d,k){b=b.split(".");var h=a.NAMESPACE_BASE||a.global(),f=null,m=null,h=d||h;for(d=0;d<b.length-1;d+=1)m=b[d],h[m]=h[m]||{},h=h[m];f=h;m=b[b.length-1];e.TAGSDK_NS_OVERRIDE&&(k=!1);void 0!==g?void 0!==f[m]&&k||(f[m]=g):f[m]=f[m]||{};return f[m]};a.clazz=function(b,e,d,k,h){a.namespace(b,e,k,!0);"function"===typeof d&&(e.superclass=d,e.prototype=new e.superclass(h));
e.prototype&&(b=b.split("."),e.prototype.CLASS_NAME=b[b.length-1],b.splice(b.length-1,1),e.prototype.PACKAGE_NAME=b.join("."));return e};a.clazz("taginspector.Define",a)})();
(function(){function a(b,f,c){this.collectLogs=!!a.COLLECT;this.collectLocally=c;this.collection=[];this.getPrefix=function(){var a="";f&&("function"===typeof f?a=f(this.ref):f.CLASS_NAME?a=f.CLASS_NAME:f.constructor&&f.constructor.name&&(a=f.constructor.name),a&&(a+=" -> "));return(b||"")+a}}function e(b,f,c,d,p,q,l,n){var e=a.LEVEL>=n;if(0<=a.COLLECT_LEVEL||e)f=p?[d,l,c]:[f+b.getPrefix()+d,q,c],f[3]=n,b.collect(f,n),e&&b.printMessage.apply(b,f)}var b=taginspector.Define,c=null;b.clazz("taginspector.datapulse.Log",
a);a.LEVEL_FINEST=4;a.LEVEL_FINE=3;a.LEVEL_INFO=2;a.LEVEL_WARN=1;a.LEVEL_ERROR=0;a.LEVEL_NONE=-1;a.MAX_LOG_LEN=1E4;a.prototype.MAX_LOG_LEN=-1;a.LEVEL=a.LEVEL_NONE;a.LEVEL=a.LEVEL_INFO;a.COLLECT_LEVEL=a.LEVEL_FINE;a.COLLECT=!0;var g=[];a.logsCollection=g;a.rePrintAll=function(b,f,d,e){var p=a.LEVEL;void 0!==b&&(a.LEVEL=b);try{if(a.COLLECT){try{d||c.clear()}catch(q){}var l=e||a.logsCollection,n=0;for(d=0;d<l.length;d++)(function(q){var c=l[q];q=c[3];void 0!==q&&a.LEVEL>=q&&(n++,f?taginspector.datapulse.Timed.setTimeout(function(){void 0!==
b&&(a.LEVEL=b);try{a.print.apply(a,c)}finally{a.LEVEL=p}},n*f):a.print.apply(a,c))})(d)}}catch(k){}finally{a.LEVEL=p}};a.isStyleSupported=function(){return!1};var d={};a.setConsole=function(a){return c=a=a||d};a.delayPrint=-1;var k=(new Date).valueOf();a.prototype.printMessage=function(b,c,d,e){if(0<a.delayPrint){var p=a.delayPrint,q=k-(new Date).valueOf();0<q&&(p+=q);try{taginspector.datapulse.Timed.setTimeout(function(){this.print(b,c,d,e)}.bind(this),p)}catch(l){setTimeout(function(){this.print(b,
c,d,e)}.bind(this),p)}k=(new Date).valueOf()+p}else this.print(b,c,d,e)};a.prototype.print=function(b,c,d,e){a.print(b,c,d,e)};a.print=function(b,f,d,e){if(!(void 0!==e&&a.LEVEL<e))try{if(c&&c.log)if(f&&a.isStyleSupported())if(d&&c[d])c[d]("%c"+b,f);else c.log("%c"+b,f);else if(d&&c[d])c[d](b);else c.log(b)}catch(p){}};a.prototype.collect=function(b,c){void 0===c&&(c=a.COLLECT_LEVEL);var d=!1,e=this.collectLogs&&a.COLLECT&&a.COLLECT_LEVEL>=+c;e&&(g.push(b),d=!0);this.collectLocally&&e&&(this.collection.push(b),
d=!0);0<a.MAX_LOG_LEN&&g.length>a.MAX_LOG_LEN&&g.splice(0,g.length-a.MAX_LOG_LEN);if(0<a.MAX_LOG_LEN||0<this.MAX_LOG_LEN)e=a.MAX_LOG_LEN,0<this.MAX_LOG_LEN&&(e=this.MAX_LOG_LEN),this.collection.length>e&&this.collection.splice(0,this.collection.length-e);return d?b:null};a.clearAllLogs=function(){try{c.clear()}catch(a){}finally{g.splice(0,g.length)}};a.getCollectedByLevel=function(a,b){b=b||g;for(var c=[],d=0;d<b.length;d++){var p=b[d];p[0][4]===a&&c.push(p)}return c};a.prototype.rePrint=function(b,
c,d){a.rePrintAll(b,c,!d,this.collection)};a.prototype.FINEST=function(b,c){e(this,"FINEST: ",!1,b,c,"color:#CCCCCC;",!1,a.LEVEL_FINEST)};a.prototype.FINE=function(b,c){e(this,"FINE: ",!1,b,c,"color:#999999;",!1,a.LEVEL_FINE)};a.prototype.INFO=function(b,c,d){e(this,"INFO: ","info",b,c,d,d,a.LEVEL_INFO)};a.prototype.WARN=function(b,c){e(this,"WARN: ","warn",b,c,"color:#26A110;",!1,a.LEVEL_WARN)};a.prototype.ERROR=function(b,c){e(this,"ERROR: ","error",b,c,"color:red;",!1,a.LEVEL_ERROR)};a.setConsole(b.global().console)})();
(function(){function a(){}function e(a,b){for(var c=k.length,n=0;n<c;n++)if(a===k[n][0])return k[n][1];k[k.length]=[a,b];return!1}function b(a,c,l,n,f){var m=!1,g=!1,h=!1,r=!1,v=!1,v=!1;c&&(m=(v=!!c.all)||c.nodes,r=v||c.win,g=v,h=c.noFunctions&&!v,void 0!==c.noOwn&&(g=!!c.noOwn),void 0!==c.noFunctions&&(h=!!c.noFunctions),void 0!==c.win&&(r=!!c.win),void 0!==c.nodes&&(m=!!c.nodes),v=!!c.copyReference);if(void 0===l||l){void 0!==l&&l--;if(!(a&&a instanceof Object))return a;if(!m){try{if(a instanceof
Node)return a}catch(y){if(a instanceof ActiveXObject&&void 0!==a.nodeType)return a}if(a===document)return a}if(!r&&a===d)return a;m=a instanceof Array?[]:{};a instanceof Date&&(m=new Date(a));!h&&a instanceof Function&&(h=String(a).replace(/\s+/g,""),m=h.indexOf("{[nativecode]}")+14===h.length?function(){return a.apply(f||this,arguments)}:function(){return a.apply(this,arguments)});void 0===n&&(k=[],n=0);if(h=e(a,m))return h;if(m instanceof Array)for(h=0;h<a.length;h++)m[m.length]=a[h]===a[h]?b(a[h],
c,l,n+1,a):a[h];else{var h=0,u;for(u in a){if(g||a.hasOwnProperty(u))m[u]=a[u]===a[u]?b(a[u],c,l,n+1,a):a[u];h++}}c.proto&&(m.prototype=b(a.prototype,c,l,n+1,a));v&&(m.___copy_ref=a);return m}}function c(a,b,l,n,e,f,m){l=l||{};void 0===l.hasOwn&&(l.hasOwn=!0);if(!l.objectsOnly||a instanceof Object)if(void 0===l.maxDeep||l.maxDeep){void 0!==l.maxDeep&&l.maxDeep--;if(!l||!l.nodes)try{if(a instanceof Node)return}catch(k){if(a instanceof ActiveXObject&&void 0!==a.nodeType)return}if(a!==d){void 0===n&&
(h=[],n=0);var g;a:{for(g=0;g<n&&g<h.length;g++)if(a===h[g]){g=!0;break a}g=!1}if(!(g||(h[n]=a,e=e||a,e&&f&&e[f]!==e[f]||b(a,e,f,m)))){f=0;g="";for(var r in a){if(!l.hasOwn||a.hasOwnProperty(r))try{var y=a[r];l.track&&(g=m?m+"."+r:r);c(y,b,l,n+1,e,r,g)}catch(u){}f++}}}}}var g=taginspector.Define,d=g.global();g.clazz("taginspector.datapulse.Utils",a);a.global=g.global;a.namespace=g.namespace;a.clazz=g.clazz;a.getObjectUsingPath=function(a,b){b=b||d;for(var c=a.split("."),n=0;n<c.length;n++)b&&c[n]&&
(b=b[c[n]]);return b};a.variableExists=function(a){return void 0!==a&&null!==a&&""!==a};a.ANON_VARS=[];a.getAnonymousAcessor=function(b){var c=a.indexInArray(b,a.ANON_VARS);-1===c&&(c=a.addToArrayIfNotExist(a.ANON_VARS,b));return"taginspector.datapulse.Utils.ANON_VARS["+c+"]"};a.replaceAll=function(a,b,c){return a.replace(new RegExp(b.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),c)};a.isInt=function(a){if(isNaN(a))return!1;a=parseFloat(a);return(a|0)===a};a.secureText=function(a){"string"!==
typeof a&&(a+="");a=a.replace(/</g,"&lt;");return a=a.replace(/>/g,"&gt;")};a.getUrl=function(){return document.location.href};a.getQueryParam=function(b){var c,l,n,d;c=a.getUrl();if(0<c.indexOf("?"))for(d=c.substring(c.indexOf("?")+1).split("&"),c=0,l=d.length;c<l;c+=1)if(n=d[c],0<n.indexOf("=")&&(n=n.split("="),2===n.length&&n[0]===b))return n[1];return null};a.getElementValue=function(a){return(a=document.getElementById(a))?a.textContent||a.innerText:null};var k=[];a.objectCopy=function(a,c){c=
c||{};var l=b(a,c,c.maxDeep);k=[];return l};var h=[];a.traverse=function(a,b,l){c(a,b,l)};a.prepareQuotedString=function(a){return"string"===typeof a?'"'+a.replace(/\"/g,'\\"')+'"':a};a.expressionToFunction=function(b,c){return a.gevalAndReturn("function ("+(c||"")+") {"+b+"}").result};a.defineClass=function(b,c,l){var d=b.split("."),d=a.gevalAndReturn("(function "+d[d.length-1]+"() {  if ("+b+"._CONSTRUCTOR) {    return "+b+"._CONSTRUCTOR.apply(this, arguments);  } else {    if ("+b+".superclass) {      return "+
b+".superclass.apply(this, arguments);    }  }})").result;d._CONSTRUCTOR=l.CONSTRUCTOR;d.superclass=c;a.clazz(b,d,c);for(var e in l)l.hasOwnProperty(e)&&"CONSTRUCTOR"!==e&&(d.prototype[e]=l[e]);return d};a.keys=function(a){if(a instanceof Object){if(Object.keys)return Object.keys(a);var b=[],c;for(c in a)a.hasOwnProperty(c)&&(b[b.length]=c);return b}throw"keys() called on non-object!";};a.getSrcElement=function(a){var b;a=a||window.event;a.srcElement?b=a.srcElement:a.target&&(b=a.target);return b};
a.addToArrayIfNotExist=function(a,b){for(var c=0,d=!1;c<a.length;c+=1)if(a[c]===b){d=!0;break}d||(a[a.length]=b,c=-1);return c};a.indexInArray=function(a,b){for(var c=0,d=!1;c<a.length;c++)if(a[c]===b){d=!0;break}return d?c:-1};a.removeFromArray=function(a,b){for(var c=0;c<a.length;c+=1)a[c]===b&&a.splice(c,1)};a.addClass=function(b,c){var d;try{b.classList.add(c)}catch(e){null===b.className?b.className=c:(d=b.className.split(" "),a.addToArrayIfNotExist(d,c),b.className=d.join(" "))}};a.removeClass=
function(b,c){var d;try{b.classList.remove(c)}catch(e){null===b.className?b.className="":(d=b.className.split(" "),a.removeFromArray(d,c),b.className=d.join(" "))}};a.gevalAndReturn=function(b){a.gevalAndReturn.___var_test___=void 0;a.gevalAndReturn.___var_test___error=void 0;a.geval("try{taginspector.datapulse.Utils.gevalAndReturn.___var_test___=("+b+");}catch(ex){taginspector.datapulse.Utils.gevalAndReturn.___var_test___error = ex;}");return{result:a.gevalAndReturn.___var_test___,error:a.gevalAndReturn.___var_test___error}};
a.trim=function(a){try{return String(a).trim()}catch(b){return String(a).replace(/^\s+|\s+$/g,"")}};a.setIfUnset=function(a,b){if(a&&b)for(var c in b)b.hasOwnProperty(c)&&!a.hasOwnProperty(c)&&(a[c]=b[c])};a.geval=function(a){window&&window.execScript?window.execScript(a):d.eval.call(d,a)};var f=[],m=!1;a.bodyReady=function(a){if(m)return a&&a(),!0;if(m=!(!document.body||"complete"!==document.readyState)){for(var b=0;b<f.length;b++)try{f[b]()}catch(c){d.console&&d.console.trace&&d.console.trace(c)}a&&
a()}else a&&f.push(a);return m};var r=d.onload;d.onload=function(b){a.bodyReady();r&&r(b)}})();
(function(){function a(b){this.config={};this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.uniqueId+"]"}.bind(this),"collectLogs");this.parameters=null;this.reportValue=!1;if(b){this.uniqueId=b.uniqueId;this.reportValue=b.reportValue;a.ALL_VARIABLES[this.uniqueId]=this;for(var c in b)this.config[c]=b[c];void 0!==b.value&&(this.value=b.value);void 0!==b.defaultValue&&(this.defaultValue=b.defaultValue);(b=a.register(this))&&b!==this&&(b.log.FINEST("Variable config already registered."),
b.log.FINEST("Returning existing one."));return b}}var e=taginspector.datapulse.Utils;e.clazz("taginspector.datapulse.pagevariable.BaseVariable",a);a.ALL_VARIABLES={};a.pageVariables=[];a.register=function(b){return b instanceof a?(a.pageVariables.push(b),b):null};a.prototype.getValue=function(){return this.value};a.prototype.setValue=function(a){this.value=a};a.prototype.getDefaultValue=function(){return this.defaultValue};a.prototype.setDefaultValue=function(a){this.defaultValue=a};a.prototype.exists=
function(a){var c=e.variableExists(this.getValue());a&&(c=c||e.variableExists(this.getDefaultValue()));return c};a.prototype.getRelativeValue=function(a,c){var g=this.getValue();e.variableExists(g)||(g=c);var d;a&&!e.variableExists(g)&&(d=this.getDefaultValue(),e.variableExists(d)&&(g=d));return g};a.prototype.replaceToken=function(a,c,g,d){var k=this.exists();g=k?this.getValue():g;a="\\$\\{"+a+"\\}";return d||g instanceof Array?(d=k?this.getValueAccessorString():e.getAnonymousAcessor(g),c.replace(new RegExp(a,
"g"),d)):c.replace(new RegExp(a,"g"),g)};a.prototype.getAccessorString=function(){return"taginspector.datapulse.pagevariable.BaseVariable.ALL_VARIABLES."+this.uniqueId};a.prototype.getValueAccessorString=function(){return this.getAccessorString()+".getValue()"}})();
(function(){function a(b){this._lockObject={};var c={uniqueId:"Macro-"+e++};if(b)for(var g in b)c[g]=b[g];this.reportValue=!1;b&&(this.uniqueId=b.uniqueId,this.reportValue=b.reportValue);a.superclass.call(this,c)}var e=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.pagevariable.JsExpression",a,taginspector.datapulse.pagevariable.BaseVariable);a.prototype.getValue=function(){this.log.FINEST("getting custom js value");return this.value(!0)?this.value(!0).toString():""}})();
(function(){function a(a){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.config.name+"]"}.bind(this),"collectLogs");this.config={order:0,include:!0,name:"Filter-"+e++,uniqueId:"Filter-"+e++,script:void 0,session:void 0};this.session=null;if(a){for(var c in a)a.hasOwnProperty(c)&&(this.config[c]=a[c]);a.session&&this.setSession(a.session)}this.uniqueId=this.config.uniqueId}var e=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.filter.BaseFilter",a);
a.state={DISABLED:-3,SESSION:-2,PASS:-1,FAIL:0};a.prototype.reset=function(){this.enable()};a.prototype.disable=function(){this.config.disabled=!0};a.prototype.enable=function(){this.config.disabled=!1};a.prototype.match=function(){return!0};a.prototype.setSession=function(a){this.session=a};a.prototype.getSession=function(){return this.session};a.prototype.getState=function(){var b=a.state.PASS;if(this.config.disabled)return a.state.DISABLED;this.config.script&&(b=this.config.script.call(this,b));
isNaN(+b)&&(this.log.WARN("filters should use a numerical state as a return for getState(): BaseFilter.state. Filter will fail. Returned: "+b),b=a.state.FAIL);this.lastState=+b;return b}})();
(function(){function a(b){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"["+this.config.name+"]"}.bind(this),"collectLogs");this.config={name:"Trigger-"+e++,uniqueId:"Trigger-"+e++,triggerScript:void 0,rules:[]};this.currentState=a.state.WAITING;if(b){for(var c in b)b.hasOwnProperty(c)&&(this.config[c]=b[c]);b.session&&this.setSession(b.session)}this.uniqueId=this.config.uniqueId}var e=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.trigger.BaseTrigger",
a);a.state={WAITING:0,FIRED:1};a.prototype.checkRules=function(){for(var a=0;a<this.config.rules.length;a++)rule=this.config.rules[a],rule.checkFiltersIfTriggersFired()};a.prototype.triggerCallback=function(){this.currentState=a.state.FIRED;this.checkRules()};a.prototype.initTrigger=function(){cb=this.triggerCallback;cb=cb.bind(this);this.config.triggerScript(cb)};a.prototype.getState=function(){return this.currentState};a.prototype.addRule=function(a){this.config.rules.push(a)};a.prototype.setTriggerScript=
function(a){this.config.triggerScript=a}})();
(function(){function a(a){this.config={};this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"[BaseRule]"}.bind(this),"collectLogs");this.uniqueId="BR"+g++;this.ruleVersion=1;if(a){this.uniqueId=a.uniqueId;this.ruleVersion=a.ruleVersion;this.dataCollector=a.dataCollector;for(var b in a)this.config[b]=a[b]}this.filters=[];this.session=void 0;this.triggers=[]}var e=taginspector.datapulse.filter.BaseFilter,b=taginspector.datapulse.trigger.BaseTrigger,c=taginspector.datapulse.pagevariable.BaseVariable,
g=0;taginspector.datapulse.Utils.clazz("taginspector.datapulse.BaseRule",a);a.prototype.getFilters=function(){return this.filters};a.prototype.addFilter=function(a){this.filters.push(a)};a.prototype.addTrigger=function(a){this.triggers.push(a)};var d=b.state.WAITING,k=b.state.FIRED,h=e.state.PASS,f=e.state.FAIL;a.prototype.getFailedFilters=function(){filters=this.filters;failedFilters=[];for(var a=0;a<filters.length;a++)filter=filters[a],filter.match()||failedFilters.push(filter.uniqueId+"|"+filter.config.sourceVariable.uniqueId);
return failedFilters};a.prototype.checkFiltersIfTriggersFired=function(a){a=tiMonitor.dataCollector.timeOnPage();triggersRun=this.triggersState();if(triggersRun==k)if(validationResults=this.filtersState(),validationResults==f){failedFilters=this.getFailedFilters();qsPageVariables=[];pageVariables=c.pageVariables;for(i=0;i<pageVariables.length;i++)try{pageVariable=pageVariables[i],pageVariable instanceof c&&!0==pageVariable.reportValue&&(variableId=pageVariable.uniqueId,(variableValue=pageVariable.getValue())||
(variableValue="*undefined*"),combinedVariableValue=encodeURIComponent(variableId)+"="+encodeURIComponent(variableValue),qsPageVariables.push(combinedVariableValue))}catch(b){errMessage="Error with variable "+variableId+": "+b.message,console.log(errMessage),jeErrorObj={message:errMessage},tiMonitor.dataCollector.queueRequest(jeErrorObj,"jserror")}failedRuleObject={failedConditions:failedFilters.toString(),pageMacros:qsPageVariables.toString(),failedRule:this.uniqueId,validationTime:a,ruleVersion:this.ruleVersion};
this.dataCollector.queueRequest(failedRuleObject,"validationerror")}else passedRuleObject={passedRule:this.uniqueId,ruleVersion:this.ruleVersion,validationTime:a},this.dataCollector.queueRequest(passedRuleObject,"validationsuccess")};a.prototype.triggersState=function(){for(var a=k,b=0;b<this.triggers.length;b++)trigger=this.triggers[b],trigger.getState()==d&&(a=d);return a};a.prototype.filtersState=function(){filters=this.filters;session=this.session;filters=filters.sort(function(a,b){try{return b.config.order-
a.config.order}catch(c){return 0}});var a=h;if(!filters||0===filters.length)return a;for(var b,c=0;c<filters.length;c++)if(b=filters[c],b.setSession(session),!1==b.match()){a=f;break}return a}})();
(function(){function a(a){}for(var e={},b=0;93>b;b++)e["abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=".charAt(b)]=b;taginspector.Define.clazz("taginspector.Cookie",a);a.cookieAlphabet="abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-#$&+()@'%./:<>?[\"]^_`{|}~\\;=";a.cookieAlphabetMap=e;a.decode=function(a){return decodeURIComponent(a)};a.encode=function(a){return encodeURIComponent(a)};a.set=function(b,e,d,k,h){if(d){var f=new Date;
f.setTime(f.getTime()+864E5*d);d="; expires="+f.toGMTString()}else d="";h&&(b=a.encode(b),e=a.encode(e));b=b+"="+e+d+"; path=/;";k&&(b+=" domain="+k);document.cookie=b};a.get=function(b,e){for(var d=b+"=",k=document.cookie.split(";"),h=0;h<k.length;h++){for(var f=k[h];" "===f.charAt(0);)f=f.substring(1,f.length);if(0===f.indexOf(d))return d=f.substring(d.length,f.length),e&&(d=a.decode(d)),d}return null};a.getAll=function(b,e){for(var d=b+"=",k=document.cookie.split(";"),h=[],f=0;f<k.length;f++){for(var m=
k[f];" "===m.charAt(0);)m=m.substring(1,m.length);0===m.indexOf(d)&&(m=m.substring(d.length,m.length),e&&(m=a.decode(m)),h.push(m))}return h};a.rm=function(b,e){a.set(b,"",-1,e)}})();
(function(){function a(a){for(var b=[],c=0;c<a.length;c++){var d=g(a[c][0]);b.push([new RegExp(d,"g"),"*"+a[c][1]])}return b}function e(a,b){for(var c=0;c<b.length;c++)if(b[c][1]===a)return b[c][0];return null}function b(b){this._regexDefs=m;this._defs=f;b&&b.definitions&&(this._regexDefs=a(b.definitions),this._defs=b.definitions)}function c(a,b){for(var c=[],d=0;d<a.length;d++){var e=!0;b&&(e=a.charCodeAt(d)<=b);var f=h.cookieAlphabetMap.hasOwnProperty(a.charAt(d));e&&!f?c.push("*"+a.charCodeAt(d)+
"."):c.push(a.charAt(d))}return c.join("")}function g(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")}function d(a){for(var b={},c="",d=0;d<a.length;d++){var e=a.charAt(d);switch(e){case "=":case "&":case "?":case "/":case "*":case ",":case ":":isNaN(b[c])&&(b[c]=a.split(c).length-1);c="";break;default:c+=e}}a=[];for(var f in b)b.hasOwnProperty(f)&&(c=b[f],c>=p&&f.length>=r&&a.push([f,c]));return a=a.sort(function(a,b){return a[0].length===b[0].length?0:b[0].length>a[0].length?1:-1})}var k=
taginspector.Define,h=taginspector.Cookie,f=[['","referrer":[{"url":"http://',"1-"],['","referrer":[{"url":"https://',"2-"],[',"referrer":[{"url":"http://',"3-"],[',"referrer":[{"url":"https://',"4-"],[',"sessionStartTime":',"5-"],['":{}}',"6-"],["www.google.com","7-"],["www.google.co.uk","8-"],["www.google.","9-"],['"landing":"',"Z"],['"landing":',"L"],['"time":',"A"],['"sessionStartTime":',"S"],['"pageViews":',"P"],['"sessionCount":',"B"],['"sessionLandingPage":',"E"],['"referrer":',"R"],['"url":"http://www.',
"J"],['"url":"https://www.',"M"],['"url":"',"I"],['"url":',"U"],["http://www.","W"],["https://www.","V"],["%2Fen%2Ftsuk%2F","K"],["http%3A%2F%2Fwww","F"],["http%3A%2F%2F","D"],["http://","H"],["https://","X"],['""',"O"],['",',"Y"]],m=a(f);k.clazz("taginspector.datapulse.compression.Encoder",b);b.prototype.encode=function(a,b){for(var e=a.replace(/\*/g,"**"),f=0;f<this._regexDefs.length;f++)var k=this._regexDefs[f],e=e.replace(k[0],k[1]);for(var e=e.replace(/;/g,"*-"),e=e.replace(/&/g,"*."),e=e.replace(/\\/g,
"*/"),e=e.replace(/=/g,"*+"),e=e.replace(/\n/g,"*N"),e=e.replace(/ /g,"*_"),e=e.replace(/\t/g,"*T"),e=e.replace(/,/g,"*C"),e=e.replace(/"/g,"*Q"),f=d(e),k=e.replace(/\$/g,"$$$"),h=[],m=0,p=0;m<f.length;m++){var r=new RegExp(g(f[m][0]),"g"),r=k.replace(r,"$"+p+"-");r!==k&&(h.push(f[m][0]),p++,k=r)}f=[k,h];k=f[1];(h=0<k.length)&&(e=f[0]);e=b?c(e,b):c(e);return h?"Y"+k.join("*")+"?"+e:"N"+e};var r=4,p=2;b.prototype.decode=function(a){var b=null;if("N"===a.charAt(0))a=a.substring(1);else if("Y"===a.charAt(0)){var c=
a.indexOf("?");if(0<=c&&(b=a.substring(1,c),b=b.split("*"),a=a.substring(c+1),b&&0!==b.length&&a)){for(var c="",d=!1,f=!1,k="",h=0;h<a.length;h++){var g=a.charAt(h);"$"===g||d||f?d||f?(d=!1,"$"===g?c+="$":isNaN(+("-"+g))?f?(c=b&&"-"===g&&b[+k]?c+b[+k]:c+("$"+k+g),k="",f=!1):c+="$"+g:(f=!0,k+=g)):d=!0:c+=g}k&&(c+="$"+k);d&&(c+="$");a=c}}b="";d=c=!1;f="";for(k=0;k<a.length;k++)h=a.charAt(k),"*"===h||c||d?c||d?(c=!1,isNaN(+("-"+h))?d?(b="."===h?b+String.fromCharCode(+f):"-"===h&&e(f+"-",this._defs)?
b+e(f+"-",this._defs):b+("*"+f+h),f="",d=!1):"*"===h?b+="*":"-"===h?b+=";":"/"===h?b+="\\":"."===h?b+="&":"+"===h?b+="=":"N"===h?b+="\n":"_"===h?b+=" ":"T"===h?b+="\t":"C"===h?b+=",":"Q"===h?b+='"':null!==e(h,this._defs)?(h=e(h,this._defs),b+=h):b+="*"+h:(f+=h,d=!0)):c=!0:b+=h;f&&(b+="*"+f);c&&(b+="*");return b}})();
(function(){function a(a){if(a)if(a.alphabet)for(this.alphabet=a.alphabet,this.dict={},a=0;a<this.alphabet.length;a++)this.dict[this.alphabet[a]]=a;else this.alphabet=b,this.dict=d}function e(a,b){for(var c in b)if(a===b[c])return c;return null}for(var b=[],c=Math.pow(2,8),g=0;g<c;g++)b.push(String.fromCharCode(g));for(var d={},c=0;c<b.length;c++)d[b[c]]=c;taginspector.Define.clazz("taginspector.compression.LZW",a);a.prototype.encode=function(a){for(var b=this.alphabet.length,c={},d=[],e=0,g=a.charAt(e++),
q,l=this.dict;q=a.charAt(e++);){var n=g+q;if(l.hasOwnProperty(n)||c.hasOwnProperty(n))g=n;else{var s=l.hasOwnProperty(g)?l[g]:c[g];if(void 0===s)throw"Dictionary base is to small for those contents: "+g;d.push(s);c[n]=b++;g=q}}""!==g&&d.push(c.hasOwnProperty(g)?c[g]:l[g]);return d};a.prototype.decode=function(a){for(var b=this.dict,c=this.alphabet.length,d,g={},p=e(a[0],b),q=p,l=[p],n=1;n<a.length;n++){var s=a[n];d=e(s,b);null===d&&(g.hasOwnProperty(s)&&(d=g[s]),null===d&&(d=q+p));l.push(d);p=d.charAt(0);
g[c++]=q+p;q=d}return l.join("")}})();
(function(){function a(a){}for(var e={},b=0;45>b;b++)e["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)]=b;for(var c={},b=0;45>b;b++)c['ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b)]=b;for(var g={},b=0;45>b;b++)g["abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(b)]='ABCDEFGHIJKLMNOPQRSTUVWXYZ*!-+()@{|}"]^_`~$&#'.charAt(b);var d="abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".split(""),k=d.length,h=new taginspector.compression.LZW({});taginspector.Define.clazz("taginspector.compression.Compressor",
a);a.prototype.compress=function(a,b){for(var c=(b||h).encode(a),d=[],e=0;e<c.length;e++)d.push(String.fromCharCode(c[e]));return d.join("")};a.prototype.compressAnsi=function(a,b){for(var c=(b||h).encode(a),e=[],q=0;q<c.length;q++){var l;l=c[q];var n=0,s=0>l;s&&(l=-l);var t="",w=!0;do n=l%k,w?(t=g[d[n]],w=!1):t=d[n]+t,l=(l-n)/k;while(0<l);l=s?"-"+t:t;e.push(l)}return e.join("")};a.prototype.decompressAnsi=function(a,b){for(var d=[],g="",q=0;q<a.length;q++){var l=a.charAt(q);if(c.hasOwnProperty(l)){for(var l=
g+l,g="",n=0,s=0,t=!0,w=0;w<l.length;w++){var x=l.charAt(l.length-1-w);t&&(t=!1,x="abcdefghijklmnopqrstuvwxyz0123456789'%./:<>?[".charAt(c[x]));n+=e[x]*Math.pow(k,s++)}l=n;d.push(l)}else g+=l}return(b||h).decode(d)};a.prototype.decompress=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a.charCodeAt(d));return(b||h).decode(c)}})();
(function(){function a(a){this.testBinary=!1;this.binSupported=g;a&&(c.FINEST("Created compressor instance."),this.compressor=new taginspector.compression.Compressor,this.encoder=new taginspector.datapulse.compression.Encoder({}),void 0!==a.binSupported&&(this.binSupported=!!a.binSupported))}var e=taginspector.Define,b=taginspector.Cookie,c=new taginspector.datapulse.Log("CookieCompressor -> ");e.global();var g=!1;e.clazz("taginspector.datapulse.compression.CookieCompressor",a);a.prototype.compress=
function(a,e){if("string"!==typeof a||""===a)return a;c.FINEST("Compressing...");var g=this.encoder.encode(a),f;if(this.binSupported||this.testBinary){f=this.compressor.compress(g);f='"B'+this.encoder.encode(f,128)+'"';b.set("__qtag_test_bin__",f);var m=b.get("__qtag_test_bin__");b.rm("__qtag_test_bin__");m&&m!==f&&(f=null,c.FINEST("Binary cookie saving trial failed."))}m=this.encoder.encode(this.compressor.compressAnsi(g));g=!e&&g.length<=m.length?'"E'+g+'"':'"C'+m+'"';if(f&&f.length<g.length)return c.FINEST("Binary compression ratio: "+
f.length/a.length),f;c.FINEST("Compression ratio: "+g.length/a.length);return g};a.prototype.decompress=function(a){if("string"!==typeof a||""===a)return a;'"'===a.charAt(0)&&(a=a.substring(1,a.length-1));c.FINEST("Decompressing...");var b=a.charAt(0);a=a.substring(1);switch(b){case "E":return this.encoder.decode(a);case "C":return a=this.compressor.decompressAnsi(this.encoder.decode(a)),this.encoder.decode(a);case "B":return a=this.compressor.decompress(this.encoder.decode(a)),this.encoder.decode(a);
default:throw"This code is not supported! Code: "+b;}}})();
(function(){function a(a){this.log=new taginspector.datapulse.Log("",function(){return this.CLASS_NAME+"[DataCollector]"}.bind(this),"collectLogs");this.config={siteID:"",pixelHost:"",tagDefinitions:[]};this.session=null;if(a)for(var b in a)a.hasOwnProperty(b)&&(this.config[b]=a[b]);this.pixelHost=this.config.pixelHost;this.siteID=this.config.siteID;this.tagDefinitions=this.config.tagDefinitions;this.startTime=Date.now();this.resourceCounter=this.offsetTime=0;this.pageId="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)});this.pendingRequests=[];this.currentlySendingData=!1;this.identifiedRequests={}}taginspector.datapulse.Utils.clazz("taginspector.datapulse.DataCollector",a);a.prototype.timeOnPage=function(){return performance.now()-this.offsetTime};a.prototype.adjustTimeForOffset=function(a){return!1==isNaN(a)?(fts=parseFloat(a).toFixed(2),fts=parseFloat(a),fts-=this.offsetTime,0>fts&&(fts=0),fts.toString()):a};a.prototype.getPageCurrentTime=
function(){return Date.now()};a.prototype.getPageStartTime=function(){return this.startTime};a.prototype.isBeaconSupported=function(){return"sendBeacon"in navigator?!0:!1};a.prototype.getMaxBodySize=function(){isSendBeaconRequest=this.isBeaconSupported();return 1E4};a.prototype.createRequestBody=function(){tmpReqList={requestList:[]};requestLength=0;maxRequestLength=this.getMaxBodySize();for(urlCounter=0;0<this.pendingRequests.length;)if(tagReq=this.pendingRequests[0],void 0!=tagReq||null!=tagReq)if(requestLength+=
encodeURIComponent(tagReq).length,requestLength>maxRequestLength&&0!=urlCounter)break;else tmpReqList.requestList.push(this.pendingRequests.shift()),urlCounter+=1;else this.pendingRequests.shift();return tmpReqList};a.prototype.createPixelRequest=function(a){reqPixel=new Image;reqPixel.src=this.pixelHost+"?"+a};a.prototype.createAjaxPostRequest=function(a){XMLHttpRequest.prototype.sendAsBinary||(XMLHttpRequest.prototype.sendAsBinary=function(a){for(var b=a.length,c=new Uint8Array(b),e=0;e<b;e++)c[e]=
a.charCodeAt(e)&255;this.send(c)});var b=new XMLHttpRequest;b.open("POST",this.pixelHost,!0);var c="----"+Date.now().toString(16);b.setRequestHeader("Content-Type","multipart/form-data; boundary="+c);b.sendAsBinary("--"+c+'\r\nContent-Disposition: form-data; name="beaconreq"\r\n\r\n'+a+"\r\n--"+c+"--\r\n")};a.prototype.createSendBeaconRequest=function(a){var b=new FormData;b.append("beaconreq",a);result=navigator.sendBeacon(this.pixelHost,b);!1==result&&this.createAjaxPostRequest(a)};a.prototype.b64EncodeUnicode=
function(a){return btoa(encodeURIComponent(a).replace(/%([0-9A-F]{2})/g,function(a,c){return String.fromCharCode("0x"+c)}))};a.prototype.identifyRequest=function(a){for(var b=0;b<this.tagDefinitions.length;b++){var c=this.tagDefinitions[b];!0==c.regex.test(a.name)&&(!1==this.identifiedRequests.hasOwnProperty(c.id)&&(this.identifiedRequests[c.id]=[]),this.identifiedRequests[c.id].push(a))}};a.prototype.sendRequests=function(a){if(!1==tiMonitor.dataCollector.currentlySendingData){tiMonitor.dataCollector.currentlySendingData=
!0;for(base_req_data="pid="+this.pageId+"&sid="+this.siteID+"&purl="+encodeURIComponent(tiMonitor.sendData.currentUrl)+"&pst="+encodeURIComponent(this.getPageStartTime())+"&pct="+encodeURIComponent(this.getPageCurrentTime());0<this.pendingRequests.length;)requestBody=this.createRequestBody(),encodedRequestString=encodeURIComponent(this.b64EncodeUnicode(JSON.stringify(requestBody))),req_data=base_req_data+"&taginfo="+encodedRequestString+"&b64=1",!0==this.isBeaconSupported()&&!0==a?this.createSendBeaconRequest(req_data):
this.createAjaxPostRequest(req_data);tiMonitor.dataCollector.currentlySendingData=!1}};a.prototype.isValidResourceStartTime=function(a){var b=!0;try{if(a=parseFloat(a),this.timeOnPage()<a||6E5<a)b=!1}catch(c){console.log(c.message)}return b};a.prototype.queueRequest=function(a,b){if("resource"==b)if(!0==this.isValidResourceStartTime(this.adjustTimeForOffset(a.startTime)))reqName=a.name,req="rt="+b+"&ce="+encodeURIComponent(this.adjustTimeForOffset(a.connectEnd))+"&cs="+encodeURIComponent(this.adjustTimeForOffset(a.connectStart))+
"&dle="+encodeURIComponent(this.adjustTimeForOffset(a.domainLookupEnd))+"&dls="+encodeURIComponent(this.adjustTimeForOffset(a.domainLookupStart))+"&d="+encodeURIComponent(a.duration.toFixed(2))+"&et="+encodeURIComponent(a.entryType)+"&fs="+encodeURIComponent(this.adjustTimeForOffset(a.fetchStart))+"&it="+encodeURIComponent(a.initiatorType)+"&n="+encodeURIComponent(a.name)+"&rde="+encodeURIComponent(this.adjustTimeForOffset(a.redirectEnd))+"&rds="+encodeURIComponent(this.adjustTimeForOffset(a.redirectStart))+
"&reqs="+encodeURIComponent(this.adjustTimeForOffset(a.requestStart))+"&rse="+encodeURIComponent(this.adjustTimeForOffset(a.responseEnd))+"&rss="+encodeURIComponent(this.adjustTimeForOffset(a.responseStart))+"&scc=&st="+encodeURIComponent(this.adjustTimeForOffset(a.startTime))+"&sz="+encodeURIComponent(this.adjustTimeForOffset(a.decodedBodySize)),this.identifyRequest(a),this.resourceCounter+=1;else return;else if("pageload"==b){dom_complete=dom_content_load=dom_interactive=page_size="";try{var c=
performance.timing;0!=c.domInteractive&&(dom_interactive=c.domInteractive-c.fetchStart);0!=c.domContentLoadedEventEnd&&(dom_content_load=c.domContentLoadedEventEnd-c.fetchStart);0!=c.domComplete&&(dom_complete=c.domComplete-c.fetchStart)}catch(g){console.log(g.message)}if(!1==isNaN(dom_interactive)&&6E5<dom_interactive)return;conn_type=conn_downlink=conn_roundtrip=conn_downlinkMax=conn_effType="";req="rt="+b+"&ref=&top="+encodeURIComponent(this.timeOnPage())+"&domint="+encodeURIComponent(dom_interactive)+
"&domcl="+encodeURIComponent(dom_content_load)+"&domcom="+encodeURIComponent(dom_complete)+"&condl="+encodeURIComponent(conn_downlink)+"&conrt="+encodeURIComponent(conn_roundtrip)+"&coneff="+encodeURIComponent(conn_effType)+"&psz="+ +encodeURIComponent(page_size)}else"validationerror"==b&&!1==tiMonitor.sendData.preventFiringValidationRules?req="rt="+b+"&fr="+encodeURIComponent(a.failedRule)+"&rv="+encodeURIComponent(a.ruleVersion)+"&pm="+encodeURIComponent(a.pageMacros)+"&fc="+encodeURIComponent(a.failedConditions)+
"&vt="+encodeURIComponent(a.validationTime):"validationsuccess"==b&&!1==tiMonitor.sendData.preventFiringValidationRules?req="rt="+b+"&pr="+encodeURIComponent(a.passedRule)+"&rv="+encodeURIComponent(a.ruleVersion)+"&vt="+encodeURIComponent(a.validationTime):"jserror"==b?req="rt="+b+"&msg="+a.message:"pageBeforeUnload"==b&&(c=performance.timing,dom_interactive=c.domInteractive-c.fetchStart,dom_content_load=c.domContentLoadedEventEnd-c.fetchStart,dom_complete=c.domComplete-c.fetchStart,dom_content_load_end=
c.domContentLoadedEventEnd,response_end=c.responseEnd,navigation_start=c.navigationStart,firstContentfulPaint=first_paint=timeToFirstPaint=void 0,window.performance&&(c=window.performance.getEntriesByType("paint"),void 0!=c&&0<c.length&&(timeToFirstPaint=parseInt(1E3*c[0].startTime),first_paint=navigation_start+timeToFirstPaint,firstContentfulPaint=parseInt(1E3*c[1].startTime))),req="rt="+b+"&ref=&top="+encodeURIComponent(performance.now())+"&domint="+encodeURIComponent(dom_interactive)+"&domcl="+
encodeURIComponent(dom_content_load)+"&domcom="+encodeURIComponent(dom_complete)+"&domcle="+encodeURIComponent(dom_content_load_end)+"&rse="+encodeURIComponent(response_end)+"&navs="+encodeURIComponent(navigation_start)+"&fpt="+encodeURIComponent(first_paint)+"&tfpt="+encodeURIComponent(timeToFirstPaint)+"&fcpt="+encodeURIComponent(firstContentfulPaint));0<this.resourceCounter&&(this.pendingRequests.push(req),"validationerror"!=b&&"validationsuccess"!=b||this.sendRequests(!0))}})();
(function(){var a=taginspector.Cookie,e=taginspector.datapulse.Utils,b=new taginspector.datapulse.Log("Session -> "),c=function(){};e.clazz("taginspector.datapulse.Session",c);var g=new taginspector.datapulse.compression.CookieCompressor({});c.readCompressedCookie=function(b){b=a.get(b);return g.decompress(b)};c.setupSession=function(d){var k,h,f,m,r;k={};r="tm_"+d.containerId;var p="x_tm_"+d.containerId;f=a.get(r,!0);var q=!!f;null===f&&(f=a.get(p),f=g.decompress(f));if(f)try{f=JSON.parse(f)}catch(l){f=
{sc:0,sessionCount:0,pageViews:0,sessionStartTime:0,referrer:[],sessionLandingPage:"",__v:{}}}else f={sc:0,sessionCount:0,pageViews:0,sessionStartTime:0,referrer:[],sessionLandingPage:"",__v:{}};h=(new Date).getTime();k.sessionCount!==parseInt(f.sc,10)?(f.sessionStartTime=h,f.sc=k.sessionCount,f.sessionCount+=1,f.referrer.push({url:c.getReferrer(),landing:e.getUrl().substring(0,300),time:h}),f.sessionLandingPage=e.getUrl().substring(0,300)):c.isReferrerDifferent()&&!c.referrerIsSameAsPrevious(f.referrer,
h,18E5)&&(f.referrer.push({url:c.getReferrer(),landing:e.getUrl().substring(0,300),time:h}),f.sessionLandingPage=e.getUrl().substring(0,300),f.sessionStartTime=h,f.sessionCount+=1);k.sessionCount=f.sessionCount;k.sessionStartTime=f.sessionStartTime;k.pageStartTime=h;f.pageViews+=1;k.pageViews=f.pageViews;k.sessionLandingPage=f.sessionLandingPage;k.referrer=f.referrer;5<k.referrer.length&&k.referrer.splice(2,k.referrer.length-5);m=JSON.stringify(f);for(h=0;g.compress(m).length>d.maxCookieLength&&5>
h;)3<=f.referrer.length?f.referrer.splice(2,1):2===f.referrer.length?f.referrer=[f.referrer[0]]:1===f.referrer.length&&(f.referrer=[]),m=JSON.stringify(f),h+=1;k.referrer=f.referrer;q&&a.rm(r);r=g.compress(m);a.rm(p);a.set(p,r,365,d.cookieDomain);k.setVariable=function(b,c,e){f.__v[b]=[c,e?e:0];b=g.compress(JSON.stringify(f));a.set(p,b,365,d.cookieDomain)};k.getCookie=function(c,d){var e=a.get(c);if(e&&(d||0===c.indexOf("x_"))){b.FINE("getCookie() : Comressed cookie accessed:\n"+c+"="+e);try{e=g.decompress(e)}catch(f){b.ERROR("Cookie failed to decompress: "+
f)}}else e=a.decode(e);return e};k.getVariable=function(a){var b;if(a=f.__v[a])if(b=a[1],0===b||b>(new Date).getTime())return a[0];return null};k.on=function(a,b,c){b.attachEvent?b.attachEvent("on"+a,c):b.addEventListener&&b.addEventListener(a,c,!1)};k.getTagCookie=function(){return c.readCompressedCookie(p)};return c.lastSession=k};c.referrerIsSameAsPrevious=function(a,b,g){var f,m;return 0<a.length?(f=c.getReferrer(),m=e.getUrl().substring(0,300),a=a[a.length-1],a.url===f&&a.landing===m&&a.time+
g>b):!1};c.isReferrerDifferent=function(){var a,b;b=c.getReferrer();a=b.indexOf("://");if(-1===a)return!0;try{return 0!==b.substring(a+3).indexOf(c.getDomain())?!0:!1}catch(e){return!0}};c.getReferrer=function(){return document.referrer?document.referrer.substring(0,300):"direct"};c.getDomain=function(){return document.location.host}})();
(function(){taginspector.datapulse.Utils.namespace("taginspector.datapulse.filter.pattern.PatternType",{CONTAINS:"Contains",MATCHES_EXACTLY:"Matches Exactly",STARTS_WITH:"Starts With",ENDS_WITH:"Ends With",REGULAR_EXPRESSION:"Regular Expression",ALL_URLS:"All URLs",EQUALS:"Equals",DOES_NOT_EQUAL:"Does not Equal",DOES_NOT_CONTAIN:"Does not Contain",DOES_NOT_STARTS_WITH:"Does not Start With",DOES_NOT_END_WITH:"Does not End With",MATCHES_REGEX:"Matches Regex",DOES_NOT_MATCH_REGEX:"Does not Match Regex",
LESS_THAN:"Less Than",GREATER_THAN:"Greater Than"})})();
(function(){function a(c){this._lockObject={};var e={comparisonType:b.CONTAINS,sourceVariable:void 0,comparisonVariable:void 0};if(c)for(var d in c)c.hasOwnProperty(d)&&(e[d]=c[d]);a.superclass.call(this,e)}var e=taginspector.datapulse.Utils,b=taginspector.datapulse.filter.pattern.PatternType;e.clazz("taginspector.datapulse.filter.JsExpressionFilter",a,taginspector.datapulse.filter.BaseFilter);a.prototype.match=function(){var a=!0,g=this.config.sourceVariable.getValue();if("object"==typeof this.config.comparisonVariable)var d=
this.config.comparisonVariable.getValue();else if("string"==typeof this.config.comparisonVariable||"number"==typeof this.config.comparisonVariable)d=this.config.comparisonVariable;else return!1;switch(this.config.comparisonType){case b.LESS_THAN:case b.GREATER_THAN:if(!1==e.isInt(d))return!1;d=parseInt(d)}switch(this.config.comparisonType){case b.DOES_NOT_CONTAIN:case b.CONTAINS:a=0<=g.toLowerCase().indexOf(d.toLowerCase());break;case b.EQUALS:case b.DOES_NOT_EQUAL:case b.MATCHES_EXACTLY:a=g.toLowerCase()===
d.toLowerCase();break;case b.STARTS_WITH:case b.DOES_NOT_STARTS_WITH:a=0===g.toLowerCase().indexOf(d.toLowerCase());break;case b.ENDS_WITH:case b.DOES_NOT_END_WITH:a=g.toLowerCase().substr(-d.length)===d.toLowerCase();break;case b.MATCHES_REGEX:case b.REGULAR_EXPRESSION:case b.DOES_NOT_MATCH_REGEX:a=(new RegExp(d)).test(g);break;case b.LESS_THAN:a=g<d;break;case b.GREATER_THAN:a=g>d;break;case b.ALL_variableValueS:a=!0}switch(this.config.comparisonType){case b.DOES_NOT_EQUAL:case b.DOES_NOT_CONTAIN:case b.DOES_NOT_STARTS_WITH:case b.DOES_NOT_END_WITH:case b.DOES_NOT_MATCH_REGEX:a=
!a}return a}})();

if (typeof tiMonitor == "undefined"){
	var tiMonitor = tiMonitor || {};
	tiMonitor.dataCollector = new taginspector.datapulse.DataCollector({siteID:"9f4e97e0ac7811e6b6e71227d54986f3", pixelHost:"https://collect.analyze.ly", tagDefinitions: [{id: '93', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)agkn\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)aggregateknowledge\\.com\\/)', 'i')},{id: '1436', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)snap\\.licdn\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)(dc|imp2|px).ads\\.linkedin\\.com\\/))', 'i')},{id: '1426', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)coherentpath\\.com\\/)', 'i')},{id: '1440', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)760main\\.com\\/)', 'i')},{id: '345', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)flashtalking\\.com\\/)', 'i')},{id: '255', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)criteo\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)criteo\\.net\\/)', 'i')},{id: '1', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com(\\/r)?\\/__utm\\.gif)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/u\\/ga\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/p\\/__utm\\.gif)|(\\/u\\/ga_debug\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/ga\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)google\\.com\\/js\\/gweb\\/analytics\\/autotrack\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google\\.com\\/js\\/gweb\\/analytics\\/doubletrack\\.js)|(^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/ga_exp\\.js)|((^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/analytics\\.js|^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com\\/plugins\\/ua\\/))|((^http(s)?:\\/\\/((.*)\\.|)google-analytics\\.com(\\/[a-z])?\\/collect|^http(s)?:\\/\\/((.*)\\.|)stats\\.g\\.doubleclick\\.net(\\/[a-z])?\\/collect))|((stats\\.g\\.doubleclick\\.net\\/dc\\.js|stats\\.g\\.doubleclick\\.net\\/__utm\\.gif))', 'i')},{id: '148', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)lb-static1-1568763564\\.us-east-1\\.elb.amazonaws\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)brcdn\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)brsrvr\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)brtstats\\.com\\/)', 'i')},{id: '1442', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)ispot\\.tv\\/)', 'i')},{id: '1420', regex: new RegExp('(^http(s)?:\\/\\/(ct\\.pinterest\\.com\\/|((.*)\\.|)pinimg.com\\/ct\\/core\\.js))', 'i')},{id: '384', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)googleadservices\\.com\\/pagead\\/conversion\\.js)|(^http(s)?:\\/\\/((.*)\\.|)googleadservices\\.com\\/pagead\\/conversion\\/)|(^http(s)?:\\/\\/((.*)\\.|)googleadservices\\.com\\/pagead\\/conversion_async\\.js)', 'i')},{id: '758', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)securedvisit\\.com\\/)', 'i')},{id: '1406', regex: new RegExp('((^http(s)?:\\/\\/connect\\.facebook\\.net\\/(.*)\\/fbevents\\.js|^http(s)?:\\/\\/www\\.facebook\\.com\\/tr(\\/|\\?)))', 'i')},{id: '547', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)marketo\\.net\\/|^http(s)?:\\/\\/((.*)\\.|)insightera\\.com\\/))|(^http(s)?:\\/\\/((.*)\\.|)mktoresp\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)marketo\\.com\\/(.*)(msg|sgm|munchkin|api|rtp))', 'i')},{id: '222', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)dpbolvw\\.net\\/|^http(s)?:\\/\\/((.*)\\.|)emjcd\\.com\\/))|(^http(s)?:\\/\\/((.*)\\.|)jdoqocy\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)afcyhf\\.com\\/)', 'i')},{id: '1405', regex: new RegExp('(\\/pub\\/cct\\?)|(^http(s)?:\\/\\/((.*)\\.|)responsys\\.net\\/)', 'i')},{id: '650', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)owneriq\\.net\\/)', 'i')},{id: '294', regex: new RegExp('(doubleclick\\.net\\/activity)|(fls\\.doubleclick\\.net\\/)|(gtag\\/js\\?id\\=(DC|dc)-)', 'i')},{id: '565', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)mathtag\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)imiclk\\.com\\/))|(^http(s)?:\\/\\/((.*)\\.|)mathads\\.com\\/)', 'i')},{id: '56', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)stats\\.adobe\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)omniture\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)omniture-static\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)om\\.cbsi\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)2o7\\.net\\/)|(\\/s_code[\\.09a-zA-Z_-]*\\.js|omniunih\\.js|\\/omniunih\\.js)|(^http(s)?:\\/\\/((.*)\\.|)omtrdc\\.net\\/)|(\\/b\\/ss\\/[\\.a-zA-Z0-9,_-]*\\/[0-9]*\\/(h\\.[0-9]{1,2}|js-[0-9])?)', 'i')},{id: '149', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)btttag\\.com\\/)', 'i')},{id: '562', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)media6degrees\\.com\\/)', 'i')},{id: '295', regex: new RegExp('(www\\.googletagservices\\.com\\/tag\\/)|(ad-ace\\.doubleclick\\.net\\/)|(ad\\.doubleclick\\.net\\/)|(ad\\.[a-z]*\\.doubleclick\\.net\\/)|(ad-apac\\.doubleclick\\.net\\/)|(ad-emea\\.doubleclick\\.net\\/)|(pubads\\.g\\.doubleclick\\.net\\/)|(m\\.doubleclick\\.net\\/)|(ad-g\\.doubleclick\\.net\\/)|(2mdn\\.net\\/)|(static\\.doubleclick\\.net\\/)|(iv\\.doubleclick\\.net\\/)|(cm\\.g\\.doubleclick\\.net\\/)|(^http(s)?:\\/\\/((.*)\\.|)donotmatchme\\.com\\/)|(g\\.doubleclick\\.net\\/)', 'i')},{id: '290', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)dotomi\\.com\\/)|(^http(s)?:\\/\\/((.*)\\.|)dtmpub\\.com\\/)', 'i')},{id: '422', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)hlserve\\.com\\/)', 'i')},{id: '914', regex: new RegExp('(^http(s)?:\\/\\/((.*)\\.|)webcollage\\.net\\/)', 'i')},{id: '1427', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)bluecore\\.com\\/|^http(s)?:\\/\\/((.*)\\.|)triggeredmail\\.appspot\\.com\\/))', 'i')},{id: '1363', regex: new RegExp('((^http(s)?:\\/\\/((.*)\\.|)d21o24qxwf7uku\\.cloudfront\\.net\\/|^http(s)?:\\/\\/((.*)\\.|)sundaysky\\.com\\/))', 'i')},{id: '291', regex: new RegExp('(googleads\\.g\\.doubleclick\\.net\\/)|(google\\.com\\/ads\\/user-lists\\/)', 'i')}]});
	tiMonitor.sendData = {
		pageId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);}),
		sentUnload: false,
		currentlyIterating: false,
		pageBeingSampled: false,
		externalTagStartTimes: [],
		internalTagStartTimes: [],
		currentUrl: window.location.href,
		minimumBeforeUnloadRestriction: 5,
		sampleRate: 4096,
		sampleBlackList: new RegExp('confirmOrder', 'i'),
		sampleBlackListEnabled: true,
		getRandomInt: function() {
			return Math.floor(Math.random() * (this.sampleRate - 1 + 1)) + 1;
		},
		shouldSamplePage: function(){
			if(this.sampleBlackListEnabled == true){
				if(this.sampleBlackList.test(this.currentUrl) == true){
					return false;
				}
			}
			if(1 == tiMonitor.sendData.getRandomInt()){
				return false;
			}else{
				tiMonitor.sendData.pageBeingSampled = true;
				return true;
			}
		},
		isSinglePageApp: function(){
			if(window.angular){
				return true;
			}else{
				return false;
			}
		},
		isPerformanceObserverSupported: function(){
			if(window.PerformanceObserver){
				return true;
			}else{
				return false;
			}
		},
		isPerformanceObserverInitialized: false,
		performanceObserverCallback: function(list){

			var perfEntries = list.getEntries();
			for (var i = 0; i < perfEntries.length; i++){
				var req = perfEntries[i];
				if(tiMonitor.sendData.isValidRequest(req) == true){
					tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
					tiMonitor.dataCollector.queueRequest(req, "resource");
				}else{
					tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
				}
			}

			tiMonitor.sendData.isPerformanceObserverInitialized=true;
		},
		suportedBrowser: function(){
			var isSupported = true;
			ua = navigator.userAgent;
			var isNativeAndroid = ((ua.indexOf('Mozilla/5.0') > -1 && ua.indexOf('Android ') > -1 && ua.indexOf('AppleWebKit') > -1) && (ua.indexOf('Version') > -1));

			var perfMonSupport = false;
			if ('performance' in window) { 
				if ('getEntries' in performance) {
					perfMonSupport = true;
				}
			}
			if(isNativeAndroid == true || perfMonSupport == false){
				isSupported = false;
			}
			return isSupported;
		},
		blackList: new RegExp('http(s)?:\/\/(col\.eum-appdynamics\.com|((.*)\.|)mouseflow.com)'),
		lastPerformanceObjLength: 0,
		areTriggersActivated: false,
		isDuplicateRequest: function(req){
			lt = tiMonitor.sendData.getUniqueReqKey(req);
			return !(tiMonitor.sendData.externalTagStartTimes.indexOf(lt) == -1 && tiMonitor.sendData.internalTagStartTimes.indexOf(lt) == -1);
		},
		isBlacklistedRequest: function(req){
			return this.blackList.test(req.name) == true;
		},
		isExternalRequest: function(req){
			externalReq = true;
			windowOrigin = window.location.protocol + '//' + window.location.hostname;
			if(req.name.length >= windowOrigin.length){
				truncReqName = (req.name).substr(0, windowOrigin.length);
				externalReq = (truncReqName).indexOf(windowOrigin) == -1;
			}
			return externalReq;
		},
		isTIRequest: function(req){
			return !((req.name).indexOf(tiMonitor.dataCollector.pixelHost) == -1);
		},
		isValidRequest:function(req){
			validReq = false;

			if(this.isTIRequest(req) == false && this.isExternalRequest(req) == true && this.isBlacklistedRequest(req) == false){
				validReq = true;
			}
			return validReq;
		},
		getUniqueReqKey:function(req){
			return (req.startTime).toString() + "-" + (req.responseEnd).toString();
		},
		isBufferFull:function(){
			bufferFull = false;
			if(window.performance.getEntriesByType("resource").length == 150 || window.performance.getEntriesByType("resource").length == 250 || window.performance.getEntriesByType("resource").length == 400){
				bufferFull = true;
			}
			return bufferFull;
		},
		iteratePerformance: function(){
			if(this.currentlyIterating == false){
				this.currentlyIterating = true;

				var pe = performance.getEntriesByType("resource");
				if(this.lastPerformanceObjLength != pe.length){
					this.lastPerformanceObjLength = pe.length;
					for (var i = 0; i < pe.length; i++) {
						var req = pe[i];
						if(this.isDuplicateRequest(req) == false){
							if(tiMonitor.sendData.isValidRequest(req) == true){
								tiMonitor.sendData.externalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
								tiMonitor.dataCollector.queueRequest(req, "resource");
							}else{
								tiMonitor.sendData.internalTagStartTimes.push(tiMonitor.sendData.getUniqueReqKey(req));
							}
						}
					}
				}
				if(this.areTriggersActivated == false){
					this.areTriggersActivated = true;
					tiMonitor.validationRules(true);
				}
				this.currentlyIterating = false;
			}
		},
		domLoadCompleteEvent: (document.readyState == 'complete'),
		windowUnloadEvent: false,
		preventFiringValidationRules: false,
		pageVariableFiredEvents: {},
		pageComplete: function(){
			if(tiMonitor.sendData.sentUnload == false && tiMonitor.sendData.pageBeingSampled == false){
				tiMonitor.sendData.sentUnload = true;
				tiMonitor.dataCollector.queueRequest(null, "pageload");
				this.iteratePerformance();
				this.fire();
			}
		},
		waitForDomLoad: function(){
			if (document.readyState == 'complete' && tiMonitor.sendData.sentUnload == false){
				tiMonitor.sendData.pageComplete();
				return true;
			}else{
				return false;
			}
		},
		fire: function(){
			tiMonitor.dataCollector.sendRequests(false);
		},
		clearBuffer: function(){
			if(window.performance.clearResourceTimings){
				startBufferLength = window.performance.getEntriesByType("resource").length;
				tiMonitor.sendData.iteratePerformance();
				window.performance.clearResourceTimings();
				endBufferLength = window.performance.getEntriesByType("resource").length;

				if (startBufferLength == endBufferLength){
					this.preventFiringValidationRules = true;
				}
			}
		},
		handleUnload: function(){
			tiMonitor.windowUnloadEvent=true;
			tiMonitor.sendData.pageComplete();

			if(tiMonitor.sendData.isPerformanceObserverSupported() == false){
				tiMonitor.sendData.iteratePerformance();
			}
			tiMonitor.sendData.fire();
		},
		fullBufferEventListener: function(){
			if("clearResourceTimings" in window.performance){
				if("addEventListener" in window.performance){
					window.performance.addEventListener("resourcetimingbufferfull", function(){
						tiMonitor.sendData.clearBuffer();
					});
				}else{
					if("onresourcetimingbufferfull" in window.performance){
						window.performance.onresourcetimingbufferfull = function(event) {
							tiMonitor.sendData.clearBuffer();
						};
					}
				}
			}
		},
		initialized: false
	};


	tiMonitor.validationRules = function (){
		try {
			macro_function_3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('565') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2', reportValue: false});
		macro_3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2.setValue(macro_function_3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2);
		macro_function_31dad1ae_f686_5581_8cbc_52bf9629b428 = function(){
			return window.location.href;
		} 
		macro_31dad1ae_f686_5581_8cbc_52bf9629b428 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '31dad1ae_f686_5581_8cbc_52bf9629b428', reportValue: false});
		macro_31dad1ae_f686_5581_8cbc_52bf9629b428.setValue(macro_function_31dad1ae_f686_5581_8cbc_52bf9629b428);
		macro_function_bbb678d9_1ed6_519b_9082_01f783936741 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('290') == true){
				var re = new RegExp('(?:[?&])(cli_promo_id=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['290'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['290'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_bbb678d9_1ed6_519b_9082_01f783936741 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'bbb678d9_1ed6_519b_9082_01f783936741', reportValue: false});
		macro_bbb678d9_1ed6_519b_9082_01f783936741.setValue(macro_function_bbb678d9_1ed6_519b_9082_01f783936741);
		macro_function_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1 = function(){
			return 'true';
		} 
		macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1', reportValue: false});
		macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1.setValue(macro_function_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1);
		macro_function_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('222') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '1e93736a_bf77_56f8_9b3f_f8f8c50eeeff', reportValue: false});
		macro_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff.setValue(macro_function_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff);
		macro_function_ce6aec25_c9b5_5819_ba19_80c8973ee28b = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(v8=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_ce6aec25_c9b5_5819_ba19_80c8973ee28b = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'ce6aec25_c9b5_5819_ba19_80c8973ee28b', reportValue: false});
		macro_ce6aec25_c9b5_5819_ba19_80c8973ee28b.setValue(macro_function_ce6aec25_c9b5_5819_ba19_80c8973ee28b);
		macro_function_2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4', reportValue: false});
		macro_2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4.setValue(macro_function_2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4);
		macro_function_57f06e53_0463_557a_807e_69ac16bd279e = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('148') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_57f06e53_0463_557a_807e_69ac16bd279e = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '57f06e53_0463_557a_807e_69ac16bd279e', reportValue: false});
		macro_57f06e53_0463_557a_807e_69ac16bd279e.setValue(macro_function_57f06e53_0463_557a_807e_69ac16bd279e);
		macro_function_7e624e76_2544_5cb6_bef0_6f5f41d3537c = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(pageName=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_7e624e76_2544_5cb6_bef0_6f5f41d3537c = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '7e624e76_2544_5cb6_bef0_6f5f41d3537c', reportValue: false});
		macro_7e624e76_2544_5cb6_bef0_6f5f41d3537c.setValue(macro_function_7e624e76_2544_5cb6_bef0_6f5f41d3537c);
		macro_function_911150d3_4827_5c97_acca_7853c60c918c = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(events=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_911150d3_4827_5c97_acca_7853c60c918c = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '911150d3_4827_5c97_acca_7853c60c918c', reportValue: false});
		macro_911150d3_4827_5c97_acca_7853c60c918c.setValue(macro_function_911150d3_4827_5c97_acca_7853c60c918c);
		macro_function_d314e9ef_cba8_586b_b7f3_e69df28fe10a = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(v7=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_d314e9ef_cba8_586b_b7f3_e69df28fe10a = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'd314e9ef_cba8_586b_b7f3_e69df28fe10a', reportValue: false});
		macro_d314e9ef_cba8_586b_b7f3_e69df28fe10a.setValue(macro_function_d314e9ef_cba8_586b_b7f3_e69df28fe10a);
		macro_function_14c1100e_139a_52fa_a679_d3a8dec3e4bd = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(ch=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_14c1100e_139a_52fa_a679_d3a8dec3e4bd = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '14c1100e_139a_52fa_a679_d3a8dec3e4bd', reportValue: false});
		macro_14c1100e_139a_52fa_a679_d3a8dec3e4bd.setValue(macro_function_14c1100e_139a_52fa_a679_d3a8dec3e4bd);
		macro_function_26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(v10=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0', reportValue: false});
		macro_26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0.setValue(macro_function_26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0);
		macro_function_38d8145a_d22e_5f89_862d_7f3d43c82117 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('291') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_38d8145a_d22e_5f89_862d_7f3d43c82117 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '38d8145a_d22e_5f89_862d_7f3d43c82117', reportValue: false});
		macro_38d8145a_d22e_5f89_862d_7f3d43c82117.setValue(macro_function_38d8145a_d22e_5f89_862d_7f3d43c82117);
		macro_function_3e4b38be_ec96_57e4_bdbc_a511990fb592 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1440') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_3e4b38be_ec96_57e4_bdbc_a511990fb592 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '3e4b38be_ec96_57e4_bdbc_a511990fb592', reportValue: false});
		macro_3e4b38be_ec96_57e4_bdbc_a511990fb592.setValue(macro_function_3e4b38be_ec96_57e4_bdbc_a511990fb592);
		macro_function_f254b556_32b0_58c3_aac5_3f64b0e3610f = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('291') == true){
				var re = new RegExp('(.*)1066244916(.*)', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['291'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['291'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_f254b556_32b0_58c3_aac5_3f64b0e3610f = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'f254b556_32b0_58c3_aac5_3f64b0e3610f', reportValue: false});
		macro_f254b556_32b0_58c3_aac5_3f64b0e3610f.setValue(macro_function_f254b556_32b0_58c3_aac5_3f64b0e3610f);
		macro_function_ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75 = function(){
			retVal = '';
			function censor(n) {var o = 0;return function(r, t) {if (0 !== o && "object" == typeof n && "object" == typeof t && n == t) {return "[Circular]"}else if (o >= 500) {return "[Unknown]"}else {return (++o, t)}}};

			try{
				if(typeof Analytics.traffic === 'object'){ 
					retVal = JSON.stringify(Analytics.traffic, censor(Analytics.traffic));
				}else if(typeof Analytics.traffic !== 'undefined'){
					retVal = Analytics.traffic;
				}
			} catch(err) {
				console.log(err.message);
			}
	
			return retVal;
		} 
		macro_ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75', reportValue: true});
		macro_ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75.setValue(macro_function_ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75);
		macro_function_d75dea64_f2b7_5453_b841_2aafbf37c13f = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1420') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_d75dea64_f2b7_5453_b841_2aafbf37c13f = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'd75dea64_f2b7_5453_b841_2aafbf37c13f', reportValue: false});
		macro_d75dea64_f2b7_5453_b841_2aafbf37c13f.setValue(macro_function_d75dea64_f2b7_5453_b841_2aafbf37c13f);
		macro_function_22dc7922_97c9_5d53_99a1_7cab6cf97b25 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '22dc7922_97c9_5d53_99a1_7cab6cf97b25', reportValue: false});
		macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25.setValue(macro_function_22dc7922_97c9_5d53_99a1_7cab6cf97b25);
		macro_function_07e3cc2b_b304_5e87_93de_5d7ee35590bb = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1427') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_07e3cc2b_b304_5e87_93de_5d7ee35590bb = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '07e3cc2b_b304_5e87_93de_5d7ee35590bb', reportValue: false});
		macro_07e3cc2b_b304_5e87_93de_5d7ee35590bb.setValue(macro_function_07e3cc2b_b304_5e87_93de_5d7ee35590bb);
		macro_function_1a0c98f6_ce30_5167_ab79_0fcca9cb02db = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('295') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_1a0c98f6_ce30_5167_ab79_0fcca9cb02db = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '1a0c98f6_ce30_5167_ab79_0fcca9cb02db', reportValue: false});
		macro_1a0c98f6_ce30_5167_ab79_0fcca9cb02db.setValue(macro_function_1a0c98f6_ce30_5167_ab79_0fcca9cb02db);
		macro_function_e7fce27f_8d1d_57e7_8989_a74305149102 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('345') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_e7fce27f_8d1d_57e7_8989_a74305149102 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'e7fce27f_8d1d_57e7_8989_a74305149102', reportValue: false});
		macro_e7fce27f_8d1d_57e7_8989_a74305149102.setValue(macro_function_e7fce27f_8d1d_57e7_8989_a74305149102);
		macro_function_161cfac5_10df_5690_94bf_df042a357f39 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('295') == true){
				var re = new RegExp('(?:[?&])(ppid=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['295'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['295'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_161cfac5_10df_5690_94bf_df042a357f39 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '161cfac5_10df_5690_94bf_df042a357f39', reportValue: false});
		macro_161cfac5_10df_5690_94bf_df042a357f39.setValue(macro_function_161cfac5_10df_5690_94bf_df042a357f39);
		macro_function_1180915c_ee54_5a07_8195_d2b5b3c2474d = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('565') == true){
				var re = new RegExp('(.*)211586(.*)', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['565'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['565'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_1180915c_ee54_5a07_8195_d2b5b3c2474d = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '1180915c_ee54_5a07_8195_d2b5b3c2474d', reportValue: false});
		macro_1180915c_ee54_5a07_8195_d2b5b3c2474d.setValue(macro_function_1180915c_ee54_5a07_8195_d2b5b3c2474d);
		macro_function_eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1406') == true){
				var re = new RegExp('(.*)2034557960096892(.*)', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['1406'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['1406'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c', reportValue: false});
		macro_eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c.setValue(macro_function_eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c);
		macro_function_749f8af4_241f_5b0c_a424_f8aec446ed1a = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('758') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_749f8af4_241f_5b0c_a424_f8aec446ed1a = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '749f8af4_241f_5b0c_a424_f8aec446ed1a', reportValue: false});
		macro_749f8af4_241f_5b0c_a424_f8aec446ed1a.setValue(macro_function_749f8af4_241f_5b0c_a424_f8aec446ed1a);
		macro_function_53044c43_e857_5615_9c90_d592c9be1331 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('295') == true){
				var re = new RegExp('(?:[?&])(prev_scp=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['295'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['295'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_53044c43_e857_5615_9c90_d592c9be1331 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '53044c43_e857_5615_9c90_d592c9be1331', reportValue: false});
		macro_53044c43_e857_5615_9c90_d592c9be1331.setValue(macro_function_53044c43_e857_5615_9c90_d592c9be1331);
		macro_function_8a0616f4_11e4_5a6b_a685_34e657e25e89 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('914') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_8a0616f4_11e4_5a6b_a685_34e657e25e89 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '8a0616f4_11e4_5a6b_a685_34e657e25e89', reportValue: false});
		macro_8a0616f4_11e4_5a6b_a685_34e657e25e89.setValue(macro_function_8a0616f4_11e4_5a6b_a685_34e657e25e89);
		macro_function_699a717d_7a6c_5525_ab62_93ce30328c7e = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1426') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_699a717d_7a6c_5525_ab62_93ce30328c7e = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '699a717d_7a6c_5525_ab62_93ce30328c7e', reportValue: false});
		macro_699a717d_7a6c_5525_ab62_93ce30328c7e.setValue(macro_function_699a717d_7a6c_5525_ab62_93ce30328c7e);
		macro_function_d33d9355_bfa1_5e69_8310_eebf6db29d85 = function(){
			returnVal = 'true';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('547') == true){
				var maxLatency = 5000;
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['547'].length; i++) {
					tagDuration = tiMonitor.dataCollector.identifiedRequests['547'][i].duration;
					if (tagDuration > maxLatency) {
						returnVal = 'false';
						break;
					}
				}
			}
			return returnVal;
		} 
		macro_d33d9355_bfa1_5e69_8310_eebf6db29d85 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'd33d9355_bfa1_5e69_8310_eebf6db29d85', reportValue: false});
		macro_d33d9355_bfa1_5e69_8310_eebf6db29d85.setValue(macro_function_d33d9355_bfa1_5e69_8310_eebf6db29d85);
		macro_function_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1406') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'fb6d08aa_1c14_53ac_b4f8_880ae3e48feb', reportValue: false});
		macro_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb.setValue(macro_function_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb);
		macro_function_814e0bc4_d9be_5eaf_994e_c7267909ba91 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('255') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_814e0bc4_d9be_5eaf_994e_c7267909ba91 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '814e0bc4_d9be_5eaf_994e_c7267909ba91', reportValue: false});
		macro_814e0bc4_d9be_5eaf_994e_c7267909ba91.setValue(macro_function_814e0bc4_d9be_5eaf_994e_c7267909ba91);
		macro_function_9fbafdbb_9bec_548b_a089_016742674450 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('294') == true){
				var re = new RegExp('cat=trans236', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['294'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['294'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_9fbafdbb_9bec_548b_a089_016742674450 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '9fbafdbb_9bec_548b_a089_016742674450', reportValue: false});
		macro_9fbafdbb_9bec_548b_a089_016742674450.setValue(macro_function_9fbafdbb_9bec_548b_a089_016742674450);
		macro_function_aa8a44c8_c134_5a4a_a6e5_3c042004c207 = function(){
			retVal = '';
			function censor(n) {var o = 0;return function(r, t) {if (0 !== o && "object" == typeof n && "object" == typeof t && n == t) {return "[Circular]"}else if (o >= 500) {return "[Unknown]"}else {return (++o, t)}}};

			try{
				if(typeof navigator.userAgent === 'object'){ 
					retVal = JSON.stringify(navigator.userAgent, censor(navigator.userAgent));
				}else if(typeof navigator.userAgent !== 'undefined'){
					retVal = navigator.userAgent;
				}
			} catch(err) {
				console.log(err.message);
			}
	
			return retVal;
		} 
		macro_aa8a44c8_c134_5a4a_a6e5_3c042004c207 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'aa8a44c8_c134_5a4a_a6e5_3c042004c207', reportValue: true});
		macro_aa8a44c8_c134_5a4a_a6e5_3c042004c207.setValue(macro_function_aa8a44c8_c134_5a4a_a6e5_3c042004c207);
		macro_function_3ab1c78e_0234_5ef9_bca7_799abedc489a = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1442') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_3ab1c78e_0234_5ef9_bca7_799abedc489a = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '3ab1c78e_0234_5ef9_bca7_799abedc489a', reportValue: false});
		macro_3ab1c78e_0234_5ef9_bca7_799abedc489a.setValue(macro_function_3ab1c78e_0234_5ef9_bca7_799abedc489a);
		macro_function_8e12dff8_b085_5e2d_9c9b_eaf07e0d548d = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('562') == true){
				var re = new RegExp("(?:[?&])(pcv=38)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['562'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['562'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_8e12dff8_b085_5e2d_9c9b_eaf07e0d548d = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '8e12dff8_b085_5e2d_9c9b_eaf07e0d548d', reportValue: false});
		macro_8e12dff8_b085_5e2d_9c9b_eaf07e0d548d.setValue(macro_function_8e12dff8_b085_5e2d_9c9b_eaf07e0d548d);
		macro_function_8465975a_a44a_5339_9ffc_908f18fb2154 = function(){
			retVal = '';
			function censor(n) {var o = 0;return function(r, t) {if (0 !== o && "object" == typeof n && "object" == typeof t && n == t) {return "[Circular]"}else if (o >= 500) {return "[Unknown]"}else {return (++o, t)}}};

			try{
				if(typeof window.Analytics.tracking.orderconfirm.purchaseid === 'object'){ 
					retVal = JSON.stringify(window.Analytics.tracking.orderconfirm.purchaseid, censor(window.Analytics.tracking.orderconfirm.purchaseid));
				}else if(typeof window.Analytics.tracking.orderconfirm.purchaseid !== 'undefined'){
					retVal = window.Analytics.tracking.orderconfirm.purchaseid;
				}
			} catch(err) {
				console.log(err.message);
			}
	
			return retVal;
		} 
		macro_8465975a_a44a_5339_9ffc_908f18fb2154 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '8465975a_a44a_5339_9ffc_908f18fb2154', reportValue: true});
		macro_8465975a_a44a_5339_9ffc_908f18fb2154.setValue(macro_function_8465975a_a44a_5339_9ffc_908f18fb2154);
		macro_function_1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('384') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f', reportValue: false});
		macro_1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f.setValue(macro_function_1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f);
		macro_function_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('650') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1', reportValue: false});
		macro_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1.setValue(macro_function_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1);
		macro_function_2d728795_94c2_5f17_90b5_0b59de6404aa = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('562') == true){
				var re = new RegExp("(?:[?&])(pcv=50)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['562'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['562'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_2d728795_94c2_5f17_90b5_0b59de6404aa = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '2d728795_94c2_5f17_90b5_0b59de6404aa', reportValue: false});
		macro_2d728795_94c2_5f17_90b5_0b59de6404aa.setValue(macro_function_2d728795_94c2_5f17_90b5_0b59de6404aa);
		macro_function_e136b632_55a6_5e70_a8c4_051801314076 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('294') == true){
				var re = new RegExp('cat=stapl887', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['294'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['294'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_e136b632_55a6_5e70_a8c4_051801314076 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'e136b632_55a6_5e70_a8c4_051801314076', reportValue: false});
		macro_e136b632_55a6_5e70_a8c4_051801314076.setValue(macro_function_e136b632_55a6_5e70_a8c4_051801314076);
		macro_function_34040ef6_c0c8_5574_97f3_00e35d15fed3 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('295') == true){
				var re = new RegExp('\/^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$\/', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['295'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['295'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_34040ef6_c0c8_5574_97f3_00e35d15fed3 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '34040ef6_c0c8_5574_97f3_00e35d15fed3', reportValue: false});
		macro_34040ef6_c0c8_5574_97f3_00e35d15fed3.setValue(macro_function_34040ef6_c0c8_5574_97f3_00e35d15fed3);
		macro_function_cd7a9c99_5ff3_5bb4_97f1_b4867894bf76 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('294') == true){
				var re = new RegExp('\/^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$\/', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['294'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['294'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_cd7a9c99_5ff3_5bb4_97f1_b4867894bf76 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'cd7a9c99_5ff3_5bb4_97f1_b4867894bf76', reportValue: false});
		macro_cd7a9c99_5ff3_5bb4_97f1_b4867894bf76.setValue(macro_function_cd7a9c99_5ff3_5bb4_97f1_b4867894bf76);
		macro_function_842d7724_32a2_52e7_a825_bea7ccdf3535 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('93') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_842d7724_32a2_52e7_a825_bea7ccdf3535 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '842d7724_32a2_52e7_a825_bea7ccdf3535', reportValue: false});
		macro_842d7724_32a2_52e7_a825_bea7ccdf3535.setValue(macro_function_842d7724_32a2_52e7_a825_bea7ccdf3535);
		macro_function_726203f9_2636_563d_b693_b5ab0edb4f54 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('562') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_726203f9_2636_563d_b693_b5ab0edb4f54 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '726203f9_2636_563d_b693_b5ab0edb4f54', reportValue: false});
		macro_726203f9_2636_563d_b693_b5ab0edb4f54.setValue(macro_function_726203f9_2636_563d_b693_b5ab0edb4f54);
		macro_function_82b3217a_b52d_557c_9add_a27ffc12468b = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('547') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_82b3217a_b52d_557c_9add_a27ffc12468b = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '82b3217a_b52d_557c_9add_a27ffc12468b', reportValue: false});
		macro_82b3217a_b52d_557c_9add_a27ffc12468b.setValue(macro_function_82b3217a_b52d_557c_9add_a27ffc12468b);
		macro_function_44aedb0e_5c81_5c6c_9654_516a200b44e3 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('(?:[?&])(ns=([^&]{1,}))', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_44aedb0e_5c81_5c6c_9654_516a200b44e3 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '44aedb0e_5c81_5c6c_9654_516a200b44e3', reportValue: false});
		macro_44aedb0e_5c81_5c6c_9654_516a200b44e3.setValue(macro_function_44aedb0e_5c81_5c6c_9654_516a200b44e3);
		macro_function_bd7ceebc_c03a_5f16_8025_636dbfe03bee = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp("(?:[?&])(ns=staples)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_bd7ceebc_c03a_5f16_8025_636dbfe03bee = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'bd7ceebc_c03a_5f16_8025_636dbfe03bee', reportValue: false});
		macro_bd7ceebc_c03a_5f16_8025_636dbfe03bee.setValue(macro_function_bd7ceebc_c03a_5f16_8025_636dbfe03bee);
		macro_function_76afd919_bbcf_50b1_9241_1038153b3b9d = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('290') == true){
				var re = new RegExp("(?:[?&])(cli\\_promo\\_id=100)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['290'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['290'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_76afd919_bbcf_50b1_9241_1038153b3b9d = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '76afd919_bbcf_50b1_9241_1038153b3b9d', reportValue: false});
		macro_76afd919_bbcf_50b1_9241_1038153b3b9d.setValue(macro_function_76afd919_bbcf_50b1_9241_1038153b3b9d);
		macro_function_be83a569_762c_52a1_8370_be9f69421de9 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('422') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_be83a569_762c_52a1_8370_be9f69421de9 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'be83a569_762c_52a1_8370_be9f69421de9', reportValue: false});
		macro_be83a569_762c_52a1_8370_be9f69421de9.setValue(macro_function_be83a569_762c_52a1_8370_be9f69421de9);
		macro_function_c6c82976_a2f6_55da_a54b_c8c86875851e = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('222') == true){
				var re = new RegExp('OID', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['222'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['222'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_c6c82976_a2f6_55da_a54b_c8c86875851e = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'c6c82976_a2f6_55da_a54b_c8c86875851e', reportValue: false});
		macro_c6c82976_a2f6_55da_a54b_c8c86875851e.setValue(macro_function_c6c82976_a2f6_55da_a54b_c8c86875851e);
		macro_function_6ae91319_c025_5946_a42a_7e1ee38add9e = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1436') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_6ae91319_c025_5946_a42a_7e1ee38add9e = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '6ae91319_c025_5946_a42a_7e1ee38add9e', reportValue: false});
		macro_6ae91319_c025_5946_a42a_7e1ee38add9e.setValue(macro_function_6ae91319_c025_5946_a42a_7e1ee38add9e);
		macro_function_13cecf75_37e6_5cdf_b51f_0aa85222b36f = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('562') == true){
				var re = new RegExp("(?:[?&])(nc=StaplesHomepage)(&|$)", 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['562'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['562'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_13cecf75_37e6_5cdf_b51f_0aa85222b36f = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '13cecf75_37e6_5cdf_b51f_0aa85222b36f', reportValue: false});
		macro_13cecf75_37e6_5cdf_b51f_0aa85222b36f.setValue(macro_function_13cecf75_37e6_5cdf_b51f_0aa85222b36f);
		macro_function_55dc277b_6baa_5c73_850f_1fc27fe4dcd1 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('294') == true){
				var re = new RegExp('cat=order', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['294'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['294'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_55dc277b_6baa_5c73_850f_1fc27fe4dcd1 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '55dc277b_6baa_5c73_850f_1fc27fe4dcd1', reportValue: false});
		macro_55dc277b_6baa_5c73_850f_1fc27fe4dcd1.setValue(macro_function_55dc277b_6baa_5c73_850f_1fc27fe4dcd1);
		macro_function_7744c37e_3419_5c9b_b512_743c3e29e66b = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('56') == true){
				var re = new RegExp('staplescomprod', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['56'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['56'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_7744c37e_3419_5c9b_b512_743c3e29e66b = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '7744c37e_3419_5c9b_b512_743c3e29e66b', reportValue: false});
		macro_7744c37e_3419_5c9b_b512_743c3e29e66b.setValue(macro_function_7744c37e_3419_5c9b_b512_743c3e29e66b);
		macro_function_8dce5b46_8de6_5b67_8c1e_b9b08da596cb = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('149') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_8dce5b46_8de6_5b67_8c1e_b9b08da596cb = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '8dce5b46_8de6_5b67_8c1e_b9b08da596cb', reportValue: false});
		macro_8dce5b46_8de6_5b67_8c1e_b9b08da596cb.setValue(macro_function_8dce5b46_8de6_5b67_8c1e_b9b08da596cb);
		macro_function_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1363') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: '897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88', reportValue: false});
		macro_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88.setValue(macro_function_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88);
		macro_function_e7b9dc7b_fd41_563c_8560_9ad401294953 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('1405') == true){
				returnVal = 'true';
			}
			return returnVal;
		} 
		macro_e7b9dc7b_fd41_563c_8560_9ad401294953 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'e7b9dc7b_fd41_563c_8560_9ad401294953', reportValue: false});
		macro_e7b9dc7b_fd41_563c_8560_9ad401294953.setValue(macro_function_e7b9dc7b_fd41_563c_8560_9ad401294953);
		macro_function_e87dd923_fc34_5ed2_b4b2_56e501e6d707 = function(){
			returnVal = 'false';
			if(tiMonitor.dataCollector.identifiedRequests.hasOwnProperty('562') == true){
				var re = new RegExp('(.*)pcv=55(.*)', 'i');
				for (var i = 0; i < tiMonitor.dataCollector.identifiedRequests['562'].length; i++) {
					tagReq = tiMonitor.dataCollector.identifiedRequests['562'][i].name;
					if (re.test(tagReq) || re.test(decodeURIComponent(tagReq))) {
						returnVal = 'true';
					}
				}
			}
			return returnVal;
		} 
		macro_e87dd923_fc34_5ed2_b4b2_56e501e6d707 = new taginspector.datapulse.pagevariable.JsExpression({uniqueId: 'e87dd923_fc34_5ed2_b4b2_56e501e6d707', reportValue: false});
		macro_e87dd923_fc34_5ed2_b4b2_56e501e6d707.setValue(macro_function_e87dd923_fc34_5ed2_b4b2_56e501e6d707);
		

condition_f37c901e_58f6_42b9_bc12_df9d3dc26b78 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_3c65bbb4_c5e3_5df1_b4f8_fbcb9cbcc6b2, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f37c901e_58f6_42b9_bc12_df9d3dc26b78'});

rule_879 = new taginspector.datapulse.BaseRule({uniqueId: '879', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_879.addFilter(condition_f37c901e_58f6_42b9_bc12_df9d3dc26b78);

condition_aa83b0af_5704_482a_b0cb_f01ca9cb6b2b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_bbb678d9_1ed6_519b_9082_01f783936741, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'aa83b0af_5704_482a_b0cb_f01ca9cb6b2b'});

rule_724 = new taginspector.datapulse.BaseRule({uniqueId: '724', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_724.addFilter(condition_aa83b0af_5704_482a_b0cb_f01ca9cb6b2b);

condition_c8a6e841_3f48_4f3d_b695_173f938795d1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'c8a6e841_3f48_4f3d_b695_173f938795d1'});

rule_1206 = new taginspector.datapulse.BaseRule({uniqueId: '1206', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1206.addFilter(condition_c8a6e841_3f48_4f3d_b695_173f938795d1);

condition_55d809bb_2b86_4b67_a815_113785334316 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_ce6aec25_c9b5_5819_ba19_80c8973ee28b, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '55d809bb_2b86_4b67_a815_113785334316'});

condition_88f352f2_d6ef_43d4_a96e_2bf3c9048e72 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_2b54fb07_8320_5b5b_a3fc_bfcb7a9de4e4, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '88f352f2_d6ef_43d4_a96e_2bf3c9048e72'});

rule_1082 = new taginspector.datapulse.BaseRule({uniqueId: '1082', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1082.addFilter(condition_55d809bb_2b86_4b67_a815_113785334316);
rule_1082.addFilter(condition_88f352f2_d6ef_43d4_a96e_2bf3c9048e72);

condition_e49bf823_1ede_45a5_b7e1_4b48a1d99096 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_57f06e53_0463_557a_807e_69ac16bd279e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e49bf823_1ede_45a5_b7e1_4b48a1d99096'});

rule_1160 = new taginspector.datapulse.BaseRule({uniqueId: '1160', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1160.addFilter(condition_e49bf823_1ede_45a5_b7e1_4b48a1d99096);

condition_f305db9f_a5f4_476f_bb5a_6670a33d5d7a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_ce6aec25_c9b5_5819_ba19_80c8973ee28b, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f305db9f_a5f4_476f_bb5a_6670a33d5d7a'});

condition_12f87ceb_43c9_4c26_8ff1_1816161fb9cf = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_7e624e76_2544_5cb6_bef0_6f5f41d3537c, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '12f87ceb_43c9_4c26_8ff1_1816161fb9cf'});

condition_4d5bfde3_e4bf_40ee_a7f0_59ecbeac48d9 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_911150d3_4827_5c97_acca_7853c60c918c, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4d5bfde3_e4bf_40ee_a7f0_59ecbeac48d9'});

condition_0794a791_7ec4_4432_a1e8_7ed5de91ec54 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_d314e9ef_cba8_586b_b7f3_e69df28fe10a, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '0794a791_7ec4_4432_a1e8_7ed5de91ec54'});

condition_b24bc405_f64f_4cc8_ab28_9f0ffe5cca0e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_14c1100e_139a_52fa_a679_d3a8dec3e4bd, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'b24bc405_f64f_4cc8_ab28_9f0ffe5cca0e'});

condition_0df99051_777d_4465_9396_cf403e91778a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_26a8bd1c_e50d_5fc3_bf18_2f1d271fabf0, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '0df99051_777d_4465_9396_cf403e91778a'});

rule_1051 = new taginspector.datapulse.BaseRule({uniqueId: '1051', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1051.addFilter(condition_f305db9f_a5f4_476f_bb5a_6670a33d5d7a);
rule_1051.addFilter(condition_12f87ceb_43c9_4c26_8ff1_1816161fb9cf);
rule_1051.addFilter(condition_4d5bfde3_e4bf_40ee_a7f0_59ecbeac48d9);
rule_1051.addFilter(condition_0794a791_7ec4_4432_a1e8_7ed5de91ec54);
rule_1051.addFilter(condition_b24bc405_f64f_4cc8_ab28_9f0ffe5cca0e);
rule_1051.addFilter(condition_0df99051_777d_4465_9396_cf403e91778a);

condition_e6a1226c_9bed_4e53_a168_3d2f1bc9e143 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_38d8145a_d22e_5f89_862d_7f3d43c82117, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e6a1226c_9bed_4e53_a168_3d2f1bc9e143'});

rule_1548 = new taginspector.datapulse.BaseRule({uniqueId: '1548', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1548.addFilter(condition_e6a1226c_9bed_4e53_a168_3d2f1bc9e143);

condition_4b513972_012a_4b21_a93a_bd0cb9b0025c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_3e4b38be_ec96_57e4_bdbc_a511990fb592, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4b513972_012a_4b21_a93a_bd0cb9b0025c'});

rule_1132 = new taginspector.datapulse.BaseRule({uniqueId: '1132', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1132.addFilter(condition_4b513972_012a_4b21_a93a_bd0cb9b0025c);

condition_7ed22921_b2da_4e92_aec0_174e7b370f0f = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_f254b556_32b0_58c3_aac5_3f64b0e3610f, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '7ed22921_b2da_4e92_aec0_174e7b370f0f'});

rule_664 = new taginspector.datapulse.BaseRule({uniqueId: '664', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_664.addFilter(condition_7ed22921_b2da_4e92_aec0_174e7b370f0f);

condition_226b0f13_9fd1_4333_acc4_2bea05bcb200 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1e93736a_bf77_56f8_9b3f_f8f8c50eeeff, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '226b0f13_9fd1_4333_acc4_2bea05bcb200'});

rule_895 = new taginspector.datapulse.BaseRule({uniqueId: '895', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_895.addFilter(condition_226b0f13_9fd1_4333_acc4_2bea05bcb200);

condition_a7c2d7d5_1e79_4d8e_9353_eb4f4f159eb1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_ee2d2e83_04bb_5cb8_ae1f_b92bd5a3ab75, comparisonVariable: 'pagename', comparisonType: 'Contains', uniqueId: 'a7c2d7d5_1e79_4d8e_9353_eb4f4f159eb1'});

condition_daffa608_c202_4c0f_ac9e_15a3eafb9e66 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'html', comparisonType: 'Does not End With', uniqueId: 'daffa608_c202_4c0f_ac9e_15a3eafb9e66'});

rule_949 = new taginspector.datapulse.BaseRule({uniqueId: '949', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_949.addFilter(condition_a7c2d7d5_1e79_4d8e_9353_eb4f4f159eb1);
rule_949.addFilter(condition_daffa608_c202_4c0f_ac9e_15a3eafb9e66);

condition_d0ae13e6_4fea_44f3_a38d_c88e80a7c48a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_d75dea64_f2b7_5453_b841_2aafbf37c13f, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'd0ae13e6_4fea_44f3_a38d_c88e80a7c48a'});

rule_1533 = new taginspector.datapulse.BaseRule({uniqueId: '1533', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1533.addFilter(condition_d0ae13e6_4fea_44f3_a38d_c88e80a7c48a);

condition_255f7e02_4ec4_436a_acc5_f383954a6635 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '\/^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$\/', comparisonType: 'Does not Match Regex', uniqueId: '255f7e02_4ec4_436a_acc5_f383954a6635'});

rule_803 = new taginspector.datapulse.BaseRule({uniqueId: '803', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_803.addFilter(condition_255f7e02_4ec4_436a_acc5_f383954a6635);

condition_795b73a2_ed31_43ad_8958_bcd49ebc7087 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_22dc7922_97c9_5d53_99a1_7cab6cf97b25, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '795b73a2_ed31_43ad_8958_bcd49ebc7087'});

rule_1706 = new taginspector.datapulse.BaseRule({uniqueId: '1706', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1706.addFilter(condition_795b73a2_ed31_43ad_8958_bcd49ebc7087);

condition_cb4f6ebb_1170_4000_8852_31743ec86d68 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_07e3cc2b_b304_5e87_93de_5d7ee35590bb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'cb4f6ebb_1170_4000_8852_31743ec86d68'});

rule_869 = new taginspector.datapulse.BaseRule({uniqueId: '869', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_869.addFilter(condition_cb4f6ebb_1170_4000_8852_31743ec86d68);

condition_f898c3a0_aebf_43a3_8ea5_9a3830226a7e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1a0c98f6_ce30_5167_ab79_0fcca9cb02db, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f898c3a0_aebf_43a3_8ea5_9a3830226a7e'});

rule_867 = new taginspector.datapulse.BaseRule({uniqueId: '867', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_867.addFilter(condition_f898c3a0_aebf_43a3_8ea5_9a3830226a7e);

condition_50c86e43_f4e5_47fc_8a13_6dee9237dfe1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_e7fce27f_8d1d_57e7_8989_a74305149102, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '50c86e43_f4e5_47fc_8a13_6dee9237dfe1'});

rule_945 = new taginspector.datapulse.BaseRule({uniqueId: '945', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_945.addFilter(condition_50c86e43_f4e5_47fc_8a13_6dee9237dfe1);

condition_9dfc5e9f_e0c0_47b7_a66b_3b9c5ab78b90 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_161cfac5_10df_5690_94bf_df042a357f39, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '9dfc5e9f_e0c0_47b7_a66b_3b9c5ab78b90'});

rule_1410 = new taginspector.datapulse.BaseRule({uniqueId: '1410', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1410.addFilter(condition_9dfc5e9f_e0c0_47b7_a66b_3b9c5ab78b90);

condition_d6310c0e_49df_4b39_9a7a_9c613b273842 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1180915c_ee54_5a07_8195_d2b5b3c2474d, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'd6310c0e_49df_4b39_9a7a_9c613b273842'});

rule_2085 = new taginspector.datapulse.BaseRule({uniqueId: '2085', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2085.addFilter(condition_d6310c0e_49df_4b39_9a7a_9c613b273842);

condition_45a17ecd_cf74_4e84_8a59_8e18671ce1d4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_eedc0bea_29ff_562e_8a9e_2e4c7bb97e7c, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '45a17ecd_cf74_4e84_8a59_8e18671ce1d4'});

rule_2096 = new taginspector.datapulse.BaseRule({uniqueId: '2096', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2096.addFilter(condition_45a17ecd_cf74_4e84_8a59_8e18671ce1d4);

condition_e699394a_2aa0_43c3_aabf_0eb527f92af1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_749f8af4_241f_5b0c_a424_f8aec446ed1a, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e699394a_2aa0_43c3_aabf_0eb527f92af1'});

rule_768 = new taginspector.datapulse.BaseRule({uniqueId: '768', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_768.addFilter(condition_e699394a_2aa0_43c3_aabf_0eb527f92af1);

condition_be32e999_a5db_40f0_a68e_f16b3f961c7f = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_d75dea64_f2b7_5453_b841_2aafbf37c13f, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'be32e999_a5db_40f0_a68e_f16b3f961c7f'});

rule_866 = new taginspector.datapulse.BaseRule({uniqueId: '866', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_866.addFilter(condition_be32e999_a5db_40f0_a68e_f16b3f961c7f);

condition_9d4127bf_bf0e_40da_91f7_bc6e7b1b54e9 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_53044c43_e857_5615_9c90_d592c9be1331, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '9d4127bf_bf0e_40da_91f7_bc6e7b1b54e9'});

rule_1409 = new taginspector.datapulse.BaseRule({uniqueId: '1409', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1409.addFilter(condition_9d4127bf_bf0e_40da_91f7_bc6e7b1b54e9);

condition_5ffd0ed2_6120_40af_a854_9904dd56ddb2 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1180915c_ee54_5a07_8195_d2b5b3c2474d, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '5ffd0ed2_6120_40af_a854_9904dd56ddb2'});

rule_2086 = new taginspector.datapulse.BaseRule({uniqueId: '2086', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2086.addFilter(condition_5ffd0ed2_6120_40af_a854_9904dd56ddb2);

condition_c85ca0d8_0c2e_4cbb_bf95_a4f028bf071d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_8a0616f4_11e4_5a6b_a685_34e657e25e89, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'c85ca0d8_0c2e_4cbb_bf95_a4f028bf071d'});

rule_968 = new taginspector.datapulse.BaseRule({uniqueId: '968', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_968.addFilter(condition_c85ca0d8_0c2e_4cbb_bf95_a4f028bf071d);

condition_43998edf_c317_4221_a1fe_5b0afb4b35d5 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_699a717d_7a6c_5525_ab62_93ce30328c7e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '43998edf_c317_4221_a1fe_5b0afb4b35d5'});

rule_1184 = new taginspector.datapulse.BaseRule({uniqueId: '1184', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1184.addFilter(condition_43998edf_c317_4221_a1fe_5b0afb4b35d5);

condition_4441f3e3_0567_4dfb_969f_5892ff60ec8e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_d33d9355_bfa1_5e69_8310_eebf6db29d85, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4441f3e3_0567_4dfb_969f_5892ff60ec8e'});

rule_1230 = new taginspector.datapulse.BaseRule({uniqueId: '1230', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1230.addFilter(condition_4441f3e3_0567_4dfb_969f_5892ff60ec8e);

condition_f904b62b_8682_4eae_891d_f44de8009d55 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_699a717d_7a6c_5525_ab62_93ce30328c7e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f904b62b_8682_4eae_891d_f44de8009d55'});

rule_728 = new taginspector.datapulse.BaseRule({uniqueId: '728', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_728.addFilter(condition_f904b62b_8682_4eae_891d_f44de8009d55);

condition_1e06e77f_785d_4139_95d6_9c530a0fd25e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '1e06e77f_785d_4139_95d6_9c530a0fd25e'});

rule_729 = new taginspector.datapulse.BaseRule({uniqueId: '729', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_729.addFilter(condition_1e06e77f_785d_4139_95d6_9c530a0fd25e);

condition_d1462b06_b916_4d60_8fea_a5400c8e3db4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_749f8af4_241f_5b0c_a424_f8aec446ed1a, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'd1462b06_b916_4d60_8fea_a5400c8e3db4'});

rule_764 = new taginspector.datapulse.BaseRule({uniqueId: '764', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_764.addFilter(condition_d1462b06_b916_4d60_8fea_a5400c8e3db4);

condition_c313c9b8_7c72_438c_8977_2627d864df73 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_814e0bc4_d9be_5eaf_994e_c7267909ba91, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'c313c9b8_7c72_438c_8977_2627d864df73'});

rule_2092 = new taginspector.datapulse.BaseRule({uniqueId: '2092', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2092.addFilter(condition_c313c9b8_7c72_438c_8977_2627d864df73);

condition_57c1f408_b370_4279_81f8_5d5517543a4e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_9fbafdbb_9bec_548b_a089_016742674450, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '57c1f408_b370_4279_81f8_5d5517543a4e'});

rule_1711 = new taginspector.datapulse.BaseRule({uniqueId: '1711', ruleVersion: 2, dataCollector: tiMonitor.dataCollector});
rule_1711.addFilter(condition_57c1f408_b370_4279_81f8_5d5517543a4e);

condition_8658bc4b_901d_4313_b19a_56188d98c70e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_57f06e53_0463_557a_807e_69ac16bd279e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '8658bc4b_901d_4313_b19a_56188d98c70e'});

rule_878 = new taginspector.datapulse.BaseRule({uniqueId: '878', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_878.addFilter(condition_8658bc4b_901d_4313_b19a_56188d98c70e);

condition_0052b18b_fd18_42b7_9f29_410a62a3b8b4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_3ab1c78e_0234_5ef9_bca7_799abedc489a, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '0052b18b_fd18_42b7_9f29_410a62a3b8b4'});

rule_1707 = new taginspector.datapulse.BaseRule({uniqueId: '1707', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1707.addFilter(condition_0052b18b_fd18_42b7_9f29_410a62a3b8b4);

condition_f33875b2_789f_4dd7_bfa5_6adf5555e406 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_814e0bc4_d9be_5eaf_994e_c7267909ba91, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'f33875b2_789f_4dd7_bfa5_6adf5555e406'});

rule_2093 = new taginspector.datapulse.BaseRule({uniqueId: '2093', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2093.addFilter(condition_f33875b2_789f_4dd7_bfa5_6adf5555e406);

condition_6da4d6ba_6eea_41cc_9287_47bd657076d4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_8e12dff8_b085_5e2d_9c9b_eaf07e0d548d, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '6da4d6ba_6eea_41cc_9287_47bd657076d4'});

rule_2099 = new taginspector.datapulse.BaseRule({uniqueId: '2099', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2099.addFilter(condition_6da4d6ba_6eea_41cc_9287_47bd657076d4);

condition_a003bf43_5691_4e65_a685_b8441461729c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_8465975a_a44a_5339_9ffc_908f18fb2154, comparisonVariable: '^(.*)[0-9]$', comparisonType: 'Matches Regex', uniqueId: 'a003bf43_5691_4e65_a685_b8441461729c'});

rule_1149 = new taginspector.datapulse.BaseRule({uniqueId: '1149', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1149.addFilter(condition_a003bf43_5691_4e65_a685_b8441461729c);

condition_80a6963c_8649_44f5_886c_8ee2cb24e528 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_1b0c2cbd_74a4_5e1e_b323_cd9f72150a3f, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '80a6963c_8649_44f5_886c_8ee2cb24e528'});

rule_1714 = new taginspector.datapulse.BaseRule({uniqueId: '1714', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1714.addFilter(condition_80a6963c_8649_44f5_886c_8ee2cb24e528);

condition_3b4794f6_e89c_4e1f_bb42_dbb339c1386e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_fb6d08aa_1c14_53ac_b4f8_880ae3e48feb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '3b4794f6_e89c_4e1f_bb42_dbb339c1386e'});

rule_880 = new taginspector.datapulse.BaseRule({uniqueId: '880', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_880.addFilter(condition_3b4794f6_e89c_4e1f_bb42_dbb339c1386e);

condition_e5aabe14_c3bf_4702_8e3b_50545573e688 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e5aabe14_c3bf_4702_8e3b_50545573e688'});

rule_763 = new taginspector.datapulse.BaseRule({uniqueId: '763', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_763.addFilter(condition_e5aabe14_c3bf_4702_8e3b_50545573e688);

condition_a4a7d111_a562_43ac_b7a7_488fc67996c6 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_2d728795_94c2_5f17_90b5_0b59de6404aa, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'a4a7d111_a562_43ac_b7a7_488fc67996c6'});

rule_2101 = new taginspector.datapulse.BaseRule({uniqueId: '2101', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2101.addFilter(condition_a4a7d111_a562_43ac_b7a7_488fc67996c6);

condition_63d30889_5c43_4124_b0f3_63cbe2d21dd8 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_e136b632_55a6_5e70_a8c4_051801314076, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '63d30889_5c43_4124_b0f3_63cbe2d21dd8'});

rule_1713 = new taginspector.datapulse.BaseRule({uniqueId: '1713', ruleVersion: 3, dataCollector: tiMonitor.dataCollector});
rule_1713.addFilter(condition_63d30889_5c43_4124_b0f3_63cbe2d21dd8);

condition_fd507a14_ea52_4df9_a6f1_b4381c21e19e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_34040ef6_c0c8_5574_97f3_00e35d15fed3, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'fd507a14_ea52_4df9_a6f1_b4381c21e19e'});

condition_68d450dd_b00d_4d3e_90b0_a68539d40c12 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_cd7a9c99_5ff3_5bb4_97f1_b4867894bf76, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '68d450dd_b00d_4d3e_90b0_a68539d40c12'});

rule_940 = new taginspector.datapulse.BaseRule({uniqueId: '940', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_940.addFilter(condition_fd507a14_ea52_4df9_a6f1_b4381c21e19e);
rule_940.addFilter(condition_68d450dd_b00d_4d3e_90b0_a68539d40c12);

condition_0bb0a0c2_b468_42d3_80b5_662a475db484 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_842d7724_32a2_52e7_a825_bea7ccdf3535, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '0bb0a0c2_b468_42d3_80b5_662a475db484'});

rule_3476 = new taginspector.datapulse.BaseRule({uniqueId: '3476', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_3476.addFilter(condition_0bb0a0c2_b468_42d3_80b5_662a475db484);

condition_baa4989a_3037_4c1c_a723_51675f2d28a4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_07e3cc2b_b304_5e87_93de_5d7ee35590bb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'baa4989a_3037_4c1c_a723_51675f2d28a4'});

rule_1161 = new taginspector.datapulse.BaseRule({uniqueId: '1161', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1161.addFilter(condition_baa4989a_3037_4c1c_a723_51675f2d28a4);

condition_5193a7b8_a090_4448_b414_846c17f87ffe = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_3c4a344f_a5f6_50e7_a6a1_7ae368ed96e1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '5193a7b8_a090_4448_b414_846c17f87ffe'});

rule_766 = new taginspector.datapulse.BaseRule({uniqueId: '766', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_766.addFilter(condition_5193a7b8_a090_4448_b414_846c17f87ffe);

condition_b1624c26_79f3_406e_ab40_d08d0f9fe4d4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_726203f9_2636_563d_b693_b5ab0edb4f54, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'b1624c26_79f3_406e_ab40_d08d0f9fe4d4'});

rule_727 = new taginspector.datapulse.BaseRule({uniqueId: '727', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_727.addFilter(condition_b1624c26_79f3_406e_ab40_d08d0f9fe4d4);

condition_ed6e85c8_3b2c_4ead_bc01_b58d5ab830f6 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_82b3217a_b52d_557c_9add_a27ffc12468b, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'ed6e85c8_3b2c_4ead_bc01_b58d5ab830f6'});

rule_1186 = new taginspector.datapulse.BaseRule({uniqueId: '1186', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1186.addFilter(condition_ed6e85c8_3b2c_4ead_bc01_b58d5ab830f6);

condition_4c3eaed4_1f3c_47d8_9e44_876be5219a94 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_14c1100e_139a_52fa_a679_d3a8dec3e4bd, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4c3eaed4_1f3c_47d8_9e44_876be5219a94'});

condition_4959b94e_915e_4611_a60c_ead29b7498a6 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_44aedb0e_5c81_5c6c_9654_516a200b44e3, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4959b94e_915e_4611_a60c_ead29b7498a6'});

rule_730 = new taginspector.datapulse.BaseRule({uniqueId: '730', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_730.addFilter(condition_4c3eaed4_1f3c_47d8_9e44_876be5219a94);
rule_730.addFilter(condition_4959b94e_915e_4611_a60c_ead29b7498a6);

condition_811c6c7d_a264_4010_baad_ef422e982738 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_bd7ceebc_c03a_5f16_8025_636dbfe03bee, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '811c6c7d_a264_4010_baad_ef422e982738'});

rule_663 = new taginspector.datapulse.BaseRule({uniqueId: '663', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_663.addFilter(condition_811c6c7d_a264_4010_baad_ef422e982738);

condition_ce659725_0946_4951_a3ca_a6b4e6033a2e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_76afd919_bbcf_50b1_9241_1038153b3b9d, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'ce659725_0946_4951_a3ca_a6b4e6033a2e'});

rule_741 = new taginspector.datapulse.BaseRule({uniqueId: '741', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_741.addFilter(condition_ce659725_0946_4951_a3ca_a6b4e6033a2e);

condition_6904b8f3_beb4_4da2_9af7_a80a451b8590 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_be83a569_762c_52a1_8370_be9f69421de9, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '6904b8f3_beb4_4da2_9af7_a80a451b8590'});

rule_1097 = new taginspector.datapulse.BaseRule({uniqueId: '1097', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1097.addFilter(condition_6904b8f3_beb4_4da2_9af7_a80a451b8590);

condition_7dccff73_7caf_4adb_ab1e_fa6a56d4bd66 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_c6c82976_a2f6_55da_a54b_c8c86875851e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '7dccff73_7caf_4adb_ab1e_fa6a56d4bd66'});

rule_1997 = new taginspector.datapulse.BaseRule({uniqueId: '1997', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1997.addFilter(condition_7dccff73_7caf_4adb_ab1e_fa6a56d4bd66);

condition_90d988a2_23f7_4cfa_aaa0_ed8bcde77530 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_6ae91319_c025_5946_a42a_7e1ee38add9e, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '90d988a2_23f7_4cfa_aaa0_ed8bcde77530'});

rule_2095 = new taginspector.datapulse.BaseRule({uniqueId: '2095', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2095.addFilter(condition_90d988a2_23f7_4cfa_aaa0_ed8bcde77530);

condition_23271b3b_f70d_4bf7_aed6_7e6a146c4a33 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_13cecf75_37e6_5cdf_b51f_0aa85222b36f, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '23271b3b_f70d_4bf7_aed6_7e6a146c4a33'});

rule_2102 = new taginspector.datapulse.BaseRule({uniqueId: '2102', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2102.addFilter(condition_23271b3b_f70d_4bf7_aed6_7e6a146c4a33);

condition_38dee05a_fab1_463c_801f_630ae6af95c6 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_55dc277b_6baa_5c73_850f_1fc27fe4dcd1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '38dee05a_fab1_463c_801f_630ae6af95c6'});

rule_1710 = new taginspector.datapulse.BaseRule({uniqueId: '1710', ruleVersion: 2, dataCollector: tiMonitor.dataCollector});
rule_1710.addFilter(condition_38dee05a_fab1_463c_801f_630ae6af95c6);

condition_ea49201c_184f_4b81_8e19_c4e4b2855ffd = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_7744c37e_3419_5c9b_b512_743c3e29e66b, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'ea49201c_184f_4b81_8e19_c4e4b2855ffd'});

rule_2295 = new taginspector.datapulse.BaseRule({uniqueId: '2295', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2295.addFilter(condition_ea49201c_184f_4b81_8e19_c4e4b2855ffd);

condition_1aae8a26_c9c1_47a4_a6c5_6fe5c22b167e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_8dce5b46_8de6_5b67_8c1e_b9b08da596cb, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '1aae8a26_c9c1_47a4_a6c5_6fe5c22b167e'});

rule_2505 = new taginspector.datapulse.BaseRule({uniqueId: '2505', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2505.addFilter(condition_1aae8a26_c9c1_47a4_a6c5_6fe5c22b167e);

condition_94db43cf_c0b8_452e_9542_247cbe29ee5d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '94db43cf_c0b8_452e_9542_247cbe29ee5d'});

rule_680 = new taginspector.datapulse.BaseRule({uniqueId: '680', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_680.addFilter(condition_94db43cf_c0b8_452e_9542_247cbe29ee5d);

condition_127f83b2_de92_4f87_aa9f_bd32f5bd8684 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_e7b9dc7b_fd41_563c_8560_9ad401294953, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '127f83b2_de92_4f87_aa9f_bd32f5bd8684'});

rule_877 = new taginspector.datapulse.BaseRule({uniqueId: '877', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_877.addFilter(condition_127f83b2_de92_4f87_aa9f_bd32f5bd8684);

condition_b0b71478_a369_46a5_88d8_496285d2aec3 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_8a0616f4_11e4_5a6b_a685_34e657e25e89, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'b0b71478_a369_46a5_88d8_496285d2aec3'});

rule_1205 = new taginspector.datapulse.BaseRule({uniqueId: '1205', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_1205.addFilter(condition_b0b71478_a369_46a5_88d8_496285d2aec3);

condition_a1cea2f8_e0bf_4489_8efe_18e55dffdec2 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_e87dd923_fc34_5ed2_b4b2_56e501e6d707, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'a1cea2f8_e0bf_4489_8efe_18e55dffdec2'});

rule_2100 = new taginspector.datapulse.BaseRule({uniqueId: '2100', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2100.addFilter(condition_a1cea2f8_e0bf_4489_8efe_18e55dffdec2);

condition_664f4e33_a51c_410c_a486_6e9951cc38ec = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_897e7bfb_b6c0_5d87_b08a_c5dd1cbb7e88, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '664f4e33_a51c_410c_a486_6e9951cc38ec'});

rule_876 = new taginspector.datapulse.BaseRule({uniqueId: '876', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_876.addFilter(condition_664f4e33_a51c_410c_a486_6e9951cc38ec);

condition_279ed841_8431_4ca6_be42_aa5189b846ac = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_726203f9_2636_563d_b693_b5ab0edb4f54, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '279ed841_8431_4ca6_be42_aa5189b846ac'});

rule_2103 = new taginspector.datapulse.BaseRule({uniqueId: '2103', ruleVersion: 1, dataCollector: tiMonitor.dataCollector});
rule_2103.addFilter(condition_279ed841_8431_4ca6_be42_aa5189b846ac);


condition_76191a2e_3e24_4cc8_8af5_5afcdd78265c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '76191a2e_3e24_4cc8_8af5_5afcdd78265c'});
trigger_function_trigger_c005a374_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_76191a2e_3e24_4cc8_8af5_5afcdd78265c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c005a374_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c005a374_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c005a374_7314_11e9_94bf_12c07f163aa0' });
trigger_c005a374_7314_11e9_94bf_12c07f163aa0.addRule(rule_879);
rule_879.addTrigger(trigger_c005a374_7314_11e9_94bf_12c07f163aa0);

condition_6db2f773_0022_426d_9422_8fb09b5f9902 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '6db2f773_0022_426d_9422_8fb09b5f9902'});
trigger_function_trigger_c005bc24_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_6db2f773_0022_426d_9422_8fb09b5f9902.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c005bc24_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c005bc24_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c005bc24_7314_11e9_94bf_12c07f163aa0' });
trigger_c005bc24_7314_11e9_94bf_12c07f163aa0.addRule(rule_724);
rule_724.addTrigger(trigger_c005bc24_7314_11e9_94bf_12c07f163aa0);

condition_1f247586_1081_447f_8690_388e36c26978 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '1f247586_1081_447f_8690_388e36c26978'});
trigger_function_trigger_c005cea8_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_1f247586_1081_447f_8690_388e36c26978.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c005cea8_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c005cea8_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c005cea8_7314_11e9_94bf_12c07f163aa0' });
trigger_c005cea8_7314_11e9_94bf_12c07f163aa0.addRule(rule_1206);
rule_1206.addTrigger(trigger_c005cea8_7314_11e9_94bf_12c07f163aa0);

condition_78fdb5b8_71c9_4909_a2d8_a0e4994ff664 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '78fdb5b8_71c9_4909_a2d8_a0e4994ff664'});
trigger_function_trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_78fdb5b8_71c9_4909_a2d8_a0e4994ff664.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c005ebc2_7314_11e9_94bf_12c07f163aa0' });
trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0.addRule(rule_1082);
rule_1082.addTrigger(trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0);

condition_5b70d44c_1c3e_4cdc_a0a5_5f7c6159a578 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '5b70d44c_1c3e_4cdc_a0a5_5f7c6159a578'});
trigger_function_trigger_c0060198_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_5b70d44c_1c3e_4cdc_a0a5_5f7c6159a578.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0060198_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0060198_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0060198_7314_11e9_94bf_12c07f163aa0' });
trigger_c0060198_7314_11e9_94bf_12c07f163aa0.addRule(rule_1160);
rule_1160.addTrigger(trigger_c0060198_7314_11e9_94bf_12c07f163aa0);

condition_9e011380_d8b9_4bed_b4a9_7b3f0d653276 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '9e011380_d8b9_4bed_b4a9_7b3f0d653276'});
trigger_function_trigger_c0064a40_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_9e011380_d8b9_4bed_b4a9_7b3f0d653276.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0064a40_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0064a40_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0064a40_7314_11e9_94bf_12c07f163aa0' });
trigger_c0064a40_7314_11e9_94bf_12c07f163aa0.addRule(rule_1051);
rule_1051.addTrigger(trigger_c0064a40_7314_11e9_94bf_12c07f163aa0);

condition_670f5778_f882_44ad_b551_cd6080e1c7c4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '670f5778_f882_44ad_b551_cd6080e1c7c4'});
trigger_function_trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_670f5778_f882_44ad_b551_cd6080e1c7c4.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0065dbe_7314_11e9_94bf_12c07f163aa0' });
trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0.addRule(rule_1548);
rule_1548.addTrigger(trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0);

condition_e79c2eda_f095_48d4_9270_9976c7c283e8 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'kuber/confirmOrder', comparisonType: 'Contains', uniqueId: 'e79c2eda_f095_48d4_9270_9976c7c283e8'});
trigger_function_trigger_c00670ba_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_e79c2eda_f095_48d4_9270_9976c7c283e8.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00670ba_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00670ba_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00670ba_7314_11e9_94bf_12c07f163aa0' });
trigger_c00670ba_7314_11e9_94bf_12c07f163aa0.addRule(rule_1132);
rule_1132.addTrigger(trigger_c00670ba_7314_11e9_94bf_12c07f163aa0);

condition_3568f315_d849_4adf_8e7d_a90914849a8f = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '3568f315_d849_4adf_8e7d_a90914849a8f'});
trigger_function_trigger_c006853c_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_3568f315_d849_4adf_8e7d_a90914849a8f.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c006853c_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c006853c_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c006853c_7314_11e9_94bf_12c07f163aa0' });
trigger_c006853c_7314_11e9_94bf_12c07f163aa0.addRule(rule_664);
rule_664.addTrigger(trigger_c006853c_7314_11e9_94bf_12c07f163aa0);

condition_a0b8f972_cdd6_4cb4_826e_2c0b5594c31e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'a0b8f972_cdd6_4cb4_826e_2c0b5594c31e'});
trigger_function_trigger_c00698f6_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_a0b8f972_cdd6_4cb4_826e_2c0b5594c31e.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00698f6_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00698f6_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00698f6_7314_11e9_94bf_12c07f163aa0' });
trigger_c00698f6_7314_11e9_94bf_12c07f163aa0.addRule(rule_895);
rule_895.addTrigger(trigger_c00698f6_7314_11e9_94bf_12c07f163aa0);

condition_9dc379e3_991f_44c2_8d07_0c93a979694a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '9dc379e3_991f_44c2_8d07_0c93a979694a'});
trigger_function_trigger_c006b020_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_9dc379e3_991f_44c2_8d07_0c93a979694a.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c006b020_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c006b020_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c006b020_7314_11e9_94bf_12c07f163aa0' });
trigger_c006b020_7314_11e9_94bf_12c07f163aa0.addRule(rule_949);
rule_949.addTrigger(trigger_c006b020_7314_11e9_94bf_12c07f163aa0);

condition_0d3c1fb0_4954_42f6_9f0e_773af8dda9c4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '/kuber/confirmOrder', comparisonType: 'Contains', uniqueId: '0d3c1fb0_4954_42f6_9f0e_773af8dda9c4'});
trigger_function_trigger_c006c36c_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_0d3c1fb0_4954_42f6_9f0e_773af8dda9c4.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c006c36c_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c006c36c_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c006c36c_7314_11e9_94bf_12c07f163aa0' });
trigger_c006c36c_7314_11e9_94bf_12c07f163aa0.addRule(rule_1533);
rule_1533.addTrigger(trigger_c006c36c_7314_11e9_94bf_12c07f163aa0);

condition_11780ded_38a3_481e_b219_92592a2d504b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '11780ded_38a3_481e_b219_92592a2d504b'});
trigger_function_trigger_c006d53c_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_11780ded_38a3_481e_b219_92592a2d504b.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c006d53c_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c006d53c_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c006d53c_7314_11e9_94bf_12c07f163aa0' });
trigger_c006d53c_7314_11e9_94bf_12c07f163aa0.addRule(rule_803);
rule_803.addTrigger(trigger_c006d53c_7314_11e9_94bf_12c07f163aa0);

condition_cfaa49d3_55ba_48fa_be0f_cd42b23be0eb = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'cfaa49d3_55ba_48fa_be0f_cd42b23be0eb'});
trigger_function_trigger_c006e90a_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_cfaa49d3_55ba_48fa_be0f_cd42b23be0eb.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c006e90a_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c006e90a_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c006e90a_7314_11e9_94bf_12c07f163aa0' });
trigger_c006e90a_7314_11e9_94bf_12c07f163aa0.addRule(rule_1706);
rule_1706.addTrigger(trigger_c006e90a_7314_11e9_94bf_12c07f163aa0);

condition_ed149840_b34f_48d3_a72e_81e52907cac1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: 'ed149840_b34f_48d3_a72e_81e52907cac1'});
trigger_function_trigger_c0070070_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_ed149840_b34f_48d3_a72e_81e52907cac1.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0070070_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0070070_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0070070_7314_11e9_94bf_12c07f163aa0' });
trigger_c0070070_7314_11e9_94bf_12c07f163aa0.addRule(rule_869);
rule_869.addTrigger(trigger_c0070070_7314_11e9_94bf_12c07f163aa0);

condition_8a60cd95_13d9_4333_b7da_f0b0038d46b1 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '8a60cd95_13d9_4333_b7da_f0b0038d46b1'});
trigger_function_trigger_c007184e_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_8a60cd95_13d9_4333_b7da_f0b0038d46b1.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007184e_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007184e_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007184e_7314_11e9_94bf_12c07f163aa0' });
trigger_c007184e_7314_11e9_94bf_12c07f163aa0.addRule(rule_867);
rule_867.addTrigger(trigger_c007184e_7314_11e9_94bf_12c07f163aa0);

condition_ce8a04d3_80e0_48fa_9533_f4ce33f231f4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'ce8a04d3_80e0_48fa_9533_f4ce33f231f4'});
trigger_function_trigger_c0072c26_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_ce8a04d3_80e0_48fa_9533_f4ce33f231f4.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0072c26_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0072c26_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0072c26_7314_11e9_94bf_12c07f163aa0' });
trigger_c0072c26_7314_11e9_94bf_12c07f163aa0.addRule(rule_945);
rule_945.addTrigger(trigger_c0072c26_7314_11e9_94bf_12c07f163aa0);

condition_230371d2_ed72_4371_81fd_645df47c93b0 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '230371d2_ed72_4371_81fd_645df47c93b0'});
trigger_function_trigger_c00742ec_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_230371d2_ed72_4371_81fd_645df47c93b0.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00742ec_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00742ec_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00742ec_7314_11e9_94bf_12c07f163aa0' });
trigger_c00742ec_7314_11e9_94bf_12c07f163aa0.addRule(rule_1410);
rule_1410.addTrigger(trigger_c00742ec_7314_11e9_94bf_12c07f163aa0);

condition_38bf9764_7c71_4a42_9392_e1aadadca6e6 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '38bf9764_7c71_4a42_9392_e1aadadca6e6'});
trigger_function_trigger_c00757e6_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_38bf9764_7c71_4a42_9392_e1aadadca6e6.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00757e6_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00757e6_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00757e6_7314_11e9_94bf_12c07f163aa0' });
trigger_c00757e6_7314_11e9_94bf_12c07f163aa0.addRule(rule_2085);
rule_2085.addTrigger(trigger_c00757e6_7314_11e9_94bf_12c07f163aa0);

condition_b79e838a_b6bd_45ff_94e5_fad3fbde9c86 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'content-hub', comparisonType: 'Contains', uniqueId: 'b79e838a_b6bd_45ff_94e5_fad3fbde9c86'});
trigger_function_trigger_c0076d80_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_b79e838a_b6bd_45ff_94e5_fad3fbde9c86.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0076d80_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0076d80_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0076d80_7314_11e9_94bf_12c07f163aa0' });
trigger_c0076d80_7314_11e9_94bf_12c07f163aa0.addRule(rule_2096);
rule_2096.addTrigger(trigger_c0076d80_7314_11e9_94bf_12c07f163aa0);

condition_b011b45c_ecc0_49c4_8353_a65e1ac4634e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: 'b011b45c_ecc0_49c4_8353_a65e1ac4634e'});
trigger_function_trigger_c0078176_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_b011b45c_ecc0_49c4_8353_a65e1ac4634e.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0078176_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0078176_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0078176_7314_11e9_94bf_12c07f163aa0' });
trigger_c0078176_7314_11e9_94bf_12c07f163aa0.addRule(rule_768);
rule_768.addTrigger(trigger_c0078176_7314_11e9_94bf_12c07f163aa0);

condition_6757505d_8d4e_4231_87f8_34ef05dcdeee = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '6757505d_8d4e_4231_87f8_34ef05dcdeee'});
trigger_function_trigger_c007947c_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_6757505d_8d4e_4231_87f8_34ef05dcdeee.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007947c_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007947c_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007947c_7314_11e9_94bf_12c07f163aa0' });
trigger_c007947c_7314_11e9_94bf_12c07f163aa0.addRule(rule_866);
rule_866.addTrigger(trigger_c007947c_7314_11e9_94bf_12c07f163aa0);

condition_70f99490_3a13_445e_bc65_323181c7e825 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '70f99490_3a13_445e_bc65_323181c7e825'});
trigger_function_trigger_c007ac32_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_70f99490_3a13_445e_bc65_323181c7e825.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007ac32_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007ac32_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007ac32_7314_11e9_94bf_12c07f163aa0' });
trigger_c007ac32_7314_11e9_94bf_12c07f163aa0.addRule(rule_1409);
rule_1409.addTrigger(trigger_c007ac32_7314_11e9_94bf_12c07f163aa0);

condition_d76643e9_8d7c_4ef6_b827_695561116f93 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'd76643e9_8d7c_4ef6_b827_695561116f93'});
trigger_function_trigger_c007c028_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_d76643e9_8d7c_4ef6_b827_695561116f93.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007c028_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007c028_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007c028_7314_11e9_94bf_12c07f163aa0' });
trigger_c007c028_7314_11e9_94bf_12c07f163aa0.addRule(rule_2086);
rule_2086.addTrigger(trigger_c007c028_7314_11e9_94bf_12c07f163aa0);

condition_9fcc7c83_257f_4e7f_8da3_05675d1b29e9 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '9fcc7c83_257f_4e7f_8da3_05675d1b29e9'});
trigger_function_trigger_c007d540_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_9fcc7c83_257f_4e7f_8da3_05675d1b29e9.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007d540_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007d540_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007d540_7314_11e9_94bf_12c07f163aa0' });
trigger_c007d540_7314_11e9_94bf_12c07f163aa0.addRule(rule_968);
rule_968.addTrigger(trigger_c007d540_7314_11e9_94bf_12c07f163aa0);

condition_5eddb6ce_afec_4bca_9a7b_bf7708e8d00c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '5eddb6ce_afec_4bca_9a7b_bf7708e8d00c'});
trigger_function_trigger_c007e95e_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_5eddb6ce_afec_4bca_9a7b_bf7708e8d00c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007e95e_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007e95e_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007e95e_7314_11e9_94bf_12c07f163aa0' });
trigger_c007e95e_7314_11e9_94bf_12c07f163aa0.addRule(rule_1184);
rule_1184.addTrigger(trigger_c007e95e_7314_11e9_94bf_12c07f163aa0);

condition_6eec0550_80c6_4a77_9a1a_4db8fce7dac8 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '6eec0550_80c6_4a77_9a1a_4db8fce7dac8'});
trigger_function_trigger_c007fe30_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_6eec0550_80c6_4a77_9a1a_4db8fce7dac8.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c007fe30_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c007fe30_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c007fe30_7314_11e9_94bf_12c07f163aa0' });
trigger_c007fe30_7314_11e9_94bf_12c07f163aa0.addRule(rule_1230);
rule_1230.addTrigger(trigger_c007fe30_7314_11e9_94bf_12c07f163aa0);

condition_65193b91_4b96_4dfb_a44e_0d3f5244f650 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '65193b91_4b96_4dfb_a44e_0d3f5244f650'});
trigger_function_trigger_c0081118_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_65193b91_4b96_4dfb_a44e_0d3f5244f650.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0081118_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0081118_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0081118_7314_11e9_94bf_12c07f163aa0' });
trigger_c0081118_7314_11e9_94bf_12c07f163aa0.addRule(rule_728);
rule_728.addTrigger(trigger_c0081118_7314_11e9_94bf_12c07f163aa0);

condition_fb6a22af_d58b_4423_b130_60a490abdb64 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'fb6a22af_d58b_4423_b130_60a490abdb64'});
trigger_function_trigger_c0082644_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_fb6a22af_d58b_4423_b130_60a490abdb64.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0082644_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0082644_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0082644_7314_11e9_94bf_12c07f163aa0' });
trigger_c0082644_7314_11e9_94bf_12c07f163aa0.addRule(rule_729);
rule_729.addTrigger(trigger_c0082644_7314_11e9_94bf_12c07f163aa0);

condition_4f7fc5b5_9e8e_49ee_aca0_f92d570fab4c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4f7fc5b5_9e8e_49ee_aca0_f92d570fab4c'});
trigger_function_trigger_c00838c8_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_4f7fc5b5_9e8e_49ee_aca0_f92d570fab4c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00838c8_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00838c8_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00838c8_7314_11e9_94bf_12c07f163aa0' });
trigger_c00838c8_7314_11e9_94bf_12c07f163aa0.addRule(rule_764);
rule_764.addTrigger(trigger_c00838c8_7314_11e9_94bf_12c07f163aa0);

condition_4d6fbc6e_a684_491c_9261_8f39b052afe4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '4d6fbc6e_a684_491c_9261_8f39b052afe4'});
trigger_function_trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_4d6fbc6e_a684_491c_9261_8f39b052afe4.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0084d2c_7314_11e9_94bf_12c07f163aa0' });
trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0.addRule(rule_2092);
rule_2092.addTrigger(trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0);

condition_e5069174_87fd_4d8d_995a_899b2dbd753f = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'e5069174_87fd_4d8d_995a_899b2dbd753f'});
trigger_function_trigger_c00863e8_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_e5069174_87fd_4d8d_995a_899b2dbd753f.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00863e8_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00863e8_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00863e8_7314_11e9_94bf_12c07f163aa0' });
trigger_c00863e8_7314_11e9_94bf_12c07f163aa0.addRule(rule_1711);
rule_1711.addTrigger(trigger_c00863e8_7314_11e9_94bf_12c07f163aa0);

condition_b7c84ff2_0b3c_4cb1_9dcb_c3121ceacf17 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_aa8a44c8_c134_5a4a_a6e5_3c042004c207, comparisonVariable: 'Edge', comparisonType: 'Does not Contain', uniqueId: 'b7c84ff2_0b3c_4cb1_9dcb_c3121ceacf17'});
trigger_function_trigger_c0086f64_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_b7c84ff2_0b3c_4cb1_9dcb_c3121ceacf17.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0086f64_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0086f64_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0086f64_7314_11e9_94bf_12c07f163aa0' });
trigger_c0086f64_7314_11e9_94bf_12c07f163aa0.addRule(rule_1711);
rule_1711.addTrigger(trigger_c0086f64_7314_11e9_94bf_12c07f163aa0);

condition_35026473_00ca_4cd1_9931_a384e274ef8c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Matches Regex', uniqueId: '35026473_00ca_4cd1_9931_a384e274ef8c'});
trigger_function_trigger_c00881de_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_35026473_00ca_4cd1_9931_a384e274ef8c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00881de_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00881de_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00881de_7314_11e9_94bf_12c07f163aa0' });
trigger_c00881de_7314_11e9_94bf_12c07f163aa0.addRule(rule_878);
rule_878.addTrigger(trigger_c00881de_7314_11e9_94bf_12c07f163aa0);

condition_0b83ef7c_1ddc_44fe_97ad_95b121f35197 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '0b83ef7c_1ddc_44fe_97ad_95b121f35197'});
trigger_function_trigger_c0089674_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_0b83ef7c_1ddc_44fe_97ad_95b121f35197.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0089674_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0089674_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0089674_7314_11e9_94bf_12c07f163aa0' });
trigger_c0089674_7314_11e9_94bf_12c07f163aa0.addRule(rule_1707);
rule_1707.addTrigger(trigger_c0089674_7314_11e9_94bf_12c07f163aa0);

condition_32cc11cf_11e7_4f39_8a17_9a6480cee00d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '32cc11cf_11e7_4f39_8a17_9a6480cee00d'});
trigger_function_trigger_c008ad44_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_32cc11cf_11e7_4f39_8a17_9a6480cee00d.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c008ad44_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c008ad44_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c008ad44_7314_11e9_94bf_12c07f163aa0' });
trigger_c008ad44_7314_11e9_94bf_12c07f163aa0.addRule(rule_2093);
rule_2093.addTrigger(trigger_c008ad44_7314_11e9_94bf_12c07f163aa0);

condition_db4cd1de_2174_44d0_9bab_c1f5221b7514 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'db4cd1de_2174_44d0_9bab_c1f5221b7514'});
trigger_function_trigger_c008c694_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_db4cd1de_2174_44d0_9bab_c1f5221b7514.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c008c694_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c008c694_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c008c694_7314_11e9_94bf_12c07f163aa0' });
trigger_c008c694_7314_11e9_94bf_12c07f163aa0.addRule(rule_2099);
rule_2099.addTrigger(trigger_c008c694_7314_11e9_94bf_12c07f163aa0);

condition_14cbcd1b_8f49_4657_8c83_cc431d423c3b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '14cbcd1b_8f49_4657_8c83_cc431d423c3b'});
trigger_function_trigger_c008dabc_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_14cbcd1b_8f49_4657_8c83_cc431d423c3b.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c008dabc_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c008dabc_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c008dabc_7314_11e9_94bf_12c07f163aa0' });
trigger_c008dabc_7314_11e9_94bf_12c07f163aa0.addRule(rule_1149);
rule_1149.addTrigger(trigger_c008dabc_7314_11e9_94bf_12c07f163aa0);

condition_e6aac9c0_5497_474d_b2cf_d49f0372d51e = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'e6aac9c0_5497_474d_b2cf_d49f0372d51e'});
trigger_function_trigger_c008ee76_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_e6aac9c0_5497_474d_b2cf_d49f0372d51e.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c008ee76_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c008ee76_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c008ee76_7314_11e9_94bf_12c07f163aa0' });
trigger_c008ee76_7314_11e9_94bf_12c07f163aa0.addRule(rule_1714);
rule_1714.addTrigger(trigger_c008ee76_7314_11e9_94bf_12c07f163aa0);

condition_34675eee_249c_4fe6_b9ce_b0665176322d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '34675eee_249c_4fe6_b9ce_b0665176322d'});
trigger_function_trigger_c0090208_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_34675eee_249c_4fe6_b9ce_b0665176322d.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0090208_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0090208_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0090208_7314_11e9_94bf_12c07f163aa0' });
trigger_c0090208_7314_11e9_94bf_12c07f163aa0.addRule(rule_880);
rule_880.addTrigger(trigger_c0090208_7314_11e9_94bf_12c07f163aa0);

condition_06a9dd74_5358_49f4_adaf_5c37250d57bb = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '06a9dd74_5358_49f4_adaf_5c37250d57bb'});
trigger_function_trigger_c0091798_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_06a9dd74_5358_49f4_adaf_5c37250d57bb.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0091798_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0091798_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0091798_7314_11e9_94bf_12c07f163aa0' });
trigger_c0091798_7314_11e9_94bf_12c07f163aa0.addRule(rule_763);
rule_763.addTrigger(trigger_c0091798_7314_11e9_94bf_12c07f163aa0);

condition_f2b44785_2320_40e3_97fc_8956f56fca00 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'cat_SC43', comparisonType: 'Contains', uniqueId: 'f2b44785_2320_40e3_97fc_8956f56fca00'});
trigger_function_trigger_c0092eea_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_f2b44785_2320_40e3_97fc_8956f56fca00.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0092eea_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0092eea_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0092eea_7314_11e9_94bf_12c07f163aa0' });
trigger_c0092eea_7314_11e9_94bf_12c07f163aa0.addRule(rule_2101);
rule_2101.addTrigger(trigger_c0092eea_7314_11e9_94bf_12c07f163aa0);

condition_40325442_8bee_48e0_a12e_df751dd8ce0d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '40325442_8bee_48e0_a12e_df751dd8ce0d'});
trigger_function_trigger_c0094696_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_40325442_8bee_48e0_a12e_df751dd8ce0d.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0094696_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0094696_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0094696_7314_11e9_94bf_12c07f163aa0' });
trigger_c0094696_7314_11e9_94bf_12c07f163aa0.addRule(rule_1713);
rule_1713.addTrigger(trigger_c0094696_7314_11e9_94bf_12c07f163aa0);

condition_d399c019_9de6_4964_a822_0b74af19264a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_aa8a44c8_c134_5a4a_a6e5_3c042004c207, comparisonVariable: 'Edge', comparisonType: 'Does not Contain', uniqueId: 'd399c019_9de6_4964_a822_0b74af19264a'});
trigger_function_trigger_c00950fa_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_d399c019_9de6_4964_a822_0b74af19264a.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00950fa_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00950fa_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00950fa_7314_11e9_94bf_12c07f163aa0' });
trigger_c00950fa_7314_11e9_94bf_12c07f163aa0.addRule(rule_1713);
rule_1713.addTrigger(trigger_c00950fa_7314_11e9_94bf_12c07f163aa0);

condition_aa9df50e_f787_4cb0_bc74_6777d2da40a8 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'aa9df50e_f787_4cb0_bc74_6777d2da40a8'});
trigger_function_trigger_c00974fe_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_aa9df50e_f787_4cb0_bc74_6777d2da40a8.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00974fe_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00974fe_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00974fe_7314_11e9_94bf_12c07f163aa0' });
trigger_c00974fe_7314_11e9_94bf_12c07f163aa0.addRule(rule_940);
rule_940.addTrigger(trigger_c00974fe_7314_11e9_94bf_12c07f163aa0);

condition_c41d3b9d_b50f_41ca_90dd_cacadcd0a8b0 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'c41d3b9d_b50f_41ca_90dd_cacadcd0a8b0'});
trigger_function_trigger_c0098976_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_c41d3b9d_b50f_41ca_90dd_cacadcd0a8b0.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0098976_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0098976_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0098976_7314_11e9_94bf_12c07f163aa0' });
trigger_c0098976_7314_11e9_94bf_12c07f163aa0.addRule(rule_3476);
rule_3476.addTrigger(trigger_c0098976_7314_11e9_94bf_12c07f163aa0);

condition_e008b306_2f96_4ca8_917e_2027a944ac8a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: 'e008b306_2f96_4ca8_917e_2027a944ac8a'});
trigger_function_trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_e008b306_2f96_4ca8_917e_2027a944ac8a.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c0099c9a_7314_11e9_94bf_12c07f163aa0' });
trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0.addRule(rule_1161);
rule_1161.addTrigger(trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0);

condition_38bc6c5e_2a2e_463a_941e_797a68a7fbfe = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '38bc6c5e_2a2e_463a_941e_797a68a7fbfe'});
trigger_function_trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_38bc6c5e_2a2e_463a_941e_797a68a7fbfe.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c009b0a4_7314_11e9_94bf_12c07f163aa0' });
trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0.addRule(rule_766);
rule_766.addTrigger(trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0);

condition_3cb32dd7_aea8_4d21_9708_6cc0087e2005 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '3cb32dd7_aea8_4d21_9708_6cc0087e2005'});
trigger_function_trigger_c009c54e_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_3cb32dd7_aea8_4d21_9708_6cc0087e2005.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c009c54e_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c009c54e_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c009c54e_7314_11e9_94bf_12c07f163aa0' });
trigger_c009c54e_7314_11e9_94bf_12c07f163aa0.addRule(rule_727);
rule_727.addTrigger(trigger_c009c54e_7314_11e9_94bf_12c07f163aa0);

condition_10295b0e_67f9_41e6_a3eb_81d02d7a74f2 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '10295b0e_67f9_41e6_a3eb_81d02d7a74f2'});
trigger_function_trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_10295b0e_67f9_41e6_a3eb_81d02d7a74f2.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c009d9b2_7314_11e9_94bf_12c07f163aa0' });
trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0.addRule(rule_1186);
rule_1186.addTrigger(trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0);

condition_cb256028_09b0_4079_8040_505da036b26a = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(http:\/\/\/www.staples.com\/)|(https:\/\/www.staples.com\/)', comparisonType: 'Matches Regex', uniqueId: 'cb256028_09b0_4079_8040_505da036b26a'});
trigger_function_trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_cb256028_09b0_4079_8040_505da036b26a.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a00a4_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0.addRule(rule_730);
rule_730.addTrigger(trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0);

condition_18e14414_7c09_4c77_a280_63bfd6b303e8 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '18e14414_7c09_4c77_a280_63bfd6b303e8'});
trigger_function_trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_18e14414_7c09_4c77_a280_63bfd6b303e8.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a1d32_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0.addRule(rule_663);
rule_663.addTrigger(trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0);

condition_0ddd3a3f_4138_4fba_9c64_c4c71c5f4288 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '0ddd3a3f_4138_4fba_9c64_c4c71c5f4288'});
trigger_function_trigger_c00a3740_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_0ddd3a3f_4138_4fba_9c64_c4c71c5f4288.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a3740_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a3740_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a3740_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a3740_7314_11e9_94bf_12c07f163aa0.addRule(rule_741);
rule_741.addTrigger(trigger_c00a3740_7314_11e9_94bf_12c07f163aa0);

condition_124d0c67_38e4_458c_9a32_f364fbdcd06b = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '124d0c67_38e4_458c_9a32_f364fbdcd06b'});
trigger_function_trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_124d0c67_38e4_458c_9a32_f364fbdcd06b.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a4e56_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0.addRule(rule_1097);
rule_1097.addTrigger(trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0);

condition_29b8b341_844d_4f6e_8094_8b6aaf86e998 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '29b8b341_844d_4f6e_8094_8b6aaf86e998'});
trigger_function_trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_29b8b341_844d_4f6e_8094_8b6aaf86e998.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a6c6a_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0.addRule(rule_1997);
rule_1997.addTrigger(trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0);

condition_73e9d0ec_84ab_45c2_bdb2_b6e2af8b4768 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'content-hub', comparisonType: 'Contains', uniqueId: '73e9d0ec_84ab_45c2_bdb2_b6e2af8b4768'});
trigger_function_trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_73e9d0ec_84ab_45c2_bdb2_b6e2af8b4768.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a81d2_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0.addRule(rule_2095);
rule_2095.addTrigger(trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0);

condition_cacdd72c_a8d4_4b0f_a92a_457d68bc3306 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'www.staples.com/', comparisonType: 'Equals', uniqueId: 'cacdd72c_a8d4_4b0f_a92a_457d68bc3306'});
trigger_function_trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_cacdd72c_a8d4_4b0f_a92a_457d68bc3306.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00a9a1e_7314_11e9_94bf_12c07f163aa0' });
trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0.addRule(rule_2102);
rule_2102.addTrigger(trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0);

condition_902a4be4_be61_45be_9bf3_6146928dfe41 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '902a4be4_be61_45be_9bf3_6146928dfe41'});
trigger_function_trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_902a4be4_be61_45be_9bf3_6146928dfe41.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00ab2ba_7314_11e9_94bf_12c07f163aa0' });
trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0.addRule(rule_1710);
rule_1710.addTrigger(trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0);

condition_7d14cecb_6fb9_450d_a5b4_e71353aa1bf9 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_aa8a44c8_c134_5a4a_a6e5_3c042004c207, comparisonVariable: 'Edge', comparisonType: 'Does not Contain', uniqueId: '7d14cecb_6fb9_450d_a5b4_e71353aa1bf9'});
trigger_function_trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_7d14cecb_6fb9_450d_a5b4_e71353aa1bf9.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00abcb0_7314_11e9_94bf_12c07f163aa0' });
trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0.addRule(rule_1710);
rule_1710.addTrigger(trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0);

condition_57f456e0_3f0a_4b1e_b91b_88e7014a614d = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '57f456e0_3f0a_4b1e_b91b_88e7014a614d'});
trigger_function_trigger_c00ad452_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_57f456e0_3f0a_4b1e_b91b_88e7014a614d.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00ad452_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00ad452_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00ad452_7314_11e9_94bf_12c07f163aa0' });
trigger_c00ad452_7314_11e9_94bf_12c07f163aa0.addRule(rule_2295);
rule_2295.addTrigger(trigger_c00ad452_7314_11e9_94bf_12c07f163aa0);

condition_5f882269_6b2a_48e8_a258_8a8b8881b9a0 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '5f882269_6b2a_48e8_a258_8a8b8881b9a0'});
trigger_function_trigger_c00aec08_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_5f882269_6b2a_48e8_a258_8a8b8881b9a0.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00aec08_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00aec08_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00aec08_7314_11e9_94bf_12c07f163aa0' });
trigger_c00aec08_7314_11e9_94bf_12c07f163aa0.addRule(rule_2505);
rule_2505.addTrigger(trigger_c00aec08_7314_11e9_94bf_12c07f163aa0);

condition_644a2568_74cf_433b_92bc_78e3c8bcce14 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_5d73e5ea_98a3_50d1_b89a_7a8cacf5bae1, comparisonVariable: 'true', comparisonType: 'Equals', uniqueId: '644a2568_74cf_433b_92bc_78e3c8bcce14'});
trigger_function_trigger_c00b0134_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_644a2568_74cf_433b_92bc_78e3c8bcce14.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b0134_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b0134_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b0134_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b0134_7314_11e9_94bf_12c07f163aa0.addRule(rule_680);
rule_680.addTrigger(trigger_c00b0134_7314_11e9_94bf_12c07f163aa0);

condition_476c9d18_5975_4693_ab98_0d4ebaedbb99 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '476c9d18_5975_4693_ab98_0d4ebaedbb99'});
trigger_function_trigger_c00b1714_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_476c9d18_5975_4693_ab98_0d4ebaedbb99.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b1714_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b1714_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b1714_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b1714_7314_11e9_94bf_12c07f163aa0.addRule(rule_877);
rule_877.addTrigger(trigger_c00b1714_7314_11e9_94bf_12c07f163aa0);

condition_4fff3173_bccd_42cd_93ff_1b1f135aa94c = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: '4fff3173_bccd_42cd_93ff_1b1f135aa94c'});
trigger_function_trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_4fff3173_bccd_42cd_93ff_1b1f135aa94c.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b2baa_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0.addRule(rule_1205);
rule_1205.addTrigger(trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0);

condition_eaef10d6_2dd1_45e3_ae29_7756fce9a569 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'www.staples.com/', comparisonType: 'Equals', uniqueId: 'eaef10d6_2dd1_45e3_ae29_7756fce9a569'});
trigger_function_trigger_c00b4356_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_eaef10d6_2dd1_45e3_ae29_7756fce9a569.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b4356_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b4356_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b4356_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b4356_7314_11e9_94bf_12c07f163aa0.addRule(rule_2100);
rule_2100.addTrigger(trigger_c00b4356_7314_11e9_94bf_12c07f163aa0);

condition_78dc98e9_e043_45b7_8186_3e64a938c4e2 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: '(orderconf)|(kuber\/confirmOrder)', comparisonType: 'Matches Regex', uniqueId: '78dc98e9_e043_45b7_8186_3e64a938c4e2'});
trigger_function_trigger_c00b56de_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_78dc98e9_e043_45b7_8186_3e64a938c4e2.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b56de_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b56de_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b56de_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b56de_7314_11e9_94bf_12c07f163aa0.addRule(rule_876);
rule_876.addTrigger(trigger_c00b56de_7314_11e9_94bf_12c07f163aa0);

condition_c1ad7554_01b7_43fc_9532_ae57866e0ae4 = new taginspector.datapulse.filter.JsExpressionFilter({sourceVariable: macro_31dad1ae_f686_5581_8cbc_52bf9629b428, comparisonVariable: 'confirmOrder', comparisonType: 'Contains', uniqueId: 'c1ad7554_01b7_43fc_9532_ae57866e0ae4'});
trigger_function_trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0 = function (cb) {
			var triggerFired = false;
			function fireCallback(){
				if(triggerFired == false){
					triggerFired = true;
					try {
						if(condition_c1ad7554_01b7_43fc_9532_ae57866e0ae4.match() == true){
							cb(true);
						}
					} catch (err) {
						console.log(err.message);
						jeErrorObj = {
							message: err.message
						};
						tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
					}
				}
			}window.addEventListener("beforeunload", function (event) {fireCallback();});
			document.addEventListener('tiSimulateUnload', function (e) {
				fireCallback();
			}, false);
		};
trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0 = new taginspector.datapulse.trigger.BaseTrigger({triggerScript: trigger_function_trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0, uniqueId: 'c00b6bc4_7314_11e9_94bf_12c07f163aa0' });
trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0.addRule(rule_2103);
rule_2103.addTrigger(trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0);

trigger_c005a374_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c005bc24_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c005cea8_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c005ebc2_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0060198_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0064a40_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0065dbe_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00670ba_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c006853c_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00698f6_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c006b020_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c006c36c_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c006d53c_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c006e90a_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0070070_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007184e_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0072c26_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00742ec_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00757e6_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0076d80_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0078176_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007947c_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007ac32_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007c028_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007d540_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007e95e_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c007fe30_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0081118_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0082644_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00838c8_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0084d2c_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00863e8_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0086f64_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00881de_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0089674_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c008ad44_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c008c694_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c008dabc_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c008ee76_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0090208_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0091798_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0092eea_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0094696_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00950fa_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00974fe_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0098976_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c0099c9a_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c009b0a4_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c009c54e_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c009d9b2_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a00a4_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a1d32_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a3740_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a4e56_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a6c6a_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a81d2_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00a9a1e_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00ab2ba_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00abcb0_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00ad452_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00aec08_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b0134_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b1714_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b2baa_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b4356_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b56de_7314_11e9_94bf_12c07f163aa0.initTrigger();
trigger_c00b6bc4_7314_11e9_94bf_12c07f163aa0.initTrigger();

		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	tiMonitor.fireValidationRules = function (){
		try {
			//fire unload triggers:
			if(document.createEvent && tiMonitor.sendData.pageBeingSampled == false){
				var event = document.createEvent('Event');
				event.initEvent('tiSimulateUnload', true, true);

				tiMonitor.sendData.handleUnload();
				document.dispatchEvent(event);
			}
		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};


	tiMonitor.initializeNewPage = function (){
		try {
			tiMonitor.windowUnloadEvent = false;
			tiMonitor.sendData.sentUnload = false;
			tiMonitor.sendData.pageBeingSampled = tiMonitor.sendData.shouldSamplePage();
			newPageId =  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
			tiMonitor.sendData.pageId = newPageId;
			tiMonitor.dataCollector.pageId = newPageId;
			
			tiMonitor.dataCollector.startTime = Date.now();
			tiMonitor.dataCollector.identifiedRequests = {};
			tiMonitor.dataCollector.offsetTime = performance.now();
			tiMonitor.sendData.currentUrl = window.location.href;
			tiMonitor.sendData.preventFiringValidationRules = false;
		
		tiMonitor.dataCollector.resource_size = 0;
		}
		catch(err) {
			console.log(err.message);
			jeErrorObj = {
				message: err.message
			};
			tiMonitor.dataCollector.queueRequest(jeErrorObj, "jserror");
		}
	};

	if(tiMonitor.sendData.suportedBrowser() == true){
		if(tiMonitor.sendData.initialized == false){
			tiMonitor.sendData.initialized = true;
			if(tiMonitor.sendData.shouldSamplePage() == false && tiMonitor.sendData.isBufferFull() == false){
				if(false){
					tiMonitor.dataCollector.session = taginspector.datapulse.Session.setupSession({"containerId": "9f4e97e0ac7811e6b6e71227d54986f3"});
				}
				tiMonitor.sendData.fullBufferEventListener();

				if(tiMonitor.sendData.isPerformanceObserverSupported() == true){
					var iteratePerformanceCompleted = false;
					while(iteratePerformanceCompleted == false){
						tiMonitor.sendData.iteratePerformance();
						pe = performance.getEntriesByType("resource");
						if(tiMonitor.sendData.lastPerformanceObjLength == pe.length){
							iteratePerformanceCompleted = true;
						}
					}
					var observer = new PerformanceObserver(tiMonitor.sendData.performanceObserverCallback);
					observer.observe({entryTypes: ['resource']});

				}else{
					setInterval(function () {tiMonitor.sendData.iteratePerformance()}, 1000);
				}

				window.addEventListener('beforeunload', function(event) { tiMonitor.sendData.handleUnload();});

				///*angular_site*/
				if(tiMonitor.sendData.isSinglePageApp()){
					setInterval(function () {
						if(tiMonitor.sendData.currentUrl != window.location.href){
							tiMonitor.fireValidationRules();
							tiMonitor.sendData.pageComplete();

							tiMonitor.sendData.currentUrl = window.location.href;
							tiMonitor.initializeNewPage();
						}
					}, 50);
				}
				
				var tiDomLoadInterval = setInterval(function () {
					isDomLoaded = tiMonitor.sendData.waitForDomLoad();
					if(isDomLoaded){
						clearInterval(tiDomLoadInterval);
					}
				}, 1000);
				setInterval(function () {tiMonitor.sendData.fire()}, 1000);

			}
		}
	}
}


