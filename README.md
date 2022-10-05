# Work Experience App (LinkedOut)

## Overview

A simple app built using React.js, TypeScript, and TailwindCSS to view, add, update users' work experiences profile.

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
```
or
```bash
npm install
```

**Run in Development Mode (Site will run in localhost:5173)**
```bash
yarn dev
```
or
```bash
npm run dev
```

**Build**
```bash
yarn build
```
or
```bash
npm run build
```

**Test**
```bash
yarn test
```
or
```bash
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
