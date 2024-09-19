# LMS - Learning Management System

## Introduction

This is a Learning Management System (LMS) designed to provide a seamless educational experience for both students and instructors. The LMS allows course creation, enrollment, content management, and student progress tracking, offering a comprehensive platform for online learning. It also integrates so many payment gateways including paying via crypto currencies. 

## Features

- **Course Management**: Create, update, and delete courses with multimedia support.
- **User Authentication**: Secure registration, login, and role-based access for students and instructors.
- **Progress Tracking**: Track student progress through quizzes and assignments.
- **Real-time Notifications**: In-app notifications for important updates, deadlines, and announcements.
- **Responsive Design**: Mobile-friendly interface for ease of use on all devices.

## Project Structure

The project is divided into two main parts:

### 1. `client-side/`

This folder contains the frontend code of the LMS.

- **Technologies**: Next.js, Tailwind CSS
- **Features**:
  - Server-side rendering for fast, SEO-friendly pages
  - User interface for students and instructors
  - Pages for course enrollment, lectures, and quizzes
  - State management with RTK Query
  - Responsive design for various screen sizes

### 2. `server/`

This folder contains the backend code, providing the API services for the LMS.

- **Technologies**: Node.js, Express.js, MongoDB
- **Features**:
  - User authentication and authorization (JWT-based)
  - Course, quiz, and student progress management
  - API endpoints for managing courses, users, and notifications

## Getting Started

### Prerequisites

Before setting up the LMS locally, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB (local instance or cloud-based, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository_url>
   cd LMS
   ```

2. **Install server dependencies**:
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**:
   ```bash
   cd ../client-side
   npm install
   ```

### Configuration

1. **Server Configuration**:
   
   - Copy the `.env.example` file in the `server/` folder and rename it to `.env`.
   - Provide the necessary environment variables such as MongoDB connection string, JWT secret, etc.

   Example:
   ```bash
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   ```

2. **Client Configuration**:

   If needed, update API URLs or any other environment variables in `client-side/.env`.

### Running the Application

1. **Start the backend server**:
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend client**:
   ```bash
   cd ../client-side
   npm run dev
   ```

3. Open `http://localhost:3000` in your browser to access the LMS.

### Testing

To run tests for the server:

```bash
cd server
npm test
```

To run tests for the client:

```bash
cd ../client-side
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request, and make sure your code follows the established guidelines.

## License

This project is not licensed yet

## Contact

For any queries, feel free to reach out to me.
## Theophilus Uchechukwu - thesoftnode@gmail.com or theo.uche2023@gmail.com

