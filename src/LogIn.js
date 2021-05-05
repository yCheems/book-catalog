import React,{ useState,useRef} from 'react';
import {Form,Button,Alert} from "react-bootstrap";
import { useAuth } from './AuthContext';
import {Link,useHistory} from 'react-router-dom';
import './App.css';

const LogIn = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState('');
    const history = useHistory();
    const {logIn} = useAuth();
  
    const submitHandler = async(e) => {
      e.preventDefault();
      try{
        setErr('');
        setLoading(true);
        await logIn(emailRef.current.value, pwdRef.current.value);
        history.push('/');
      } catch {
        setLoading(false);
        return setErr("Неудалось выполнить вход")
      }
      setLoading(false);
    }
  
    return(
      <div style={{margin: '10vh auto'}}>
        <h2 className="text-center mb-4">Вход</h2>
        <Form className='regForm' onSubmit={submitHandler}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required/>
          </Form.Group>
          <Form.Group id='pwd'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type='password' ref={pwdRef} required/>
          </Form.Group>        
          <Button className='regBtn' type='submit' disabled={loading}>Войти</Button>
        </Form>
        {err && <Alert variant='danger' className='regAlert'>{err}</Alert>}
        <div className='alrdyRegText'>Еще не регистрировались? <Link to='/signup'>Зарегистрироваться</Link></div>
      </div>
    )
}
export default LogIn;