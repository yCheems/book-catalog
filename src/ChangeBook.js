import React, { useRef,useState } from 'react';
import {Form,Button,Alert} from "react-bootstrap";
import {useAuth } from './AuthContext';
import {useHistory} from 'react-router-dom';
import './App.css';
import db from './firebase';

const ChangeBook = (props) => {
    const [loading,setLoading] = useState(false);
    const {currUser,logOut} = useAuth();
    const authorRef = useRef();
    const isbnRef = useRef();
    const nameRef = useRef();
    const yearRef = useRef();
    const history = useHistory();
    const [show,setShow] = useState(false);
    const submitHandler = async(e) => {
        e.preventDefault();
        try{
            setLoading(true);
            await db.collection('books').doc(isbnRef.current.value).set({
                author : authorRef.current.value,
                isbn : isbnRef.current.value,
                name: nameRef.current.value,
                year: yearRef.current.value
            })
            if(isbnRef.current.value !== props.location.state.isbn)
                await db.collection('books').doc(props.location.state.isbn).delete()
            setShow(true);
            setLoading(false);
        }catch(e){
            console.log(e.message)
               throw e
        }
    }
    const logOutHandler = async() => {
        try{
            await logOut(); 
            history.push('/login');
        }catch{

        }       
    }
    return(
        <div style={{margin: '2vh auto'}}>
        <Alert show={show} variant="warning">
        <Alert.Heading>Информация обновлена!</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-warning">
            X
          </Button>
        </div>
        </Alert>   
        <header>
            {currUser && currUser.email}
            <Button variant='secondary' onClick={() => history.push('/')} style={{margin: '0 5vw'}}>Назад</Button>
            <Button variant='outline-danger' onClick={logOutHandler} style={{float: 'right'}}>Выйти</Button>
        </header>
        <Form onSubmit={submitHandler} style={{width: '50%',margin: '5vh auto'}}>
        <Form.Group id='authors'>
          <Form.Label>Автор(ы)</Form.Label>
          <Form.Control ref={authorRef} defaultValue={props.location.state.author} required/>
        </Form.Group>
        <Form.Group id='isbn'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control ref={isbnRef} defaultValue={props.location.state.isbn} required/>
        </Form.Group>   
        <Form.Group id='name'>
          <Form.Label>Название</Form.Label>
          <Form.Control ref={nameRef} defaultValue={props.location.state.name} required/>
        </Form.Group>  
        <Form.Group id='year'>
          <Form.Label>Год издания</Form.Label>
          <Form.Control ref={yearRef} defaultValue={props.location.state.year} required/>
        </Form.Group>       
        <Button vatiant='success' type='submit' disabled={loading}>Изменить информацию</Button>
      </Form>
      </div>
    )
}

export default ChangeBook;