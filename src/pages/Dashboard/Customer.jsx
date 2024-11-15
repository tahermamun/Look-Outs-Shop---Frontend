import { DeleteOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import BreadCrumb from '../../components/Dashboard/BreadCrumb';
import DataTable from '../../components/Shared/DataTable';
import { changeRole, deleteUser, reset } from '../../store/userSlice';

export default function Customer() {
    const dispatch = useDispatch();
    const { users, message, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch(reset());
        }
        if (error) {
            toast.error(error);
            dispatch(reset());
        }

        // dispatch(getAllUser());
    }, [dispatch, message, error]);

    const columns = [
        {
            title: 'Name',
            width: 70,
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'EQAMA',
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
            render: (record, index) => {
                const items = [
                    {
                        key: 'admin',
                        label: (
                            <p
                                onClick={() => {
                                    dispatch(changeRole({ id: index.key, role: 'admin' }));
                                }}
                                style={{ textTransform: 'capitalize' }}
                            >
                                admin
                            </p>
                        ),
                    },
                    {
                        key: 'customer',
                        label: (
                            <p
                                onClick={() => {
                                    dispatch(changeRole({ id: index.key, role: 'customer' }));
                                }}
                                style={{ textTransform: 'capitalize' }}
                            >
                                customer
                            </p>
                        ),
                    },
                ];

                return (
                    <Space size="middle">
                        <Dropdown menu={{ items }}>
                            <p style={{ textTransform: 'capitalize' }}>
                                {record} <DownOutlined />
                            </p>
                        </Dropdown>
                    </Space>
                );
            },
        },
        {
            title: 'Delete',
            width: 20,
            dataIndex: 'delete',
            key: 'delete',
            render: (record, index) => {
                return (
                    <p
                        style={{ color: 'red', cursor: 'pointer' }}
                        onClick={() => {
                            console.log('Delete', index.key);
                            dispatch(deleteUser(index.key));
                        }}
                    >
                        {record} <DeleteOutlined />
                    </p>
                );
            },
        },
    ];

    const row = users.map((item, i) => {
        return {
            key: item._id,
            name: item.name || '',
            phone: item.phone,
            email: item.email,
            role: item.role,
            id: item.id,
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
            <h2>Customer List</h2>
            <BreadCrumb page={'Customer List'} />

            <DataTable height={1000} row={row} columns={columns} />
        </div>
    );
}
