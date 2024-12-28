import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";

// Configure Axios base URL
axios.defaults.baseURL = 'https://travellodge-3q9e.onrender.com';
axios.defaults.withCredentials = true;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('/login', { email, password });
      setUser(response.data);
      alert('Login successful');
      navigate('/');
    } catch (error) {
      console.error('Login error:', error); // Log detailed error
      alert(`Login failed: ${error.response?.data?.error || error.message}`);
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="Your@email.com"
            value={email}
            onChange={ev => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={ev => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account yet?
            <Link className="underline text-black" to="/register">Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
