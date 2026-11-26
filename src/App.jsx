import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const MembershipExperiment = lazy(() => import('./pages/DesignExperiment/Membership'));

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
      <Suspense
        fallback={<div role="status" style={{ padding: '96px 32px' }}>正在加载…</div>}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          {/* 独立视觉实验路由：只服务「会员办理流程重构」一章，不接入案例页模板。 */}
          <Route
            path="/design-experiment/membership"
            element={<MembershipExperiment />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;

