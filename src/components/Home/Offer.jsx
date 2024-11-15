import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../../utils/data';
import './Style.scss';

export default function Offer() {
    return (
        <div className="container">
            <div className="offer-container">
                <div className="space"></div>
                <div className="grid-2">
                    <div className="gutter-row">
                        <div
                            style={{ backgroundImage: `url(${images.SBG1})` }}
                            className="offer-card"
                        >
                            <h5>Get 20% Off!</h5>

                            <p>New Arrival in our store with best price!</p>

                            <Link to="/products">
                                <button className="button-primary">Order Now</button>
                            </Link>
                        </div>
                    </div>
                    <div className="gutter-row">
                        <div
                            style={{ backgroundImage: `url(${images.SBG2})` }}
                            className="offer-card"
                        >
                            <h5>Get 20% Off!</h5>

                            <p>New Arrival in our store with best price!</p>

                            <Link to="/products">
                                <button className="button-primary">Order Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="space"></div>
            </div>
        </div>
    );
}
