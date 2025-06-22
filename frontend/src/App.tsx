import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Tasks from "./pages/Tasks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/tasks'
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />

          <Route
            path='/'
            element={
              localStorage.getItem("token") ? (
                <Navigate to='/tasks' replace />
              ) : (
                <Navigate to='/login' replace />
              )
            }
          />

          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
