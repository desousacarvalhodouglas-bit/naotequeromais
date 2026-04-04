import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Bell, MessageSquare, Menu, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import BottomNav from './BottomNav';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { label: 'Feed', path: '/feed' },
    { label: 'Empregos', path: '/empregos' },
    { label: 'Mapa', path: '/mapa' },
    { label: 'Mensagens', path: '/mensagens' },
    { label: 'Dashboard', path: '/admin/dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/feed')}>
            <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-tight">
                <span className="text-pink-500">servi</span>
                <span className="text-green-500">vizinhos</span>
              </span>
              <span className="text-[10px] text-gray-500 uppercase leading-tight">Facilitador de Projetos</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-green-600 border-b-2 border-green-600 pb-1'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button onClick={() => navigate('/mensagens')} className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar with Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2">
                <Avatar className="w-9 h-9 border-2 border-green-400">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-green-100 text-green-700 text-sm">
                    {user?.name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-semibold text-sm">{user?.name || 'Usuário'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <div className="py-2">
                  <button
                    onClick={() => navigate('/perfil')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Meu Perfil
                  </button>
                  <button
                    onClick={() => navigate('/abonamento')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Assinatura
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Sair
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Menu */}
            <button className="md:hidden p-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="sm:hidden bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-3">
          {/* Logo and Location */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/feed')}>
              <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold">
                  <span className="text-pink-500">servi</span>
                  <span className="text-green-500">vizinhos</span>
                </span>
              </div>
            </div>
            
            <button className="relative p-2">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* Location Badge */}
          <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full w-fit">
            <MapPin className="w-3 h-3" />
            <span>Jataí, Goiás</span>
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <BottomNav />
    </header>
  );
};

export default Header;
