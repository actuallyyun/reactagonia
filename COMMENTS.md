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
This page shows all the products. It supports pagination. Each page container 12 items. 

### TODO
- [] Add title search

## Testing
### TODO
- [] Test product RTK query
- [] Test private routes