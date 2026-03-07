# School Management System - Admin Application

Complete admin application for school staff to manage all school operations, verify users, and oversee academic activities.

## 📋 Overview

This repository contains the **Admin Application** for the School Management System, designed for administrators and teachers to:
- Verify parent device registrations
- Manage students, teachers, and classes
- Update grades and attendance
- Approve/reject refund requests
- View dashboard statistics and analytics

## 🏗️ Repository Structure

```
school-management-admin/
├── backend/           # Node.js + Express.js API
│   ├── src/
│   ├── prisma/
│   └── README.md
└── frontend/          # React.js UI (in progress)
    └── (to be implemented)
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- PostgreSQL v12+
- npm or yarn
- Client backend must be set up first (shares database)

### Backend Setup

1. **Navigate to backend**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your database credentials (same as client backend)
```

4. **Generate Prisma client**
```bash
npx prisma generate
```

5. **Start server**
```bash
npm run dev
```

Server runs on `http://localhost:3002`

## 🔑 Features

### Device Management
- View all pending device registrations
- Approve/verify parent devices
- Reject suspicious devices
- View device history by user

### Student Management
- Create new student records
- Link students to parent accounts
- Update student information
- Delete student records
- View complete student profiles

### Teacher Management
- Create teacher accounts
- Assign teachers to classes
- Update teacher information
- View teacher class assignments

### Class Management
- Create and manage classes
- Assign teachers to classes
- View class rosters
- Manage class schedules

### Grade Management
- Create/update student grades
- Support for multiple subjects and terms
- Grade remarks and comments
- Bulk grade operations

### Attendance Management
- Mark daily attendance
- Update attendance records
- View attendance reports
- Track attendance rates

### Refund Management
- View all refund requests
- Approve refunds (with balance deduction)
- Reject refunds with admin notes
- Track refund history

### Dashboard & Analytics
- Total students, parents, teachers
- Pending devices and refunds count
- Total fee collection statistics
- Attendance rate calculations

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin/Teacher login

### Device Management
- `GET /api/devices/pending` - Get pending devices
- `GET /api/devices` - Get all devices
- `PUT /api/devices/:id/verify` - Verify device
- `PUT /api/devices/:id/reject` - Reject device

### Student Management
- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student details
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teacher Management
- `POST /api/teachers` - Create teacher
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher details
- `PUT /api/teachers/:id` - Update teacher

### Class Management
- `POST /api/classes` - Create class
- `GET /api/classes` - Get all classes
- `GET /api/classes/:id` - Get class details
- `PUT /api/classes/:id` - Update class
- `PUT /api/classes/:id/assign-teacher` - Assign teacher

### Grade Management
- `POST /api/grades` - Create/update grade
- `GET /api/grades/student/:studentId` - Get student grades

### Attendance Management
- `POST /api/attendance` - Mark attendance
- `GET /api/attendance/student/:studentId` - Get attendance

### Refund Management
- `GET /api/refunds` - Get all refunds
- `PUT /api/refunds/:id/approve` - Approve refund
- `PUT /api/refunds/:id/reject` - Reject refund

### Dashboard
- `GET /api/dashboard/stats` - Get statistics

## 🧪 Testing

### Test Credentials
```
Admin Account:
Email: admin@school.com
Password: Admin@123
Device ID: admin-test-device
```

### Postman Collection
See `backend/README.md` for complete API documentation and Postman examples.

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (shared with client backend)
- **ORM:** Prisma
- **Authentication:** JWT
- **Security:** Helmet, express-rate-limit
- **Validation:** express-validator

### Frontend (Planned)
- **Framework:** React.js
- **State Management:** Context API / Redux
- **HTTP Client:** Axios
- **UI Library:** Material-UI / Tailwind CSS
- **Charts:** Chart.js / Recharts

## 📁 Project Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema (shared)
├── src/
│   ├── config/            # Database & JWT config
│   ├── controllers/       # Request handlers
│   │   ├── authController.js
│   │   ├── deviceController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── classController.js
│   │   ├── gradeController.js
│   │   ├── attendanceController.js
│   │   ├── refundController.js
│   │   └── dashboardController.js
│   ├── dtos/              # Data transfer objects
│   ├── middlewares/       # Auth, validation, rate limiting
│   ├── routes/            # API routes
│   ├── services/          # Business logic
│   ├── utils/             # Helper functions
│   └── server.js          # Express app
├── .env.example
├── package.json
└── README.md
```

## 🔒 Security Features

- JWT token authentication
- Role-based access control (ADMIN, TEACHER)
- Device verification required
- Rate limiting
- Input validation and sanitization
- Helmet security headers
- CORS configuration
- Password hashing with SHA-512 + bcrypt

## 📊 Dashboard Statistics

The admin dashboard provides:
- **Total Students** - Count of all enrolled students
- **Total Parents** - Count of registered parent accounts
- **Total Teachers** - Count of teacher accounts
- **Total Classes** - Count of active classes
- **Pending Devices** - Devices awaiting verification
- **Pending Refunds** - Refund requests awaiting approval
- **Total Fee Collection** - Sum of all fee deposits
- **Attendance Rate** - Percentage (last 30 days)

## 🔄 Workflow Examples

### Device Verification Flow
1. Parent registers on client app
2. Device status set to PENDING
3. Admin views pending devices
4. Admin verifies device
5. Parent can now login

### Student Creation Flow
1. Admin creates student record
2. Links student to parent account
3. Assigns student to class
4. Sets initial fee balance
5. Parent can view student data

### Refund Approval Flow
1. Parent requests refund
2. Admin views refund request
3. Admin checks balance and reason
4. Admin approves/rejects with notes
5. If approved, balance is deducted

## 🤝 Related Repository

**Client Application:** [school-management-client](https://github.com/yourusername/school-management-client)
- Parent and student registration
- Fee payment management
- Academic records viewing
- Refund requests

## 📄 License

MIT

## 👥 Authors

Developed as part of the School Management System project.

## 📞 Support

For issues and questions, please open an issue in this repository.
