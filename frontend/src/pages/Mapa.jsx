import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { MapPin, Star, Search, Phone, MessageSquare, Navigation } from 'lucide-react';
import { mockProviders, professionCategories } from '../mock/providersData';
import InteractiveMap from '../components/InteractiveMap';

const Mapa = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -17.8814, lng: -51.7144 }); // Jataí, GO
  const [userLocation, setUserLocation] = useState(null);

  // Detectar localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  }, []);

  const filteredProviders = mockProviders.filter(provider => {
    const matchesSearch = !searchQuery || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || provider.profession === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMarkerClick = (provider) => {
    setSelectedProvider(provider);
    if (provider) {
      setMapCenter({ lat: provider.lat, lng: provider.lng });
    }
  };

  const useMyLocation = () => {
    if (userLocation) {
      setMapCenter(userLocation);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setMapCenter(location);
        },
        (error) => {
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mapa de Prestadores</h1>
          <p className="text-gray-600">Encontre profissionais perto de você</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar profissional..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={useMyLocation}>
              <Navigation className="w-4 h-4 mr-2" />
              Usar minha localização
            </Button>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {professionCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Map */}
          <Card className="p-0 h-[500px] lg:h-[600px] overflow-hidden">
            <InteractiveMap 
              providers={filteredProviders}
              selectedProvider={selectedProvider}
              onMarkerClick={handleMarkerClick}
              center={mapCenter}
            />
          </Card>

          {/* Providers List */}
          <div className="space-y-4 lg:h-[600px] overflow-y-auto pr-2">
            <div className="mb-4">
              <p className="text-gray-600">
                <span className="font-semibold">{filteredProviders.length}</span> prestadores encontrados
              </p>
            </div>

            {filteredProviders.map((provider) => (
              <Card 
                key={provider.id} 
                className={`p-4 hover:shadow-lg transition-all cursor-pointer ${ 
                  selectedProvider?.id === provider.id ? 'border-2 border-green-500 bg-green-50' : ''
                }`}
                onClick={() => {
                  setSelectedProvider(provider);
                  setMapCenter({ lat: provider.lat, lng: provider.lng });
                }}
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="w-16 h-16 border-2 border-green-200">
                    <AvatarImage src={provider.avatar} alt={provider.name} />
                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{provider.name}</h3>
                        <p className="text-sm text-gray-600">{provider.profession}</p>
                      </div>
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{provider.rating}</span>
                        <span className="text-xs text-gray-500">({provider.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mt-2 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-green-600" />
                      {provider.location} • {provider.distance}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-green-600">{provider.price}</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8">
                          <Phone className="w-4 h-4 mr-1" />
                          Contatar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredProviders.length === 0 && (
              <Card className="p-12 text-center">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum prestador encontrado</p>
                <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapa;
