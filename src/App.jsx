import Header from './components/Header'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Footer from './components/Footer'
import  FeatureCategory from './components/FeatureCategory'
import About from './components/About'
import Contact from './components/Contact'


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
     
    </div>
  )
}

export default App