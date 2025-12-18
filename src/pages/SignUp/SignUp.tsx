import { Link, useNavigate } from "react-router";
import "../../styles/Login.css";
import { FormEvent, useEffect, useState } from "react";
import { client } from "../../api/client";
import { useAuth } from "../../context/AuthProvider";
import { setAccessToken } from "../../api/authStoreBridge";

const SignUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  /* =======================
     Form State
  ======================= */
  const [form, setForm] = useState({
    phonenumber: "",
    password: "",
    username: "",
    gender: "",
  });

  /* =======================
     Error & UI State
  ======================= */
  const [error, setError] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [shake, setShake] = useState(false);

  /* =======================
     Restart Shake Animation
  ======================= */
  useEffect(() => {
    if (!hasError) return;

    // حذف shake
    setShake(false);

    // اضافه کردن دوباره در فریم بعد
    const id = requestAnimationFrame(() => {
      setShake(true);
    });

    return () => cancelAnimationFrame(id);
  }, [hasError]);

  /* =======================
     Input Change Handler
  ======================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setHasError(false);
    setShake(false);
    setError(null);

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

    setError(null);

    try {
      const { data } = await client.post("/auth/signup", form);

      login(data.data.accessToken, data.data.role);
      setAccessToken(data.data.accessToken);
      navigate("/chat", { replace: true });
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Signup failed");
      setHasError(true);
    }
  };

  /* =======================
     JSX
  ======================= */
  return (
    <div className="login-container">
      <h1>SIGN UP</h1>

      <form onSubmit={handleSubmit}>
        {/* PHONE NUMBER */}
        <div
          className={`input-group ${hasError ? "input-error" : ""} ${
            shake ? "shake" : ""
          }`}
        >
          <label htmlFor="phonenumber">PHONE NUMBER</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            placeholder="Input your phone number"
            value={form.phonenumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* PASSWORD */}
        <div
          className={`input-group ${hasError ? "input-error" : ""} ${
            shake ? "shake" : ""
          }`}
        >
          <label htmlFor="password">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* USERNAME */}
        <div
          className={`input-group ${hasError ? "input-error" : ""} ${
            shake ? "shake" : ""
          }`}
        >
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="User Name"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* GENDER */}
        <div
          className={`input-group ${hasError ? "input-error" : ""} ${
            shake ? "shake" : ""
          }`}
        >
          <label htmlFor="gender">GENDER</label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <button type="submit" className="Login-Button">
          SIGN UP
        </button>
      </form>

      <div className="divider">OR</div>

      <div className="social-login">
        <div className="social-btn">G</div>
        <div className="social-btn">F</div>
        <div className="social-btn">X</div>
      </div>

      <div className="footer">
        Are you sign up before?{" "}
        <Link to="/login" className="link">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
