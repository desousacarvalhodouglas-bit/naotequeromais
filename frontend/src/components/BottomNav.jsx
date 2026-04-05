import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Users, Plus, CreditCard, MessageSquare } from 'lucide-react';
import CreatePostModal from './CreatePostModal';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { icon: Home, label: 'Accueil', path: '/feed', count: 0 },
    { icon: Users, label: 'Offreurs', path: '/mapa', count: '999' },
    { icon: Plus, label: 'Postar', action: () => setShowCreatePost(true), isPlus: true },
    { icon: CreditCard, label: 'Abonnement', path: '/abonamento', count: 1 },
    { icon: MessageSquare, label: 'Messages', path: '/mensagens', count: 2 },
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <>
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = item.path && isActive(item.path);
            
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center justify-center flex-1 relative ${
                  item.isPlus ? 'transform -translate-y-2' : ''
                }`}
              >
                {item.isPlus ? (
                  <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Icon 
                        className={`w-6 h-6 ${active ? 'text-purple-600' : 'text-gray-600'}`} 
                      />
                      {item.count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                          {item.count}
                        </span>
                      )}
                    </div>
                    <span className={`text-[10px] mt-1 ${active ? 'text-purple-600 font-semibold' : 'text-gray-600'}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal 
        open={showCreatePost} 
        onClose={() => setShowCreatePost(false)} 
      />
    </>
  );
};

export default BottomNav;
