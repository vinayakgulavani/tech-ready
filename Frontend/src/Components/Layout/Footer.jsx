import React from "react";
import "../../Styles/Footer.css";

const Footer = () => {
    return (
        <footer id="footer" className="bg-dark shadow-sm">
            <div id="footer-content" className="container text-center">
                <h4 id="footer-logo">TechReady</h4>
                <p id="footer-tagline">Empowering Coders with Interactive Learning</p>
                <div id="footer-links">
                    <a href="/about">About Us</a> |
                    <a href="/courses"> Courses</a> |
                    <a href="/contact"> Contact Us</a> |
                    <a href="/privacy"> Privacy Policy</a>
                </div>
                <p id="footer-copyright">
                    © 2025 TechReady | All Rights Reserved
                </p>
                <div className="d-flex justify-content-center gap-3 py-3 bg-dark">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                        <i className="bi bi-facebook"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                        <i className="bi bi-twitter"></i>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                        <i className="bi bi-linkedin"></i>
                    </a>
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-light fs-4">
                        <i className="bi bi-github"></i>
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;

