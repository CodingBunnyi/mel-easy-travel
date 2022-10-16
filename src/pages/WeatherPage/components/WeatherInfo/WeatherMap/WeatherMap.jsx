import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
const WeatherMap = () => {
    const position = [-37.814, 144.9633]
    return (
      <MapContainer MapContainer center={ position } zoom={ 13 } style={ { height: "200px" } }>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={ position }>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    );
}

export default WeatherMap;