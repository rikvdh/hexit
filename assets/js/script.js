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
			updateBinRow(bigInt($('#decInput').val().replace(/[^0-9]/g,"")));
		}
	}
}

function hexSet(bignum) {
	$('#hexInput').val(bignum.toString(16).toUpperCase());
}

function octSet(bignum) {
	$('#octInput').val(bignum.toString(8));
}

function decSet(bignum) {
	$('#decInput').val(bignum.toString());
}

function binSet(bignum) {
	var bin = bignum.toString(2);
	$('#binInput').val(bin);
	$('.1-count').html((bin.match(/1/g) || []).length);
}

function allSet(bignum) {
	hexSet(bignum);
	octSet(bignum);
	decSet(bignum);
	binSet(bignum);
	updateBinRow(bignum);
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

	if (localStorage.lastVal) {
		allSet(bigInt(localStorage.lastVal));
	}

	$('#binInput').on('keyup', function() {
		var bin = $(this).val().replace(/[^01]/g,"");
		var dec = bigInt(bin, 2);
		$('.1-count').html((bin.match(/1/g) || []).length);
		localStorage.lastVal = dec.toString();
		hexSet(dec);
		decSet(dec);
		octSet(dec);
		updateBinRow(dec);
	});

	$('#decInput').on('keyup', function() {
		var dec = bigInt($(this).val().replace(/[^0-9]/g,""));
		localStorage.lastVal = dec.toString();
		hexSet(dec);
		octSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('#octInput').on('keyup', function() {
		var dec = bigInt($(this).val().replace(/[^0-7]/g,""), 8);
		localStorage.lastVal = dec.toString();
		hexSet(dec);
		decSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('#hexInput').on('keyup', function() {
		var dec = bigInt($(this).val().replace(/[^a-f0-9]/gi,""), 16);
		localStorage.lastVal = dec.toString();
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
		var dec = bigInt(binStr, 2);
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-bit-grouping').on('click', function(e) {
		var cfg = $.parseJSON($('#bit-grouping-cfg').val());
		for (group in cfg) {
			var name      = cfg[group]['name'];
			var bitGroups = cfg[group]['bit'].split(cfg[group]['bit'], ";");
			var color     = cfg[group]['color'];

			for (g = 0; g <= bitGroups.length; g++) {
				b = cfg[group]['bit'].split("-");
				for (bit = b[0]; bit <= b[1]; bit++) {
					$('.bit-' + bit + '-hdr').text(name);
					$('.bit-' + bit + '-hdr').css("background-color", color);
				}
			}
		}
	});

	$('.btn-oper-all-one').on('click', function(e) {
		dec = bigInt("FFFFFFFFFFFFFFFF", 16);
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-oper-all-zero').on('click', function(e) {
		var dec = bigInt("0");
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-oper-invert').on('click', function(e) {
		var dec = bigInt(localStorage.lastVal).xor(bigInt("FFFFFFFFFFFFFFFF", 16));
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-oper-shift-left').on('click', function (e) {
		var dec = bigInt(localStorage.lastVal).shiftLeft(1);
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-oper-shift-right').on('click', function (e) {
		var dec = bigInt(localStorage.lastVal).shiftRight(1);
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

	$('.btn-oper-reverse').on('click', function (e) {
		var bitVal = bigInt(localStorage.lastVal).toString(2);
		bitVal = (bitVal.split("").reverse().join("") + "0000000000000000000000000000000000000000000000000000000000000000").substring(0,64);
		var dec = bigInt(bitVal, 2);
		localStorage.lastVal = dec.toString();
		allSet(dec);
	});

});
