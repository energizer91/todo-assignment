# Todo App Microservice Architecture

This is a **microservice-based task management (ToDo) application** built with **Node.js** and **NestJS** for backend services, **Create React App (CRA)** for the frontend, and **MongoDB** for data storage. The application follows cloud-native principles and is designed for deployment on **Kubernetes** with horizontal scalability.

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Overview](#architecture-overview)
- [Services](#services)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
- [Deployment](#deployment)
    - [Docker](#docker)
    - [Kubernetes](#kubernetes)
- [Usage](#usage)
- [Scaling and Monitoring](#scaling-and-monitoring)
- [Troubleshooting](#troubleshooting)

## Project Overview

The goal of this assignment was to create a **microservice-based application** that is:

- Deployable using **Kubernetes**.
- Consists of at least two different types of microservices and a database.
- Uses **REST API** for communication between services.
- Horizontally scalable, with each microservice independently scalable.
- Accessible from "the outside" (e.g., via a web browser).
- Uses **persistent storage** for the database.

The application consists of multiple services, including user management, task management, and an API gateway that routes all external requests.

## Architecture Overview

The application is divided into several **microservices**:

1. **User Service**: Manages user registration, authentication (via JWT in cookies), and profile data.
2. **Task Service**: Handles creation, retrieval, updating, and deletion of tasks. Each task is tied to a user for authentication and authorization.
3. **Frontend**: A React application that provides a user interface for interacting with the services.
4. **API Gateway**: Routes requests to appropriate backend services, controls access, and ensures secure communication.
5. **MongoDB Database**: A separate microservice using MongoDB to store user and task data, with persistent storage enabled.

All services are designed to be **independently deployable** and **horizontally scalable**.

### High-Level Architecture Diagram

*(Insert diagram here - e.g., an image showing how the services interact, their connections, etc.)*

## Services

- **User Service**: Handles user authentication and user data.
- **Task Service**: Manages task CRUD operations for users.
- **API Gateway**: Central entry point for routing and managing API requests.
- **Frontend**: User interface for managing tasks and interacting with the backend.
- **MongoDB**: Provides data persistence for users and tasks.

## Getting Started

### Prerequisites

- **Node.js** (v18.18.0 or higher)
- **Docker** and **Docker Compose**
- **Kubernetes** (Minikube, Docker Desktop, or any other local Kubernetes setup)
- **kubectl** and **Helm** for managing Kubernetes deployments
- **k6** for load testing (optional)

### Installation

1. **Clone the project**:

    ```
    git clone https://github.com/energizer91/todo-assignment.git
    cd todo-assignment
    ```

2. **Set up environment variables**:

- Create an `.env` file in each service folder and add the necessary environment variables.
- Example for `user-service/.env`:

  ```env
  JWT_SECRET=[your_jwt_secret_here]
  MONGO_URI=mongodb://mongodb:27017/todo-app
  ```

3. **Build Docker images** for each service:
    ```sh
    docker-compose build
    ````

## Deployment

### Docker

To run the services locally using **Docker Compose**:

```sh
docker-compose up
```

This command will start all services defined in `docker-compose.yml`. You can access the frontend via [http://localhost:8081](http://localhost:8081).

### Kubernetes

1. **Create Kubernetes Secrets** for sensitive information like `JWT_SECRET`:

   ```sh
   kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=[your_jwt_secret_here]
   ```

2. **Apply Kubernetes manifests** to deploy the services:

   ```sh
   kubectl apply -f k8s/
   ```

3. **Verify the deployment**:

   ```sh
   kubectl get pods
   kubectl get services
   ```

## Usage

- **Frontend**: Interact with the app by going to [http://localhost:30081](http://localhost:30081), where you can register, log in, create, update, or delete tasks.
- **API**: You can also interact via REST API directly using tools like **Postman**. You can use Postman collection which is in repository. Set up `USER_SERVICE_URL` and `TASK_SERVICE_URL` environments to use the provided Postman collection.

## Scaling and Monitoring

- **Load Testing**: A **k6** load testing script is included in k6/load_test.js. To run the load test:
    ```sh
    k6 run k6/load_test.js
    ```
    Ensure that you set up USER_SERVICE_URL and TASK_SERVICE_URL in the environment to point to the correct services.
- **Horizontal Pod Autoscaler (HPA)**: Configured to automatically scale user-service, task-service, and frontend-service based on CPU utilization.
- **HPA Setup** (YAML files can be found in the `k8s/autoscalers` directory).
  ```sh
  kubectl apply -f k8s/autoscalers/
  ```
- **Monitoring**: Use `kubectl top pods` to view resource usage. Optionally, integrate **Prometheus** and **Grafana** for better observability.

## Troubleshooting

- **Pods Restarting or Crashing**: Check logs to understand why a pod is restarting.
  ```sh
  kubectl logs <pod_name>
  ```
- **Cannot Access Services**: Ensure all services are properly connected through the API Gateway.
- **HPA Not Scaling**: Verify the metrics-server is running properly and `kubectl top pods` returns metrics.

## Additional Questions

### Software Application Idea
The Todo App is a microservice-based task management application where users can register, log in, and manage their tasks. Each task is associated with a user, ensuring secure access and management.

### The Architecture Design Decisions in Your Application
The application is designed using a microservice architecture to achieve independent scalability, ease of maintenance, and better isolation of different business concerns. The use of an API Gateway helps manage all incoming requests and route them securely to the appropriate services. Kubernetes is used for deployment, ensuring easy scalability and resilience.

### The Business Implications of These Architecture Decisions
- **Scalability**: Each microservice can be scaled independently, which means the system can handle increased load by scaling only the necessary parts.
- **Maintainability**: Changes can be implemented independently in each microservice, making the development process more efficient.
- **Resilience**: If one service fails, others can continue to operate, enhancing system reliability.

### Interaction Between Different Microservices
- **User Service**: Handles user authentication and management. Issues a JWT for authenticated users.
- **Task Service**: Requires a valid JWT from the User Service to allow users to create, update, or delete tasks.
- **API Gateway**: Routes requests from users to either the User Service or Task Service, ensuring proper authentication and load balancing.

### Details of Deployment
The deployment uses Kubernetes to manage microservices. Each service is packaged as a Docker container, pushed to Docker Hub, and then deployed to a Kubernetes cluster. Secrets like `JWT_SECRET` are stored using Kubernetes Secrets, and services are exposed via the API Gateway for external access.

### Security Issues Identified and/or Mitigated
- **Authentication and Authorization**: JWT is used for authenticating users, with tokens stored in cookies to protect against cross-site request forgery (CSRF).
- **API Gateway Security**: The API Gateway verifies JWTs before routing requests, adding a layer of protection.
- **Environment Secrets**: Sensitive data, such as `JWT_SECRET`, is managed using Kubernetes Secrets to prevent exposure.

## Contact

- **Alexander Bareyko**: [alexander.bareyko@gmail.com]

