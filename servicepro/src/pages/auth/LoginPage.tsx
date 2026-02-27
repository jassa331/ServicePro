import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import "../../assets/css/LoginPage.css";
import logo from "../../assets/images/mylogo.png.jpeg";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [captchaValue, setCaptchaValue] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (!captchaValue) {
            toast.error("Please verify captcha");
            return;
        }

        try {
            const res = await axios.post(
                "https://systemapi.runasp.net/api/auth/login",
                {
                    email,
                    password,
                    captcha: captchaValue
                }
            );

            login(res.data.token);
            navigate("/dashboard");
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                setError("Invalid credentials");
            } else {
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-left">
                <div className="login-card">
                    <img src={logo} alt="Logo" className="logo" />
                    <h3>Login to your Account</h3>

                    {error && <p className="error">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <label htmlFor="email">Username / Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="rememberMe">Remember me</label>
                        </div>

                        <div style={{ marginBottom: "15px" }}>
                            <ReCAPTCHA
                               // sitekey="6Lfi83ksAAAAADNkjVJ8JftlWyrugROii4xgvuYK"   ---local captcha
                                sitekey="6Lc_93ksAAAAAG5HrN9i8f7Ximifeyx_u5VODtwS"   //--production captcha

                                onChange={(value: string | null) =>
                                    setCaptchaValue(value)
                                }
                            />
                        </div>

                        <button type="submit" className="login-btn">
                            Log In
                        </button>
                    </form>

                    <div className="login-footer">
                        &copy; {new Date().getFullYear()} Dhammi's
                    </div>
                </div>
            </div>

            <div className="login-right"></div>
        </div>
    );
}