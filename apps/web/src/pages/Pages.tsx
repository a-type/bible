import { Outlet, Router } from '@verdant-web/react-router';
import { HomePage } from './HomePage.jsx';
import { useCallback } from 'react';
import { updateApp, updateState } from '@/updates.js';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
];

export function Pages() {
  const handleNavigate = useCallback(() => {
    if (updateState.updateAvailable) {
      console.info('Update ready to install, intercepting navigation...');
      updateApp();
      return false;
    }
  }, []);
  return (
    <Router routes={routes} onNavigate={handleNavigate}>
      <Outlet />
    </Router>
  );
}
