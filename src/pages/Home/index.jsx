import React, { useRef } from 'react';
import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import ProofStrip from '../../components/ProofStrip';
import About from '../../components/About';
import Experience from '../../components/Experience';
import Portfolio from '../../components/Portfolio';
import Contact from '../../components/Contact';
import { useHomepageMotion } from '../../motion/useHomepageMotion';

function Home() {
  const pageRef = useRef(null);
  useHomepageMotion(pageRef);

  return (
    <div ref={pageRef}>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <About />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
