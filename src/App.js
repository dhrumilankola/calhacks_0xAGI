import './App.css';
import LogIn from './Components/LogIn';
import Student from './Pages/Student';
import Professor from './Pages/Professor';
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom"
import AddBot from './Components/AddBot';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LogIn/>}>
          </Route>
          <Route path='/student' element={<Student/>}>
          </Route>
          <Route path='/professor' element={<Professor/>}>
          </Route>
          <Route path='/addBot' element={<AddBot/>}>
          </Route>
          <Route path='/profile' element={<Profile/>}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
