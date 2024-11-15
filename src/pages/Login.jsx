import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import BestSeller from '../components/Home/BestSeller';
import SubHeader from '../components/Home/SubHeader';
import Subscribe from '../components/Home/Subscribe';
import Navbar from '../components/Navbar/Navbar';
import SubSlider from '../components/SubSlider/SubSlider';
import { loginUser, reset } from '../store/userSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const { user, isLoggedIn, token } = useSelector((state) => state.user);

    useEffect(() => {
        if (isLoggedIn) {
            window.localStorage.setItem('token', JSON.stringify(token));
            dispatch(reset());

            if (user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/profile');
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn, dispatch]);

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    };

    return (
        <div>
            <Navbar />
            <SubSlider />

            <SubHeader title="lOGIN " />

            <form action="" className="form-group" onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id=""
                    placeholder="Enter Email"
                />
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id=""
                    placeholder="Enter Password"
                />

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <p>
                        Don't have account? <Link to="/register">Sign Up</Link>{' '}
                    </p>
                    <p>
                        <Link style={{ color: 'red', textAlign: 'center' }} to="/forgot">
                            Forgot Password
                        </Link>
                    </p>
                </div>
                <button type="submit" className="button-primary">
                    Login
                </button>
            </form>

            <BestSeller />
            <Subscribe />
        </div>
    );
}
