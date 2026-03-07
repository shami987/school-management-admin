# School Management System - Admin Backend

Admin backend API for managing school operations, verifying users, and overseeing all school activities.

## Features

- **Device Verification** - Approve/reject parent device registrations
- **Student Management** - Create, update, delete students
- **Teacher Management** - Create and manage teacher accounts
- **Class Management** - Create classes and assign teachers
- **Grade Management** - Create/update student grades
- **Attendance Management** - Mark and track attendance
- **Refund Management** - Approve/reject refund requests
- **Dashboard** - View statistics and analytics

## Tech Stack

- Node.js + Express.js
- PostgreSQL + Prisma ORM (shared with client backend)
- JWT authentication
- Helmet for security
- Express Rate Limit
- Express Validator

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- Client backend must be set up first (shares database)

## Installation

1. **Install dependencies**
```bash
cd admin-backend
npm install
```

2. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
PORT=3002
DATABASE_URL="postgresql://postgres:123456@localhost:5432/school_management?schema=public"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

3. **Generate Prisma client**
```bash
npx prisma generate
```

4. **Start the server**
```bash
npm run dev
```

Server runs on `http://localhost:3002`

## API Endpoints

### Authentication

#### Admin Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@school.com",
  "password": "Admin@123",
  "deviceId": "admin-test-device"
}
```

### Device Management

#### Get Pending Devices
```http
GET /api/devices/pending
Authorization: Bearer <admin-token>
```

#### Verify Device
```http
PUT /api/devices/:deviceId/verify
Authorization: Bearer <admin-token>
```

#### Reject Device
```http
PUT /api/devices/:deviceId/reject
Authorization: Bearer <admin-token>
```

### Student Management

#### Create Student
```http
POST /api/students
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "2010-05-15",
  "parentId": "parent-profile-uuid",
  "classId": "class-uuid",
  "initialBalance": 0
}
```

#### Get All Students
```http
GET /api/students
Authorization: Bearer <admin-token>
```

#### Update Student
```http
PUT /api/students/:studentId
Authorization: Bearer <admin-token>
```

#### Delete Student
```http
DELETE /api/students/:studentId
Authorization: Bearer <admin-token>
```

### Teacher Management

#### Create Teacher
```http
POST /api/teachers
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "email": "teacher@school.com",
  "password": "Teacher@123",
  "firstName": "Jane",
  "lastName": "Smith",
  "phone": "+250788123456",
  "subject": "Mathematics"
}
```

#### Get All Teachers
```http
GET /api/teachers
Authorization: Bearer <admin-token>
```

### Class Management

#### Create Class
```http
POST /api/classes
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Grade 6A",
  "grade": "6",
  "section": "A",
  "academicYear": "2024",
  "teacherId": "teacher-profile-uuid"
}
```

#### Get All Classes
```http
GET /api/classes
Authorization: Bearer <admin-token>
```

#### Assign Teacher to Class
```http
PUT /api/classes/:classId/assign-teacher
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "teacherId": "teacher-profile-uuid"
}
```

### Grade Management

#### Create/Update Grade
```http
POST /api/grades
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "studentId": "student-uuid",
  "subject": "Mathematics",
  "score": 85,
  "maxScore": 100,
  "term": "Term 1",
  "academicYear": "2024",
  "remarks": "Excellent"
}
```

### Attendance Management

#### Mark Attendance
```http
POST /api/attendance
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "studentId": "student-uuid",
  "date": "2024-01-15",
  "status": "PRESENT",
  "remarks": ""
}
```

### Refund Management

#### Get All Refunds
```http
GET /api/refunds?status=PENDING
Authorization: Bearer <admin-token>
```

#### Approve Refund
```http
PUT /api/refunds/:refundId/approve
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "adminNotes": "Approved - valid reason"
}
```

#### Reject Refund
```http
PUT /api/refunds/:refundId/reject
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "adminNotes": "Rejected - insufficient documentation"
}
```

### Dashboard

#### Get Statistics
```http
GET /api/dashboard/stats
Authorization: Bearer <admin-token>
```

Response:
```json
{
  "stats": {
    "totalStudents": 150,
    "totalParents": 120,
    "totalTeachers": 25,
    "totalClasses": 12,
    "pendingDevices": 5,
    "pendingRefunds": 3,
    "totalFeeCollection": 5000000,
    "attendanceRate": 92.5
  }
}
```

## Test Credentials

```
Email: admin@school.com
Password: Admin@123
Device ID: admin-test-device
```

## Project Structure

```
admin-backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   ├── controllers/
│   ├── dtos/
│   ├── middlewares/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Security

- JWT authentication required for all protected routes
- Role-based access control (ADMIN, TEACHER)
- Device verification required
- Rate limiting enabled
- Input validation and sanitization
- Helmet security headers

## License

MIT
