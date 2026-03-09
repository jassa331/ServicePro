import React from "react";
import "../../assets/css/CompanyPage.css";

const CompanyPage: React.FC = () => {
    return (
        <div>

            {/* HEADER */}
            <header className="header">
                <div className="logo">Dhammi's</div>

                <nav>
                    <a href="#">Home</a>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>


            {/* HERO SECTION */}

            <section className="hero">
                <h1>Dhammi's SaaS Solutions</h1>

                <p>
                    We provide modern SaaS solutions with secure and professional
                    websites. Our mission is to deliver high quality technology
                    services and maintain strong relationships with our clients.
                </p>
            </section>


            {/* SERVICES */}

            <section id="services" className="services">

                <h2>Our Services</h2>

                <div className="serviceBox">

                    <div className="card">
                        <h3>SaaS Development</h3>
                        <p>
                            We build scalable Software as a Service platforms for
                            startups and businesses.
                        </p>
                    </div>

                    <div className="card">
                        <h3>Secure Websites</h3>
                        <p>
                            Our websites are fully secure, optimized and modern.
                        </p>
                    </div>

                    <div className="card">
                        <h3>Client Support</h3>
                        <p>
                            We maintain professional behaviour and keep our clients happy.
                        </p>
                    </div>

                </div>
            </section>


            {/* ABOUT */}

            <section id="about" className="about">

                <h2>About Our Company</h2>

                <p>
                    Dhammi's is a professional SaaS provider company based in
                    Chandigarh. The company is led by CEO <strong>Jasmeet Singh</strong>.
                    We focus on building secure and reliable applications while
                    ensuring excellent client satisfaction.
                </p>

            </section>


            {/* CONTACT */}

            <section id="contact" className="contact">

                <h2>Contact Us</h2>

                <p><strong>CEO:</strong> Jasmeet Singh</p>
                <p><strong>Email:</strong> jassadhammi@gmail.com</p>
                <p><strong>Phone:</strong> 8198088924</p>
                <p><strong>Location:</strong> Chandigarh</p>

            </section>


            {/* FOOTER */}

            <footer className="footer">
                © 2026 Dhammi's. All Rights Reserved.
            </footer>

        </div>
    );
};

export default CompanyPage;