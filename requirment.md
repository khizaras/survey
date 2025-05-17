i want you to Create me an prd for VS CODE github copilot for the below requirments

Requirment:

# Internal Polling Application

The Internal Polling Application enables authenticated users to create, manage, and participate in polls within an organization. The system allows polling with either images or plain text and supports both single and multiple choice voting options. The application will be built using a modern React-based frontend with Ant Design and LESS for styling, a Node.js/Express.js backend, and MySQL for storage.

Goals:

- Provide an intuitive interface for users to create and manage polls.
- Enable image and text-based polls with multiple voting options.
- Allow users to vote and view results in real-time.
- Admins can monitor all polling activity.
- Enforce secure access using SSO-based authentication.

Technology Stack:

- Frontend: React.js, Webpack, Ant Design (AntD), LESS (No TypeScript)
- Backend: Node.js, Express.js
- Database: MySQL
- Authentication: SSO (Single Sign-On)
- Dev Environment: Visual Studio Code with GitHub Copilot
- Deliver an Advanced Modern visually appealing UI using Ant Design with LESS customization.

User Roles:
User:

    -   Create, update, and delete polls.

    -   Add image or text and multiple voting options (radio or checkbox).

    -   Vote on available polls.

    -   View poll results.

    Admin:

    -   Access all polls (active and completed).

    -   View analytics and details of poll responses.

Core Features:

1. Authentication (SSO Integration)
   Users will authenticate via SSO.

Upon login, fetch and store user information (e.g., name, email, department).

2. Poll Creation
   Users can:
   Create a poll with a question and optional image.

Choose between single-choice (radio) or multi-choice (checkbox) options.

Add/remove multiple voting options dynamically.

Set poll expiration date (optional).

3. Voting
   Users can vote on active polls.

Voting rules:

One vote per user (or multiple based on type).

After voting, users can view aggregated results.

4. Poll Management
   Users can:

View, edit, or delete their polls.

See poll status: Active / Completed.

Monitor real-time responses (visual charts).

5. Admin Interface
   Admin dashboard:

List of all active and completed polls.

View number of participants and response breakdown.

Filter and sort polls by date, creator, department, etc.

UI/UX Guidelines
Use Ant Design for all components (Cards, Forms, Tabs, Table, etc.).

Style customization via LESS.

Focus on:

Clean, modern layout.

Mobile responsiveness.

Smooth transitions and tooltips for clarity.

Add Highcharts to show the statitics page

Database Schema (MySQL) - High-Level
Users

id, name, email, department, sso_id

Polls

id, creator_id, question, image_url, type (radio/checkbox), created_at, expires_at, status

Options

id, poll_id, option_text

Votes

id, user_id, poll_id, option_id

API Endpoints (Express.js)
POST /api/polls - Create poll

GET /api/polls - List active polls

GET /api/polls/:id - View poll details

PUT /api/polls/:id - Update poll

DELETE /api/polls/:id - Delete poll

POST /api/polls/:id/vote - Submit vote

GET /api/admin/polls - Admin view of all polls

Note:

- Have 2 directory frontend and backend but keep node module common for both.
- Create server model routes directory inside the backend folder
- create mutiple files (split the components and pages) on the frontend
- Make sure seperate webpack files for production and dev
- have npm run dev script which should run backend and front end concurrently
- add all the required dependices to the package.json

# Product Requirements Document (PRD) for Internal Polling Application

## Overview

The Internal Polling Application enables authenticated users to create, manage, and participate in polls within an organization. The system allows polling with either images or plain text and supports both single and multiple choice voting options. The application will be built using a modern React-based frontend with Ant Design and LESS for styling, a Node.js/Express.js backend, and MySQL for storage.

## Goals

- Provide an intuitive interface for users to create and manage polls.
- Enable image and text-based polls with multiple voting options.
- Allow users to vote and view results in real-time.
- Admins can monitor all polling activity.
- Enforce secure access using SSO-based authentication.

## Technology Stack

- **Frontend**: React.js, Webpack, Ant Design (AntD), LESS (No TypeScript)
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: SSO (Single Sign-On)
- **UI Framework**: Ant Design with LESS customization
- **Dev Environment**: Visual Studio Code with GitHub Copilot

## User Roles

### User

- Create, update, and delete polls.
- Add image or text and multiple voting options (radio or checkbox).
- Vote on available polls.
- View poll results.

### Admin

- Access all polls (active and completed).
- View analytics and details of poll responses.

## Core Features

### 1. Authentication (SSO Integration)

Users will authenticate via SSO. Upon login, fetch and store user information (e.g., name, email, department).

### 2. Poll Creation

Users can:

- Create a poll with a question and optional image.
- Choose between single-choice (radio) or multi-choice (checkbox) options.
- Add/remove multiple voting options dynamically.
- Set poll expiration date (optional).

### 3. Voting

Users can vote on active polls. Voting rules:

- One vote per user (or multiple based on type).
- After voting, users can view aggregated results.

### 4. Poll Management

Users can:

- View, edit, or delete their polls.
- See poll status: Active / Completed.
- Monitor real-time responses (visual charts).

### 5. Admin Interface

Admin dashboard:

- List of all active and completed polls.
- View number of participants and response breakdown.
- Filter and sort polls by date, creator, department, etc.

## UI/UX Guidelines

- Use Ant Design for all components (Cards, Forms, Tabs, Table, Charts, Drag and Drop, Timeline, etc.).
- Split the components and pages into multiple files for better organization.
- Style customization via LESS.
- Focus on:
  - Clean, modern layout.
  - Mobile responsiveness.
  - Smooth transitions and tooltips for clarity.
- Add Highcharts to show the statistics page.

## Database Schema (MySQL) - High-Level

### Users

- `id`: INT, Primary Key
- `name`: VARCHAR
- `email`: VARCHAR, Unique
- `department`: VARCHAR
- `sso_id`: VARCHAR, Unique

### Polls

- `id`: INT, Primary Key
- `creator_id`: INT, Foreign Key (Users)
- `question`: VARCHAR
- `image_url`: VARCHAR, Optional
- `type`: ENUM('radio', 'checkbox')
- `created_at`: TIMESTAMP
- `expires_at`: TIMESTAMP, Optional
- `status`: ENUM('active', 'completed')

### Options

- `id`: INT, Primary Key
- `poll_id`: INT, Foreign Key (Polls)
- `option_text`: VARCHAR

### Votes

- `id`: INT, Primary Key
- `user_id`: INT, Foreign Key (Users)
- `poll_id`: INT, Foreign Key (Polls)
- `option_id`: INT, Foreign Key (Options)

## API Endpoints (Express.js)

### Polls

- `POST /api/polls`: Create poll
- `GET /api/polls`: List active polls
- `GET /api/polls/:id`: View poll details
- `PUT /api/polls/:id`: Update poll
- `DELETE /api/polls/:id`: Delete poll
- `POST /api/polls/:id/vote`: Submit vote
- `GET /api/admin/polls`: Admin view of all polls

## Project Structure

```
project-root/
├── frontend/
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   ├── pages/               # Page components
│   │   ├── styles/              # LESS files
│   │   ├── utils/               # Utility functions
│   │   └── App.js               # Main application component
│   ├── public/                  # Static files
├── backend/
│   ├── src/
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── controllers/           # Business logic
│   ├── middleware/            # Middleware functions
│   ├── config/                # Configuration files
├── node_modules/              # Common node modules
├── package.json               # Root package.json for scripts
├── webpack.dev.js            # Development Webpack configuration
├── webpack.prod.js           # Production Webpack configuration
└── README.md                  # Project documentation
```

## Development Environment

- **Frontend**: React.js, Ant Design, LESS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: SSO (Single Sign-On)
- **Dev Tools**: Visual Studio Code, Postman, MySQL Workbench

## Scripts

- `npm run dev`: Runs both frontend and backend concurrently in development mode.
- `npm run build`: Builds the frontend for production.
- `npm run start`: Starts the backend server in production mode.

## Dependencies

### Accross both Frontend and Backend

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "mysql2": "^2.3.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "body-parser": "^1.19.0",
    "jsonwebtoken": "^8.5.1",
    "axios": "^0.21.1",
    "highcharts": "^8.2.2",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^5.2.0",
    "antd": "^4.16.13",
    "less": "^4.1.1",
    "less-loader": "^8.0.0"
  },
  "devDependencies": {
    "webpack-dev-server": "^3.11.2",
    "nodemon": "^2.0.4",
    "webpack": "^5.11.0",
    "webpack-cli": "^4.3.0",
    "babel-loader": "^8.1.0",
    "concurrently": "^5.3.0"
  }
}
```

## Notes

- Make sure the code is not written in TypeScript, as per the requirements.
- Make sure the features implemented at advanced level, do not implement at the high level. make sure to use advanced features of React and Ant Design.
- Ensure that the project is modular and maintainable by splitting components and pages into separate files.
- Use LESS for styling to allow for easy customization and theming.
- Implement SSO authentication to ensure secure access to the application.
- Use GitHub Copilot in Visual Studio Code to assist with code generation and suggestions.
- Maintain a clean and modern UI using Ant Design components.
- Ensure that the application is mobile-responsive and provides a smooth user experience.
- Implement real-time updates for poll results using WebSockets or similar technology if needed.
- Ensure that the application is well-documented, including API endpoints and database schema.
- Follow best practices for security, especially regarding user authentication and data handling.
- Implement error handling and logging for both frontend and backend.
- Ensure that the application is tested thoroughly, including unit tests for components and integration tests for API endpoints.
- Consider accessibility standards to ensure the application is usable by all users, including those with disabilities.
- Use version control (Git) to manage code changes and collaborate with team members.
