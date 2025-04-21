# BankingUI

A modern, responsive frontend application for the RAYBANK banking system. This Angular-based UI provides a comprehensive interface for managing clients and accounts, offering detailed statistics and transaction management.

## Overview

BankingUI is designed to work with the [BankingService](https://github.com/raywo-trainings/BankingService) backend. It provides a complete banking management interface with features for client management, account management, and banking statistics.

## Features

- **Client Management**
  - View list of all clients
  - View detailed client information
  - Add new clients
  - Update existing client information

- **Account Management**
  - View list of all accounts
  - View detailed account information
  - Create new accounts (current and savings accounts)
  - Update account details
  - Close accounts

- **Statistics Dashboard**
  - Overview of key banking metrics
  - Number of clients and accounts
  - Total credit and debit amounts
  - Average balance, credit, and debit statistics

## Technologies Used

- **Angular 19.2.7** - Frontend framework
- **Bootstrap 5.3.5** - UI component library
- **ng-bootstrap 18.0.0** - Angular-specific Bootstrap components
- **FontAwesome** - Icon library
- **RxJS** - Reactive programming library
- **Luxon** - Date/time handling library

## Prerequisites

- Node.js (latest LTS version recommended)
- npm or pnpm package manager
- [BankingService](https://github.com/raywo-trainings/BankingService) backend running locally or accessible via network

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd BankingUI
   ```

2. Install dependencies:
   ```bash
   npm install
   # or if using pnpm
   pnpm install
   ```

3. Configure the backend connection:
   - For development, update `src/environments/environment.development.ts` with your backend URL
   - For production, update `src/environments/environment.ts` with your production backend URL

## Running the Application

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

### Production Build

```bash
ng build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── accounts/           # Account management features
│   ├── clients/            # Client management features
│   ├── common/             # Shared components and utilities
│   ├── entries/            # Transaction entries management
│   ├── styles/             # Global styles
│   ├── app.component.*     # Root component
│   ├── app.config.ts       # App configuration
│   └── app.routes.ts       # Application routes
├── environments/           # Environment configuration
├── assets/                 # Static assets
└── index.html              # Main HTML file
```

## Backend Connection

The application connects to the BankingService backend API. By default, it expects the backend to be running at:

- Development: `http://localhost:8080/api/v2`
- Production: Configure your production URL in `src/environments/environment.ts`

The API provides endpoints for:
- Client management
- Account management (current accounts and savings accounts)
- Transaction entries

## Building and Testing

### Code Scaffolding

```bash
ng generate component component-name
```

### Running Unit Tests

```bash
ng test
```

### Running End-to-End Tests

```bash
ng e2e
```

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [BankingService Backend Repository](https://github.com/raywo-trainings/BankingService)
- [BankingService API specification](https://github.com/raywo-trainings/BankingAPI)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
