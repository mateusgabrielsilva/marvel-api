import axios from 'axios';

// import * as md5 from 'module-name';
const md5 = require('md5');


const publicKey = 'b8570335876a14504dccb85cac52d47d'
const privateKey = '4bd704c4fddd35d633d1acfd3f1fe76e5884ed1b'

const time = Number(new Date())

const hash = md5(time + privateKey + publicKey)

const api = axios.create({
  baseURL: 'http://gateway.marvel.com/v1/public/',
  params: {
    ts: time,
    apikey: publicKey,
    hash,
  }
})

export default api