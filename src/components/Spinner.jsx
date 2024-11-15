import { Spin } from 'antd';
import React from 'react';

export default function Spinner() {
    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
    };
    return (
        <div style={style}>
            <Spin size="large" />
        </div>
    );
}
