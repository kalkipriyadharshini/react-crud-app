import { useState,useEffect } from 'react';
import {Button,EditableText} from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import './App.css';

function App(){
  const[users,setUsers]=useState([])
 useEffect(()=>{
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((response)=>response.json())
  .then((json)=>setUsers(json))
 },[])

 return(
  <div className='App'>
    <table className='bp4-html-table modifier'>
      <thead>
        <tr>
          <th></th>
          <th>name</th>
          <th>email</th>
          <th>website</th>
          <th>actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user=>
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td><EditableText value={user.email} /></td>
            <td><EditableText value={user.website} /></td>
            <td>
              <Button intent='primary'>Update</Button>
              <Button intent='danger'>Delete</Button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
 )
}

export default  App;
