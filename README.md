# My React Native App

This is a simplified React Native application developed with Expo Go, demonstrating key functionalities for a mobile e-commerce project.

## Features Implemented (Simplified):

*   **Login Screen:** Basic login with simulated authentication.
*   **Home Screen:** Displays a list of products with simulated pagination (1000 products, showing 10 at a time).
*   **Product Detail Screen:** Shows details of a selected product.
*   **Camera Screen:** Allows taking photos using the device camera or picking from the gallery, and simulates image sharing.
*   **Profile Screen:** Displays and allows editing of user profile information.
*   **Notifications Screen:** Demonstrates local notifications.

## How to Run the Application Locally:

1.  **Install Node.js and npm (if you haven't already):**
    Visit [https://nodejs.org/](https://nodejs.org/) and download the recommended version.

2.  **Install Expo CLI globally:**
    Open your terminal or command prompt and run:
    ```bash
    npm install -g expo-cli
    ```

3.  **Navigate to the project directory:**
    ```bash
    cd my-rn-app
    ```

4.  **Install project dependencies:**
    ```bash
    npm install
    ```

5.  **Start the Expo development server:**
    ```bash
    npm start
    ```

    This will open a new tab in your browser with the Expo Dev Tools. You will also see a QR code in your terminal.

6.  **Run on your device:**
    *   **On your physical device:** Download the **Expo Go** app from the App Store (iOS) or Google Play Store (Android). Open the Expo Go app and scan the QR code displayed in your terminal or browser.
    *   **On an Android emulator:** Press `a` in the terminal where `npm start` is running.
    *   **On an iOS simulator (macOS only):** Press `i` in the terminal where `npm start` is running.

    The application should now load on your device or emulator.

## Important Notes:

*   **Simulated Data:** Product data, login authentication, and image sharing are simulated for demonstration purposes.
*   **Camera Permissions:** You will be prompted to grant camera and photo library permissions when you access the Camera screen.
*   **Notifications:** You will be prompted to grant notification permissions when you access the Notifications screen. You can send a test notification from within the app.
*   **API Interaction:** The product list simulates fetching data. For a real API, you would replace the `generateMockProducts` function and `allProducts` array with actual API calls.
*   **Design System:** The application uses `react-native-paper` for Material Design components.

Enjoy exploring the app!

