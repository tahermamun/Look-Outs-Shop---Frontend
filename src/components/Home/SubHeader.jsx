import React from 'react';

export default function SubHeader({ title }) {
    return (
        <div className="sub-header">
            <div className="container">
                <h2>{title}</h2>
                <p>EXPLORE AND FIND RIGHT ONE</p>
            </div>
        </div>
    );
}
