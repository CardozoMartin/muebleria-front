const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
const data = [40, 65, 45, 80, 55, 90, 70, 95];
const maxVal = Math.max(...data);

export default function Analytics() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-400 mt-0.5">Store performance overview</p>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Revenue Overview</h2>
            <p className="text-2xl font-bold text-gray-900 mt-1">$14,250 <span className="text-sm font-normal text-green-500">+12.3%</span></p>
          </div>
          <div className="flex gap-2">
            {["1W", "1M", "3M", "1Y"].map((t) => (
              <button key={t} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${t === "1M" ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-100"}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-3 h-40">
          {data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full bg-blue-100 rounded-t-md hover:bg-blue-500 transition-colors cursor-pointer group relative"
                style={{ height: `${(val / maxVal) * 100}%` }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  ${val * 150}
                </div>
              </div>
              <span className="text-xs text-gray-400">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Orders", value: "2,847", change: "+8.2%", positive: true },
          { label: "Avg Order Value", value: "$127.50", change: "+3.1%", positive: true },
          { label: "Return Rate", value: "4.2%", change: "-0.8%", positive: true },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200/80 p-5 shadow-sm">
            <p className="text-sm text-gray-400 font-medium">{s.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{s.value}</p>
            <p className={`text-xs font-semibold mt-1 ${s.positive ? "text-green-500" : "text-red-500"}`}>{s.change} vs last month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
