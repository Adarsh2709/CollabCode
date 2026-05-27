# CollabCode

Real-Time Collaborative Code Editor built with Spring Boot, WebSockets, MongoDB, and Next.js.

CollabCode enables multiple developers to collaborate inside shared coding rooms with live code synchronization and real-time communication, providing an experience similar to collaborative IDE platforms.

---

## Features

### Real-Time Code Collaboration

- Multiple users can join the same room
- Instant code synchronization using WebSockets
- Live updates across all connected clients

### Live Chat

- Room-based chat system
- Instant message delivery
- Team communication during collaboration

### Room Management

- Create collaboration rooms
- Join existing rooms using Room ID
- Persistent room storage

### Code Persistence

- Latest editor state stored in MongoDB
- Retrieve room contents anytime
- Prevents accidental code loss

### WebSocket Powered

- Low-latency communication
- STOMP messaging support
- Real-time event broadcasting

### Modern Developer Experience

- Monaco Editor integration
- Multi-language support
- VS Code inspired interface
- Responsive UI

---

## Tech Stack

### Backend

- Java 21
- Spring Boot
- Spring WebSocket
- Spring Data MongoDB
- STOMP Protocol
- SockJS

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Monaco Editor
- Framer Motion

### Database

- MongoDB Atlas

### Tools

- Git
- GitHub
- Postman
- IntelliJ IDEA

---

## Project Structure

```text
CollabCode
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── websocket
│   └── config
│
├── frontend
│   ├── app
│   ├── components
│   ├── hooks
│   ├── services
│   ├── lib
│   └── types
│
└── README.md
```

---

## Backend Architecture

```text
Client
   │
   ▼
WebSocket / REST API
   │
   ▼
Spring Controllers
   │
   ▼
Service Layer
   │
   ▼
MongoDB Repository
   │
   ▼
MongoDB Atlas
```

---

## Real-Time Collaboration Flow

```text
User A edits code
      │
      ▼
WebSocket Message
      │
      ▼
Spring Boot Server
      │
      ▼
MongoDB Update
      │
      ▼
Broadcast via STOMP
      │
      ▼
User B / User C receive update instantly
```

---

## REST APIs

### Create Room

```http
POST /rooms
```

### Get All Rooms

```http
GET /rooms
```

### Get Room

```http
GET /rooms/{roomId}
```

### Save Code

```http
PUT /rooms/{roomId}
```

### Delete Room

```http
DELETE /rooms/{roomId}
```

---

## WebSocket Endpoints

### Connect

```text
/ws
```

### Send Code Updates

```text
/app/code
```

### Receive Code Updates

```text
/topic/code/{roomId}
```

### Send Chat Message

```text
/app/chat
```

### Receive Chat Messages

```text
/topic/chat/{roomId}
```

---

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Adarsh2709/CollabCode.git
cd CollabCode
```

### Backend Setup

Configure MongoDB connection:

```properties
spring.data.mongodb.uri=YOUR_MONGODB_URI
```

Run application:

```bash
./gradlew bootRun
```

Backend starts at:

```text
http://localhost:8080
```

### Frontend Setup

```bash
npm install
npm run dev
```

Frontend starts at:

```text
http://localhost:3000
```
