# Online Doctor Booking Application
 HealthBookingApplication is a full-stack app for healthcare appointment scheduling. Features secure login, role-based access, REST APIs, MySQL integration, and user dashboards for patients and doctors. Built with Spring Boot and React.js for easy, efficient management.

HealthBookingApplication
HealthBookingApplication is a comprehensive, full-stack appointment booking system tailored for healthcare environments. It streamlines the process of scheduling, managing, and tracking medical appointments for both patients and healthcare providers. The application is built using Spring Boot for the backend, leveraging Java’s robustness and security features, and a modern JavaScript framework (such as React.js) for the frontend, ensuring a responsive and user-friendly experience.

Key Features
User Authentication & Authorization: Secure login and registration for patients, doctors, and administrators, with role-based access control. Sensitive endpoints are protected, while specific public APIs (such as /api/auth/**, /api/public/**, /auth/**, /doctors/**) are accessible without authentication.
Appointment Management: Patients can book, view, and cancel appointments. Doctors can manage their schedules and update appointment statuses (e.g., PENDING, CONFIRMED). The system supports real-time status updates and notifications.
RESTful API: Well-structured REST endpoints facilitate seamless communication between the frontend and backend, supporting all CRUD operations for appointments and user management.
Database Integration: Utilizes MySQL for persistent storage, with JPA/Hibernate handling ORM. The database configuration is optimized for reliability, using update for ddl-auto to prevent data loss during application updates.
Data Serialization: Handles JSON serialization for Java 8+ LocalDate and LocalTime types, ensuring accurate date and time representation across the system.
User Dashboards: Distinct dashboards for patients and doctors provide intuitive interfaces for managing appointments, viewing schedules, and tracking appointment history.
Technologies Used
Backend: Spring Boot, Spring Security, JPA/Hibernate, MySQL
Frontend: React.js (or similar)
Other: Maven for dependency management
Getting Started
Clone the repository.
Configure the application.properties file with your MySQL credentials.
Build and run the backend using Maven.
Start the frontend from the v1 directory.
HealthBookingApplication is ideal for clinics, hospitals, or telemedicine providers seeking a secure, scalable, and easy-to-deploy appointment management solution
