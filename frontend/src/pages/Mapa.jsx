import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { MapPin, Star, Search, Phone, MessageSquare, Navigation, Loader2, MapPinned } from 'lucide-react';
import { mockProviders, professionCategories } from '../mock/providersData';
import InteractiveMap from '../components/InteractiveMap';

const Mapa = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: -17.8814, lng: -51.7144 }); // Jataí, GO
  const [userLocation, setUserLocation] = useState(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

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
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setUserLocation(location);
          setMapCenter(location);
          
          // Get address from coordinates
          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              setLocationInput(data.results[0].formatted_address);
            }
          } catch (err) {
            console.error('Erro ao obter endereço:', err);
          }
          
          setIsGettingLocation(false);
          alert('✓ Localização atualizada com sucesso!');
        },
        (error) => {
          setIsGettingLocation(false);
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.');
          console.error('Erro ao obter localização:', error);
        }
      );
    } else {
      setIsGettingLocation(false);
      alert('Seu navegador não suporta geolocalização.');
    }
  };

  const handleSaveLocation = async () => {
    if (!locationInput.trim()) {
      alert('Por favor, insira um endereço.');
      return;
    }
    
    // Geocode the address to get coordinates
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(locationInput)}&key=AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0`
      );
      const data = await response.json();
      
      if (data.results && data.results[0]) {
        const { lat, lng } = data.results[0].geometry.location;
        setUserLocation({ lat, lng });
        setMapCenter({ lat, lng });
        setShowLocationModal(false);
        alert('✓ Localização salva com sucesso!');
      } else {
        alert('Endereço não encontrado. Tente outro.');
      }
    } catch (err) {
      console.error('Erro ao geocodificar endereço:', err);
      alert('Erro ao buscar localização. Tente novamente.');
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
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={useMyLocation} disabled={isGettingLocation}>
              {isGettingLocation ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Obtendo...
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 mr-2" />
                  Usar minha localização
                </>
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowLocationModal(true)}>
              <MapPinned className="w-4 h-4 mr-2" />
              Adicionar endereço
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interactive Map - 2/3 width */}
          <Card className="lg:col-span-2 p-0 h-[600px] overflow-hidden">
            <InteractiveMap 
              providers={filteredProviders}
              selectedProvider={selectedProvider}
              onMarkerClick={handleMarkerClick}
              center={mapCenter}
            />
          </Card>

          {/* Providers List - 1/3 width */}
          <div className="space-y-4 h-[600px] overflow-y-auto">
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

      {/* Location Modal */}
      <Dialog open={showLocationModal} onOpenChange={setShowLocationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Localização</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Digite seu endereço
              </label>
              <Input
                placeholder="Ex: Rua das Flores, 123, Jataí - GO"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                O endereço será usado para encontrar prestadores próximos a você
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowLocationModal(false)}
              >
                Cancelar
              </Button>
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700"
                onClick={handleSaveLocation}
              >
                Salvar Localização
              </Button>
            </div>
            
            <div className="pt-2 border-t">
              <Button
                variant="ghost"
                className="w-full text-green-600"
                onClick={() => {
                  setShowLocationModal(false);
                  // Trigger location detection
                  if (navigator.geolocation) {
                    setIsGettingLocation(true);
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const { latitude, longitude } = position.coords;
                        const location = { lat: latitude, lng: longitude };
                        setUserLocation(location);
                        setMapCenter(location);
                        
                        try {
                          const response = await fetch(
                            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0`
                          );
                          const data = await response.json();
                          if (data.results && data.results[0]) {
                            setLocationInput(data.results[0].formatted_address);
                          }
                        } catch (err) {
                          console.error('Erro ao obter endereço:', err);
                        }
                        
                        setIsGettingLocation(false);
                        alert('✓ Localização atualizada com sucesso!');
                      },
                      (error) => {
                        setIsGettingLocation(false);
                        alert('Não foi possível obter sua localização.');
                      }
                    );
                  }
                }}
                disabled={isGettingLocation}
              >
                {isGettingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Obtendo localização...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Ou usar localização automática
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Mapa;
