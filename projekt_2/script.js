require(["esri/Map", "esri/views/SceneView", "esri/rest/support/Query", "esri/layers/FeatureLayer"], (Map, SceneView, Query, FeatureLayer) => {
    require([
"esri/Map",
"esri/views/SceneView",
"esri/layers/GraphicsLayer",
"esri/rest/query",
"esri/rest/support/Query"
], function (Map, SceneView, GraphicsLayer, query, Query) {
const peaksUrl =
  "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0";

// Create graphics layer and symbol to use for displaying the results of query
const resultsLayer = new GraphicsLayer();

const params = new Query({
  returnGeometry: true,
  outFields: ["*"]
});

const map = new Map({
  basemap: "osm",
  layers: [resultsLayer] 
});

const view = new SceneView({
  map: map,
  container: "viewDiv",
  center: [-100, 38],
  zoom: 4,
  popup: {
    dockEnabled: true,
    dockOptions: {
      position: "top-right",
      breakpoint: false
    }
  }
});

function doQuery() {

  resultsLayer.removeAll();
  a = "MAGNITUDE"
  b = ">"
  c= "3"
  params.where =
    a + b + c;
  query
    .executeQueryJSON(peaksUrl, params)
    .then(getResults)
    
}
doQuery();

function getResults(response) {

  const peakResults = response.features.map(function (feature) {

    feature.symbol = {
      type: "point-3d",
      symbolLayers: [
        {
          type: "object",
          material: {
            color: "green"
          },
          resource: {
            primitive: "cone"
          },
          width: 100000,
          height: feature.attributes.DEPTH * 100000
        }
      ]
    };

   
    return feature;
  });

  resultsLayer.addMany(peakResults);

  
}


});
});