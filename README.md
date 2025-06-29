# Smart Health Monitoring System 

A smart health monitoring web application that analyzes:
- Heart Disease
- Diabetes
- Pneumonia (via X-rays)

It uses:
- Encrypted APIs with token-based Authorization
- Machine Learning & Deep Learning models
- Built with Node.js, React, Vite, and Python

## Features
- User-friendly interface
- Secure model prediction endpoints
- Responsive frontend using Tailwind CSS
- Real-time API calls with authorization
- Forgot password feature via email
- Database integration to store user & prediction data

## Tech Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Models: Python (scikit-learn, TensorFlow)
- Database: MongoDB
- Security: JWT, Secret keys + Authorization headers

## Environment Variables
See `.env.example` for required variables.

```bash
## Run Locally

# Install dependencies
npm install

# Frontend (React + Vite)
cd client
npm run dev

# Backend (Node.js + Express)
node app.js
