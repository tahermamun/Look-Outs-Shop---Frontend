# Getting Started

## Developer Experience

-   React Js
-   axios
-   antd
-   moment
-   country-state-city
-   photoswipe
-   swiper
-   sass
-   react-toastify
-   react-phone-number-input
-   react-redux
-   @reduxjs/toolkit

## Project setup for `Development`

1. We will use `yarn` as our package manager. So, install it by running the `command` bellow.

```bash
npm i -g yarn
```

2. Install `eslint` and `prettier` extension in your `vscode`.

3. Install `sass` for support `scss`, run `yarn add sass`.

4. Clone project on your local machine by running `git clone `

5. Go to the project directory `eCommerce-be` and run `yarn`.

6. Create `.env` file in your root directory.Then copy the contents of `.env.example` to `.env`.

7. Finally run `yarn start` to start the dev server.

Path - `/` return home page.

Path - `/products` This is All Product Page.

Path - `/products/AP01IDS02` This is All Single Product Page.

Path - `/shipping` This is Order Shipping Page.

Path - `/login` This is Login Page.

Path - `/register` This is Register Page.

Path - `/profile` This is User Profile or Customer Profile Page.

Path - `/admin` This is Admin Dashboard Page.

Path - `/admin/customer` This is Admin Dashboard Customer list Page.

Path - `/admin/order` This is Admin Dashboard Order list Page.

Path - `/verify-phone` This is Phone number verification page.

Path - `/verify-email` This is Email Address verification page.

Path - `/forgot` This Route Redirect to `Forgot password form`.

Path - `/forgot-password/:token` This Route Redirect to `Reset Password Form`.

Path - `/profile` change password form open by clicking edit button on profile page.

**Admin Panel**

1. Superadmin permissons
   a. Update user/customer role.
   b. Delete User/customer
   c. Get all users/customer
2. Admin and Super Admin permissions
   a. Create order,
   b. Update order Status,
   c. Get All orders,
   d. Delete Orders,
   e. Get all users/customers,

`All Product data are holded on 'utils/data.js'`

**ENV**
`REACT_APP_BASE_URL=http://localhost:8000/api/v1/`
