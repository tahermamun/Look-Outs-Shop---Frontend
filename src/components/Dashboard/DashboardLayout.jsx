import { Dropdown } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
    LogoutOutlined,
    UsergroupAddOutlined,
    AppstoreOutlined,
    UserOutlined,
    UnorderedListOutlined,
} from '@ant-design/icons';
import './Style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrder } from '../../store/orderSlice';
import { getAllUser, logout } from '../../store/userSlice';

export default function DashboardLayout() {
    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
    };
    const dispatch = useDispatch();
    const [sidebar, setSideBar] = useState(false);
    const { message: orderMessage, error: orderError } = useSelector((state) => state.order);
    const { message: userMessage, error: userError } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getAllOrder());
        dispatch(getAllUser());
    }, [userMessage, orderMessage, orderError, dispatch, userError]);

    useEffect(() => {
        window.addEventListener('resize', hideSidebar);

        return () => {
            window.removeEventListener('resize', hideSidebar);
        };
    }, []);

    const hideSidebar = () => {
        if (window !== undefined) {
            let width = window.innerWidth;
            width > 992 ? setSideBar(false) : setSideBar(true);
        }
    };

    const items = [
        {
            label: <Link to="/">Dashboard</Link>,
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: <Link to="/">Logout</Link>,
            key: '2',
            icon: <LogoutOutlined />,
            onClick: () => {
                window.localStorage.setItem('token', null);
                dispatch(logout());
                window.location.reload();
            },
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className="dashboard">
            <div className={`sidebar ${sidebar ? 'mobile' : ''}`}>
                <h2 className="logo">
                    <Link to="/">LookOutsShop</Link>
                </h2>
                <ul>
                    <li>
                        <Link to="/admin">
                            {' '}
                            <AppstoreOutlined /> <span className="item">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="customer">
                            <UsergroupAddOutlined /> <span className="item">Customer</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="order">
                            <UnorderedListOutlined />
                            <span className="item">Order</span>
                        </Link>
                    </li>
                </ul>
            </div>

            <div className={`content ${sidebar ? 'mobile' : ''}`}>
                <div className="dashboard-nav">
                    <div>
                        <Dropdown.Button
                            menu={menuProps}
                            placement="bottomRight"
                            icon={<UserOutlined />}
                        >
                            Admin
                        </Dropdown.Button>
                    </div>
                </div>

                <div className="outlet">{<Outlet />}</div>
            </div>
        </div>
    );
}
