import React, { useEffect } from 'react';
import axios from 'axios';

// import * as md5 from 'module-name';
const md5 = require('md5');


const publicKey = 'b8570335876a14504dccb85cac52d47d'
const privateKey = '4bd704c4fddd35d633d1acfd3f1fe76e5884ed1b'

const time = Number(new Date())

const hash = md5(time + privateKey + publicKey)

const App: React.FC = () => {
  useEffect(() => {
    axios
    .get(`http://gateway.marvel.com/v1/public/characters?ts=${time}&apikey=${publicKey}&hash=${hash}`,)
    .then(response => console.log(time, response.data.data.results))
    .catch(err => console.log(err))
  }, []);
  return (
    <div className="App">
      Marvel
    </div>
  );
};

export default App;
