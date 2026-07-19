import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';

function GrainOverlay() {
  return (
    <div aria-hidden="true" className="grain-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
          <feComponentTransfer in="grey" result="bright">
            <feFuncR type="linear" slope="2.8" intercept="-0.9"/>
            <feFuncG type="linear" slope="2.8" intercept="-0.9"/>
            <feFuncB type="linear" slope="2.8" intercept="-0.9"/>
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="bright" mode="multiply"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" opacity="1"/>
      </svg>
    </div>
  );
}

function App() {
  return (
    <>
      <GrainOverlay />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}

export default App;

