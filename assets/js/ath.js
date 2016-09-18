function ath_asciiset(string) {
	$("#ath-asciiInput").val(string);
}

function ath_hexset(string) {
	var resultString = ""
	for (i = 0; i < string.length; i++) {
		resultString += string.charCodeAt(i).toString(16) + " ";
	}
	$("#ath-hexInput").val(resultString);
}

function ath_binset(string) {
	var resultString = ""
	for (i = 0; i < string.length; i++) {
		resultString += string.charCodeAt(i).toString(2) + " ";
	}
	$("#ath-binInput").val(resultString);
}

function ath_decset(string) {
	var resultString = ""
	for (i = 0; i < string.length; i++) {
		resultString += string.charCodeAt(i).toString(10) + " ";
	}
	$("#ath-decInput").val(resultString);
}

$(function() {
	/*$('#ath-binInput').on('keyup', function() {
	});

	$('#ath-decInput').on('keyup', function() {
	});*/

	$('#ath-hexInput').on('keyup', function() {
		var hex = $(this).val().replace(/[^A-Fa-f0-9]/g, "");
		var str = "";

		for (i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		$(this).val(hex);
		ath_asciiset(str);
		ath_binset(str);
		ath_decset(str);
	});

	$('#ath-asciiInput').on('keyup', function() {
		ath_hexset($(this).val());
		ath_binset($(this).val());
		ath_decset($(this).val());
	});
});
