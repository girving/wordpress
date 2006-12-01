var dbx;function dbxManager(_1){dbx=this;if(!/^[-_a-z0-9]+$/i.test(_1)){alert("Error from dbxManager:\n\""+_1+"\" is an invalid session ID");return;}this.supported=!(document.getElementsByTagName("*").length==0||(navigator.vendor=="KDE"&&typeof window.sidebar=="undefined"));if(!this.supported){return;}this.etype=typeof document.addEventListener!="undefined"?"addEventListener":typeof document.attachEvent!="undefined"?"attachEvent":"none";this.eprefix=(this.etype=="attachEvent"?"on":"");if(typeof window.opera!="undefined"&&parseFloat(navigator.userAgent.toLowerCase().split(/opera[\/ ]/)[1].split(" ")[0],10)<7.5){this.etype="none";}if(this.etype=="none"){this.supported=false;return;}this.running=0;this.sid=_1;this.savedata={};this.cookiestate=this.getCookieState();}dbxManager.prototype.setCookieState=function(){var _2=new Date();_2.setTime(_2.getTime()+(365*24*60*60*1000));var _3="";for(j in this.savedata){if(typeof this.savedata[j]!="function"){_3+=j+"="+this.savedata[j]+"&";}}this.state=_3.replace(/^(.+)&$/,"$1");this.cookiestring=this.state.replace(/,/g,"|");this.cookiestring=this.cookiestring.replace(/=/g,":");if(typeof this.onstatechange=="undefined"||this.onstatechange()){document.cookie="dbx-"+this.sid+"="+this.cookiestring+"; expires="+_2.toGMTString()+"; path=/";}};dbxManager.prototype.getCookieState=function(){this.cookiestate=null;if(document.cookie){if(document.cookie.indexOf("dbx-"+this.sid)!=-1){this.cookie=document.cookie.split("dbx-"+this.sid+"=")[1].split(";")[0].split("&");for(var i in this.cookie){if(typeof this.cookie[i]!="function"){this.cookie[i]=this.cookie[i].replace(/\|/g,",");this.cookie[i]=this.cookie[i].replace(/:/g,"=");this.cookie[i]=this.cookie[i].split("=");this.cookie[i][1]=this.cookie[i][1].split(",");}}this.cookiestate={};for(i in this.cookie){if(typeof this.cookie[i]!="function"){this.cookiestate[this.cookie[i][0]]=this.cookie[i][1];}}}}return this.cookiestate;};dbxManager.prototype.addDataMember=function(_5,_6){this.savedata[_5]=_6;};dbxManager.prototype.createElement=function(_7){return typeof document.createElementNS!="undefined"?document.createElementNS("http://www.w3.org/1999/xhtml",_7):document.createElement(_7);};dbxManager.prototype.getTarget=function(e,_9,_a){if(typeof _a!="undefined"){var _b=_a;}else{_b=typeof e.target!="undefined"?e.target:e.srcElement;}var _c=new RegExp(_9,"");while(!_c.test(_b.className)){_b=_b.parentNode;}return _b;};function dbxGroup(_d,_e,_f,fix,ani,_12,def,_14,_15,_16,_17,_18,_19,_1a){if(!/^[-_a-z0-9]+$/i.test(_d)){alert("Error from dbxGroup:\n\""+_d+"\" is an invalid container ID");return;}this.container=document.getElementById(_d);if(this.container==null||!dbx.supported){return;}var _1b=this;this.gid=_d;this.dragok=false;this.box=null;this.vertical=_e=="vertical";this.threshold=parseInt(_f,10);this.restrict=fix=="yes";this.resolution=parseInt(ani,10);this.toggles=_12=="yes";this.defopen=def!="closed";this.vocab={"open":_14,"close":_15,"move":_16,"toggle":_17,"kmove":_18,"ktoggle":_19,"syntax":_1a};this.container.style.position="relative";this.container.style.display="block";if(typeof window.opera!="undefined"){this.container.style.display="run-in";}this.boxes=[];this.buttons=[];this.order=[];this.eles=this.container.getElementsByTagName("*");for(var i=0;i<this.eles.length;i++){if(/dbx\-box/i.test(this.eles[i].className)&&!/dbx\-dummy/i.test(this.eles[i].className)){this.eles[i].style.position="relative";this.eles[i].style.display="block";this.boxes.push(this.eles[i]);this.eles[i].className+=" dbx-box-open";this.eles[i].className+=" dbxid"+this.order.length;this.order.push(this.order.length.toString()+"+");this.eles[i][dbx.etype](dbx.eprefix+"mousedown",function(e){if(!e){e=window.event;}_1b.mousedown(e,dbx.getTarget(e,"dbx-box"));},false);}if(/dbx\-handle/i.test(this.eles[i].className)){this.eles[i].style.position="relative";this.eles[i].style.display="block";this.eles[i].className+=" dbx-handle-cursor";this.eles[i].setAttribute("title",this.eles[i].getAttribute("title")==null||this.eles[i].title==""?this.vocab.move:this.vocab.syntax.replace("%mytitle%",this.eles[i].title).replace("%dbxtitle%",this.vocab.move));if(this.toggles){this.buttons.push(this.addToggleBehavior(this.eles[i]));}else{this.eles[i][dbx.etype](dbx.eprefix+"key"+(typeof document.uniqueID!="undefined"||navigator.vendor=="Apple Computer, Inc."?"down":"press"),function(e){if(!e){e=window.event;}return _1b.keypress(e,dbx.getTarget(e,"dbx-handle"));},false);this.eles[i][dbx.etype](dbx.eprefix+"focus",function(e){if(!e){e=window.event;}_1b.createTooltip(null,dbx.getTarget(e,"dbx-handle"));},false);this.eles[i][dbx.etype](dbx.eprefix+"blur",function(){_1b.removeTooltip();},false);}}}dbx.addDataMember(this.gid,this.order.join(","));var _20=this.container.appendChild(dbx.createElement("span"));_20.className="dbx-box dbx-dummy";_20.style.display="block";_20.style.width="0";_20.style.height="0";_20.style.overflow="hidden";if(this.vertical){_20.className+=" dbx-offdummy";}this.boxes.push(_20);if(dbx.cookiestate!=null&&typeof dbx.cookiestate[this.gid]!="undefined"){var num=dbx.cookiestate[this.gid].length;if(num==this.boxes.length-1){for(i=0;i<num;i++){var _22=parseInt(dbx.cookiestate[this.gid][i],10);this.container.insertBefore(this.boxes[_22],_20);if(this.toggles&&/\-$/.test(dbx.cookiestate[this.gid][i])){this.toggleBoxState(this.buttons[_22],false);}}this.getBoxOrder();}}else{if(!this.defopen&&this.toggles){var len=this.buttons.length;for(i=0;i<len;i++){this.toggleBoxState(this.buttons[i],true);}}}document[dbx.etype](dbx.eprefix+"mouseout",function(e){if(typeof e.target=="undefined"){e=window.event;e.relatedTarget=e.toElement;}if(e.relatedTarget==null){_1b.mouseup(e);}},false);document[dbx.etype](dbx.eprefix+"mousemove",function(e){_1b.mousemove(e);return !_1b.dragok;},false);document[dbx.etype](dbx.eprefix+"mouseup",function(e){_1b.mouseup(e);},false);this.keydown=false;document[dbx.etype](dbx.eprefix+"keydown",function(){_1b.keydown=true;},false);document[dbx.etype](dbx.eprefix+"keyup",function(){_1b.keydown=false;},false);}dbxGroup.prototype.addToggleBehavior=function(){var _27=this;var _28=arguments[0].appendChild(dbx.createElement("a"));_28.appendChild(document.createTextNode("\xa0"));_28.style.cursor="pointer";_28.href="javascript:void(null)";_28.className="dbx-toggle dbx-toggle-open";_28.setAttribute("title",this.vocab.toggle.replace("%toggle%",this.vocab.close));_28.hasfocus=typeof window.opera!="undefined"||navigator.vendor=="Apple Computer, Inc."?null:false;this.tooltip=null;_28.onclick=function(){if(this.hasfocus===true||this.hasfocus===null){_27.removeTooltip();_27.toggleBoxState(this,true);}};_28["onkey"+(typeof document.uniqueID!="undefined"||navigator.vendor=="Apple Computer, Inc."?"down":"press")]=function(e){if(!e){e=window.event;}return _27.keypress(e,this);};_28.onfocus=function(){var len=_27.buttons.length;for(var i=0;i<len;i++){_27.buttons[i].className=_27.buttons[i].className.replace(/[ ](dbx\-toggle\-hilite\-)(open|closed)/,"");}var _2c=(/dbx\-toggle\-open/.test(this.className));this.className+=" dbx-toggle-hilite-"+(_2c?"open":"closed");_27.createTooltip(_2c,this);this.isactive=true;if(this.hasfocus!==null){this.hasfocus=true;}};_28.onblur=function(){this.className=this.className.replace(/[ ](dbx\-toggle\-hilite\-)(open|closed)/,"");_27.removeTooltip();if(this.hasfocus!==null){this.hasfocus=false;}};return _28;};dbxGroup.prototype.toggleBoxState=function(_2d,_2e){var _2f=(/dbx\-toggle\-open/.test(_2d.className));var _30=dbx.getTarget(null,"dbx-box",_2d);dbx.box=_30;dbx.toggle=_2d;if(typeof dbx.container=="undefined"){dbx.group=dbx.getTarget(null,"dbx-group",_30);}else{dbx.group=dbx.container;}if((!_2f&&(typeof dbx.onboxopen=="undefined"||dbx.onboxopen()))||(_2f&&(typeof dbx.onboxclose=="undefined"||dbx.onboxclose()))){_2d.className="dbx-toggle dbx-toggle-"+(_2f?"closed":"open");_2d.title=this.vocab.toggle.replace("%toggle%",_2f?this.vocab.open:this.vocab.close);if(typeof _2d.isactive!="undefined"){_2d.className+=" dbx-toggle-hilite-"+(_2f?"closed":"open");}_30.className=_30.className.replace(/[ ](dbx-box-)(open|closed)/," $1"+(_2f?"closed":"open"));if(_2e){this.getBoxOrder();}}};dbxGroup.prototype.shiftBoxPosition=function(e,_32,_33){var _34=dbx.getTarget(null,"dbx-box",_32);dbx.group=this.container;dbx.box=_34;dbx.event=e;if(typeof dbx.onboxdrag=="undefined"||dbx.onboxdrag()){var _35=[];var len=this.boxes.length;for(var i=0;i<len;i++){_35[i]=[i,this.boxes[i][this.vertical?"offsetTop":"offsetLeft"]];if(_34==this.boxes[i]){this.idref=i;}}_35.sort(this.compare);for(i=0;i<len;i++){if(_35[i][0]==this.idref){if((_33&&i<len-2)||(!_33&&i>0)){var _38=this.boxes[_35[i+(_33?1:-1)][0]];if(this.resolution>0){var _39={"x":_34.offsetLeft,"y":_34.offsetTop};var _3a={"x":_38.offsetLeft,"y":_38.offsetTop};}var obj={"insert":(_33?_38:_34),"before":(_33?_34:_38)};this.container.insertBefore(obj.insert,obj.before);if(this.resolution>0){var _3c={"sibling":new dbxAnimator(this,_38,_3a,this.resolution,true,_32),"parent":new dbxAnimator(this,_34,_39,this.resolution,true,_32)};}else{_32.focus();}break;}}}this.getBoxOrder();}};dbxGroup.prototype.compare=function(a,b){return a[1]-b[1];};dbxGroup.prototype.createTooltip=function(_3f,_40){if(this.keydown){this.tooltip=this.container.appendChild(dbx.createElement("span"));this.tooltip.style.visibility="hidden";this.tooltip.className="dbx-tooltip";if(_3f!=null){this.tooltip.appendChild(document.createTextNode(this.vocab.kmove+this.vocab.ktoggle.replace("%toggle%",_3f?this.vocab.close:this.vocab.open)));}else{this.tooltip.appendChild(document.createTextNode(this.vocab.kmove));}var _41=dbx.getTarget(null,"dbx-box",_40);this.tooltip.style.left=_41.offsetLeft+"px";this.tooltip.style.top=_41.offsetTop+"px";var _42=this.tooltip;window.setTimeout(function(){if(_42!=null){_42.style.visibility="visible";}},500);}};dbxGroup.prototype.removeTooltip=function(){if(this.tooltip!=null){this.tooltip.parentNode.removeChild(this.tooltip);this.tooltip=null;}};dbxGroup.prototype.mousedown=function(e,box){var _45=typeof e.target!="undefined"?e.target:e.srcElement;if(_45.nodeName=="#text"){_45=_45.parentNode;}if(!/dbx\-(toggle|box|group)/i.test(_45.className)){while(!/dbx\-(handle|box|group)/i.test(_45.className)){_45=_45.parentNode;}}if(/dbx\-handle/i.test(_45.className)){this.removeTooltip();this.released=false;this.initial={"x":e.clientX,"y":e.clientY};this.current={"x":0,"y":0};this.createCloneBox(box);if(typeof e.preventDefault!="undefined"){e.preventDefault();}if(typeof document.onselectstart!="undefined"){document.onselectstart=function(){return false;};}}};dbxGroup.prototype.mousemove=function(e){if(this.dragok&&this.box!=null){this.positive=this.vertical?(e.clientY>this.current.y?true:false):(e.clientX>this.current.x?true:false);this.current={"x":e.clientX,"y":e.clientY};var _47={"x":this.current.x-this.initial.x,"y":this.current.y-this.initial.y};if(((_47.x>=0&&_47.x<=this.threshold)||(_47.x<=0&&_47.x>=0-this.threshold))&&((_47.y>=0&&_47.y<=this.threshold)||(_47.y<=0&&_47.y>=0-this.threshold))){this.current.x-=_47.x;this.current.y-=_47.y;}if(this.released||_47.x>this.threshold||_47.x<(0-this.threshold)||_47.y>this.threshold||_47.y<(0-this.threshold)){dbx.group=this.container;dbx.box=this.box;dbx.event=e;if(typeof dbx.onboxdrag=="undefined"||dbx.onboxdrag()){this.released=true;if(!this.restrict||!this.vertical){this.boxclone.style.left=(this.current.x-this.difference.x)+"px";}if(!this.restrict||this.vertical){this.boxclone.style.top=(this.current.y-this.difference.y)+"px";}this.moveOriginalToPosition(this.current.x,this.current.y);if(typeof e.preventDefault!="undefined"){e.preventDefault();}}}}return true;};dbxGroup.prototype.mouseup=function(e){if(this.box!=null){this.moveOriginalToPosition(e.clientX,e.clientY);this.removeCloneBox();this.getBoxOrder();if(typeof document.onselectstart!="undefined"){document.onselectstart=function(){return true;};}}this.dragok=false;};dbxGroup.prototype.keypress=function(e,_4a){if(/^(3[7-9])|(40)$/.test(e.keyCode)){this.removeTooltip();if((this.vertical&&/^(38|40)$/.test(e.keyCode))||(!this.vertical&&/^(37|39)$/.test(e.keyCode))){this.shiftBoxPosition(e,_4a,/^[3][78]$/.test(e.keyCode)?false:true);if(typeof e.preventDefault!="undefined"){e.preventDefault();}else{return false;}typeof e.stopPropagation!="undefined"?e.stopPropagation():e.cancelBubble=true;this.keydown=false;}}return true;};dbxGroup.prototype.getBoxOrder=function(){this.order=[];var len=this.eles.length;for(var j=0;j<len;j++){if(/dbx\-box/i.test(this.eles[j].className)&&!/dbx\-(clone|dummy)/i.test(this.eles[j].className)){this.order.push(this.eles[j].className.split("dbxid")[1]+(/dbx\-box\-open/i.test(this.eles[j].className)?"+":"-"));}}dbx.savedata[this.gid]=this.order.join(",");dbx.setCookieState();};dbxGroup.prototype.createClone=function(){var _4d=this.container.appendChild(arguments[0].cloneNode(true));_4d.className+=" dbx-clone";_4d.style.position="absolute";_4d.style.visibility="hidden";_4d.style.zIndex=arguments[1];_4d.style.left=arguments[2].x+"px";_4d.style.top=arguments[2].y+"px";_4d.style.width=arguments[0].offsetWidth+"px";_4d.style.height=arguments[0].offsetHeight+"px";return _4d;};dbxGroup.prototype.createCloneBox=function(box){this.box=box;this.position={"x":this.box.offsetLeft,"y":this.box.offsetTop};this.difference={"x":(this.initial.x-this.position.x),"y":(this.initial.y-this.position.y)};this.boxclone=this.createClone(this.box,30000,this.position);this.boxclone.style.cursor="move";this.dragok=true;};dbxGroup.prototype.removeCloneBox=function(){this.container.removeChild(this.boxclone);this.box.style.visibility="visible";this.box=null;};dbxGroup.prototype.moveOriginalToPosition=function(_4f,_50){var _51={"xy":this.vertical?_50-this.difference.y:_4f-this.difference.x,"wh":this.vertical?this.boxclone.offsetHeight:this.boxclone.offsetWidth};this.box.style.visibility="hidden";this.boxclone.style.visibility="visible";var len=this.boxes.length;for(var i=0;i<len;i++){var _54={"xy":this.vertical?this.boxes[i].offsetTop:this.boxes[i].offsetLeft,"wh":this.vertical?this.boxes[i].offsetHeight:this.boxes[i].offsetWidth};if((this.positive&&_51.xy+_51.wh>_54.xy&&_51.xy<_54.xy)||(!this.positive&&_51.xy<_54.xy&&_51.xy+_51.wh>_54.xy)){if(this.boxes[i]==this.box){return;}var _55=this.box.nextSibling;while(_55.className==null||!/dbx\-box/.test(_55.className)){_55=_55.nextSibling;}if(this.boxes[i]==_55){return;}if(this.resolution>0){if(this.box[this.vertical?"offsetTop":"offsetLeft"]<_54.xy){var _56=this.boxes[i].previousSibling;while(_56.className==null||!/dbx\-box/.test(_56.className)){_56=_56.previousSibling;}}else{_56=this.boxes[i];}var _57={"x":_56.offsetLeft,"y":_56.offsetTop};}var _58={"x":this.box.offsetLeft,"y":this.box.offsetTop};this.container.insertBefore(this.box,this.boxes[i]);this.initial.x+=(this.box.offsetLeft-_58.x);this.initial.y+=(this.box.offsetTop-_58.y);if(this.resolution>0&&_56!=this.box){var _59=new dbxAnimator(this,_56,_57,this.resolution,false,null);}else{}break;}}};function dbxAnimator(_5a,box,pos,res,kbd,_5f){this.caller=_5a;this.box=box;this.timer=null;var _60=pos[this.caller.vertical?"y":"x"];var _61=this.box[this.caller.vertical?"offsetTop":"offsetLeft"];if(_60!=_61){if(dbx.running>this.caller.boxes.length-1){return;}var _62=this.caller.createClone(this.box,29999,arguments[2]);_62.style.visibility="visible";this.box.style.visibility="hidden";this.animateClone(_62,_60,_61>_60?_61-_60:0-(_60-_61),this.caller.vertical?"top":"left",res,kbd,_5f);}}dbxAnimator.prototype.animateClone=function(_63,_64,_65,dir,res,kbd,_69){var _6a=this;var _6b=0;dbx.running++;this.timer=window.setInterval(function(){_6b++;_64+=_65/res;_63.style[dir]=_64+"px";if(_6b==res){window.clearTimeout(_6a.timer);_6a.timer=null;dbx.running--;_6a.caller.container.removeChild(_63);_6a.box.style.visibility="visible";if(kbd){if(_69!=null&&_69.parentNode.style.visibility!="hidden"){_69.focus();}else{if(_6a.caller.toggles){var _6c=_6a.caller.buttons[parseInt(_6a.box.className.split("dbxid")[1],10)];if(_6c!=null&&typeof _6c.isactive!="undefined"){_6c.focus();}}}}}},20);};if(typeof window.attachEvent!="undefined"){window.attachEvent("onunload",function(){var ev=["mousedown","mousemove","mouseup","mouseout","click","keydown","keyup","focus","blur","selectstart","statechange","boxdrag","boxopen","boxclose"];var el=ev.length;var dl=document.all.length;for(var i=0;i<dl;i++){for(var j=0;j<el;j++){document.all[i]["on"+ev[j]]=null;}}});}