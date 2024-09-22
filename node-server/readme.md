# Node Server

## Getting Started

### Prerequisites

- Node.js
- Express
- MongoDB

### Installing

1. Clone the repository
2. Install dependencies
3. Run the server

## Structure

```
node-server/
├── node_modules/
├── src/
│   ├── api/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── common/
│   ├── config/
│   │   ├── aliases.js
│   │   ├── database.js
│   │   ├── env.js
│   │   ├── listen.js
│   │   ├── mailer.js
│   │   ├── middlewares.js
│   │   └── setupRoutes.js
│   ├── data/
│   ├── middlewares/
│   │   ├── asyncHandler.js
│   │   ├── errorHandler.js
│   │   ├── jwtAuthorization.js
│   │   └── resourceHandler.js
│   ├── models/
│   │   ├── mongoose/
│   │   └── index.js
│   ├── templates/
│   │   ├── emails/
│   │   └── whatsapp/
│   ├── utils/
│   │   ├── apiErrors.js
│   │   ├── apiSuccess.js
│   │   ├── checkInteger.js
│   │   ├── emailSend.js
│   │   ├── generateCode.js
│   │   └─ generateHTML.js
│   └── index.js
└── package.json
```