# Work Experience App (LinkedOut)

## Overview

LinkedOut is a simple fictional app that mimics LinkedIn functionalities, built using React.js, TypeScript, and TailwindCSS to view, add, update users' work experiences profile.

## Functionalities

- Users could add a new profile.
    Required fields:
    - First name 
    - Last name 
    - Birth date 
    Optional fields:
    - Profile image 
    - Brief description
- Users could view their profile details with their past and current work experience.
- Experience are empty by default and users can add a new experience. 
    Required fields:
    - Job title
    - Company name 
    - Start date 
    - End date.
    Optional fields:
    - Job description
    - Company logo 
   User can also select the experience as their current job.
- Users could update and delete their job experience.

## Technologies
* [TypeScript](https://www.typescriptlang.org/)
* [React.js](https://reactjs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Redux Toolkit](https://redux-toolkit.js.org/)
* [React Hook Form](https://react-hook-form.com/)
* [Vite](https://vitejs.dev/)

## State Management
For state management, I use Redux Toolkit that provides out of the box Redux setup to manage global state of the app. Each features' state and reducers are managed by slices which is one of the main features of Redux Toolkit.

## Usage

**Install packages**
```bash
yarn

// or

npm install
```

**Run in Development Mode (Site will run in localhost:5173)**
```bash
yarn dev

// or

npm run dev
```

**Build**
```bash
yarn build

// or

npm run build
```

**Test**
```bash
yarn test

// or

npm run test
```

## Directory Structure
Using features-based directory structure. Features-based directories separate specific features related components from generic UI components.

```
.
├── public/ React.js public dir, used for storing static assets.
└── src/
    ├── api
    ├── components contains global components like layout
    ├── features/ contains every features on the app
    │   ├── experiences/
    |   |   ├── api
    │   │   ├── components
    │   │   ├── helpers
    │   │   └── constants.ts
    │   │   
    │   └── users/
    │       ├── components
    │       ├── slices
    |       ├── helpers
    │       └── constants.ts
    ├── helpers 
    ├── hooks contains global hooks
    ├── store.ts
    ├── App.tsx
    ├── index.ts
    └── index.css
```

## Things to Improve
There are several things that I want to improve if I have more time to work on this project
- Add authentication and authorization.
  - Allow users to login by their email and password and only have access to their profile.
- Add more user fields, like email, phone, skills
- Add company profile as a new entity.
- Add more tests coverage.
- Create more reusable UI components using Tailwind.
  - Tailwind is great; however, it bloats the JSX code with classnames. 
    It would be great that we can create custom reusable components using Tailwind classnames.
