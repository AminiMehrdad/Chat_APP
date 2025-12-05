import { Link } from "react-router";
import "../../styles/Login.css"

const Login = () => {
    return (
        <div className="login-container">
            <h1>LOG IN</h1>

            <div className="input-group">
                <label htmlFor="phonenumber">PHONE NUMBER</label>
                <input type="text" id="phonenumber" placeholder="Input your Phonenumbers" />
            </div>

            <div className="input-group">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" placeholder="••••••••" />
            </div>

            <button type="submit" className="Login-Button">SIGN IN</button>

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
