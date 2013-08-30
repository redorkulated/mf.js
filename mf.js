/**
* mf.js
* @package com.mf89.js
* @author Michael Fallows <michael@fallo.ws>
* @version 2.1
*/
/* Basics */
function $(i){ return document.getElementById(i); }
function $$(i,t){ return $(i).getElementsByTagName(t); }
function $x(i,t){ return i.getElementsByTagName(t); }

/* Ajax */
var $Ajax= {
	States: {None:0,Open:1,Sent:2,Received:3,ReceivedError:4,Closed:5},
	_BlankRequest: function(){ return {
		Core: function (){ var x= new XMLHttpRequest(); x.overrideMimeType("text/xml"); return x; }(),
		ID: 0, Method: "NONE", URL: "::", Error: false, State: 0
	}; },
	_NextRequest: 0, _RequestStack: [],
	New: function(URL,method){
		var R= new this._BlankRequest; R.ID= this._NextRequest++;
		method= (!method?"GET":method.toUpperCase()); if(method != "GET" && method != "POST" && method != "HEAD"){ method="ERROR"; }
		if(URL.match(/\?/)){ URL+="&" + Math.random(); }else{ URL+="?" + Math.random(); }
		this._RequestStack[R.ID]= R;
		this._RequestStack[R.ID].Method= method;
		this._RequestStack[R.ID].URL= URL;
		this._RequestStack[R.ID].Core._Ajax= this;
		this._RequestStack[R.ID].Core._Parent= this._RequestStack[R.ID];
		this._RequestStack[R.ID].State= this.States.Open;
		this._RequestStack[R.ID].Core.open(method,URL,true);
		return R.ID;
	},
	Send: function(R,functionCallback,content){
		if(this._RequestStack[R]){
			if(!functionCallback){
				this._RequestStack[R].ErrorText="$Ajax.send callback function not found";
				console.log("Error with $Ajax Request #"+ R + " : $Ajax.send callback function not found");
				return false;
			}
			if(this._RequestStack[R].Method == "HEAD"){ //Head request, will return no content just headers/status
				this._RequestStack[R].Core.onreadystatechange= function(){
					if(this.readyState == 4){
						this._Parent.State= this._Ajax.States.Received;
						functionCallback(this.status,this._Parent.ID);
					}
				};
				content="";
			}else{
				if(!content){ content= null; }
				this._RequestStack[R].Core.onreadystatechange= function(){
					if(this.readyState == 4){
						this._Parent.State= this._Ajax.States.Received;
						functionCallback(this.responseXML,this._Parent.ID);
					}
				};
			}
			this._RequestStack[R].State= this.States.Sent;
			try{ this._RequestStack[R].Core.send(content); } catch(e){
				this._RequestStack[R].ErrorText= e;
				this._RequestStack[R].State= this.States.ReceivedError;
				console.log("Error with $Ajax Request #"+ R + " : "+ e);
				functionCallback(false,R);
			}
		}
	},
	Header: function (R,H,V){
		if(!this._RequestStack[R]){ return false; }
		if(this._RequestStack[R].State != this.States.Received && this._RequestStack[R].State != this.States.Open){ this._RequestStack[R].ErrorText="Wrong State"; return false; }
		if(H){
			if(!V && this._RequestStack[R].State == this.States.Received){ return this._RequestStack[R].Core.getResponseHeader(H); }
			else if(V && this._RequestStack[R].State == this.States.Open){
				this._RequestStack[R].Core.setRequestHeader(H,V);
				return true;
			}
			this._RequestStack[R].ErrorText="Wrong State"; return false;
		}else if(this._RequestStack[R].State == this.States.Received){
			var oh= this._RequestStack[R].Core.getAllResponseHeaders().split("\n");
			var nh= []; var tt;
			for(i=0;i<oh.length;i++){
				var t= oh[i].split(": "); if(t[0] != ""){ var tt= t.shift();nh[tt]= t.join(": "); }
			}
			return nh;
		}
		this._RequestStack[R].ErrorText="Wrong State"; return false;
	},
	Close: function (R){ if(this._RequestStack[R]){ this.Stop(R); this._RequestStack[R]= null; } },
	Stop: function (R){	if(this._RequestStack[R]){ this._RequestStack[R].Core.abort(); } },
	ResponseXML: function (R){ return (this._RequestStack[R] && (this._RequestStack[R].State == this.States.Received || this._RequestStack[R].State != this.States.ReceivedError)?this._RequestStack[R].Core.responseXML:false); },
	ResponseText: function (R){ return (this._RequestStack[R] && (this._RequestStack[R].State == this.States.Received || this._RequestStack[R].State != this.States.ReceivedError)?this._RequestStack[R].Core.responseText:false); },
	Status: function (R){ return (this._RequestStack[R] && (this._RequestStack[R].State == this.States.Received || this._RequestStack[R].State != this.States.ReceivedError)?this._RequestStack[R].Core.status:false); },
	Headers: function (R,H,V){ return this.Header(R,H,V); },
	SetHeader: function (R,H,V){ return this.Header(R,H,V); },
	State: function (R){ return (this._RequestStack[R]?this._RequestStack[R].State:this.States.Closed); },
	ErrorText: function (R){ return (this._RequestStack[R]?this._RequestStack[R].ErrorText:false); }
};
window.$Ajax= $Ajax;
