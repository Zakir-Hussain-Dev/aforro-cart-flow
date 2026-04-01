# Aforro Cart Flow - React Native Assignment

Hi! This repository contains my submission for the Aforro React Native Technical Assignment. My focus was on building a pixel-perfect, performant Cart Flow based strictly on the provided Figma designs. 

Below you'll find the instructions to get this running locally, alongside an explanation of the architectural decisions I made.

## 🚀 Setup Steps

### Prerequisites
- Node.js (>= 22.11.0)
- React Native environment (React Native CLI) set up for Android/iOS
- CocoaPods (if testing on iOS)

### Installation
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone <your-repo-link>
   cd aforro-cart-flow
   ```
2. Install the JavaScript dependencies:
   ```bash
   npm install
   ```
3. Install the native iOS dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```

### Running the Application
To run on an iOS simulator or device:
```bash
npx react-native run-ios
```

To run on an Android emulator or device:
```bash
npx react-native run-android
```

## 🏗️ Architecture & Implementation Approach

I decided to use a **React Native CLI (0.84.1)** setup combined with **TypeScript**. TypeScript was essential here to ensure type safety across the cart objects and predictable component properties.

### State Management
Rather than over-engineering the solution with Redux for a scoped cart flow, I opted for the **React Context API** with `useReducer()`. It provides a clean, native, and scalable way to manage state without adding heavy third-party dependencies.
- **CartContext**: Acts as the single source of truth for the cart. It handles adding/removing items, quantity updates, and houses the core business logic (e.g., calculating live subtotals, applying discounts, parsing out-of-stock cart blocking, and automatically waiving delivery fees if the threshold is met).
- **Auth & Address Contexts**: I created isolated contexts to mock the user authentication state and address selection flows required by the checkout screen.

### Component Structure & UI
- **Atomic/Reusable Components**: The `src/components/` directory holds all modular UI elements (`Button`, `ProductCard`, `CartItem`, etc.). Building composable atoms allowed me to easily configure complex screens like the `ProductDetailScreen` and `ReviewCartScreen` without code duplication.
- **Theming**: All styling is driven by a central `theme/` directory containing the spacing, colors, and typography rules pulled directly from Figma. This ensures that any branding update cascades instantly across the app.
- **Navigation**: Implemented using React Navigation (Native Stack) for fluid, OS-level screen transitions.

### Business Logic
- **No hardcoded totals**: Everything from total savings, payable amounts, to delivery fees is calculated dynamically in the Context state based on the raw product data.
- **Data Mocking**: I used structured dummy static data (`DUMMY_PRODUCTS`) to mimic API payload structures, making it extremely easy to swap out with actual `fetch`/`axios` queries in the future.

Looking forward to discussing the implementation on our call!
