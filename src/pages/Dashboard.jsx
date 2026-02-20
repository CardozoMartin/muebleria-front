import StatCard from "../components/StatCard";
import ContextMenu from "../components/ContextMenu";

const products = [
  { name: "iPhone 15 Pro", category: "Electronics", price: "$999.00", stock: 45, status: "Active" },
  { name: "Herman Miller Aeron", category: "Furniture", price: "$1,450.00", stock: 12, status: "Active" },
  { name: "Sony WH-1000XM5", category: "Electronics", price: "$349.00", stock: 0, status: "Inactive" },
  { name: "Logitech MX Mechanical", category: "Accessories", price: "$169.00", stock: 82, status: "Active" },
];

const offers = [
  {
    badge: "25% OFF",
    badgeColor: "bg-blue-100 text-blue-700",
    expires: "Aug 15, 2024",
    expiresColor: "text-gray-400",
    title: "Summer Tech Blowout",
    description: "Applicable on all mobile accessories",
    avatars: 8,
  },
  {
    badge: "BOGO",
    badgeColor: "bg-green-100 text-green-700",
    expires: "In 2 days",
    expiresColor: "text-red-500",
    title: "Flash Weekend Sale",
    description: "Buy one get one on select apparel",
    avatars: 2,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20 7H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1Z" stroke="currentColor" strokeWidth="1.6"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>}
          label="Total Products"
          value="1,284"
          change="+2.4%"
          positive
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="m12.586 2.586-9 9a2 2 0 0 0 0 2.828l6 6a2 2 0 0 0 2.828 0l9-9A2 2 0 0 0 21 10V5a3 3 0 0 0-3-3h-5a2 2 0 0 0-1.414.586Z" stroke="currentColor" strokeWidth="1.6"/></svg>}
          label="Active Offers"
          value="12"
          change="+5.1%"
          positive
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M2 10h20" stroke="currentColor" strokeWidth="1.6"/></svg>}
          label="Revenue"
          value="$14,250"
          change="+12.3%"
          positive
        />
        <StatCard
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          label="Pending Tasks"
          value="8"
          change="-2%"
          positive={false}
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Recent Products */}
        <div className="col-span-2 bg-white rounded-xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Recent Products</h2>
            <button className="text-xs font-medium text-blue-600 hover:text-blue-700 transition">View all products →</button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <th className="text-left px-5 py-3">Product</th>
                <th className="text-left px-3 py-3">Category</th>
                <th className="text-left px-3 py-3">Price</th>
                <th className="text-left px-3 py-3">Stock</th>
                <th className="text-left px-3 py-3">Status</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((p, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition group">
                  <td className="px-5 py-3.5 font-medium text-gray-900">{p.name}</td>
                  <td className="px-3 py-3.5 text-gray-500">{p.category}</td>
                  <td className="px-3 py-3.5 text-gray-700">{p.price}</td>
                  <td className="px-3 py-3.5 text-gray-500">{p.stock}</td>
                  <td className="px-3 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      p.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="opacity-0 group-hover:opacity-100 transition">
                      <ContextMenu />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Active Offers */}
        <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">Active Offers</h2>
            <button className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-sm">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="p-4 space-y-3">
            {offers.map((o, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition">
                <div className="flex items-start justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${o.badgeColor}`}>{o.badge}</span>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">EXPIRES</p>
                    <p className={`text-xs font-semibold ${o.expiresColor}`}>{o.expires}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{o.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{o.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex -space-x-1">
                    {[...Array(Math.min(o.avatars, 3))].map((_, j) => (
                      <div key={j} className="w-5 h-5 rounded-full bg-gray-300 border border-white text-xs flex items-center justify-center text-gray-500 font-medium" />
                    ))}
                    {o.avatars > 3 && (
                      <div className="w-5 h-5 rounded-full bg-gray-100 border border-white text-xs flex items-center justify-center text-gray-500 font-medium">
                        +{o.avatars - 3}
                      </div>
                    )}
                  </div>
                  <button className="text-xs text-gray-400 hover:text-gray-600 font-medium transition">Edit</button>
                </div>
              </div>
            ))}
            {/* Create new */}
            <button className="w-full border border-dashed border-gray-200 rounded-xl py-6 flex flex-col items-center gap-2 text-gray-300 hover:border-gray-300 hover:text-gray-400 transition">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-xs font-medium">Create New Offer</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
