// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import api from '../api';
import './homepage.css';

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
    <div className='body'>
      <Header />
      <div className="first-box">
        <Link to="/create-evaluation">Criar Avaliação</Link>
        <div className="search-box">
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
          <div key={index} className='box-avalia'>
            <div className='box-left'>
              <h3>{evaluation.nomeEmpresa}</h3>
              <p>{evaluation.cargo}</p>
              <p>{evaluation.nivel}</p>
              <p>{evaluation.nomeAutor}</p>
              <h4> {evaluation.titulo}</h4>
              <p>{evaluation.texto}</p>
            </div>
            <div className='box-right'>
              <p>Oportunidades de Carreira: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.oportunidadesCarreira} /></p>
              <p>Remuneração e Benefícios: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.remuneracaoBeneficios} /></p>
              <p>Cultura e Valores: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.culturaValores} /></p>
              <p>Liderança Alta: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.liderancaAlta} /></p>
              <p>Diversidade e Inclusão: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.diversidadeInclusao} /></p>
              <p>Auxílio Creche: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.auxilioCreche} /></p>
              <p>Salário: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.salario} /></p>
              <p>Qualidade de Vida: <RatingStars readOnly={true} onRatingChange={() => { }} initialValue={evaluation.qualidadeVida} /></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
