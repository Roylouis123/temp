
# React CI/CD Pipeline

A simple React application demonstrating CI/CD with GitHub Actions and Firebase Hosting.

## Automatic Deployment

This project is set up to automatically deploy to Firebase Hosting when code is pushed to the `dev` branch on GitHub.

## Setup Instructions

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Set up Firebase Hosting

2. **Generate Firebase Service Account**:
   - Go to Project Settings > Service accounts
   - Generate a new private key
   - Save the JSON file securely

3. **Set Up GitHub Repository**:
   - Push this code to your GitHub repository
   - Create both `main` (production) and `dev` (development) branches

4. **Add GitHub Secrets**:
   - Navigate to your GitHub repository
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `FIREBASE_SERVICE_ACCOUNT`: The entire JSON content of your Firebase service account
     - `FIREBASE_PROJECT_ID`: Your Firebase project ID

5. **Update Firebase Configuration**:
   - Update `.firebaserc` with your Firebase project ID

6. **Deploy Manually First Time**:
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init
   firebase deploy
   ```

7. **Test the CI/CD Pipeline**:
   - Make a change to your code
   - Push to the `dev` branch
   - Watch the GitHub Actions workflow run
   - Verify the deployment on your Firebase Hosting URL

## Workflow

- Push to `dev` branch: Automatic build and deployment to Firebase
- Push to `main` branch: No automatic deployment (add if desired)

## Environment Variables

For local development, create a `.env` file with any environment variables needed.

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- GitHub Actions
- Firebase Hosting
#   t e m p  
 # temp
# temp
