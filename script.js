$(function() {
	function updateBinRow(str) {
		for (i = 0; i < 63; i++) {
			if (str.length) {
				$('.bit-' + i).html(str.substring(str.length - 1));
				str = str.slice(0, - 1);
			} else {
				$('.bit-' + i).html(0);
			}
		}
	}

	$('.bit-64b > div').hide();
	$('.bit-32b > div').show();

	$('#64b, #32b, #16b, #8b').on('click', function(e) {
		e.preventDefault();
		$('.bit-64b > div').hide();
		$('.bit-' + $(this).attr('id') + ' > div').show();
		$('ul.nav li.active').removeClass('active');
		$(this).parent('li').addClass('active');
	});

	$('#binInput').on('keyup', function() {
		var bin = $(this).val().replace(/[^01]/g,"");
		var dec = parseInt(bin, 2) || 0;
		$('#decInput').val(dec);
		$('#hexInput').val(dec.toString(16).toUpperCase());
		$('.1-count').html((bin.match(/1/g) || []).length);
		updateBinRow(bin);
	});

	$('#decInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^0-9]/g,""), 10) || 0;
		var bin = dec.toString(2);
		$('#binInput').val(bin);
		$('.1-count').html((bin.match(/1/g) || []).length);
		$('#hexInput').val(dec.toString(16).toUpperCase());
		updateBinRow(bin);
	});

	$('#hexInput').on('keyup', function() {
		var dec = parseInt($(this).val().replace(/[^a-f0-9]/gi,""), 16) || 0;
		var bin = dec.toString(2);
		$('#decInput').val(dec);
		$('#binInput').val(bin);
		$('.1-count').html((bin.match(/1/g) || []).length);
		updateBinRow(bin);
	});
});