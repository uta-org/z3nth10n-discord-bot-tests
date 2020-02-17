function Counter(obj) {
	this.internalCounter = 0;
	this.digits = 2;
	this.interval = null;
	this.is_started = false;

	this.attach = function() {
		for (var i = 0; i < this.digits; i++) {
			// count[] = 0;

			var divNums = $("<div></div>");
			divNums.addClass("nums "+this.getClassName(i));

			for (var j = 0; j < 10; j++) {
				divNums.append(this.createDiv(j));
			}

			this.element.prepend(divNums);
		}

		$("#add-hit").on('click', function() {
			this.addHit();
		}.bind(this));

		$("#start").on('click', function() {
			if(this.is_started)
				this.stop();
			else
				this.start();
		}.bind(this));

		$("#animate").on('click', function() {
			// clearInterval(interval);
			this.animateAt();
		}.bind(this));
	};

	this.start = function() {
		this.interval = setInterval(function() {
			this.addHit();
		}.bind(this), 1000);

		$("#start").text("Stop!");
		this.is_started = true;
	};

	this.stop = function() {
		clearInterval(interval);

		$("#start").text("Start!");
		this.is_started = false;
	};

	this.addHit = function() {
		var sdigits = this.splitDigits(this.internalCounter);
		// console.log(sdigits);

		for (var i = 1; i <= this.digits; i++) 
		{
			var index = this.digits - i;

			// console.log(this.getClassName(index) + ": " + sdigits[i - 1]);

			if(this.internalCounter > 0)
				this.animate(index, sdigits[i - 1]);
		}

		// For test
		$("#counter").text(this.internalCounter);
		this.internalCounter++;

		// Reset counter if it's overflowed
		if(Math.pow(10, this.digits) <= this.internalCounter)
			this.internalCounter = 0;
	};

	this.resetAll = function() {
		// Doesn't work!

		for (var i = 0; i < digits; i++) 
		{
			var upperChild = getUpperChild(i);

			// console.log(upperChild);
			// console.log(upperChild.find('.animate'));

			upperChild.find('.animate').removeClass('animate');
			upperChild.find('.shown').removeClass('shown');
		}	
	};

	this.animateAt = function() {
		// var count = internalCounter;

		this.resetAll();

		this.internalCounter = parseInt($("#animate-at").val());
		this.addHit();

		// internalCounter = count;
	};

	this.splitDigits = function(n) {
		var str = n.toString();

		var diff = this.digits - str.length;
		str = diff >= 0 ? "0".repeat(diff) + str : str;

		return str.split("");
	};

	this.getUpperChild = function(index) {
		return $("#container > div:nth-child("+(index+1)+")");
	};

	// Only for test
	this.getCount = function() {
		var _count = 0;

		for (var i = 0; i < digits; i++) {
			var child = this.getUpperChild(i).find(".animate").data("num");
			_count += parseInt("0".repeat(i));		
		}

		return _count;
	};

	this.getClassName = function(nums_index) {
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
	};

	this.createDiv = function(index) {
		var _class = "num";
		if(index == 0) _class += " shown";

		return $("<div data-num='"+(index++)+"' data-num-next='"+(index == 10 ? 0 : index)+"' class='"+_class+"'></div>");
	};

	this.animate = function(nums_index, index) {
		var sel = "."+this.getClassName(nums_index);
		var child = this.getChild($(sel), index);

		if(index == 0) index = 10; // Reset

		var prevChild = this.getChild($(sel), --index);
		var prev2Child = this.getChild($(sel), --index);

		// 0, 0
		// nums-ten: data-num=9 --> class=animate && data-num=0 --> class=shown
		// nums-one: data-num=9 --> class=animate && data-num=0 --> class=shown

		// 0, 1
		// nums-ten: data-num=9 --> class=animate && data-num=0 --> class=shown
		// nums-one: data-num=0 --> class=animate && data-num=1 --> class=shown

		prevChild.addClass('animate');
		child.addClass('shown');


		if(nums_index == 0)
			this.delayedRemoveClass(prev2Child, 'animate');
		else
			prev2Child.removeClass('animate');

		prevChild.removeClass('shown');

		// console.log(getCount());
	};

	this.delayedRemoveClass = function(el, className, timeout = 1000) {
		setTimeout(function() {
	       el.removeClass(className);
	   }, timeout);
	};

	this.getChild = function(el, index) {
		return el.children().eq(index);
	};

	this.show = function(el) {
		// show immediately.
		el.css("display", "initial");
	};

	this.hide = function(el) {
		// hide immediately.
		el.css("display", "none");
	};

	this.element = obj.element;
	this.attach();

	// TODO: Add styles
}