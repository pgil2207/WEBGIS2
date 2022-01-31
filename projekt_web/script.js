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
    "esri/layers/FeatureLayer"


], function (esriConfig, Map, MapView, Graphic, BasemapGallery, Expand, LayerList, Legend, DistanceMeasurement2D, Measurement, Search, Locate, FeatureLayer) {

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

    legendExpand = new Expand({
        expandIconClass: "esri-icon-legend",
        view: view,
        content: legend
    });

    view.ui.add(legendExpand, "bottom-right");

    let measurementWidget = new DistanceMeasurement2D({
        view: view
    });

    measureExpand = new Expand({
        expandIconClass: "esri-icon-measure-line",
        view: view,
        content: measurementWidget
    });

    view.ui.add(measureExpand, "bottom-left");

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

    const searchWidget = new Search({
        view: view,
        sources: [{
            layer: bUniwersytet,
            searchFields: ["nazwa"],
            name: "Biblioteki Uniwersyteckie",
            displayField: "nazwa"
        },
        {
            layer: bPubliczne,
            searchFields: ["nazwa"],
            name: "Biblioteki Publiczne",
            displayField: "nazwa"
        }],
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

    let btn1 = document.getElementById("btn1");
    let btn2 = document.getElementById("btn2");

    map.add(bUniwersytet);
    map.add(bPubliczne);

    btn1.addEventListener("click", function () {
        view.goTo({center: [22.5410484, 51.2464739],
            zoom: 16})
    });

    btn2.addEventListener("click", function () {
        view.goTo({center: [22.5581197, 51.2464766],
            zoom: 16})

    })

});
