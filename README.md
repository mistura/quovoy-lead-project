# My Monorepo Project

This repository contains a full-stack application with:

- **Frontend:** Next.js application located in `/apps/frontend`
- **Backend:** Next.js API application located in `/apps/backend`

## Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <repo-folder>
Install dependencies:

bash
Copy code
npm install
Run the apps:

bash
Copy code
# Frontend
npm run dev --workspace=apps/frontend
# Backend
npm run start:dev --workspace=apps/backend
