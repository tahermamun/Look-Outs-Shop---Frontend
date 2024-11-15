import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../utils/data';
import SubHeader from './SubHeader';

export default function Products() {
    return (
        <div className="products container">
            <SubHeader title="FIND YOUR PERFECT MATCH" />
            <div className="product-list">
                {products.map((item, indx) => (
                    <Link key={indx} to={`/product/${item.id}`}>
                        <div className="product-card">
                            <div className="img-wrapper">
                                <img src={item.img} alt="" />
                                <img src={item.img2} className="image-2" alt="" />
                            </div>
                            <div className="title">{item.title}</div>
                            <div className="price">${item.price}</div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
