import React, { useEffect, useState } from 'react';
import { getData } from '../../services/api';

const Counter = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Lista de Contatos</h1>
      <ul>
        {data.map(contact => (
          <li key={contact.id}>
            <strong>Nome:</strong> {contact.objec.firstname} {contact.properties.lastname}<br />
            <strong>Email:</strong> {contact.properties.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Counter;