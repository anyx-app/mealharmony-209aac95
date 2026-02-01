import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';
import CalendarPage from './pages/CalendarPage';
import RecipesPage from './pages/RecipesPage';
import ShoppingListPage from './pages/ShoppingListPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="shopping-list" element={<ShoppingListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
