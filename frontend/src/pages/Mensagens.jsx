import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

const mockConversations = [
  {
    id: 'c1',
    name: 'João Silva',
    avatar: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Obrigado pelo orçamento!',
    time: '10:30',
    unread: 2,
    online: true
  },
  {
    id: 'c2',
    name: 'Maria Santos',
    avatar: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'Posso começar amanhã às 9h',
    time: 'Ontem',
    unread: 0,
    online: false
  },
  {
    id: 'c3',
    name: 'Carlos Oliveira',
    avatar: 'https://i.pravatar.cc/150?img=33',
    lastMessage: 'Vou enviar as fotos do trabalho',
    time: '2 dias',
    unread: 1,
    online: true
  },
  {
    id: 'c4',
    name: 'Ana Costa',
    avatar: 'https://i.pravatar.cc/150?img=25',
    lastMessage: 'Combinado então!',
    time: '3 dias',
    unread: 0,
    online: false
  }
];

const mockMessages = {
  'c1': [
    { id: 'm1', sender: 'other', text: 'Olá! Vi seu pedido de eletricista', time: '10:15' },
    { id: 'm2', sender: 'me', text: 'Oi! Sim, preciso instalar 3 tomadas', time: '10:18' },
    { id: 'm3', sender: 'other', text: 'Posso fazer por R$ 150. Quando precisa?', time: '10:25' },
    { id: 'm4', sender: 'me', text: 'Perfeito! Pode ser amanhã?', time: '10:28' },
    { id: 'm5', sender: 'other', text: 'Obrigado pelo orçamento!', time: '10:30' }
  ],
  'c2': [
    { id: 'm1', sender: 'other', text: 'Boa tarde! Recebi sua mensagem', time: 'Ontem 14:20' },
    { id: 'm2', sender: 'me', text: 'Ótimo! Podemos marcar para esta semana?', time: 'Ontem 14:25' },
    { id: 'm3', sender: 'other', text: 'Posso começar amanhã às 9h', time: 'Ontem 15:10' }
  ]
};

const Mensagens = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = mockMessages[selectedConversation.id] || [];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // Here you would send the message to backend
    console.log('Sending message:', messageText);
    setMessageText('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-140px)] flex">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-r border-gray-200 flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conv.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={conv.avatar} alt={conv.name} />
                        <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{conv.name}</h3>
                        <span className="text-xs text-gray-500">{conv.time}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <span className="ml-2 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="hidden md:flex md:w-2/3 flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                    <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">
                      {selectedConversation.online ? 'Online agora' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-4">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'me' ? 'text-green-100' : 'text-gray-500'
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile: Show message when no conversation selected */}
          <div className="md:hidden flex-1 flex items-center justify-center text-gray-400">
            <p>Selecione uma conversa</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mensagens;
