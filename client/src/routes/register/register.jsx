import "./register.scss";
import { Link } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    apiRequest
      .post("/auth/register", data)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input
            name="username"
            type="text"
            placeholder="Username"
            minLength={3}
            maxLength={20}
            required
          />
          <input name="email" type="text" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
