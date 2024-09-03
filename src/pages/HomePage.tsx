// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import api from '../api';

interface Evaluation {
  nomeEmpresa: string;
  cargo: string;
  nivel: string;
  nomeAutor: string;
  titulo: string;
  texto: string;
  oportunidadesCarreira: number;
  remuneracaoBeneficios: number;
  culturaValores: number;
  liderancaAlta: number;
  diversidadeInclusao: number;
  auxilioCreche: number;
  salario: number;
  qualidadeVida: number;
}

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const response = await api.get('/avaliacoes');
        setEvaluations(response.data);
      } catch (error) {
        console.error('Erro ao buscar avaliações:', error);
      }
    };

    fetchEvaluations();
  }, []);

  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.nomeEmpresa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <Link to="/create-evaluation">Criar Avaliação</Link>
        <div>
          <span>Pesquisar Empresa</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Digite o nome da empresa"
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>
      <div>
        {filteredEvaluations.map((evaluation, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', border: '1px solid #ddd', marginBottom: '10px' }}>
            <div>
              <h3>{evaluation.nomeEmpresa}</h3>
              <p>Cargo: {evaluation.cargo}</p>
              <p>Nível: {evaluation.nivel}</p>
              <p>Nome: {evaluation.nomeAutor}</p>
              <p>Título: {evaluation.titulo}</p>
              <p>Texto: {evaluation.texto}</p>
            </div>
            <div>
              <p>Oportunidades de Carreira: <RatingStars onRatingChange={() => { }} initialValue={evaluation.oportunidadesCarreira} /></p>
              <p>Remuneração e Benefícios: <RatingStars onRatingChange={() => { }} initialValue={evaluation.remuneracaoBeneficios} /></p>
              <p>Cultura e Valores: <RatingStars onRatingChange={() => { }} initialValue={evaluation.culturaValores} /></p>
              <p>Liderança Alta: <RatingStars onRatingChange={() => { }} initialValue={evaluation.liderancaAlta} /></p>
              <p>Diversidade e Inclusão: <RatingStars onRatingChange={() => { }} initialValue={evaluation.diversidadeInclusao} /></p>
              <p>Auxílio Creche: <RatingStars onRatingChange={() => { }} initialValue={evaluation.auxilioCreche} /></p>
              <p>Salário: <RatingStars onRatingChange={() => { }} initialValue={evaluation.salario} /></p>
              <p>Qualidade de Vida: <RatingStars onRatingChange={() => { }} initialValue={evaluation.qualidadeVida} /></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
