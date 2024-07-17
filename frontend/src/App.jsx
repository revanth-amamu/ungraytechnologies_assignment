import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './pages/Layout';
import useAuth from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();
  return (
      <Routes>
      {isAuthenticated ? (
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="/" element={<Login />} />
      )}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
