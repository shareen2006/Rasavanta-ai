import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '../../context/NavigationContext';
import { 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  ShieldCheck, 
  Leaf, 
  Globe2, 
  X,
  Loader2
} from 'lucide-react';
import toast from 'react-hot-toast';

export const AuthPage = ({ initialMode = 'login' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { triggerBrandedTransition, isTransitioning } = useNavigation();
  const shouldReduceMotion = useReducedMotion();

  // Determine active mode from URL pathname or initialMode
  const urlMode = location.pathname === '/register' ? 'register' : 'login';
  const [mode, setMode] = useState(urlMode || initialMode);
  const [direction, setDirection] = useState(0); // 1 = to register, -1 = to login

  // Brand Intro Animation on direct open (1.2–1.5s total) if not already transitioned via BrandLoader
  const [introActive, setIntroActive] = useState(() => !shouldReduceMotion && !isTransitioning);

  useEffect(() => {
    if (introActive) {
      const timer = setTimeout(() => {
        setIntroActive(false);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [introActive]);

  // Keep mode in sync with React Router location for browser back/forward buttons
  useEffect(() => {
    const currentMode = location.pathname === '/register' ? 'register' : 'login';
    if (currentMode !== mode) {
      setDirection(currentMode === 'register' ? 1 : -1);
      setMode(currentMode);
      setLoginError('');
      setRegError('');
    }
  }, [location.pathname]);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [isRegLoading, setIsRegLoading] = useState(false);
  const [regError, setRegError] = useState('');

  // Forgot Password Modal State
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Switch mode with smooth route and state synchronization
  const handleSwitchMode = (newMode) => {
    if (newMode === mode) return;
    setDirection(newMode === 'register' ? 1 : -1);
    setMode(newMode);
    setLoginError('');
    setRegError('');
    navigate(newMode === 'login' ? '/login' : '/register', { replace: false });
  };

  // Password strength calculation for registration
  const passwordStrength = useMemo(() => {
    if (!regPassword) return { score: 0, label: '', color: 'bg-gray-200', text: 'text-gray-400' };
    let score = 0;
    if (regPassword.length >= 6) score += 1;
    if (regPassword.length >= 10) score += 1;
    if (/[A-Z]/.test(regPassword)) score += 1;
    if (/[0-9]/.test(regPassword)) score += 1;
    if (/[^A-Za-z0-9]/.test(regPassword)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-rose-500', text: 'text-rose-600' };
    if (score <= 3) return { score: 2, label: 'Fair', color: 'bg-[#D99A38]', text: 'text-[#D99A38]' };
    if (score <= 4) return { score: 3, label: 'Good', color: 'bg-[#A7B99A]', text: 'text-[#244B39]' };
    return { score: 4, label: 'Strong', color: 'bg-emerald-600', text: 'text-emerald-700' };
  }, [regPassword]);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }

    setIsLoginLoading(true);
    try {
      await login(loginEmail.trim(), loginPassword);
      triggerBrandedTransition('/dashboard');
    } catch (err) {
      setLoginError(err.message || 'Invalid credentials. Please verify and try again.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Handle Demo Chef Login
  const handleDemoLogin = async () => {
    setIsLoginLoading(true);
    setLoginError('');
    try {
      await login('chef.rasavanta@example.com', 'TasteIntelligence2026');
      triggerBrandedTransition('/dashboard');
    } catch (err) {
      setLoginError(err.message || 'Demo login failed.');
    } finally {
      setIsLoginLoading(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegError('');

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim() || !regConfirmPassword.trim()) {
      setRegError('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(regEmail.trim())) {
      setRegError('Please enter a valid email address.');
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must contain at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match. Please verify.');
      return;
    }

    if (!termsAgreed) {
      setRegError('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setIsRegLoading(true);
    try {
      await register(regName.trim(), regEmail.trim(), regPassword);
      triggerBrandedTransition('/dashboard');
    } catch (err) {
      setRegError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsRegLoading(false);
    }
  };

  // Handle Google Auth Option
  const handleGoogleAuth = () => {
    toast('Google sign-in initialized. Connecting to secure OAuth gateway...', {
      icon: '🌐',
      style: { background: '#244B39', color: '#FFFFFF' }
    });
  };

  // Handle Forgot Password Submit
  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail.trim())) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setForgotSubmitted(true);
    toast.success('Password reset instructions sent to your email!');
  };

  // Framer Motion Animation Variants
  const formContainerVariants = {
    hidden: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : (dir > 0 ? 24 : -24),
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05,
        delayChildren: shouldReduceMotion ? 0 : 0.03,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : (dir > 0 ? -24 : 24),
      transition: { duration: 0.2, ease: 'easeIn' },
    }),
  };

  const formItemSlideUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const formItemFade = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  const formItemScale = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[#F5F0E5] text-[#303A32] selection:bg-[#D99A38]/30 selection:text-[#244B39] overflow-x-hidden">
      
      {/* 0. BRAND INTRO OVERLAY (1.2–1.5s on direct open) */}
      <AnimatePresence>
        {introActive && (
          <motion.div
            key="brand-intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F0E5]"
          >
            {/* Logo scaling smoothly from 0.85 to 1.0 */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mb-6 flex flex-col items-center"
            >
              <img
                src="/brand/rasavanta-logo.jpg"
                alt="RASAVANTA AI"
                className="h-28 sm:h-36 w-auto object-contain max-w-[85vw]"
                onError={(e) => {
                  e.currentTarget.src = '/brand/rasavanta-logo.png';
                }}
              />
            </motion.div>

            {/* Thin gold progress indicator bar */}
            <div className="w-36 sm:w-48 h-0.5 bg-[#D99A38]/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, delay: 0.1, ease: 'easeInOut' }}
                className="h-full bg-[#D99A38] origin-left rounded-full shadow-[0_0_8px_rgba(217,154,56,0.6)]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. SUBTLE BRANDED BACKGROUND MOTION (Organic warmth matching homepage) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Soft Turmeric Gold Ambient Orb (Top-Right) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.15, 1],
                  x: [0, 20, 0],
                  y: [0, -15, 0],
                  opacity: [0.18, 0.28, 0.18],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[#D99A38]/25 blur-3xl"
        />

        {/* Soft Forest Green Depth Orb (Bottom-Left) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  x: [0, -15, 0],
                  y: [0, 20, 0],
                  opacity: [0.12, 0.22, 0.12],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-36 -left-36 w-96 sm:w-[550px] h-96 sm:h-[550px] rounded-full bg-[#244B39]/20 blur-3xl"
        />

        {/* Gentle Sage Green Ambient Mist (Center-Right) */}
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.15, 0.25, 0.15],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#A7B99A]/20 blur-3xl"
        />

        {/* Subtle Organic Tactile Dot Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: 'radial-gradient(#244B39 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* 2. TOP NAV HEADER */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-3 flex items-center justify-between">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-[#A7B99A]/40 px-4 py-2 text-xs font-semibold text-[#244B39] shadow-xs backdrop-blur-xs hover:bg-white hover:border-[#244B39] hover:shadow-sm transition-all"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-[#D99A38]" />
          <span>Back to Home</span>
        </Link>

        <div className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/60 border border-[#A7B99A]/30 px-3.5 py-1.5 text-[11px] font-medium text-[#566459] backdrop-blur-xs">
          <Sparkles className="h-3 w-3 text-[#D99A38]" />
          <span>Multilingual Culinary Intelligence</span>
        </div>
      </header>

      {/* 3. CENTERED AUTHENTICATION CARD SANCTUARY */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-center items-center px-4 py-6 sm:py-10">
        <div className="w-full max-w-[500px]">
          
          {/* Main Elevated Brand Card */}
          <div className="relative rounded-[32px] bg-white/95 backdrop-blur-md border border-[#A7B99A]/40 shadow-[0_24px_64px_-16px_rgba(36,75,57,0.12)] p-6 sm:p-9 transition-all">
            
            {/* Top Turmeric Accent Flourish */}
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#D99A38] to-transparent mx-auto rounded-full mb-5" />

            {/* Official Logo (Centered & Crisp) */}
            <div className="text-center mb-5">
              <Link to="/" className="inline-block hover:opacity-95 transition group">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  src="/brand/rasavanta-logo.jpg"
                  alt="RASAVANTA AI Logo"
                  className="h-16 sm:h-20 w-auto object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.src = '/brand/rasavanta-logo.png';
                  }}
                />
              </Link>
              <p className="text-[11px] font-medium text-[#566459] tracking-wider uppercase mt-1">
                Rooted in Taste. Powered by Intelligence.
              </p>
            </div>

            {/* Mode Switcher Pill with Animated Highlight Indicator */}
            <div className="relative flex items-center p-1 rounded-full bg-[#F5F0E5] border border-[#A7B99A]/40 shadow-xs mb-6">
              <button
                type="button"
                onClick={() => handleSwitchMode('login')}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors duration-200 text-center ${
                  mode === 'login'
                    ? 'text-white'
                    : 'text-[#566459] hover:text-[#244B39]'
                }`}
              >
                Sign In
                {mode === 'login' && (
                  <motion.div
                    layoutId="auth-mode-tab-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[#244B39] rounded-full -z-10 shadow-sm"
                  />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleSwitchMode('register')}
                className={`relative z-10 flex-1 py-2 text-xs font-bold rounded-full transition-colors duration-200 text-center ${
                  mode === 'register'
                    ? 'text-white'
                    : 'text-[#566459] hover:text-[#244B39]'
                }`}
              >
                Create Account
                {mode === 'register' && (
                  <motion.div
                    layoutId="auth-mode-tab-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-[#244B39] rounded-full -z-10 shadow-sm"
                  />
                )}
              </button>
            </div>

            {/* Animated Form Container */}
            <AnimatePresence mode="wait" custom={direction}>
              {mode === 'login' ? (
                /* ========================================================= */
                /* MODE A: LOGIN FORM                                        */
                /* ========================================================= */
                <motion.div
                  key="login-card-view"
                  variants={formContainerVariants}
                  custom={direction}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-5"
                >
                  {/* Heading & Subtitle */}
                  <div className="text-center space-y-1">
                    <motion.h2 variants={formItemSlideUp} className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] tracking-tight">
                      Welcome Back
                    </motion.h2>
                    <motion.p variants={formItemFade} className="text-xs sm:text-sm text-[#566459]">
                      Sign in to access your AI Kitchen and Smart Pantry.
                    </motion.p>
                  </div>

                  {/* One-Click Fast Demo Chef Access */}
                  <motion.div variants={formItemSlideUp}>
                    <motion.button
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      type="button"
                      onClick={handleDemoLogin}
                      disabled={isLoginLoading}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-amber-50/90 border border-amber-300/80 py-2.5 px-3.5 text-xs font-bold text-amber-900 hover:bg-amber-100/80 transition shadow-xs cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
                      <span>One-Click Demo Chef Login (Instant Access)</span>
                    </motion.button>
                  </motion.div>

                  {/* Error Banner with Slide Animation */}
                  <AnimatePresence>
                    {loginError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center"
                      >
                        {loginError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Login Form Fields */}
                  <form onSubmit={handleLoginSubmit} className="space-y-3.5">
                    {/* Email Input */}
                    <motion.div variants={formItemSlideUp}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                        Email Address
                      </label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type="email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          placeholder="chef@rasavanta.ai"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    {/* Password Input */}
                    <motion.div variants={formItemSlideUp}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-[#303A32]">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setForgotPasswordOpen(true)}
                          className="text-xs font-semibold text-[#D99A38] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type={showLoginPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-10 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)}
                          aria-label="Toggle password visibility"
                          className="absolute right-3.5 top-3 text-[#566459] hover:text-[#244B39] transition cursor-pointer"
                        >
                          {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>

                    {/* Remember Me Checkbox */}
                    <motion.div variants={formItemFade} className="flex items-center gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="h-4 w-4 rounded-md border-[#A7B99A] text-[#244B39] focus:ring-[#244B39] accent-[#244B39] cursor-pointer"
                      />
                      <label htmlFor="rememberMe" className="text-xs font-medium text-[#566459] cursor-pointer">
                        Remember me on this browser
                      </label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={formItemScale} className="flex justify-center">
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        type="submit"
                        disabled={isLoginLoading}
                        className="w-fit min-w-fit px-7 sm:px-8 h-[46px] flex items-center justify-center gap-2.5 rounded-2xl bg-[#244B39] text-sm font-bold text-white shadow-md hover:bg-[#193527] hover:shadow-lg transition-all duration-200 disabled:opacity-50 group cursor-pointer"
                      >
                        {isLoginLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[#D99A38]" />
                            <span>Signing In...</span>
                          </div>
                        ) : (
                          <>
                            <span>Sign In to Rasavanta</span>
                            <ArrowRight className="h-4 w-4 text-[#D99A38] transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* Divider */}
                  <motion.div variants={formItemFade} className="relative flex items-center justify-center pt-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#A7B99A]/30" />
                    </div>
                    <span className="relative bg-white px-3 text-[11px] font-semibold text-[#566459] uppercase tracking-wider">
                      Or continue with
                    </span>
                  </motion.div>

                  {/* Social Login */}
                  <motion.div variants={formItemFade}>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-white border border-[#A7B99A]/40 py-2.5 px-4 text-xs font-bold text-[#303A32] hover:bg-[#FAF8F2] hover:border-[#244B39] transition shadow-xs cursor-pointer"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Continue with Google</span>
                    </button>
                  </motion.div>

                  {/* Footer Prompt */}
                  <motion.div variants={formItemFade} className="text-center pt-1">
                    <p className="text-xs text-[#566459]">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('register')}
                        className="font-bold text-[#244B39] hover:text-[#D99A38] underline decoration-[#D99A38]/50 underline-offset-4 transition cursor-pointer"
                      >
                        Create Account
                      </button>
                    </p>
                  </motion.div>
                </motion.div>
              ) : (
                /* ========================================================= */
                /* MODE B: SIGN UP FORM                                      */
                /* ========================================================= */
                <motion.div
                  key="register-card-view"
                  variants={formContainerVariants}
                  custom={direction}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-4"
                >
                  {/* Heading & Subtitle */}
                  <div className="text-center space-y-1">
                    <motion.h2 variants={formItemSlideUp} className="font-serif text-2xl sm:text-3xl font-bold text-[#244B39] tracking-tight">
                      Create Your Account
                    </motion.h2>
                    <motion.p variants={formItemFade} className="text-xs sm:text-sm text-[#566459]">
                      Start your intelligent cooking journey with RASAVANTA AI.
                    </motion.p>
                  </div>

                  {/* Error Banner with Slide Animation */}
                  <AnimatePresence>
                    {regError && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center"
                      >
                        {regError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Register Form Fields */}
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    {/* Full Name */}
                    <motion.div variants={formItemSlideUp}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                        Full Name
                      </label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="Ananya Sharma"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    {/* Email Address */}
                    <motion.div variants={formItemSlideUp}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                        Email Address
                      </label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type="email"
                          required
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="ananya@example.com"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                      </div>
                    </motion.div>

                    {/* Password & Strength Meter */}
                    <motion.div variants={formItemSlideUp}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                        Password
                      </label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type={showRegPassword ? 'text' : 'password'}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-10 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          aria-label="Toggle password visibility"
                          className="absolute right-3.5 top-3 text-[#566459] hover:text-[#244B39] transition cursor-pointer"
                        >
                          {showRegPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>

                      {/* Dynamic Password Strength Indicator Bar */}
                      {regPassword && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-1.5 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="text-[#566459]">Password Strength</span>
                            <span className={passwordStrength.text}>{passwordStrength.label}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 h-1.5 w-full">
                            {[1, 2, 3, 4].map((step) => (
                              <div
                                key={step}
                                className={`rounded-full transition-all duration-300 ${
                                  step <= passwordStrength.score ? passwordStrength.color : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Confirm Password */}
                    <motion.div variants={formItemSlideUp}>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                        Confirm Password
                      </label>
                      <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                        <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                        <input
                          type={showRegConfirm ? 'text' : 'password'}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Repeat your password"
                          className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-10 text-sm text-[#303A32] placeholder:text-[#566459]/50 focus:bg-white focus:outline-none focus:border-[#244B39] transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirm(!showRegConfirm)}
                          aria-label="Toggle confirm password visibility"
                          className="absolute right-3.5 top-3 text-[#566459] hover:text-[#244B39] transition cursor-pointer"
                        >
                          {showRegConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>

                    {/* Terms & Privacy Consent */}
                    <motion.div variants={formItemFade} className="flex items-start gap-2 pt-0.5">
                      <input
                        type="checkbox"
                        id="termsAgreed"
                        required
                        checked={termsAgreed}
                        onChange={(e) => setTermsAgreed(e.target.checked)}
                        className="mt-0.5 h-4 w-4 rounded-md border-[#A7B99A] text-[#244B39] focus:ring-[#244B39] accent-[#244B39] cursor-pointer"
                      />
                      <label htmlFor="termsAgreed" className="text-xs text-[#566459] leading-tight cursor-pointer">
                        I agree to the{' '}
                        <span className="font-bold text-[#244B39] hover:underline">Terms of Service</span> and{' '}
                        <span className="font-bold text-[#244B39] hover:underline">Privacy Policy</span>.
                      </label>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={formItemScale}>
                      <motion.button
                        whileHover={{ y: -2, scale: 1.01 }}
                        whileTap={{ scale: 0.985 }}
                        type="submit"
                        disabled={isRegLoading}
                        className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#244B39] py-3 text-sm font-bold text-white shadow-md hover:bg-[#193527] hover:shadow-lg transition-all duration-200 disabled:opacity-50 group cursor-pointer"
                      >
                        {isRegLoading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-[#D99A38]" />
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <>
                            <span>Create Account</span>
                            <ArrowRight className="h-4 w-4 text-[#D99A38] transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* Google Sign Up */}
                  <motion.div variants={formItemFade}>
                    <button
                      type="button"
                      onClick={handleGoogleAuth}
                      className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-white border border-[#A7B99A]/40 py-2.5 px-4 text-xs font-bold text-[#303A32] hover:bg-[#FAF8F2] hover:border-[#244B39] transition shadow-xs cursor-pointer"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span>Sign up with Google</span>
                    </button>
                  </motion.div>

                  {/* Footer Prompt */}
                  <motion.div variants={formItemFade} className="text-center pt-1">
                    <p className="text-xs text-[#566459]">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => handleSwitchMode('login')}
                        className="font-bold text-[#244B39] hover:text-[#D99A38] underline decoration-[#D99A38]/50 underline-offset-4 transition cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4. BOTTOM TRUST BADGES (Centered, Elegant, Heritage-focused) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] text-[#566459] font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-[#244B39]" />
              <span>256-bit Secure</span>
            </span>
            <span className="h-3 w-px bg-[#A7B99A]/40" />
            <span className="flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5 text-[#244B39]" />
              <span>Zero-Waste AI</span>
            </span>
            <span className="h-3 w-px bg-[#A7B99A]/40" />
            <span className="flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5 text-[#D99A38]" />
              <span>9 Indian Languages</span>
            </span>
          </div>
        </div>
      </main>

      {/* 5. BOTTOM MINIMAL FOOTER */}
      <footer className="relative z-10 w-full text-center py-4 text-[11px] text-[#566459]/70">
        © 2026 RASAVANTA AI Platform. All rights reserved.
      </footer>

      {/* 6. FORGOT PASSWORD MODAL */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#A7B99A]/40 space-y-5"
            >
              <button
                onClick={() => {
                  setForgotPasswordOpen(false);
                  setForgotSubmitted(false);
                }}
                className="absolute right-5 top-5 rounded-full p-1 text-[#566459] hover:bg-gray-100 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#244B39]">
                  Reset Your Password
                </h3>
                <p className="text-xs text-[#566459]">
                  Enter your registered email address and we'll send you instructions to reset your password.
                </p>
              </div>

              {forgotSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
                  <p className="text-xs font-bold text-emerald-800">
                    Reset link has been dispatched!
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Please check your inbox (and spam folder) for further instructions.
                  </p>
                  <button
                    onClick={() => {
                      setForgotPasswordOpen(false);
                      setForgotSubmitted(false);
                    }}
                    className="mt-2 text-xs font-bold text-[#244B39] underline cursor-pointer"
                  >
                    Return to Login
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#303A32] mb-1">
                      Email Address
                    </label>
                    <div className="relative group focus-within:ring-2 focus-within:ring-[#D99A38]/30 rounded-2xl transition-all">
                      <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#566459] group-focus-within:text-[#D99A38] transition-colors duration-200" />
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="chef@rasavanta.ai"
                        className="w-full rounded-2xl border border-[#A7B99A]/40 bg-[#FAF8F2] py-2.5 pl-10 pr-4 text-sm text-[#303A32] focus:bg-white focus:outline-none focus:border-[#244B39] transition-all"
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#244B39] py-2.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#193527] transition cursor-pointer"
                  >
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="h-4 w-4 text-[#D99A38]" />
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;