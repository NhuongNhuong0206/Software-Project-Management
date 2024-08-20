import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './layout/Header';
import Footer from './layout/Footer';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import Bill from './components/Bill/Bill';
import InvoiceInfo from './components/Bill/InvoiceInfo';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/bill' element={<Bill />} />
          <Route path="/invoice" element={<InvoiceInfo />} />
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
