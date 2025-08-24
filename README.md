# CodeClash: Full-Stack Deployment Practice

This project is a full-stack application built to practice and understand the process of deploying a modern web application to a production cloud environment.

## Core Objective

The primary goal of this project is not just to build a functional application, but to serve as a hands-on learning exercise for production deployment. The focus is on containerizing the frontend and backend services, deploying them to a cloud provider, and managing them behind a load balancer.

## Tech Stack

*   **Backend:** Python, FastAPI
*   **Frontend:** JavaScript, React (Next.js), Material-UI
*   **Database:** MySQL (as indicated by the `mysql-connector-python` dependency)
*   **API Testing:** Bruno

## Project Structure

-   `/client`: Contains the Next.js frontend application.
-   `/server`: Contains the FastAPI backend application.
-   `/Bruno`: Contains Bruno collections for API endpoint testing.

## Getting Started

### Prerequisites

-   Node.js and npm
-   Python 3.11+ and a package manager (like `pip` or `uv`)
-   A running MySQL instance

---

### Backend Setup (`/server`)

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    (The project is set up with `pyproject.toml`. You can install dependencies using pip)
    ```bash
    pip install -e .
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in the `/server` directory and add the necessary environment variables for database connections and secrets.

5.  **Run the backend server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

---

### Frontend Setup (`/client`)

1.  **Navigate to the client directory:**
    ```bash
    cd client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---

## Deployment Strategy

This section outlines the intended plan for deploying the application, with a specific focus on cloud networking and security.

1.  **Containerization:**
    -   [ ] Create a `Dockerfile` for the FastAPI backend.
    -   [ ] Create a `Dockerfile` for the Next.js frontend.
    -   [ ] Use Docker Compose (`docker-compose.yml`) to orchestrate the services for local development and testing.

2.  **Cloud Infrastructure & Deployment:**
    -   [ ] Push Docker images to a container registry (e.g., Docker Hub, AWS ECR, Google Artifact Registry).
    -   [ ] Deploy the containerized application to a cloud provider (e.g., AWS, Google Cloud, Azure).
    -   [ ] Provision a managed database instance (e.g., AWS RDS, Google Cloud SQL).

3.  **Cloud Networking & Security:**
    -   [ ] Design and implement a Virtual Private Cloud (VPC) to host the application resources.
    -   [ ] Configure **Security Groups** to act as stateful firewalls for the application instances and database.
    -   [ ] Configure **Network Access Control Lists (NACLs)** as a stateless firewall for the subnets.
    -   [ ] Set up a **Load Balancer** to distribute traffic to the containers.
    -   [ ] Ensure secure network communication between the load balancer, the Docker containers, and the database.

4.  **CI/CD (Continuous Integration/Continuous Deployment):**
    -   [ ] Create a CI/CD pipeline (e.g., using GitHub Actions) to automate testing, building, and deploying the application on every push to the main branch.
