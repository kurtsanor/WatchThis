# WatchThis

WatchThis is a movie and TV discovery web app that helps users decide what to watch faster. Users can search titles, browse trending content, explore genres, watch trailers, save favorites, and write reviews in one place.

## Live Links

- **Live App:** [WatchThis](https://watch-this-oi78.vercel.app/)
- **GitHub Repository:** [kurtsanor/WatchThis](https://github.com/kurtsanor/WatchThis)

## Features

- Browse trending movies and TV shows
- Search for movies and TV shows by title
- Filter content by genre
- Watch trailers before deciding what to watch
- Save favorite movies and TV shows
- Write ratings and reviews
- Create an account and log in securely
- Sign in with Google
- Manage your profile and avatar
- Use the app on desktop or mobile

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **External API:** TMDB
- **Authentication:** JWT and Google OAuth
- **File Storage:** Cloudinary or AWS S3

## Getting Started

### Prerequisites

Before running the project locally, make sure you have:

- Node.js 18 or higher
- npm
- A MongoDB connection string
- A TMDB API key
- Google OAuth credentials if you want Google sign-in enabled
- Cloudinary or AWS S3 credentials if you want avatar uploads enable

## Installation & Setup

### Prerequisites

- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** connection (Atlas or self-hosted)
- **TMDB API key** - [Get it here](https://www.themoviedb.org/settings/api)
- **Google OAuth credentials** (for OAuth login)
- **Cloudinary account** (for File Storage) - [Sign up here](https://cloudinary.com/users/register/free)

### Step 1: Clone the Repository

```bash
git clone https://github.com/kurtsanor/WatchThis.git
cd WatchThis
```

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `frontend` folder by copying from `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your backend URL:

```
VITE_BACKEND_URL=http://localhost:3000
```

### Step 4: Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the `backend` folder by copying from `.env.example`:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration:

```
TMDB_API_KEY=your_tmdb_api_key_here
MONGODB_URI=mongodb+srv://<username>:<password>@mycluster.xpmrkwp.mongodb.net/?appName=myCluster
JWT_SECRET_KEY=your_jwt_secret_key_here

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000

STORAGE_PROVIDER= (s3 or cloudinary)

AWS_REGION=your-aws-region
AWS_ACCESS_KEY_ID=your aws access key here
AWS_SECRET_ACCESS_KEY= your aws secret access key here
AWS_S3_BUCKET= your bucket name here
```

#### Environment Variables Guide:

- **TMDB_API_KEY** - Your The Movie Database API key
- **MONGODB_URI** - MongoDB connection string with username and password
- **JWT_SECRET_KEY** - Secret key for JWT token generation
- **GOOGLE_CLIENT_ID** - Google OAuth client ID (for Google login)
- **GOOGLE_CLIENT_SECRET** - Google OAuth client secret (for Google login)
- **CLOUDINARY_CLOUD_NAME** - Cloudinary cloud name (for file storage)
- **CLOUDINARY_API_KEY** - Cloudinary API key (for file storage)
- **CLOUDINARY_API_SECRET** - Cloudinary API secret (for file storage)
- **FRONTEND_URL** - Frontend application URL (default: http://localhost:5173)
- **BACKEND_URL** - Backend application URL (default: http://localhost:3000)

### Step 4: Start the Backend Server

```bash
node src/server.js
```

The backend will be running at `http://localhost:3000`

## Running Both Frontend & Backend

To run the complete application:

1. **Terminal 1** - Start the backend:
   ```bash
   cd backend
   npm install
   node src/server.js
   ```

2. **Terminal 2** - Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
WatchThis/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── services/
│   │   └── middlewares/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├─�� frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── api/
│   │   └── utilities/
│   ├── .env.example
│   ├── package.json
│   ├── index.html
│   └── vite.config.ts
└── README.md
```

## Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `node src/server.js` - Start the server

**Notes**
- Make sure your MongoDB connection string is valid before starting the backend.
- If Google OAuth is not enabled, users can still use normal sign-up and login.
- If avatar upload is not enabled, Cloudinary or AWS S3 settings are not needed.
- Choose only one storage provider when using avatar uploads.

## Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/kurtsanor/WatchThis/issues).
