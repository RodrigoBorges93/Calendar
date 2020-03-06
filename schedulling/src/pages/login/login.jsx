import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/login.context';
import './login.css';

export default function LoginPage(){
    const [logged, setLogged] = useContext(LoginContext)
    const [senha, setSenha] = useState();
    
    const login = () => {
        if (senha === 'audinserv'){
            setLogged(true)
        }

        else{
            alert('Senha errada!')
        }
    }
    return(
        <form>
        <div className='login-page'>
            <div className='texto-principal'>
                <h1>Calendário Serv</h1>
            </div>
            <div className='senha'>
                <input type='password' onChange={(e) => setSenha(e.target.value)} placeholder='Digite a senha'></input>
            </div>
            <div>
                <button type='submit' onClick={login} >Entrar</button>
            </div>

        </div>
        </form>
    )
}