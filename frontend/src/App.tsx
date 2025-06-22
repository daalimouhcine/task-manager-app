import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
              <h1 className='text-4xl font-bold text-gray-800'>Task Manager</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
