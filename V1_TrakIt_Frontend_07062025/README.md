# TrakIt Frontend

This project is the frontend for the TrakIt application, a tool designed to help parents and students manage their tutoring schedules and progress. It is built with React, Vite, and TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Cloning the Repository](#cloning-the-repository)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
  - [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Custom Domain Setup (trakit.la)](#custom-domain-setup-trakitla)
  - [Step 1: Configure GitHub Pages](#step-1-configure-github-pages)
  - [Step 2: Configure Namecheap DNS](#step-2-configure-namecheap-dns)

---

## Prerequisites

- **Node.js**: This project requires a recent version of Node.js. If you don't have it installed, download and install it from the official [Node.js website](https://nodejs.org/). It is recommended to install the LTS (Long-Term Support) version.
- **Git**: To clone the repository, you need Git. You can download it from the [Git website](https://git-scm.com/).

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Cloning the Repository

1.  Open your terminal or command prompt.
2.  Navigate to the directory where you want to store the project.
3.  Clone the repository using the following command:

    ```bash
    git clone https://github.com/AryanSarswat/tutor-app-demo.git
    ```

4.  Change into the project directory:
    ```bash
    cd tutor-app-demo/V1_TrakIt_Frontend_07062025
    ```

### Running Locally

1.  **Install Dependencies**: Once inside the project directory, install the necessary project dependencies using npm:
    ```bash
    npm install
    ```
2.  **Start the Development Server**: After the installation is complete, you can start the local development server:
    ```bash
    npm run dev
    ```
    This command will start the Vite development server. You can view the application by navigating to `http://localhost:5173` (or the address shown in your terminal) in your web browser. The server will automatically reload the page as you make changes to the source code.

## Deployment

This project is configured for easy deployment to GitHub Pages.

### Deploying to GitHub Pages

The project uses the `gh-pages` package to handle the deployment.

1.  **Push to GitHub**: Ensure all your latest changes are committed and pushed to the `main` branch on GitHub.
2.  **Run the Deploy Script**: Execute the following command in your terminal:
    ```bash
    npm run deploy
    ```
This script will first run the `npm run build`, which creates a production-ready build of the application in the `dist/` directory. Then, the `deploy` command will push the contents of the `dist/` directory to a special `gh-pages` branch in your repository. GitHub Pages will automatically serve the site from this branch.

After a few moments, your site will be live at `https://<your-github-username>.github.io/<your-repository-name>/`. Based on the `package.json`, for example for my repository it will be `https://AryanSarswat.github.io/tutor-app-demo/`.

## Custom Domain Setup (trakit.la)

To point the deployed GitHub Pages site to your custom domain `trakit.la`, you need to configure both your GitHub repository and your domain registrar (Namecheap).

### Step 1: Configure GitHub Pages

1.  **Navigate to Repository Settings**: In your GitHub repository, go to **Settings** > **Pages**.
2.  **Add Custom Domain**: Under the "Custom domain" section, enter `trakit.la` and click **Save**.
3.  **Enforce HTTPS**: Once the domain is saved and the DNS settings (see below) have propagated, ensure the "Enforce HTTPS" option is checked. This may take some time to become available.

### Step 2: Configure Namecheap DNS

1.  **Log in to Namecheap**: Go to your Namecheap account and navigate to the **Domain List**.
2.  **Manage Domain**: Find `trakit.la` and click the **Manage** button next to it.
3.  **Go to Advanced DNS**: Select the **Advanced DNS** tab.
4.  **Add DNS Records**: You will need to add or modify the records to point to GitHub's servers.

    - **CNAME Record for `www`**:
      - **Type**: `CNAME Record`
      - **Host**: `www`
      - **Value**: `<your-github-username>.github.io` (e.g., `AryanSarswat.github.io`)
      - **TTL**: `Automatic` or `30 min`

    - **A Records for Apex Domain (`@`)**: To direct the root domain (`trakit.la`) to GitHub Pages, you need to create `A` records pointing to GitHub's IP addresses.
      - **Type**: `A Record`
      - **Host**: `@`
      - **Value**: `185.199.108.153`

      Add three more `A` records with the same **Host** (`@`), but with the following **Values**:
      - `185.199.109.153`
      - `185.199.110.153`
      - `185.199.111.153`

5.  **Save Changes**: Save all the changes you've made to the DNS records.

**Important Notes**:
- **Propagation Time**: DNS changes can take anywhere from a few minutes to 48 hours to fully propagate across the internet.
- **GitHub Actions**: If your repository uses GitHub Actions for deployment, the process might be slightly different. Check for a `.github/workflows` directory for any deployment workflow files.
