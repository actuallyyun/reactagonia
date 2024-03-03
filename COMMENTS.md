# Pages Overview

- Home "./"
- Auth './auth'
- Profile './account' Private route. Only logged in users can access this page.
- Cart './cart'
- Single product page './product/:id'
- Category page './shop/id'
- All products page './product'

## User auth flow
- If user auth token found in localstorage, attempt to get user with token.
- If user found, set user in redux store and show user avatar and info in header.
- If user not found, remove token from localstorage and show account icon in header.
- If user clicks account icon, show auth page with login form. User can switch to register form.
- After registration, user is redirected to login form to login.
- After login, user is redirected to account page.

### TODO
- [] Add signup with Google option
- [] Feedback for user when filling the forms correctly 


## Product page
This page shows all the products. It supports pagination and search by product title. Both pagination and search query can be combined. Curently each page container 12 items which is set by the `limit` query parameter. 

### Testing
Product page is tested with `@testing-library/react` and `@testing-library/jest-dom`. Both paginatin and search functionalities are tested.

### Optimization: use debounce for search


## Testing
### TODO
- [] Test product RTK query
- [] Test private routes

## Reusable logic
- ### util functions
Includes url query parser,cleanImageUrl,constructQueryUrl, and more. 

- ### components
Includes `Button`, `Input`, `Spinner`, `Modal`, `ErrorBoundary`, `ErrorFallback`, `PrivateRoute`, `ProtectedRoute`, `ProductCard`, `ProductList`, `ProductPagination`, `ProductSearch`, `ProductSort`, `ProductFilter`
 

## UI&UX

- provide feeback when user modify product(add, remove, update)
- provide feedback when user login, register, logout
- animation and transiton
Home page category cards have hover effect.

### TODO
- scroll to top
When user scrolls down, a button appears to scroll to top.