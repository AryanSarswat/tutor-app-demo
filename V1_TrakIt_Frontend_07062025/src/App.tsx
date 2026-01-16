fimport React, { useState } from 'react';
import { Check, Flag, Mail, ArrowRight, Smartphone, Star } from 'lucide-react';
import MotherAndDaughter from './assets/MotherDaughter_Cropped.jpg';
import TrakItLogo from './assets/Main_logo.jpg';



function App() {
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwnL1ClVadGeo7S_ay9Rhcn4bz5mlwSPSU_jcnFy4ZgNpIiMdVXz3q6x15vf7fGQCbl9g/exec';
  const phoneNumber = "6580101713";
  const [email, setEmail] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          timestamp: new Date().toISOString(),
          source: 'website'
        })
      });

      setEmail('');
      setIsLoading(false);
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('There was an error submitting your email. Please check your internet connection.');
      setIsLoading(false);
    }
  };

  const handleClaimSpotClick = () => {
    console.log('Claim your spot now button clicked!');
    // Add your logic here for "Claim your spot now"
  };

  const handleGetInTouchClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-navy font-inter">
      {/* Header with Logo and Promotional Banner - Tighter Padding */}
      <div className="bg-[#FBFCF8] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left - Logo */}
            <div className="flex-shrink-0">
              <img 
                src={TrakItLogo} 
                alt="TrakIt Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto"
              />
            </div>
            
            {/* Right - Promotional Content in Black Block */}
            <div className="bg-black rounded-xl px-4 sm:px-6 py-3 flex items-center gap-3 sm:gap-4 group transition-all duration-300 group-hover:shadow-neon-block">
              {/* Promotional Text */}
              <div className="flex items-center">
                <div className="hidden sm:flex items-center">
                  <span className="font-bold text-xs sm:text-sm lg:text-base text-white tracking-wide">
                    Looking For First 50 Tutors - Help Shape TrakIt & Get Early Rewards
                  </span>
                </div>
                
                {/* Mobile version - shorter text */}
                <div className="sm:hidden flex items-center">
                  <span className="font-bold text-xs text-white tracking-wide">
                    First 50 Tutors - Early Rewards
                  </span>
                </div>
              </div>
              
              {/* CTA Button */}
              <button 
                className="bg-neon-gradient text-navy px-4 sm:px-6 py-2 rounded-lg font-bold text-sm sm:text-base hover:shadow-neon-hover transition-all duration-300 hover:scale-105 whitespace-nowrap group-hover:shadow-neon-rich"
                onClick={handleClaimSpotClick}
              >
                <span className="hidden sm:inline">Claim Your Spot Now</span>
                <span className="sm:hidden">Claim Spot</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Balanced Northern Lights Effect */}
      <div className="relative overflow-hidden bg-[#FBFCF8]">

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-black leading-tight mb-6">
                <span className="relative inline-block">
                  Stop Guessing
                </span> If Tuition Works.<br />
                <span className="relative inline-block">
                  <span className="relative z-10">Start Tracking</span>
                  <span className="absolute inset-0 bg-neon-green/60 transform skew-x-1 rotate-1 rounded-sm highlighter-texture"></span>
                </span> Your Child's Progress Now.
              </h1>
              
              {/* Enhanced paragraph with black bold accents */}
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                Get real-time, <span className="font-bold text-black">personalised AI insights</span> on your child's unique tuition journey 
                for <span className="font-bold text-black">every single session</span> – all in one place.
              </p>

              {/* Email Capture Form with Larger Embedded Button */}
              <form onSubmit={handleEmailSubmit} className="mb-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-72 py-4 rounded-lg border-2 border-neon-green shadow-neon-subtle hover:shadow-neon-rich focus:shadow-neon-rich focus:outline-none text-gray-800 text-lg transition-all duration-300"
                    required
                  />
                  <button
                    type="submit"
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap border-2 border-white shadow-sm ${
                      isLoading
                        ? 'bg-green-500 text-white cursor-not-allowed'
                        : 'bg-neon-gradient text-navy hover:shadow-neon-hover hover:scale-105'
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Try it for Free Today
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Enhanced Promotional Text - Same Size, No Arrow, Black Bold Accent */}
              <div className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                <span className="font-bold text-black">First 6 months free</span> if you join now! <span className="text-gray-500">(No credit card required)</span>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="flex justify-center lg:justify-end items-end">
              <div className="relative">
                <div className="relative max-w-lg lg:max-w-xl w-full">
                  {/* Clean Aesthetic Image */}
                  <div className="relative">
                    <img 
                      src={MotherAndDaughter}
                      alt="Mother and daughter learning together"
                      className="w-full h-auto object-contain rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    />
                    
                    {/* Subtle aesthetic glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/5 via-transparent to-white/10 pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <div className="bg-[#FBFCF8] py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* White Floating Platform */}
          <div className="bg-black rounded-3xl shadow-2xl p-8 lg:p-12 mb-16">
            {/* Main Heading */}
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight">
                Discover how TrakIt is enabling families like yours to see{' '}
                <span className="text-neon-green">visible progress</span> in every tutoring session.
              </h2>
            </div>

            {/* Three Feature Columns */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-neon-green/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Check className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">
                    Know Every Session, Inside Out
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Track your child's learning with the <span className="font-bold text-white">ECX Score</span> — a simple rating for Engagement, Comprehension, and Execution. You'll <span className="font-bold text-white">know progress or gaps well before exam results</span>.
                </p>
              </div>

              {/* Feature 2 */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-neon-green/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Star className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">
                    Progress Reports You Own
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Get <span className="font-bold text-white">clear reports powered by AI</span> after every session that belong to you, not the tutor. <span className="font-bold text-white">Easily share them if you switch tutors</span>, keeping your child's progress seamless.
                </p>
              </div>

              {/* Feature 3 */}
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-neon-green/10 rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <Flag className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-xl font-bold text-white mt-4">
                    Full Transparency, No Surprises
                  </h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  See exactly what happens in each session with time stamps and lesson notes. <span className="font-bold text-white">Never be left in the dark again about how your child's time (and your money) is spent</span>.
                </p>
              </div>
            </div>
          </div>

          {/* New Feature Request Sentence */}
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight">
              Got a feature in mind that can help you? We can make that happen.
            </h2>
          </div>

          {/* CTA Buttons Below Platform */}
          <div className="text-center">
            <button 
              className="bg-neon-gradient text-navy px-6 py-3 rounded-lg font-bold text-base hover:shadow-neon-hover transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 mb-4"
              onClick={handleGetInTouchClick}
            >
              Let's Get in Touch
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-gray-500 text-sm mb-0">Free demo call - no sign-up required!</p>
            
            {/* TrakIt Logo */}
            <div className="mt-6">
              <img 
                src={TrakItLogo} 
                alt="TrakIt Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto mx-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2026 TrakIt. All rights reserved. Singapore born initiative 🇸🇬
          </p>
        </div>
      </footer>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-sm mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Email Submitted!</h2>
            <p className="text-gray-600 mb-6">Thank you for your interest. We will be in touch with you shortly.</p>
            <button
              onClick={() => setIsDialogOpen(false)}
              className="bg-neon-gradient text-navy px-6 py-3 rounded-lg font-bold text-base hover:shadow-neon-hover transition-all duration-300 hover:scale-105"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
