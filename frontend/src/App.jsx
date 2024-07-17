import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Layout from './pages/Layout';
import useAuth from './hooks/useAuth';

function App() {
  const { token } = useAuth();
  return (
      <Routes>
      {token ? (
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      ) : (
        <Route path="/login" element={<Login />} />
      )}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
