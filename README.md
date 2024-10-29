# HR Tool Application

A full-stack HR management application built with Spring Boot, MongoDB, and React.

## Prerequisites

Before running this application, make sure you have the following installed:
- Java Development Kit (JDK) 22
- Node.js (v14 or higher)
- npm (comes with Node.js)
- MongoDB (v4.4 or higher)
- Maven (v3.6 or higher)

## Project Structure

```
hr-tool/
├── backend/                # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
└── frontend/              # React application
    ├── src/
    ├── package.json
    └── package-lock.json
```

## Backend Setup

1. Clone the repository
```bash
git clone <repository-url>
cd hr-tool/backend
```

2. Configure MongoDB
- Make sure MongoDB is running on port 27017
- The application will automatically create a database named "HRTOOL"

3. Build and run the Spring Boot application
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the frontend directory
```bash
cd ../frontend
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

The frontend application will start on `http://localhost:3000`

## Technology Stack

### Backend
- Spring Boot 3.3.4
- Spring Data MongoDB
- Java 22
- Maven
- Lombok
- Spring Boot Validation

### Frontend
- React 18.3.1
- Material-UI (MUI) 6.1.5
- React Router DOM 6.27.0
- Axios
- Moment.js

## Environment Configuration

### Backend (application.properties)
```properties
spring.application.name=demo
spring.data.mongodb.port=27017
spring.data.mongodb.database=HRTOOL
```

### Frontend
The frontend is configured to use the default development server settings. You can modify the API base URL in your environment configuration if needed.

## Additional Notes

- The backend API will be accessible at `http://localhost:8080`
- The frontend development server includes hot-reloading for development
- Make sure MongoDB is running before starting the backend server
- The application uses Java 22, ensure your JDK version is compatible


For Frontend:

Copy the dependencies section into your package.json
Run npm install


For Backend:

Copy the dependencies into your pom.xml
Run mvn clean install






