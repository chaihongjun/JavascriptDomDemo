// 检查input 支持的类型
function inputSupportType(type) {
    if (!document.createElement) return false;
    var input = document.createElement('input');
    input.setAttribute('type', type);
    if (input.type == 'text' && type != 'text') {
	return false;
    } else {
	return true;
    }
}

if (inputSupportType('date')) {
    console.log("input element support date");
}

function elementSupportsAttribute(elementName, attribute) {
    if (!document.createElement) return false;
    var temp = document.createElement(elementName);
    return (attribute in temp);
}


if (Modernizr.input.placeholder) {
    console.log("I am support placeholder");
// 不支持占位符的情况下实现占位符效果
} else {
    console.log("I am support placeholder");
    var input = document.getElementById('first-name');
    input.onfocus = function() {
	// 如果目前对话框里面的值就跟placeholder设置的一样的话，就会清空
	var text = this.placeholder || this.getAttribute('placeholder');
	if (this.value == text) {
	    this.value = '';
	}
    };

    input.onblur = function() {
	if (this.value == '') {
	    this.value = this.placeholder || this.getAttribute('placeholder');
	}
    };
    input.onblur();
}


