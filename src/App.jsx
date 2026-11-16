import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useState} from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import FeatureCategory from './components/FeatureCategory'
import About from './components/About'
import Contact from './components/Contact'
import BottomNav from './components/BottomNav'
import Admin from './components/Admin'


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Hero />
      <FeatureCategory />
      <ProductGrid searchTerm={searchTerm} />
      <About />
      <Contact />
      <Footer />
      <BottomNav />
    </div>
  )
}
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App


