import React, { useState, useContext } from 'react';
import { LoginContext } from '../../contexts/login.context';
import { AreaContext } from '../../contexts/area.context';
import './login.css';

export default function LoginPage(){
    const [logged, setLogged] = useContext(LoginContext)
    const [senha, setSenha] = useState();
    const [area, setArea] = useContext(AreaContext)
    
    const login = () => {

        switch(senha){
            case 'audinserv':
            setLogged(true)
            setArea('serv')
            break

            case 'audincorp':
            setLogged(true)
            setArea('corp')
            break

            case 'audinneg':
            setLogged(true)
            setArea('neg')
            break

            case 'audinpic':
            setLogged(true)
            setArea('pic')
            break
            
            default:
            alert('Senha informada não confere, tente novamente')
        }
        // if (senha === 'audinserv'){
        //     setLogged(true)
        //     setArea('serv')
        // }

        // else{
        //     alert('Senha errada!')
        // }
    }
    return(
        <form>
        <div className='login-page'>
            <div className='texto-principal'>
                <h1>Calendário Audin</h1>
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