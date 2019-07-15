$(document).ready(function() {

	$('a[href*="#"]').bind("click", function (e) {
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top - 0
		}, 800);
		e.preventDefault();
	});

	$('.check1').click(function () {
		if ($(this).is(':checked')) {
			$('.button1').removeAttr('disabled'); 
			$('.button1').removeClass('disabled');
		} else {
			$('.button1').attr('disabled', true); 
			$('.button1').addClass('disabled');
		}
	});

	$('.check2').click(function () {
		if ($(this).is(':checked')) {
			$('.button2').removeAttr('disabled'); 
			$('.button2').removeClass('disabled');
		} else {
			$('.button2').attr('disabled', true); 
			$('.button2').addClass('disabled');
		}
	});

	$('.projects-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		centerMode: true,
		prevArrow: '<button type="button" class="slider-btn slider-btn-prev"><img src="../img/arrow.svg" alt="Вперед" /></button>',
		nextArrow: '<button type="button" class="slider-btn slider-btn-next"><img src="../img/arrow.svg" alt="Назад" /></button>',
		responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        centerMode: false
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false
      }
    }
  ]
	});

	$('.callback-popup').magnificPopup({
		type:'inline',
		mainClass: 'mfp-fade',
		fixedContentPos: true,
		callbacks: {
			open: function() {
				hash = window.location.hash ? window.location.hash : '#popup'
				window.location.href = hash
			},
			close: function() {
				history.pushState('', document.title, window.location.pathname)
			}
		}
	})

	$(window).bind('hashchange', function() {
		if(window.location.hash == ''){
			$.magnificPopup.close()
		}
	})

	$('.popup-policy').magnificPopup({
		type:'inline',
		mainClass: 'mfp-fade',
		fixedContentPos: true,
		callbacks: {
			open: function() {
				hash = window.location.hash ? window.location.hash : '#popup'
				window.location.href = hash
			},
			close: function() {
				history.pushState('', document.title, window.location.pathname)
			}
		}
	});

	$('.callback-popup').on('click', function() {
			var serviceCaption = $(this).data('caption');
			$('input.caption').val(serviceCaption);
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this). height()) {
			$('.up').addClass('active');
		} else {
			$('.up').removeClass('active');
		}
	});
	$('.up').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

	$(window).on('scroll', function() {
			if($(window).scrollTop()) {
					$('.top-line').addClass('sticky');
			} else {
					$('.top-line').removeClass('sticky');
			}
	});

	//E-mail Ajax Send
  $(".form-main").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
        $('.header-form').find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        $('.header-form').find('.success').removeClass('active').fadeOut();
        th.trigger("reset");
      }, 3000);
    });
    return false;
  });

  $(".callback-form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", //Change
      data: th.serialize()
    }).done(function() {
        $('.callback').find('.success').addClass('active').css('display', 'flex').hide().fadeIn();
      setTimeout(function() {
        $('.callback').find('.success').removeClass('active').fadeOut();
        $.magnificPopup.close();
        th.trigger("reset");
      }, 3000);
    });
    return false;
  });

  var menu_selector = ".top-menu"; 
  var menu = jQuery('.top-line').outerHeight();
  jQuery(".top-menu ul li:first-child a").addClass("current");

  function onScroll(){
  	var scroll_top = jQuery(document).scrollTop();

  	jQuery(menu_selector + " a").each(function(){
  		var hash = jQuery(this).attr("href");
  		var target = jQuery(hash);
  		if (target.position().top - menu <= scroll_top && target.position().top + target.outerHeight()  > scroll_top) {
  			jQuery(menu_selector + " a.current").removeClass("current");
  			jQuery(this).addClass("current");
  		} else {
  			jQuery(this).removeClass("current");
  		}
  	});
  }

  jQuery(document).on("scroll", onScroll);
  jQuery(".top-menu a[href^='#']").click(function(e){
  	e.preventDefault();

  	jQuery(document).off("scroll");
  	jQuery(menu_selector + " .current").removeClass("current");
  	jQuery(this).addClass("current");
  	var hash = jQuery(this).attr("href");
  	var target = jQuery(hash);
  	jQuery("html, body").animate({
  		scrollTop: target.offset().top
  	}, 300, function(){
  		window.location.hash = hash;
  		jQuery(document).on("scroll", onScroll);
  	});
  });

});
