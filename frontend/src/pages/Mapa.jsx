import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Star } from 'lucide-react';
import { mockProviders } from '../mock/providersData';
import InteractiveMap from '../components/InteractiveMap';

const Mapa = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [radius, setRadius] = useState(10);
  const [mapCenter, setMapCenter] = useState({ lat: -17.8814, lng: -51.7144 });
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const categories = ['Todos', 'Eletricista', 'Encanador', 'Pintor', 'Marceneiro', 'Professor', 'Diarista', 'Jardineiro'];

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => console.error('Erro ao obter localização:', error)
      );
    }
  }, []);

  const filteredProviders = mockProviders.filter(provider => 
    selectedCategory === 'Todos' || provider.profession === selectedCategory
  );

  const handleMarkerClick = (provider) => {
    setSelectedProvider(provider);
    if (provider) {
      setMapCenter({ lat: provider.lat, lng: provider.lng });
    }
  };

  const handleUpdateLocation = () => {
    if (userLocation) {
      setMapCenter(userLocation);
      alert('✓ Localização atualizada!');
    } else {
      alert('Permita o acesso à sua localização');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Title and Location Button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Prestadores Próximos</h1>
          <Button 
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6"
            onClick={handleUpdateLocation}
          >
            📍 Minha Localização
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-4 border-b">
          <button
            onClick={() => setActiveTab('todos')}
            className={`px-6 py-2 font-medium rounded-t-lg ${
              activeTab === 'todos' 
                ? 'bg-pink-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setActiveTab('prestadores')}
            className={`px-6 py-2 font-medium rounded-t-lg ${
              activeTab === 'prestadores' 
                ? 'bg-pink-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Prestadores ({filteredProviders.length})
          </button>
          <button
            onClick={() => setActiveTab('locais')}
            className={`px-6 py-2 font-medium rounded-t-lg ${
              activeTab === 'locais' 
                ? 'bg-pink-500 text-white' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Locais
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Radius Filter */}
        <div className="flex items-center space-x-3 mb-6">
          <span className="text-sm text-gray-600">Raio:</span>
          <select 
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm"
          >
            <option value={5}>5 km</option>
            <option value={10}>10 km</option>
            <option value={20}>20 km</option>
            <option value={50}>50 km</option>
            <option value={100}>100 km</option>
          </select>
          <Button 
            size="sm"
            variant="outline"
            onClick={handleUpdateLocation}
            className="border-gray-300"
          >
            📍 Atualizar
          </Button>
        </div>

        {/* Map */}
        <Card className="mb-6 overflow-hidden" style={{ height: '500px' }}>
          <InteractiveMap 
            providers={filteredProviders}
            selectedProvider={selectedProvider}
            onMarkerClick={handleMarkerClick}
            center={mapCenter}
          />
        </Card>

        {/* Provider Count */}
        <p className="text-gray-600 mb-4">
          <strong>{filteredProviders.length}</strong> prestadores encontrados
        </p>

        {/* Providers List - Grid Below Map */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => (
            <Card 
              key={provider.id}
              className={`p-0 overflow-hidden hover:shadow-lg transition-all cursor-pointer ${
                selectedProvider?.id === provider.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => {
                setSelectedProvider(provider);
                setMapCenter({ lat: provider.lat, lng: provider.lng });
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="p-4">
                {/* Avatar and Name */}
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-16 h-16 border-2 border-gray-200">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{provider.name}</h3>
                    <p className="text-sm text-gray-600">{provider.profession}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">{provider.rating}</span>
                  <span className="text-xs text-gray-500">({provider.reviews})</span>
                </div>

                {/* Distance */}
                <p className="text-sm text-gray-600 mb-3">📍 {provider.distance}</p>

                {/* Contact Button */}
                <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                  Contatar
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg">Nenhum prestador encontrado</p>
            <p className="text-gray-400 text-sm mt-2">Tente aumentar o raio de busca ou mudar a categoria</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Mapa;
