function insertParagraph(text) {
    var str = "<p>";
    str += text;
    str += "</p>";
    document.write(str);
}
insertParagraph("This is inserted");


var add_p_with_innerHTML = function() {
    var testdiv = document.getElementById("testdiv");
    testdiv.innerHTML = "<p>This is <em>my</em> content.</p>";
};

var create_p = function() {
    var para = document.createElement("p");
    // var info = "nodeName: ";
    // info += para.nodeName;
    // info += " nodeType: ";
    // info += para.nodeType;
    // alert(info);
    var testdivwithcreate = document.getElementById("testdivwithcreate");
    testdivwithcreate.appendChild(para);
    var text = document.createTextNode("I created by createTextNode");
    para.appendChild(text);



}

var add_complex_p_with_dom = function() {
    var emphasis = document.createElement("em");
    var e_text = document.createTextNode("Lan");
    emphasis.appendChild(e_text);
    var text1 = document.createTextNode("Hello,");
    var text2 = document.createTextNode("zhiheng");
    var para = document.createElement("p");
    para.appendChild(text1);
    para.appendChild(emphasis);
    para.appendChild(text2);
    var divobject = document.getElementById("testdivwithcreate");
    divobject.appendChild(para);
};

window.onload = function () {
    add_p_with_innerHTML();
    create_p();
    add_complex_p_with_dom();
};



