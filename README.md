# User Dashboard Project

## Overview

The **User Dashboard Project** is a monorepo application built with a clear separation of concerns and follows **Domain-Driven Design (DDD)** principles. It consists of both **frontend** and **backend** components, enabling seamless user and admin management workflows. The frontend is developed using **React**, while the backend is powered by **Node.js** with a **SQLite** database.

## Features

- User and Admin dashboards with tailored experiences.
- User management, including creating, viewing, and editing user profiles.
- Role-based access to dashboard content.
- Deployed and accessible online via **Netlify**.

---

## Frontend Architecture

### Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type safety and better developer experience.
- **Material-UI**: For modern UI components and styling.
- **Redux**: For state management.
- **React Router**: For routing and navigation.
- **React Hook Form**: For form validation and handling.
- **Axios**: For API integration.
- **Netlify**: For deployment and hosting.

### Project Structure

The frontend consists of two separate applications built with React, organized using a **monorepo** approach:

- **Monorepo**: Centralized repository managed with **NX**, containing multiple applications and shared libraries.
  - **app-user**: Frontend application for standard users.
  - **app-admin**: Frontend application for administrators.
  - **shared-ui**: A library of reusable UI components and utilities shared between the apps.

### Key Components

- **Dashboard**: The primary interface for user and admin activities.
- **Login**: Handles user authentication.
- **MainGrid**: Displays user/admin profiles and allows creating new users.
- **MenuContent**: Provides a sidebar menu for navigation.
- **SelectContent**: Dynamically renders role-specific content based on user roles.
- **CreateUser**: Allows administrators to create new users.

### Deployment Configuration

The frontend is deployed on **Netlify**. A single **netlify.toml** file contains configuration for both the `app-user` and `app-admin` applications.

---

## Backend Architecture

### Backend Technologies Used

- **Node.js**: Runtime environment for building the server.
- **Express**: Framework for building APIs.
- **SQLite**: Lightweight database for storing user data.
- **Knex**: SQL query builder for working with SQLite.
- **TypeScript**: Adds type safety and ensures a structured codebase.

### Design Principles

The backend follows **Domain-Driven Design (DDD)** principles, ensuring a modular and maintainable codebase. Key aspects include:

- Separation of concerns with clear boundaries for services, controllers, and models.
- Fully **class-based** architecture for better organization and reusability.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v14 or above)
- **NX** CLI (to manage the monorepo):

  ```bash
  npm install -g nx
  ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/user-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd user-dashboard
   ```

3. Install dependencies using NX:

   ```bash
   nx run-many --target=install
   ```

### Running the Application

1. Start the **backend server**:

   ```bash
   nx serve backend
   ```

2. Start the **frontend applications**:

   ```bash
   nx serve app-user
   nx serve app-admin
   ```

   This will launch both `app-user` and `app-admin` in development mode.

### Deployment

-Admin's dashboard<https://admins-dashboard2.netlify.app/>
-User's dashboard<https://users-dashboard2.netlify.app/>
-API its not deployed yet but you can pull the image from :
docker pull fabio798/fabio798/user-dashboard-api:latest

---

## Project Highlights

- **Monorepo Architecture with NX**: Efficient code reuse and streamlined development.
- **DDD Principles**: Ensures a clean, modular, and scalable backend.
- **Modern Frontend**: Built with React, Material-UI, and TypeScript for a seamless user experience.
- **Deployment Ready**: Configured for quick and reliable deployment on Netlify.

---

---

We welcome contributions and feedback! Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## ERROR SECTION

### ⚠️ Errors Encountered and Solutions

During the development of this project, several challenges arose, each of which provided valuable learning opportunities. Below is a detailed account of the errors encountered and how they were addressed:

### 🛠 Module Not Found Errors

Several critical files were not being resolved correctly due to incorrect file paths:

Error: Can't resolve './server/express.server.js'
Error: Can't resolve './user/application/userService.js'

As well as:

Error: Database connection failed.

Cause:
These errors occurred due to incorrect compilation from ts to js and relative paths in the imports, sqlite path was as well a problem in deployment phase.
Solution:
Verified the file structure and updated all import paths to reflect the correct directory, for sqlite create a volume and with the db inside

### 🔗 Port Binding Issue

Error:
Timed out: Port scan timeout reached, no open ports detected on 0.0.0.0. Detected open ports on localhost -- did you mean to bind one of these to 0.0.0.0?
Cause:
Render was trying to bind to an unavailable or incorrect port.
Solution:
After 2 days of debug i couldn't get a solution to make render work with my nx api project.

### 🔄 Multiple Calls to useFetchAllUsers

Issue:
The useFetchAllUsers hook was being triggered multiple times, leading to unnecessary API requests.
Cause:
React's re-renders were causing the hook to be invoked multiple times.
Solution:
Implemented useEffect with proper dependency arrays and introduced memoization techniques to prevent redundant calls.

### 🚧 CORS Policy Error

Error:
Access to XMLHttpRequest at 'backend url' from origin 'https://admins-dashboard2.netlify.app' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
Cause:
Missing Access-Control-Allow-Origin header in the server's response.
Solution:
Configured the backend to include the appropriate CORS headers, allowing requests from the frontend's origin.

### 🐳 Dockerfile Configuration Issues

Error:
Docker build and runtime issues due to misconfigured Dockerfile.
Cause:
Missing or incorrect instructions in the Dockerfile.
Solution:
Revised the Dockerfile with the following changes:
Specified the correct base image.
Added necessary environment variables.
Fixed the build context and ensured all required files were included.

