import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BreadCrumb from '../../components/Dashboard/BreadCrumb';
import DataTable from '../../components/Shared/DataTable';
import { deleteOrder, reset, updateOrderStatus } from '../../store/orderSlice';
import { localDateFormat } from '../../utils/date';

export default function OrderList() {
    const dispatch = useDispatch();
    const { orders, message, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(reset());
        }

        if (error) {
            toast.error(error);
            dispatch(reset());
        }

        // dispatch(getAllOrder());
    }, [dispatch, message, error]);

    const columns = [
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
            width: 40,
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
            width: 60,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            width: 90,
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'OTP',
            width: 40,
            dataIndex: 'showOTP',
            key: 'showOTP',
        },
        {
            title: 'Status',
            width: 65,
            dataIndex: 'status',
            key: 'status',
            render: (record, index) => {
                const items = [
                    {
                        key: 'Processing',
                        label: (
                            <p
                                onClick={() => {
                                    dispatch(
                                        updateOrderStatus({ id: index.key, status: 'Processing' })
                                    );
                                }}
                            >
                                Processing
                            </p>
                        ),
                    },
                    {
                        key: 'Shipped',
                        label: (
                            <p
                                onClick={() => {
                                    dispatch(
                                        updateOrderStatus({ id: index.key, status: 'Shipped' })
                                    );
                                }}
                            >
                                Shipped
                            </p>
                        ),
                    },
                    {
                        key: 'Delivered',
                        label: (
                            <p
                                onClick={() => {
                                    dispatch(
                                        updateOrderStatus({ id: index.key, status: 'Delivered' })
                                    );
                                }}
                            >
                                Delivered
                            </p>
                        ),
                    },
                ];

                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <p>
                                {record} <DownOutlined />
                            </p>
                        </Dropdown>
                    </Space>
                );
            },
        },
        {
            title: 'Address',
            width: 100,
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'EQAMA',
            width: 50,
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Delete',
            width: 40,
            dataIndex: 'delete',
            key: 'delete',
            render: (record, index) => {
                return (
                    <p
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                            dispatch(deleteOrder(index.key));
                        }}
                    >
                        {record} <DeleteOutlined />
                    </p>
                );
            },
        },
    ];

    const row = orders.map((item, i) => {
        return {
            key: item._id,
            model: item.model,
            price: item.price,
            color: item.color || '#000',
            date: localDateFormat(item.createdAt),
            qty: item.quantity,
            phone: item.user?.phone,
            email: item.user?.email,
            status: item.status,
            id: item.user?.id || '',
            storage: item.storage || '265GB',
            totalPrice: item.totalPrice,
            showOTP: item.showOTP || '',
            address: `${item.address}, ${item.state}, ${item.country}`,
        };
    });

    // const rowSelection = {
    //     onChange: (selectedRowKeys, selectedRows) => {
    //         // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //     },
    //     onSelect: (record, selected, selectedRows) => {
    //         // console.log(record, selected, selectedRows);
    //     },
    //     onSelectAll: (selected, selectedRows, changeRows) => {
    //         // console.log(selected, selectedRows, changeRows);
    //     },
    // };
    return (
        <div>
            <h2>Order List</h2>
            <BreadCrumb page={'Order List'} />
            <DataTable height={1000} row={row} columns={columns} />
        </div>
    );
}
