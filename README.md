# Issue Tracker App

Issue Tracker is a project designed to help teams manage and deploy issues efficiently. using React Nextjs with Mysql database

## Features

- Create, Edit, and Delete issues.
- Define the status of issues (open, in progress or closed).
- Assign issues to developer.
- User authentication and authorization.
- Google OAuth provider for login.
- high quality user experience.

## Technologies Used

- **Next.js with TypeScript**: The full-stack framework for building React applications with TypeScript support.
- **NextAuth**: Authentication library for Next.js applications.
- **OAuth Google Provider**: Enables login using Google accounts.
- **Prisma**: A modern database toolkit for Node.js and TypeScript, used for database operations with MySQL.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```
git clone <repository-url>
cd nextjs-issues-tracker
```

2. Install dependencies:

```
npm install
```

3. Run npx prisma migrate dev to generate your database tables:

```
npx prisma migrate dev
```

4. Run The App On http://localhost:3000/

```
npm run dev
```
