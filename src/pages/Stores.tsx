// // // // import React, { useState } from "react";
// // // // import axios from "axios";
// // // // import { Search, Loader2, ShoppingBag } from "lucide-react";

// // // // const Stores: React.FC = () => {
// // // //   const [query, setQuery] = useState("");
// // // //   const [results, setResults] = useState<any[]>([]);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState("");

// // // //   const handleSearch = async (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!query.trim()) return;
// // // //     setLoading(true);
// // // //     setError("");
// // // //     setResults([]);

// // // //     try {
// // // //       const options = {
// // // //         method: "GET",
// // // //         url: "https://google-search72.p.rapidapi.com/imagesearch",
// // // //         params: {
// // // //           q: query,
// // // //           gl: "in",
// // // //           lr: "lang_en",
// // // //           num: "12",
// // // //           page: "1",
// // // //         },
// // // //         headers: {
// // // //           "x-rapidapi-host": "google-search72.p.rapidapi.com",
// // // //           "x-rapidapi-key": "783fc65f81msh4c90e8769344700p11fb8fjsnf192b1467fc9",
// // // //         },
// // // //       };

// // // //       const response = await axios.request(options);
// // // //       const data = response.data.items || [];
// // // //       setResults(data);
// // // //     } catch (err: any) {
// // // //       console.error(err);
// // // //       setError("Failed to fetch results. Please try again later.");
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="p-8 min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
// // // //       <div className="max-w-6xl mx-auto">
// // // //         {/* Title */}
// // // //         <h1 className="text-3xl font-bold text-green-800 text-center mb-8 flex justify-center items-center gap-2">
// // // //           <ShoppingBag className="w-8 h-8 text-green-700" />
// // // //           Agri Marketplace – Seeds, Fertilizers & Tools
// // // //         </h1>

// // // //         {/* Search Bar */}
// // // //         <form
// // // //           onSubmit={handleSearch}
// // // //           className="flex items-center gap-3 bg-white shadow-lg rounded-full px-6 py-3"
// // // //         >
// // // //           <Search className="text-green-600 w-5 h-5" />
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search seeds, fertilizers, or equipment..."
// // // //             value={query}
// // // //             onChange={(e) => setQuery(e.target.value)}
// // // //             className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
// // // //           />
// // // //           <button
// // // //             type="submit"
// // // //             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-full transition-all"
// // // //           >
// // // //             Search
// // // //           </button>
// // // //         </form>

// // // //         {/* Loading Spinner */}
// // // //         {loading && (
// // // //           <div className="flex justify-center items-center mt-10">
// // // //             <Loader2 className="animate-spin text-green-700 w-8 h-8" />
// // // //             <p className="ml-3 text-green-700">Searching for best results...</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Error Message */}
// // // //         {error && (
// // // //           <p className="text-center text-red-600 mt-6 font-medium">{error}</p>
// // // //         )}

// // // //         {/* Results Grid */}
// // // //         {!loading && results.length > 0 && (
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
// // // //             {results.map((item, index) => (
// // // //               <a
// // // //                 key={index}
// // // //                 href={item.image?.contextLink || "#"}
// // // //                 target="_blank"
// // // //                 rel="noopener noreferrer"
// // // //                 className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all border border-green-100"
// // // //               >
// // // //                 <img
// // // //                   src={
// // // //                     item.link ||
// // // //                     item.image?.thumbnailLink ||
// // // //                     "https://via.placeholder.com/300x200?text=No+Image"
// // // //                   }
// // // //                   alt={item.title || "Product Image"}
// // // //                   className="w-full h-56 object-cover"
// // // //                 />
// // // //                 <div className="p-4">
// // // //                   <h2 className="font-semibold text-green-800 text-lg mb-2 line-clamp-2">
// // // //                     {item.title || "Untitled"}
// // // //                   </h2>
// // // //                   <p className="text-sm text-gray-600 line-clamp-3">
// // // //                     {item.snippet || "High quality agricultural product."}
// // // //                   </p>
// // // //                   <p className="text-sm text-green-700 font-semibold mt-2">
// // // //                     🌐{" "}
// // // //                     {item.image?.contextLink
// // // //                       ? new URL(item.image.contextLink).hostname
// // // //                       : "Unknown source"}
// // // //                   </p>
// // // //                 </div>
// // // //               </a>
// // // //             ))}
// // // //           </div>
// // // //         )}

// // // //         {/* No Results */}
// // // //         {!loading && !results.length && query && !error && (
// // // //           <p className="text-center text-gray-600 mt-6">
// // // //             No results found for “{query}”.
// // // //           </p>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Stores;
// // // import React, { useEffect } from "react";
// // // import { ShoppingCart, Leaf, Sprout } from "lucide-react";

// // // const Store: React.FC = () => {
// // //   useEffect(() => {
// // //     const existingScript = document.getElementById("gcse-script");

// // //     if (!existingScript) {
// // //       const script = document.createElement("script");
// // //       script.id = "gcse-script";
// // //       script.src = "https://cse.google.com/cse.js?cx=d14185941b0a44f43"; // Your Google CSE ID
// // //       script.async = true;
// // //       document.body.appendChild(script);
// // //     }
// // //   }, []);

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-green-100 via-lime-200 to-emerald-300 flex flex-col items-center justify-center p-6">
// // //       {/* Header */}
// // //       <div className="flex items-center space-x-3 mb-8 animate-fadeIn">
// // //         <div className="bg-green-600 text-white p-3 rounded-2xl shadow-md">
// // //           <ShoppingCart size={28} />
// // //         </div>
// // //         <h1 className="text-3xl md:text-4xl font-extrabold text-green-900">
// // //           Smart Farming Store
// // //         </h1>
// // //       </div>

// // //       {/* Subtitle */}
// // //       <p className="text-gray-700 text-lg mb-10 text-center max-w-xl leading-relaxed">
// // //         🌾 Find the best <span className="font-semibold">seeds</span>,{" "}
// // //         <span className="font-semibold">fertilizers</span>, and{" "}
// // //         <span className="font-semibold">farming equipment</span> online from trusted sources.
// // //       </p>

// // //       {/* Search Section */}
// // //       <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full md:w-3/4 lg:w-2/3">
// // //         <div className="flex items-center justify-center space-x-3 mb-6">
// // //           <Leaf className="text-green-600" size={30} />
// // //           <Sprout className="text-green-600" size={30} />
// // //         </div>

// // //         <div className="gcse-search"></div>
// // //       </div>

// // //       {/* Footer */}
// // //       <p className="text-sm text-gray-600 mt-10">
// // //         Powered by <span className="font-medium text-green-800">Google Custom Search</span>
// // //       </p>
// // //     </div>
// // //   );
// // // };

// // // export default Store;
// // // src/pages/Store.tsx
// // import React, { useEffect, useRef, useState } from "react";
// // import { ShoppingBag, Loader2 } from "lucide-react";

// // interface Product {
// //   title: string;
// //   link: string;
// //   image: string;
// //   price: string;
// //   site: string;
// //   snippet: string;
// // }

// // const Store: React.FC = () => {
// //   const searchRef = useRef<HTMLDivElement>(null);
// //   const [products, setProducts] = useState<Product[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Your CSE ID (from the script you gave)
// //   const CX = "2547568114fec4135";

// //   // Load the Google CSE script once
// //   useEffect(() => {
// //     const script = document.createElement("script");
// //     script.src = `https://cse.google.com/cse.js?cx=${CX}`;
// //     script.async = true;
// //     document.body.appendChild(script);

// //     script.onload = () => {
// //       // @ts-ignore – Google injects the global `google` object
// //       if (window.google) {
// //         // @ts-ignore
// //         window.google.search.cse.element.render({
// //           div: searchRef.current,
// //           tag: "search",
// //         });
// //       }
// //     };

// //     return () => {
// //       document.body.removeChild(script);
// //     };
// //   }, [CX]);

// //   // Listen for results (Google fires a callback)
// //   useEffect(() => {
// //     const handler = (e: any) => {
// //       if (!e || !e.results) return;
// //       setLoading(false);
// //       const items = e.results || [];

// //       const parsed: Product[] = items
// //         .map((item: any) => {
// //           const img =
// //             item.pagemap?.cse_image?.[0]?.src ||
// //             item.pagemap?.cse_thumbnail?.[0]?.src ||
// //             "https://via.placeholder.com/200?text=Product";

// //           const price = extractPrice(item.snippet || "");

// //           return {
// //             title: item.title || "Untitled",
// //             link: item.link,
// //             image: img,
// //             price,
// //             site: new URL(item.link).hostname.replace("www.", ""),
// //             snippet: item.snippet || "",
// //           };
// //         })
// //         .filter((p) => p.price !== "N/A"); // keep only priced items

// //       setProducts(parsed);
// //     };

// //     // @ts-ignore – Google CSE fires this event
// //     window.addEventListener("gcse-results", handler);
// //     return () => window.removeEventListener("gcse-results", handler);
// //   }, []);

// //   const handleSearchStart = () => {
// //     setLoading(true);
// //     setProducts([]);
// //     setError("");
// //   };

// //   // Hook into Google's search start
// //   useEffect(() => {
// //     const startHandler = () => handleSearchStart();
// //     // @ts-ignore
// //     window.addEventListener("gcse-search-start", startHandler);
// //     return () => window.removeEventListener("gcse-search-start", startHandler);
// //   }, []);

// //   const extractPrice = (text: string): string => {
// //     const match = text.match(/₹\s*([\d,]+(?:\.\d{2})?)/);
// //     return match ? `₹${match[1]}` : "N/A";
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
// //       <div className="max-w-7xl mx-auto">

// //         {/* Header */}
// //         <h1 className="text-4xl font-bold text-green-800 text-center mb-8 flex items-center justify-center gap-3">
// //           <ShoppingBag className="w-10 h-10 text-green-700" />
// //           Agri Marketplace – Seeds, Fertilizers & Tools
// //         </h1>

// //         {/* Google CSE Search Box */}
// //         <div className="max-w-2xl mx-auto mb-10">
// //           <div ref={searchRef} className="gcse-searchbox"></div>
// //           <div className="gcse-searchresults"></div>
// //         </div>

// //         {/* Loading */}
// //         {loading && (
// //           <div className="flex justify-center items-center mt-12">
// //             <Loader2 className="animate-spin text-green-700 w-9 h-9" />
// //             <p className="ml-3 text-green-700 font-medium">
// //               Searching for the best deals…
// //             </p>
// //           </div>
// //         )}

// //         {/* Error */}
// //         {error && (
// //           <p className="text-center text-red-600 mt-8 font-medium">{error}</p>
// //         )}

// //         {/* Product Cards */}
// //         {!loading && products.length > 0 && (
// //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
// //             {products.map((p, i) => (
// //               <a
// //                 key={i}
// //                 href={p.link}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-green-100 flex flex-col h-full"
// //               >
// //                 <div className="relative overflow-hidden h-56">
// //                   <img
// //                     src={p.image}
// //                     alt={p.title}
// //                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
// //                   />
// //                 </div>

// //                 <div className="p-4 flex-1 flex flex-col">
// //                   <h3 className="font-semibold text-green-800 text-lg line-clamp-2 mb-2">
// //                     {p.title}
// //                   </h3>
// //                   <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
// //                     {p.snippet}
// //                   </p>

// //                   <p className="text-2xl font-bold text-green-700 mb-1">
// //                     {p.price}
// //                   </p>

// //                   <div className="flex items-center justify-between mt-auto">
// //                     <p className="text-sm font-medium text-green-700">
// //                       {p.site}
// //                     </p>
// //                     <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
// //                       Buy Now
// //                     </span>
// //                   </div>
// //                 </div>
// //               </a>
// //             ))}
// //           </div>
// //         )}

// //         {/* No results */}
// //         {!loading && !products.length && !error && (
// //           <p className="text-center text-gray-600 mt-12">
// //             Type a product name above to see cards.
// //           </p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Store;
// // src/pages/Store.tsx
// import React, { useState } from "react";
// import axios from "axios";
// import { Search, Loader2, ShoppingBag, ExternalLink } from "lucide-react";

// interface Product {
//   title: string;
//   link: string;
//   image: string;
//   price: string;
//   site: string;
// }

// const Store: React.FC = () => {
//   const [query, setQuery] = useState("");
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!query.trim()) return;

//     setLoading(true);
//     setError("");
//     setProducts([]);

//     const searchTerm = encodeURIComponent(query);
//     const sources = [
//       { name: "Amazon", url: `https://www.amazon.com/s?k=${searchTerm}` },
//       { name: "eBay", url: `https://www.ebay.com/sch/i.html?_nkw=${searchTerm}` },
//       { name: "Walmart", url: `https://www.walmart.com/search?q=${searchTerm}` },
//       { name: "Flipkart", url: `https://www.flipkart.com/search?q=${searchTerm}` },
//       { name: "Ugaoo", url: `https://www.ugaoo.com/search?q=${searchTerm}` },
//       { name: "BigHaat", url: `https://www.bighaat.com/search?q=${searchTerm}` },
//       { name: "NativeIndianOrganics", url: `https://nativeindianorganics.com/?s=${searchTerm}&post_type=product` },
//       { name: "PlantsGuru", url: `https://plantsguru.com/search?q=${searchTerm}` },
//       { name: "TrustBasket", url: `https://trustbasket.com/search?q=${searchTerm}` },
//       { name: "AffordableOrganicStore", url: `https://theaffordableorganicstore.com/?s=${searchTerm}&post_type=product` },
//       { name: "FarmSeed", url: `https://farmseed.in/?s=${searchTerm}&post_type=product` },
//     ];

//     const allProducts: Product[] = [];

//     for (const source of sources) {
//       try {
//         const { data } = await axios.get(
//           `https://api.allorigins.win/get?url=${encodeURIComponent(source.url)}`
//         );
//         const html = data.contents;
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, "text/html");

//         let items: Product[] = [];

//         if (source.name === "Amazon") {
//           items = Array.from(doc.querySelectorAll("div[data-component-type='s-search-result']")).map((el) => {
//             const title = el.querySelector("h2 a")?.textContent?.trim() || "Product";
//             const link = "https://amazon.com" + (el.querySelector("h2 a")?.getAttribute("href") || "");
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const priceWhole = el.querySelector(".a-price-whole")?.textContent?.trim() || "";
//             const priceFraction = el.querySelector(".a-price-fraction")?.textContent?.trim() || "";
//             const price = priceWhole + (priceFraction ? "." + priceFraction : "");
//             return { title, link, image, price: price ? `$${price}` : "N/A", site: "amazon.com" };
//           });
//         }

//         if (source.name === "eBay") {
//           items = Array.from(doc.querySelectorAll(".s-item")).map((el) => {
//             const title = el.querySelector(".s-item__title")?.textContent?.trim() || "Product";
//             const link = el.querySelector(".s-item__link")?.getAttribute("href") || "";
//             const image = el.querySelector(".s-item__image-img")?.getAttribute("src") || "";
//             const price = el.querySelector(".s-item__price")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "ebay.com" };
//           });
//         }

//         if (source.name === "Walmart") {
//           items = Array.from(doc.querySelectorAll("[data-automation-id='product-tile']")).map((el) => {
//             const title = el.querySelector("span")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const fullLink = link.startsWith("http") ? link : `https://walmart.com${link}`;
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector("[data-automation-id='product-price']")?.textContent?.trim() || "N/A";
//             return { title, link: fullLink, image, price, site: "walmart.com" };
//           });
//         }

//         if (source.name === "Flipkart") {
//           items = Array.from(doc.querySelectorAll("._1AtVbE, ._4ddWXP")).map((el) => {
//             const title = el.querySelector("a")?.getAttribute("title") || el.querySelector("img")?.getAttribute("alt") || "Product";
//             const link = "https://flipkart.com" + (el.querySelector("a")?.getAttribute("href") || "");
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector("._30jeq3, ._1_WHN1")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "flipkart.com" };
//           });
//         }

//         if (source.name === "Ugaoo") {
//           items = Array.from(doc.querySelectorAll(".product-item")).map((el) => {
//             const title = el.querySelector(".product-title")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector(".price")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "ugaoo.com" };
//           });
//         }

//         if (source.name === "BigHaat") {
//           items = Array.from(doc.querySelectorAll(".product-grid-item")).map((el) => {
//             const title = el.querySelector(".product-title")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector(".price")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "bighaat.com" };
//           });
//         }

//         if (["NativeIndianOrganics", "AffordableOrganicStore", "FarmSeed"].includes(source.name)) {
//           items = Array.from(doc.querySelectorAll(".product, .woocommerce-LoopProduct-link")).map((el) => {
//             const title = el.querySelector(".woocommerce-loop-product__title")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector(".amount, .price")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: source.name.toLowerCase().replace(/[^a-z]/g, "") + ".com" };
//           });
//         }

//         if (source.name === "PlantsGuru") {
//           items = Array.from(doc.querySelectorAll(".product")).map((el) => {
//             const title = el.querySelector(".woocommerce-loop-product__title")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector(".amount")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "plantsguru.com" };
//           });
//         }

//         if (source.name === "TrustBasket") {
//           items = Array.from(doc.querySelectorAll(".product")).map((el) => {
//             const title = el.querySelector(".product-title")?.textContent?.trim() || "Product";
//             const link = el.querySelector("a")?.getAttribute("href") || "";
//             const image = el.querySelector("img")?.getAttribute("src") || "";
//             const price = el.querySelector(".price")?.textContent?.trim() || "N/A";
//             return { title, link, image, price, site: "trustbasket.com" };
//           });
//         }

//         allProducts.push(...items.filter(p => p.price !== "N/A" && p.image && p.title !== "Product"));
//       } catch (err) {
//         console.error(`Failed to scrape ${source.name}:`, err);
//       }
//     }

//     // Sort by price (optional)
//     const sorted = allProducts.sort((a, b) => {
//       const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
//       const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
//       return priceA - priceB;
//     });

//     setProducts(sorted.slice(0, 16));
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-4xl font-bold text-green-800 text-center mb-8 flex items-center justify-center gap-3">
//           <ShoppingBag className="w-10 h-10 text-green-700" />
//           Indian Agri Marketplace
//         </h1>

//         <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white shadow-xl rounded-full p-2 max-w-2xl mx-auto">
//           <Search className="text-green-600 w-6 h-6 ml-4" />
//           <input
//             type="text"
//             placeholder="Search seeds, fertilizers, tools (e.g. tomato seeds)"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg"
//           />
//           <button
//             type="submit"
//             className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full transition"
//           >
//             Search
//           </button>
//         </form>

//         {loading && (
//           <div className="flex justify-center items-center mt-12">
//             <Loader2 className="animate-spin text-green-700 w-9 h-9" />
//             <p className="ml-3 text-green-700 font-medium">
//               Scraping Amazon, Flipkart, BigHaat, Ugaoo, and more...
//             </p>
//           </div>
//         )}

//         {error && <p className="text-center text-red-600 mt-8 font-medium">{error}</p>}

//         {!loading && products.length > 0 && (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
//             {products.map((p, i) => (
//               <a
//                 key={i}
//                 href={p.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-green-100 flex flex-col h-full"
//               >
//                 <div className="relative overflow-hidden h-56">
//                   <img
//                     src={p.image}
//                     alt={p.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                     onError={(e) => {
//                       e.currentTarget.src = "https://via.placeholder.com/200?text=No+Image";
//                     }}
//                   />
//                 </div>

//                 <div className="p-4 flex-1 flex flex-col">
//                   <h3 className="font-semibold text-green-800 text-lg line-clamp-2 mb-2">
//                     {p.title}
//                   </h3>
//                   <p className="text-2xl font-bold text-green-700 mb-1">{p.price}</p>
//                   <div className="flex items-center justify-between mt-auto">
//                     <p className="text-sm font-medium text-green-700 flex items-center gap-1">
//                       <ExternalLink className="w-4 h-4" />
//                       {p.site}
//                     </p>
//                     <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">
//                       Buy Now
//                     </span>
//                   </div>
//                 </div>
//               </a>
//             ))}
//           </div>
//         )}

//         {!loading && !products.length && query && !error && (
//           <p className="text-center text-gray-600 mt-12">
//             No products found for "{query}".
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Store;
// src/pages/Store.tsx
import React, { useState } from "react";
import axios from "axios";
import { Search, Loader2, ShoppingBag, ExternalLink } from "lucide-react";

interface Product {
  title: string;
  link: string;
  image: string;
  price: string;
  site: string;
}

const FIRECRAWL_SEARCH = "https://api.firecrawl.dev/v0/search";

const Stores: React.FC = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // ────── Firecrawl SEARCH (no manual URLs) ──────
  const searchWithFirecrawl = async (q: string): Promise<string[]> => {
    try {
      const { data } = await axios.post(
        FIRECRAWL_SEARCH,
        {
          query: q,
          // Optional: limit to Indian agri stores
          pageOptions: { onlyMainContent: false },
        },
        {
          headers: { Authorization: `Bearer ${import.meta.env.VITE_FIRECRAWL_API_KEY}` },
        }
      );
      // Returns array of { url, snippet, title }
      return data?.data?.map((r: any) => r.url) || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  // ────── Scrape a single result page ──────
  const scrapePage = async (url: string): Promise<Product[]> => {
    try {
      const { data } = await axios.post(
        "https://api.firecrawl.dev/v0/scrape",
        { url, pageOptions: { onlyMainContent: false } },
        { headers: { Authorization: `Bearer ${'fc-a82010d405534aba88aad1baecc9ccca'}` } }
      );
      const html = data?.data?.content || "";
      return extractProducts(html, url);
    } catch {
      return [];
    }
  };

  // ────── UNIVERSAL product extractor ──────
  const extractProducts = (html: string, baseUrl: string): Product[] => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const items: Product[] = [];

    const links = doc.querySelectorAll("a");
    for (const a of Array.from(links).slice(0, 30)) {
      const img = a.querySelector("img");
      if (!img) continue;

      const title =
        a.getAttribute("title")?.trim() ||
        a.getAttribute("aria-label")?.trim() ||
        img.getAttribute("alt")?.trim() ||
        a.textContent?.trim().split("\n")[0].trim() ||
        "";
      if (!title || title.length < 5) continue;

      const rawLink = a.getAttribute("href") || "";
      const link = rawLink.startsWith("http")
        ? rawLink
        : `${new URL(baseUrl).origin}${rawLink.startsWith("/") ? "" : "/"}${rawLink}`;

      const image =
        img.getAttribute("src") ||
        img.getAttribute("data-src") ||
        img.getAttribute("data-lazy-src") ||
        img.getAttribute("srcset")?.split(",")[0].trim().split(" ")[0] ||
        "";
      if (!image || image.includes("placeholder")) continue;

      const priceEl =
        a.closest("[class*='price'],[class*='Price'],[class*='amount']") ||
        a.querySelector("[class*='price'],[class*='Price'],[class*='amount'],span,div");
      const priceTxt = priceEl?.textContent?.trim() || "";
      const priceMatch = priceTxt.match(/[$₹]\s*[\d,]+(\.\d+)?/)?.[0];
      if (!priceMatch) continue;

      items.push({
        title,
        link,
        image,
        price: priceMatch.trim(),
        site: new URL(baseUrl).hostname,
      });
    }
    return items;
  };

  // ────── Search handler ──────
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setProducts([]);

    const searchResults = await searchWithFirecrawl(query.trim());
    if (!searchResults.length) {
      setLoading(false);
      return;
    }

    const all: Product[] = [];
    // Scrape top N results (adjust as needed)
    for (const url of searchResults.slice(0, 10)) {
      const prods = await scrapePage(url);
      all.push(...prods);
    }

    // Dedupe + sort + limit
    const seen = new Set<string>();
    const uniq = all.filter(p => !seen.has(p.link) && seen.add(p.link));
    const sorted = uniq
      .sort((a, b) => {
        const pa = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 999999;
        const pb = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 999999;
        return pa - pb;
      })
      .slice(0, 16);

    setProducts(sorted);
    setLoading(false);
  };

  // ────── UI – ONLY product search field ──────
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 text-center mb-8 flex items-center justify-center gap-3">
          <ShoppingBag className="w-10 h-10 text-green-700" />
          Indian Agri Marketplace
        </h1>

        <form onSubmit={handleSearch} className="flex items-center gap-3 bg-white shadow-xl rounded-full p-2 max-w-2xl mx-auto">
          <Search className="text-green-600 w-6 h-6 ml-4" />
          <input
            type="text"
            placeholder="Search urea, seeds, tools..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-lg"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            {loading ? "Searching…" : "Search"}
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center mt-12">
            <Loader2 className="animate-spin text-green-700 w-9 h-9" />
            <p className="ml-3 text-green-700 font-medium">Searching & scraping with Firecrawl…</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {products.map((p, i) => (
              <a
                key={i}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-green-100 flex flex-col h-full"
              >
                <div className="relative overflow-hidden h-56 bg-gray-50">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition"
                    onError={e => (e.currentTarget.src = "https://via.placeholder.com/200x200/10B981/FFFFFF?text=No+Image")}
                    loading="lazy"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-semibold text-green-800 text-lg line-clamp-2 mb-2">{p.title}</h3>
                  <p className="text-2xl font-bold text-green-700 mb-1">{p.price}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-sm font-medium text-green-700 flex items-center gap-1 truncate">
                      <ExternalLink className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{p.site}</span>
                    </p>
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full">Buy Now</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {!loading && !products.length && query && (
          <p className="text-center text-gray-600 mt-12">
            No products found for "<strong>{query}</strong>".
          </p>
        )}
      </div>
    </div>
  );
};

export default Stores;