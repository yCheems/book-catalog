import React,{ useState,useRef } from 'react';
import {Form,Button,Alert} from "react-bootstrap";
import {useAuth} from './AuthContext';
import './App.css';
import { Link, useHistory } from 'react-router-dom';

const SignUp = () => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const pwdConfRef = useRef();
    const [loading,setLoading] = useState(false);
    const [err,setErr] = useState('');
    const history = useHistory(); 
    const {signUp} = useAuth();

    const submitHandler = async(e) => {
      e.preventDefault();
      if(pwdRef.current.value !== pwdConfRef.current.value) return setErr("Пароли не совпадают!");
      if(pwdRef.current.value.length < 6) return setErr("Слишком короткий пароль!");
      try{
        setErr('');
        setLoading(true);
        await signUp(emailRef.current.value, pwdRef.current.value);
        history.push('/');
      } catch {
        setLoading(false);
        return setErr("Неудалось зарегистрировать пользователя")   
      }
      setLoading(false);
    }
  
    return(
      <div style={{margin: '10vh auto'}}>
        <h2 className="text-center mb-4">Регистрация</h2>
        <Form className='regForm' onSubmit={submitHandler}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required/>
          </Form.Group>
          <Form.Group id='pwd'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control type='password' ref={pwdRef} required/>
          </Form.Group>
          <Form.Group id='pwdConf'>
            <Form.Label>Подтвердите пароль</Form.Label>
            <Form.Control type='password' ref={pwdConfRef} required/>
          </Form.Group>
          <Button className='regBtn' type='submit' disabled={loading}>Зарегистрироваться</Button>
        </Form>
        {err && <Alert variant='danger' className='regAlert'>{err}</Alert>}
        <div className='alrdyRegText'>Уже зарегистрированы? <Link to='/login'>Вход</Link></div>
      </div>
    )
  }
  export default SignUp;