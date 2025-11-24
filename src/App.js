import { useState, useEffect, useRef } from 'react';
import {Button,EditableText,InputGroup,Position, OverlayToaster} from '@blueprintjs/core';
import "@blueprintjs/core/lib/css/blueprint.css";
import './App.css';

function App() {

  const [users, setUsers] = useState([]);
  const [newName, setNewname] = useState("");
  const [newEmail, setNewemail] = useState("");
  const [newWebsite, setNewwebsite] = useState("");

  
  const toaster = useRef(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, []);

  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({ name, email, website }),
        headers: { "content-type": "application/json; charset=UTF-8" }
      })
        .then((response) => response.json())
        .then((data) => {
          setUsers([...users, data]);

         
          toaster.current.show({
            message: "User added successfully!",
            intent: "success",
            timeout: 3000,
          });
          setNewname("")
          setNewemail("")
          setNewwebsite("")
        });
    }
  }

function OnchangeHandler(id,key,value){
  setUsers((users)=>{
    return users.map((user)=>{
      return user.id === id?{...user,[key]:value}:user;
    })
  })
}

function Updateuser(id){
  const user=users.find((user)=>user.id === id)
   fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        body: JSON.stringify({user}),
        headers: { "content-type": "application/json; charset=UTF-8" }
      })
        .then((response) => response.json())
        .then((data) => {
          

         
          toaster.current.show({
            message: "User updated successfully!",
            intent: "success",
            timeout: 3000,
          });
         
        });
    }

  function deleteUser(id){
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "DELETE",
        
      })
        .then((response) => response.json())
        .then((data) => {
           setUsers((users)=>{
            return users.filter((user)=>user.id !== id)
           })

         
          toaster.current.show({
            message: "User Deleted successfully!",
            intent: "success",
            timeout: 3000,
          });
         
        });
  }

  return (
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
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td><EditableText onChange={value=>OnchangeHandler(user.id,"email",value)}value={user.email} /></td>
              <td><EditableText onChange={value=>OnchangeHandler(user.id,"website",value)}value={user.website} /></td>
              <td>
                <Button intent='primary' onClick={()=>Updateuser(user.id)}>Update</Button>
                <Button intent='danger'onClick={()=>deleteUser(user.id)}>Delete</Button>
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
                onChange={(e) => setNewname(e.target.value)}
                placeholder="Enter a name"
              />
            </td>
            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewemail(e.target.value)}
                placeholder="Enter a Mail"
              />
            </td>
            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewwebsite(e.target.value)}
                placeholder="Enter a website"
              />
            </td>
            <td>
              <Button intent='success' onClick={addUser}>Add user</Button>
            </td>
          </tr>
        </tfoot>
      </table>

      
      <OverlayToaster ref={toaster} position={Position.TOP} />

    </div>
  );
}

export default App;


