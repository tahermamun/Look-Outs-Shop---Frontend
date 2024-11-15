import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import './Style.scss';

export default function Subscribe() {
    return (
        <>
            <div className="subscribe">
                <div className="container">
                    <h4>Subscribe Now</h4>

                    <h2 className="title">Get our updates alwaus fast</h2>

                    <h3>Your personal data will save</h3>

                    <div className="place-mail">
                        <input type="email" placeholder="Enter you Email address" />
                        <button>
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    <div className="content">
                        <div>
                            <Link to="/">Search</Link>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <Link to="/">Help</Link>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <Link to="/">Information</Link>
                        </div>
                        <div className="divider"></div>
                        <div>
                            <Link to="/products">Products</Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
