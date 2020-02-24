import React from 'react';
import './App.css';
import Map from './components/main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      map: {},
      traffic : {},
      transit : {},
      bicycling : {}
    }
  } 

  handleMapLoad = (map) => {
    this.setState({
      map: map
    })
  }
  
  render() {
    return (
      <div className="App">
        <Map id="myMap"	onMapLoad = {this.handleMapLoad}/>  
      </div>
      
    );
  }
}

export default App;
