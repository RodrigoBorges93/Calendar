import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './contexts/login.context';
import LoginPage from './pages/login/login';
import Calendario from './pages/calendar';

class App extends React.Component{
    render(){
        return (
            <div>
                <LoginProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Calendario}/>
                    </Switch>
                </BrowserRouter>
                </LoginProvider>
            </div>
        )
    }
}

export default App;