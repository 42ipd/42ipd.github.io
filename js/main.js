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
