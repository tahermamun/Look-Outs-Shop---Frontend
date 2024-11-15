import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPassword, reset } from '../../store/userSlice';
import './Style.scss';

export default function ForgotPasswordSend() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
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

        dispatch(forgotPassword({ email }));
    };
    return (
        <div>
            <Modal
                footer={null}
                title="Enter your Email"
                open={true}
                onOk={() => {}}
                onCancel={() => {}}
            >
                <h2 className="title">Confirm Your Email</h2>
                <form className="" onSubmit={onSubmit} action="">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        required
                    />

                    <button type="submit" className="button-primary">
                        Confirm
                    </button>
                </form>
            </Modal>
        </div>
    );
}
