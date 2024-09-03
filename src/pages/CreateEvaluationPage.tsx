import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import RatingStars from '../components/RatingStars';
import api from '../api'; // Importando a instância do axios

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

  const navigate = useNavigate(); // Hook para navegação

  const handleRatingChange = (name: string, value: number) => {
    setRatings({ ...ratings, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Enviando os dados para a API
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
      
      // Redireciona para a página inicial após o envio bem-sucedido
      navigate('/');
    } catch (error) {
      console.error('Erro ao enviar avaliação:', error);
    }
  };

  const handleBack = () => {
    navigate('/'); // Navegar de volta para a página inicial
  };

  return (
    <div>
      <Header />
      <h1>Criar Avaliação</h1>
      <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
        <div>
          <label>Nome da Empresa:</label>
          <input type="text" value={nomeEmpresa} onChange={e => setNomeEmpresa(e.target.value)} required />
        </div>
        <div>
          <label>Cargo:</label>
          <input type="text" value={cargo} onChange={e => setCargo(e.target.value)} required />
        </div>
        <div>
          <label>Nível:</label>
          <select value={nivel} onChange={e => setNivel(e.target.value)} required>
            <option value="Júnior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Sênior">Sênior</option>
          </select>
        </div>
        <div>
          <label>Anônimo:</label>
          <input type="radio" name="anonimo" value="sim" checked={anonimo} onChange={() => setAnonimo(true)} /> Sim
          <input type="radio" name="anonimo" value="nao" checked={!anonimo} onChange={() => setAnonimo(false)} /> Não
        </div>
        {!anonimo && (
          <div>
            <label>Nome do Autor:</label>
            <input type="text" value={nomeAutor} onChange={e => setNomeAutor(e.target.value)} required />
          </div>
        )}
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} maxLength={100} required />
        </div>
        <div>
          <label>Texto:</label>
          <textarea value={texto} onChange={e => setTexto(e.target.value)} maxLength={500} required></textarea>
        </div>
        <div>
          <label>Oportunidades de Carreira:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('oportunidadesCarreira', value)} />
        </div>
        <div>
          <label>Remuneração e Benefícios:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('remuneracaoBeneficios', value)} />
        </div>
        <div>
          <label>Cultura e Valores:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('culturaValores', value)} />
        </div>
        <div>
          <label>Liderança Alta:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('liderancaAlta', value)} />
        </div>
        <div>
          <label>Diversidade e Inclusão:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('diversidadeInclusao', value)} />
        </div>
        <div>
          <label>Auxílio Creche:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('auxilioCreche', value)} />
        </div>
        <div>
          <label>Salário:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('salario', value)} />
        </div>
        <div>
          <label>Qualidade de Vida:</label>
          <RatingStars onRatingChange={(value) => handleRatingChange('qualidadeVida', value)} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button type="button" onClick={handleBack}>Voltar</button>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvaluationPage;
