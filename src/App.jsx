import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Articles from './pages/Articles';
import ArticleDetails from './pages/ArticleDetails';
import Interviews from './pages/Interviews';
import InterviewDetails from './pages/InterviewDetails';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetails from './pages/CaseStudyDetails';
import Reports from './pages/Reports';
import ReportDetails from './pages/ReportDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Infographics from './pages/Infographics';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-martech-dark text-[var(--text-primary)] transition-colors duration-300">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Dynamic News Category Routing */}
            <Route path="/insights" element={<Articles />} />
            <Route path="/insights/:category" element={<Articles />} />
            <Route path="/insights/:category/:subcategory" element={<Articles />} />
            
            <Route path="/article/:slug" element={<ArticleDetails />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/interviews/:id" element={<InterviewDetails />} />
            
            {/* Solutions Offerings Routing */}
            <Route path="/solutions" element={<Services />} />
            <Route path="/solutions/:id" element={<ServiceDetails />} />
            
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:id" element={<ReportDetails />} />
            <Route path="/infographics" element={<Infographics />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
