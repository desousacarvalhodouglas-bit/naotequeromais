import React, { useState } from 'react';
import Header from '../components/Header';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { MapPin, Briefcase, DollarSign, Clock, Search, ExternalLink } from 'lucide-react';
import { mockJobs, jobCategories } from '../mock/jobsData';

const jobBoards = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/jobs/', color: 'bg-blue-600', icon: '💼' },
  { name: 'Catho', url: 'https://www.catho.com.br/', color: 'bg-orange-500', icon: '🎯' },
  { name: 'Indeed', url: 'https://br.indeed.com/', color: 'bg-blue-700', icon: '🔍' },
  { name: 'InfoJobs', url: 'https://www.infojobs.com.br/', color: 'bg-pink-600', icon: '💡' },
  { name: 'Vagas.com', url: 'https://www.vagas.com.br/', color: 'bg-green-600', icon: '📋' },
  { name: 'Gupy', url: 'https://www.gupy.io/', color: 'bg-purple-600', icon: '🚀' }
];

const Empregos = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = !searchQuery || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vagas de Emprego</h1>
          <p className="text-gray-600">Busque em múltiplos sites ou veja nossas vagas disponíveis</p>
        </div>

        {/* Job Boards Section */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <Briefcase className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-900">Buscar em Sites Parceiros</h2>
          </div>
          <p className="text-gray-600 mb-6">
            Clique para buscar vagas nos principais sites de emprego do Brasil
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jobBoards.map((board) => (
              <a
                key={board.name}
                href={board.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <Card className="p-4 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500">
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-16 h-16 ${board.color} rounded-xl flex items-center justify-center mb-3 text-3xl group-hover:scale-110 transition-transform`}>
                      {board.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{board.name}</h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 mt-2" />
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </Card>

        {/* Search and Filters */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar vaga por título ou empresa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-4">
            {jobCategories.map(category => (
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

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredJobs.length}</span> vagas encontradas
          </p>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                  <p className="text-gray-700 font-medium mb-3">{job.company}</p>
                  <p className="text-gray-600 mb-4">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.postedAt}
                    </div>
                  </div>
                  
                  <Badge variant="secondary">{job.category}</Badge>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-6">
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
                    Candidatar-se
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <Card className="p-12 text-center">
            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Nenhuma vaga encontrada</p>
            <p className="text-gray-400 text-sm mt-2">Tente ajustar os filtros de busca</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Empregos;
