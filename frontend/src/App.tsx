import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import Update from './components/Update';
import './App.css'

const App: React.FC = () => {
  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/update-profile/:id" element={<Update />} />
              </Routes>
          </div>
      </Router>
  );
};

export default App
