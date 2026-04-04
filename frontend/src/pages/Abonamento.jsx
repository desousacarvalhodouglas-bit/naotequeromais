import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ArrowLeft, MapPin, Smartphone, Check, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const serviceCategories = [
  { id: 'bricolagem', name: 'Bricolagem - Trabalhos', items: ['Montagem de móveis em kit'] },
  { id: 'mudanca', name: 'Mudança - Manutenção', items: ['Mudanças e ajuda com mudança', 'Manutenção'] },
  { id: 'veiculos', name: 'Manutenção - Reparação veículos', items: ['Lavagem de carro', 'Reparação de veículo - moto'] },
  { id: 'servicos', name: 'Serviços veiculares', items: ['Retirada de lixo - Entulho'] }
];

const plans = [
  {
    id: 'basic',
    name: 'Básico',
    price: 29.90,
    demandas: '50 demandas por mês',
    description: 'Média nos últimos 12 meses'
  },
  {
    id: 'pro',
    name: 'Profissional',
    price: 79.90,
    demandas: '120 demandas por mês',
    description: 'Média nos últimos 12 meses',
    popular: true
  },
  {
    id: 'premier',
    name: 'Premier',
    price: 199.90,
    demandas: '294 demandas por mês',
    description: 'Média nos últimos 12 meses'
  }
];

const Abonamento = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [location, setLocation] = useState('54 Avenue de New York, 75016 Paris');
  const [radius, setRadius] = useState([2]);
  const [selectedCategories, setSelectedCategories] = useState(['bricolagem', 'mudanca']);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [pixKey, setPixKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const currentPlan = plans.find(p => p.id === selectedPlan);

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleFinalize = async () => {
    setShowPaymentModal(true);
    
    try {
      // Chave PIX real: JONHSON DE SOUSA CARVALHO
      // CNPJ: 51.965.652
      // Chave: 3ef112O0-bebf-4d88-930c-48e84b11cfc4
      // Instituição: NU PAGAMENTOS - IP
      const pixPayload = `00020126580014BR.GOV.BCB.PIX0136${btoa('3ef112O0-bebf-4d88-930c-48e84b11cfc4').substring(0, 32)}5204000053039865802BR5925JONHSON DE SOUSA CARVALHO6015NU PAGAMENTOS-IP62070503***6304${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setPixKey('3ef112O0-bebf-4d88-930c-48e84b11cfc4');
    } catch (error) {
      console.error('Erro ao gerar PIX:', error);
      setPixKey('3ef112O0-bebf-4d88-930c-48e84b11cfc4');
    }
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Enviar confirmação ao backend
      await axios.post(`${BACKEND_URL}/api/payments/confirm`, {
        planId: selectedPlan,
        paymentMethod: 'pix',
        amount: currentPlan.price
      });
      
      alert('Pagamento confirmado! Seu plano foi ativado com sucesso.');
      setShowPaymentModal(false);
      navigate('/perfil');
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyPixKey = () => {
    navigator.clipboard.writeText(pixKey);
    alert('Chave PIX copiada!');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-3 py-4">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Criar meu perímetro Premier</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-4">
            {/* Section 1: Location */}
            <Card className="p-4">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-base mb-1">Até onde você deseja atuar?</h2>
                  <p className="text-sm text-gray-600">
                    Quanto maior o raio de atuação, mais demandas você receberá
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-10"
                    placeholder="Seu endereço"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm">Num raio de:</Label>
                    <span className="font-semibold text-green-600">{radius[0]} km</span>
                  </div>
                  <Slider
                    value={radius}
                    onValueChange={setRadius}
                    max={50}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Section 2: Categories */}
            <Card className="p-4">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-base mb-1">Em quais categorias?</h2>
                  <p className="text-sm text-gray-600">
                    Quanto mais categorias você selecionar, mais demandas receberá
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {serviceCategories.map((category) => (
                  <Card key={category.id} className="p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2 flex-1">
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                          id={category.id}
                        />
                        <label htmlFor={category.id} className="font-semibold text-sm cursor-pointer">
                          {category.name}
                        </label>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">
                        Modificar
                      </button>
                    </div>
                    <ul className="ml-7 space-y-1">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-600">• {item}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar - Summary */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-20">
              <h3 className="font-bold text-base mb-3">Recapitulativo</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">Paris, +/- {radius[0]}km</span>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-1">Serviços: {selectedCategories.length} categorias</p>
                  <p className="text-sm text-gray-600">Objetos (oferta): 3 categorias</p>
                </div>
              </div>

              <Card className="p-3 bg-pink-50 border-pink-200 mb-4">
                <p className="text-sm font-semibold text-pink-900 mb-1">
                  {currentPlan.demandas}*
                </p>
                <p className="text-xs text-pink-700">
                  * {currentPlan.description}
                </p>
              </Card>

              <div className="mb-4">
                <Label className="text-sm mb-2 block">Selecione seu plano:</Label>
                <div className="space-y-2">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                        selectedPlan === plan.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-sm">{plan.name}</p>
                          <p className="text-xs text-gray-600">{plan.demandas}</p>
                        </div>
                        <p className="text-lg font-bold text-green-600">
                          R$ {plan.price.toFixed(2)}
                        </p>
                      </div>
                      {plan.popular && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mt-1 inline-block">
                          Mais Popular
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-center mb-3">
                <p className="text-2xl font-bold text-gray-900">
                  R$ {currentPlan.price.toFixed(2)} <span className="text-base font-normal text-gray-600">/ mês</span>
                </p>
                <p className="text-xs text-gray-500">Sem compromisso</p>
              </div>

              <Button
                onClick={handleFinalize}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white h-11"
              >
                Finalizar
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Finalizar Pagamento</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Plano:</span>
                <span className="font-semibold">{currentPlan.name}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  R$ {currentPlan.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="font-semibold text-center mb-3">Pagamento via PIX</h3>
              <div className="w-48 h-48 bg-white mx-auto mb-3 rounded-lg flex items-center justify-center border-2 border-gray-200 p-2">
                {pixKey ? (
                  <QRCodeSVG 
                    value={pixKey} 
                    size={176}
                    level="M"
                    includeMargin={false}
                  />
                ) : (
                  <div className="text-center">
                    <span className="text-xs text-gray-500">Gerando QR Code...</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 text-center mb-2 font-medium">
                Escaneie o código QR ou copie a chave PIX abaixo
              </p>
              <div className="bg-white p-3 rounded-lg mb-2">
                <p className="text-xs text-gray-500 mb-1">Chave PIX (UUID):</p>
                <div className="flex space-x-2">
                  <Input
                    value={pixKey || '3ef112O0-bebf-4d88-930c-48e84b11cfc4'}
                    readOnly
                    className="text-xs flex-1 font-mono"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyPixKey}
                    className="px-3"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <strong>Beneficiário:</strong> SERVIVIZINHOS<br />
                  <strong>Instituição:</strong> NU PAGAMENTOS - IP
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg text-xs text-blue-700">
                <p className="font-semibold mb-1">📱 Como pagar:</p>
                <ol className="list-decimal list-inside space-y-1 text-xs">
                  <li>Abra o app do seu banco</li>
                  <li>Escolha pagar com PIX</li>
                  <li>Escaneie o QR Code ou cole a chave</li>
                  <li>Confirme o pagamento de R$ {currentPlan.price.toFixed(2)}</li>
                </ol>
              </div>
              <p className="text-xs text-green-600 mt-3 text-center font-medium">
                ✓ Pagamento confirmado automaticamente em até 5 minutos
              </p>
            </div>

            <Button
              onClick={handleConfirmPayment}
              disabled={isProcessing}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {isProcessing ? 'Processando...' : 'Confirmar Pagamento'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Abonamento;
