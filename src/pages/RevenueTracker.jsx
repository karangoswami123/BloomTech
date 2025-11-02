// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import { createClient } from "@supabase/supabase-js";
// // import { motion } from "framer-motion";
// // import {
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // // 🧩 Supabase setup
// // const supabase = createClient(
// //   import.meta.env.VITE_SUPABASE_URL,
// //   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// // );

// // const API_BASE = "http://localhost:8080/api";

// // export default function App() {
// //   const [user, setUser] = useState(null);
// //   const [revenues, setRevenues] = useState([]);
// //   const [editing, setEditing] = useState(null);
// //   const [form, setForm] = useState({
// //     crop_name: "",
// //     quantity: "",
// //     unit: "kg",
// //     harvest_date: "",
// //     selling_date: "",
// //     seed_cost: "",
// //     fertilizer_cost: "",
// //     selling_price: "",
// //   });

// //   // ✅ Get current Supabase user
// //   useEffect(() => {
// //     supabase.auth.getUser().then(({ data: { user } }) => setUser(user));
// //   }, []);

// //   // ✅ Fetch all revenue entries for user
// //   useEffect(() => {
// //     if (user) fetchRevenues();
// //   }, [user]);

// //   const fetchRevenues = async () => {
// //     const { data } = await axios.get(`${API_BASE}/revenue/${user.id}`);
// //     setRevenues(data);
// //   };

// //   // 🧮 Auto-calc total & profit
// //   const calculateProfit = () => {
// //     const total = Number(form.seed_cost || 0) + Number(form.fertilizer_cost || 0);
// //     const profit = Number(form.selling_price || 0) - total;
// //     return { total, profit };
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const { total, profit } = calculateProfit();
// //     const data = { ...form, user_id: user.id, total_cost: total, profit };
// //     if (editing) {
// //       await axios.put(`${API_BASE}/revenue/${editing}`, data);
// //       setEditing(null);
// //     } else {
// //       await axios.post(`${API_BASE}/revenue`, data);
// //     }
// //     setForm({
// //       crop_name: "",
// //       quantity: "",
// //       unit: "kg",
// //       harvest_date: "",
// //       selling_date: "",
// //       seed_cost: "",
// //       fertilizer_cost: "",
// //       selling_price: "",
// //     });
// //     fetchRevenues();
// //   };

// //   const handleDelete = async (id) => {
// //     await axios.delete(`${API_BASE}/revenue/${id}`);
// //     fetchRevenues();
// //   };

// //   const handleEdit = (rev) => {
// //     setEditing(rev._id);
// //     setForm({
// //       crop_name: rev.crop_name,
// //       quantity: rev.quantity,
// //       unit: rev.unit,
// //       harvest_date: rev.harvest_date,
// //       selling_date: rev.selling_date,
// //       seed_cost: rev.seed_cost,
// //       fertilizer_cost: rev.fertilizer_cost,
// //       selling_price: rev.selling_price,
// //     });
// //   };

// //   // 📅 Calculate duration (harvest → selling)
// //   const calcDuration = (h, s) => {
// //     if (!h || !s) return "N/A";
// //     const diff = (new Date(s) - new Date(h)) / (1000 * 60 * 60 * 24);
// //     return `${diff} days`;
// //   };

// //   // 📊 Chart Data
// //   const chartData = revenues.map((r) => ({
// //     crop: r.crop_name,
// //     profit: r.profit,
// //     cost: r.total_cost,
// //     revenue: r.selling_price,
// //   }));

// //   if (!user) {
// //     return (
// //       <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-200 via-lime-200 to-emerald-300">
// //         <div className="p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl text-center">
// //           <h1 className="text-4xl font-bold text-green-900 mb-6">🌾 SmartCrop Revenue Tracker</h1>
// //           <button
// //             onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}
// //             className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all"
// //           >
// //             Sign in with Google
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div
// //       className="min-h-screen bg-cover bg-center p-6"
// //       style={{
// //         backgroundImage:
// //           "url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=2000&q=80')",
// //       }}
// //     >
// //       <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl p-8 shadow-xl">
// //         <div className="flex justify-between items-center mb-6">
// //           <h1 className="text-3xl font-bold text-green-900">🌿 Revenue Dashboard</h1>
// //           <button
// //             onClick={() => supabase.auth.signOut()}
// //             className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
// //           >
// //             Logout
// //           </button>
// //         </div>

// //         {/* 🌱 Add / Edit Form */}
// //         <form
// //           onSubmit={handleSubmit}
// //           className="grid lg:grid-cols-4 sm:grid-cols-2 gap-4 bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-md"
// //         >
// //           <input
// //             placeholder="Crop Name"
// //             value={form.crop_name}
// //             onChange={(e) => setForm({ ...form, crop_name: e.target.value })}
// //             required
// //             className="p-2 border rounded-lg focus:ring-2 focus:ring-green-400"
// //           />
// //           <input
// //             placeholder="Quantity"
// //             type="number"
// //             value={form.quantity}
// //             onChange={(e) => setForm({ ...form, quantity: e.target.value })}
// //             required
// //             className="p-2 border rounded-lg"
// //           />
// //           <select
// //             value={form.unit}
// //             onChange={(e) => setForm({ ...form, unit: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           >
// //             <option>kg</option>
// //             <option>quintal</option>
// //             <option>tonne</option>
// //           </select>
// //           <input
// //             type="date"
// //             value={form.harvest_date}
// //             onChange={(e) => setForm({ ...form, harvest_date: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           />
// //           <input
// //             type="date"
// //             value={form.selling_date}
// //             onChange={(e) => setForm({ ...form, selling_date: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           />
// //           <input
// //             type="number"
// //             placeholder="Cost of Seeds"
// //             value={form.seed_cost}
// //             onChange={(e) => setForm({ ...form, seed_cost: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           />
// //           <input
// //             type="number"
// //             placeholder="Cost of Fertilizer"
// //             value={form.fertilizer_cost}
// //             onChange={(e) => setForm({ ...form, fertilizer_cost: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           />
// //           <input
// //             type="number"
// //             placeholder="Selling Price"
// //             value={form.selling_price}
// //             onChange={(e) => setForm({ ...form, selling_price: e.target.value })}
// //             className="p-2 border rounded-lg"
// //           />
// //           <button
// //             type="submit"
// //             className="col-span-full bg-green-600 text-white font-semibold py-2 rounded-xl mt-2 hover:bg-green-700 transition-all"
// //           >
// //             {editing ? "💾 Update Revenue" : "➕ Add Revenue"}
// //           </button>
// //         </form>

// //         {/* 🌾 Revenue Cards */}
// //         <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6 mt-8">
// //           {revenues.map((r) => (
// //             <motion.div
// //               key={r._id}
// //               whileHover={{ scale: 1.03 }}
// //               className="p-5 bg-white/80 rounded-2xl shadow-lg border border-green-100"
// //             >
// //               <h2 className="text-2xl font-bold text-green-800">{r.crop_name}</h2>
// //               <p className="text-gray-700">{r.quantity} {r.unit}</p>
// //               <p><b>Seeds:</b> ₹{r.seed_cost}</p>
// //               <p><b>Fertilizer:</b> ₹{r.fertilizer_cost}</p>
// //               <p><b>Selling Price:</b> ₹{r.selling_price}</p>
// //               <p><b>Total Cost:</b> ₹{r.total_cost}</p>
// //               <p><b>Profit:</b> ₹{r.profit}</p>
// //               <p><b>Duration:</b> {calcDuration(r.harvest_date, r.selling_date)}</p>
// //               <div className="flex gap-2 mt-3">
// //                 <button
// //                   onClick={() => handleEdit(r)}
// //                   className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
// //                 >
// //                   Edit
// //                 </button>
// //                 <button
// //                   onClick={() => handleDelete(r._id)}
// //                   className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
// //                 >
// //                   Delete
// //                 </button>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {/* 📊 Chart Section */}
// //         {revenues.length > 0 && (
// //           <div className="mt-10 bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
// //             <h2 className="text-2xl font-bold text-green-800 mb-4">📈 Profit vs Cost Comparison</h2>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={chartData}>
// //                 <CartesianGrid strokeDasharray="3 3" />
// //                 <XAxis dataKey="crop" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Legend />
// //                 <Bar dataKey="profit" fill="#16a34a" />
// //                 <Bar dataKey="cost" fill="#fbbf24" />
// //                 <Bar dataKey="revenue" fill="#3b82f6" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
//   XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
// } from "recharts";

// export default function App() {
//   const [form, setForm] = useState({
//     user_id: "123", // replace with actual logged-in user id
//     crop_name: "",
//     quantity: "",
//     unit: "kg",
//     harvest_date: "",
//     selling_date: "",
//     seed_cost: "",
//     fertilizer_cost: "",
//     selling_price: "",
//     profit: 0,
//   });
//   const [data, setData] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const API = "http://localhost:8080/api/revenue";

//   const fetchData = async () => {
//     const res = await axios.get(`${API}/${form.user_id}`);
//     setData(res.data);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Auto calculate profit
//   useEffect(() => {
//     const total_cost = Number(form.seed_cost) + Number(form.fertilizer_cost);
//     const profit = Number(form.selling_price) - total_cost;
//     setForm((f) => ({ ...f, profit: isNaN(profit) ? 0 : profit }));
//   }, [form.seed_cost, form.fertilizer_cost, form.selling_price]);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (editingId) {
//       await axios.put(`${API}/${editingId}`, form);
//       setEditingId(null);
//     } else {
//       await axios.post(API, form);
//     }
//     setForm({
//       user_id: "123",
//       crop_name: "",
//       quantity: "",
//       unit: "kg",
//       harvest_date: "",
//       selling_date: "",
//       seed_cost: "",
//       fertilizer_cost: "",
//       selling_price: "",
//       profit: 0,
//     });
//     fetchData();
//   };

//   const handleEdit = (item) => {
//     setForm(item);
//     setEditingId(item._id);
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${API}/${id}`);
//     fetchData();
//   };

//   // Duration between harvest and selling
//   const calculateDuration = (h, s) => {
//     if (!h || !s) return "-";
//     const diff = new Date(s) - new Date(h);
//     return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days`;
//   };

//   // Prepare chart data
//   const monthlyData = Object.values(
//     data.reduce((acc, item) => {
//       const month = new Date(item.selling_date).toLocaleString("default", { month: "short" });
//       acc[month] = acc[month] || { month, revenue: 0 };
//       acc[month].revenue += item.selling_price;
//       return acc;
//     }, {})
//   );

//   const profitData = data.map((item) => ({
//     name: item.crop_name,
//     profit: item.profit,
//   }));

//   const cropRevenueData = Object.values(
//     data.reduce((acc, item) => {
//       acc[item.crop_name] = acc[item.crop_name] || { name: item.crop_name, revenue: 0 };
//       acc[item.crop_name].revenue += item.selling_price;
//       return acc;
//     }, {})
//   );

//   const COLORS = ["#6EE7B7", "#34D399", "#10B981", "#A7F3D0"];

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col items-center p-6">
//       <h1 className="text-3xl font-bold text-green-800 mb-6">
//         🌱 SmartCrop Revenue Tracker
//       </h1>

//       {/* Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md rounded-2xl p-6 w-full max-w-3xl border border-green-200"
//       >
//         <h2 className="text-xl font-semibold mb-4 text-green-700">
//           {editingId ? "✏️ Edit Revenue Entry" : "➕ Add Revenue Entry"}
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="text-green-700 font-medium">Crop Name 🌾</label>
//             <input
//               name="crop_name"
//               value={form.crop_name}
//               onChange={handleChange}
//               placeholder="e.g. Wheat"
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Quantity</label>
//             <input
//               name="quantity"
//               type="number"
//               value={form.quantity}
//               onChange={handleChange}
//               placeholder="e.g. 100"
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Unit</label>
//             <select
//               name="unit"
//               value={form.unit}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//             >
//               <option>kg</option>
//               <option>quintal</option>
//               <option>tonne</option>
//               <option>gram</option>
//             </select>
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Harvest Date</label>
//             <input
//               name="harvest_date"
//               type="date"
//               value={form.harvest_date}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Selling Date</label>
//             <input
//               name="selling_date"
//               type="date"
//               value={form.selling_date}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Cost of Seeds</label>
//             <input
//               name="seed_cost"
//               type="number"
//               placeholder="e.g. 500"
//               value={form.seed_cost}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Cost of Fertilizer</label>
//             <input
//               name="fertilizer_cost"
//               type="number"
//               placeholder="e.g. 400"
//               value={form.fertilizer_cost}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Selling Price</label>
//             <input
//               name="selling_price"
//               type="number"
//               placeholder="e.g. 1500"
//               value={form.selling_price}
//               onChange={handleChange}
//               className="border rounded-lg p-2 w-full mt-1"
//               required
//             />
//           </div>

//           <div>
//             <label className="text-green-700 font-medium">Calculated Profit</label>
//             <input
//               type="text"
//               value={`₹${form.profit}`}
//               readOnly
//               className="border rounded-lg p-2 w-full mt-1 bg-green-50 text-green-800 font-semibold"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg w-full"
//         >
//           {editingId ? "Update Entry" : "Add Entry"}
//         </button>
//       </form>

//       {/* Cards */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 w-full max-w-6xl">
//         {data.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white border border-green-200 shadow rounded-xl p-4 hover:shadow-lg transition-all"
//           >
//             <h3 className="font-semibold text-green-800 text-lg">{item.crop_name}</h3>
//             <p className="text-sm text-gray-600">Quantity: {item.quantity} {item.unit}</p>
//             <p className="text-sm text-gray-600">Harvest: {item.harvest_date}</p>
//             <p className="text-sm text-gray-600">Selling: {item.selling_date}</p>
//             <p className="text-sm text-gray-600 font-semibold">Profit: ₹{item.profit}</p>
//             <p className="text-sm text-gray-600">
//               Duration: {calculateDuration(item.harvest_date, item.selling_date)}
//             </p>

//             <div className="flex justify-between mt-3">
//               <button
//                 onClick={() => handleEdit(item)}
//                 className="text-green-700 font-semibold hover:underline"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(item._id)}
//                 className="text-red-500 font-semibold hover:underline"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Charts */}
//       <div className="w-full max-w-6xl mt-12 grid lg:grid-cols-3 gap-6">
//         <div className="bg-white border p-4 rounded-xl shadow">
//           <h3 className="text-center text-green-700 font-semibold mb-2">
//             Monthly Revenue
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <BarChart data={monthlyData}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="revenue" fill="#34D399" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white border p-4 rounded-xl shadow">
//           <h3 className="text-center text-green-700 font-semibold mb-2">
//             Profit Comparison
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <LineChart data={profitData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Line type="monotone" dataKey="profit" stroke="#16A34A" strokeWidth={2} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="bg-white border p-4 rounded-xl shadow">
//           <h3 className="text-center text-green-700 font-semibold mb-2">
//             Crop-wise Revenue
//           </h3>
//           <ResponsiveContainer width="100%" height={250}>
//             <PieChart>
//               <Pie
//                 data={cropRevenueData}
//                 dataKey="revenue"
//                 nameKey="name"
//                 outerRadius={80}
//                 label
//               >
//                 {cropRevenueData.map((_, i) => (
//                   <Cell key={i} fill={COLORS[i % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import {
//   LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell,
// } from "recharts";
// import "tailwindcss/tailwind.css";

// // Supabase Setup
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
// );

// const RevenueTracker = () => {
//   const [user, setUser] = useState(null);
//   const [records, setRecords] = useState([]);
//   const [form, setForm] = useState({
//     crop_name: "",
//     quantity: "",
//     unit: "kg",
//     harvest_date: "",
//     selling_date: "",
//     seed_cost: "",
//     fertilizer_cost: "",
//     misc_expense: "",
//     damaged_quantity: "",
//     selling_price: "",
//   });
//   const [editingId, setEditingId] = useState(null);

//   const units = ["kg", "quintal", "tonne", "gram"];

//   // Auto fetch Supabase user
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data } = await supabase.auth.getUser();
//       if (data?.user) {
//         setUser(data.user);
//         fetchRecords(data.user.id);
//       }
//     };
//     fetchUser();
//   }, []);

//   const fetchRecords = async (uid) => {
//     const res = await fetch(`http://localhost:8080/api/revenue/${uid}`);
//     const data = await res.json();
//     setRecords(data);
//   };

//   // Calculate profit & duration before submit
//   const calculateProfit = (f) => {
//     const seed = parseFloat(f.seed_cost || 0);
//     const fert = parseFloat(f.fertilizer_cost || 0);
//     const misc = parseFloat(f.misc_expense || 0);
//     const sell = parseFloat(f.selling_price || 0);
//     const totalCost = seed + fert + misc;
//     const profit = sell - totalCost;
//     return { totalCost, profit };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please log in via Supabase");

//     const { totalCost, profit } = calculateProfit(form);
//     const newRecord = {
//       ...form,
//       user_id: user.id,
//       total_cost: totalCost,
//       profit,
//     };

//     const method = editingId ? "PUT" : "POST";
//     const url = editingId
//       ? `http://localhost:8080/api/revenue/${editingId}`
//       : "http://localhost:8080/api/revenue";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newRecord),
//     });

//     setForm({
//       crop_name: "",
//       quantity: "",
//       unit: "kg",
//       harvest_date: "",
//       selling_date: "",
//       seed_cost: "",
//       fertilizer_cost: "",
//       misc_expense: "",
//       damaged_quantity: "",
//       selling_price: "",
//     });
//     setEditingId(null);
//     fetchRecords(user.id);
//   };

//   const handleEdit = (rec) => {
//     setForm(rec);
//     setEditingId(rec._id);
//   };

//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:8080/api/revenue/${id}`, { method: "DELETE" });
//     fetchRecords(user.id);
//   };

//   const COLORS = ["#4CAF50", "#81C784", "#A5D6A7", "#E57373"];

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-800 p-8">
//       <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
//         🌾 SmartCrop Revenue Tracker
//       </h1>

//       {/* --- Form --- */}
//       <form
//         onSubmit={handleSubmit}
//         className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg grid grid-cols-2 gap-4 border border-green-100"
//       >
//         <h2 className="col-span-2 text-xl font-semibold text-green-600 mb-2">
//           {editingId ? "✏️ Edit Record" : "➕ Add New Revenue Record"}
//         </h2>

//         {[
//           ["Crop Name", "crop_name", "text"],
//           ["Quantity", "quantity", "number"],
//           ["Harvest Date", "harvest_date", "date"],
//           ["Selling Date", "selling_date", "date"],
//           ["Seed Cost", "seed_cost", "number"],
//           ["Fertilizer Cost", "fertilizer_cost", "number"],
//           ["Misc. Expense", "misc_expense", "number"],
//           ["Damaged Quantity", "damaged_quantity", "number"],
//           ["Selling Price", "selling_price", "number"],
//         ].map(([label, name, type]) => (
//           <div key={name}>
//             <label className="block text-sm text-green-700 font-medium mb-1">{label}</label>
//             <input
//               type={type}
//               value={form[name]}
//               onChange={(e) => setForm({ ...form, [name]: e.target.value })}
//               className="w-full border border-green-200 rounded-lg p-2 focus:ring-2 focus:ring-green-400 outline-none"
//               required={name !== "misc_expense" && name !== "damaged_quantity"}
//             />
//           </div>
//         ))}

//         <div>
//           <label className="block text-sm text-green-700 font-medium mb-1">Unit</label>
//           <select
//             value={form.unit}
//             onChange={(e) => setForm({ ...form, unit: e.target.value })}
//             className="w-full border border-green-200 rounded-lg p-2"
//           >
//             {units.map((u) => (
//               <option key={u} value={u}>
//                 {u}
//               </option>
//             ))}
//           </select>
//         </div>

//         <button
//           type="submit"
//           className="col-span-2 bg-green-600 hover:bg-green-700 text-white rounded-lg py-2 transition"
//         >
//           {editingId ? "Update Record" : "Add Record"}
//         </button>
//       </form>

//       {/* --- Records --- */}
//       <div className="max-w-6xl mx-auto mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {records.map((rec) => (
//           <div
//             key={rec._id}
//             className="p-4 rounded-2xl shadow-md bg-white border border-green-100 hover:shadow-lg transition"
//           >
//             <h3 className="text-lg font-semibold text-green-700">{rec.crop_name}</h3>
//             <p className="text-sm text-gray-600">Quantity: {rec.quantity} {rec.unit}</p>
//             <p className="text-sm">Harvest: {rec.harvest_date}</p>
//             <p className="text-sm">Sell: {rec.selling_date}</p>
//             <p className="text-sm text-gray-700">
//               💰 Profit: <span className="font-bold text-green-600">{rec.profit?.toFixed(2) || 0}</span>
//             </p>
//             <div className="flex justify-between mt-3">
//               <button onClick={() => handleEdit(rec)} className="text-green-600">✏️ Edit</button>
//               <button onClick={() => handleDelete(rec._id)} className="text-red-500">🗑 Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* --- Charts --- */}
//       {records.length > 0 && (
//         <div className="max-w-6xl mx-auto mt-16 space-y-10">
//           <h2 className="text-2xl font-semibold text-green-700 text-center mb-6">
//             📊 Revenue Insights
//           </h2>

//           {/* Line Chart: Monthly Profit */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
//             <h3 className="text-lg text-green-700 mb-3">Monthly Profit Trend</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={records}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="harvest_date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="profit" stroke="#4CAF50" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart: Cost Breakdown */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
//             <h3 className="text-lg text-green-700 mb-3">Cost Breakdown</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={records}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="crop_name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="seed_cost" stackId="a" fill="#A5D6A7" />
//                 <Bar dataKey="fertilizer_cost" stackId="a" fill="#66BB6A" />
//                 <Bar dataKey="misc_expense" stackId="a" fill="#81C784" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Pie Chart: Damaged vs Sold */}
//           <div className="bg-white p-6 rounded-2xl shadow-md border border-green-100">
//             <h3 className="text-lg text-green-700 mb-3">Damaged vs Sold Quantity</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={[
//                     {
//                       name: "Damaged",
//                       value: records.reduce((sum, r) => sum + (r.damaged_quantity || 0), 0),
//                     },
//                     {
//                       name: "Sold",
//                       value: records.reduce(
//                         (sum, r) => sum + (r.quantity || 0) - (r.damaged_quantity || 0),
//                         0
//                       ),
//                     },
//                   ]}
//                   dataKey="value"
//                   nameKey="name"
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={100}
//                   fill="#4CAF50"
//                   label
//                 >
//                   {COLORS.map((color, index) => (
//                     <Cell key={`cell-${index}`} fill={color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RevenueTracker;








// import React, { useState, useEffect } from "react";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend,
// } from "recharts";

// export default function App() {
//   const [formData, setFormData] = useState({
//     user_id: "user1",
//     crop_name: "",
//     quantity: "",
//     unit: "kg",
//     harvest_date: "",
//     selling_date: "",
//     seed_cost: "",
//     fertilizer_cost: "",
//     misc_expense: "",
//     damaged_quantity: "",
//     selling_price: "",
//     profit: 0,
//   });

//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const colors = ["#16a34a", "#86efac", "#4ade80", "#15803d"];

//   // 🔹 Auto-calculate profit whenever form data changes
//   useEffect(() => {
//     const q = Number(formData.quantity) || 0;
//     const dq = Number(formData.damaged_quantity) || 0;
//     const sp = Number(formData.selling_price) || 0;
//     const sc = Number(formData.seed_cost) || 0;
//     const fc = Number(formData.fertilizer_cost) || 0;
//     const me = Number(formData.misc_expense) || 0;

//     const effectiveQty = Math.max(q - dq, 0);
//     const profit = effectiveQty * sp - (sc + fc + me);
//     setFormData((prev) => ({ ...prev, profit }));
//   }, [
//     formData.quantity,
//     formData.damaged_quantity,
//     formData.selling_price,
//     formData.seed_cost,
//     formData.fertilizer_cost,
//     formData.misc_expense,
//   ]);

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Save record
//   const handleSave = () => {
//     if (!formData.crop_name) return alert("Enter crop name!");

//     if (editingId !== null) {
//       setRecords((prev) =>
//         prev.map((r, i) => (i === editingId ? formData : r))
//       );
//       setEditingId(null);
//     } else {
//       setRecords([...records, formData]);
//     }

//     setFormData({
//       user_id: "user1",
//       crop_name: "",
//       quantity: "",
//       unit: "kg",
//       harvest_date: "",
//       selling_date: "",
//       seed_cost: "",
//       fertilizer_cost: "",
//       misc_expense: "",
//       damaged_quantity: "",
//       selling_price: "",
//       profit: 0,
//     });
//   };

//   // 🔹 Edit record
//   const handleEdit = (index) => {
//     setFormData(records[index]);
//     setEditingId(index);
//   };

//   // 🔹 Delete record
//   const handleDelete = (index) => {
//     setRecords(records.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen bg-green-50 p-6 text-gray-800">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
//         🌾 Smart Crop Revenue Dashboard
//       </h1>

//       {/* ===== Form Section ===== */}
//       <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-green-200">
//         <h2 className="text-xl font-semibold mb-4 text-green-700">
//           {editingId !== null ? "✏️ Edit Record" : "➕ Add New Record"}
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             name="crop_name"
//             value={formData.crop_name}
//             onChange={handleChange}
//             placeholder="Crop Name"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="quantity"
//             value={formData.quantity}
//             onChange={handleChange}
//             placeholder="Quantity"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="damaged_quantity"
//             value={formData.damaged_quantity}
//             onChange={handleChange}
//             placeholder="Damaged Quantity"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="unit"
//             value={formData.unit}
//             onChange={handleChange}
//             placeholder="Unit (e.g. kg, ton)"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="harvest_date"
//             type="date"
//             value={formData.harvest_date}
//             onChange={handleChange}
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="selling_date"
//             type="date"
//             value={formData.selling_date}
//             onChange={handleChange}
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="seed_cost"
//             value={formData.seed_cost}
//             onChange={handleChange}
//             placeholder="Seed Cost"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="fertilizer_cost"
//             value={formData.fertilizer_cost}
//             onChange={handleChange}
//             placeholder="Fertilizer Cost"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="misc_expense"
//             value={formData.misc_expense}
//             onChange={handleChange}
//             placeholder="Misc. Expense"
//             className="border border-green-300 rounded-lg p-2"
//           />
//           <input
//             name="selling_price"
//             value={formData.selling_price}
//             onChange={handleChange}
//             placeholder="Selling Price (per unit)"
//             className="border border-green-300 rounded-lg p-2"
//           />
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <p className="text-green-700 font-semibold">
//             💰 Profit: ₹{formData.profit.toFixed(2)}
//           </p>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
//           >
//             {editingId !== null ? "Update Record" : "Save Record"}
//           </button>
//         </div>
//       </div>

//       {/* ===== Display Section ===== */}
//       <div className="grid grid-cols-3 gap-4">
//         {records.map((r, i) => (
//           <div
//             key={i}
//             className="bg-white border border-green-200 p-4 rounded-lg shadow"
//           >
//             <h3 className="font-semibold text-green-700 text-lg mb-2">
//               {r.crop_name}
//             </h3>
//             <p>Qty: {r.quantity} {r.unit}</p>
//             <p>Damaged: {r.damaged_quantity} {r.unit}</p>
//             <p>Profit: ₹{r.profit.toFixed(2)}</p>
//             <p>Harvest: {r.harvest_date}</p>
//             <p>Sell: {r.selling_date}</p>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => handleEdit(i)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(i)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== Charts Section ===== */}
//       {records.length > 0 && (
//         <div className="mt-12 grid grid-cols-3 gap-6">
//           <BarChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="profit" fill="#16a34a" />
//           </BarChart>

//           <LineChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="profit" stroke="#16a34a" />
//           </LineChart>

//           <PieChart width={400} height={250}>
//             <Pie
//               data={records}
//               dataKey="profit"
//               nameKey="crop_name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#16a34a"
//               label
//             >
//               {records.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>
//       )}
//     </div>
//   );
// }

















// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
//   LineChart, Line, PieChart, Pie, Cell, Legend,
// } from "recharts";

// export default function RevenueTracker() {
//   const backendURL = "http://localhost:5000"; // change if deployed

//   const [formData, setFormData] = useState({
//     user_id: "user1",
//     crop_name: "",
//     quantity: "",
//     unit: "kg",
//     harvest_date: "",
//     selling_date: "",
//     seed_cost: "",
//     fertilizer_cost: "",
//     misc_expense: "",
//     damaged_quantity: "",
//     selling_price: "",
//     profit: 0,
//   });

//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const colors = ["#16a34a", "#86efac", "#4ade80", "#15803d"];

//   // 🔹 Fetch records from backend
//   useEffect(() => {
//     axios
//       .get(`${backendURL}/api/revenue/${formData.user_id}`)
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   // 🔹 Auto-calculate profit
//   useEffect(() => {
//     const q = Number(formData.quantity) || 0;
//     const dq = Number(formData.damaged_quantity) || 0;
//     const sp = Number(formData.selling_price) || 0;
//     const sc = Number(formData.seed_cost) || 0;
//     const fc = Number(formData.fertilizer_cost) || 0;
//     const me = Number(formData.misc_expense) || 0;
//     const effectiveQty = Math.max(q - dq, 0);
//     const profit = effectiveQty * sp - (sc + fc + me);
//     setFormData((prev) => ({ ...prev, profit }));
//   }, [
//     formData.quantity,
//     formData.damaged_quantity,
//     formData.selling_price,
//     formData.seed_cost,
//     formData.fertilizer_cost,
//     formData.misc_expense,
//   ]);

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Save or update record
//   const handleSave = async () => {
//     if (!formData.crop_name) return alert("Enter crop name!");

//     try {
//       if (editingId) {
//         const { data } = await axios.put(`${backendURL}/api/revenue/${editingId}`, formData);
//         setRecords((prev) => prev.map((r) => (r._id === editingId ? data : r)));
//         setEditingId(null);
//       } else {
//         const { data } = await axios.post(`${backendURL}/api/revenue`, formData);
//         setRecords([...records, data]);
//       }

//       setFormData({
//         user_id: "user1",
//         crop_name: "",
//         quantity: "",
//         unit: "kg",
//         harvest_date: "",
//         selling_date: "",
//         seed_cost: "",
//         fertilizer_cost: "",
//         misc_expense: "",
//         damaged_quantity: "",
//         selling_price: "",
//         profit: 0,
//       });
//     } catch (err) {
//       console.error("Error saving record:", err);
//       alert("Failed to save record.");
//     }
//   };

//   // 🔹 Edit
//   const handleEdit = (record) => {
//     setFormData(record);
//     setEditingId(record._id);
//   };

//   // 🔹 Delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${backendURL}/api/revenue/${id}`);
//       setRecords(records.filter((r) => r._id !== id));
//     } catch (err) {
//       console.error("Error deleting record:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-50 p-6 text-gray-800">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
//         🌾 Smart Crop Revenue Dashboard
//       </h1>

//       {/* ===== Form Section ===== */}
//       <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-green-200">
//         <h2 className="text-xl font-semibold mb-4 text-green-700">
//           {editingId ? "✏️ Edit Record" : "➕ Add New Record"}
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           {[
//             { name: "crop_name", placeholder: "Crop Name" },
//             { name: "quantity", placeholder: "Quantity" },
//             { name: "damaged_quantity", placeholder: "Damaged Quantity" },
//             { name: "unit", placeholder: "Unit (e.g. kg, ton)" },
//             { name: "harvest_date", type: "date" },
//             { name: "selling_date", type: "date" },
//             { name: "seed_cost", placeholder: "Seed Cost" },
//             { name: "fertilizer_cost", placeholder: "Fertilizer Cost" },
//             { name: "misc_expense", placeholder: "Misc. Expense" },
//             { name: "selling_price", placeholder: "Selling Price (per unit)" },
//           ].map((field, i) => (
//             <input
//               key={i}
//               {...field}
//               name={field.name}
//               value={formData[field.name]}
//               onChange={handleChange}
//               placeholder={field.placeholder || ""}
//               className="border border-green-300 rounded-lg p-2"
//             />
//           ))}
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <p className="text-green-700 font-semibold">
//             💰 Profit: ₹{formData.profit.toFixed(2)}
//           </p>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
//           >
//             {editingId ? "Update Record" : "Save Record"}
//           </button>
//         </div>
//       </div>

//       {/* ===== Display Section ===== */}
//       <div className="grid grid-cols-3 gap-4">
//         {records.map((r) => (
//           <div
//             key={r._id}
//             className="bg-white border border-green-200 p-4 rounded-lg shadow"
//           >
//             <h3 className="font-semibold text-green-700 text-lg mb-2">
//               {r.crop_name}
//             </h3>
//             <p>Qty: {r.quantity} {r.unit}</p>
//             <p>Damaged: {r.damaged_quantity} {r.unit}</p>
//             <p>Profit: ₹{r.profit.toFixed(2)}</p>
//             <p>Harvest: {r.harvest_date}</p>
//             <p>Sell: {r.selling_date}</p>

//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => handleEdit(r)}
//                 className="bg-green-500 text-white px-3 py-1 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(r._id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== Charts Section ===== */}
//       {records.length > 0 && (
//         <div className="mt-12 grid grid-cols-3 gap-6">
//           <BarChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="profit" fill="#16a34a" />
//           </BarChart>

//           <LineChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="profit" stroke="#16a34a" />
//           </LineChart>

//           <PieChart width={400} height={250}>
//             <Pie
//               data={records}
//               dataKey="profit"
//               nameKey="crop_name"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               fill="#16a34a"
//               label
//             >
//               {records.map((_, index) => (
//                 <Cell key={index} fill={colors[index % colors.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>
//       )}
//     </div>
//   );
// }












// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
//   LineChart, Line, PieChart, Pie, Cell, Legend,
// } from "recharts";

// export default function RevenueTracker() {
//   const [formData, setFormData] = useState({
//     user_id: "user1",
//     crop_name: "",
//     quantity: "",
//     unit: "kg",
//     harvest_date: "",
//     selling_date: "",
//     seed_cost: "",
//     fertilizer_cost: "",
//     misc_expense: "",
//     damaged_quantity: "",
//     selling_price: "",
//     profit: 0,
//   });

//   const [records, setRecords] = useState([]);
//   const [editingId, setEditingId] = useState(null);

//   const colors = ["#16a34a", "#86efac", "#4ade80", "#15803d"];
//   const backendURL = "http://localhost:8080/api/revenue"; // change port if needed

//   // 🔹 Auto-calculate profit
//   useEffect(() => {
//     const q = Number(formData.quantity) || 0;
//     const dq = Number(formData.damaged_quantity) || 0;
//     const sp = Number(formData.selling_price) || 0;
//     const sc = Number(formData.seed_cost) || 0;
//     const fc = Number(formData.fertilizer_cost) || 0;
//     const me = Number(formData.misc_expense) || 0;

//     const effectiveQty = Math.max(q - dq, 0);
//     const profit = effectiveQty * sp - (sc + fc + me);
//     setFormData((prev) => ({ ...prev, profit }));
//   }, [
//     formData.quantity,
//     formData.damaged_quantity,
//     formData.selling_price,
//     formData.seed_cost,
//     formData.fertilizer_cost,
//     formData.misc_expense,
//   ]);

//   // 🔹 Fetch records from backend
//   useEffect(() => {
//     axios
//       .get(backendURL)
//       .then((res) => setRecords(res.data))
//       .catch((err) => console.error("Error fetching data:", err));
//   }, []);

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // 🔹 Save record (create or update)
//   const handleSave = async () => {
//     if (!formData.crop_name) return alert("Enter crop name!");

//     try {
//       if (editingId !== null) {
//         const recordToEdit = records[editingId];
//         const { _id } = recordToEdit;

//         const res = await axios.put(`${backendURL}/${_id}`, formData);
//         const updated = records.map((r, i) => (i === editingId ? res.data : r));
//         setRecords(updated);
//         setEditingId(null);
//       } else {
//         const res = await axios.post(backendURL, formData);
//         setRecords([...records, res.data]);
//       }

//       setFormData({
//         user_id: "user1",
//         crop_name: "",
//         quantity: "",
//         unit: "kg",
//         harvest_date: "",
//         selling_date: "",
//         seed_cost: "",
//         fertilizer_cost: "",
//         misc_expense: "",
//         damaged_quantity: "",
//         selling_price: "",
//         profit: 0,
//       });
//     } catch (error) {
//       console.error("Error saving data:", error);
//     }
//   };

//   // 🔹 Edit record
//   const handleEdit = (index) => {
//     setFormData(records[index]);
//     setEditingId(index);
//   };

//   // 🔹 Delete record
//   const handleDelete = async (index) => {
//     const recordToDelete = records[index];
//     try {
//       await axios.delete(`${backendURL}/${recordToDelete._id}`);
//       setRecords(records.filter((_, i) => i !== index));
//     } catch (error) {
//       console.error("Error deleting record:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-green-50 p-6 text-gray-800">
//       <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
//         🌾 Smart Crop Revenue Dashboard
//       </h1>

//       {/* ===== Form Section ===== */}
//       <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-green-200">
//         <h2 className="text-xl font-semibold mb-4 text-green-700">
//           {editingId !== null ? "✏️ Edit Record" : "➕ Add New Record"}
//         </h2>

//         <div className="grid grid-cols-2 gap-4">
//           <input name="crop_name" value={formData.crop_name} onChange={handleChange}
//             placeholder="Crop Name" className="border border-green-300 rounded-lg p-2" />
//           <input name="quantity" value={formData.quantity} onChange={handleChange}
//             placeholder="Quantity" className="border border-green-300 rounded-lg p-2" />
//           <input name="damaged_quantity" value={formData.damaged_quantity} onChange={handleChange}
//             placeholder="Damaged Quantity" className="border border-green-300 rounded-lg p-2" />
//           <input name="unit" value={formData.unit} onChange={handleChange}
//             placeholder="Unit (e.g. kg, ton)" className="border border-green-300 rounded-lg p-2" />
//           <input name="harvest_date" type="date" value={formData.harvest_date} onChange={handleChange}
//             className="border border-green-300 rounded-lg p-2" />
//           <input name="selling_date" type="date" value={formData.selling_date} onChange={handleChange}
//             className="border border-green-300 rounded-lg p-2" />
//           <input name="seed_cost" value={formData.seed_cost} onChange={handleChange}
//             placeholder="Seed Cost" className="border border-green-300 rounded-lg p-2" />
//           <input name="fertilizer_cost" value={formData.fertilizer_cost} onChange={handleChange}
//             placeholder="Fertilizer Cost" className="border border-green-300 rounded-lg p-2" />
//           <input name="misc_expense" value={formData.misc_expense} onChange={handleChange}
//             placeholder="Misc. Expense" className="border border-green-300 rounded-lg p-2" />
//           <input name="selling_price" value={formData.selling_price} onChange={handleChange}
//             placeholder="Selling Price (per unit)" className="border border-green-300 rounded-lg p-2" />
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <p className="text-green-700 font-semibold">
//             💰 Profit: ₹{formData.profit.toFixed(2)}
//           </p>
//           <button
//             onClick={handleSave}
//             className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
//           >
//             {editingId !== null ? "Update Record" : "Save Record"}
//           </button>
//         </div>
//       </div>

//       {/* ===== Display Section ===== */}
//       <div className="grid grid-cols-3 gap-4">
//         {records.map((r, i) => (
//           <div key={i} className="bg-white border border-green-200 p-4 rounded-lg shadow">
//             <h3 className="font-semibold text-green-700 text-lg mb-2">{r.crop_name}</h3>
//             <p>Qty: {r.quantity} {r.unit}</p>
//             <p>Damaged: {r.damaged_quantity} {r.unit}</p>
//             <p>Profit: ₹{(Number(r.profit) || 0).toFixed(2)}</p>

//             <p>Harvest: {r.harvest_date}</p>
//             <p>Sell: {r.selling_date}</p>

//             <div className="flex gap-2 mt-2">
//               <button onClick={() => handleEdit(i)} className="bg-green-500 text-white px-3 py-1 rounded">
//                 Edit
//               </button>
//               <button onClick={() => handleDelete(i)} className="bg-red-500 text-white px-3 py-1 rounded">
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ===== Charts Section ===== */}
//       {records.length > 0 && (
//         <div className="mt-12 grid grid-cols-3 gap-6">
//           <BarChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="profit" fill="#16a34a" />
//           </BarChart>

//           <LineChart width={400} height={250} data={records}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="crop_name" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="profit" stroke="#16a34a" />
//           </LineChart>

//           <PieChart width={400} height={250}>
//             <Pie data={records} dataKey="profit" nameKey="crop_name"
//               cx="50%" cy="50%" outerRadius={80} fill="#16a34a" label>
//               {records.map((_, index) => (
//                 <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </div>
//       )}
//     </div>
//   );
// }











import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";
import { Sidebar } from '../components/Sidebar';
export default function RevenueTracker() {
  const [formData, setFormData] = useState({
    user_id: "user1",
    crop_name: "",
    quantity: "",
    unit: "kg",
    harvest_date: "",
    selling_date: "",
    seed_cost: "",
    fertilizer_cost: "",
    misc_expense: "",
    damaged_quantity: "",
    selling_price: "",
    profit: 0,
  });

  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const colors = ["#16a34a", "#86efac", "#4ade80", "#15803d"];
  const backendURL = "http://localhost:8080/api/revenue";

  // 🔹 Auto-calculate profit correctly
  useEffect(() => {
    const q = Number(formData.quantity) || 0;
    const dq = Number(formData.damaged_quantity) || 0;
    const sp = Number(formData.selling_price) || 0;
    const sc = Number(formData.seed_cost) || 0;
    const fc = Number(formData.fertilizer_cost) || 0;
    const me = Number(formData.misc_expense) || 0;

    // ✅ Correct profit logic
    const effectiveQty = Math.max(q - dq, 0);
    const totalRevenue = effectiveQty * sp;
    const totalExpenses = sc + fc + me;
    const profit = totalRevenue - totalExpenses;

    setFormData((prev) => ({ ...prev, profit }));
  }, [
    formData.quantity,
    formData.damaged_quantity,
    formData.selling_price,
    formData.seed_cost,
    formData.fertilizer_cost,
    formData.misc_expense,
  ]);

  // 🔹 Fetch records from backend
  const fetchRecords = async () => {
    try {
      const res = await axios.get(backendURL);
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // 🔹 Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Save record (create or update)
  const handleSave = async () => {
    if (!formData.crop_name) return alert("Enter crop name!");

    try {
      if (editingId !== null) {
        const recordToEdit = records[editingId];
        const { _id } = recordToEdit;

        const res = await axios.put(`${backendURL}/${_id}`, formData);
        const updated = records.map((r, i) => (i === editingId ? res.data : r));
        setRecords(updated);
        setEditingId(null);
      } else {
        const res = await axios.post(backendURL, formData);
        setRecords([...records, res.data]);
      }

      // reset form
      setFormData({
        user_id: "user1",
        crop_name: "",
        quantity: "",
        unit: "kg",
        harvest_date: "",
        selling_date: "",
        seed_cost: "",
        fertilizer_cost: "",
        misc_expense: "",
        damaged_quantity: "",
        selling_price: "",
        profit: 0,
      });
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // 🔹 Edit record
  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditingId(index);
  };

  // 🔹 Delete record
  const handleDelete = async (index) => {
    const recordToDelete = records[index];
    try {
      await axios.delete(`${backendURL}/${recordToDelete._id}`);
      setRecords(records.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
  <div className="flex min-h-screen">
    <Sidebar />
    <div className="min-h-screen bg-green-50 p-6 text-gray-800">
     
      <h1 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌾 Smart Crop Revenue Dashboard
      </h1>

      {/* ===== Form Section ===== */}
      <div className="bg-white shadow-md rounded-2xl p-6 mb-8 border border-green-200">
        <h2 className="text-xl font-semibold mb-4 text-green-700">
          {editingId !== null ? "✏️ Edit Record" : "➕ Add New Record"}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="crop_name" value={formData.crop_name} onChange={handleChange}
            placeholder="Crop Name" className="border border-green-300 rounded-lg p-2" />
          <input name="quantity" value={formData.quantity} onChange={handleChange}
            placeholder="Quantity" className="border border-green-300 rounded-lg p-2" />
          <input name="damaged_quantity" value={formData.damaged_quantity} onChange={handleChange}
            placeholder="Damaged Quantity" className="border border-green-300 rounded-lg p-2" />
          <input name="unit" value={formData.unit} onChange={handleChange}
            placeholder="Unit (e.g. kg, ton)" className="border border-green-300 rounded-lg p-2" />
          <input name="harvest_date" type="date" value={formData.harvest_date} onChange={handleChange}
            className="border border-green-300 rounded-lg p-2" />
          <input name="selling_date" type="date" value={formData.selling_date} onChange={handleChange}
            className="border border-green-300 rounded-lg p-2" />
          <input name="seed_cost" value={formData.seed_cost} onChange={handleChange}
            placeholder="Seed Cost" className="border border-green-300 rounded-lg p-2" />
          <input name="fertilizer_cost" value={formData.fertilizer_cost} onChange={handleChange}
            placeholder="Fertilizer Cost" className="border border-green-300 rounded-lg p-2" />
          <input name="misc_expense" value={formData.misc_expense} onChange={handleChange}
            placeholder="Misc. Expense" className="border border-green-300 rounded-lg p-2" />
          <input name="selling_price" value={formData.selling_price} onChange={handleChange}
            placeholder="Selling Price (per unit)" className="border border-green-300 rounded-lg p-2" />
        </div>

        <div className="mt-4 flex justify-between items-center">
          <p className="text-green-700 font-semibold">
            💰 Profit: ₹{formData.profit.toFixed(2)}
          </p>
          <button
            onClick={handleSave}
            className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition"
          >
            {editingId !== null ? "Update Record" : "Save Record"}
          </button>
        </div>
      </div>

      {/* ===== Display Section ===== */}
      <div className="grid grid-cols-3 gap-4">
        {records.map((r, i) => (
          <div key={i} className="bg-white border border-green-200 p-4 rounded-lg shadow">
            <h3 className="font-semibold text-green-700 text-lg mb-2">{r.crop_name}</h3>
            <p>Qty: {r.quantity} {r.unit}</p>
            <p>Damaged: {r.damaged_quantity} {r.unit}</p>
            <p>Profit: ₹{(Number(r.profit) || 0).toFixed(2)}</p>
            <p>Harvest: {r.harvest_date}</p>
            <p>Sell: {r.selling_date}</p>

            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(i)} className="bg-green-500 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(i)} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Charts Section ===== */}
      {records.length > 0 && (
        <div className="mt-12 grid grid-cols-3 gap-6">
          <BarChart width={400} height={250} data={records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="profit" fill="#16a34a" />
          </BarChart>

          <LineChart width={400} height={250} data={records}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="crop_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#16a34a" />
          </LineChart>

          <PieChart width={400} height={250}>
            <Pie data={records} dataKey="profit" nameKey="crop_name"
              cx="50%" cy="50%" outerRadius={80} fill="#16a34a" label>
              {records.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      )}
    </div>
   </div>
  );
}
