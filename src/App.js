import logo from './logo.svg';
import './App.css';
import HelloPageCanvas from './ModelView/HelloPageCanvas';
import HelloPage from './Components/HelloPage';
import DiscardClothes from './Components/DiscardClothes';
import ProductPage from './Components/ProductPage';
import CreativeProductsPage from './Components/AllProductPage';

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route path="/product" element={<CreativeProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
