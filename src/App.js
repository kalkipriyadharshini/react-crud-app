import { useState,useEffect } from 'react';
import {Button,EditableText,InputGroup} from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import './App.css';

function App(){
  const[users,setUsers]=useState([])
  const[newName,setNewname]=useState([])
  const[newEmail,setNewemail]=useState([])
  const[newWebsite,setNewwebsite]=useState([])

 useEffect(()=>{
  fetch("https://jsonplaceholder.typicode.com/users")
  .then((response)=>response.json())
  .then((json)=>setUsers(json));
 },[])

 return(
  <div className='App'>
    <table className='bp4-html-table modifier'>
      <thead>
        <tr>
          <th>id</th>
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
      <tfoot>
        <tr>
          <td></td>
          <td>
          <InputGroup 
              value={newName}
              onChange={(e)=>setNewname(e.target.value)}
              placeholder="Enter a name"
          />
          </td>
           <td>
          <InputGroup 
              value={newEmail}
              onChange={(e)=>setNewemail(e.target.value)}
              placeholder="Enter a Mail"
          />
          </td> <td>
          <InputGroup 
              value={newWebsite}
              onChange={(e)=>setNewwebsite(e.target.value)}
              placeholder="Enter a website"
          />
          </td>
          <td>
            <Button intent='success'>Add user</Button>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
 )
}

export default  App;
