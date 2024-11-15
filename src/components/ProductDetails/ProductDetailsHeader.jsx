import { Select } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { orderInfo } from '../../store/orderSlice';
import { phones } from '../../utils/data';
import ProductDetailsSlider from './ProductDetailsSlider';
import './Style.scss';

export default function ProductDetailsHeader({ phoneData }) {
    const [phoneColor, setPhoneColor] = useState('');
    const [phoneStorage, setPhoneStorage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [phone, setPhone] = useState(phoneData?.title || 'Apple iPhone 14 Pro Max');
    const price = phoneData?.price || 1299;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange = (value) => {
        setPhone(value);
    };

    const handleQuantity = (status) => {
        if (status === 'plus') {
            if (quantity < 3) {
                setQuantity((prev) => prev + 1);
            }
        }

        if (status === 'minus') {
            if (quantity > 1) {
                setQuantity((prev) => prev - 1);
            }
        }
    };

    const handleClick = () => {
        // setIsModalOpen(true);

        const formData = {
            color: phoneColor,
            storage: phoneStorage,
            quantity,
            model: phone,
            price,
            totalPrice: price * quantity,
        };

        dispatch(orderInfo(formData));
        navigate('/shipping');
    };

    const colors = ['#181F26', '#F8F3EF', '#FD0325', '#9DB2C5', '#E5DBEA', '#F8E376'];
    const storage = ['128GB', '256GB', '512GB'];
    return (
        <div className="product-details-header">
            <ProductDetailsSlider data={phoneData} />

            <div className="details">
                <div className="title">Apple iPhone</div>

                <div className="divider"></div>
                <h2>{phone}</h2>
                <div className="divider"></div>

                <div className="model">
                    <p>Model: </p>
                    <Select
                        showSearch
                        style={{
                            width: 200,
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        onChange={onChange}
                        disabled
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                                .toLowerCase()
                                .localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={phones?.map((item) => {
                            return {
                                value: item,
                                label: item,
                            };
                        })}
                        value={phone}
                    />
                </div>

                <div className="color">
                    <p>Color: </p>

                    {colors.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setPhoneColor(item);
                            }}
                            style={{ backgroundColor: `${item}` }}
                            className="color_box"
                        >
                            {phoneColor === item ? <div className="check-box"></div> : null}
                        </div>
                    ))}
                </div>

                <div className="storage">
                    <p>Storage: </p>

                    {storage.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setPhoneStorage(item);
                            }}
                            className="storage_box"
                        >
                            <div
                                className={`storage-box ${phoneStorage === item ? 'active' : null}`}
                            >
                                {item}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="quantity">
                    <p>Quantity: </p>
                    <div className="quantity-wrapper">
                        <div
                            onClick={() => {
                                handleQuantity('minus');
                            }}
                            className="minus"
                        ></div>
                        <div className="qty">0{quantity}</div>
                        <div
                            onClick={() => {
                                handleQuantity('plus');
                            }}
                            className="plus"
                        ></div>
                    </div>
                </div>

                <div className="total-price">
                    <p>Price:</p>
                    <div className="price"> $ {quantity * price}</div>
                </div>

                <div className="buy-now">
                    <button
                        onClick={handleClick}
                        disabled={!phoneStorage || !phoneColor}
                        className="button-primary"
                    >
                        Buy Now $ {quantity * price}
                    </button>
                </div>
            </div>
        </div>
    );
}
