$(document).ready(function() {
	var img_size = 40;
	$('#img_benda').attr('size', img_size);
	$('#diameter_benda').text(img_size);
	$('#img_benda2').attr('size', img_size);
	$('#diameter_benda2').text(img_size);
	// Deklarasi diameter benda
	$('.range-diameter-benda').attr('min', 20);
	$('.range-diameter-benda').attr('max', 70);
	$('.range-diameter-benda').val(img_size);
	// Deklarasi kerapatan benda
	$('.range-kerapatan-benda').attr('min', 2000);
	$('.range-kerapatan-benda').attr('max', 8000);
	$('.range-kerapatan-benda').val(2000);
	// Deklarasi kerapatan cairan
	$('.range-kerapatan-cairan').attr('min', 1000);
	$('.range-kerapatan-cairan').attr('max', 2000);
	$('.range-kerapatan-cairan').val(1000);
	// Deklarasi viskositas
	$('.range-viskositas').attr('min', 1);
	$('.range-viskositas').attr('max', 9000);
	$('.range-viskositas').val(5000);

	$('.benda').click(function() {
		var img_src = $(this).children('img').attr('src');
		var dencity = $(this).data('dencity');
		$('.benda').removeClass('border-primary');
		$(this).addClass('border-primary');
		$('#benda_jatuh').attr('src', img_src);
		$('#kerapatan_benda').text(dencity);
		$('input[name=kerapatan_benda]').val(dencity);
	});

	$('.benda2').click(function() {
		var img_src = $(this).children('img').attr('src');
		var dencity = $(this).data('dencity');
		$('.benda2').removeClass('border-primary');
		$(this).addClass('border-primary');
		$('#benda_jatuh2').attr('src', img_src);
		$('#kerapatan_benda2').text(dencity);
		$('input[name=kerapatan_benda2]').val(dencity);
	});

	$('.range-diameter-benda').on('input', function() {
		var diameter_target = $(this).data('diameter');
		var img_target = $(this).data('target');
		var size = $(this).val();
		$(img_target).attr('width', size);
		$(this).attr('title', size);
		$(diameter_target).text(size);
	});

	$('.range-kerapatan-benda').on('input change', function(){
		var kerapatan_target = $(this).data('kerapatan');
		var size = $(this).val();
		$(this).attr('title', size);
		$(kerapatan_target).text(size);
	});

	$('input[name=kerapatan]').on('change', function(){
		var warna = $(this).data('warna');
		var dencity = $(this).data('dencity');
		if(dencity=='other') {
			$('input[name=kerapatan_cairan]').removeAttr('disabled');
			dencity = 1000;
		} else {
			$('input[name=kerapatan_cairan]').prop('disabled', true);
		}
		$('#kerapatan_cairan').text(dencity);
		$('input[name=kerapatan_cairan]').val(dencity);
		$('#warna_cairan').attr('src', 'img/tabung_'+warna+'.png');
	});

	$('input[name=kerapatan2]').on('change', function(){
		var warna = $(this).data('warna');
		var dencity = $(this).data('dencity');
		if(dencity=='other') {
			$('input[name=kerapatan_cairan2]').removeAttr('disabled');
			dencity = 1000;
		} else {
			$('input[name=kerapatan_cairan2]').prop('disabled', true);
		}
		$('#kerapatan_cairan2').text(dencity);
		$('input[name=kerapatan_cairan2]').val(dencity);
		$('#warna_cairan2').attr('src', 'img/tabung_'+warna+'.png');
	});

	$('.range-kerapatan-cairan').on('input', function(){
		var kerapatan_target = $(this).data('kerapatan');
		var size = $(this).val();
		$(this).attr('title', size);
		$(kerapatan_target).text(size);
	});

	$('.range-viskositas').on('input', function(){
		var viskositas = $(this).data('viskositas');
		var warna_cairan = $(this).data('warna');
		var size = $(this).val();
		$(this).attr('title', size);
		$(viskositas).text(size);
		var newsize = size/20000;
		if(newsize < 0.05){
			newsize = 0.05;
		}
		$(warna_cairan).css({'opacity':newsize});
	});

});
