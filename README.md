CodeMate is a full-stack matchmaking platform designed for developers to connect, collaborate, and build projects together.
The platform uses interest-based matching, secure JWT authentication, personalized feeds, and a clean UI to help developers find the right collaborators.

Built with React, Redux Toolkit, Node.js, Express, MongoDB, Cloudinary, and complete API-level validation.
Features
🔐 Authentication & Security

JWT-based authentication

Token verification middleware

Secure password handling

Protected API routes

Data sanitization + schema validation

👤 User Profiles

Create, update, delete profile

Upload profile photos (Cloudinary)

Add skills, experience level, GitHub/projects

Editable contact details and username

🤝 Developer Matching System

Like / Ignore interactions

Accept / Reject collaboration requests

View received requests

Discover developers based on:

Skills

Tech interests

Experience

Mutual filters

📰 Personalized Developer Feed

Feed shows developers who match user preferences

Filter out ignored or rejected profiles

Smart API to fetch only relevant developers

💬 Chat After Matching

Secure chat unlocks only after match approval

Stores conversation context
(Optional to mention if implemented or planned)

🛠️ Admin-Level Robust Architecture

Clean MVC pattern

Modular controllers & services

Reusable middlewares

Consistent error handling

Fully scalable backend foundation

🏗️ Tech Stack
Frontend

React.js

Redux Toolkit

React Router

Tailwind CSS

Custom Hooks

Debounced actions

Lazy loading

Backend

Node.js

Express.js

JWT Authentication

Mongoose

MongoDB

Cloudinary

Validator / Sanitizer

Tools

Git & GitHub

Postman

Cloudinary

Nodemon

📡 API Endpoints
Auth

POST /signup

POST /login

POST /logout

POST /change/password

Profile

POST /create/profile

GET /my/profile

PATCH /my/profile/:id

DELETE /my/profile/:id

Connections

POST /request/send/like/:userId

POST /request/send/ignore/:id

POST /request/review/accepted/:reqId

POST /request/review/rejected/:reqId

GET /all/connections

GET /req/received

GET /feed
