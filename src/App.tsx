import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/fonts.css';
import StoreLocator from './pages/storelocator/StoreLocator';
import State from './pages/storelocator/State';
import Showroom from './pages/storelocator/Showroom';
import DynamicBreadcrumb from './components/Reusables/DynamicBreadcrumb';

function App() {
  return (
    <Router>
      <div className="app min-h-screen">
        <DynamicBreadcrumb />
        <div className="mx-auto px-0 sm:px-4">
          
          <Routes>
            <Route path="/storelocator" element={<StoreLocator />} />
            <Route path="/storelocator/:state" element={<State />} />
            <Route path="/storelocator/:state/:showroom" element={<Showroom />} />
            <Route path="/" element={
              <div>
                <h1>Welcome to Our Store</h1>
                <p>Find our nearest showroom using the store locator.</p>
                <Link to="/storelocator"><p className='text-[#AF1F2D80] hover:text-[#AF1F2D]'>Store Locator</p></Link>
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
