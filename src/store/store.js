import orderSlice from './orderSlice';
import userSlice from './userSlice';

const { configureStore } = require('@reduxjs/toolkit');

const store = configureStore({
    reducer: {
        user: userSlice,
        order: orderSlice,
    },
});

export default store;
