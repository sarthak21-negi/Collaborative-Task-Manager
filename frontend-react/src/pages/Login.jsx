import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
  try {
    const res = await api.post("/auth/login", { username, password });

    // backend only returns token
    login(res.data.token, { username });  

    window.location.href = "/dashboard";  // redirect after login
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};


  return (
    <div className="center">
      <h2>Login</h2>
      <input placeholder="username" onChange={e => setUsername(e.target.value)} />
      <input placeholder="password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
