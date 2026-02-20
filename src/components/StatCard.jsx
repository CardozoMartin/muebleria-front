export default function StatCard({ icon, label, value, change, positive }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
          {icon}
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
          positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
        }`}>
          {change}
        </span>
      </div>
      <p className="text-sm text-gray-400 font-medium">{label}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
    </div>
  );
}
