import { Link, useLocation, useNavigate } from "react-router";
import "../../styles/Login.css";
import { AuthProvider, useAuth } from "../../context/AuthProvider";
import { FormEvent, useEffect, useState } from "react";
import { client } from "../../api/client";
import { toast, Toaster } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { bindAuthStore, setAccessToken } from "../../api/authStoreBridge";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    /* =======================
       Form State
    ======================= */
    const [form, setForm] = useState({
        phonenumber: "",
        password: "",
    });

    /* =======================
       UI State
    ======================= */
    const [hasError, setHasError] = useState(false);
    const [shake, setShake] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    useEffect(() => {
        if (!hasError) return;

        // ابتدا کلاس را حذف می‌کنیم
        setShake(false);

        // سپس در فریم بعدی دوباره اضافه می‌کنیم
        const id = requestAnimationFrame(() => {
            setShake(true);
        });

        return () => cancelAnimationFrame(id);
    }, [hasError]);

    /* =======================
       Input Change Handler
    ======================= */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // پاک کردن UI خطا هنگام تایپ کاربر
        setHasError(false);
        setShake(false);

        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    /* =======================
       Submit Handler
    ======================= */
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const { data } = await client.post("/auth/login", form);

            login(data.data.accessToken, data.data.role);
            
            toast.success("Login successful");

            navigate(
                (location.state as any)?.from?.pathname || "/chat",
                { replace: true }
            );
        } catch (err: any) {
            setHasError(true);
            if (err.response?.status === 401) {
                toast.error("Invalid phone number or password");
            } else {
                toast.error("Something went wrong. Try again");
            }
        }
    };

    /* =======================
       JSX
    ======================= */
    return (
        <div className="login-container">
            <Toaster position="top-center" />

            <h1>LOG IN</h1>

            <form onSubmit={handleSubmit}>
                {/* PHONE NUMBER */}
                <div className={`input-group`}>
                    <label htmlFor="phonenumber" className={hasError? "input-error": ""}>PHONE NUMBER</label>
                    <input
                        className={`input-group ${hasError ? "input-error" : ""} ${shake ? "shake" : ""}`}
                        type="text"
                        id="phonenumber"
                        name="phonenumber"
                        value={form.phonenumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* PASSWORD */}
                <div className={`input-group ${hasError ? "input-error" : ""} ${shake ? "shake" : ""}`}>
                    <label htmlFor="password">PASSWORD</label>

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="password-input"
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label="Toggle password visibility"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                <button type="submit" className="Login-Button">
                    SIGN IN
                </button>
            </form>

            <div className="divider">OR</div>

            <div className="social-login">
                <div className="social-btn">G</div>
                <div className="social-btn">F</div>
                <div className="social-btn">X</div>
            </div>

            <div className="footer">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link">
                    Sign up
                </Link>
            </div>
        </div>
    );
};

export default Login;
