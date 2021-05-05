import React, { useRef,useState } from 'react';
import {Form,Button} from "react-bootstrap";
import {useAuth } from './AuthContext';
import {useHistory} from 'react-router-dom';
import './App.css';
import db from './firebase';

const AddBook = () => {
    const [loading,setLoading] = useState(false);
    const {currUser,logOut} = useAuth();
    const authorRef = useRef();
    const isbnRef = useRef();
    const nameRef = useRef();
    const yearRef = useRef();
    const history = useHistory();
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
            history.push('/')
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
        <header>
            {currUser && currUser.email}
            <Button variant='secondary' onClick={() => history.push('/')} style={{margin: '0 5vw'}}>Назад</Button>
            <Button variant='outline-danger' onClick={logOutHandler} style={{float: 'right'}}>Выйти</Button>
        </header>
        <Form onSubmit={submitHandler} style={{width: '50%',margin: '5vh auto'}}>
        <Form.Group id='authors'>
          <Form.Label>Автор(ы)</Form.Label>
          <Form.Control ref={authorRef} required/>
        </Form.Group>
        <Form.Group id='isbn'>
          <Form.Label>ISBN</Form.Label>
          <Form.Control ref={isbnRef} required/>
        </Form.Group>   
        <Form.Group id='name'>
          <Form.Label>Название</Form.Label>
          <Form.Control ref={nameRef} required/>
        </Form.Group>  
        <Form.Group id='year'>
          <Form.Label>Год издания</Form.Label>
          <Form.Control ref={yearRef} required/>
        </Form.Group>       
        <Button vatiant='success' type='submit' disabled={loading}>Добавить книгу</Button>
      </Form>
      </div>
    )
}

export default AddBook;