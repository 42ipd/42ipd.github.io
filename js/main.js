/* global SVGInjector*/
(function($, SVGInjector){
    //SVG Injector

    // Elements to inject
    var mySVGsToInject = document.querySelectorAll('img.inject-these-svgs');

    SVGInjector(mySVGsToInject,
    {
        evalScripts: 'once',
        pngFallback: 'assets/png',
        each: function(svg) {
            // Callback after each SVG is injected
            console.log('SVG injected: ' + svg.getAttribute('id'));
      }
    },
    function(totalSVGsInjected) {
        // Callback after all SVGs are injected
        console.log('We injected ' + totalSVGsInjected + ' SVGs!');
    });
}(jQuery, SVGInjector));

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
var isProjectScroll = false;
var $techSpecs = $('.js-tech-specs'),
    techSpecsInitialTop = $techSpecs.offset().top;

$(window).scroll(function(e){
    e.preventDefault();

    var scroll = $(window).scrollTop();

    if (document.body.scrollTop < 50 && isMenuFixed) {
        if ($('.js-header').hasClass('header--compressed')) {
            $('.js-header').removeClass('header--compressed');
            $('.js-header__brand').removeClass('header__brand--compressed');
            $('.js-header__list').removeClass('header__list--compressed');
            $('.js-header__item-link').removeClass('header__item-link--compressed');
            isMenuFixed = false;
        }
    } else if (document.body.scrollTop > 50 && !isMenuFixed) {
        if (!$('.js-header').hasClass('header--compressed')) {
            $('.js-header').addClass('header--compressed');
            $('.js-header__brand').addClass('header__brand--compressed');
            $('.js-header__list').addClass('header__list--compressed');
            $('.js-header__item-link').addClass('header__item-link--compressed');
            isMenuFixed = true;
        }
    }

    if (document.body.scrollTop < 50 && isProjectScroll) {
        if ($('.js-project-cover').hasClass('cover--scrolled')) {
            $('.js-project-cover').removeClass('cover--scrolled');
            isProjectScroll = false;
        }
    } else if (document.body.scrollTop > 50 && !isProjectScroll) {
        if (!$('.js-project-cover').hasClass('cover--scrolled')) {
            $('.js-project-cover').addClass('cover--scrolled');
            isProjectScroll = true;
        }
    }

    if (scroll >= techSpecsInitialTop - $('.js-header').outerHeight()) {
        $techSpecs.addClass('tech-specs--fixed');
    } else {
        $techSpecs.removeClass('tech-specs--fixed');
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
