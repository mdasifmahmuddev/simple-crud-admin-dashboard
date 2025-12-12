import { useState } from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import { menuItems } from './routes/menuConfig';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const ActiveComponent = menuItems.find(item => item.id === activePage)?.component;

  return (
    <DashboardLayout 
      activePage={activePage} 
      setActivePage={setActivePage}
      menuItems={menuItems}
    >
      {ActiveComponent && <ActiveComponent />}
    </DashboardLayout>
  );
}