import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api'

import './style.css';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar vaga, tente novamente')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <h1>Cadastrar nova vaga de emprego.</h1>
                    <p>Recomendamos fazer uma descrição detalhada para facilitar o compreendimento.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#FF8B4A"/>
                        Voltar
                    </Link>
                </section>
                
                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Cargo"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Requisitos"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Salário"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}