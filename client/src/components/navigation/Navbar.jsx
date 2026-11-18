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
      setIsScrolled(window.scrollY > 15);
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
      {/* FLOATING CAPSULE CONTAINER */}
      <div className="sticky top-2.5 sm:top-3.5 z-40 w-full px-2.5 sm:px-5 lg:px-8 pointer-events-none transition-all duration-300">
        <header 
          className={`pointer-events-auto mx-auto max-w-6xl xl:max-w-7xl flex items-center justify-between rounded-full transition-all duration-300 ${
            isScrolled
              ? 'bg-[#152018]/94 backdrop-blur-xl border border-white/15 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.38)] px-2.5 sm:px-4 md:px-5 h-[56px] sm:h-[60px]'
              : 'bg-[#18261E]/90 backdrop-blur-lg border border-white/12 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.28)] px-2.5 sm:px-4 md:px-5 h-[58px] sm:h-[62px]'
          }`}
        >
          {/* 1. BRAND LOGO */}
          <Link 
            to="/" 
            className="flex items-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D99A38] rounded-full group"
            aria-label="RASAVANTA AI Homepage"
          >
            <div className="flex items-center bg-white/95 px-2.5 py-1 rounded-full border border-white/30 shadow-xs transition-transform duration-200 group-hover:scale-102">
              <img
                src="/brand/rasavanta-logo.jpg"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('.png')) {
                    e.currentTarget.src = '/brand/rasavanta-logo.png';
                  }
                }}
                alt="RASAVANTA AI"
                className="w-[110px] sm:w-[124px] h-6 sm:h-7 object-contain"
                style={{ aspectRatio: '965 / 641' }}
              />
            </div>
          </Link>

          {/* 2. MINIMAL DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
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
                    className={`relative px-3 py-1.5 text-[13px] font-medium tracking-normal rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-white/14 text-white font-semibold border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                        : 'text-white/70 hover:text-white hover:bg-white/8'
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
                    return `relative flex items-center gap-1.5 px-3 py-1.5 text-[13px] tracking-normal rounded-full transition-all duration-200 ${
                      active
                        ? 'bg-white/14 text-white font-semibold border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                        : link.highlight
                        ? 'text-white/90 hover:text-white hover:bg-white/8 font-medium'
                        : 'text-white/70 hover:text-white hover:bg-white/8 font-medium'
                    }`;
                  }}
                >
                  {({ isActive: navActive }) => {
                    const active = navActive && (!link.exact || !location.hash);
                    return (
                      <>
                        {link.highlight && (
                          <Sparkles className="h-3.5 w-3.5 text-[#D99A38]" />
                        )}
                        <span>{link.label}</span>

                        {link.badge && (
                          <span className="inline-flex items-center justify-center rounded-full text-[10px] font-bold px-1.5 py-0.2 leading-none bg-[#D99A38] text-white shadow-xs">
                            {link.badge}
                          </span>
                        )}

                        {link.isNew && !active && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#D97556]/30 text-[#E89E88] border border-[#D97556]/40 leading-none">
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

          {/* 3. RIGHT CONTROLS & GRADIENT-OUTLINED CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Quick Search Button */}
            <button
              onClick={() => navigate('/recipes')}
              className="hidden md:flex items-center gap-2 rounded-full bg-white/8 border border-white/12 h-9 px-3 text-xs text-white/70 hover:text-white hover:bg-white/15 hover:border-white/25 transition-all shadow-xs cursor-pointer"
              title="Search recipes"
              aria-label="Search recipes"
            >
              <Search className="h-3.5 w-3.5 text-white/70" />
              <span className="hidden xl:inline text-white/60">Search</span>
              <span className="hidden xl:inline text-[10px] bg-white/10 px-1.5 py-0.2 rounded text-white/50">⌘K</span>
            </button>

            {/* Dark Themed Language Selector */}
            <LanguageSelector isDark={true} />

            {/* Authentication States */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5 pl-1.5 border-l border-white/15">
                <Link
                  to="/dashboard"
                  title="Chef Dashboard"
                  className="flex items-center gap-2 rounded-full bg-white/10 h-8 sm:h-9 pl-1 pr-2.5 sm:pr-3 border border-white/15 hover:border-white/30 text-white transition-all group"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={user?.name || 'Chef'}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-white/90 max-w-[70px] sm:max-w-[85px] truncate group-hover:text-[#D99A38] transition-colors">
                    {user?.name || 'Chef'}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  title={t('nav.logout', 'Sign Out')}
                  aria-label={t('nav.logout', 'Sign Out')}
                  className="h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-white/8 border border-white/15 text-white/70 hover:text-[#D97556] hover:bg-white/15 transition-all cursor-pointer"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 pl-1.5 border-l border-white/15">
                <button
                  onClick={() => handleBrandedNav('/login')}
                  className="h-8 sm:h-9 px-3 rounded-full text-xs font-medium text-white/80 hover:text-white hover:bg-white/8 transition-colors cursor-pointer"
                >
                  {t('nav.login', 'Sign In')}
                </button>

                {/* GRADIENT OUTLINED CTA */}
                <button
                  onClick={() => handleBrandedNav('/register')}
                  className="relative p-[1.5px] rounded-full bg-gradient-to-r from-[#D99A38] via-[#E8B45E] to-[#A7B99A] hover:shadow-[0_0_18px_rgba(217,154,56,0.35)] transition-all duration-300 group cursor-pointer"
                >
                  <span className="flex items-center gap-1.5 rounded-full bg-[#18261E] px-3.5 sm:px-4 py-1.5 text-xs font-bold text-white group-hover:bg-[#223328] transition-all">
                    <span>{t('nav.register', 'Get Started')}</span>
                    <ArrowRight className="h-3 w-3 text-[#D99A38] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </button>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 flex items-center justify-center rounded-full bg-white/10 border border-white/15 text-white hover:bg-white/20 transition shadow-xs cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </header>
      </div>

      {/* MOBILE RESPONSIVE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
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
              className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-[#141F17] shadow-2xl flex flex-col justify-between p-5 border-l border-white/12 z-10 overflow-y-auto text-white"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/12">
                  <Link 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center"
                  >
                    <div className="bg-white/95 px-2.5 py-1 rounded-full border border-white/30">
                      <img
                        src="/brand/rasavanta-logo.jpg"
                        alt="RASAVANTA AI"
                        className="w-[110px] h-6 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/brand/rasavanta-logo.png';
                        }}
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                    className="h-8 w-8 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/recipes');
                  }}
                  className="w-full flex items-center gap-2.5 rounded-xl bg-white/8 px-3.5 py-2.5 border border-white/12 text-white/70 text-xs shadow-xs hover:border-white/30 transition text-left"
                >
                  <Search className="h-4 w-4 text-[#D99A38]" />
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
                          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                            isActive
                              ? 'bg-white/15 text-white font-semibold border border-white/10'
                              : 'text-white/70 hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`h-4 w-4 ${isActive ? 'text-[#D99A38]' : 'text-white/60'}`} />
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
                          return `flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                            active
                              ? 'bg-white/15 text-white font-semibold border border-white/10'
                              : 'text-white/70 hover:bg-white/8 hover:text-white'
                          }`;
                        }}
                      >
                        {({ isActive: navActive }) => {
                          const active = navActive && (!link.exact || !location.hash);
                          return (
                            <>
                              <div className="flex items-center gap-2.5">
                                <Icon className={`h-4 w-4 ${active ? 'text-[#D99A38]' : 'text-white/60'}`} />
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
              <div className="pt-4 border-t border-white/12 space-y-2.5">
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-[#E89E88] border border-white/15 shadow-xs"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out ({user?.name || 'Chef'})</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleBrandedNav('/login')}
                      className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white/90 border border-white/15 text-center shadow-xs hover:bg-white/15"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleBrandedNav('/register')}
                      className="relative p-[1.5px] rounded-full bg-gradient-to-r from-[#D99A38] via-[#E8B45E] to-[#A7B99A] text-center"
                    >
                      <span className="block rounded-full bg-[#18261E] px-3 py-1.5 text-xs font-bold text-white">
                        Get Started
                      </span>
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
