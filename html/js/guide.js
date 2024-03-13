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

	const isLastSlide = () => $('.carousel-inner .item.active').next('.item').length === 0;

	const updateLastButton = () => {
		$('#next-slide').toggleClass('hidden', isLastSlide());
		$('#last-slide').toggleClass('hidden', !isLastSlide());
	}

	// on 'slid' event, prevent the default behavior of the carousel
	$('#carousel-guide').on('slide.bs.carousel', (e) => e.preventDefault());

	// on clicking 'first-slide' button, manually slide to the first slide
	$('#first-slide').on('click', () => {
		$('.carousel-inner .item.active').removeClass('active');
		$('.carousel-inner .item').first().addClass('active');
		updateLastButton();
	});

	// on 'click' event of the next button, manually slide to the next slide
	$('#next-slide').on('click', () => {
		const activeSlide = $('.carousel-inner .item.active');
		const nextSlide = activeSlide.next('.item');

		// set next slide as active
		if(nextSlide.length) {
			activeSlide.removeClass('active');
			nextSlide.addClass('active');
		}

		updateLastButton();
	});

	// on 'click' event of the previous button, manually slide to the previous slide
	$('#prev-slide').on('click', () => {
		const activeSlide = $('.carousel-inner .item.active');
		const prevSlide = activeSlide.prev('.item');
		const isFirstSlide = prevSlide.length === 0;

		// set previous slide as active
		if(!isFirstSlide) {
			activeSlide.removeClass('active');
			prevSlide.addClass('active');
		}

		updateLastButton();
	});

	loadSlide(1);
})