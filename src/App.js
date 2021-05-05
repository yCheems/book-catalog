import './App.css';
import React from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {Container} from "react-bootstrap";
import { AuthProvider } from './AuthContext';
import SignUp from './SignUp';
import LogIn from './LogIn';
import Catalog from './Catalog';
import PRoute from './PRoute';
import AddBook from './AddBook';
import ChangeBook from './ChangeBook'

const App = () => {
  return (
<Container>
      <Router>
      <AuthProvider>
      <Switch>
         <PRoute exact path='/' component={Catalog} />
        </Switch>
       <Switch>
         <Route path='/signup' component={SignUp} />
        </Switch>
        <Switch>
         <Route path='/login' component={LogIn} />
        </Switch>
        <Switch>
         <Route path='/addbook' component={AddBook} />
        </Switch>
        <Switch>
         <Route path='/changebook' component={ChangeBook} />
        </Switch>
        </AuthProvider>
      </Router>
</Container>
    
  );
}

export default App;