# STS
Support Ticket System
# Ticket Management System

This is a Ticket Management System built using Node.js, Express, and TypeScript. The application allows users to manage tickets with functionalities such as retrieving ticket lists, creating new tickets, updating existing tickets, and generating reports in XLSX format.

## Features

- **GET /tickets**: Retrieve a list of all tickets sorted by deadline in descending order.
- **POST /tickets**: Create a new ticket with details such as status, issue, client, and deadline.
- **PUT /tickets/{id}**: Update an existing ticket by ID.
- **GET /report**: Generate an XLSX report of all tickets with columns: client, issue, and status (color-coded based on ticket status).

## File Structure

my-node-app/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.ts
│
├── tests/
│
├── config/
│
├── public/
│
├── package.json
└── README.md



## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **MongoDB**: Ensure you have MongoDB installed and running, or use a cloud-based MongoDB service.

### Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd my-node-app


npm install
MONGODB_URI=mongodb://localhost:27017/sts
PORT=8000
npm run build
npm start
npm test
