$(function() {

	$('#my-menu').mmenu({
        extensions: [ 'theme-black', 'fx-menu-slide', 'pagedim-black'],
		navbar: {
        	title: '<img src="img/logo-1.svg" alt="Салон красоты СМитлер">'
		},
		offCanvas: {
        	position: 'right'
		}
	});

    var api = $('#my-menu').data('mmenu');
    api.bind('open:finish', function() {
        $('.hamburger').addClass('is-active');
    });
    api.bind('close:finish', function() {
        $('.hamburger').removeClass('is-active');
    });

    $('.carousel-services').on('initialized.owl.carousel', function() {
    	setTimeout(function () {
            carouselService();
        }, 50);
	});
    $('.carousel-services').owlCarousel({
		// loop: true,
		nav: true,
		smartSpeed: 800,
		navText: ['<i class="fa fa-angle-double-left"></i>', '<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			800: {
				items: 2
			},
			1100: {
				items: 3
			}
		}
	});

    function carouselService() {
		$('.carousel-services-item').each(function () {
			var _self = $(this),
				tHeight = _self.find('.carousel-services-item__content').outerHeight();
			_self.find('.carousel-services-item__image').css('min-height', tHeight);
        });
    }carouselService();

    $('.carousel-services-item__content .h3').each(function () {
		var _self = $(this);
		_self.html(_self.html().replace(/(\S+)\s*$/, '<span>$1</span>'));
    });

    $('section .h2').each(function () {
		var _self = $(this);
		_self.html(_self.html().replace(/^(\S+)/, '<span>$1</span>'));
    });

    //Resize Window
    function onResizeFunc() {
		$('.carousel-services-item__content').equalHeights();
    }onResizeFunc();
    // window.onresize()(function () {
		// onResizeFunc();
    // });
	$(window).resize(function () {
		onResizeFunc();
    });

	//selectize
	$('select').selectize();

	//reviews owl-carousel
	$('.reviews').owlCarousel({
		loop: true,
		items: 1,
		smartSpeed: 700,
		nav: false,
		autoHeight: true
	});

	//partners owl-carousel
	$('.partners').owlCarousel({
		loop: true,
        smartSpeed: 700,
		nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        dots: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			},
			1200: {
				items: 4
			}
		}
	});

	//scroll to top
	$(window).scroll(function () {
		if( $(this).scrollTop() > $(this).height() ) {
			$('.top').addClass('active');
		} else {
            $('.top').removeClass('active');
		}
    });
	$('.top').click(function () {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });

    //SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail AJAX Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form.callback-form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			$(th).find('.success-form').addClass('active').css('display', 'flex').hide().fadeIn();
			setTimeout(function() {
				$(th).find('.success-form').removeClass('active').fadeOut();
				th.trigger("reset");
			}, 3000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

});

$(window).on('load', function () {
	$('.preloader').delay(1000).fadeOut('slow');
});
