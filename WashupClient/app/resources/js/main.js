window.initOwlCarousel = function () {
	setTimeout(function () {
		var owl1 = $(".owl-carousel");
		owl1.owlCarousel({
			loop: true,
			autoPlay: true,
			slideSpeed: 5000,
			stopOnHover: true,
			// nav: true,
			margin: 30,
			responsiveClass: true,
			responsive: {
				0: { items: 1 },
				600: { items: 2 },
				1000: { items: 4, nav: true, loop: false }
			}
		});

		$(".next").click(function () {
			owl1.trigger('owl.next');
		})
		$(".prev").click(function () {
			owl1.trigger('owl.prev');
		})
		$(".play").click(function () {
			owl1.trigger('owl.play', 1000); //owl.play event accept autoPlay speed as second parameter
		})
		$(".stop").click(function () {
			owl1.trigger('owl.stop');
		})
	}, 100);
}

window.initSwiper = function () {
	setTimeout(function () {
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 1,
			spaceBetween: 10,
			loop: true,
			loopFillGroupWithBlank: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				420: {
					slidesPerView: 1,
					spaceBetween: 10,
				},
				640: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 6,
					spaceBetween: 20,
				},
			}
		});
	}, 100)

}





// $(document).ready(function() {		
// 	// slider multi items

// 	// Custom Navigation Events




// 	// booking schedule
// 	$("#schedule_now").click(function(){
// 		$('#ModalBooking .modal-body').html('Loading...');
// 		var url = "ajaxs/booking/step1.html";
// 		$.get(url,function(req) {
// 			$('#ModalBooking .modal-body').html(req);
// 			$('#ModalBooking').modal('show');
// 		})
// 	})
// })