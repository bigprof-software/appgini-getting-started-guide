$(() => {
	const MAX_SLIDES = 20;

	const loadSlide = (i) => {
		// 0-prefix i if needed (2 digits)
		const slideId = `slide-${i.toString().padStart(2, '0')}.html`;
		
		$.get(slideId, (data) => {
			// create a new div.item in .carousel-inner, and create a div.flex-container inside it, then append the slide content to it
			$('<div>').addClass('item').html(`
				<div class="slide-progress">${i} / <span class="slide-count"></span></div>
				<div class="flex-container">
					${data}
				</div>`
			).appendTo('.carousel-inner');

			// update slide count
			$('.slide-count').text(i);

			// load next slide if we haven't reached MAX_SLIDES
			if(i < MAX_SLIDES) loadSlide(i + 1);
		}).fail(() => {
			// stop loading slides
			console.log(`Slides found: ${i - 1}`);

			// remove #loader-slide if slides count > 1
			if($('.carousel-inner').children().length > 1) {
				setTimeout(() => {
					$('#loader-slide').remove();
					$('.carousel-inner').children().first().addClass('active');
				}, 1000); // wait 1 second before removing loader to allow image to load
			}
		});
	}

	// on sliding, check if we're at the last slide, and update the next button accordingly
	$('#carousel-guide').on('slid.bs.carousel', () => {
		const activeSlide = $('.carousel-inner .item.active');
		const lastSlide = activeSlide.is(':last-child');

		$('#next-slide').toggleClass('hidden', lastSlide);
		$('#last-slide').toggleClass('hidden', !lastSlide);
	});

	loadSlide(1);
})