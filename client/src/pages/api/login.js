import axios  from 'axios';
import {serialize} from 'cookie';
export default async function handler(req, res) {
    //token=> cookie
    const loginRes = await axios.post('http://localhost:4000/login', req.body)
    const COOKIE_OPTIONS = {
      httpOnly: true,
      secure: process.env.NODE_END !== "development",
      sameSite: "strict",
      maxAge: 3600, //make sure this is 0
      path: "/",
    };
    const serializedCookie = serialize("token", loginRes.data.token, COOKIE_OPTIONS)
    res.setHeader("Set-Cookie", serializedCookie);
    res.status(200).json({ data: loginRes.data })
  }
  