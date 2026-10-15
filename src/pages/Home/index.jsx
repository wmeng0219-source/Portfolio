import React from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Portfolio from "../../components/Portfolio";
import Experience from "../../components/Experience";
import Contact from "../../components/Contact";
import "./Home.css";
import { useLanguage } from "../../context/LanguageContext";

function Home() {
  const { language } = useLanguage();

  return (
    <div className="homepage" data-language={language}>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Portfolio />
        <Contact />
      </main>
    </div>
  );
}

export default Home;
