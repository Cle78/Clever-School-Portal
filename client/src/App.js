import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Subjects from './pages/Subjects';
import Assignments from './pages/Assignments';
import Quizzes from './pages/Quizzes';
import Attendance from './pages/Attendance';
import CalendarEvents from './pages/CalendarEvents';
import Reports from './pages/Reports';
import AIAssistant from './pages/AIAssistant';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route element="{<Login" path="/login"/>} />
        <Route element="{<ProtectedRoute" path="/dashboard"><Dashboard/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/subjects"><Subjects/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/assignments"><Assignments/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/quizzes"><Quizzes/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/attendance"><Attendance/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/calendar"><CalendarEvents/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/reports"><Reports/></ProtectedRoute>} />
        <Route element="{<ProtectedRoute" path="/ai-assistant"><AIAssistant/></ProtectedRoute>} />
        <Route element="{<Navigate" path="*" replace to="/login"/>} />
      </Routes>
    </Router>
  );
}

export default App;
