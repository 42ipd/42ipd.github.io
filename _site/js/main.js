var $window= $(window);

function coverResize() {
    var $header = $('.header');

    $('.js-page-wrapper').css('padding-top', $header.outerHeight());
    $('.js-home-cover').outerHeight($window.outerHeight() - $header.outerHeight() - $('.footer').outerHeight());
    $('.js-project-cover').outerHeight($window.outerHeight());
    $('.js-project-cover-img').outerHeight($window.outerHeight());
}

function onPageScroll() {
    var isMenuFixed = false;
    var topDif = 50;
    var $header = $('.js-header');
    var $headerCompressed = 'header--compressed';
    var $cover = $('.js-project-cover');
    var $coverScrolled = 'cover--scrolled';
    var $techSpecs = $('.js-tech-specs');
    var $techSpecsFixed = 'tech-specs--fixed';

    if($techSpecs.length){
        var $techSpecsOffset = $techSpecs.offset().top - $header.outerHeight();
    }

    function headerResize() {
        var scroll = document.body.scrollTop;

        if (scroll < topDif && isMenuFixed) {
            if ($header.hasClass($headerCompressed)) {
                $header.removeClass($headerCompressed);
                $('.js-header__brand').removeClass('header__brand--compressed');
                $('.js-header__list').removeClass('header__list--compressed');
                $('.js-header__link').removeClass('header__link--compressed');
                isMenuFixed = false;
            }

            if ($cover.hasClass($coverScrolled)) {
                $cover.removeClass($coverScrolled);
                isMenuFixed = false;
            }

        } else if (scroll > topDif && !isMenuFixed) {
            if (!$header.hasClass($headerCompressed)) {
                $header.addClass($headerCompressed);
                $('.js-header__brand').addClass('header__brand--compressed');
                $('.js-header__list').addClass('header__list--compressed');
                $('.js-header__link').addClass('header__link--compressed');
                isMenuFixed = true;
            }

            if (!$cover.hasClass($coverScrolled)) {
                $cover.addClass($coverScrolled);
                isMenuFixed = true;
            }
        }
    }

    function techSpecsToTop() {
        var scroll = document.body.scrollTop;

        if (scroll >= $techSpecsOffset) {
            $techSpecs.addClass($techSpecsFixed);
        } else {
            $techSpecs.removeClass($techSpecsFixed);
        }
    }

    $window.scroll(function(){
         headerResize();
         techSpecsToTop();
    });
}


function contactMap(){
    var map;
    var genJardim = new google.maps.LatLng(-23.5446301, -46.6508648);

    var MY_MAPTYPE_ID = 'custom_style';


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


coverResize();
onPageScroll();
contactMap();

$window.resize(function(){
  coverResize();
});
