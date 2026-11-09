"use client";

import { useState, useEffect } from "react";
import { 
  Mail, 
  Lock, 
  User, 
  Shield, 
  KeyRound, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  UserPlus, 
  LogIn, 
  Send,
  Eye,
  EyeOff,
  AlertCircle
} from "lucide-react";

export default function AuthPage() {
  const [flow, setFlow] = useState("user");
  const [mode, setMode] = useState("login");
  const [otpMode, setOtpMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast({ ...toast, visible: false }), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showNotification = (message: string, type: "success" | "error" = "success") => {
    setToast({ visible: true, message, type });
  };

  const handleSimulatedAction = (e: React.FormEvent, successMessage: string) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotification(successMessage);
    }, 1500);
  };

  const handleSendOTP = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showNotification("Secure OTP sent to your inbox");
    }, 1000);
  };

  const ToastPopup = () => (
    <div
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-full font-bold shadow-2xl transition-all duration-500 transform flex items-center gap-3 ${
        toast.visible ? "translate-y-0 opacity-100 scale-100" : "-translate-y-20 opacity-0 scale-90"
      } ${toast.type === "success" ? "bg-white text-[#0a1947]" : "bg-red-500 text-white"}`}
    >
      {toast.type === "success" ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertCircle className="w-5 h-5 text-white" />}
      {toast.message}
    </div>
  );

  const TermsModal = () => (
    <div className={`fixed inset-0 z-40 flex items-center justify-center p-4 transition-all duration-300 ${showTerms ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className="absolute inset-0 bg-[#020b26]/60 backdrop-blur-md" onClick={() => setShowTerms(false)}></div>
      <div className={`relative bg-white rounded-[2rem] p-8 w-full max-w-md shadow-2xl transform transition-all duration-500 ${showTerms ? "scale-100 translate-y-0" : "scale-90 translate-y-10"}`}>
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0a1947]">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black mb-6 text-[#0a1947] text-center tracking-wide">Platform Terms of Service</h2>
        <div className="text-sm mb-8 space-y-4 text-gray-600 bg-gray-50 p-5 rounded-2xl border border-gray-100 leading-relaxed">
          <p><strong className="text-[#0a1947] block mb-1">1. Account Definitions</strong>"Admin" refers to the core system owner. "Event Organizer" (EO) refers to authorized event management personnel.</p>
          <p><strong className="text-[#0a1947] block mb-1">2. Account Creation & Privileges</strong>Event Organizer accounts created here are subject to system verification. Misuse of platform tools is strictly prohibited.</p>
        </div>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => { setTermsAccepted(true); setShowTerms(false); showNotification("Terms and Conditions accepted"); }} 
            className="w-full bg-[#0a1947] text-white rounded-full py-3.5 font-bold hover:bg-[#152b69] transition-all hover:shadow-[0_8px_20px_-6px_rgba(10,25,71,0.6)] active:scale-95 flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> I Accept
          </button>
          <button 
            onClick={() => setShowTerms(false)} 
            className="w-full bg-transparent border-2 border-gray-200 text-gray-600 rounded-full py-3.5 font-bold hover:border-[#0a1947] hover:text-[#0a1947] transition-all active:scale-95"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b26] via-[#0a1947] to-[#020b26] flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-blue-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>

      <ToastPopup />
      <TermsModal />

      <div className="relative z-10 flex p-1.5 bg-white/10 backdrop-blur-xl rounded-full mb-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 transition-all">
        <button 
          onClick={() => { setFlow("admin"); setMode("login"); setOtpMode(false); }} 
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 text-sm tracking-wide ${flow === "admin" ? "bg-white text-[#0a1947] shadow-lg scale-105" : "text-white/70 hover:text-white hover:bg-white/5"}`}
        >
          <Shield className={`w-4 h-4 ${flow === "admin" ? "text-[#0a1947]" : "text-white/70"}`} />
          Admin & Organizer
        </button>
        <button 
          onClick={() => { setFlow("user"); setMode("login"); setOtpMode(false); }} 
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-500 text-sm tracking-wide ${flow === "user" ? "bg-white text-[#0a1947] shadow-lg scale-105" : "text-white/70 hover:text-white hover:bg-white/5"}`}
        >
          <User className={`w-4 h-4 ${flow === "user" ? "text-[#0a1947]" : "text-white/70"}`} />
          Attendee
        </button>
      </div>
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.7)] border border-white/10 overflow-hidden transform transition-all duration-500 hover:shadow-[0_25px_60px_-12px_rgba(0,0,0,0.8)]">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-[#0a1947] to-blue-400 opacity-80"></div>

        <div className="mb-8 text-center mt-2 transition-all duration-500 transform translate-y-0">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-blue-50 text-[#0a1947] text-xs font-black tracking-widest mb-4 shadow-sm border border-blue-100">
            {flow === "admin" ? "SECURE WORKSPACE" : "PUBLIC PORTAL"}
          </div>
          <h1 className="text-3xl font-black text-[#0a1947] tracking-tight">
            {mode === "login" ? "Welcome Back" : "Create an Account"}
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium px-2">
            {flow === "admin" 
              ? "Access your comprehensive event management dashboard." 
              : "Sign in to access your personalized event itinerary."}
          </p>
        </div>
        
        <div className="transition-all duration-500 ease-in-out">
          
          {mode === "login" ? (
            <form onSubmit={(e) => handleSimulatedAction(e, "Authentication successful")} className="flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                <input required type="email" placeholder="Email address" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-5 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
              </div>
              
              {!otpMode ? (
                <div className="relative group animate-in fade-in zoom-in-95 duration-300">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                  <input required type={showPassword ? "text" : "password"} placeholder="Password" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-12 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a1947] transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              ) : (
                <div className="flex gap-2 animate-in fade-in zoom-in-95 duration-300">
                  <div className="relative group flex-1">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                    <input required type="text" placeholder="One-Time Password" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-5 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
                  </div>
                  <button type="button" onClick={handleSendOTP} disabled={isLoading} className="bg-blue-50 text-[#0a1947] border border-blue-100 rounded-full px-5 py-4 whitespace-nowrap hover:bg-blue-100 font-bold transition-all disabled:opacity-50 flex items-center justify-center shadow-sm">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <button type="submit" disabled={isLoading} className="group w-full bg-[#0a1947] text-white rounded-full py-4 font-bold mt-2 hover:bg-[#152b69] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(10,25,71,0.6)] transition-all duration-300 active:scale-95 disabled:opacity-70 disabled:hover:translate-y-0 flex justify-center items-center gap-2">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> Sign In</>}
              </button>
              
              <div className="flex flex-col sm:flex-row justify-between items-center text-sm mt-3 font-medium px-2 gap-4 sm:gap-0">
                <button type="button" className="text-gray-400 hover:text-[#0a1947] transition-colors">Forgot Password?</button>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setOtpMode(!otpMode)} className="text-[#0a1947] hover:text-blue-600 transition-colors flex items-center gap-1">
                    {otpMode ? "Use Password" : "Login via OTP"}
                  </button>
                  <button type="button" onClick={() => setMode("register")} className="text-[#0a1947] hover:text-blue-600 transition-colors flex items-center gap-1">
                    {flow === "admin" ? "Apply as Organizer" : "Sign Up"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => handleSimulatedAction(e, "Registration successful")} className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-700">
              
              {flow === "admin" && (
                <div className="text-[11.5px] font-medium text-gray-500 bg-gray-50 p-3.5 rounded-xl border border-gray-100 mb-1 leading-relaxed">
                  Event Organizers may register below. System Administrators can also provision access directly via the internal dashboard.
                </div>
              )}

              {flow === "admin" && (
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                  <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-5 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
                </div>
              )}
              
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                <input required type="email" placeholder="Email address" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-5 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
              </div>
              
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                <input required type={showPassword ? "text" : "password"} placeholder="Create password" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-12 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0a1947] transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {flow === "user" && (
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#0a1947] transition-colors" />
                  <input required type={showPassword ? "text" : "password"} placeholder="Confirm password" className="w-full bg-gray-50 border border-gray-200 text-[#0a1947] font-medium rounded-full pl-12 pr-12 py-4 outline-none focus:border-[#0a1947] focus:ring-4 focus:ring-[#0a1947]/10 transition-all" />
                </div>
              )}
              
              {flow === "admin" && (
                <div className="flex items-center gap-3 mt-1 ml-2">
                  <div 
                    className={`w-6 h-6 border-2 rounded-md flex items-center justify-center cursor-pointer transition-all duration-300 ${termsAccepted ? "bg-[#0a1947] border-[#0a1947]" : "bg-white border-gray-300 hover:border-[#0a1947]"}`}
                    onClick={() => !termsAccepted && setShowTerms(true)}
                  >
                    {termsAccepted && <CheckCircle className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-[#0a1947] font-bold hover:underline transition-all">Terms of Service</button>
                  </span>
                </div>
              )}
              
              <button type="submit" disabled={(flow === "admin" && !termsAccepted) || isLoading} className="group w-full bg-[#0a1947] text-white rounded-full py-4 font-bold mt-2 hover:bg-[#152b69] hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(10,25,71,0.6)] transition-all duration-300 active:scale-95 disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:shadow-none flex justify-center items-center gap-2">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><UserPlus className="w-5 h-5" /> Complete Registration</>}
              </button>
              
              <div className="text-center text-sm mt-3 font-medium">
                <button type="button" onClick={() => setMode("login")} className="text-gray-400 hover:text-[#0a1947] transition-colors flex items-center justify-center w-full gap-1">
                  Already have an account? <span className="text-[#0a1947] font-bold ml-1">Sign in</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}