# Car Maintenance Tracker - Project Structure Guide

## 🎯 What This App Does
This is a car maintenance tracking application where users can:
- **Register & Login** with their email and password
- **Add multiple cars** with details (make, model, year, mileage)
- **Log maintenance tasks** (oil changes, tire rotations, brake pads, etc.)
- **Track maintenance history** to know when services were done and costs
- **Get reminders** for upcoming maintenance (with due dates)

---

## 📁 Folder Structure Explanation

```
src/
├── app/                          # Next.js App Router - main pages
│   ├── (auth)/                   # Auth pages grouped in layout route
│   │   ├── login/                # Login page
│   │   │   └── page.tsx
│   │   └── signup/               # Sign up page
│   │       └── page.tsx
│   ├── (dashboard)/              # Dashboard pages grouped in layout route
│   │   └── dashboard/            # Main app dashboard
│   │       └── page.tsx
│   ├── api/                      # Backend API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/            # POST /api/auth/login
│   │   │   │   └── route.ts
│   │   │   └── signup/           # POST /api/auth/signup
│   │   │       └── route.ts
│   │   ├── cars/                 # Car management endpoints
│   │   │   └── create/           # POST /api/cars/create
│   │   │       └── route.ts
│   │   └── maintenance/          # Maintenance endpoints
│   │       └── create/           # POST /api/maintenance/create
│   │           └── route.ts
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout (wraps everything with providers)
│   └── page.tsx                  # Home page (redirects to login/dashboard)
│
├── components/                   # Reusable React components
│   ├── LoginForm.tsx             # Login form component
│   ├── SignupForm.tsx            # Signup form component
│   ├── AddCarForm.tsx            # Form to add a new car
│   └── AddMaintenanceForm.tsx    # Form to add maintenance records
│
├── context/                      # React Context for global state management
│   ├── AuthContext.tsx           # Authentication context (user login state)
│   └── CarContext.tsx            # Car & maintenance context (car data, maintenance records)
│
└── types/                        # TypeScript type definitions
    └── index.ts                  # All type definitions for the app
```

---

## 🔑 Key Files Explained

### 1. **Types** (`src/types/index.ts`)
Defines all TypeScript interfaces:
- `User` - User account info
- `Car` - Car details (make, model, mileage, etc.)
- `MaintenanceTask` - Maintenance record (oil change, tire rotation, etc.)
- `MaintenanceType` - Enum of maintenance types
- Context types for type safety

### 2. **Authentication Context** (`src/context/AuthContext.tsx`)
- Manages user login/logout state
- Stores user info in local storage
- Provides `useAuth()` hook for components
- Handles API calls to `/api/auth/login` and `/api/auth/signup`

### 3. **Car Context** (`src/context/CarContext.tsx`)
- Manages list of user's cars
- Manages maintenance tasks
- Provides `useCars()` hook for components
- Methods: `createCar()`, `deleteCar()`, `selectCar()`, `addMaintenanceTask()`, etc.

### 4. **Root Layout** (`src/app/layout.tsx`)
- Wraps entire app with `AuthProvider` and `CarProvider`
- This makes authentication and car data available to all pages

### 5. **Auth Pages** 
- `(auth)/login/page.tsx` - Login page
- `(auth)/signup/page.tsx` - Signup page
- The `(auth)` folder groups them without adding to URL path

### 6. **Dashboard** (`(dashboard)/dashboard/page.tsx`)
- Main app page after login
- Shows user's cars and maintenance history
- Protected route (redirects to login if not authenticated)

### 7. **API Routes**
- `/api/auth/login` - POST request to login user
- `/api/auth/signup` - POST request to create new user
- `/api/cars/create` - POST request to add a car
- `/api/maintenance/create` - POST request to add maintenance task

---

## 🔄 How Data Flows

```
1. User lands on app → Redirected to /login or /dashboard
2. User logs in → AuthContext stores user info
3. User adds a car → API creates car, CarContext updates cars list
4. User selects a car → CarContext updates selectedCar
5. User adds maintenance → API creates task, CarContext updates maintenanceTasks
6. Dashboard displays:
   - List of cars (from CarContext.cars)
   - Maintenance history (from CarContext.maintenanceTasks filtered by selected car)
```

---

## 🧠 Context Providers Explained

### AuthContext
```typescript
// In any component, use:
const { user, login, signup, logout, isAuthenticated } = useAuth();

// Example:
if (!isAuthenticated) {
  // Show login page
}
```

### CarContext
```typescript
// In any component, use:
const { 
  cars,                          // Array of all user's cars
  selectedCar,                   // Currently selected car
  maintenanceTasks,              // All maintenance records
  createCar,                     // Function to add car
  selectCar,                     // Function to select a car
  addMaintenanceTask,            // Function to add maintenance
  getCarMaintenanceHistory,      // Get history for selected car
} = useCars();
```

---

## 🚗 Features & Routes

| Feature | Route | Description |
|---------|-------|-------------|
| Login | `/login` | User login page |
| Signup | `/signup` | Create new account |
| Dashboard | `/dashboard` | Main app (protected) |
| API Login | `POST /api/auth/login` | Authenticate user |
| API Signup | `POST /api/auth/signup` | Create user account |
| Add Car | `POST /api/cars/create` | Create new car record |
| Add Maintenance | `POST /api/maintenance/create` | Add maintenance task |

---

## 💾 Data Storage (Currently)

The app uses **in-memory storage** (simulated database):
- User data stored in memory (resets on page refresh)
- Car data stored in memory
- Maintenance data stored in memory
- Also saved to browser localStorage for persistence between sessions

**To connect to a real database**, replace:
- The in-memory arrays in API routes with actual database calls
- Use: MongoDB, PostgreSQL, Firebase, Supabase, etc.

---

## 🎨 Components Breakdown

### LoginForm
- Email/password inputs
- Calls `login()` from AuthContext
- Redirects to dashboard on success

### SignupForm
- Email, password, name inputs
- Calls `signup()` from AuthContext
- Redirects to dashboard on success

### AddCarForm
- Input fields: name, make, model, year, mileage
- Calls `createCar()` from CarContext
- Resets form on success

### AddMaintenanceForm
- Dropdown: maintenance type (oil change, tire rotation, etc.)
- Text area: description
- Input fields: cost, mileage, due date
- Calls `addMaintenanceTask()` from CarContext

---

## 🔐 Security Notes

⚠️ **This is a demo app!** For production:
1. Use proper password hashing (bcrypt)
2. Add authentication tokens (JWT)
3. Use environment variables for secrets
4. Connect to real database
5. Add input validation & sanitization
6. Use HTTPS only
7. Add role-based access control

---

## 🚀 Next Steps to Extend

1. **Database Integration** - Connect to MongoDB/PostgreSQL
2. **Authentication** - Add JWT tokens & httpOnly cookies
3. **Email Notifications** - Send maintenance reminders
4. **File Upload** - Store receipt images
5. **Statistics** - Show maintenance costs over time
6. **Reminders** - Auto-generate due dates based on mileage

---

## 📝 How to Use

1. **Install dependencies**: `npm install`
2. **Run dev server**: `npm run dev`
3. **Visit**: `http://localhost:3000`
4. **Sign up** with email/password
5. **Add a car** with details
6. **Log maintenance** activities
7. **View history** anytime

---

## 🛠️ Built With
- **Next.js 15** - React framework with server/client capabilities
- **TypeScript** - Type-safe JavaScript
- **React Context API** - State management
- **Tailwind CSS** - Styling
- **React Hooks** - useContext, useState, useEffect, etc.
