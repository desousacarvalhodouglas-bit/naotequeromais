import React from 'react';
import { GoogleMap, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyC1rsLAluPX1QVAdblELEVf1rFcOXde3DU';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -17.8814,
  lng: -51.7144
};

const libraries = ['places'];

const InteractiveMap = ({ providers, selectedProvider, onMarkerClick, center = defaultCenter }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapOptions = {
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    zoom: 13,
    gestureHandling: 'greedy',
  };

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-red-50">
        <div className="text-center p-4">
          <p className="text-red-600 font-semibold mb-2">❌ Erro ao carregar mapa</p>
          <p className="text-sm text-gray-600">Verifique sua conexão e recarregue a página</p>
          <p className="text-xs text-gray-400 mt-2">Erro: {loadError.message}</p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600 font-medium">Carregando mapa do Google...</p>
          <p className="text-xs text-gray-500 mt-2">Isso pode levar alguns segundos</p>
        </div>
      </div>
    );
  }

  return (
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
          onClick={() => onMarkerClick(provider)}
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
  );
};

export default InteractiveMap;
