import React from 'react';
import { Card } from '../../components/ui/card';
import { BarChart3, Users, FileText, TrendingUp, DollarSign, Package } from 'lucide-react';

const stats = [
  { label: 'Demandas Recebidas', value: '48', change: '+12%', icon: FileText, color: 'bg-blue-500' },
  { label: 'Orçamentos Enviados', value: '32', change: '+8%', icon: BarChart3, color: 'bg-green-500' },
  { label: 'Clientes Ativos', value: '127', change: '+23%', icon: Users, color: 'bg-purple-500' },
  { label: 'Receita do Mês', value: 'R$ 8.450', change: '+15%', icon: DollarSign, color: 'bg-yellow-500' }
];

const recentActivities = [
  { id: 1, type: 'Nova demanda', description: 'Instalação elétrica - São Paulo', time: 'Há 2h' },
  { id: 2, type: 'Orçamento aceito', description: 'Reforma de cozinha - Cliente Maria S.', time: 'Há 4h' },
  { id: 3, type: 'Pagamento recebido', description: 'R$ 1.200,00 - Projeto concluído', time: 'Há 6h' },
  { id: 4, type: 'Nova avaliação', description: '5 estrelas - João Silva', time: 'Há 1 dia' }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Painel de Controle</h1>
        <p className="text-sm text-gray-600">Bem-vindo ao seu dashboard administrativo</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-semibold text-green-600">{stat.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-600">{stat.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-base font-bold mb-3">Demandas por Categoria</h3>
          <div className="space-y-3">
            {[
              { category: 'Elétrica', value: 35, color: 'bg-blue-500' },
              { category: 'Encanamento', value: 28, color: 'bg-green-500' },
              { category: 'Pintura', value: 20, color: 'bg-yellow-500' },
              { category: 'Marcenaria', value: 17, color: 'bg-purple-500' }
            ].map((item) => (
              <div key={item.category}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{item.category}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-base font-bold mb-3">Atividades Recentes</h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{activity.type}</p>
                  <p className="text-xs text-gray-600">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-4">
        <h3 className="text-base font-bold mb-3">Ações Rápidas</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Novo Orçamento', icon: FileText, color: 'bg-blue-500' },
            { label: 'Adicionar Cliente', icon: Users, color: 'bg-green-500' },
            { label: 'Criar Fatura', icon: Package, color: 'bg-purple-500' },
            { label: 'Ver Relatórios', icon: TrendingUp, color: 'bg-yellow-500' }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 transition-all text-center"
              >
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;