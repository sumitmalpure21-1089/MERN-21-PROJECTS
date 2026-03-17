# Task Management Forntend (React + TypeScript)

# React + TypeScript + Vite + Appollo Client

# npm create vite@latest task-management-frontend -- --template react-ts

# npm install

# Install Apollo Client (for GraphQL)

# npm install @apollo/client graphql

- Backend api running on 'http://localhost:3000'

## Quick Start

    ```bash
    # 1. Backend is running first
    # 2. Build and start the frontend
    docker compose up --build
    ```

    The app will be available at **http://localhost:5173**

## Features

- View all tasks with status indicators
- Create new tasks
- Edit task title, description, and status
- Delete tasks
- Filter tasks by status (Pending / In Progress / Completed)
- Search tasks by title
- Click status badges to cycle through statuses

## Tech Stack

- _React 18_ with TypeScript
- _Vite_ for fast development
- _Apollo Client_ for GraphQL
- _CSS_ custom properties for theming

## Without Docker

bash
npm install
npm run dev

## Environment Variables

| Variable     | Default                       | Description              |
| ------------ | ----------------------------- | ------------------------ |
| VITE_API_URL | http://localhost:3000/graphql | Backend GraphQL endpoint |
