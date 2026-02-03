## Installation

### 1. Install Node.js

Download and install Node.js (version 18.x or higher recommended) from the [official Node.js website](https://nodejs.org/).

---

### 2. First, open VS Code, then open its terminal and move to the project directory

Open VS Code, then open its integrated terminal (View > Terminal or Ctrl+`):

- **Windows:** VS Code terminal (PowerShell or Git Bash)
- **macOS:** VS Code terminal
- **Linux:** VS Code terminal

Then, run the following commands:

```bash
git clone https://github.com/kurtsanor/Watchthis.git
```

```bash
cd frontend
```

---

## Project Setup

After installing Node.js and moving to the project directory, follow these steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```
   Or, if you use yarn:
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   Or, with yarn:
   ```bash
   yarn dev
   ```

3. **Open the app:**

   Open your browser and go to [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## Backend

The repository now includes a Node/Express backend in the `backend` folder. Below are the setup and run instructions.

### Prerequisites
- Node.js (v16+ recommended)
- npm
- A MongoDB connection (Atlas or self-hosted)
- A TMDB API key (https://www.themoviedb.org/settings/api)

### Install dependencies
From the project root:
```bash
cd backend
npm install
```

### Environment variables
Create a `.env` file in the `backend` folder (the backend root, next to `server.js`) with the following variables:

```
MONGODB_URI=<your-mongodb-connection-string>
TMDB_API_KEY=<your-tmdb-api-key>
```
### Run the backend
From the `backend` folder:

- To run with Node:
```bash
node server.js
```
