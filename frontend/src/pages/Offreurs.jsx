import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Check, X } from 'lucide-react';

const Offreurs = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Standard',
      price: 'Gratuito',
      priceDetail: '',
      buttonText: 'Modificar',
      buttonVariant: 'default',
      features: {
        'Propor meus serviços': {
          'Perímetro de intervenção': { standard: true, premier: true },
          'Notificações "Novas demandas"': { standard: true, premier: true },
        },
        'Responder às demandas': {
          'Locação de material': { standard: true, premier: true },
          'Prestação de serviço': { standard: 'Amostra', premier: 'Ilimitado*' },
        },
        'Minha visibilidade': {
          'Número de telefone': { standard: false, premier: true },
          'Fotos das minhas realizações': { standard: '3', premier: '50' },
          'Suprimir perfis similares': { standard: false, premier: true },
        },
        'Meu referenciamento no Google': {
          'Referenciamento prioritário no Google': { standard: false, premier: true },
        },
        'Assistência': {
          'Acompanhamento personalizado e prioritário': { standard: false, premier: true },
        },
      },
    },
    {
      name: 'Premier',
      price: 'A partir de R$ 29,90',
      priceDetail: '/ mês',
      subtext: 'Sem compromisso',
      buttonText: 'Converter',
      buttonVariant: 'premier',
      isPremium: true,
      features: {},
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Abonamento</h1>
        <p className="text-center text-gray-600 mb-8">Compare as diferentes fórmulas</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 shadow-lg rounded-lg overflow-hidden">
          {/* Standard Plan */}
          <Card className="bg-white border-r-0 rounded-r-none p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{plans[0].name}</h2>
              <p className="text-xl font-semibold mb-4">{plans[0].price}</p>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                {plans[0].buttonText}
              </Button>
            </div>
          </Card>

          {/* Premier Plan */}
          <Card className="bg-white rounded-l-none p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2 text-[#FF6B6B]">{plans[1].name}</h2>
              <p className="text-xl font-semibold text-[#FF6B6B] mb-1">{plans[1].price}</p>
              <p className="text-sm text-gray-500 mb-4">{plans[1].subtext}</p>
              <Button className="w-full bg-[#FF9B8A] hover:bg-[#FF8A79] text-white">
                {plans[1].buttonText}
              </Button>
            </div>
          </Card>
        </div>

        {/* Features Comparison Table */}
        <Card className="mt-6 p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {/* Propor meus serviços */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg" colSpan={3}>
                    Propor meus serviços
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Perímetro de intervenção</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Notificações "Novas demandas"</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>

                {/* Responder às demandas */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg" colSpan={3}>
                    Responder às demandas
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Locação de material</td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Prestação de serviço</td>
                  <td className="p-4 text-center text-sm text-gray-600">Amostra</td>
                  <td className="p-4 text-center">
                    <div className="text-sm font-medium">Ilimitado*</div>
                    <div className="text-xs text-gray-500">* dentro do perímetro</div>
                  </td>
                </tr>

                {/* Minha visibilidade */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg" colSpan={3}>
                    Minha visibilidade
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Número de telefone</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Fotos das minhas realizações</td>
                  <td className="p-4 text-center font-semibold">3</td>
                  <td className="p-4 text-center font-semibold">50</td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Suprimir perfis similares</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>

                {/* Meu referenciamento no Google */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg" colSpan={3}>
                    Meu referenciamento no Google
                  </td>
                </tr>
                
                <tr className="border-b border-gray-100">
                  <td className="p-4 text-gray-700">Referenciamento prioritário no Google</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>

                {/* Assistência */}
                <tr className="bg-gray-50">
                  <td className="p-4 font-bold text-lg" colSpan={3}>
                    Assistência
                  </td>
                </tr>
                
                <tr>
                  <td className="p-4 text-gray-700">Acompanhamento personalizado e prioritário</td>
                  <td className="p-4 text-center">
                    <X className="w-5 h-5 text-red-400 mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="w-5 h-5 text-green-600 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* CTA */}
        <div className="text-center mt-8">
          <Button 
            size="lg" 
            className="bg-[#FF9B8A] hover:bg-[#FF8A79] text-white px-12"
            onClick={() => navigate('/abonamento')}
          >
            Assinar Plano Premier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Offreurs;
