import React from 'react';
import BestSeller from '../components/Home/BestSeller';
import Products from '../components/Home/Products';
import Subscribe from '../components/Home/Subscribe';
import Navbar from '../components/Navbar/Navbar';
import SubSlider from '../components/SubSlider/SubSlider';

export default function ProductsPage() {
    return (
        <div>
            <Navbar />
            <SubSlider />

            <Products />

            <div className="space"></div>

            <BestSeller />
            <Subscribe />
        </div>
    );
}
