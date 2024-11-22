# TopicTrove_Backend
This is a full-stack web application for creating and managing articles. Users can register, log in, and view personalized article feeds based on their preferences. The platform allows users to interact with articles and manage their profiles.

Features
User Authentication:
Signup with preferences and profile details.
Login with email/phone and password.
Dashboard:
View articles based on preferences.
Like, dislike, and block articles.
Article Management:
Create, edit, and delete articles.
View article statistics (likes/dislikes/blocks).
Profile Management:
Update profile details and preferences.
Change password.
Responsive Design:
Fully responsive UI for seamless access across devices.
Backend:
Language: TypeScript (Node.js)
Framework: Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Utilities: bcrypt, Cloudinary

Below is a README.md file structure for both the frontend (JavaScript) and backend (TypeScript) of your Article Feeds Web Application. The structure outlines the application setup, features, and usage for developers.

Article Feeds Web Application
Table of Contents
Project Overview
Features
Tech Stack
Setup Instructions
Frontend
Backend
Usage
Folder Structure
API Endpoints
License
Features
User Authentication:
Signup with preferences and profile details.
Login with email/phone and password.
Dashboard:
View articles based on preferences.
Like, dislike, and block articles.
Article Management:
Create, edit, and delete articles.
View article statistics (likes/dislikes/blocks).
Profile Management:
Update profile details and preferences.
Change password.
Responsive Design:
Fully responsive UI for seamless access across devices.
Tech Stack
Frontend:
Language: JavaScript (React.js)
Libraries/Tools: Axios, React Router, Bootstrap/Material-UI
Backend:
Language: TypeScript (Node.js)
Framework: Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Utilities: bcrypt, Cloudinary (for image uploads)
Setup Instructions
bash
cd backend
Install dependencies:

bash
npm install
Environment Variables: Create a .env file in the backend directory with the following variables:

env
DB_URLI='your DBURL'
PORT=3200
USER_MAIL="your mail"
PASS= "your password"
REFRESH_TOKEN_SECRET="secretId"
JWT_KEY_SECRET="secretId"
DB_URL=`your DBURL`
Start the server:

bash
npm run dev

