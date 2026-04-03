import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Search, Wrench, ArrowLeft, Loader2, Building2, User, Briefcase, Eye, EyeOff, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NewHome = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [language, setLanguage] = useState('PT');
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    lastName: '',
    commercialName: '',
    profession: '',
    email: '',
    password: '',
    location: '',
    phone: '',
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  // Detectar localização automaticamente
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            // Usar Google Maps Geocoding API para obter endereço
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDUxe-HLztnRiQ8mFew15NCs2TWBUJ8Jl0`
            );
            const data = await response.json();
            if (data.results && data.results[0]) {
              const address = data.results[0].formatted_address;
              setUserLocation(address);
              setRegisterData(prev => ({ ...prev, location: address }));
            }
          } catch (err) {
            console.error('Erro ao obter localização:', err);
            setUserLocation('Jataí, Goiás');
          }
        },
        (error) => {
          console.error('Erro ao obter geolocalização:', error);
          setUserLocation('Jataí, Goiás');
        }
      );
    } else {
      setUserLocation('Jataí, Goiás');
    }
  }, []);

  const resetRegister = () => {
    setStep(1);
    setAccountType('');
    setRegisterData({ 
      name: '', 
      lastName: '', 
      commercialName: '', 
      profession: '', 
      email: '', 
      password: '', 
      location: userLocation || 'Jataí, Goiás', 
      phone: '' 
    });
    setAcceptTerms(false);
    setError('');
  };

  const handleRegister = async () => {
    if (!registerData.email || !registerData.password) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }
    if (!acceptTerms) {
      setError('Aceite os termos de uso para continuar');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const fullName = accountType === 'particular'
        ? `${registerData.name} ${registerData.lastName}`.trim()
        : registerData.commercialName || registerData.name;
      await register({
        name: fullName || 'Usuário',
        email: registerData.email,
        password: registerData.password,
        location: registerData.location || 'Brasil',
        phone: registerData.phone || undefined,
      });
      setShowCreateAccount(false);
      resetRegister();
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.detail || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError('Preencha email e senha');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      await login(loginData.email, loginData.password);
      setShowLogin(false);
      navigate('/feed');
    } catch (err) {
      setError(err.response?.data?.detail || 'Email ou senha incorretos');
    } finally {
      setIsLoading(false);
    }
  };

  const selectAccountType = (type) => {
    setAccountType(type);
    setStep(2);
    setError('');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">
                <span className="text-pink-500">servi</span>
                <span className="text-green-500">vizinhos</span>
              </span>
              <span className="text-xs text-gray-500 uppercase">Facilitador de Projetos</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm">
              {['PT', 'FR', 'EN', 'ES'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded ${language === lang ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600 hover:text-green-600'}`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button variant="outline" onClick={() => { setShowLogin(true); setError(''); }} className="border-gray-300">
              Entrar
            </Button>
            <Button onClick={() => { setShowCreateAccount(true); resetRegister(); }} className="bg-gray-900 hover:bg-gray-800 text-white">
              Cadastrar-se
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full mb-4">
                <span className="text-green-600 font-semibold flex items-center space-x-1">
                  <span className="text-yellow-500">★</span>
                  <span>4.8/5</span>
                </span>
                <span className="text-gray-600 text-sm">420k avaliações</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Conectando profissionais
              <br />
              <span className="text-green-600">em Jataí e Goiás</span>
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              A maior plataforma de serviços e empregos de Goiás
            </p>
            <div className="flex items-center space-x-2 mb-8 text-sm text-gray-600">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Atuando em Jataí, Rio Verde, Goiânia e toda região goiana</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button onClick={() => { setShowCreateAccount(true); resetRegister(); }} className="bg-gray-900 hover:bg-gray-800 text-white h-14 px-8 text-base">
                <Search className="w-5 h-5 mr-2" />
                Preciso de um serviço
              </Button>
              <Button onClick={() => navigate('/offreurs')} variant="outline" className="border-2 border-green-500 text-green-600 hover:bg-green-50 h-14 px-8 text-base">
                <Wrench className="w-5 h-5 mr-2" />
                Busco emprego em Goiás
              </Button>
            </div>
            
            {/* Regional Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">5.000+</p>
                <p className="text-sm text-gray-600">Profissionais em Goiás</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">850+</p>
                <p className="text-sm text-gray-600">Vagas em Jataí</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">12k+</p>
                <p className="text-sm text-gray-600">Serviços realizados</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1555955207-cf6fba0f1f57?w=1200&h=800&fit=crop&q=90" alt="Vizinhos ajudando em serviços" className="w-full h-[500px] object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Goiás Region Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Por que escolher o ServiVizinhos em Goiás?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Somos a ponte entre quem precisa de serviços e profissionais qualificados em todo estado de Goiás
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Cobertura Regional</h3>
              <p className="text-gray-600 text-sm">
                Jataí, Rio Verde, Goiânia, Anápolis, Aparecida de Goiânia e mais de 50 cidades goianas
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Empregos Locais</h3>
              <p className="text-gray-600 text-sm">
                Vagas específicas para a região do sudoeste goiano, conectando empresas locais com talentos
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Comunidade Ativa</h3>
              <p className="text-gray-600 text-sm">
                Milhares de goianos já confiam no ServiVizinhos para encontrar serviços e oportunidades
              </p>
            </div>
          </div>
          
          {/* Cities Coverage */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-center mb-6">Principais cidades atendidas</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Jataí', 'Rio Verde', 'Goiânia', 'Anápolis', 'Aparecida de Goiânia', 'Catalão', 'Itumbiara', 'Luziânia', 'Formosa', 'Mineiros', 'Senador Canedo', 'Trindade'].map(city => (
                <span key={city} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200">
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* App Store Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl">▶</div>
              <div>
                <p className="font-semibold text-lg mb-1">Google Play</p>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="font-bold">4.6/5</span>
                </div>
                <p className="text-sm text-gray-600">47.154 avaliações</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="text-4xl"></div>
              <div>
                <p className="font-semibold text-lg mb-1">App Store</p>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-yellow-500">★★★★★</span>
                  <span className="font-bold">4.6/5</span>
                </div>
                <p className="text-sm text-gray-600">66.000 avaliações</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-green-500 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-white text-lg font-medium mb-1">
              Junte-se aos milhares de goianos no ServiVizinhos
            </p>
            <p className="text-green-50 text-sm">
              {userLocation ? `📍 Sua localização: ${userLocation}` : 'Encontre serviços e empregos perto de você'}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => { setShowCreateAccount(true); resetRegister(); }} className="bg-white text-green-600 hover:bg-gray-100 px-8">
              Cadastrar-se Grátis
            </Button>
            <button onClick={() => { setShowLogin(true); setError(''); }} className="text-white underline hover:no-underline">
              Já tem conta? Entrar
            </button>
          </div>
        </div>
      </div>

      {/* MULTI-STEP REGISTER MODAL */}
      <Dialog open={showCreateAccount} onOpenChange={(open) => { setShowCreateAccount(open); if (!open) resetRegister(); }}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">Criar conta</DialogTitle>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              {step > 1 ? (
                <button onClick={() => { setStep(1); setError(''); }} className="text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              ) : <div />}
            </div>

            {step === 1 && (
              <>
                <h2 className="text-xl font-bold text-center mb-8">
                  Me inscrevo como:
                </h2>

                <div className="space-y-3 mb-6">
                  <button
                    onClick={() => selectAccountType('particular')}
                    className="w-full flex items-center justify-center gap-3 h-14 border-2 border-gray-200 rounded-xl text-base font-medium hover:border-green-500 hover:bg-green-50 transition-all"
                  >
                    <User className="w-5 h-5" />
                    Particular
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-sm text-gray-500">ou</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => selectAccountType('autonomo')}
                    className="w-full flex items-center justify-center gap-3 h-14 border-2 border-gray-200 rounded-xl text-base font-medium hover:border-green-500 hover:bg-green-50 transition-all"
                  >
                    <Briefcase className="w-5 h-5" />
                    Autônomo
                  </button>
                  <button
                    onClick={() => selectAccountType('empresa')}
                    className="w-full flex items-center justify-center gap-3 h-14 border-2 border-gray-200 rounded-xl text-base font-medium hover:border-green-500 hover:bg-green-50 transition-all"
                  >
                    <Building2 className="w-5 h-5" />
                    Empresa
                  </button>
                </div>

                <p className="text-center text-sm text-gray-400 mt-8">Etapa 1/2</p>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-xl font-bold text-center mb-6">Criar conta</h2>

                {error && (
                  <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
                )}

                <div className="space-y-4">
                  {accountType === 'particular' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Nome</Label>
                        <Input
                          placeholder="Nome"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          className="h-12 border-gray-300"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Sobrenome</Label>
                        <Input
                          placeholder="Sobrenome"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          className="h-12 border-gray-300"
                        />
                      </div>
                    </div>
                  )}

                  {(accountType === 'autonomo' || accountType === 'empresa') && (
                    <div>
                      <Label className="text-xs text-gray-500">Nome comercial</Label>
                      <Input
                        placeholder="Nome comercial"
                        value={registerData.commercialName}
                        onChange={(e) => setRegisterData({ ...registerData, commercialName: e.target.value })}
                        className="h-12 border-gray-300"
                      />
                    </div>
                  )}

                  {accountType === 'empresa' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs text-gray-500">Nome do dirigente</Label>
                        <Input
                          placeholder="Nome"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                          className="h-12 border-gray-300"
                        />
                      </div>
                      <div>
                        <Label className="text-xs text-gray-500">Sobrenome do dirigente</Label>
                        <Input
                          placeholder="Sobrenome"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          className="h-12 border-gray-300"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label className="text-xs text-gray-500">Profissão</Label>
                    <Input
                      placeholder="Profissão"
                      value={registerData.profession}
                      onChange={(e) => setRegisterData({ ...registerData, profession: e.target.value })}
                      className="h-12 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Endereço</Label>
                    <Input
                      placeholder="Endereço postal"
                      value={registerData.location}
                      onChange={(e) => setRegisterData({ ...registerData, location: e.target.value })}
                      className="h-12 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">Celular</Label>
                    <Input
                      placeholder="Celular"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                      className="h-12 border-gray-300"
                    />
                  </div>

                  <div>
                    <Label className="text-xs text-gray-500">E-mail</Label>
                    <Input
                      type="email"
                      placeholder="E-mail"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="h-12 border-gray-300"
                      required
                    />
                  </div>

                  <div className="relative">
                    <Label className="text-xs text-gray-500">Senha</Label>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="h-12 border-gray-300 pr-10"
                      required
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8">
                      {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                    </button>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input type="checkbox" className="mt-1 rounded border-gray-300" />
                      <span className="text-xs text-gray-600">Receber informações dos nossos parceiros</span>
                    </label>
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        className="mt-1 rounded border-gray-300"
                      />
                      <span className="text-xs text-gray-600">
                        Aceito as{' '}
                        <span className="text-green-600 underline cursor-pointer">condições gerais de venda e utilização</span>
                      </span>
                    </label>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={isLoading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white h-14 text-base mt-2"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Inscrever-me'}
                  </Button>
                </div>

                <p className="text-center text-sm text-gray-400 mt-4">Etapa 2/2</p>

                <div className="text-center mt-3">
                  <button onClick={() => { setShowCreateAccount(false); setShowLogin(true); setError(''); resetRegister(); }} className="text-sm text-green-600 hover:underline">
                    Já tem conta? Entrar
                  </button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* LOGIN MODAL */}
      <Dialog open={showLogin} onOpenChange={(open) => { if (!isLoading) { setShowLogin(open); if (!open) setError(''); } }}>
        <DialogContent className="max-w-md" onInteractOutside={(e) => { if (isLoading) e.preventDefault(); }}>
          <DialogTitle className="sr-only">Entrar</DialogTitle>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Que bom te ver de volta!</h2>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4">{error}</div>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label className="text-xs text-gray-500">E-mail</Label>
                <Input
                  type="email"
                  placeholder="E-mail"
                  className="h-12"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <Label className="text-xs text-gray-500">Senha</Label>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  className="h-12 pr-10"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8">
                  {showPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full bg-gray-900 hover:bg-gray-800 h-12">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
              </Button>
            </form>
            <div className="text-center mt-4">
              <button className="text-sm text-gray-500 hover:underline">
                Esqueceu a senha?
              </button>
            </div>
            <div className="text-center mt-2">
              <button onClick={() => { setShowLogin(false); setShowCreateAccount(true); setError(''); resetRegister(); }} className="text-sm text-green-600 hover:underline">
                Não tem conta? Criar conta
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewHome;
