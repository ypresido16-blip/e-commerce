import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import  FeatureCategory from './components/FeatureCategory'
import About from './components/About'
import Contact from './components/Contact'
import BottomNav from './components/BottomNav'


const App = () => {
  return (
    <div>
      <Header/>
      
      <Hero/>
      <FeatureCategory/>
      <ProductGrid/>
      <About/>
      <Contact/>
      <Footer/>
      <BottomNav/>
     
    </div>
  )
}

export default App