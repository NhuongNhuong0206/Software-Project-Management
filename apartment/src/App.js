import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Container } from 'react-bootstrap';
import Home from './components/Home/Home';
import Bill from './components/Bill/Bill';
import InvoiceInfo from './components/Bill/InvoiceInfo';
import Login from './components/Login/Login';
import RegisterParking from './components/Car/RegisterParking';
import Cabinet from './components/Cabinet/Cabinet';
import Goods from './components/Good/Good';
import TienIch from './components/Home/tienich';
import Feedback from './components/Feedback/Feedback';
import FeedbackList from './components/Feedback/FeedbackList';
import VehicleInfo from './components/Car/Car';
import Profile from './components/Login/Profile';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/bill' element={<Bill />} />
          <Route path="/invoice" element={<InvoiceInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-parking" element={<RegisterParking />} />
          <Route path="/cabinet" element={<Cabinet />} />
          <Route path="/good" element={<Goods />} />
          <Route path="/tienich" element={<TienIch />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/create_feedback" element={<Feedback />} />
          <Route path="/car" element={<VehicleInfo />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
