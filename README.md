# Scentinel - A code smell detector and refactoring tool for TypeScript files

This project is an Angular application that serves as a Code Smell Detector and Refactoring Tool. It allows users to upload a single TypeScript file, analyzes the code for code smells, and offers refactoring options if duplicate code is detected.

## Deployment

This project is deployed on Azure. You can access the deployed version at https://icy-bay-0b3a26d10.5.azurestaticapps.net/.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/sharonleo-su/code-smell-detector.git
   ```

2. Navigate to the project directory:

   ```bash
   cd code-smell-detector
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Navigate to the Angular project directory:

   ```bash
   cd code-smell-detector
   ```

5. Start the Angular development server:

   ```bash
   ng serve
   ```

6. Open your browser and navigate to `http://localhost:4200` to access the application.

## Features

### User Interface

The application provides a user-friendly graphical user interface (GUI) for users to upload a single file and perform code smell detection and refactoring operations.

### Code Smell Detection

1. **Long Method/Function Detection:** Detects methods or functions with 16 or more lines of code, excluding blank lines.
2. **Long Parameter List Detection:** Identifies methods or functions with 4 or more parameters.
3. **Duplicated Code Detection:** Utilizes Jaccard Similarity to identify duplicated code fragments with a threshold of 0.75.

### Code Smell Refactoring

If duplicated code is detected, the tool prompts users to refactor the code, providing options to produce a file with refactored code upon user request.

## Operation Flow

1. Start the program and generate the GUI.
2. Users upload a single file through the GUI.
3. The tool analyzes the code for code smells and prompts users if any code smells exist.
4. If duplicated code exists, users are prompted to refactor the code. The tool produces a file with refactored code upon user request.
5. Users can close the program through the GUI.

## Notes

1. The tool does not consider anonymous functions (such as Lambda functions).
2. Duplicated code detection focuses on function levels, comparing different functions rather than code within a specific function.
