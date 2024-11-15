import React from 'react';
import { Link } from 'react-router-dom';
import BestSeller from '../components/Home/BestSeller';
import Delivery from '../components/Home/Delivery';
import Hero from '../components/Home/Hero';
import Offer from '../components/Home/Offer';
import Products from '../components/Home/Products';
import Subscribe from '../components/Home/Subscribe';
import Navbar from '../components/Navbar/Navbar';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Delivery />
            <div className="space"></div>

            <Products />
            <div
                style={{
                    paddingTop: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                className="container"
            >
                <Link to="/products">
                    <button className="button-primary">See More</button>
                </Link>
            </div>
            <div className="space"></div>

            <Offer />
            <div className="space"></div>

            <BestSeller />

            <Subscribe />
        </div>
    );
}
