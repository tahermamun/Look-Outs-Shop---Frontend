import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../utils/apiInstance';

// Create Order
export const createOrder = createAsyncThunk(
    'order/createOrder',
    async (formData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.post('order', formData);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Verify order
export const verifyOrder = createAsyncThunk(
    'order/verifyOrder',
    async (formData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.get(
                `order/verify_order?token=${formData.token}&id=${formData.id}`
            );

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Get customer or Login user order
export const getLoginUserOrder = createAsyncThunk(
    'order/getLoginUserOrder',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {
                data: { data },
            } = await API.get(`order/user?id=${id}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Get customer or Login user order
export const getAllOrder = createAsyncThunk(
    'order/getAllOrder',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {
                data: { data },
            } = await API.get(`order`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);
// Delete order
export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.delete(`order?id=${id}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);
// Update order status
export const updateOrderStatus = createAsyncThunk(
    'order/updateOrderStatus',
    async ({ id, status }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.put(`order?id=${id}&status=${status}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        message: null,
        error: null,
        orders: [],
        newOrderInfo: null,
        userOrders: [],
        orderdetails: null,
        orderPlaced: null,
    },

    extraReducers: (builder) => {
        // Delete Order
        builder.addCase(updateOrderStatus.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // Delete Order
        builder.addCase(deleteOrder.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(deleteOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // getLoginUserOrder
        builder.addCase(getAllOrder.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });

        builder.addCase(getAllOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.orders = [];
        });

        // getLoginUserOrder
        builder.addCase(getLoginUserOrder.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getLoginUserOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload;
        });

        builder.addCase(getLoginUserOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.orders = [];
        });

        // Verify Order
        builder.addCase(verifyOrder.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(verifyOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.orderPlaced = true;
        });

        builder.addCase(verifyOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.orderPlaced = null;
        });

        // Create Order
        builder.addCase(createOrder.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.newOrderInfo = action.payload.data;
            state.message = action.payload.message;
        });

        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.newOrderInfo = null;
        });
    },

    reducers: {
        clearError: (state) => ({
            ...state,
            error: null,
            message: null,
        }),
        reset: (state) => ({
            ...state,
            message: null,
            error: null,
            orderPlaced: null,
        }),
        orderInfo: (state, action) => ({
            orderdetails: action.payload,
        }),
    },
});

export const { clearError, reset, orderInfo } = orderSlice.actions;
export default orderSlice.reducer;
