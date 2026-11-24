import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useOutletContext } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import FeatureCategory from './components/FeatureCategory'
import About from './components/About'
import Contact from './components/Contact'
import BottomNav from './components/BottomNav'
import Admin from './components/Admin'
import Profile from './components/Profile'

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Outlet context={{ searchTerm }} />
      <BottomNav />
    </div>
  )
}

const Home = () => {
  const { searchTerm } = useOutletContext()

  return (
    <>
       <Hero />
      <FeatureCategory />
      <ProductGrid searchTerm={searchTerm} />
      <About />
      <Contact />
      <Footer />
    </>
  )
}

const Shop = () => {
  const { searchTerm } = useOutletContext()

  return (
    <div className="pb-28">
      <ProductGrid searchTerm={searchTerm} />
    </div>
  )
}

const Soon = ({ name }) => (
  <div className="min-h-screen bg-black pt-20 pb-28 text-center text-white">
    {name} page coming soon
  </div>
)

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wishlist" element={<Soon name="Wishlist" />} />
          <Route path="/cart" element={<Soon name="Cart" />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App