import { Users, Clock, FileText, HelpCircle } from 'lucide-react';
import StatsCard from '../components/shared/StatsCard.jsx';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Employees" value="248" icon={Users} iconColor="text-blue-500" />
        <StatsCard title="Present Today" value="235" icon={Clock} iconColor="text-green-500" />
        <StatsCard title="On Leave" value="13" icon={FileText} iconColor="text-orange-500" />
        <StatsCard title="New Requests" value="8" icon={HelpCircle} iconColor="text-purple-500" />
      </div>
    </div>
  );
}