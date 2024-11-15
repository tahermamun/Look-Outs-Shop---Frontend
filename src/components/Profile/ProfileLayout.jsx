// import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Subscribe from '../Home/Subscribe';
import Navbar from '../Navbar/Navbar';
import './Style.scss';

export default function ProfileLayout() {
    // const handleMenuClick = (e) => {
    // message.info('Click on menu item.');
    // };

    // const dispatch = useDispatch();

    // const items = [
    //     {
    //         label: <Link to="/">Profile</Link>,
    //         key: '1',
    //         icon: <UserOutlined />,
    //     },
    //     {
    //         label: <Link to="/">Logout</Link>,
    //         key: '2',
    //         icon: <LogoutOutlined />,
    //         onClick: () => {
    //             window.localStorage.setItem('token', null);
    //             dispatch(logout());
    //             window.location.reload();
    //         },
    //     },
    // ];

    // const menuProps = {
    //     items,
    //     onClick: handleMenuClick,
    // };
    return (
        <div className="profile ">
            {/* Sidebar */}
            {/* <div className="sidebar">
                <h2 className="logo">LOGO</h2>
                <ul>
                    <li>
                        <Link to="/profile">
                            <AppstoreOutlined />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="order">
                            <UnorderedListOutlined />
                            <span>Order</span>
                        </Link>
                    </li>
                </ul>
            </div> */}

            <div className="content">
                {/* <div className="dashboard-nav container">
                    <Link to="/">
                        <h2>Logo</h2>
                    </Link>
                    <div>
                        <Dropdown.Button
                            menu={menuProps}
                            placement="bottomRight"
                            icon={<UserOutlined />}
                        >
                            Customer
                        </Dropdown.Button>
                    </div>
                </div> */}

                <Navbar />

                <div className="outlet container">{<Outlet />}</div>

                <Subscribe />
            </div>
        </div>
    );
}
