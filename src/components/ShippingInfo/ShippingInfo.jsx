import { Modal } from 'antd';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrder, reset, verifyOrder } from '../../store/orderSlice';
import BestSeller from '../Home/BestSeller';
import SubHeader from '../Home/SubHeader';
import Subscribe from '../Home/Subscribe';
import Navbar from '../Navbar/Navbar';
import SubSlider from '../SubSlider/SubSlider';

export default function ShippingInfo() {
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [otpModal, setOtpModal] = useState(false);
    const [otp, setOtp] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orderdetails, newOrderInfo, message, orderPlaced, error } = useSelector(
        (state) => state.order
    );

    useEffect(() => {
        if (!orderdetails) return navigate('/');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (newOrderInfo) {
            setOtpModal(true);
        }

        if (message) {
            toast.success(message);
        }

        if (error) {
            toast.error(reset());
            dispatch(reset());
        }

        if (orderPlaced) {
            navigate('/');
            dispatch(reset());
        }
    }, [newOrderInfo, message, dispatch, error, orderPlaced, navigate]);

    console.log(orderdetails);

    const handleOTP = (e) => {
        e.preventDefault();

        dispatch(verifyOrder({ id: newOrderInfo._id, token: otp }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const shippingInfo = {
            address,
            state: State?.getStateByCodeAndCountry(state, country)?.name,
            country: Country?.getCountryByCode(country)?.name,
            postalCode: pinCode,
        };

        const formData = { ...orderdetails, ...shippingInfo };

        dispatch(createOrder(formData));
    };
    return (
        <>
            <Navbar />
            <SubSlider />
            <div className="container">
                <div className="shipping">
                    <SubHeader title="SHIPPING INFORMATION" />

                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="items">
                            <p>Country</p>
                            <div className="item">
                                <select
                                    name="country"
                                    required
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    id=""
                                >
                                    <option value="">Country</option>
                                    {Country &&
                                        Country.getAllCountries().map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        {country && (
                            <div className="items">
                                <p>State</p>
                                <div className="item">
                                    <select
                                        name="state"
                                        required
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option value="">State</option>
                                        {State &&
                                            State.getStatesOfCountry(country).map((item) => (
                                                <option key={item.isoCode} value={item.isoCode}>
                                                    {item.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="items">
                            <p>Address</p>
                            <div className="item">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    required
                                    value={address}
                                    name="address"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="items">
                            <p>Postal Code</p>
                            <div className="item">
                                <input
                                    type="number"
                                    placeholder="Postal code"
                                    required
                                    value={pinCode}
                                    name="postcode"
                                    onChange={(e) => setPinCode(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* <CircularStatic /> */}

                        <button className="button-primary" type="submit">
                            Confirm
                        </button>

                        <Modal
                            footer={null}
                            title="Enter OTP"
                            open={otpModal}
                            onOk={() => {
                                setOtpModal(false);
                            }}
                            onCancel={() => {
                                setOtpModal(false);
                            }}
                        >
                            <form className="form-group" action="">
                                <input
                                    type="text"
                                    name="otp"
                                    required
                                    placeholder="Enter OTP"
                                    maxLength={6}
                                    minLength={6}
                                    onChange={(e) => setOtp(e.target.value)}
                                />

                                <button onClick={handleOTP} className="button-primary">
                                    Verify Order
                                </button>
                            </form>
                        </Modal>

                        {/* {state && (
                <div className="items">
                    <p>City</p>
                    <div className="item">
                        <select
                            name="city"
                            required
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        >
                            <option value="">City</option>
                            {City &&
                                City.getCitiesOfState(country, state).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                        {item.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            )} */}
                    </form>
                </div>
            </div>

            <BestSeller />
            <Subscribe />
        </>
    );
}

// function CircularStatic() {
//     const [progress, setProgress] = React.useState(10);

//     React.useEffect(() => {
//         const timer = setInterval(() => {
//             // if (progress > 0) {
//             //     console.log('hit');
//             //     setProgress((prevProgress) => prevProgress - 1);
//             // } else {
//             //     return;
//             // }
//         }, 1000);
//         // return () => {
//         //     clearInterval(timer);
//         // };
//     }, []);
//     console.log(progress);

//     return (
//         <CircularProgressbar
//             value={100}
//             text={`${100}`}
//             circleRatio={0.75}
//             styles={buildStyles({
//                 rotation: 1 / 2 + 1 / 8,
//                 strokeLinecap: 'butt',
//                 trailColor: '#eee',
//             })}
//         />
//     );
// }
