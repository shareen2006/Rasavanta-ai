import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, Heart, Leaf, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#A7B99A]/40 bg-[#244B39] text-[#F5F0E5] pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F5F0E5]/15">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block bg-[#F5F0E5] p-2.5 rounded-2xl shadow-sm hover:opacity-95 transition">
              <img
                src="/brand/rasavanta-logo.png"
                alt="RASAVANTA AI"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-[#F5F0E5]/80 leading-relaxed max-w-md pt-2">
              {t('footer.about')}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#D99A38] font-medium">
              <span className="flex items-center gap-1">
                <Leaf className="h-3.5 w-3.5 text-[#A7B99A]" /> Rasa (రస / रस) — Essence & Taste
              </span>
              <span>•</span>
              <span>Vanta (వంట) — The Art of Cooking</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D99A38]">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F0E5]/80">
              <li>
                <Link to="/recipes" className="hover:text-white transition flex items-center gap-1">
                  {t('nav.recipes')} <ArrowUpRight className="h-3 w-3 opacity-60" />
                </Link>
              </li>
              <li>
                <Link to="/ai-kitchen" className="hover:text-white transition flex items-center gap-1">
                  {t('nav.aiKitchen')} <Sparkles className="h-3 w-3 text-[#D99A38]" />
                </Link>
              </li>
              <li>
                <Link to="/meal-planner" className="hover:text-white transition">
                  MealCraft Planner
                </Link>
              </li>
              <li>
                <Link to="/basket" className="hover:text-white transition">
                  Smart Basket™
                </Link>
              </li>
              <li>
                <Link to="/nutrisense" className="hover:text-white transition">
                  NutriSense™ AI
                </Link>
              </li>
              <li>
                <Link to="/rasabot" className="hover:text-white transition">
                  RasaBot AI
                </Link>
              </li>
              <li>
                <Link to="/pantry" className="hover:text-white transition">
                  {t('nav.smartPantry')}
                </Link>
              </li>
              <li>
                <Link to="/cookbook" className="hover:text-white transition">
                  {t('nav.myCookbook')}
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition">
                  {t('nav.dashboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Cuisines */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D99A38]">
              {t('footer.cuisines')}
            </h4>
            <ul className="space-y-2 text-sm text-[#F5F0E5]/80">
              <li><Link to="/recipes?cuisine=Andhra" className="hover:text-white transition">Andhra & Telangana</Link></li>
              <li><Link to="/recipes?cuisine=Hyderabadi" className="hover:text-white transition">Hyderabadi Royal</Link></li>
              <li><Link to="/recipes?cuisine=Chettinad" className="hover:text-white transition">Chettinad Pepper</Link></li>
              <li><Link to="/recipes?cuisine=Kerala" className="hover:text-white transition">Kerala Sadya</Link></li>
              <li><Link to="/recipes?cuisine=Punjabi" className="hover:text-white transition">Punjabi Makhani</Link></li>
              <li><Link to="/recipes?cuisine=Bengali" className="hover:text-white transition">Bengali Shorshe</Link></li>
            </ul>
          </div>

          {/* Zero Waste Initiative */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D99A38]">
              {t('footer.zeroWaste')}
            </h4>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#A7B99A]">
                <ShieldCheck className="h-4 w-4" /> Sustainable Kitchens
              </div>
              <p className="text-xs text-[#F5F0E5]/80 leading-relaxed">
                Smart pantry tracking and dynamic ingredient substitutions empower your kitchen to prevent food waste and save grocery expenditure.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E5]/60">
          <div>
            {t('footer.copyright')}
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              Crafted with <Heart className="h-3.5 w-3.5 text-[#D97556] fill-[#D97556]" /> for Home Cooks Everywhere
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
