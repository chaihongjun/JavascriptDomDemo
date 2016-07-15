function getNewContent() {
    var request = getHTTPObject();
    if (request) {
	// request.open("GET", "http://www.baidu.com", true);
	request.open("GET", "ajax.txt", true);
	request.onreadystatechange = function() {
	    if (request.readyState == 4) {
		alert("Response Received");
		var para = document.createElement("p");
		var txt = document.createTextNode(request.responseText);
		para.appendChild(txt);
		document.getElementById('new').appendChild(para);
	    }

	};
	request.send(null);
    } else {
	alert('Sorry, your brower doesn\'t support XMLHttpRequest');
    }
    alert("Function Done");
}

document.getElementById("btn").onclick = function() {
    getNewContent();
    return false;
};
// addLoadEvent(getNewContent);
