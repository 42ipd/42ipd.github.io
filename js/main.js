//header-resize
$('.js-page-wrapper').css('padding-top', $('.header').outerHeight());
$('.js-home-cover').outerHeight($(window).outerHeight() - $('.header').outerHeight() - $('.footer').outerHeight());
$('.js-project-cover').outerHeight($(window).outerHeight());
$('.js-project-cover-img').outerHeight($(window).outerHeight());

$(window).resize(function(){
  $('.js-page-wrapper').css('padding-top', $('.header').outerHeight());
  $('.js-home-cover').outerHeight($(window).outerHeight() - $('.header').outerHeight() - $('.footer').outerHeight());
  $('.js-project-cover').outerHeight($(window).outerHeight());
  $('.js-project-cover-img').outerHeight($(window).outerHeight());
});

// Compressed Header
var isMenuFixed = false;

$(window).scroll(function(){
    var scroll = document.body.scrollTop;

    if (scroll < 50 && isMenuFixed) {
        if ($('.js-header').hasClass('header--compressed')) {
            $('.js-header').removeClass('header--compressed');
            $('.js-header__brand').removeClass('header__brand--compressed');
            $('.js-header__list').removeClass('header__list--compressed');
            $('.js-header__link').removeClass('header__link--compressed');
            isMenuFixed = false;
        }

        if ($('.js-project-cover').hasClass('cover--scrolled')) {
            $('.js-project-cover').removeClass('cover--scrolled');
            isMenuFixed = false;
        }
    } else if (scroll > 50 && !isMenuFixed) {
        if (!$('.js-header').hasClass('header--compressed')) {
            $('.js-header').addClass('header--compressed');
            $('.js-header__brand').addClass('header__brand--compressed');
            $('.js-header__list').addClass('header__list--compressed');
            $('.js-header__link').addClass('header__link--compressed');
            isMenuFixed = true;
        }

        if (!$('.js-project-cover').hasClass('cover--scrolled')) {
            $('.js-project-cover').addClass('cover--scrolled');
            isMenuFixed = true;
        }
    }

    if (scroll >= $('.js-tech-specs').offset().top - $('.js-header').outerHeight()) {
        $('.js-tech-specs').addClass('tech-specs--fixed');
    } else {
        $('.js-tech-specs').removeClass('tech-specs--fixed');
    }
});

// Google Map Styles
var map;
var genJardim = new google.maps.LatLng(-23.5446301, -46.6508648);

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

  var featureOpts = [
   {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        { color: colorVariables.c_white },
        { saturation: 100 },
        { lightness: 0 }
      ]
    },{
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        { color: colorVariables.c_yellow_l3 },
        { saturation: 100 },
        { lightness: 0 }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        { color: colorVariables.c_orange },
        { saturation: 100 },
        { lightness: 0 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { color: colorVariables.c_yellow },
        { lightness: 0 },
        { saturation: 100 }
      ]
    },{
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        { color: colorVariables.c_yellow_l1 },
        { saturation: 100 },
        { lightness: 0 }
      ]
    },
    {
      elementType: 'labels',
      stylers: [
        { visibility: 'on' }
      ]
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        { color: colorVariables.c_white }
       ]
    },
     {
      elementType: 'labels.text.fill',
      stylers: [
        { color: colorVariables.c_black }
       ]
    },
    {
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },
    {
      featureType: 'water',
      stylers: [
        { color: colorVariables.c_blue }
      ]
    }
  ];

  var mapOptions = {
    zoom: 15,
    center: genJardim,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('js-map-canvas'), mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

  var image = '';
  var marker = new google.maps.Marker({
      position: genJardim,
      map: map,
      title: 'We are here!',
      icon: image
  });
}

google.maps.event.addDomListener(window, "load", initialize);

(function() {

    // detect if IE : from http://stackoverflow.com/a/16657946
    var ie = (function(){
    	var undef,rv = -1; // Return value assumes failure.
    	var ua = window.navigator.userAgent;
    	var msie = ua.indexOf('MSIE ');
    	var trident = ua.indexOf('Trident/');

    	if (msie > 0) {
    		// IE 10 or older => return version number
    		rv = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    	} else if (trident > 0) {
    		// IE 11 (or newer) => return version number
    		var rvNum = ua.indexOf('rv:');
    		rv = parseInt(ua.substring(rvNum + 3, ua.indexOf('.', rvNum)), 10);
    	}

    	return ((rv > -1) ? rv : undef);
    }());


    // disable/enable scroll (mousewheel and keys) from http://stackoverflow.com/a/4770179
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [32, 37, 38, 39, 40], wheelIter = 0;

    function preventDefault(e) {
    	e = e || window.event;
    	if (e.preventDefault)
    	e.preventDefault();
    	e.returnValue = false;
    }

    function keydown(e) {
    	for (var i = keys.length; i--;) {
    		if (e.keyCode === keys[i]) {
    			preventDefault(e);
    			return;
    		}
    	}
    }

    function touchmove(e) {
    	preventDefault(e);
    }

    function wheel(e) {
    	// for IE
    	//if( ie ) {
    		//preventDefault(e);
    	//}
    }

    function disable_scroll() {
    	window.onmousewheel = document.onmousewheel = wheel;
    	document.onkeydown = keydown;
    	document.body.ontouchmove = touchmove;
    }

    function enable_scroll() {
    	window.onmousewheel = document.onmousewheel = document.onkeydown = document.body.ontouchmove = null;
    }

    var docElem = window.document.documentElement,
    	scrollVal,
    	isRevealed,
    	noscroll,
    	isAnimating,
    	container = document.getElementById( 'container' ),
    	trigger = container.querySelector( 'button.trigger' );

    function scrollY() {
    	return window.pageYOffset || docElem.scrollTop;
    }

    function scrollPage() {
    	scrollVal = scrollY();

    	if( noscroll && !ie ) {
    		if( scrollVal < 0 ) return false;
    		// keep it that way
    		window.scrollTo( 0, 0 );
    	}

    	if( $('.js-project-cover').hasClass('notrans') ) {
            $('.js-project-cover').removeClass('notrans');
    		return false;
    	}

    	if( isAnimating ) {
    		return false;
    	}

    	if( scrollVal <= 0 && isRevealed ) {
    		toggle(0);
    	}
    	else if( scrollVal > 0 && !isRevealed ){
    		toggle(1);
    	}
    }

    function toggle( reveal ) {
    	isAnimating = true;

    	if( reveal ) {
            $('.js-project-cover').addClass('cover--scrolled');
    	}
    	else {
    		noscroll = true;
    		disable_scroll();
            $('.js-project-cover').removeClass('cover--scrolled');
    	}

    	// simulating the end of the transition:
    	setTimeout( function() {
    		isRevealed = !isRevealed;
    		isAnimating = false;
    		if( reveal ) {
    			noscroll = false;
    			enable_scroll();
    		}
    	}, 900 );
    }

    // refreshing the page...
    var pageScroll = scrollY();
    noscroll = pageScroll === 0;

    disable_scroll();

    if( pageScroll ) {
    	isRevealed = true;
        $('.js-project-cover').addClass('notrans');
        $('.js-project-cover').addClass('cover--scrolled');
    }

    window.addEventListener( 'scroll', scrollPage );
    trigger.addEventListener( 'click', function() { toggle( 'reveal' ); } );
    })();
