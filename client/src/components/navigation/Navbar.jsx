import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useRecipes } from '../../context/RecipeContext';
import { usePantry } from '../../context/PantryContext';
import { useNavigation } from '../../context/NavigationContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Sparkles, 
  UtensilsCrossed, 
  BookMarked, 
  Refrigerator, 
  Menu, 
  X, 
  LogOut, 
  Search,
  Info,
  Home as HomeIcon,
  ChefHat,
  ArrowRight,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { favorites } = useRecipes();
  const { stats } = usePantry();
  const { triggerBrandedTransition } = useNavigation();
  const shouldReduceMotion = useReducedMotion();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll for elevation and subtle blur shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Navigation Links
  const navLinks = [
    { to: '/', label: t('nav.home', 'Home'), icon: HomeIcon, exact: true },
    { to: '/recipes', label: t('nav.recipes', 'Explore'), icon: UtensilsCrossed },
    { to: '/ai-kitchen', label: t('nav.aiKitchen', 'AI Kitchen'), icon: Sparkles, highlight: true },
    { to: '/pantry', label: t('nav.smartPantry', 'Smart Pantry'), icon: Refrigerator, badge: stats.expiringSoon > 0 ? stats.expiringSoon : null },
    { to: '/meal-planner', label: t('nav.mealPlanner', 'Planner'), icon: BookMarked, badge: favorites.length > 0 ? favorites.length : null },
    { to: '/rasabot', label: t('nav.rasabot', 'RasaBot'), icon: Bot, isNew: true },
    { to: '/#about', label: t('nav.about', 'About'), icon: Info, isAnchor: true },
  ];

  const handleBrandedNav = (dest) => {
    setMobileMenuOpen(false);
    triggerBrandedTransition(dest);
  };

  const handleAnchorClick = (e, targetHash) => {
    if (location.pathname === '/') {
      e.preventDefault();
      setMobileMenuOpen(false);
      const element = document.querySelector(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setMobileMenuOpen(false);
      navigate(`/${targetHash}`);
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F0E5]/95 shadow-[0_4px_20px_-4px_rgba(36,75,57,0.07)] border-b border-[#A7B99A]/40 backdrop-blur-md'
            : 'bg-[#F5F0E5]/90 border-b border-[#A7B99A]/20 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-[68px]">
          
          {/* 1. BRAND LOGO */}
          <Link 
            to="/" 
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#244B39] rounded-xl py-1 group"
            aria-label="RASAVANTA AI Homepage"
          >
            <img
              src="/brand/rasavanta-logo.jpg"
              onError={(e) => {
                if (!e.currentTarget.src.endsWith('.png')) {
                  e.currentTarget.src = '/brand/rasavanta-logo.png';
                }
              }}
              alt="RASAVANTA AI"
              className="w-[136px] sm:w-[148px] h-10 object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              style={{ aspectRatio: '965 / 641' }}
            />
          </Link>

          {/* 2. DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isAnchor = link.isAnchor;
              const isActive = isAnchor
                ? location.pathname === '/' && location.hash === '#about'
                : link.exact
                ? location.pathname === '/' && !location.hash
                : location.pathname.startsWith(link.to);

              if (isAnchor) {
                return (
                  <a
                    key={link.label}
                    href={link.to}
                    onClick={(e) => handleAnchorClick(e, '#about')}
                    className={`relative px-3 py-1.5 text-[13px] font-semibold tracking-wide rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-[#244B39]/10 text-[#244B39] font-bold'
                        : 'text-[#303A32]/85 hover:text-[#244B39] hover:bg-white/60'
                    }`}
                  >
                    <span>{link.label}</span>
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.exact}
                  className={({ isActive: navActive }) => {
                    const active = navActive && (!link.exact || !location.hash);
                    return `relative flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-semibold tracking-wide rounded-full transition-all duration-200 ${
                      active
                        ? 'bg-[#244B39] text-white shadow-xs font-bold'
                        : link.highlight
                        ? 'text-[#244B39] font-bold hover:bg-[#244B39]/8'
                        : 'text-[#303A32]/85 hover:text-[#244B39] hover:bg-white/60'
                    }`;
                  }}
                >
                  {({ isActive: navActive }) => {
                    const active = navActive && (!link.exact || !location.hash);
                    const Icon = link.icon;
                    return (
                      <>
                        {link.highlight && (
                          <Sparkles className={`h-3.5 w-3.5 ${active ? 'text-[#D99A38]' : 'text-[#D99A38]'}`} />
                        )}
                        <span>{link.label}</span>

                        {link.badge && (
                          <span className={`inline-flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 py-0.2 leading-none ${
                            active ? 'bg-[#D99A38] text-white' : 'bg-[#D99A38] text-white shadow-xs'
                          }`}>
                            {link.badge}
                          </span>
                        )}

                        {link.isNew && !active && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#D97556]/15 text-[#D97556] leading-none">
                            NEW
                          </span>
                        )}
                      </>
                    );
                  }}
                </NavLink>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Quick Search Button */}
            <button
              onClick={() => navigate('/recipes')}
              className="hidden md:flex items-center gap-2 rounded-full bg-white/80 border border-[#A7B99A]/40 h-9 px-3 text-xs font-semibold text-[#566459] hover:border-[#244B39] hover:text-[#244B39] transition-all shadow-xs cursor-pointer"
              title="Search recipes"
              aria-label="Search recipes"
            >
              <Search className="h-3.5 w-3.5 text-[#566459]" />
              <span className="hidden xl:inline">Search...</span>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Authentication States */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 pl-2 border-l border-[#A7B99A]/30">
                <Link
                  to="/dashboard"
                  title="Chef Dashboard"
                  className="flex items-center gap-2 rounded-full bg-white/90 h-9 pl-1.5 pr-3 border border-[#A7B99A]/40 hover:border-[#244B39] transition shadow-xs group"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name || 'Chef'}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-bold text-[#244B39] max-w-[80px] truncate group-hover:text-[#D99A38] transition-colors">
                    {user?.name || 'Chef'}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  title={t('nav.logout', 'Sign Out')}
                  aria-label={t('nav.logout', 'Sign Out')}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-white/80 border border-[#A7B99A]/40 text-[#566459] hover:text-[#D97556] hover:border-[#D97556]/40 transition shadow-xs cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#A7B99A]/30">
                <button
                  onClick={() => handleBrandedNav('/login')}
                  className="h-9 px-3.5 rounded-full text-xs font-semibold text-[#244B39] hover:text-[#D99A38] hover:bg-white/70 transition cursor-pointer"
                >
                  {t('nav.login', 'Sign In')}
                </button>

                <button
                  onClick={() => handleBrandedNav('/register')}
                  className="h-9 px-4 rounded-full bg-[#244B39] text-xs font-bold text-white shadow-xs hover:bg-[#193527] transition-all cursor-pointer"
                >
                  {t('nav.register', 'Get Started')}
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl bg-white/80 border border-[#A7B99A]/40 text-[#244B39] hover:bg-white transition shadow-xs cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', damping: 28, stiffness: 280 }
              }
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#F5F0E5] shadow-2xl flex flex-col justify-between p-5 border-l border-[#A7B99A]/40 z-10 overflow-y-auto"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#A7B99A]/30">
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center"
                  >
                    <img
                      src="/brand/rasavanta-logo.jpg"
                      alt="RASAVANTA AI"
                      className="w-[130px] h-9 object-contain"
                      onError={(e) => {
                        e.currentTarget.src = '/brand/rasavanta-logo.png';
                      }}
                    />
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="h-8 w-8 rounded-full bg-white/80 border border-[#A7B99A]/40 flex items-center justify-center text-[#244B39] hover:bg-white transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/recipes');
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl bg-white/90 px-3.5 py-2.5 border border-[#A7B99A]/40 text-[#566459] text-xs shadow-xs hover:border-[#244B39] transition text-left"
                >
                  <Search className="h-4 w-4 text-[#244B39]" />
                  <span>Search 500+ recipes, spices...</span>
                </button>

                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isAnchor = link.isAnchor;
                    const isActive = isAnchor
                      ? location.pathname === '/' && location.hash === '#about'
                      : link.exact
                      ? location.pathname === '/' && !location.hash
                      : location.pathname.startsWith(link.to);

                    if (isAnchor) {
                      return (
                        <a
                          key={link.label}
                          href={link.to}
                          onClick={(e) => handleAnchorClick(e, '#about')}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                            isActive
                              ? 'bg-[#244B39] text-white shadow-xs'
                              : 'text-[#303A32] hover:bg-white/80'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`h-4 w-4 ${isActive ? 'text-[#D99A38]' : 'text-[#244B39]'}`} />
                            <span>{link.label}</span>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.exact}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive: navActive }) => {
                          const active = navActive && (!link.exact || !location.hash);
                          return `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${
                            active
                              ? 'bg-[#244B39] text-white shadow-xs'
                              : 'text-[#303A32] hover:bg-white/80'
                          }`;
                        }}
                      >
                        {({ isActive: navActive }) => {
                          const active = navActive && (!link.exact || !location.hash);
                          return (
                            <>
                              <div className="flex items-center gap-2.5">
                                <Icon className={`h-4 w-4 ${active ? 'text-[#D99A38]' : 'text-[#244B39]'}`} />
                                <span>{link.label}</span>
                              </div>
                              {link.badge && (
                                <span className="rounded-full bg-[#D99A38] text-white text-[10px] font-bold px-2 py-0.5">
                                  {link.badge}
                                </span>
                              )}
                            </>
                          );
                        }}
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Auth Buttons in Mobile Menu */}
              <div className="pt-4 border-t border-[#A7B99A]/30 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#D97556] border border-[#A7B99A]/40 shadow-xs"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out ({user?.name || 'Chef'})</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleBrandedNav('/login')}
                      className="rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#244B39] border border-[#A7B99A]/40 text-center shadow-xs"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleBrandedNav('/register')}
                      className="rounded-xl bg-[#244B39] px-3 py-2 text-xs font-bold text-white text-center shadow-xs"
                    >
                      Get Started
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
