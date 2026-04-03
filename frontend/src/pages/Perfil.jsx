import React from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import { MapPin, Mail, Phone, Calendar, Edit, Star, Briefcase } from 'lucide-react';

const Perfil = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24 border-4 border-green-200">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-green-100 text-green-700 text-3xl">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{user?.name || 'Usuário'}</h1>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-3">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-green-600" />
                  {user?.email}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-green-600" />
                  {user?.location || 'Localização não informada'}
                </div>
                {user?.phone && (
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-green-600" />
                    {user.phone}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-gray-500 text-sm ml-1">(24 avaliações)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 text-center">
            <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-sm text-gray-600">Serviços Prestados</p>
          </Card>
          <Card className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-sm text-gray-600">Avaliação Média</p>
          </Card>
          <Card className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">6</p>
            <p className="text-sm text-gray-600">Meses no ServiVizinhos</p>
          </Card>
        </div>

        {/* About */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sobre</h2>
          <p className="text-gray-600 mb-4">
            Profissional dedicado com experiência em prestação de serviços de qualidade. 
            Comprometido em oferecer o melhor atendimento aos clientes.
          </p>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Editar Descrição
          </Button>
        </Card>

        {/* Services */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Serviços Oferecidos</h2>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Manutenção Residencial
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Reformas
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              Consultoria
            </span>
          </div>
          <Button variant="outline" className="mt-4">
            <Edit className="w-4 h-4 mr-2" />
            Gerenciar Serviços
          </Button>
        </Card>

        {/* Reviews */}
        <Card className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Avaliações Recentes</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=20" />
                    <AvatarFallback>M</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">Maria Silva</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Excelente profissional! Muito atencioso e caprichoso no trabalho.
              </p>
              <p className="text-xs text-gray-400 mt-1">Há 2 dias</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://i.pravatar.cc/150?img=32" />
                    <AvatarFallback>J</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold text-sm">João Santos</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Serviço impecável! Recomendo muito.
              </p>
              <p className="text-xs text-gray-400 mt-1">Há 1 semana</p>
            </div>
          </div>
          <Button variant="outline" className="mt-4 w-full">
            Ver Todas as Avaliações
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Perfil;
