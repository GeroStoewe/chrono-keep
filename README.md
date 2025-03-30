# ⏳ ChronoKeep 

This repository represents a React project by Aylin Oymak and Gero Stöwe (4th semester) for the "Web Programming" course by Florian Bendschuß.

## Table of Contents

1. [Features](#features)
2. [Pages](#pages)
3. [Installation Guidelines](#installation-guidelines)
4. [Tech Stack](#tech-stack)

# 🛠️ Features

ChronoKeep allows users to create digital time capsules that can contain text, and images. These capsules are encrypted and scheduled for release at a future date, providing a unique way to preserve memories and messages.

• **Time Capsules**: Store messages securely, with the ability to add text, and images.

• **Edit the Capsule:** Change the details of the saved Capsule.

• **Unlock the Capsule:** Release the time capsule if its due date is reached.

• **Scheduled Release:** Set a specific release date to reveal the capsule content.

• **Privacy & Security:** Your data is encrypted to ensure privacy.

# 📃 Pages

- **Landing Page:**      The entry point of the app, introducing users to the concept of time capsules with a call-to-action to sign up or log in. **(No communication with Firebase)**
- **Sign up:**           Allows new users to create an account to start storing and managing their time capsules.                                  **(Communication with Firebase)**
- **Sign in:**           Provides existing users access to their time capsules by logging into their account.                                      **(Communication with Firebase)**
- **Forgot Password:**   Users can reset their password with an email link.                                                                        **(Communication with Firebase)**
- **Dashboard:**         Displays an overview of the user’s locked time capsules, with options to create, edit, or unlock them.                    **(Communication with Firebase)**
- **Add Time Capsule:**  A form page where users can create a new time capsule by adding a title, message, image, and a release date.              **(Communication with Firebase)**
- **Edit Time Capsule:** Allows users to modify the details of an existing locked time capsule before its release date.                            **(Communication with Firebase)**
- **Archive:**           Stores all unlocked time capsules, providing users access to their past messages and memories.                            **(Communication with Firebase)**
- **About Us:**          A page including the vision of the app, contact details of its creators, and the version of the web application.          **(No communication with Firebase)**
- **Profile:**           Displays user account details with options to update personal information and include logout option.                      **(Communication with Firebase)**

# ℹ️ Installation Guidelines

1. Install **Visual Studio Code** from Microsoft or **WebStorm** from JetBrains
2. Install the latest version of Node.js: **https://nodejs.org/en**
3. Clone the repo using: **git clone https://github.com/GeroStoewe/chrono-keep.git**
4. Open the new folder
5. Add the **Firebase API Key** inside the **".env" file** (you can find the API key in the attachments of the "Wissenschaftlicher Text").
6. Run this command to install the node_modules: **npm install**
7. Start the application by running: **npm run dev**

# ⚙️ Tech Stack

• **React:** Frontend framework for building interactive UIs (Frontend).

• **Programming Language:** Typescript

• **Tailwind CSS:** Utility-first CSS framework for styling.

• **Firebase:** For secure data storage and user authentication (Backend).

• **Firebase Functions:** For using REST API calls. (Frontend communicating with Backend).
