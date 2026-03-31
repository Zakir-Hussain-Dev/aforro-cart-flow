# Aforro Cart Flow Assignment

A high-fidelity React Native implementation of the complete Cart Flow based on the provided Figma design.

## Features

- **Product Listing**: Category-wise products with quantity controls.
- **Product Details**: Detailed view with price, description, and "Add to Cart" logic.
- **Cart Management**: Real-time updates for quantities, totals, and savings.
- **Multi-step Checkout**: Address selection, coupon application, and contextual login handling.
- **Availability Logic**: Visual indicators and checkout blocking for out-of-stock items.

## Tech Stack

- **React Native CLI**: Version 0.84.1
- **TypeScript**: Typed state management and props.
- **Context API**: Native state management (Cart, Address, Auth).
- **React Navigation**: Stack-based navigational flow.
- **Lucide-react-native**: Modern icon library.
- **React Native Reanimated**: For smooth transitions.

## Project Structure

```bash
src/
├── components/   # Reusable UI components (Button, Card, PriceDetails, etc.)
├── context/      # State management stores (Cart, Address, Auth)
├── navigation/   # Navigation configuration and RootNavigator
├── screens/      # Application screens (Home, ProductDetail, Cart, ReviewCart, Login)
└── theme/        # Design system constants (Colors, Typography, Spacing)
```

## State Management Architecture

The project uses the **React Context API** to manage application state globally. Three main contexts are implemented:
1. **CartContext**: Manages the cart items and business logic for price calculations (total, delivery fee, platform fee).
2. **AddressContext**: Mocked address management for the delivery flow.
3. **AuthContext**: Mocked authentication state to control the "Login to Continue" flow in the checkout process.

## Setup Instructions

### Prerequisites
- Node.js (>= 22.11.0)
- React Native environment setup (Android/iOS)
- CocoaPods (for iOS)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. (iOS only) Install pods:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the App
- **Android**:
  ```bash
  npx react-native run-android
  ```
- **iOS**:
  ```bash
  npx react-native run-ios
  ```

## Implementation Approach
1. **Design System**: Established a consistent theme based on the Aforro branding (Green primary).
2. **Contextual Logic**: Built specific contexts to handle complex cart logic, such as automatic delivery fee adjustment based on total amount.
3. **Responsive UI**: Used `react-native-safe-area-context` and Flexbox to ensure the UI looks great on all devices.
4. **Checkout Rules**: Implemented strict rules for checkout (e.g., cannot proceed with out-of-stock items, must login before final payment).
