import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown } from 'react-icons/fi';
import api from "../../services/api";
import {Container, CardList, Card, ButtonMore} from './styles';

interface ResponseData {
  id: string
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  } 
}

const Characters: React.FC = () => {
  const [characters, setCharacters] = useState<ResponseData[]>([])

  // Carregando requisicao da API
  useEffect(() => {
    api
    .get('/characters')
    .then(response => {
      setCharacters(response.data.data.results)
    })
    .catch(err => console.log('Log Erro', err))
  }, []);

  // Carregando mais personagens

  const handleMore = useCallback(async() => {
    try{
      const offset = characters.length
      const response = await api.get('characters', {
        params: {
          offset,
        },
      });

      setCharacters([... characters, ... response.data.data.results]);
    }catch(err) {
      console.log(err);
    }
  }, []);
  
  return (
  <Container>

    <CardList>
      {characters.map(character => {
        return(
          <Card key={character.id} thumbnail={character.thumbnail}>
            <div id="img" />
            <h2>{character.name}</h2>
            <p>{character.description}</p>
          </Card>
        )
      })}
    </CardList>

    <ButtonMore onClick={handleMore}>
      <FiChevronDown size = {20}/>
      Mais
      <FiChevronDown size = {20} />
    </ButtonMore>

  </Container>)
};

export default Characters;