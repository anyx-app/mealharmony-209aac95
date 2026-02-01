import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarDays, 
  UtensilsCrossed, 
  ShoppingCart, 
  Menu, 
  X, 
  ChefHat,
  Search,
  Bell
} from 'lucide-react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/calendar', label: 'Meal Calendar', icon: CalendarDays },
    { path: '/recipes', label: 'Recipes', icon: UtensilsCrossed },
    { path: '/shopping-list', label: 'Shopping List', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-[#FF6F61]/20">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out
          md:translate-x-0 md:shadow-none
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <div className="flex items-center gap-2 text-[#FF6F61]">
              <ChefHat className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-slate-800">MealHarmony</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="ml-auto md:hidden p-1 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-[#FF6F61]/10 text-[#FF6F61]' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF6F61]' : 'text-slate-400'}`} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* User Profile Snippet (Bottom Sidebar) */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF6F61] to-[#FF8A75] flex items-center justify-center text-white font-bold text-xs">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">Jane Doe</p>
                <p className="text-xs text-slate-500 truncate">Family Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="md:ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Search Bar */}
          <div className="hidden sm:flex items-center max-w-md w-full ml-4">
            <div className="relative w-full text-slate-400 focus-within:text-[#FF6F61]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#FF6F61]/20 focus:border-[#FF6F61] sm:text-sm transition-all"
                placeholder="Search recipes, ingredients..."
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-[#FF6F61] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="hidden sm:flex items-center gap-2 bg-[#FF6F61] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#ff5a4a] transition-colors shadow-sm shadow-[#FF6F61]/30">
              <ChefHat className="w-4 h-4" />
              <span>New Recipe</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
