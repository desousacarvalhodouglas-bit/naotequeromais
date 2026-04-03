import React from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { MapPin, Star, Edit, Settings } from 'lucide-react';
import { getCurrentUser, mockDemands } from '../mock/data';

const Profile = () => {
  const user = getCurrentUser();
  const myDemands = mockDemands.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />
      <div className="max-w-5xl mx-auto px-3 py-3">
        {/* Profile Header */}
        <Card className="p-4 mb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h1 className="text-xl font-bold">{user.name}</h1>
                  {user.isPremier && (
                    <Badge className="bg-[#FF9B8A] text-white text-xs">Premier</Badge>
                  )}
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{user.rating}</span>
                  <span className="text-xs text-gray-500">({user.reviews} avis)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-1" />
                Éditer
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="demandes" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-3">
            <TabsTrigger value="demandes">Mes demandes</TabsTrigger>
            <TabsTrigger value="services">Mes services</TabsTrigger>
            <TabsTrigger value="avis">Avis reçus</TabsTrigger>
          </TabsList>

          <TabsContent value="demandes">
            <div className="space-y-2">
              {myDemands.map((demand) => (
                <Card key={demand.id} className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-sm">{demand.title}</h3>
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">{demand.description}</p>
                  <div className="flex justify-between items-center text-xs text-gray-600">
                    <span>{demand.responses} réponse{demand.responses > 1 ? 's' : ''}</span>
                    <span>Budget : {demand.budget}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="services">
            <Card className="p-4 text-center text-sm text-gray-500">
              Vous n'avez pas encore proposé de services
            </Card>
          </TabsContent>

          <TabsContent value="avis">
            <div className="space-y-2">
              <Card className="p-3">
                <div className="flex items-start space-x-2 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=25" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">Marie Dubois</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">
                      Très professionnel et rapide. Je recommande !
                    </p>
                    <span className="text-xs text-gray-500">Il y a 1 semaine</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;