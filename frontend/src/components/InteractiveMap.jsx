import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Centro padrão: Jataí, Goiás
const defaultCenter = {
  lat: -17.8814,
  lng: -51.7144
};

const InteractiveMap = ({ providers, selectedProvider, onMarkerClick, center = defaultCenter }) => {
  const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    zoom: 13,
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        options={mapOptions}
      >
        {providers.map((provider, index) => (
          <Marker
            key={provider.id}
            position={{ lat: provider.lat, lng: provider.lng }}
            title={provider.name}
            label={{
              text: `${index + 1}`,
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            icon={{
              path: window.google?.maps?.SymbolPath?.CIRCLE,
              scale: 20,
              fillColor: selectedProvider?.id === provider.id ? '#16A34A' : '#10B981',
              fillOpacity: 1,
              strokeColor: 'white',
              strokeWeight: 2,
            }}
            onClick={() => onMarkerClick(provider)}
            animation={selectedProvider?.id === provider.id ? window.google?.maps?.Animation?.BOUNCE : null}
          />
        ))}
        
        {selectedProvider && (
          <InfoWindow
            position={{ lat: selectedProvider.lat, lng: selectedProvider.lng }}
            onCloseClick={() => onMarkerClick(null)}
          >
            <div className="p-2 max-w-xs">
              <h3 className="font-bold text-sm mb-1">{selectedProvider.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{selectedProvider.profession}</p>
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-xs font-semibold">{selectedProvider.rating}</span>
                <span className="text-xs text-gray-500">({selectedProvider.reviews})</span>
              </div>
              <p className="text-xs text-gray-500">{selectedProvider.distance}</p>
              <p className="text-xs font-semibold text-green-600 mt-1">{selectedProvider.price}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default InteractiveMap;
