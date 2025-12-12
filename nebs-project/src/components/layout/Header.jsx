import { Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Good Afternoon Asif!</h2>
          <p className="text-sm text-gray-500">15 June, 2025</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="text-sm font-medium">Asif Bhai</span>
          </div>
        </div>
      </div>
    </header>
  );
}