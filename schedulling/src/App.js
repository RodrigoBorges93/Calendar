import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Calendario from './pages/calendar';

class App extends React.Component{
    render(){
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Calendario}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;