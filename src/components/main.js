import React from "react";
import ReactDOM from 'react-dom';

var map;
var markers=[];
var infowindow;
const API_KEY = "AIzaSyCBNu313em500gTjCzfDu8jzPh_Zz86JpY" ;
class Map extends React.Component {
  constructor(props) { 
    super(props);
    this.onScriptLoad = this.onScriptLoad.bind(this);

  }

  onScriptLoad() {
      var locations = [
            ['Bondi Beach', -33.890542, 151.274856, 4],
            ['Coogee Beach', -33.923036, 151.259052, 5],
            ['Cronulla Beach', -34.028249, 151.157507, 3],
            ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
            ['Maroubra BeachManly Beach Manly Beach Manly Beach', -33.950198, 151.259302, 1]
        ];
      var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(locations[0][1], locations[0][2]),
            scrollwheel: true,
        };   
    map = new window.google.maps.Map(document.getElementById(this.props.id), mapOptions);
    this.props.onMapLoad(map)

       for (var count = 0; count < locations.length; count++) {
         var name = locations[count][0];
         var loc =  new google.maps.LatLng(locations[count][1], locations[count][2]);
            this.createMarker(name,loc);
        }
  }

  componentDidMount() {
    if (!window.google) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=`+API_KEY+`&libraries=places,geometry`;
      script.id = 'googleMaps';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.addEventListener('load', e => {
        this.onScriptLoad()
      })
    }
    else {
      this.onScriptLoad()
    }
    var marker = new google.maps.Marker({
      position: { lat: -25.344, lng: 131.036 },
      map: map
    });
  }

  createMarker(name,loc) {
    var marker = new google.maps.Marker({
      map: map,
      position: loc,
      title: name
     
    });
    markers.push(marker);

    infowindow = new google.maps.InfoWindow();
    var content =
      'Location: ' + name +
      '<br/>Lat: ' + loc.lat() +
      '<br/>Long: ' + loc.lng() ;

    marker.addListener('click', ()=>{     
      infowindow.setContent(content);  
      infowindow.open(map, marker); 
    });
  }

  render() {
    return (
      <div id="root">
      <div className="map" id={this.props.id} />
      </div>
    )
  }
}

export default Map;

