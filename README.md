# ChronoKeep

This repository represents a React project by Aylin Oymak and Gero Stöwe (4th semester) for the "Webprogrammierung" course by Florian Bendschuß.

With ChronoKeep you can save text, images or videos with a date.
After some time the content will be visible again.
User can write a message or taking a picture for the future self and getting them via e-mail after a certain time back.

# Features

ChronoKeep allows users to create digital time capsules that can contain text, images, or videos. These capsules are encrypted and scheduled for release at a future date, providing a unique way to preserve memories and messages.
• Time Capsules: Store messages securely, with the ability to add text, and images.

• Edit the Capsule: Change the details of the saved Capsule.
• Scheduled Release: Set a specific release date to reveal the capsule content.
• Privacy & Security: Your data is encrypted to ensure privacy.

# Total Pages

- Landing Page
- Sign up
- Sign in
- Dashboard
- Add Time Capsule
- Edit Time Capsule
- Archive
- About Us
- Profile

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
