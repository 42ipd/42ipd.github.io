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

$('.big-quote').css('height', $(window).height()/2);

//header-resize
$('.js-page-wrapper').css('padding-top', $('.header').outerHeight());

$(window).resize(function(){
  $('.js-page-wrapper').css('padding-top', $('.header').outerHeight());
});


// Compressed Header
var isMenuFixed = false;

$(window).scroll(function(){
    if (document.body.scrollTop < 50 && isMenuFixed) {
        if ($('.js-header').hasClass('header--compressed')) {
            $('.js-header').removeClass('header--compressed');
            isMenuFixed = false;
        }
    } else if (document.body.scrollTop > 50 && !isMenuFixed) {
        if (!$('.js-header').hasClass('header--compressed')) {
            $('.js-header').addClass('header--compressed');
            isMenuFixed = true;
        }
    }
});


// Tooltip
$('.js-tooltip-icon').tooltip();

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

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

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
