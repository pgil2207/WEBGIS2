require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Expand",
    "esri/widgets/LayerList",
    "esri/widgets/Legend",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/Measurement",
    "esri/widgets/Search",
    "esri/widgets/Locate",
    "esri/layers/FeatureLayer",
    "esri/geometry/Point",
    "esri/layers/GraphicsLayer"


], function (esriConfig, Map, MapView, Graphic, BasemapGallery, Expand, LayerList, Legend, DistanceMeasurement2D, Measurement, Search, Locate, FeatureLayer, Point, GraphicsLayer) {

    esriConfig.apiKey = "AAPK429b6d4d1ec64a44b85c271e3927a7c87rF-zFT0PkFgEJplV7OJ6nKT6cGGNgdEiEJoYKmjSRDsTAfa3h7VcSmw7Rr_pL8I";

    const map = new Map({
        basemap: "arcgis-topographic"
    });

    const view = new MapView({
        container: "map",
        map: map,
        center: [22.53, 51.22],
        zoom: 12
    });

    const basemapGallery = new BasemapGallery({
        view: view,
        source: {
            query: {
                title: '"World Basemaps for Developers" AND owner:esri'
            }
        }
    });

    mapGalleryExpand = new Expand({
        expandIconClass: "esri-icon-basemap",
        view: view,
        content: basemapGallery
    });
    view.ui.add(mapGalleryExpand, "top-right");

    let layerList = new LayerList({
        view: view
    });

    layerListExpand = new Expand({
        expandIconClass: "esri-icon-layer-list",
        view: view,
        content: layerList
    });
    view.ui.add(layerListExpand, "top-right");

    let legend = new Legend({
        view: view
    });

    let measurementWidget = new DistanceMeasurement2D({
        view: view
    });

    legendExpand = new Expand({
        expandIconClass: "esri-icon-measure-line",
        view: view,
        content: measurementWidget
    });

    view.ui.add(legendExpand, "bottom-left");

    const searchWidget = new Search({
        view: view
    });

    view.ui.add(searchWidget, {
        position: "top-left",
        index: 2
    });

    let locateWidget = new Locate({
        view: view,
        graphic: new Graphic({
            symbol: { type: "simple-marker" }
        })
    });

    view.ui.add(locateWidget, "top-right");

    const popup1 = {
        "title": "Biblioteka Uniwersytecka",
        "content": "{nazwa}<br>{strona}<br>{numer}"
    }

    const popup2 = {
        "title": "Biblioteka Publiczna",
        "content": "{nazwa}<br>{strona}<br>{numer}"
    }

    const bUniwersytet = new FeatureLayer({
        url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/BibliotekiRozne/FeatureServer/3",
        popupTemplate: popup1
    });

    

    const bPubliczne = new FeatureLayer({
        url: "https://services9.arcgis.com/XzFo5ArWiIwKyBgo/arcgis/rest/services/BibliotekiRozne/FeatureServer/0",
        popupTemplate: popup2
    });

    map.add(bPubliczne);


    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");

    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);
    const pointU = {
        type: "point",
        longitude: 22.5410484,
        latitude: 51.2464739
    };

    const simpleMarkerSymbolU = {
        type: "simple-marker",
        color: [255, 255, 255], 
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };

    const pointGraphicU = new Graphic({
        geometry: pointU,
        symbol: simpleMarkerSymbolU
    });

    graphicsLayer.add(pointGraphicU);

    map.add(graphicsLayer);
    const pointP = {
        type: "point",
        longitude: 22.5581197,
        latitude: 51.2464766
    };

    const simpleMarkerSymbolP = {
        type: "simple-marker",
        color: [255, 255, 255], 
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
     };

    const pointGraphicP = new Graphic({
        geometry: pointP,
        symbol: simpleMarkerSymbolP
    });

    graphicsLayer.add(pointGraphicP);

    map.add(bUniwersytet);
    map.add(bPubliczne);
    
    btn1.addEventListener("click", function(){
        view.goTo(pointGraphicU)
        view.zoom = 16
    });

    btn2.addEventListener("click", function(){
        view.goTo(pointGraphicP)
        view.zoom = 16
    })
    
});
