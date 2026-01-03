# 🧭 Dayflow – Human Resource Management System (HRMS)

> *Every workday, perfectly aligned.*

**Dayflow** is a hackathon-built **Human Resource Management System (HRMS)** focused on secure employee onboarding, attendance tracking, leave management, and role-based access control.

This repository currently contains a **completed frontend** and an **actively developing backend**.

---

## 🎯 Problem Statement

Traditional HR processes are often manual, fragmented, and insecure.  
Dayflow addresses this by providing a **centralized, role-aware HR platform** for organizations.

---

## 🚀 Core Features (Planned)

- Secure authentication with role-based access
- HR/Admin-controlled employee onboarding
- Attendance tracking (check-in / check-out)
- Leave & time-off management
- Salary visibility (Admin-only)

---

## 🧩 System Architecture

![Dayflow HRMS Architecture](./assets/dayflow-architecture.png)

---

## 🛠️ Tech Stack

### Frontend ✅
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Context-based auth (UI state)
- Modular, component-driven design

### Backend ⏳
- FastAPI
- SQLAlchemy
- JWT authentication
- Role-based authorization  
*(Under active development)*

---

## 🔐 Authentication & Roles

### Roles
- **Admin / HR**
- **Employee**

### Rules
- ❌ Employees cannot self-register  
- ✅ Admin creates employee accounts  
- ✅ Login ID & temporary password are auto-generated  
- ✅ First login requires mandatory password change  
- 🔒 Sensitive data restricted to Admin  

---

## 🖥️ Frontend Status

### ✅ Completed
- Login & authentication flow
- Admin employee creation UI
- First-time password change flow
- Role-based UI rendering
- Dashboard & navigation
- Attendance & leave UI modules
- Profile management (tabbed layout)

---

## 📁 Frontend Structure (Simplified)

dayflow-frontend/
│
├── app/
│   ├── login/
│   ├── signup/                  # Admin creates employee
│   ├── profile/
│   │   ├── resume/
│   │   ├── private-info/
│   │   ├── salary-info/         # Admin only
│   │   └── security/            # Change password
│   ├── attendance/
│   └── time-off/
│
├── components/
├── context/
├── lib/
└── public/


---

## 🔄 Backend Status

Backend development is **in progress**, focused on:
- API security
- Business rule enforcement
- Attendance, leave, and payroll APIs

Details will be added once finalized.

---

## 🧠 Design Principles

- Clear frontend–backend separation
- Backend-enforced security rules
- Scalable and readable architecture
- Hackathon-ready with real-world logic

---

## 📈 Future Enhancements

- Analytics dashboard
- Notifications
- Payroll reports
- Deployment & CI/CD

---

## 🏁 Hackathon Note

Dayflow is designed as a **realistic HRMS**, not just a UI demo.  
Backend features are actively evolving during the hackathon.

---
