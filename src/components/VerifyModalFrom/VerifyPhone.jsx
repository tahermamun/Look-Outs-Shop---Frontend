import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, verifyPhone } from '../../store/userSlice';
import './Style.scss';

export default function VerifyPhone() {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { user, message, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(reset());
        }

        if (error) {
            toast.error(error);
            dispatch(reset());
        }

        if (message === 'Phone Verified!') {
            if (!user.isEmailVerified) {
                navigate('/verify-email');
            } else {
                navigate('/');
                window.location.reload();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, message, error, navigate]);

    useEffect(() => {
        if (user?.isPhoneVerified) {
            navigate('/');
        } else {
            dispatch(verifyPhone(''));
        }
    }, [dispatch, navigate, user]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(verifyPhone(otp));
    };

    return (
        <div>
            <Modal footer={null} title="Enter OTP" open={true} onOk={() => {}} onCancel={() => {}}>
                <h2 className="title">Verify Your Phone</h2>
                <form className="" onSubmit={onSubmit} action="">
                    <input
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        name="otp"
                        placeholder="Enter the OTP"
                        required
                        maxLength={6}
                        minLength={6}
                    />

                    <button type="submit" className="button-primary">
                        Verify Phone
                    </button>
                </form>
            </Modal>
        </div>
    );
}
