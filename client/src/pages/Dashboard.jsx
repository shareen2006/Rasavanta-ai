import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { usePantry } from '../context/PantryContext';
import { useRecipes } from '../context/RecipeContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  BarChart, 
  Bar 
} from 'recharts';
import { 
  LayoutDashboard, 
  Flame, 
  Sparkles, 
  Refrigerator, 
  Leaf, 
  AlertCircle,
  Calendar,
  ChefHat,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { stats: pantryStats, items: pantryItems } = usePantry();
  const { savedRecipes, favorites } = useRecipes();

  // Chart 1: Macro distribution (Donut)
  const macroData = [
    { name: 'Carbohydrates', value: 50, color: '#D99A38' },
    { name: 'Protein', value: 25, color: '#244B39' },
    { name: 'Healthy Fats', value: 15, color: '#D97556' },
    { name: 'Dietary Fiber', value: 10, color: '#A7B99A' }
  ];

  // Chart 2: Weekly calorie and protein intake trends
  const weeklyTrendsData = [
    { day: 'Mon', calories: 1850, protein: 68 },
    { day: 'Tue', calories: 2100, protein: 75 },
    { day: 'Wed', calories: 1950, protein: 72 },
    { day: 'Thu', calories: 2200, protein: 84 },
    { day: 'Fri', calories: 2050, protein: 70 },
    { day: 'Sat', calories: 2400, protein: 90 },
    { day: 'Sun', calories: 2150, protein: 82 }
  ];

  // Chart 3: Micronutrient Target vs Actual (Bar)
  const nutrientComparisonData = [
    { nutrient: 'Iron', actual: 85, target: 100 },
    { nutrient: 'Calcium', actual: 92, target: 100 },
    { nutrient: 'Vitamin C', actual: 110, target: 100 },
    { nutrient: 'Potassium', actual: 78, target: 100 },
    { nutrient: 'Magnesium', actual: 95, target: 100 }
  ];

  // Chart 4: Pantry Expiry Health Status
  const pantryStatusData = [
    { name: 'Good Condition', value: pantryStats.fresh || 6, color: '#10B981' },
    { name: 'Expiring Soon', value: pantryStats.expiringSoon || 3, color: '#D99A38' },
    { name: 'Expired', value: pantryStats.expired || 1, color: '#D97556' }
  ];

  // Chart 5: Weekly cooking sessions (Bar)
  const cookingActivityData = [
    { day: 'Mon', sessions: 2 },
    { day: 'Tue', sessions: 1 },
    { day: 'Wed', sessions: 2 },
    { day: 'Thu', sessions: 3 },
    { day: 'Fri', sessions: 1 },
    { day: 'Sat', sessions: 4 },
    { day: 'Sun', sessions: 3 }
  ];

  return (
    <div className="min-h-screen bg-[#F5F0E5] py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Welcome */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#244B39] text-[#D99A38] px-3.5 py-1 text-xs font-bold shadow-xs mb-2">
              <LayoutDashboard className="h-3.5 w-3.5" /> Culinary Analytics Hub
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#244B39]">
              {t('dashboard.welcome')}
            </h1>
            <p className="text-xs sm:text-sm text-[#566459] mt-1">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/ai-kitchen"
              className="rounded-full bg-[#244B39] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#193527] transition flex items-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-[#D99A38]" />
              <span>Launch RasaGen</span>
            </Link>
          </div>
        </div>

        {/* Clear Demo Notice */}
        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4 border border-amber-200 text-xs text-amber-900 shadow-xs">
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0" />
          <div>
            <span className="font-bold">Sample Demonstration Data:</span> {t('dashboard.sampleNotice')}
          </div>
        </div>

        {/* Top 4 KPI Highlight Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('dashboard.statCookingDays')}
              </span>
              <Calendar className="h-4 w-4 text-[#244B39]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#244B39] mt-2">
              5 / 7
            </div>
            <div className="text-[11px] text-[#A7B99A] mt-1">71% consistency rate</div>
          </div>

          <div className="rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('dashboard.statRecipesTried')}
              </span>
              <ChefHat className="h-4 w-4 text-[#D99A38]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#D99A38] mt-2">
              16 Recipes
            </div>
            <div className="text-[11px] text-[#566459] mt-1">Across 6 regional cuisines</div>
          </div>

          <div className="rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('dashboard.statPantryHealth')}
              </span>
              <Refrigerator className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="font-serif text-3xl font-bold text-emerald-700 mt-2">
              92%
            </div>
            <div className="text-[11px] text-emerald-600 mt-1">Low spoilage risk</div>
          </div>

          <div className="rounded-3xl bg-white p-6 border border-[#A7B99A]/30 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#566459]">
                {t('dashboard.statWastePrevented')}
              </span>
              <Leaf className="h-4 w-4 text-[#D97556]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#D97556] mt-2">
              4.8 kg
            </div>
            <div className="text-[11px] text-[#566459] mt-1">Saved ₹1,650 this month</div>
          </div>
        </div>

        {/* Analytics Section 1: Macronutrient Donut + Weekly Trend Line */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Macronutrient Donut Chart (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#244B39]">
                {t('dashboard.macroTitle')}
              </h3>
              <p className="text-xs text-[#566459] mt-1">
                Ayurvedic diet balance according to consumed recipes.
              </p>
            </div>

            <div className="h-64 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #A7B99A' }}
                    formatter={(val) => [`${val}%`, 'Ratio']}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-[#F5F0E5]">
              <div className="rounded-xl bg-[#FAF8F2] p-2">
                <span className="text-[#566459]">Avg Daily Protein</span>
                <div className="font-bold text-[#244B39] text-sm">76g</div>
              </div>
              <div className="rounded-xl bg-[#FAF8F2] p-2">
                <span className="text-[#566459]">Avg Calorie Target</span>
                <div className="font-bold text-[#D99A38] text-sm">2,100 kcal</div>
              </div>
            </div>
          </div>

          {/* Weekly Calorie & Protein Intake Trends (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft flex flex-col justify-between">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#244B39]">
                {t('dashboard.weeklyTrendTitle')}
              </h3>
              <p className="text-xs text-[#566459] mt-1">
                Daily consumption records over the current week.
              </p>
            </div>

            <div className="h-64 w-full my-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyTrendsData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E5" />
                  <XAxis dataKey="day" stroke="#566459" fontSize={12} />
                  <YAxis stroke="#566459" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #A7B99A' }} />
                  <Legend verticalAlign="top" height={36} />
                  <Line type="monotone" dataKey="calories" name="Calories (kcal)" stroke="#D99A38" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="protein" name="Protein (g)" stroke="#244B39" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="text-xs text-[#566459] flex items-center justify-between pt-2 border-t border-[#F5F0E5]">
              <span>Optimal metabolic balance maintained</span>
              <span className="text-emerald-700 font-bold">Stable Trend ↑</span>
            </div>
          </div>
        </div>

        {/* Analytics Section 2: Nutrient Comparison & Cooking Sessions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Nutrient Comparison Bar Chart (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft">
            <h3 className="font-serif text-xl font-bold text-[#244B39]">
              Nutrient Fulfillment (% of Recommended RDA)
            </h3>
            <p className="text-xs text-[#566459] mt-1 mb-4">
              Essential minerals and vitamins from your prepared dishes.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutrientComparisonData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E5" />
                  <XAxis dataKey="nutrient" stroke="#566459" fontSize={12} />
                  <YAxis stroke="#566459" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #A7B99A' }} formatter={(val) => [`${val}%`, 'Fulfillment']} />
                  <Bar dataKey="actual" name="Actual Achieved" fill="#244B39" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Cooking Activity Sessions (6 cols) */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-6 sm:p-8 border border-[#A7B99A]/30 shadow-soft">
            <h3 className="font-serif text-xl font-bold text-[#244B39]">
              {t('dashboard.weeklyActivityTitle')}
            </h3>
            <p className="text-xs text-[#566459] mt-1 mb-4">
              Daily home culinary sessions recorded this week.
            </p>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cookingActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F5F0E5" />
                  <XAxis dataKey="day" stroke="#566459" fontSize={12} />
                  <YAxis stroke="#566459" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #A7B99A' }} />
                  <Bar dataKey="sessions" name="Sessions" fill="#D99A38" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Shortcut to Cookbook & Pantry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/cookbook"
            className="flex items-center justify-between p-6 rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft hover:shadow-card-hover transition group"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#566459]">Personal Collection</div>
              <h4 className="font-serif text-xl font-bold text-[#244B39] mt-1 group-hover:text-[#D99A38] transition-colors">
                My Cookbook ({savedRecipes.length} Saved Recipes)
              </h4>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#A7B99A] group-hover:text-[#244B39] group-hover:translate-x-1 transition-all" />
          </Link>

          <Link
            to="/pantry"
            className="flex items-center justify-between p-6 rounded-3xl bg-white border border-[#A7B99A]/30 shadow-soft hover:shadow-card-hover transition group"
          >
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#566459]">Kitchen Management</div>
              <h4 className="font-serif text-xl font-bold text-[#244B39] mt-1 group-hover:text-[#D99A38] transition-colors">
                Smart Pantry ({pantryStats.total} Stored Items)
              </h4>
            </div>
            <ArrowUpRight className="h-5 w-5 text-[#A7B99A] group-hover:text-[#244B39] group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

      </div>
    </div>
  );
};
