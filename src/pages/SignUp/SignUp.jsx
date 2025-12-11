import { Link } from "react-router";
import "../../styles/Login.css"
import { useState } from "react";
import { AuthService } from "../../services/authService";

const SignUp = () => {
    const [formData, setFormData] = useState({
        phonenumber: "",
        password: "",
        username: "",
        gender: "",
    });

    const [loding, setLoading] = useState(false);

    const handeleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await AuthService.signup(formData);

            // Backend باید accessToken بدهد
            const { accessToken } = res.data;
            localStorage.setItem('access_token', accessToken);

            alert("Signup successful. User auto logged in.");
            console.log("Signup response:", res.data);

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Signup failed");
        }

        setLoading(false);
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
                    value={formData.gender}
                    onChange={handeleChange}
                    required
                >
                    <option value="" disabled>Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>



            <button type="submit" onClick={handleSignup} disabled={loding} className="Login-Button">
                {loding ? 'Loading...' : 'SIGN UP'}
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
