import React from 'react';
import { ArrowRight, Calendar, TrendingUp, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Good Morning, Jane! ☀️</h1>
          <p className="text-slate-500 mt-1">Ready to plan some delicious meals for the week?</p>
        </div>
        <div className="text-sm text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF6F61]" />
          <span>Oct 24, 2023</span>
        </div>
      </div>

      {/* Quick Stats / Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-500 rounded-xl group-hover:bg-orange-100 transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">Weekly</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">4 / 21</h3>
          <p className="text-sm text-slate-500">Meals planned this week</p>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-orange-500 h-1.5 rounded-full w-[20%]"></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-xl group-hover:bg-green-100 transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">Saved</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">12</h3>
          <p className="text-sm text-slate-500">New recipes to try</p>
          <Link to="/recipes" className="mt-4 inline-flex items-center text-sm text-green-600 font-medium hover:text-green-700">
            Browse Recipes <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Card 3 */}
        <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-500 rounded-xl group-hover:bg-blue-100 transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded">Stats</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">85%</h3>
          <p className="text-sm text-slate-500">Adherence to plan</p>
          <p className="mt-4 text-xs text-slate-400">Great job staying on track!</p>
        </div>
      </div>

      {/* Main Feature Area: Today's Plan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Today's Meals */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">Today's Menu</h2>
            <Link to="/calendar" className="text-sm text-[#FF6F61] font-medium hover:underline">View Full Calendar</Link>
          </div>
          
          <div className="space-y-4">
             {['Breakfast', 'Lunch', 'Dinner'].map((type, idx) => (
               <div key={type} className="flex items-center p-4 bg-white rounded-xl border border-slate-200 shadow-sm hover:border-[#FF6F61]/30 transition-colors cursor-pointer group">
                 <div className="w-16 h-16 rounded-lg bg-slate-100 flex-shrink-0 flex items-center justify-center text-2xl">
                    {idx === 0 ? '🍳' : idx === 1 ? '🥗' : '🍝'}
                 </div>
                 <div className="ml-4 flex-1">
                   <div className="flex items-center justify-between">
                     <p className="text-xs font-bold text-[#FF6F61] uppercase tracking-wider">{type}</p>
                     <div className="flex items-center text-slate-400 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {idx === 0 ? '8:00 AM' : idx === 1 ? '1:00 PM' : '7:00 PM'}
                     </div>
                   </div>
                   <h4 className="text-lg font-semibold text-slate-800 mt-1 group-hover:text-[#FF6F61] transition-colors">
                     {idx === 0 ? 'Avocado Toast & Eggs' : idx === 1 ? 'Grilled Chicken Caesar' : 'Pasta Primavera'}
                   </h4>
                   <p className="text-sm text-slate-500 mt-0.5">350 kcal • 15 mins prep</p>
                 </div>
                 <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-slate-50 rounded-full hover:bg-[#FF6F61] hover:text-white transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Right Column: Shopping List Preview */}
        <div className="bg-[#FF6F61]/5 rounded-2xl p-6 border border-[#FF6F61]/10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Shopping List</h2>
            <span className="bg-[#FF6F61] text-white text-xs font-bold px-2 py-1 rounded-full">4 Items</span>
          </div>
          
          <div className="space-y-3">
            {[
              { name: 'Fresh Spinach', checked: false },
              { name: 'Almond Milk', checked: true },
              { name: 'Chicken Breast', checked: false },
              { name: 'Cherry Tomatoes', checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
                <input 
                  type="checkbox" 
                  defaultChecked={item.checked}
                  className="w-5 h-5 rounded border-slate-300 text-[#FF6F61] focus:ring-[#FF6F61]"
                />
                <span className={`ml-3 text-sm font-medium ${item.checked ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>

          <Link to="/shopping-list" className="mt-6 w-full flex items-center justify-center py-2.5 bg-white text-[#FF6F61] font-semibold text-sm rounded-lg border border-[#FF6F61]/20 hover:bg-[#FF6F61] hover:text-white transition-all">
            View Full List
          </Link>
        </div>
      </div>
    </div>
  );
}
