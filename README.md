Chatify: Secure Chat Application
Chatify is a secure, end-to-end encrypted (EE2E) chat application focused on protecting user data and privacy. It leverages modern authentication and encryption standards to create a real-time communication platform that prioritizes user privacy and control over their data.

Key Features
End-to-End Encryption (EE2E): Messages are encrypted with AES, ensuring only the intended recipient can decrypt them.
Real-Time Messaging: Built with SignalR for fast and reliable real-time communication.
Minimal Data Retention: No storage of emails or messages on the server, upholding user anonymity and privacy.
Flexible Authentication: Uses Microsoft Identity for secure, customizable credential management.
Tech Stack
Backend: .NET 8 Web API in Clean Architecture
Database: PostgreSQL
Real-Time Communication: SignalR
Containerization: Docker
Requirements
Docker and Docker Compose installed on your machine.
Setup and Run
Clone the repository:

bash
Copy code
git clone <your-repository-url>
cd Chatify
Run the application using Docker Compose:

bash
Copy code
docker-compose up -d --build
Access the services:

Frontend: http://localhost:3000
Backend API: http://localhost:5000
PgAdmin: http://localhost:8080
Login with: admin@admin.com / admin
Environment Variables
The application relies on specific environment variables, especially for database connections. Update the docker-compose.yml if needed.

