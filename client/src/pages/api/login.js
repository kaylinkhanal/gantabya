import axios  from 'axios';
import {serialize} from 'cookie' 
export default async function handler(req, res) {
    //token=> cookie
    const loginRes = await axios.post('http://localhost:4000/login', req.body)
    res.status(200).json({ data: loginRes.data })
  }
  