import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import FeatureCategory from './components/FeatureCategory'
import About from './components/About'
import Contact from './components/Contact'
import BottomNav from './components/BottomNav'
import AddProduct from './components/AddProduct'

const Home = () => {
return ( <div> <Header /> <Hero /> <FeatureCategory /> <ProductGrid /> <About /> <Contact /> <Footer /> <BottomNav /> </div>
)
}

const App = () => {
return ( <BrowserRouter> <Routes>
<Route path="/" element={<Home />} />
<Route path="/admin" element={<AddProduct />} /> </Routes> </BrowserRouter>
)
}

export default App
