/* mf.js scripts */

/* Basics */
function $(i){ return document.getElementById(i); }
function $$(i,t){ return $(i).getElementsByTagName(t); }
function $x(i,t){ return i.getElementsByTagName(t); }

/* Ajax Version 1.1 */
function Ajax_getHttpObject(){
  var xmlhttp;
  /*@cc_on
  @if(@_jscript_version >= 5){
    try{
      xmlhttp= new ActiveXObject("Msxml2.XMLHTTP");
    } catch(e) {
      try{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }catch(E){
        xmlhttp=false;
      }
    }
  }
  @else
  xmlhttp=false;
  @end @*/
  if(!xmlhttp && typeof XMLHttpRequest != undefined){
    try{
      xmlhttp=new XMLHttpRequest();
      xmlhttp.overrideMimeType("text/xml");
    }catch(e){
      xmlhttp=false;
    }
  }
  return xmlhttp;
} ServerAjaxTalk= Ajax_getHttpObject();
function $open(URL,method){ return Ajax_open(URL,method); }
function Ajax_open(URL,method){
	if(!method){ var method="GET"; }else{ method= method.toUpperCase(); } if((method != "GET")&&(method != "POST")&&(method != "HEAD")){ method="ERROR"; }
	var urlEsc= escape(URL);
	if(urlEsc.match("%3F")){ URL+="&" + Math.random(); }else{ URL+="?" + Math.random(); }
	ServerAjaxTalk.open(method, URL, true);
}
function $send(functionName,content){ return Ajax_send(functionName,content); }
function Ajax_send(functionName,content){
	if(!content){ content=null; }
	if(functionName == "HEAD"){ //Must be head request
		if(content){ ServerAjaxTalk.onreadystatechange= function(){ if(ServerAjaxTalk.readyState==4){ eval(content +"(Ajax_getHttpStatus());"); } }; }
		ServerAjaxTalk.send("");
	}else{
		ServerAjaxTalk.onreadystatechange= function(){ if((ServerAjaxTalk.readyState==4)&&(ServerAjaxTalk.responseXML)){ eval(functionName +"(ServerAjaxTalk.responseXML);"); } };
		ServerAjaxTalk.send(content);
	}

}
function $stop(){ return Ajax_stop(); }
function Ajax_stop(){
	ServerAjaxTalk.abort();
}
function $header(header){ return Ajax_getHeader(header); }
function Ajax_getHeader(header){
	if(header){
		return ServerAjaxTalk.getResponseHeader(header);
	}else{
		var Headers= escape(ServerAjaxTalk.getAllResponseHeaders());
		Headers= Headers.split("%0A");

		var list= Array(); var out= Array();
		var p=0;
		for(i=0;i<Headers.length;i++){
			var thisRow= Headers[i].split("%3A%20");
			thisRow[0]= unescape(thisRow[0]); thisRow[1]= unescape(thisRow[1]);
			if(thisRow[0] != ""){
				out[thisRow[0]]= thisRow[1];
				list[p++]= thisRow[0];
			}
		}
		return out;
	}
}
function $headers(header){ return Ajax_getHeader(); } 
function Ajax_getHeaders(){ return Ajax_getHeader(); }
function $setHeader(header,TxtValue){ return Ajax_setHeader(header,TxtValue); }
function Ajax_setHeader(header,TxtValue){
	ServerAjaxTalk.setRequestHeader(header,TxtValue);
}
function $status(header){ return Ajax_getHttpStatus(); } 
function Ajax_getHttpStatus(){
	return ServerAjaxTalk.status;
}

