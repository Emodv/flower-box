# flower-box - Full Stack E-commerce Platform

This project is a full-stack e-commerce platform built using Next.js, Node.js, MySQL, and TypeScript.

## Features

- **Next.js**: Utilizes Next.js for server-side rendering, routing, and API handling.
- **Node.js**: Backend server is built with Node.js for handling business logic and database operations.
- **MySQL**: Database used for storing product information, user data, and orders.
- **TypeScript**: Entire project is developed using TypeScript for type safety and enhanced developer experience.

## Requirements

- Node.js (version >= 14)
- MySQL database
- npm or yarn package manager

## Installation

1. **Clone Repository**:

   ```bash
   git clone <repository-url>
   cd e-commerce-platform
   ```

2. **Install Dependencies**:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set Up Database**:

   - Create a MySQL database.
   - Copy `.env.example` to `.env` in the `server` directory and update database credentials.

   ```bash
   # In server/.env
   DB_HOST=<your-db-host>
   DB_USER=<your-db-user>
   DB_PASSWORD=<your-db-password>
   DB_NAME=<your-db-name>
   ```

   - Run database migrations to set up tables:

   ```bash
   cd server
   npm run migrate
   ```

4. **Start Development Servers**:

   - Start the backend server (Node.js):

   ```bash
   # From the server directory
   npm run dev
   ```

   - Start the frontend server (Next.js):

   ```bash
   # From the client directory
   npm run dev
   ```

5. **Access the Application**:

   Open your browser and go to `http://localhost:3000` to view the e-commerce platform.

## Usage

- Browse products, add them to cart, and proceed to checkout.
- Create an account to save your profile and manage orders.
- Admin users can manage products, categories, and view order details.

## Directory Structure

- `client/`: Next.js frontend application.
- `server/`: Node.js backend server.
  - `src/`: Contains server-side code.
  - `migrations/`: Database migration scripts.
  - `config/`: Configuration files.
  - `types/`: TypeScript type definitions.

## Contributing

Contributions are welcome! Please feel free to open issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).

---

© 2024 Naveed Ali Rehmani
