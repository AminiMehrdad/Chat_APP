import { Link, useLocation, useNavigate } from "react-router";
import "../../styles/Login.css"
import { useAuth } from "../../context/AuthProvider";
import { FormEvent, useState } from "react";
import { client } from "../../api/client";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ phonenumber: '', password: '' });
    const [error, setError] = useState<string | null>(null);

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
            const { data } = await client.post('/login', form);
            login(data.accessToken, data.role);
            navigate((location.state as any)?.from?.pathname || '/chat', { replace: true });
        } catch (err: any) {
            setError(err.response?.data?.message ?? 'Login failed');
        }
    }
    return (
        <div className="login-container">
            <h1>LOG IN</h1>

            <div className="input-group">
                <label htmlFor="phonenumber">PHONE NUMBER</label>
                <input
                    type="text"
                    id="phonenumber"
                    placeholder="Input your Phonenumbers"
                    name="phonenumber"
                    onChange={handeleChange}
                    required
                />
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

            <button type="submit" className="Login-Button" onClick={handleSubmit} >SIGN IN</button>

            <div className="divider">OR</div>

            <div className="social-login">
                <div className="social-btn">G</div>
                <div className="social-btn">F</div>
                <div className="social-btn">X</div>
            </div>

            <div className="footer">
                Don't have an account? <Link to="/signup" className="link">Sign up</Link>
            </div>
        </div>
    );
}

export default Login;
