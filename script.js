if(typeof(Storage) === "undefined") {
	alert("Hello Gramps! You're using a too old version for using the configuration-storage support.");
}

function updateBinRow(dec) {
	var str = dec.toString(2);
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

function bitSelect(bits) {
	$('.bit-64b > div').hide();
	$('.bit-' + bits + ' > div').show();
	$('ul.nav li.active').removeClass('active');
	$('#' + bits).parent('li').addClass('active');
	localStorage.bitSel = bits;
}

function hexSet(dec) {
	$('#hexInput').val(dec.toString(16).toUpperCase());
}

function decSet(dec) {
	$('#decInput').val(dec);
}

function binSet(dec) {
	var bin = dec.toString(2);
	$('#binInput').val(bin);
	$('.1-count').html((bin.match(/1/g) || []).length);
}

$(function() {
	if (!localStorage.bitSel) {
		localStorage.bitSel = '32b';
	}
	bitSelect(localStorage.bitSel);
	$('#64b, #32b, #16b, #8b').on('click', function(e) {
		e.preventDefault();
		bitSelect($(this).attr('id'));
	});

	if (localStorage.lastVal && parseInt(localStorage.lastVal, 10)) {
		val = parseInt(localStorage.lastVal, 10)
		decSet(val);
		hexSet(val);
		binSet(val);
		updateBinRow(val);
	}

	$('#binInput').on('keyup', function() {
		var bin = $(this).val().replace(/[^01]/g,"");
		var dec = parseInt(bin, 2) || 0;
		$('.1-count').html((bin.match(/1/g) || []).length);
		localStorage.lastVal = dec;
		hexSet(dec);
		decSet(dec);
		updateBinRow(dec);
	});

	$('#decInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^0-9]/g,""), 10) || 0;
		localStorage.lastVal = dec;
		hexSet(dec);
		binSet(dec);
		updateBinRow(dec);
	});

	$('#hexInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^a-f0-9]/gi,""), 16) || 0;
		localStorage.lastVal = dec;
		decSet(dec);
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
		for (i = parseInt(localStorage.bitSel) - 1; i >= 0 ; i--) {
			binStr += $('.bit-' + i).html();
		}
		var dec = parseInt(binStr, 2);
		hexSet(dec);
		decSet(dec);
		binSet(dec);
	});
});
