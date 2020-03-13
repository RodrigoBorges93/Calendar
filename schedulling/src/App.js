import React, { useContext } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { LoginProvider } from './contexts/login.context';
import { AreaProvider } from './contexts/area.context';
import LoginPage from './pages/login/login';
import Calendario from './pages/calendar';

class App extends React.Component{
    render(){
        return (
            <div>
                <AreaProvider>
                <LoginProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Calendario}/>
                    </Switch>
                </BrowserRouter>
                </LoginProvider>
                </AreaProvider>
            </div>
        )
    }
}

export default App;