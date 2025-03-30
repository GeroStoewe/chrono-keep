# ChronoKeep

This repository represents a React project by Aylin Oymak and Gero Stöwe (4th semester) for the "Web Programming" course by Florian Bendschuß.

## Table of Contents

1. [Features](#features)
2. [Pages](#pages)
3. [Installation Guidelines](#installation-guidelines)
4. [Tech Stack](#tech-stack)

# Features

ChronoKeep allows users to create digital time capsules that can contain text, and images. These capsules are encrypted and scheduled for release at a future date, providing a unique way to preserve memories and messages.

• Time Capsules: Store messages securely, with the ability to add text, and images.

• Edit the Capsule: Change the details of the saved Capsule.

• Unlock the Capsule: Release the time capsule if its due date is reached.

• Scheduled Release: Set a specific release date to reveal the capsule content.

• Privacy & Security: Your data is encrypted to ensure privacy.

# Pages

- Landing Page: The entry point of the app, introducing users to the concept of time capsules with a call-to-action to sign up or log in.
- Sign up: Allows new users to create an account to start storing and managing their time capsules.
- Sign in: Provides existing users access to their time capsules by logging into their account.
- Dashboard: Displays an overview of the user’s locked time capsules, with options to create, edit, or unlock them.
- Add Time Capsule: A form page where users can create a new time capsule by adding a title, message, image, and a release date.
- Edit Time Capsule: Allows users to modify the details of an existing locked time capsule before its release date.
- Archive: Stores all unlocked time capsules, providing users access to their past messages and memories.
- About Us: A page including the vision of the app, contact details of its creators, and the version of the web application.
- Profile: Displays user account details with options to update personal information and include logout option.

# Installation Guidelines

1.
2.
3.
4.

# Tech Stack

• React: Frontend framework for building interactive UIs.

• Programming language: Typescript

• Tailwind CSS: Utility-first CSS framework for styling.

• Firebase: For secure data storage and user authentication.

• Video Background: Parallax video effect created using custom React components.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname
    }
  }
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules
  }
});
```
