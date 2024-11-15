import { EditOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BreadCrumb from '../../components/Dashboard/BreadCrumb';
import DataTable from '../../components/Shared/DataTable';
import { getLoginUserOrder } from '../../store/orderSlice';
import { changePassword, reset } from '../../store/userSlice';

export default function Profile() {
    const dispatch = useDispatch();

    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const { user, message, error } = useSelector((state) => state.user);
    const { orders } = useSelector((state) => state.order);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(reset());
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
            setChangePasswordModal(false);
        }
        if (error) {
            toast.error(error);
            dispatch(reset());
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
        dispatch(getLoginUserOrder(user?._id));
    }, [dispatch, user?._id, message, error]);

    const columns = [
        {
            title: 'Model',
            width: 70,
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Price',
            width: 20,
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Quantity',
            width: 30,
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Phone',
            width: 50,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            width: 30,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            width: 30,
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Address',
            width: 70,
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const handleChange = (e) => {
        e.preventDefault();

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        const { newPassword, oldPassword, confirmPassword } = formData;
        if (newPassword !== confirmPassword) {
            return toast.warning("Password didn't Match!");
        }

        dispatch(changePassword({ newPassword, oldPassword }));
    };

    const row = orders?.map((item, i) => {
        return {
            key: item._id,
            model: item.model,
            price: item.price,
            qty: item.quantity,
            phone: item.user.phone,
            email: item.user.email,
            status: item.status,
            address: `${item.address}, ${item.state}, ${item.country}`,
        };
    });

    return (
        <>
            <div className="profile-info">
                <h2>Profile</h2>
                <BreadCrumb page="Profile" />

                <div className="profile-header">
                    <h3>Personal Information</h3>

                    <div onClick={() => setChangePasswordModal(true)} className="icon-wrapper">
                        <EditOutlined />
                    </div>
                </div>
                <div className="info">
                    <table>
                        {user ? (
                            <tbody>
                                <tr>
                                    <td>
                                        <span>Name:</span>
                                    </td>
                                    <td>{user.name || 'Customer'}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span>Email:</span>
                                    </td>
                                    <td>{user.email}</td>
                                </tr>

                                <tr>
                                    <td>
                                        <span>Phone:</span>
                                    </td>
                                    <td>{user.phone}</td>
                                </tr>
                            </tbody>
                        ) : null}
                    </table>
                </div>
            </div>

            <div className="order-list">
                <h3>Order List</h3>

                <DataTable row={row} columns={columns} checkbox={false} />
            </div>

            {/* Change Password Modal */}

            <Modal
                footer={null}
                title="Change Password"
                open={changePasswordModal}
                onOk={() => {
                    setChangePasswordModal(false);
                }}
                onCancel={() => {
                    setChangePasswordModal(false);
                }}
            >
                <form className="form-group" action="">
                    <input
                        type="password"
                        name="oldPassword"
                        required
                        value={formData.oldPassword}
                        placeholder="Enter Old Password"
                        minLength={6}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        required
                        placeholder="Enter New Password"
                        minLength={6}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        required
                        placeholder="Confirm Password"
                        minLength={6}
                        onChange={handleChange}
                    />

                    <button onClick={handleChangePassword} className="button-primary">
                        Verify Order
                    </button>
                </form>
            </Modal>
        </>
    );
}
