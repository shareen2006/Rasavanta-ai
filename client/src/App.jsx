import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/navigation/Footer';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { RecipeDetails } from './pages/RecipeDetails';
import { AIKitchen } from './pages/AIKitchen';
import { SmartPantry } from './pages/SmartPantry';
import { MyCookbook } from './pages/MyCookbook';
import { MealPlanner } from './pages/MealPlanner';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RasaBotPage } from './pages/RasaBotPage';
import { SmartBasketPage } from './pages/SmartBasketPage';
import { NutriSensePage } from './pages/NutriSensePage';
import { FloatingRasaBotLauncher } from './components/rasabot/FloatingRasaBotLauncher';

// Scroll to top upon navigating routes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const App = () => {
  const { pathname } = useLocation();
  const isAuthPage = pathname === '/login' || pathname === '/register';

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F0E5] text-[#303A32] selection:bg-[#D99A38]/30 selection:text-[#244B39]">
      <ScrollToTop />
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Explore />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/ai-kitchen" element={<AIKitchen />} />
          <Route path="/pantry" element={<SmartPantry />} />
          <Route path="/cookbook" element={<MyCookbook />} />
          <Route path="/meal-planner" element={<MealPlanner />} />
          <Route path="/basket" element={<SmartBasketPage />} />
          <Route path="/smart-basket" element={<SmartBasketPage />} />
          <Route path="/nutrisense" element={<NutriSensePage />} />
          <Route path="/rasabot" element={<RasaBotPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <FloatingRasaBotLauncher />
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
