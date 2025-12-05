import { Link } from "react-router";
import "../../styles/Login.css"

const SignUp = () => {
    return (
        <div className="login-container">
            <h1>SIGN UP</h1>

            <div className="input-group">
                <label htmlFor="phonenumber">PHONE NUMBER</label>
                <input type="text" id="phonenumber" placeholder="Input your Phonenumbers" required />
            </div>

            <div className="input-group">
                <label htmlFor="password">PASSWORD</label>
                <input type="password" id="password" placeholder="••••••••" required />
            </div>

            <div className="input-group">
                <label htmlFor="username">USERNAME</label>
                <input type="text" id="username" placeholder="User Name" required />
            </div>

            <div className="input-group">
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="" disabled selected>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>



            <button type="submit" className="Login-Button">SIGN UP</button>

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
