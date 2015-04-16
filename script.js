if(typeof(Storage) === "undefined") {
	alert("Hello Gramps! You're using a too old version for using the configuration-storage support.");
}

function updateBinRow(dec) {
	var str = dec.toString(2);
	if (localStorage.bitSel == 'autob') {
		if (str.length > 32) {
			bitSelect('64b', true);
		} else if (str.length > 16) {
			bitSelect('32b', true);
		} else if (str.length > 8) {
			bitSelect('16b', true);
		} else {
			bitSelect('8b', true);
		}
	}
	for (i = 0; i <= 63; i++) {
		if (str.length) {
			$('.bit-' + i).html(str.substring(str.length - 1));
			if (str.substring(str.length - 1) == 1)
				$('.bit-' + i).addClass("btn-info");
			else
				$('.bit-' + i).removeClass("btn-info");
			str = str.slice(0, - 1);
		} else {
			$('.bit-' + i).html(0);
			$('.bit-' + i).removeClass("btn-info");
		}
	}
}

function bitSelect(bits, auto) {
	$('.bit-64b > div').hide();
	$('.bit-' + bits + ' > div').show();

	if (localStorage.bitSel == 'autob' && auto) {
		$('.bitSelWrap').html('Auto (' + $('#' + bits).html() + ')');
	} else {
		$('.bitSelWrap').html($('#' + bits).html());
		$('ul.dropdown-menu li.active').removeClass('active');
		$('#' + bits).parent('li').addClass('active');
		localStorage.bitSel = bits;
		if (bits == 'autob') {
			updateBinRow(bigInt($('#decInput').val().replace(/[^0-9]/g,"")) || 0);
		}
	}
}

function hexSet(dec) {
	$('#hexInput').val(dec.toString(16).toUpperCase());
}

function octSet(dec) {
	$('#octInput').val(dec.toString(8));
}

function decSet(dec) {
	$('#decInput').val(dec.toString());
}

function binSet(dec) {
	var bin = dec.toString(2);
	$('#binInput').val(bin);
	$('.1-count').html((bin.match(/1/g) || []).length);
}

$(function() {
	if (!localStorage.bitSel) {
		localStorage.bitSel = 'autob';
	}
	bitSelect(localStorage.bitSel, false);
	$('#64b, #32b, #16b, #8b, #autob').on('click', function(e) {
		e.preventDefault();
		bitSelect($(this).attr('id'), false);
	});

	if (localStorage.lastVal && parseInt(localStorage.lastVal, 10)) {
		val = parseInt(localStorage.lastVal, 10)
		hexSet(bigInt(val));
		decSet(bigInt(val));
		octSet(bigInt(val));
		binSet(bigInt(val));
		updateBinRow(bigInt(val));
	}

	$('#binInput').on('keyup', function() {
		var bin = $(this).val().replace(/[^01]/g,"");
		var dec = parseInt(bin, 2) || 0;
		$('.1-count').html((bin.match(/1/g) || []).length);
		localStorage.lastVal = dec;
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		updateBinRow(dec);
	});

	$('#decInput').on('keyup', function() {
		var dec = bigInt($(this).val().replace(/[^0-9]/g,"")) || 0;
		localStorage.lastVal = dec;
		hexSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('#octInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^0-7]/g,""), 8) || 0;
		localStorage.lastVal = dec;
		hexSet(dec);
		decSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('#hexInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^a-f0-9]/gi,""), 16) || 0;
		localStorage.lastVal = dec;
		decSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('.btn-bit').on('click', function(e) {
		e.preventDefault();

		if ($(this).html() == '1') {
			$(this).html('0');
			$(this).removeClass("btn-info");
		} else {
			$(this).html('1');
			$(this).addClass("btn-info");
		}

		binStr = "";
		for (i = 63; i >= 0 ; i--) {
			binStr += $('.bit-' + i).html();
		}
		var dec = parseInt(binStr, 2);
		localStorage.lastVal = dec;
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		binSet(dec);
	});

	$('.btn-oper-all-one').on('click', function(e) {
		dec = bigInt("2").pow(64).subtract(1);
		localStorage.lastVal = dec.toString();
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('.btn-oper-all-zero').on('click', function(e) {
		var dec = parseInt("000000000000", 16);
		localStorage.lastVal = dec;
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('.btn-oper-invert').on('click', function(e) {
		var dec = localStorage.lastVal;
		dec = dec ^ parseInt("FFFFFFFFFFFFF", 16);
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});



});
