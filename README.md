## mf.js Javascript Library

##### A Very Basic Javascript Library.

#### Where can I get this?

	http://redorkulated.github.io/mf.js/mf.js
	... or ...
	<script type="text/javascript" src="http://redorkulated.github.io/mf.js/mf.js"></script>


#### What's in this Library ?

##### Basic Elements

`$(string ID)` - Returns the element `<ID>`
>Returns`DOMElement` (Alias of `document.getElementByID`)

`$$(string ObjID,string Tag)` - Returns the elements with tag `<Tag>` in `<ObjID>`
>Returns `DOMElement Array` (Alias of`$(<ObjID>).getElementByTagName`)

`$x(DOMElement Obj,string Tag)` - Returns the elements with tag`<Tag>`in`<Obj>`
>Returns `DOMElement Array` (Alias of `<Obj>.getElementByTagName`)

##### Ajax - Supports multiple connections at once

`$Ajax.New(string URL,[string HTTPMethod])` - Opens a new Ajax connection
>Returns `RequestID`

`$Ajax.Send(RequestID ID,callback Function,[string POSTContent])` - Sends request
>Returns`nothing`

>Callback function receives `callback(DOMElementTree,RequestID)`.

>If HTTP Method was HEAD, callback function receives `callback(HTTPStatus,RequestID)`.

`$Ajax.Header(RequestID ID,[string Header,[string Value]])` - Read & Write Headers
>On Error : Returns`false`.

>Passing only RequestID : Returns response headers `string Array('HeaderName'=>Value,...)`.

>Passing RequestID & Header : Returns response header `string`.

>Passing RequestID, Header & Value  : Sets the request header `<Header>`.

`$Ajax.Close(RequestID ID)` - Stops request & destroys request object
>Returns `nothing`

`$Ajax.Stop(RequestID ID)` - Stops request
>Returns `nothing`

`$Ajax.ResponseXML(RequestID ID)` - Fetches XML DomTree
>Returns `DOMElementTree` or `false` on error

`$Ajax.ResponseText(RequestID ID)` - Returns contents of response text
>Returns `string` or `false` on error

`$Ajax.Status(RequestID ID)` - Returns HTTP Response Status Code
>Returns`integer` or `false` on error

`$Ajax.State(RequestID ID)` - Returns the current status of `<RequestID>`
>Returns `integer $Ajax.States`

`$Ajax.Error(RequestID ID)` - Returns the current error text for `<RequestID>`
>Returns `string` or `false` if no error

`$Ajax.Headers(RequestID ID,[string Header,[string Value]])`
>Alias of `$Ajax.Header(...)`

`$Ajax.SetHeader(RequestID ID,[string Header,[string Value]])`
>Alias of `$Ajax.Header(...)`

Some Example Ajax Requests:

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
