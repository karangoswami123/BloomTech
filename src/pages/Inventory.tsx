// // // src/pages/Inventory.tsx
// // import React, { useEffect, useState } from "react";
// // import { createClient } from "@supabase/supabase-js";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// // import { Loader2, PlusCircle } from "lucide-react";

// // // 🔐 Supabase initialization
// // const supabase = createClient(
// //   import.meta.env.VITE_SUPABASE_URL!,
// //   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
// // );

// // interface Product {
// //   id?: string;
// //   crop_name: string;
// //   weight: number;
// //   unit: string;
// //   harvest_date: string;
// //   category: string;
// //   freshness?: string;
// // }

// // const Inventory: React.FC = () => {
// //   const [user, setUser] = useState<any>(null);
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [newProduct, setNewProduct] = useState<Product>({
// //     crop_name: "",
// //     weight: 0,
// //     unit: "kg",
// //     harvest_date: "",
// //     category: "",
// //   });

// //   const COLORS = ["#22c55e", "#facc15", "#ef4444"];

// //   // Fetch current logged-in user
// //   const getUser = async () => {
// //     const { data } = await supabase.auth.getUser();
// //     if (data?.user) setUser(data.user);
// //   };

// //   // Fetch all products for current user
// //   const fetchProducts = async () => {
// //     if (!user) return;
// //     setLoading(true);
// //     const { data, error } = await supabase
// //       .from("inventory")
// //       .select("*")
// //       .eq("user_id", user.id)
// //       .order("created_at", { ascending: false });

// //     if (!error && data) {
// //       const updated = data.map((p) => ({
// //         ...p,
// //         freshness: getFreshness(p.harvest_date, p.category),
// //       }));
// //       setProducts(updated);
// //     }
// //     setLoading(false);
// //   };

// //   // Insert new product
// //   const addProduct = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!user) return alert("Please log in first");

// //     const { error } = await supabase.from("inventory").insert([
// //       {
// //         ...newProduct,
// //         user_id: user.id,
// //         created_at: new Date().toISOString(),
// //       },
// //     ]);
// //     if (error) alert(error.message);
// //     else {
// //       setNewProduct({
// //         crop_name: "",
// //         weight: 0,
// //         unit: "kg",
// //         harvest_date: "",
// //         category: "",
// //       });
// //       fetchProducts();
// //     }
// //   };

// //   // Freshness logic
// //   const getFreshness = (harvestDate: string, category: string): string => {
// //     const now = new Date();
// //     const harvest = new Date(harvestDate);
// //     const diffDays = Math.floor((now.getTime() - harvest.getTime()) / (1000 * 3600 * 24));

// //     let shelfLife = 30; // default
// //     if (category.toLowerCase().includes("fruit")) shelfLife = 10;
// //     if (category.toLowerCase().includes("vegetable")) shelfLife = 7;
// //     if (category.toLowerCase().includes("grain")) shelfLife = 90;

// //     if (diffDays < shelfLife * 0.5) return "Fresh";
// //     if (diffDays < shelfLife) return "Sell Soon";
// //     return "Expired";
// //   };

// //   useEffect(() => {
// //     getUser();
// //   }, []);

// //   useEffect(() => {
// //     if (user) fetchProducts();
// //   }, [user]);

// //   // Chart data
// //   const chartData = ["Fresh", "Sell Soon", "Expired"].map((status) => ({
// //     name: status,
// //     count: products.filter((p) => p.freshness === status).length,
// //   }));

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
// //       <div className="max-w-6xl mx-auto">
// //         <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
// //           🌾 Smart Crop Inventory Dashboard
// //         </h1>

// //         {!user ? (
// //           <div className="text-center text-gray-700">
// //             <p>No user logged in.</p>
// //             <p className="text-sm text-gray-500 mt-2">
// //               (Login via Supabase Auth before viewing inventory)
// //             </p>
// //           </div>
// //         ) : (
// //           <>
// //             <form
// //               onSubmit={addProduct}
// //               className="bg-white shadow-md rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
// //             >
// //               <input
// //                 type="text"
// //                 placeholder="Crop Name"
// //                 value={newProduct.crop_name}
// //                 onChange={(e) => setNewProduct({ ...newProduct, crop_name: e.target.value })}
// //                 required
// //                 className="border p-2 rounded-md"
// //               />
// //               <input
// //                 type="number"
// //                 placeholder="Weight"
// //                 value={newProduct.weight}
// //                 onChange={(e) => setNewProduct({ ...newProduct, weight: Number(e.target.value) })}
// //                 required
// //                 className="border p-2 rounded-md"
// //               />
// //               <select
// //                 value={newProduct.unit}
// //                 onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
// //                 className="border p-2 rounded-md"
// //               >
// //                 <option value="kg">Kilograms</option>
// //                 <option value="quintal">Quintals</option>
// //               </select>
// //               <input
// //                 type="date"
// //                 value={newProduct.harvest_date}
// //                 onChange={(e) => setNewProduct({ ...newProduct, harvest_date: e.target.value })}
// //                 required
// //                 className="border p-2 rounded-md"
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Category (e.g., fruit, grain)"
// //                 value={newProduct.category}
// //                 onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
// //                 required
// //                 className="border p-2 rounded-md"
// //               />
// //               <button
// //                 type="submit"
// //                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
// //               >
// //                 <PlusCircle className="w-5 h-5 mr-2" /> Add Product
// //               </button>
// //             </form>

// //             {loading ? (
// //               <div className="flex justify-center items-center mt-10">
// //                 <Loader2 className="animate-spin text-green-700 w-8 h-8" />
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="grid md:grid-cols-2 gap-8">
// //                   <div className="bg-white rounded-xl shadow-md p-4">
// //                     <h2 className="text-lg font-semibold text-green-800 mb-3">Crop Freshness Overview</h2>
// //                     <ResponsiveContainer width="100%" height={300}>
// //                       <BarChart data={chartData}>
// //                         <XAxis dataKey="name" />
// //                         <YAxis />
// //                         <Tooltip />
// //                         <Legend />
// //                         <Bar dataKey="count" fill="#22c55e" />
// //                       </BarChart>
// //                     </ResponsiveContainer>
// //                   </div>

// //                   <div className="bg-white rounded-xl shadow-md p-4">
// //                     <h2 className="text-lg font-semibold text-green-800 mb-3">Freshness Distribution</h2>
// //                     <ResponsiveContainer width="100%" height={300}>
// //                       <PieChart>
// //                         <Pie
// //                           data={chartData}
// //                           dataKey="count"
// //                           nameKey="name"
// //                           cx="50%"
// //                           cy="50%"
// //                           outerRadius={100}
// //                           label
// //                         >
// //                           {chartData.map((entry, index) => (
// //                             <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                           ))}
// //                         </Pie>
// //                         <Tooltip />
// //                       </PieChart>
// //                     </ResponsiveContainer>
// //                   </div>
// //                 </div>

// //                 <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
// //                   <h2 className="text-lg font-semibold text-green-800 mb-4">Your Products</h2>
// //                   <table className="w-full border-collapse">
// //                     <thead>
// //                       <tr className="bg-green-100 text-green-800">
// //                         <th className="p-2 border">Crop</th>
// //                         <th className="p-2 border">Weight</th>
// //                         <th className="p-2 border">Harvest Date</th>
// //                         <th className="p-2 border">Category</th>
// //                         <th className="p-2 border">Freshness</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {products.map((p) => (
// //                         <tr key={p.id} className="text-center border">
// //                           <td className="p-2 border">{p.crop_name}</td>
// //                           <td className="p-2 border">
// //                             {p.weight} {p.unit}
// //                           </td>
// //                           <td className="p-2 border">{p.harvest_date}</td>
// //                           <td className="p-2 border capitalize">{p.category}</td>
// //                           <td
// //                             className={`p-2 border font-medium ${
// //                               p.freshness === "Fresh"
// //                                 ? "text-green-600"
// //                                 : p.freshness === "Sell Soon"
// //                                 ? "text-yellow-600"
// //                                 : "text-red-600"
// //                             }`}
// //                           >
// //                             {p.freshness}
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </>
// //             )}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Inventory;
// // src/pages/Inventory.tsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { createClient } from "@supabase/supabase-js";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
// import { Loader2, PlusCircle } from "lucide-react";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
// );

// interface Product {
//   _id?: string;
//   crop_name: string;
//   weight: number;
//   unit: string;
//   harvest_date: string;
//   category: string;
//   freshness?: string;
// }

// const Inventory: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [newProduct, setNewProduct] = useState<Product>({
//     crop_name: "",
//     weight: 0,
//     unit: "kg",
//     harvest_date: "",
//     category: "",
//   });

//   const COLORS = ["#22c55e", "#facc15", "#ef4444"];

//   const backendURL = "http://localhost:5000/api/inventory";

//   // Fetch Supabase user
//   const getUser = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (data?.user) setUser(data.user);
//   };

//   // Fetch user's inventory from MongoDB
//   const fetchProducts = async () => {
//     if (!user) return;
//     setLoading(true);
//     const { data } = await axios.get(`${backendURL}/${user.id}`);
//     setProducts(data);
//     setLoading(false);
//   };

//   // Add new product
//   const addProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return alert("Please log in first.");

//     await axios.post(backendURL, {
//       ...newProduct,
//       user_id: user.id,
//     });

//     setNewProduct({
//       crop_name: "",
//       weight: 0,
//       unit: "kg",
//       harvest_date: "",
//       category: "",
//     });

//     fetchProducts();
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) fetchProducts();
//   }, [user]);

//   const chartData = ["Fresh", "Sell Soon", "Expired"].map((status) => ({
//     name: status,
//     count: products.filter((p) => p.freshness === status).length,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           🌾 Smart Crop Inventory Dashboard
//         </h1>

//         {!user ? (
//           <div className="text-center text-gray-700">
//             <p>No user logged in.</p>
//             <p className="text-sm text-gray-500 mt-2">
//               (Login via Supabase Auth before viewing inventory)
//             </p>
//           </div>
//         ) : (
//           <>
//             <form
//               onSubmit={addProduct}
//               className="bg-white shadow-md rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//             >
//               <input
//                 type="text"
//                 placeholder="Crop Name"
//                 value={newProduct.crop_name}
//                 onChange={(e) => setNewProduct({ ...newProduct, crop_name: e.target.value })}
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="number"
//                 placeholder="Weight"
//                 value={newProduct.weight}
//                 onChange={(e) => setNewProduct({ ...newProduct, weight: Number(e.target.value) })}
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <select
//                 value={newProduct.unit}
//                 onChange={(e) => setNewProduct({ ...newProduct, unit: e.target.value })}
//                 className="border p-2 rounded-md"
//               >
//                 <option value="kg">Kilograms</option>
//                 <option value="quintal">Quintals</option>
//               </select>
//               <input
//                 type="date"
//                 value={newProduct.harvest_date}
//                 onChange={(e) => setNewProduct({ ...newProduct, harvest_date: e.target.value })}
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="text"
//                 placeholder="Category (e.g., fruit, grain)"
//                 value={newProduct.category}
//                 onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
//               >
//                 <PlusCircle className="w-5 h-5 mr-2" /> Add Product
//               </button>
//             </form>

//             {loading ? (
//               <div className="flex justify-center items-center mt-10">
//                 <Loader2 className="animate-spin text-green-700 w-8 h-8" />
//               </div>
//             ) : (
//               <>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">Crop Freshness Overview</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <BarChart data={chartData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#22c55e" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>

//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">Freshness Distribution</h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <PieChart>
//                         <Pie data={chartData} dataKey="count" nameKey="name" outerRadius={100} label>
//                           {chartData.map((entry, index) => (
//                             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
//                   <h2 className="text-lg font-semibold text-green-800 mb-4">Your Products</h2>
//                   <table className="w-full border-collapse">
//                     <thead>
//                       <tr className="bg-green-100 text-green-800">
//                         <th className="p-2 border">Crop</th>
//                         <th className="p-2 border">Weight</th>
//                         <th className="p-2 border">Harvest Date</th>
//                         <th className="p-2 border">Category</th>
//                         <th className="p-2 border">Freshness</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((p) => (
//                         <tr key={p._id} className="text-center border">
//                           <td className="p-2 border">{p.crop_name}</td>
//                           <td className="p-2 border">
//                             {p.weight} {p.unit}
//                           </td>
//                           <td className="p-2 border">{p.harvest_date}</td>
//                           <td className="p-2 border capitalize">{p.category}</td>
//                           <td
//                             className={`p-2 border font-medium ${
//                               p.freshness === "Fresh"
//                                 ? "text-green-600"
//                                 : p.freshness === "Sell Soon"
//                                 ? "text-yellow-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {p.freshness}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inventory;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { createClient } from "@supabase/supabase-js";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { Loader2, PlusCircle } from "lucide-react";

// // 🔐 Supabase setup
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
// );

// interface Product {
//   _id?: string;
//   user_id: string;
//   crop_name: string;
//   weight: number;
//   unit: string;
//   harvest_date: string;
//   category: string;
//   freshness?: string;
//   created_at?: string;
// }

// const Inventory: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [newProduct, setNewProduct] = useState<Product>({
//     user_id: "",
//     crop_name: "",
//     weight: 0,
//     unit: "kg",
//     harvest_date: "",
//     category: "",
//   });

//   const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

//   // 🧩 Get Supabase Auth User
//   const getUser = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (data?.user) {
//       setUser(data.user);
//       setNewProduct((prev) => ({ ...prev, user_id: data.user.id }));
//     }
//   };

//   // 📦 Fetch all products for this user
//   const fetchProducts = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:8080/api/products/${user.id}`);
//       const updated = res.data.map((p: Product) => ({
//         ...p,
//         freshness: getFreshness(p.harvest_date, p.category),
//       }));
//       setProducts(updated);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ➕ Add new product
//   const addProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return alert("Please log in first!");
//     try {
//       await axios.post("http://localhost:8080/api/products", {
//         ...newProduct,
//         user_id: user.id,
//       });
//       setNewProduct({
//         user_id: user.id,
//         crop_name: "",
//         weight: 0,
//         unit: "kg",
//         harvest_date: "",
//         category: "",
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product");
//     }
//   };

//   // 🧮 Determine freshness
//   const getFreshness = (harvestDate: string, category: string): string => {
//     const now = new Date();
//     const harvest = new Date(harvestDate);
//     const diffDays = Math.floor((now.getTime() - harvest.getTime()) / (1000 * 3600 * 24));

//     let shelfLife = 30; // default
//     if (category.toLowerCase().includes("fruit")) shelfLife = 10;
//     if (category.toLowerCase().includes("vegetable")) shelfLife = 7;
//     if (category.toLowerCase().includes("grain")) shelfLife = 90;

//     if (diffDays < shelfLife * 0.5) return "Fresh";
//     if (diffDays < shelfLife) return "Sell Soon";
//     return "Expired";
//   };

//   // 🚀 On Mount
//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) fetchProducts();
//   }, [user]);

//   // 📊 Chart Data
//   const chartData = ["Fresh", "Sell Soon", "Expired"].map((status) => ({
//     name: status,
//     count: products.filter((p) => p.freshness === status).length,
//   }));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           🌾 Smart Crop Inventory Dashboard
//         </h1>

//         {!user ? (
//           <div className="text-center text-gray-700">
//             <p>No user logged in.</p>
//             <p className="text-sm text-gray-500 mt-2">
//               (Please login via Supabase before viewing inventory)
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Add Product Form */}
//             <form
//               onSubmit={addProduct}
//               className="bg-white shadow-md rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//             >
//               <input
//                 type="text"
//                 placeholder="Crop Name"
//                 value={newProduct.crop_name}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, crop_name: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="number"
//                 placeholder="Weight"
//                 value={newProduct.weight}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, weight: Number(e.target.value) })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <select
//                 value={newProduct.unit}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, unit: e.target.value })
//                 }
//                 className="border p-2 rounded-md"
//               >
//                 <option value="kg">Kilograms</option>
//                 <option value="quintal">Quintals</option>
//               </select>
//               <input
//                 type="date"
//                 value={newProduct.harvest_date}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, harvest_date: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="text"
//                 placeholder="Category (e.g., fruit, grain)"
//                 value={newProduct.category}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, category: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
//               >
//                 <PlusCircle className="w-5 h-5 mr-2" /> Add Product
//               </button>
//             </form>

//             {/* Analytics */}
//             {loading ? (
//               <div className="flex justify-center items-center mt-10">
//                 <Loader2 className="animate-spin text-green-700 w-8 h-8" />
//               </div>
//             ) : (
//               <>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   {/* Bar Chart */}
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">
//                       Crop Freshness Overview
//                     </h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <BarChart data={chartData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#22c55e" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Pie Chart */}
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">
//                       Freshness Distribution
//                     </h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <PieChart>
//                         <Pie
//                           data={chartData}
//                           dataKey="count"
//                           nameKey="name"
//                           cx="50%"
//                           cy="50%"
//                           outerRadius={100}
//                           label
//                         >
//                           {chartData.map((entry, index) => (
//                             <Cell
//                               key={index}
//                               fill={COLORS[index % COLORS.length]}
//                             />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Table */}
//                 <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
//                   <h2 className="text-lg font-semibold text-green-800 mb-4">
//                     Your Products
//                   </h2>
//                   <table className="w-full border-collapse">
//                     <thead>
//                       <tr className="bg-green-100 text-green-800">
//                         <th className="p-2 border">Crop</th>
//                         <th className="p-2 border">Weight</th>
//                         <th className="p-2 border">Harvest Date</th>
//                         <th className="p-2 border">Category</th>
//                         <th className="p-2 border">Freshness</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((p) => (
//                         <tr key={p._id} className="text-center border">
//                           <td className="p-2 border">{p.crop_name}</td>
//                           <td className="p-2 border">
//                             {p.weight} {p.unit}
//                           </td>
//                           <td className="p-2 border">{p.harvest_date}</td>
//                           <td className="p-2 border capitalize">{p.category}</td>
//                           <td
//                             className={`p-2 border font-medium ${
//                               p.freshness === "Fresh"
//                                 ? "text-green-600"
//                                 : p.freshness === "Sell Soon"
//                                 ? "text-yellow-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {p.freshness}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inventory;




// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { createClient } from "@supabase/supabase-js";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import { Loader2, PlusCircle, Save, Edit2, XCircle } from "lucide-react";

// // 🔐 Supabase setup
// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
// );

// interface Product {
//   _id?: string;
//   user_id: string;
//   crop_name: string;
//   weight: number;
//   unit: string;
//   harvest_date: string;
//   category: string;
//   freshness?: string;
//   created_at?: string;
// }

// const Inventory: React.FC = () => {
//   const [user, setUser] = useState<any>(null);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);

//   const [newProduct, setNewProduct] = useState<Product>({
//     user_id: "",
//     crop_name: "",
//     weight: 0,
//     unit: "kg",
//     harvest_date: "",
//     category: "",
//   });

//   const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

//   // 🧩 Get Supabase Auth User
//   const getUser = async () => {
//     const { data } = await supabase.auth.getUser();
//     if (data?.user) {
//       setUser(data.user);
//       setNewProduct((prev) => ({ ...prev, user_id: data.user.id }));
//     }
//   };

//   // 📦 Fetch all products for this user
//   const fetchProducts = async () => {
//     if (!user) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:8080/api/products/${user.id}`);
//       const updated = res.data.map((p: Product) => ({
//         ...p,
//         freshness: getFreshness(p.harvest_date, p.category),
//       }));
//       setProducts(updated);
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ➕ Add new product
//   const addProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return alert("Please log in first!");
//     try {
//       await axios.post("http://localhost:8080/api/products", {
//         ...newProduct,
//         user_id: user.id,
//       });
//       setNewProduct({
//         user_id: user.id,
//         crop_name: "",
//         weight: 0,
//         unit: "kg",
//         harvest_date: "",
//         category: "",
//       });
//       fetchProducts();
//     } catch (err) {
//       console.error("Error adding product:", err);
//       alert("Failed to add product");
//     }
//   };

//   // ✏️ Edit product
//   const handleEdit = (product: Product) => {
//     setEditingId(product._id || null);
//     setEditProduct({ ...product });
//   };

//   // 💾 Save updated product
//   const handleSave = async (id: string) => {
//     try {
//       await axios.put(`http://localhost:8080/api/products/${id}`, editProduct);
//       setEditingId(null);
//       setEditProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error("Error updating product:", err);
//       alert("Failed to update product");
//     }
//   };

//   // ❌ Cancel edit
//   const handleCancel = () => {
//     setEditingId(null);
//     setEditProduct(null);
//   };

//   // 🧮 Determine freshness
//   const getFreshness = (harvestDate: string, category: string): string => {
//     const now = new Date();
//     const harvest = new Date(harvestDate);
//     const diffDays = Math.floor((now.getTime() - harvest.getTime()) / (1000 * 3600 * 24));

//     let shelfLife = 30; // default
//     if (category.toLowerCase().includes("fruit")) shelfLife = 10;
//     if (category.toLowerCase().includes("vegetable")) shelfLife = 7;
//     if (category.toLowerCase().includes("grain")) shelfLife = 90;

//     if (diffDays < shelfLife * 0.5) return "Fresh";
//     if (diffDays < shelfLife) return "Sell Soon";
//     return "Expired";
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   useEffect(() => {
//     if (user) fetchProducts();
//   }, [user]);

//   // 📊 Chart Data
//   const chartData = ["Fresh", "Sell Soon", "Expired"].map((status) => ({
//     name: status,
//     count: products.filter((p) => p.freshness === status).length,
//   }));

//   const unitOptions = ["kg", "gram", "quintal", "ton", "litre", "ml", "bag"];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
//           🌾 Smart Crop Inventory Dashboard
//         </h1>

//         {!user ? (
//           <div className="text-center text-gray-700">
//             <p>No user logged in.</p>
//             <p className="text-sm text-gray-500 mt-2">
//               (Please login via Supabase before viewing inventory)
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Add Product Form */}
//             <form
//               onSubmit={addProduct}
//               className="bg-white shadow-md rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
//             >
//               <input
//                 type="text"
//                 placeholder="Crop Name"
//                 value={newProduct.crop_name}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, crop_name: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="number"
//                 placeholder="Weight"
//                 value={newProduct.weight}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, weight: Number(e.target.value) })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <select
//                 value={newProduct.unit}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, unit: e.target.value })
//                 }
//                 className="border p-2 rounded-md"
//               >
//                 {unitOptions.map((u) => (
//                   <option key={u} value={u}>
//                     {u}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 type="date"
//                 value={newProduct.harvest_date}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, harvest_date: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <input
//                 type="text"
//                 placeholder="Category (e.g., fruit, grain)"
//                 value={newProduct.category}
//                 onChange={(e) =>
//                   setNewProduct({ ...newProduct, category: e.target.value })
//                 }
//                 required
//                 className="border p-2 rounded-md"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
//               >
//                 <PlusCircle className="w-5 h-5 mr-2" /> Add Product
//               </button>
//             </form>

//             {/* Analytics */}
//             {loading ? (
//               <div className="flex justify-center items-center mt-10">
//                 <Loader2 className="animate-spin text-green-700 w-8 h-8" />
//               </div>
//             ) : (
//               <>
//                 <div className="grid md:grid-cols-2 gap-8">
//                   {/* Bar Chart */}
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">
//                       Crop Freshness Overview
//                     </h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <BarChart data={chartData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Bar dataKey="count" fill="#22c55e" />
//                       </BarChart>
//                     </ResponsiveContainer>
//                   </div>

//                   {/* Pie Chart */}
//                   <div className="bg-white rounded-xl shadow-md p-4">
//                     <h2 className="text-lg font-semibold text-green-800 mb-3">
//                       Freshness Distribution
//                     </h2>
//                     <ResponsiveContainer width="100%" height={300}>
//                       <PieChart>
//                         <Pie
//                           data={chartData}
//                           dataKey="count"
//                           nameKey="name"
//                           cx="50%"
//                           cy="50%"
//                           outerRadius={100}
//                           label
//                         >
//                           {chartData.map((entry, index) => (
//                             <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>

//                 {/* Table */}
//                 <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
//                   <h2 className="text-lg font-semibold text-green-800 mb-4">
//                     Your Products
//                   </h2>
//                   <table className="w-full border-collapse">
//                     <thead>
//                       <tr className="bg-green-100 text-green-800">
//                         <th className="p-2 border">Crop</th>
//                         <th className="p-2 border">Weight</th>
//                         <th className="p-2 border">Unit</th>
//                         <th className="p-2 border">Harvest Date</th>
//                         <th className="p-2 border">Category</th>
//                         <th className="p-2 border">Freshness</th>
//                         <th className="p-2 border">Action</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {products.map((p) => (
//                         <tr key={p._id} className="text-center border">
//                           <td className="p-2 border">{p.crop_name}</td>

//                           <td className="p-2 border">
//                             {editingId === p._id ? (
//                               <input
//                                 type="number"
//                                 value={editProduct?.weight || 0}
//                                 onChange={(e) =>
//                                   setEditProduct({
//                                     ...editProduct!,
//                                     weight: Number(e.target.value),
//                                   })
//                                 }
//                                 className="border rounded-md p-1 w-20"
//                               />
//                             ) : (
//                               p.weight
//                             )}
//                           </td>

//                           <td className="p-2 border">
//                             {editingId === p._id ? (
//                               <select
//                                 value={editProduct?.unit || "kg"}
//                                 onChange={(e) =>
//                                   setEditProduct({
//                                     ...editProduct!,
//                                     unit: e.target.value,
//                                   })
//                                 }
//                                 className="border rounded-md p-1"
//                               >
//                                 {unitOptions.map((u) => (
//                                   <option key={u} value={u}>
//                                     {u}
//                                   </option>
//                                 ))}
//                               </select>
//                             ) : (
//                               p.unit
//                             )}
//                           </td>

//                           <td className="p-2 border">{p.harvest_date}</td>
//                           <td className="p-2 border capitalize">{p.category}</td>
//                           <td
//                             className={`p-2 border font-medium ${
//                               p.freshness === "Fresh"
//                                 ? "text-green-600"
//                                 : p.freshness === "Sell Soon"
//                                 ? "text-yellow-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {p.freshness}
//                           </td>
//                           <td className="p-2 border">
//                             {editingId === p._id ? (
//                               <div className="flex justify-center space-x-2">
//                                 <button
//                                   onClick={() => handleSave(p._id!)}
//                                   className="text-green-600 hover:text-green-800"
//                                 >
//                                   <Save className="w-5 h-5" />
//                                 </button>
//                                 <button
//                                   onClick={handleCancel}
//                                   className="text-red-600 hover:text-red-800"
//                                 >
//                                   <XCircle className="w-5 h-5" />
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => handleEdit(p)}
//                                 className="text-blue-600 hover:text-blue-800"
//                               >
//                                 <Edit2 className="w-5 h-5" />
//                               </button>
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inventory;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Loader2, PlusCircle, Save, Edit2, XCircle, Trash2 } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";

// 🔐 Supabase setup
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!
);

interface Product {
  _id?: string;
  user_id: string;
  crop_name: string;
  weight: number;
  unit: string;
  harvest_date: string;
  category: string;
  freshness?: string;
  created_at?: string;
}

const Inventory: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [newProduct, setNewProduct] = useState<Product>({
    user_id: "",
    crop_name: "",
    weight: 0,
    unit: "kg",
    harvest_date: "",
    category: "",
  });

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

  // 🧩 Get Supabase Auth User
  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data?.user) {
      setUser(data.user);
      setNewProduct((prev) => ({ ...prev, user_id: data.user.id }));
    }
  };

  // 📦 Fetch all products for this user
  const fetchProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/products/${user.id}`);
      const updated = res.data.map((p: Product) => ({
        ...p,
        freshness: getFreshness(p.harvest_date, p.category),
      }));
      setProducts(updated);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ➕ Add new product
  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please log in first!");
    try {
      await axios.post("http://localhost:8080/api/products", {
        ...newProduct,
        user_id: user.id,
      });
      setNewProduct({
        user_id: user.id,
        crop_name: "",
        weight: 0,
        unit: "kg",
        harvest_date: "",
        category: "",
      });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product");
    }
  };

  // ✏️ Edit product
  const handleEdit = (product: Product) => {
    setEditingId(product._id || null);
    setEditProduct({ ...product });
  };

  // 💾 Save updated product
  const handleSave = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/products/${id}`, editProduct);
      setEditingId(null);
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Failed to update product");
    }
  };

  // ❌ Cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setEditProduct(null);
  };

  // 🗑️ Delete product
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product");
    }
  };

  // 🧮 Determine freshness
  const getFreshness = (harvestDate: string, category: string): string => {
    const now = new Date();
    const harvest = new Date(harvestDate);
    const diffDays = Math.floor((now.getTime() - harvest.getTime()) / (1000 * 3600 * 24));

    let shelfLife = 30; // default
    if (category.toLowerCase().includes("fruit")) shelfLife = 10;
    if (category.toLowerCase().includes("vegetable")) shelfLife = 7;
    if (category.toLowerCase().includes("grain")) shelfLife = 90;

    if (diffDays < shelfLife * 0.5) return "Fresh";
    if (diffDays < shelfLife) return "Sell Soon";
    return "Expired";
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  // 📊 Chart Data
  const chartData = ["Fresh", "Sell Soon", "Expired"].map((status) => ({
    name: status,
    count: products.filter((p) => p.freshness === status).length,
  }));

  const unitOptions = ["kg", "gram", "quintal", "ton", "litre", "ml", "bag"];

  return (
    <div className="flex min-h-screen">
        <Sidebar />
    
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          🌾 Smart Crop Inventory Dashboard
        </h1>

        {!user ? (
          <div className="text-center text-gray-700">
            <p>No user logged in.</p>
            <p className="text-sm text-gray-500 mt-2">
              (Please login via Supabase before viewing inventory)
            </p>
          </div>
        ) : (
          <>
            {/* Add Product Form */}
            <form
              onSubmit={addProduct}
              className="bg-white shadow-md rounded-xl p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Crop Name"
                value={newProduct.crop_name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, crop_name: e.target.value })
                }
                required
                className="border p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Weight"
                value={newProduct.weight}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, weight: Number(e.target.value) })
                }
                required
                className="border p-2 rounded-md"
              />
              <select
                value={newProduct.unit}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, unit: e.target.value })
                }
                className="border p-2 rounded-md"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={newProduct.harvest_date}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, harvest_date: e.target.value })
                }
                required
                className="border p-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Category (e.g., fruit, grain, vegetable)"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                required
                className="border p-2 rounded-md"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex items-center justify-center"
              >
                <PlusCircle className="w-5 h-5 mr-2" /> Add Product
              </button>
            </form>

            {/* Analytics */}
            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <Loader2 className="animate-spin text-green-700 w-8 h-8" />
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Bar Chart */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-semibold text-green-800 mb-3">
                      Crop Freshness Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#22c55e" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Pie Chart */}
                  <div className="bg-white rounded-xl shadow-md p-4">
                    <h2 className="text-lg font-semibold text-green-800 mb-3">
                      Freshness Distribution
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={chartData}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          label
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Table */}
                <div className="mt-10 bg-white p-5 rounded-xl shadow-md">
                  <h2 className="text-lg font-semibold text-green-800 mb-4">
                    Your Products
                  </h2>
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-green-100 text-green-800">
                        <th className="p-2 border">Crop</th>
                        <th className="p-2 border">Weight</th>
                        <th className="p-2 border">Unit</th>
                        <th className="p-2 border">Harvest Date</th>
                        <th className="p-2 border">Category</th>
                        <th className="p-2 border">Freshness</th>
                        <th className="p-2 border">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => (
                        <tr key={p._id} className="text-center border">
                          <td className="p-2 border">{p.crop_name}</td>

                          <td className="p-2 border">
                            {editingId === p._id ? (
                              <input
                                type="number"
                                value={editProduct?.weight || 0}
                                onChange={(e) =>
                                  setEditProduct({
                                    ...editProduct!,
                                    weight: Number(e.target.value),
                                  })
                                }
                                className="border rounded-md p-1 w-20"
                              />
                            ) : (
                              p.weight
                            )}
                          </td>

                          <td className="p-2 border">
                            {editingId === p._id ? (
                              <select
                                value={editProduct?.unit || "kg"}
                                onChange={(e) =>
                                  setEditProduct({
                                    ...editProduct!,
                                    unit: e.target.value,
                                  })
                                }
                                className="border rounded-md p-1"
                              >
                                {unitOptions.map((u) => (
                                  <option key={u} value={u}>
                                    {u}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              p.unit
                            )}
                          </td>

                          <td className="p-2 border">{p.harvest_date}</td>
                          <td className="p-2 border capitalize">{p.category}</td>
                          <td
                            className={`p-2 border font-medium ${
                              p.freshness === "Fresh"
                                ? "text-green-600"
                                : p.freshness === "Sell Soon"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {p.freshness}
                          </td>

                          <td className="p-2 border">
                            {editingId === p._id ? (
                              <div className="flex justify-center space-x-2">
                                <button
                                  onClick={() => handleSave(p._id!)}
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <Save className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <XCircle className="w-5 h-5" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-center space-x-3">
                                <button
                                  onClick={() => handleEdit(p)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <Edit2 className="w-5 h-5" />
                                </button>
                                <button
                                  onClick={() => handleDelete(p._id!)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
   
  );
};

export default Inventory;
