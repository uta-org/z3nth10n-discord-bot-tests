// var count = [];
var internalCounter = 0;
var digits = 2;
// var max_digits = 6;

var interval;
var is_started = false;

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

	$("#add-hit").on('click', function() {
		addHit();
	});

	$("#start").on('click', function() {
		if(is_started)
			stop();
		else
			start();
	});

	$("#animate").on('click', function() {
		// clearInterval(interval);
		animateAt();
	});
});

function start() {
	interval = setInterval(function() {
		addHit();
	}, 1000);

	$("#start").text("Stop!");
	is_started = true;
}

function stop() {
	clearInterval(interval);

	$("#start").text("Start!");
	is_started = false;
}

function addHit() {
	var sdigits = splitDigits(internalCounter);
	console.log(sdigits);

	for (var i = 1; i <= digits; i++) 
	{
		var index = digits - i;

		console.log(getClassName(index) + ": " + sdigits[i - 1]);

		if(internalCounter > 0)
			animate(index, sdigits[i - 1]);
	}

	// For test
	$("#counter").text(internalCounter);
	internalCounter++;

	// Reset counter if it's overflowed
	if(Math.pow(10, digits) <= internalCounter)
		internalCounter = 0;
}

function resetAll() {
	// Doesn't work!

	for (var i = 0; i < digits; i++) 
	{
		var upperChild = getUpperChild(i);

		// console.log(upperChild);
		// console.log(upperChild.find('.animate'));

		upperChild.find('.animate').removeClass('animate');
		upperChild.find('.shown').removeClass('shown');
	}	
}

function animateAt() {
	// var count = internalCounter;

	resetAll();

	internalCounter = parseInt($("#animate-at").val());
	addHit();

	// internalCounter = count;
}

function splitDigits(n) {
	var str = n.toString();

	var diff = digits - str.length;
	str = diff >= 0 ? "0".repeat(diff) + str : str;

	return str.split("");
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

	if(index == 0) index = 10; // Reset

	var prevChild = getChild($(sel), --index);
	var prev2Child = getChild($(sel), --index);

	// 0, 0
	// nums-ten: data-num=9 --> class=animate && data-num=0 --> class=shown
	// nums-one: data-num=9 --> class=animate && data-num=0 --> class=shown

	// 0, 1
	// nums-ten: data-num=9 --> class=animate && data-num=0 --> class=shown
	// nums-one: data-num=0 --> class=animate && data-num=1 --> class=shown

	prevChild.addClass('animate');
	child.addClass('shown');


	if(nums_index == 0)
		delayedRemoveClass(prev2Child, 'animate');
	else
		prev2Child.removeClass('animate');

	prevChild.removeClass('shown');

	// console.log(getCount());
}

function delayedRemoveClass(el, className, timeout = 1000) {
	setTimeout(function() {
       el.removeClass(className);
   }, timeout);
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