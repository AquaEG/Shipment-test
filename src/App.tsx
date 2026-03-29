import { Navigate, Route, Routes } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { ActivityLogPage } from './pages/ActivityLogPage';
import { AssistantPage } from './pages/AssistantPage';
import { CalendarPage } from './pages/CalendarPage';
import { DashboardPage } from './pages/DashboardPage';
import { EmailPage } from './pages/EmailPage';
import { SettingsPage } from './pages/SettingsPage';
import { SheetsPage } from './pages/SheetsPage';

const App = () => {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<DashboardPage />} />
        <Route path="/assistant" element={<AssistantPage />} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/sheets" element={<SheetsPage />} />
        <Route path="/activity" element={<ActivityLogPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
