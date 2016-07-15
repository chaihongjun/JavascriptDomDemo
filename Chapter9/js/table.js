function setTableRowColor() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i ++) {
	var odd = false;
	var allTrInTable = tables[0].getElementsByTagName("tr");
	for (var j = 0; j < allTrInTable.length; j ++) {
	    if(odd == true) {
		var current = allTrInTable[j];
		addClass(current, "intro");
		odd = false;
	    }else {
		odd = true;
	    }
	}
    }
}

function hightlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
	rows[i].onmouseover = function() {
	    this.style.fontWeight = "bold";
	    this.style.color = "blue";
	};
	rows[i].onmouseout = function() {
	    this.style.color = "black";
	    this.style.fontWeight = "normal";
	};
    }
}


addLoadEvent(setTableRowColor);
addLoadEvent(hightlightRows);
