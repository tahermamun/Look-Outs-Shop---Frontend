import { Breadcrumb } from 'antd';
import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

export default function BreadCrumb({ page }) {
    return (
        <Breadcrumb
            items={[
                {
                    href: '/admin',
                    title: <HomeOutlined />,
                },

                {
                    title: page,
                },
            ]}
        />
    );
}
