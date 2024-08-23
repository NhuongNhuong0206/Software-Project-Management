import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import FeedbackList from './FeedbackList'
import Feedback from './Feedback';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Feedback />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
