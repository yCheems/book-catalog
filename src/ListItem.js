import React from 'react';
import './App.css'
import {Button} from "react-bootstrap";
import { useHistory } from 'react-router';
import db from './firebase.js';

const ListItem = ({name,author,year,isbn}) =>{
    const history = useHistory();
    const deleteHandler = async(e) => {
        e.preventDefault();
        try{
            await db.collection('books').doc(isbn).delete(); 
            window.location.reload();
        }catch(e){
            console.log(e.message)
               throw e
        }
      }
    const changeHandler = () => {
        history.push({
            pathname: '/changebook',
            state: {
                name: name,
                author: author,
                isbn: isbn,
                year: year
            }
        })
    }

    return(
        <div className='listItem'>
            <div className='spanDiv'>
                <span>{author}, {name}, издание {year}-го года, ISBN: {isbn}</span>
            </div>
            <Button className='listBtn' variant='warning' onClick={changeHandler}>Редактировать</Button>
            <Button className='listBtn' variant='danger' onClick={deleteHandler}>Удалить</Button>
        </div>
    )
}
export default ListItem;

