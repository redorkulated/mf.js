## mf.js Javascript Library

##### A Very Basic Javascript Library.

### Where can I get this?

	http://redorkulated.github.io/mf.js/mf.js
	... or ...
	<script type="text/javascript" src="http://redorkulated.github.io/mf.js/mf.js"></script>


#### What's in this Library ?

##### Basic Elements

`$(string ID)` - Returns the element `<ID>`
<small style="padding:0 2em;display:block;">Returns`DOMElement` (Alias of `document.getElementByID`)</small>

`$$(string ObjID,string Tag)` - Returns the elements with tag `<Tag>` in `<ObjID>`
<small style="padding:0 2em;display:block;">Returns `DOMElement Array` (Alias of`$(<ObjID>).getElementByTagName`)</small>

`$x(DOMElement Obj,string Tag)` - Returns the elements with tag`<Tag>`in`<Obj>`
<small style="padding:0 2em;display:block;">Returns `DOMElement Array` (Alias of `<Obj>.getElementByTagName`)</small>

##### Ajax - Supports multiple connections at once

`$Ajax.New(string URL,[string HTTPMethod])` - Opens a new Ajax connection
<small style="padding:0 2em;display:block;">Returns `RequestID`</small>

`$Ajax.Send(RequestID ID,callback Function,[string POSTContent])` - Sends request
<small style="padding:0 2em;display:block;">Returns`nothing`</small>
<small style="padding:0 2em;display:block;">Callback function receives `callback(DOMElementTree,RequestID)`.</small><small style="padding:0 2em;display:block;">If HTTP Method was HEAD, callback function receives `callback(HTTPStatus,RequestID)`.</small>

`$Ajax.Header(RequestID ID,[string Header,[string Value]])` - Read & Write Headers
<small style="padding:0 2em;display:block;">On Error : Returns`false`.</small>
<small style="padding:0 2em;display:block;">Passing only RequestID : Returns response headers `string Array('HeaderName'=>Value,...)`.</small>
<small style="padding:0 2em;display:block;">Passing RequestID & Header : Returns response header `string`.</small>
<small style="padding:0 2em;display:block;">Passing RequestID, Header & Value  : Sets the request header `<Header>`.</small>

`$Ajax.Close(RequestID ID)` - Stops request & destroys request object
<small style="padding:0 2em;display:block;">Returns `nothing`</small>

`$Ajax.Stop(RequestID ID)` - Stops request
<small style="padding:0 2em;display:block;">Returns `nothing`</small>

`$Ajax.ResponseXML(RequestID ID)` - Fetches XML DomTree
<small style="padding:0 2em;display:block;">Returns `DOMElementTree` or `false` on error</small>

`$Ajax.ResponseText(RequestID ID)` - Returns contents of response text
<small style="padding:0 2em;display:block;">Returns `string` or `false` on error</small>

`$Ajax.Status(RequestID ID)` - Returns HTTP Response Status Code
<small style="padding:0 2em;display:block;">Returns`integer` or `false` on error</small>

`$Ajax.State(RequestID ID)` - Returns the current status of `<RequestID>`
<small style="padding:0 2em;display:block;">Returns `integer $Ajax.States`</small>

`$Ajax.Error(RequestID ID)` - Returns the current error text for `<RequestID>`
<small style="padding:0 2em;display:block;">Returns `string` or `false` if no error</small>

`$Ajax.Headers(RequestID ID,[string Header,[string Value]])`
<small style="padding:0 2em;display:block;">Alias of `$Ajax.Header(...)`</small>

`$Ajax.SetHeader(RequestID ID,[string Header,[string Value]])`
<small style="padding:0 2em;display:block;">Alias of `$Ajax.Header(...)`</small>


	// Example Ajax Requests
		function RunMe(){
			$Ajax.Send($Ajax.New('test.xml'),YouFoundMe);
			$Ajax.Send($Ajax.New('testXML.php','POST'),YouFoundMe,'test=42');
			$Ajax.Send($Ajax.New('test3.xml','HEAD'),YouFoundMe);
		}
		function YouFoundMe(XML,RequestID){
			console.log("Received Request "+ RequestID);
			console.log($Ajax.Status(RequestID),$Ajax.Header(RequestID,"ETag"));
			$Ajax.Close(RequestID);
		}
