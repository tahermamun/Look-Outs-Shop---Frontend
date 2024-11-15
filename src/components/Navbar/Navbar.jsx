import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/userSlice';

export default function Navbar() {
    const [sticky, setSticky] = useState('');
    const [sideBar, setSideBar] = useState(false);
    const dispatch = useDispatch();

    const { authenticated, user } = useSelector((state) => state.user);

    const items = [
        {
            label:
                user?.role === 'admin' ? (
                    <Link to="/admin">Dashboard</Link>
                ) : (
                    <Link to="/profile">Profile</Link>
                ),
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: authenticated ? <Link to="/">Logout</Link> : <Link to="/login"> Login</Link>,
            key: '2',
            icon: <LogoutOutlined />,
            onClick: () => {
                window.localStorage.setItem('token', null);
                dispatch(logout());
                window.location.reload();
            },
        },
    ];
    const handleMenuClick = (e) => {
        // message.info('Click on menu item.');
        // console.log('click', e);
    };

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // const [dark, setDark] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', stickyNavbar);

        return () => {
            window.removeEventListener('scroll', stickyNavbar);
        };
    }, []);

    useEffect(() => {
        window.addEventListener('resize', hideSidebar);

        return () => {
            window.removeEventListener('resize', hideSidebar);
        };
    }, []);

    const stickyNavbar = () => {
        if (window !== undefined) {
            let height = window.scrollY;
            height > 10 ? setSticky('sticky_nav') : setSticky('');
        }
    };

    const hideSidebar = () => {
        if (window !== undefined) {
            let width = window.innerWidth;
            width > 992 && setSideBar(false);
        }
    };

    return (
        <div>
            <div className={`navbar ${sticky}`}>
                <div className="container">
                    <div className="flex">
                        <Link to="/" className="logo">
                        LookOutsShop
                        </Link>
                        <ul className="items">
                            <li className="item">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="item">
                                <Link to="/products">Products</Link>
                            </li>

                            <li>
                                {/* <Link to="/profile">
                                    <button className="button">
                                        <i className="fa-solid fa-user-tie"></i>
                                    </button>
                                </Link> */}

                                <div>
                                    <Dropdown.Button
                                        menu={menuProps}
                                        placement="bottomRight"
                                        icon={<UserOutlined />}
                                    >
                                        Customer
                                    </Dropdown.Button>
                                </div>
                            </li>
                            <li
                                onClick={() => {
                                    setSideBar(true);
                                }}
                                className="menu"
                            >
                                <i className="fa-solid fa-bars"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`side_bar ${sideBar && 'side_bar_active'}`}>
                <div className="items">
                    <ul>
                        <li className="item">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="item">
                            <Link to="/">Products</Link>
                        </li>

                        <button title="Profile" className="button">
                            <i className="fa-solid fa-user-tie"></i>
                        </button>
                    </ul>
                    <div
                        onClick={() => {
                            setSideBar(false);
                        }}
                        className="close"
                    >
                        <i className="fa-solid fa-circle-chevron-down"></i>
                    </div>
                    <div className="logo">LOGO</div>

                    <div className="social">
                        <ul>
                            <li>
                                <i className="fa-brands fa-twitter"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-facebook-f"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-linkedin-in"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-instagram"></i>
                            </li>
                            <li>
                                <i className="fa-brands fa-youtube"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
