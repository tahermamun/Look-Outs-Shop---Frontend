import { UnorderedListOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../../components/Shared/DataTable';
import { localDateFormat } from '../../utils/date';

export default function Dashboard() {
    const { orders } = useSelector((state) => state.order);
    const { users } = useSelector((state) => state.user);

    const totalAmount = orders?.reduce((acc, cur) => {
        return (acc += Number(cur.totalPrice));
    }, 0);

    const usercolumns = [
        {
            title: 'Name',
            width: 70,
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'EQAMA No.',
            width: 50,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Phone',
            width: 50,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            width: 50,
            dataIndex: 'email',
            key: 'email',
        },

        {
            title: 'Role',
            width: 30,
            dataIndex: 'role',
            key: 'role',
        },
    ];

    const userrow = users?.map((item, i) => {
        return {
            key: item._id,
            name: item.name || '',
            phone: item.phone,
            email: item.email,
            role: item.role,
            id: item.id,
        };
    });

    const ordercolumns = [
        {
            title: 'Model',
            width: 70,
            dataIndex: 'model',
            key: 'model',
        },
        {
            title: 'Price',
            width: 40,
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total Price',
            width: 40,
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Quantity',
            width: 35,
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Storage',
            width: 35,
            dataIndex: 'storage',
            key: 'storage',
        },
        {
            title: 'Color',
            width: 35,
            dataIndex: 'color',
            key: 'color',
            render: (record) => {
                console.log(record);
                return (
                    <div
                        style={{ width: '40px', height: '40px', backgroundColor: `${record}` }}
                    ></div>
                );
            },
        },
        {
            title: 'Order Date',
            width: 50,
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Phone',
            width: 50,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            width: 70,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            width: 50,
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'OTP',
            width: 40,
            dataIndex: 'showOTP',
            key: 'showOTP',
        },
        {
            title: 'EQAMA',
            width: 50,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Address',
            width: 100,
            dataIndex: 'address',
            key: 'address',
        },
    ];

    const orderrow = orders?.map((item, i) => {
        return {
            key: item._id,
            model: item.model,
            price: item.price,
            date: localDateFormat(item.createdAt),
            qty: item.quantity,
            phone: item.user?.phone,
            color: item.color || '#000',
            email: item.user?.email,
            id: item.user?.id || '',
            storage: item.storage || '265GB',
            status: item.status,
            totalPrice: item.totalPrice,
            address: `${item.address}, ${item.state}, ${item.country}`,
            showOTP: item.showOTP || '',
        };
    });

    return (
        <div>
            <div className="dashboard-main">
                <div className="info-cards">
                    <div className="info-card">
                        <div className="info">
                            <h4>Users</h4>
                            <p>{users.length}</p>
                        </div>
                        <div className="icon">
                            <UsergroupAddOutlined />
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info">
                            <h4>Orders</h4>
                            <p>{orders?.length}</p>
                        </div>
                        <div className="icon">
                            <UnorderedListOutlined />
                        </div>
                    </div>
                    <div className="info-card">
                        <div className="info">
                            <h4>Total Earnings</h4>
                            <p> $ {totalAmount}</p>
                        </div>
                        <div className="icon">
                            <UnorderedListOutlined />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mini-info">
                <h2>Customer List</h2>
                <DataTable height={500} row={userrow} columns={usercolumns} />
            </div>

            <div className="mini-info">
                <h2>Order List</h2>
                <DataTable height={500} row={orderrow} columns={ordercolumns} />
            </div>
        </div>
    );
}
