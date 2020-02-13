// var count = [];
var internalCounter = 0;
var digits = 2;
// var max_digits = 6;

$(document).ready(function() {
	for (var i = 0; i < digits; i++) {
		// count[] = 0;

		var divNums = $("<div></div>");
		divNums.addClass("nums "+getClassName(i));

		for (var j = 0; j < 10; j++) {
			divNums.append(createDiv(j));
		}

		$("#container").prepend(divNums);
	}

	var interval = setInterval(function() {
		addHit();
	}, 1000);

	$("#stop").on('click', function() {
		clearInterval(interval);
	});
});

function addHit() {
	/*
	// Reset counter
	if(count > 9) {
		count = 0;
	}

	//  0 == unidades
	//  1 == decenas
	animate(0, count++);
	*/

	var sdigits = splitDigits(internalCounter);
	console.log(sdigits);

	for (var i = 0; i < digits; i++) {
		animate(i, sdigits[i]);
	}

	internalCounter++;
}

function splitDigits(n) {
	var str = n.toString();

	var diff = digits - n.length;
	str = diff >= 0 ? "0".repeat() : str;

	return (""+str).split("");
}

function getUpperChild(index) {
	return $("#container > div:nth-child("+(index+1)+")");
}

// Only for test
function getCount() {
	var _count = 0;

	for (var i = 0; i < digits; i++) {
		var child = getUpperChild(i).find(".animate").data("num");
		_count += parseInt("0".repeat(i));		
	}

	return _count;
}

function getClassName(nums_index) {
	switch(nums_index) {
		case 0:
			return "nums-one";

		case 1:
			return "nums-ten";

		case 2:
			return "nums-hundreds";

		case 3:
			return "nums-thousands";

		case 4:
			return "nums-ten-thousands";

		case 5:
			return "nums-hundred-thousands";

		case 6:
			return "nums-millions";	
	}

	return "";
}

function createDiv(index) {
	var _class = "num";
	if(index == 0) _class += " shown";

	return $("<div data-num='"+(index++)+"' data-num-next='"+(index == 10 ? 0 : index)+"' class='"+_class+"'></div>");
}

function animate(nums_index, index) {
	var sel = "."+getClassName(nums_index);
	var child = getChild($(sel), index);
	var nextChild = getChild($(sel), index == 9 ? 0 : index + 1);
	var prevChild = getChild($(sel), index == 0 ? 9 : --index);

	// Reset counter
	// if(index == -1) index = 9;

	// Show animate and the next child will be shown class
	nextChild.addClass('shown');

	prevChild.removeClass('shown');
	delayedRemoveClass(prevChild, 'animate');
	// prevChild.removeClass('animate');

	child.addClass("animate");
	child.removeClass('shown');

	console.log(getCount());
}

function delayedRemoveClass(el, className, timeout = 1000) {
	setTimeout(function() {
       el.removeClass(className);
   }, 800);
}

function getChild(el, index) {
	return el.children().eq(index);
}

function show(el) {
	// show immediately.
	el.css("display", "initial");
}

function hide(el) {
	// hide immediately.
	el.css("display", "none");
}

/*
setTimeout(function() {
	animate(0, 0);
}, 2000);
*/