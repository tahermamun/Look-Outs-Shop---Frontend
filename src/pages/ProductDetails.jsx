import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BestSeller from '../components/Home/BestSeller';
import Subscribe from '../components/Home/Subscribe';
import Navbar from '../components/Navbar/Navbar';
import Description from '../components/ProductDetails/Description';
import ProductDetailsHeader from '../components/ProductDetails/ProductDetailsHeader';
import SubSlider from '../components/SubSlider/SubSlider';
import { products } from '../utils/data';

export default function ProductDetails() {
    const { id } = useParams();
    const phoneData = products.find((product) => product.id === id);
    useEffect(() => {
        window.scrollTo(0, 0);
    });
    return (
        <>
            <Navbar />
            <SubSlider />
            <div className="product-details container">
                <ProductDetailsHeader phoneData={phoneData} />

                <Description phoneData={phoneData} />

                <BestSeller />
            </div>
            <Subscribe />
        </>
    );
}
