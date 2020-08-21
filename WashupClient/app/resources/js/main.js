$(document).ready(function () {
	// slider multi items
	var owl1 = $(".owl-carousel");
	owl1.owlCarousel({
		loop:true,
		autoPlay:true,
		slideSpeed : 5000,
		stopOnHover : true,
		nav: true,
		margin:30,
		responsiveClass:true,
		responsive:{
			0:{items:1,nav:true},
			600:{items:2,nav:true},
			1000:{items:4,nav:true,loop:false}
		}
  	});
	// Custom Navigation Events
	$(".next").click(function(){
		owl1.trigger('owl.next');
	})
	$(".prev").click(function(){
		owl1.trigger('owl.prev');
	})
	$(".play").click(function(){
		owl1.trigger('owl.play',1000); //owl.play event accept autoPlay speed as second parameter
	})
	$(".stop").click(function(){
		owl1.trigger('owl.stop');
	})
	
})

$(document).ready(function() {		
	// membership slider
	var owl2 = $("#membership_slider");
	owl2.owlCarousel({
		loop:true,
		autoPlay:false,
		responsiveClass: true,
		stopOnHover : true,
		smartSpeed: 1000,
		margin: 30,
		navigationText : ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
		itemsCustom : [
			[0, 1],
			[450, 2],
			[600, 3],
			[700, 3],
			[992, 4],
			[1200, 4],
			[1400, 4],
			[1600, 4]
		]
	});
	
	// product slider
	var owl3 = $("#product_slider");
	owl3.owlCarousel({
		loop:true,
		autoPlay:true,
		responsiveClass: true,
		stopOnHover : true,
		smartSpeed: 1000,
		margin: 30,
		navigationText : ["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
		itemsCustom : [
			[0, 1],
			[450, 2],
			[600, 3],
			[700, 3],
			[992, 4],
			[1200, 4],
			[1400, 6],
			[1600, 6]
		]
	});
})