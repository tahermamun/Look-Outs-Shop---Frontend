import React from 'react';
import { Link } from 'react-router-dom';
import './Style.scss';

export default function Footer() {
    return (
        <div className="footer">
            <div className="container">
                <div className="content">
                    <div className="copy-right">© 2024 - Taher Mamun</div>

                    <div >
                        <div className="logo">
                            <h2>LookOutsShop</h2>
                        </div>
                        <div className="pages" >
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/products">Products</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="socials">
                        <ul>
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <li>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </li>
                            </a>
                            <a
                                href="https://twitter.com/?lang=en"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <li>
                                    <i class="fa-brands fa-twitter"></i>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
