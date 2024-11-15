import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../utils/apiInstance';

// Load user
export const loadUser = createAsyncThunk(
    'user/loadUser',
    async (__, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {
                data: { data },
            } = await API.get('user/login_user');

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Login users
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (formData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.post('user/login', formData);

            API.defaults.headers.common['token'] = data.token;

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Register Users
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async (formData, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.post('user/register', formData);

            API.defaults.headers.common['token'] = data.token;

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Verify Phone
export const verifyPhone = createAsyncThunk(
    'user/verifyPhone',
    async (token, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.get(`user/verify_phone?token=${token}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    async (token, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.get(`user/verify_email?token=${token}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Verify Email
export const getAllUser = createAsyncThunk(
    'user/getAllUser',
    async (__, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {
                data: { data },
            } = await API.get(`user/all_user`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// delete user
export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.delete(`user?id=${id}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// delete user
export const changePassword = createAsyncThunk(
    'user/changePassword',
    async ({ oldPassword, newPassword }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.post(
                `user/change_password?newPassword=${newPassword}&oldPassword=${oldPassword}`
            );

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async ({ email }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.get(`user/forgot_password?email=${email}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Forgot Password
export const verifyForgotPassword = createAsyncThunk(
    'user/verifyForgotPassword',
    async ({ password, token }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.get(
                `user/verify_forgot_password?password=${password}&token=${token}`
            );

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

// Change role
export const changeRole = createAsyncThunk(
    'user/changeRole',
    async ({ id, role }, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { data } = await API.patch(`user?id=${id}&role=${role}`);

            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || error?.message || 'unknown error'
            );
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        message: null,
        error: null,
        isLoggedIn: false,
        users: [],
        token: null,
        authenticated: null,
    },

    extraReducers: (builder) => {
        // Change password
        builder.addCase(changeRole.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(changeRole.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(changeRole.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // Forgot password
        builder.addCase(verifyForgotPassword.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(verifyForgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(verifyForgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // Forgot password
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });
        // Change Password
        builder.addCase(changePassword.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // Delete user
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        });

        // Get all users
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });

        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.users = [];
        });

        // Verify Email
        builder.addCase(verifyEmail.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Verify phone
        builder.addCase(verifyPhone.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(verifyPhone.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        });

        builder.addCase(verifyPhone.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Register User
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.message = action.payload.message;
            state.isLoggedIn = true;
            state.authenticated = true;
            state.error = null;
        });

        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.isLoggedIn = false;
            state.authenticated = false;
            state.error = action.payload;
        });

        // Login User
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.authenticated = true;
            state.message = action.payload.message;
            state.error = null;
        });

        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.authenticated = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        });

        // Load User
        builder.addCase(loadUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.authenticated = true;
            state.error = null;
        });

        builder.addCase(loadUser.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.authenticated = false;
            state.error = action.payload;
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
            isLoggedIn: false,
        }),
        logout: (state) => ({
            user: null,
            message: null,
            error: null,
            isLoggedIn: false,
            users: [],
            token: null,
            authenticated: null,
        }),
    },
});

export const { clearError, reset, logout } = userSlice.actions;
export default userSlice.reducer;
