import React from 'react';
import BreadCrumb from '../../components/Dashboard/BreadCrumb';
import DataTable from '../../components/Shared/DataTable';

export default function CustomerOrderList() {
    return (
        <div>
            <h2>Order List</h2>
            <BreadCrumb page={'Order List'} />

            <DataTable />
        </div>
    );
}
