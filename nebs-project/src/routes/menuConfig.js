import { 
  Home, Users, Database, UserPlus, ClipboardList, 
  DollarSign, FileText, Clock, HelpCircle, MessageSquare, 
  Activity, LogOut, UserCircle
} from 'lucide-react';

import Dashboard from '../pages/Dashboard';
import Employee from '../pages/Employee';
import EmployeeDatabase from '../pages/EmployeeDatabase';
import AddEmployee from '../pages/AddEmployee';
import EditEmployee from '../pages/EditEmployee';
import Performance from '../pages/Performance';
import Payroll from '../pages/Payroll';
import PaySlip from '../pages/PaySlip';
import Attendance from '../pages/Attendance';
import RequestCenter from '../pages/RequestCenter';
import CareerDatabase from '../pages/CareerDatabase';
import DocumentManager from '../pages/DocumentManager';
import NoticeBoard from '../pages/NoticeBoard';
import ActivityLog from '../pages/ActivityLog';
import ExitInterview from '../pages/ExitInterview';
import Profile from '../pages/Profile';

export const menuItems = [
  { id: 'dashboard', icon: Home, label: 'Dashboard', component: Dashboard },
  { id: 'employee', icon: Users, label: 'Employee', component: Employee },
  { id: 'employee-database', icon: Database, label: 'Employee Database', component: EmployeeDatabase },
  { id: 'add-employee', icon: UserPlus, label: 'Add New Employee', component: AddEmployee },
  { id: 'edit-employee', icon: ClipboardList, label: 'Edit Employee', component: EditEmployee },
  { id: 'performance', icon: Activity, label: 'Performance History', component: Performance },
  { id: 'payroll', icon: DollarSign, label: 'Payroll', component: Payroll },
  { id: 'pay-slip', icon: FileText, label: 'Pay Slip', component: PaySlip },
  { id: 'attendance', icon: Clock, label: 'Attendance', component: Attendance },
  { id: 'request-center', icon: HelpCircle, label: 'Request Center', component: RequestCenter },
  { id: 'career-database', icon: Database, label: 'Career Database', component: CareerDatabase },
  { id: 'document-manager', icon: FileText, label: 'Document manager', component: DocumentManager },
  { id: 'notice-board', icon: MessageSquare, label: 'Notice Board', component: NoticeBoard },
  { id: 'activity-log', icon: Activity, label: 'Activity Log', component: ActivityLog },
  { id: 'exit-interview', icon: LogOut, label: 'Exit Interview', component: ExitInterview },
  { id: 'profile', icon: UserCircle, label: 'Profile', component: Profile }
];