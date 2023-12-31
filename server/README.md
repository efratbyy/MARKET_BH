# BCARD_SERVER

# Getting Started with node server App

## Installation

Enter the server folder

```bash
cd server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.
- You must have a mongoDB Atlas Cluster

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be gray with the message:

`Listening on: http://localhost:8188`

And if there are no login errors you should see the message painted in purple:

`connected to MongoDb Locally!`

### `npm start`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be gray with the message:

`Listening on: http://localhost:8188`

And if there are no login errors you should see the message painted in purple:

`Connected to mongoDb Atlas!`

## Available Routes

Here you can find API addresses that the server will respond to as well as what should be sent to them in the body of the HTTP request and what permissions are required to receive a response from a specific API

### Users API

#### API for Register a new user

```http
  POST /api/users/register
```

#### Request

In the request body you will need to provide an object with the following keys and values

| index       | type   | index | type | min | max | remark   |
| ----------- | ------ | ----- | ---- | --- | --- | -------- |
| first       | string |       |      | 2   | 256 | required |
| last        | string |       |      | 2   | 256 | required |
| phone       | string |       |      | 9   | 11  | required |
| email       | string |       |      | 2   | 5   | required |
| password    | string |       |      | 8   | 20  | required |
| city        | string |       |      | 2   | 256 | required |
| street      | number |       |      | 2   | 256 | required |
| houseNumber | number |       |      | 2   | 256 | required |

- "password" must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email

#### API for Login a user

```http
  POST /api/users/login
```

### Request

In the request body you will need to provide an object with the following keys and values

| index    | type   | min | max | remark   |
| -------- | ------ | --- | --- | -------- |
| email    | string | 2   | 5   | required |
| password | string | 8   | 20  | required |

- "email" must be a standard email
- "password" must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- After 3 failed login attempts your account will be blocked for 24 hours.

### Response

If the user is in the database and the password sent is correct, a token will be returned and the following object can be extracted from it with the help of the jwt-decode library

| index   | type    |
| ------- | ------- |
| \_id    | string  |
| isAdmin | boolean |
| first   | string  |
| last    | string  |

#### API for Information about all the users

```http
  GET /api/users
```

### Request

- You will need to provide a token to get an response from this api
- You will need to be Admin type user to get an response from this api

#### API for Information about a user

```http
  GET /api/users/:id
```

### Request

- You will need to provide a token to get an response from this api
- You will need to be the registered user or Admin type user to get an response from this api

#### API for Updating User information

```http
  PUT /api/users/edit-user
```

### Request

In the request body you will need to provide an object with the following keys and values

| index       | type    | index | type | min | max | remark   |
| ----------- | ------- | ----- | ---- | --- | --- | -------- |
| first       | string  |       |      | 2   | 256 | required |
| last        | string  |       |      | 2   | 256 | required |
| phone       | string  |       |      | 9   | 11  | required |
| email       | string  |       |      | 2   | 5   | required |
| password    | string  |       |      | 8   | 20  | required |
| city        | string  |       |      | 2   | 256 | required |
| street      | number  |       |      | 2   | 256 | required |
| houseNumber | number  |       |      | 2   | 256 | required |
| isBusiness  | boolean |       |      |     |     | required |

- The user "password" must be at least eight characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&\*-
- "phone" must be a standard Israeli phone number
- "email" must be a standard email
- You will need to provide a token to get an response from this api
- You need to be Admin to get an response from this api

#### API for deleting a user

```http
  DELETE /api/users/delete_user
```

- You will need to provide a token to get an response from this api
- You will need to be the registered user or Admin to get an response from this api

#### API for checkout

```http
  PATCH /api/users/checkout/:id
```

- You will need to provide a token to get an response from this api
- You will need to be the registered user to get an response from this api

#### API for getting the user purches history

```http
  GET /api/users/purchase-history/:id
```

- You will need to provide a token to get an response from this api
- You will need to be the registered user to get an response from this api

#### API for getting the user purches history details

```http
  GET /api/users/purchase-history-details/:id/:orderNumber
```

- You will need to provide a token to get an response from this api
- You will need to be the registered user to get an response from this api

#### API for creating a reset password key

```http
  PATCH /api/users/forgot_password/:userEmail
```

- Creates a unique key with which the user will be identified for the purpose of resetting the password

#### API for creating a reset password key

```http
  PATCH /api/users/forgot_password/:userEmail
```

#### API for creating a reset password key

```http
  PATCH /api/users/forgot_password/:userEmail
```

#### API for finding the user by the forgot password key

```http
  GET /api/users/get_user_by_forgot_password_key/:forgotPasswordKey
```

- Identifies the user by the forgot password key for resetting the password

#### API for updating the password

```http
  PATCH /api/users/update_password
```

- Updating the user password

#### API for getting a user by his email

```http
  GET /api/users/get_user/:userEmail
```

### Request

- You will need to provide a token to get an response from this api
- You will need to be an Admin type user to get an response from this api

### Products API

#### API to get all products

```http
  GET /api/products
```

#### API for get a specific product by barcode

```http
  GET /api/products/barcode
```

#### API for create a new product

```http
  POST /api/products/add-product
```

### Request

In the request body you will need to provide an object with the following keys and values:

| index                | type    | index | type | min | max | remark   |
| -------------------- | ------- | ----- | ---- | --- | --- | -------- |
| title                | string  |       |      | 2   | 256 | required |
| brand                | string  |       |      | 2   | 256 | required |
| barcode              | string  |       |      | 2   | 256 | required |
| categoryCode         | string  |       |      | 1   | 256 | required |
| price                | number  |       |      | 2   |     | required |
| imageUrl             | string  |       |      | 2   | 256 |          |
| imageAlt             | string  |       |      | 2   | 256 |          |
| ingredients          | string  |       |      | 2   | 256 |          |
| weightTopDisplay     | number  |       |      | 1   |     | required |
| weightUnitTopDisplay | strung  |       |      | 2   | 256 | required |
| weight               | number  |       |      |     |     |          |
| weightUnit           | string  |       |      | 2   | 256 | required |
| divideBy             | number  |       |      | 1   | 256 | required |
| isSodium             | boolean |       |      |     |     |          |
| isSugar              | boolean |       |      |     |     |          |
| isSaturatedFat       | boolean |       |      |     |     |          |
| isGreenMark          | boolean |       |      |     |     |          |
| isSupervised         | boolean |       |      |     |     |          |
| content              | string  |       |      | 2   | 256 |          |
| manufacturingCountry | string  |       |      | 2   | 256 |          |
| inventory            | number  |       |      |     |     | required |

- You will need to provide a token to get an response from this api
- You will need to be an admin type user to get an response from this api

#### API for edit product information

```http
  PATCH /api/products/edit-product
```

### Request

In the request body you will need to provide an object with the following keys and values

| index                | type    | index | type | min | max | remark   |
| -------------------- | ------- | ----- | ---- | --- | --- | -------- |
| title                | string  |       |      | 2   | 256 | required |
| brand                | string  |       |      | 2   | 256 | required |
| barcode              | string  |       |      | 2   | 256 | required |
| categoryCode         | string  |       |      | 1   | 256 | required |
| price                | number  |       |      | 2   |     | required |
| imageUrl             | string  |       |      | 2   | 256 |          |
| imageAlt             | string  |       |      | 2   | 256 |          |
| ingredients          | string  |       |      | 2   | 256 |          |
| weightTopDisplay     | number  |       |      | 1   |     | required |
| weightUnitTopDisplay | strung  |       |      | 2   | 256 | required |
| weight               | number  |       |      |     |     |          |
| weightUnit           | string  |       |      | 2   | 256 | required |
| divideBy             | number  |       |      | 1   | 256 | required |
| isSodium             | boolean |       |      |     |     |          |
| isSugar              | boolean |       |      |     |     |          |
| isSaturatedFat       | boolean |       |      |     |     |          |
| isGreenMark          | boolean |       |      |     |     |          |
| isSupervised         | boolean |       |      |     |     |          |
| content              | string  |       |      | 2   | 256 |          |
| manufacturingCountry | string  |       |      | 2   | 256 |          |
| inventory            | number  |       |      |     |     | required |

- You will need to provide a token to get an response from this api
- You will need to be an admin type user to get an response from this api

#### API for deleting a product

```http
  DELETE /api/products/delete-product
```

- You will need to provide the product barcode to get an response from this api
- You will need to provide a token to get an response from this api
- You must be an admin user in order to delete the product

#### API for updating a product inventory

```http
  PATCH /api/products/update_inventory/barcode/newInventory
```

- You will need to provide the product barcode and the new inventory quantity to get an response from this api
- You will need to provide a token to get an response from this api
- You must be an admin user in order to update a product inventory

#### API for updating a product price

```http
  PATCH /api/products/update_price/barcode/newPrice
```

- You will need to provide the product barcode and the new price to get an response from this api
- You will need to provide a token to get an response from this api
- You must be an admin user in order to update a product price

### Cart API

#### API for adding to cart

```http
  PATCH /api/cart/addToCart/:userId/:barcode/:amount
```

- You will need to provide the user id, the product barcode and the quantity of the product to add to the cart and to get an response from this api
- You will need to provide a token to get an response from this api
- You must be a logged in user in order to add a product to cart

#### API for removing product from cart

```http
  PATCH /api/cart/removeFromCart/:userId/:barcode/:amount
```

- You will need to provide the user id, the product barcode and the quantity of the product to remove from the cart and to get an response from this api
- You will need to provide a token to get an response from this api
- You must be a logged in user in order to remove a product from cart

#### API for adding a comment on a product in the cart

```http
  PATCH /api/cart/addNote/:userId/:barcode
```

- You will need to provide the user id and the product barcode for adding a comment on a product in the cart and to get an response from this api
- You will need to provide a token to get an response from this api
- You must be a logged in user in order to add a comment on a product in the cart

#### API for getting the user's cart

```http
  GET /api/cart/:userId
```

- You will need to provide the user id in order to get the user's cart and to get an response from this api
- You will need to provide a token to get an response from this api
- You must be a logged in user in order to get the user's cart

#### API for getting out of stock products

```http
  GET /api/cart/out_of_stock/:userId
```

- You will need to provide the user id in order to get the out of stock products and to get an response from this api
- You will need to provide a token to get an response from this api
- You must be a logged in user in order to get out of stock products

### Email API

#### API for email payment details

```http
  POST /api/api/v1.0/email/send
```

- You will need to provide the current date, the user's name, the user's email, the credit card holder's name, the card number, the card expiration date, the card CVV, the card holder's ID, the cart and the order number in order to get an response from this api (When the user checks out, an email with the order details is sent to both the customer and the business owner)
- You must be a logged in user in order to send the payment email

#### API for sending an email for reset the password

```http
  POST /api/api/v1.0/email/send
```

- You will need to provide the user's name, the user's email, the expiration time of the reset token and the reset token to reset the password and to get an response from this api (When the user clicks on the "Forgot password" button he is taken to a page where he will enter his email address and an email will be sent to him to reset his password)
- You must be a logged in user in order to send the reset password email

#### API for sending an order details email to client

```http
  POST /api/api/v1.0/email/send
```

- You will need to provide the current date, the user's name, the user's email, the user's cart and the order number to get an response from this api (When the user checks out, an email with the order details is sent to both the customer and the business owner)
- You must be a logged in user in order to send the order details email

### Categories API

#### API to get all categories for the category navbar

```http
  GET /api/categories
```

#### API to get all category codes

```http
  GET /api/categories/:categoryCode
```

- You will need to provide the category code to get an response from this api
- In order to see on the breadcrumbs the name of the category instead of the code of the category (a number), it translate the code (the number) is to a string
