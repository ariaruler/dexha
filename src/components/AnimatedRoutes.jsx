import * as React from "react";
import AppTrade from "../page/AppTrade";
import LandingPage from "../page/LandingPage";
import ContactUs from "../page/ContactUs";
import Page404 from "../page/Page404";
import Help from "../page/Help";
import FAQ from "../page/FAQ";
import Rules from "../page/Rules";
import { useLocation, Route, Routes } from "react-router-dom";
import TransactionTracking from "../page/TransactionTracking";
import AboutUs from "../page/AboutUs";
// import {AnimatePresence } from 'framer-motion'

// /dist/framer-motion

export default function AnimatedRoutes(props) {
  const location = useLocation();

  return (
    // <AnimatePresence>

    <Routes location={location} key={location.pathname}>
      <Route path="/swap" element={<AppTrade />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/help" element={<Help />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="*" element={<Page404 />} />
      <Route path="/transaction-tracking" element={<TransactionTracking />} />
    </Routes>
    
    // </AnimatePresence>
  );
}
