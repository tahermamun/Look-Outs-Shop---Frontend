import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, verifyForgotPassword } from '../../store/userSlice';
import './Style.scss';

export default function ForgotPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { token } = useParams();
    const dispatch = useDispatch();

    const { message, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(reset());
            navigate('/login');
        }

        if (error) {
            toast.error(error);
            dispatch(reset());
        }
    }, [dispatch, message, error, navigate]);

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error("Password didn't match!");
        }

        dispatch(verifyForgotPassword({ password, token }));
    };
    return (
        <div>
            <Modal
                footer={null}
                title="Enter your Password"
                open={true}
                onOk={() => {}}
                onCancel={() => {}}
            >
                <h2 className="title">Enter your password</h2>
                <form className="" onSubmit={onSubmit} action="">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        placeholder="Enter the Password"
                        required
                        minLength={6}
                    />
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter the Password"
                        required
                        minLength={6}
                    />

                    <button type="submit" className="button-primary">
                        Confirm
                    </button>
                </form>
            </Modal>
        </div>
    );
}
