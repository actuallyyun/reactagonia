# Project overview
This project is a frontend e-commerce application using the [fake store api](https://fakeapi.platzi.com/).

It is a `create-react-app` project that uses TypeScript, Redux toolkit and `useContext` for state management. 

Tailwind CSS is used for styling, along with flowbite and flowbite react library.

`react-hook-form` is used for form validation.

`RTK Query` is used for data fetching.

`react testing library` and `jest` are used for unit testing.

`notistack` is used to display snackbars.

`react-router-dom` is used for routing.

# Pages Overview

- Home "./"
- Auth './auth'
- Profile './account' **Private route**. Only logged in users can access this page.
- Cart './cart'
- Single product page './product/:id'
- Category page './shop/id'
- All products page './product'

# Project folder structure
The project follows conventional folder structure and naming conventions. It
is organized into the following folders:
```
src
├── components
│   ├── cart
│   ├── category
│   ├── header
│   ├── product
│   ├── user
│   └── common
├── images
├── misc
    - util functions
    - types
├── pages
│   ├── account
│   ├── cart
│   ├── home
│   ├── product
│   └── category
├── services
│   ├── authApi
│   ├── productApi
│   └── helpers
├── store
```

# Features
- Display all products piginated and searchable by title. `/product`
- Display all products in a category,paginated. `/shop/:id`
- Display a single product. `/product/:id`
- Shopping cart: add, update, remove products. Cart is displayed on '/cart' page, as well as a modal when user adds a product to cart.
- Modify product: add, remove, update product. `add` is only accessable to logged in users at `/account` page.Update and remove is only accessable to users with `admin` role.
- Dark mode: toggle dark mode on and off using Context API.
- User authentication: register, login, logout. User can view their profile at `/account` page. It supports login with Google.
- User feedback: show snackbars when user login, register, logout, add, remove, update product.
- Scroll to top: show a button to scroll to top when user scrolls down.
- Responsive: the app is responsive and supports mobile, tablet and desktop viewports.
- Unit testing: test reducers and components with `@testing-library/react` and `@testing-library/jest-dom`.
- Perfomance optimization: use `debounce` for search, use `RTK Query` for data fetching, configrate caching behavior.
- Reusable logic: util functions, custom hooks, and components.
- UI&UX: provide feedback when user modify product(add, remove, update), provide feedback when user login, register, logout. Implement animation and transiton on home page category cards.



## Deep dive in user auth flow
- If user auth token found in localstorage, attempt to get user with token.
- If user found, set user in redux store and show user avatar and info in header.
- If user not found, remove token from localstorage and show account icon in header.
- If user clicks account icon, show auth page with login form. User can switch to register form.
- After registration, user is redirected to login form to login.
- After login, user is redirected to account page.


## Product page
This page shows all the products. It supports pagination and search by product title. Both pagination and search query can be combined. Curently each page container 12 items which is set by the `limit` query parameter. 

### Testing
Product page is tested with `@testing-library/react` and `@testing-library/jest-dom`. Both paginatin and search functionalities are tested.


## Reusable logic
- ### util functions
Includes url query parser,cleanImageUrl,constructQueryUrl, and more. 

- ### components
Includes `Button`, `Input`, `Spinner`, `Modal`, `ErrorBoundary`, `ErrorFallback`, `PrivateRoute`, `ProtectedRoute`, `ProductCard`, `ProductList`, `ProductPagination`, `ProductSearch`, `ProductSort`, `ProductFilter`
 



