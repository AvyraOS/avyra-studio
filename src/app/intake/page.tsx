"use client";

import { useEffect } from "react";

import IntakeForm from "@/components/landing/IntakeForm";


export default function IntakePage() {
  useEffect(() => {
    // Force scroll to top on page load
    if (history.scrollRestoration) {
      history.scrollRestoration = 'manual';
    }
    
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
  }, []);

  return (
    <main className="flex items-center justify-center w-full bg-black text-white overflow-hidden  ">
    
  
      {/* Form Container */}
      <div className="w-full z-10 relative">
        <IntakeForm />
      </div>
      
   
    </main>
  );
} 