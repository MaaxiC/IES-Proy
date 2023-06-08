import './custom.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/Navigation/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';

//pages
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';
import CategoriesPage from './pages/CategoriesPage';
import ItemDetailPage from './pages/ItemDetailPage';


const App = () => {
  return (
    <div className='App'>
      <CartProvider>
        <BrowserRouter>
          <NavBar/>
          <Routes>
            <Route path='/' element={ <HomePage/> } />
            <Route path='/categories/:category' element={ <CategoriesPage/> } />
            <Route path='/item/:itemId' element={ <ItemDetailPage/> } />
            <Route path='/aboutus' element={ <AboutUsPage/> } />
            <Route path='/contact' element={ <ContactPage/> } />
            <Route path='/faq' element={ <FAQPage/> } />
            <Route path='/cart' element={ <CartPage/> } />
            <Route path='*' element={ <NotFoundPage/> } />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App
