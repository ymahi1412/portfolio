
import { useEffect, useState } from "react";
import "./App.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchUsers = async () => {
    const response = await fetch(`${API}/api/users`);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message);
      return;
    }

    setName("");
    setEmail("");
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/api/users/${id}`, {
      method: "DELETE"
    });
    fetchUsers();
  };

  return (
    <div className="container">
      <h1>User Management App</h1>
      <p>MERN Stack Application</p>

      <form onSubmit={addUser}>
        <input
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          placeholder="Enter email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Add User</button>
      </form>

      <h2>Registered Users</h2>

      {users.map((user) => (
        <div className="user" key={user._id}>
          <span>{user.name} - {user.email}</span>
          <button onClick={() => deleteUser(user._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
