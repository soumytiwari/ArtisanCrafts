# ArtisanCrafts: Custom Product Ordering Platform

## Motive
To create an app or website for customized product ordering. Customers can choose products and describe their customization needs, which are then processed by the admin team and shipped to the customers with status updates.

# Introduction
This project aims to build a platform where users can order customized products, and administrators can manage these orders efficiently. The platform will include a user-friendly interface, secure backend, and a robust database to store and manage user and order data.

## Project Overview

ArtisanCrafts is a platform for ordering customized products. Customers can choose a product, personalize it with various options (colors, sizes, engravings, etc.), and place an order.  The ArtisanCrafts team will then process the order, create the customized product, and ship it to the customer, providing updates along the way.


## Key Features

- **User Authentication**: Sign up, login, and profile management.
- **Product Catalog**: Browse through customizable product categories.
- **Customization Interface**: Tools for users to design or describe their customizations.
- **Order Placement**: Secure payment gateway integration.
- **Order Management**: Backend for managing orders, including status updates.
- **Notification System**: Email and in-app notifications for order updates.
- **Admin Dashboard**: Interface for viewing and processing orders.


## Getting Started (for Contributors)

This project is currently in its early stages.  The core functionality still needs to be implemented.  We're looking for contributors to help build out the frontend, backend, and database integration.  The existing files provide a basic structure, but significant development is required.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Stripe and SendGrid API keys

### Installation

**(Important!)** The existing `.js` files in the `client`, `server`, and `api` folders are primarily placeholders.  You are encouraged to restructure, refactor, or replace them as needed while implementing the application's functionality.

1. Clone the repository:
git clone https://github.com/soumytiwari/ArtisanCrafts.git
cd ArtisanCrafts

2. Install dependencies: Not needed yet. You will have to modify the whole project to make it work.
` npm install`

3. Set up environment variables:
* Create a .env file in the root directory with the following variables:
PORT=3000
DB_URI=mongodb://localhost:27017/yourdbname
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
SENDGRID_API_KEY=your_sendgrid_api_key

4. Initialize the database:
* No explicit migrations needed for MongoDB. Ensure the MongoDB service is running.

5. Start the development servers:
* Backend:
cd backend
npm run dev
* Frontend:
cd frontend
npm start



## Contribution Guidelines

We welcome contributions! Here are some areas to contribute:

*   **Frontend Development (React.js):**  Build the user interface, implement interactive customization features, and integrate with the backend API.
*   **Backend Development (Node.js & Express.js):**  Create RESTful API endpoints, implement business logic, integrate with the database and payment gateway.
*   **Database Design and Integration (PostgreSQL):** Design and implement the database schema, write database queries, and integrate with the backend.
*   **Testing:** Write unit, integration, and end-to-end tests.
*   **Documentation:** Improve the README, add API documentation, and write user guides.


**(See the "Tasks and Issues" section for specific tasks.)**



## Tech Stack

- **Frontend**: React.js for a dynamic user interface.
- **Backend**: Node.js with Express.js for API endpoints.
- **Database**: MongoDB for storing user and order data.
- **Payment Gateway**: Stripe for secure payments.
- **Notification Service**: SendGrid for email notifications.
- **Hosting**: AWS, Netlify, Heroku, or DigitalOcean for deploying the application.



## Database Schema (Suggestion - Adapt as needed)

### Users Collection
- `id` (Primary Key, ObjectId)
- `username` (String)
- `email` (String, Unique)
- `password_hash` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Products Collection
- `id` (Primary Key, ObjectId)
- `name` (String)
- `description` (Text)
- `price` (Decimal)
- `category` (String)
- `image_url` (String)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### Orders Collection
- `id` (Primary Key, ObjectId)
- `user_id` (Foreign Key to Users, ObjectId)
- `product_id` (Foreign Key to Products, ObjectId)
- `status` (String, e.g., 'pending', 'processing', 'shipped', 'delivered')
- `customization_details` (Text)
- `total_amount` (Decimal)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### OrderUpdates Collection
- `id` (Primary Key, ObjectId)
- `order_id` (Foreign Key to Orders, ObjectId)
- `status` (String)
- `message` (Text)
- `created_at` (Timestamp)


```sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL NOT NULL,
    category VARCHAR(255),
    image_url VARCHAR(255),  -- Or multiple image URLs
    available_options JSONB, -- Store customization options as JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Orders table  (Add more fields as needed)
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(255) NOT NULL, -- e.g., 'pending', 'processing', 'shipped', 'delivered'
    total_amount DECIMAL NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table (To link orders to products and store customization details)
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  customization_details JSONB, -- Store customization details for each item
  price_per_item DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);




-- Order updates table
CREATE TABLE order_updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    status VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```


### API Documentation
(Link to API documentation - to be created)


## Development Roadmap

1. **Set Up the Backend**
   - **User Authentication**: Implement user registration, login, and token-based authentication.
   - **Product Management**: Create endpoints to manage products (CRUD operations).
   - **Order Management**: Create endpoints to handle order creation, status updates, and retrieval.
   - **Payment Integration**: Integrate Stripe for secure payment processing.
   - **Notification System**: Set up SendGrid for email notifications.

2. **Set Up the Frontend**
   - **User Interface**: Design and implement the user interface using React.js.
   - **Product Catalog**: Create components to display and filter products.
   - **Customization Interface**: Develop tools for users to describe their customizations.
   - **Order Placement**: Implement the order placement process, including payment integration.
   - **Notification System**: Show real-time order status updates to users.

3. **Set Up the Database**
   - **Schema Design**: Finalize the database schema and create tables.
   - **Migrations**: Use migration tools to manage database schema changes.
   - **Seeding**: Populate the database with initial data (e.g., products, users).

4. **Admin Dashboard**
   - **Order Management**: Create an interface for admins to view and manage orders.
   - **Search and Filter**: Implement search and filter functionalities for orders.
   - **Detailed Order View**: Provide a detailed view of each order, including customer messages and order updates.

5. **Testing and Deployment**
   - **Unit Testing**: Write unit tests for backend and frontend components.
   - **Integration Testing**: Write integration tests to ensure different parts of the application work together.
   - **End-to-End Testing**: Write end-to-end tests to simulate user interactions.
   - **CI/CD**: Set up CI/CD pipelines for automated testing and deployment.
   - **Deployment**: Deploy the application to a cloud service like AWS, Heroku, or DigitalOcean.

6. **API Documentation**
   - **Create API Documentation**: Document all API endpoints, request/response formats, and error codes using a tool like Swagger or Postman.
   - **Publish Documentation**: Make the API documentation accessible to developers and contributors.



## Development Guidelines

- **Branching Strategy**: Use the GitFlow workflow. Create feature branches from `develop` and merge them back after code review.
- **Commit Messages**: Follow the conventional commits format (e.g., `feat: add user authentication`).
- **Code Style**: Adhere to ESLint and Prettier configurations. Run `npm run lint` and `npm run format` to check and format your code.
- **Testing**: Write tests for new features. Ensure the test coverage is maintained or improved.
- **Documentation**: Update the documentation (README, API docs, etc.) as you add or modify features.
- **Code Reviews**: Participate in code reviews to help maintain code quality and consistency.
- **Issue Tracking**: Use GitHub Issues to track bugs, feature requests, and tasks.
- **Pull Requests**: Submit pull requests for new features and bug fixes. Ensure your code is well-documented and tested.
- **Communication**: Use the project's GitHub Discussions or a dedicated Slack channel for communication.
- **Environment Variables**: Use environment variables for sensitive information like API keys and database credentials.
- **Dependencies**: Keep dependencies up to date and avoid deprecated packages.
- **Security**: Follow best practices for security, including input validation, secure authentication, and data encryption.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


# Contact
For any questions or feedback, please contact [tiwarisoumya111@gmail.com] or open an issue on the GitHub repository.