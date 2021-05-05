import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PRoute = ({component: Component, ...rest}) =>{
    const currUser = useAuth();
    return (
        <Route {...rest} render={p => {return currUser ? <Component {...p}/> : <Redirect to='/login' />}}></Route>
    )
}
export default PRoute;