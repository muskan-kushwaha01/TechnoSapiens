import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import ParticlesBackground from './components/ParticlesBackground';
import Footer from './components/Footer';
import Judges from './components/Judges';
import Schedule from './components/Schedule';
import Sponsors from './components/Sponsors';
import Faqs from './components/Faqs';
function App() {
  return (
    <div className="App">
      <ParticlesBackground />
      <Hero />
      <About />
      <Events />
      <Schedule />
      <Judges />
      <Sponsors />
      <Faqs />
      <Footer />
      {/* Other sections like #judges, etc. would follow here */}
    </div>
  );
}

export default App;