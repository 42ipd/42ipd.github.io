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
$('.js-page-wrapper').css('padding-top', $('.header').height());

$(window).resize(function(){
  $('.js-page-wrapper').css('padding-top', $('.header').height());
});


// Compressed Header
var isMenuFixed = false;

 $(window).scroll(function(){
    if (document.body.scrollTop < 50 && isMenuFixed) {
        if ($('.js-main-header').hasClass('main-header--compressed')) {
            $('.js-main-header').removeClass('main-header--compressed');
            isMenuFixed = false;
        }
    } else if (document.body.scrollTop > 50 && !isMenuFixed) {
        if (!$('.js-main-header').hasClass('main-header--compressed')) {
            $('.js-main-header').addClass('main-header--compressed');
            isMenuFixed = true;
        }
    }
});


// Tooltip
$('.js-tooltip-icon').tooltip();



// $( window ).resize(function() {
// // $('.project-cover').css('height', $(window).height() - $('.main-header.is-compressed').height());
// });
//
// var imageWidth, wrapperWidth, imageHeight, wrapperHeight, overlap, overlap2, container = $('.project-cover');
//
// function centerImage() {
//     imageHeight = container.find('img').height();
//     wrapperHeight = container.height();
//     imageWidth = container.find('img').width();
//     wrapperWidth = container.width();
//     overlap = (wrapperHeight - imageHeight) / 2;
//     overlap2 = (wrapperWidth - imageWidth) / 2;
//     container.find('img').css('margin-top', overlap);
//     container.find('img').css('margin-left', overlap2);
// }
//
// $(window).on("load resize", centerImage);

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
