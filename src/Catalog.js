import React, { useState,useEffect } from 'react';
import {Button} from "react-bootstrap";
import {useAuth } from './AuthContext';
import {useHistory} from 'react-router-dom';
import './App.css';
import db from './firebase';
import ListItem from './ListItem';

const Catalog = () => {
    const [books,setBooks] = useState([]);
    const {currUser,logOut} = useAuth();
    const history = useHistory();
    
    const logOutHandler = async() => {
        try{
            await logOut(); 
            history.push('/login');
        }catch{

        }       
    }
    useEffect(() => {
        fetchBooks();
      }, []);
    
    const fetchBooks = async() => {
        const response = db.collection('books');
        const data = await response.get();
        data.forEach(i => {
          setBooks((books) => [...books,i.data()])
        })
      };

    return(
        <div style={{margin: '2vh auto'}}>
        <header>
            {currUser && currUser.email}
            <Button variant='success' onClick={() => history.push('/addbook')} style={{margin: '0 5vw'}}>Добавить книгу</Button>
            <Button variant='outline-danger' onClick={logOutHandler} style={{float: 'right'}}>Выйти</Button>
        </header>
        <div>
        {books.map(book =>(<ListItem key={book.isbn} name={book.name} author={book.author} isbn={book.isbn} year={book.year} />))}
        </div>
        </div>
    )
}
export default Catalog;
