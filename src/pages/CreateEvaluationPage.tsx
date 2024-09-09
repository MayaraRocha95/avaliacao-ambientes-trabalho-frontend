import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import api from '../api';
import './form.css';

const CreateEvaluationPage: React.FC = () => {
  const [nomeEmpresa, setNomeEmpresa] = useState('');
  const [cargo, setCargo] = useState('');
  const [nivel, setNivel] = useState('Júnior');
  const [anonimo, setAnonimo] = useState(false);
  const [nomeAutor, setNomeAutor] = useState('');
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [ratings, setRatings] = useState({
    oportunidadesCarreira: 0,
    remuneracaoBeneficios: 0,
    culturaValores: 0,
    liderancaAlta: 0,
    diversidadeInclusao: 0,
    auxilioCreche: 0,
    salario: 0,
    qualidadeVida: 0
  });

  const navigate = useNavigate();

  const handleRatingChange = (name: string, value: number) => {
    setRatings({ ...ratings, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/avaliacoes', {
        nomeEmpresa,
        cargo,
        nivel,
        anonimo,
        nomeAutor: anonimo ? 'Anônimo' : nomeAutor,
        titulo,
        texto,
        ...ratings
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container supernova">
      <Header />
      <h1 className="form-header-group">Criar Avaliação</h1>
      <form className="form-all" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label className="form-sub-label">Nome da Empresa:</label>
          <input
            type="text"
            value={nomeEmpresa}
            onChange={e => setNomeEmpresa(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-sub-label">Cargo:</label>
          <input
            type="text"
            value={cargo}
            onChange={e => setCargo(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="form-sub-label">Nível:</label>
          <select value={nivel} onChange={e => setNivel(e.target.value)} required>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Sênior">Sênior</option>
          </select>
        </div>
        <div>
          <label className="form-sub-label">Anônimo:</label>
          <input
            type="radio"
            name="anonimo"
            value="sim"
            checked={anonimo}
            onChange={() => setAnonimo(true)}
          /> Sim
          <input
            type="radio"
            name="anonimo"
            value="nao"
            checked={!anonimo}
            onChange={() => setAnonimo(false)}
          /> Não
        </div>
        {!anonimo && (
          <div>
            <label className="form-sub-label">Nome do Autor:</label>
            <input
              type="text"
              value={nomeAutor}
              onChange={e => setNomeAutor(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label className="form-sub-label">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div>
          <label className="form-sub-label">Texto:</label>
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            maxLength={500}
            required
          />
        </div>
        <div>
          <label className="form-sub-label">Oportunidades de Carreira:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('oportunidadesCarreira', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Remuneração e Benefícios:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('remuneracaoBeneficios', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Cultura e Valores:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('culturaValores', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Liderança Alta:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('liderancaAlta', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Diversidade e Inclusão:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('diversidadeInclusao', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Auxílio Creche:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('auxilioCreche', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Salário:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('salario', value)}
          />
        </div>
        <div>
          <label className="form-sub-label">Qualidade de Vida:</label>
          <RatingStars
            onRatingChange={(value) => handleRatingChange('qualidadeVida', value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button className="button-back" type="button" onClick={handleBack}>Voltar</button>
          <button className="button-submit" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvaluationPage;
