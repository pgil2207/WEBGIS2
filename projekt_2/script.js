require(["esri/Map", "esri/views/SceneView", "esri/rest/support/Query", "esri/layers/FeatureLayer"], (Map, SceneView, Query, FeatureLayer) => {
    require([
"esri/Map",
"esri/views/SceneView",
"esri/layers/GraphicsLayer",
"esri/rest/query",
"esri/rest/support/Query",
"esri/layers/FeatureLayer",
"esri/renderers/ClassBreaksRenderer"
], function (Map, SceneView, GraphicsLayer, query, Query, FeatureLayer, ClassBreaksRenderer) {
const url =
  "https://services.arcgis.com/ue9rwulIoeLEI9bj/ArcGIS/rest/services/Earthquakes/FeatureServer/0";

const wiekszeOd4 = new GraphicsLayer();

const wszystkieTrzesienia = new FeatureLayer({
  url: url,
});

wszystkieTrzesienia.when(() => {
  
});

let renderer = new ClassBreaksRenderer({
  type: "class-breaks",
  field: "MAGNITUDE"
});

renderer.addClassBreakInfo({
  minValue: 0,
  maxValue: 1.0,
  symbol: {
    type: "point-3d",
    symbolLayers: [{
      type: "object",
      resource: { primitive: "cone" },
      material: { color: [0, 255, 0] },
      height: 100000,
      width: 50000
    }]
  }
});

renderer.addClassBreakInfo({
  minValue: 1.01,
  maxValue: 2.0,
  symbol: {
    type: "point-3d",
    symbolLayers: [{
      type: "object",
      resource: { primitive: "cone" },
      material: { color: [100, 200, 0] },
      height: 120000,
      width: 50000
    }]
  }
});
renderer.addClassBreakInfo({
  minValue: 2.01,
  maxValue: 3.0,
  symbol: {
    type: "point-3d",
    symbolLayers: [{
      type: "object",
      resource: { primitive: "cone" },
      material: { color: [200, 100, 0] },
      height: 120000,
      width: 50000
    }]
  }
});

renderer.addClassBreakInfo({
  minValue: 3.01,
  maxValue: 5.0,
  symbol: {
    type: "point-3d",
    symbolLayers: [{
      type: "object",
      resource: { primitive: "cone" },
      material: { color: [255, 0, 0] },
      height: 140000,
      width: 50000
    }]
  }
});

wszystkieTrzesienia.renderer = renderer;

const params = new Query({
  returnGeometry: true,
  outFields: ["*"]
});

const map = new Map({
  basemap: "osm",
  layers: [wiekszeOd4, wszystkieTrzesienia] 
});

const view = new SceneView({
  map: map,
  container: "viewDiv",
  center: [-100, 38],
  zoom: 4
});

function doQuery() {

  wiekszeOd4.removeAll();
  a = "MAGNITUDE"
  b = ">"
  c= "4"
  params.where =
    a + b + c;
  query
    .executeQueryJSON(url, params)
    .then(wyniki)
    
}
doQuery();

function wyniki(response) {

  const obiekt = response.features.map(function (feature) {

    feature.symbol = {
      type: "point-3d",
      symbolLayers: [
        {
          type: "object",
          material: {
            color: "blue"
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

  wiekszeOd4.addMany(obiekt);

  
}


});
});