import React from 'react';

export default function Delivery() {
    return (
        <div className="delivery">
            <div className="container">
                <div className="grid-3">
                    <div className="card">
                        <div className="icon">
                            <i className="fa-solid fa-truck"></i>
                        </div>

                        <div className="content">
                            <h6 className="title">Free Shipping</h6>
                            <p>For Order more over 200$</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="icon">
                            <i className="fa-solid fa-percent"></i>
                        </div>

                        <div className="content">
                            <h6 className="title">Official Discounts</h6>
                            <p> Save Big on next product</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="icon">
                            <i className="fa-solid fa-headset"></i>
                        </div>

                        <div className="content">
                            <h6 className="title">24/7 Helpline</h6>
                            <p> Care till the end</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
