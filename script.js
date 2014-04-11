// Syria Conflict Mapping
// "Making Sense of Syria": The Special Project Unit

var mapLayers = {};

var map = L.mapbox.map('map', 'helsinki.hnhinfii', {
    minZoom: 7,
    maxZoom: 16,
    maxBounds: [[30.8,35.1],    //[[min-y, min-x],
              [38.1,42.8]]   //[max-y, max-x]],
})
    .setView([34.5, 37.5], 8);

map.addControl(L.mapbox.shareControl().setPosition('topleft'));
map.zoomControl.setPosition('topleft');

// map.legendControl.addLegend(document.getElementById('legend-container').innerHTML);
// map.legendControl.addLegend($('.legend-container').html());


// Add custom legend
var mapLegend = L.mapbox.legendControl({ position:'topright' }).addLegend(
    $('.legend-container').html());
map.addControl(mapLegend);

$('.arrow').on('click', function(e){
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this),
        $contentContainer = $('.content-container');

    if($this.hasClass('active')) {
        $this.removeClass('active');
        $contentContainer.removeClass('active');
    } else {
        $this.addClass('active');
        $contentContainer.addClass('active').find('.calendar a:first').trigger('click');
    }
});



$('.calendar').on('click', 'a', function(e){
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this),
        mapId = $this.data('id');

    for (var mapLayer in mapLayers){
        map.removeLayer(mapLayers[mapLayer]);
    }

    if (! mapLayers[mapId]){
        mapLayers[mapId] = L.mapbox.tileLayer('helsinki.' + mapId);
    }

    map.addLayer(mapLayers[mapId]);

    $('.calendar a.active').removeClass('active');
    $this.addClass('active');
    // if (map.hasLayer(layer)){
    //     map.removeLayer(layer);
    // } else {
    //     map.addLayer(layer);
    // }
});

$('.calendar-switcher').on('click', 'a', function(e){
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this),
        newIndex = $this.data('index'),
        nav = $this.data('nav');

    var oldIndex = $this.addClass('active').siblings('.active').removeClass('active').data('index');

    $this.parent().next().removeClass('active' + oldIndex).addClass('active' + newIndex).find('ul:nth-child(' + newIndex + ') li:first a').trigger('click');

    map.setView([nav[0], nav[1]], nav[2]);
});
