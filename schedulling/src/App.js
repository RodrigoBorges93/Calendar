import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import addEventPage from './pages/AddEvent/addEvent';
import Calendario from './pages/calendar';

class App extends React.Component{
    render(){
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Calendario}/>
                        <Route exact path='/adicionarEvento' component={addEventPage}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;