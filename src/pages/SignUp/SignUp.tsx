import { Link, useNavigate } from "react-router";
import "../../styles/Login.css"
import { FormEvent, useState } from "react";

import { client } from "../../api/client";
import { useAuth } from "../../context/AuthProvider";

const SignUp = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        phonenumber: "",
        password: "",
        username: "",
        gender: "",
    });
    const [error, setError] = useState < string | null > (null);

    const handeleChange = (e: { target: { name: any; value: any; }; }) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const { data } = await client.post('/auth/signup', form);
      login(data.accessToken, data.role);
      navigate('/chat', { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? 'Signup failed');
    }
  };

    return (
        <div className="login-container">
            <h1>SIGN UP</h1>

            <div className="input-group">
                <label htmlFor="phonenumber">PHONE NUMBER</label>
                <input
                    type="text"
                    id="phonenumber"
                    placeholder="Input your Phonenumbers"
                    name="phonenumber"
                    onChange={handeleChange}
                    required />
            </div>

            <div className="input-group">
                <label htmlFor="password">PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    name="password"
                    onChange={handeleChange}
                    required />
            </div>

            <div className="input-group">
                <label htmlFor="username">USERNAME</label>
                <input
                    type="text"
                    id="username"
                    placeholder="User Name"
                    name="username"
                    onChange={handeleChange}
                    required />
            </div>

            <div className="input-group">
                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    name="gender"
                    value={form.gender}
                    onChange={handeleChange}
                    required
                >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>



            <button type="submit" onClick={handleSubmit}  className="Login-Button">
               SIGN UP
            </button>

            <div className="divider">OR</div>

            <div className="social-login">
                <div className="social-btn">G</div>
                <div className="social-btn">F</div>
                <div className="social-btn">X</div>
            </div>

            <div className="footer">
                Are you sign up before? <Link to="/login" className="link">Log in</Link>
            </div>
        </div>
    );
}

export default SignUp;
