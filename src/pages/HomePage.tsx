import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [evaluations, setEvaluations] = useState([
    // Avaliações simuladas para exibição
    {
      nomeEmpresa: 'TechCorp',
      cargo: 'Desenvolvedor',
      nivel: 'Júnior',
      nomeAutor: 'Maria Silva',
      titulo: 'Ótimo lugar para trabalhar',
      texto: 'Adorei a cultura e a equipe.',
      oportunidadesCarreira: 4,
      remuneracaoBeneficios: 5,
      culturaValores: 5,
      liderancaAlta: 4,
      diversidadeInclusao: 5,
      auxilioCreche: 4,
      salario: 4,
      qualidadeVida: 4
    }
  ]);

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
