import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/LoginPage.css"; // CSS
import logo from "../../assets/images/logo.png"; // logo

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        localStorage.removeItem("side_menu");
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("https://hoste.runasp.net/api/auth/login", {
                email,
                password
            });

            login(res.data.token); // remove 2nd argument
            navigate("/dashboard"); // redirect after login
        } catch (err: any) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="login-page">
            {/* LEFT FORM */}
            <div className="login-left">
                <div className="login-card">
                    <img src={logo} alt="Logo" className="logo" />
                    <h3>Login to your Account</h3>
                    <p className="intro-text">
                        Please enter your username and password.
                        <a href="/register" className="register-link">Register</a> if you don't have an account.
                    </p>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Username / Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={e => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        <button type="submit" className="login-btn">Log In</button>
                    </form>

                    <div className="login-footer">
                        &copy; {new Date().getFullYear()} Dhammi's'
                    </div>
                </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="login-right"></div>
        </div>
    );
}
