import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, reset } from '../store/userSlice';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Subscribe from '../components/Home/Subscribe';
import BestSeller from '../components/Home/BestSeller';
import SubHeader from '../components/Home/SubHeader';
import Navbar from '../components/Navbar/Navbar';
import SubSlider from '../components/SubSlider/SubSlider';
import { toast } from 'react-toastify';

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const { isLoggedIn, token, message, error } = useSelector((state) => state.user);
    useEffect(() => {
        if (isLoggedIn) {
            window.localStorage.setItem('token', JSON.stringify(token));
            dispatch(reset());
            navigate('/verify-phone');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(reset());
        }
        if (message) {
            toast.success(message);
            dispatch(reset());
        }
    }, [message, error, dispatch]);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    return (
        <div>
            <Navbar />
            <SubSlider />

            <SubHeader title="SHIPPING INFORMATION" />

            <form action="" className="form-group" onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    required
                />
                <input
                    onChange={handleChange}
                    type="text"
                    name="id"
                    id="id"
                    placeholder="ID/EQAMA Number"
                    required
                />
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Email"
                    required
                />

                <PhoneInput
                    placeholder="Enter phone number"
                    value=""
                    id="phone"
                    onChange={(value) => {
                        setFormData({ ...formData, phone: value });
                    }}
                />
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    required
                />

                <p>
                    Already have account? <Link to="/login">Login</Link>{' '}
                </p>

                <button type="submit" className="button-primary">
                    Register
                </button>
            </form>

            <BestSeller />
            <Subscribe />
        </div>
    );
}
