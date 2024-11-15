import { Table } from 'antd';
import React from 'react';

export default function DataTable({ rowSelection, row, columns, height }) {
    // const columns = [
    //     {
    //         title: 'Full Name',
    //         width: 100,
    //         dataIndex: 'name',
    //         key: 'name',
    //         // fixed: 'left',
    //     },
    //     {
    //         title: 'Age',
    //         width: 100,
    //         dataIndex: 'age',
    //         key: 'age',
    //         // fixed: 'left',
    //     },
    //     {
    //         title: 'Column 1',
    //         dataIndex: 'address',
    //         key: '1',
    //         width: 150,
    //     },
    //     {
    //         title: 'Column 2',
    //         dataIndex: 'address',
    //         key: '2',
    //         width: 150,
    //     },

    //     {
    //         title: 'Action',
    //         key: 'operation',
    //         // fixed: 'right',
    //         width: 100,
    //         render: () => <p>action</p>,
    //     },
    // ];

    // const data = [];
    // for (let i = 0; i < 10; i++) {
    //     data.push({
    //         key: i,
    //         name: `Edward ${i}`,
    //         age: 32,
    //         address: `London Park no. ${i}`,
    //     });
    // }

    return (
        <Table
            columns={columns}
            dataSource={row}
            rowSelection={
                rowSelection
                    ? {
                          ...rowSelection,
                      }
                    : null
            }
            scroll={{
                x: 2000,
                y: height,
            }}
        />
    );
}
