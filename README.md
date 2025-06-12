# One Percent - React Native Frontend (University Final Year Project)

This repository contains the React Native frontend for *One Percent*, a self-development app built to support habit tracking and reflective journaling, with personalised feebdack powered by a Large Language Model (LLM).

## Features 

- Secure user login and registration
- Journal entry creation with AI-generated feedback
- Prompt selection using embedding-based context
- Habit creation, streak tracking, and completion history
- Local session persistence using AsyncStorage
- Clean and responsive UI built with Expo and React Native

## Technologies Used

- React Native (with Expo)
- JavaScript / TypeScript
- Context API
- AsyncStorage
- Expo Router

## Project Structure

- `app/` – All screens and routing logic
- `contexts/` – Global state management (user, habits, journals)
- `services/` – API service wrappers
- `components/` – Reusable UI components
- `utils/` – Helper functions

## Getting Started

### Prerequisites

- Node.js
- Expo CLI

### Running the App

1. Clone the repository:

```
git clone https://github.com/kailau1/fyp_one_percent
cd fyp_one_percent
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
npx expo start -- --tunnel
```
> Make sure the [Spring Boot backend](https://github.com/kailau1/fyp_one_percent_spring) is running locally and reachable from your device.

The backend will run on your local network ipv4 address:

In windows powershell / temrinal run

```
ipconfig
```

Copy your ipv4 address and paste it into the "BASE_URL" field within one_percent/app.json


4. Scan the QR code with the Expo Go app or open it in an emulator.


## Related Repositories

- [Backend (Spring Boot)](https://github.com/kailau1/fyp_one_percent_spring)
