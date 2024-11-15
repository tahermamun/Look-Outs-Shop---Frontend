import React from 'react';
import './Style.scss';

export default function Description({ phoneData }) {
    return (
        <div className="description">
            <div className="title">Description</div>

            <p>{phoneData?.des}</p>
        </div>
    );
}
