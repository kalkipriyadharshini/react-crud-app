import { useState, useEffect, useRef } from "react";
import {
  Button,
  EditableText,
  InputGroup,
  OverlayToaster,
  Position,
  Intent,
} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");


  const toasterRef = useRef(null);

  const showToast = (message, intent = Intent.PRIMARY) => {
    if (toasterRef.current) {
      toasterRef.current.show({
        message,
        intent,
        timeout: 2500,
      });
    }
  };


  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((data) => setUsers(data));
  }, []);

 
  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();

    if (!name || !email || !website) {
      showToast("All fields required", Intent.DANGER);
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify({ name, email, website }),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setUsers([...users, data]);
        showToast("User added successfully", Intent.SUCCESS);

        setNewName("");
        setNewEmail("");
        setNewWebsite("");
      });
  }


  function deleteUser(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      setUsers(users.filter((u) => u.id !== id));
      showToast("User deleted", Intent.WARNING);
    });
  }


  function updateUser(user) {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((data) => {
        setUsers(users.map((u) => (u.id === user.id ? data : u)));
        showToast("User updated", Intent.PRIMARY);
      });
  }


  return (
    <div className="App">
      <table className="bp4-html-table bp4-html-table-striped bp4-html-table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>

              <td>
                <EditableText
                  value={user.name}
                  onChange={(val) =>
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, name: val } : u
                      )
                    )
                  }
                />
              </td>

              <td>
                <EditableText
                  value={user.email}
                  onChange={(val) =>
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, email: val } : u
                      )
                    )
                  }
                />
              </td>

              <td>
                <EditableText
                  value={user.website}
                  onChange={(val) =>
                    setUsers(
                      users.map((u) =>
                        u.id === user.id ? { ...u, website: val } : u
                      )
                    )
                  }
                />
              </td>

              <td>
                <Button
                  intent="primary"
                  onClick={() => updateUser(user)}
                >
                  Update
                </Button>

                <Button
                  intent="danger"
                  onClick={() => deleteUser(user.id)}
                  style={{ marginLeft: "6px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td></td>

            <td>
              <InputGroup
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter name"
              />
            </td>

            <td>
              <InputGroup
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter email"
              />
            </td>

            <td>
              <InputGroup
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter website"
              />
            </td>

            <td>
              <Button intent="success" onClick={addUser}>
                Add User
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>

      
      <OverlayToaster position={Position.TOP} ref={toasterRef} />
    </div>
  );
}

export default App;
