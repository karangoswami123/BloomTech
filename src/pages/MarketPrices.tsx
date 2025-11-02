import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const states = [
  'All States',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
];

export default function MarketPrices() {
  const [commodity, setCommodity] = useState('');
  const [state, setState] = useState('All States');
  const [prices, setPrices] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!commodity) {
      toast.error('Please enter a commodity name');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('market-prices', {
        body: { commodity, state: state !== 'All States' ? state : undefined },
      });

      if (error) {
        toast.error('Failed to fetch prices');
      } else if (data?.records) {
        setPrices(data.records);
        if (data.records.length > 0) {
          setSelectedItem(data.records[0]);
        }
        toast.success(`Found ${data.records.length} results`);
      }
    } finally {
      setLoading(false);
    }
  };

  const chartData = selectedItem
    ? Array.from({ length: 7 }, (_, i) => ({
        day: `Day ${i + 1}`,
        price: selectedItem.min_price + Math.random() * (selectedItem.max_price - selectedItem.min_price),
      }))
    : [];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Market Prices</h1>
          <p className="text-muted-foreground">Real-time commodity prices from markets across India</p>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Search Commodity</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Commodity</Label>
              <Input
                placeholder="e.g., Wheat, Rice, Tomato"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
              />
            </div>
            <div>
              <Label>State</Label>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={loading} className="w-full">
                <Search className="w-4 h-4 mr-2" />
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Market Listings</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {prices.length > 0 ? (
                prices.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedItem === item ? 'bg-primary/10' : 'bg-secondary hover:bg-secondary/80'
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{item.commodity}</h3>
                        <p className="text-xs text-muted-foreground">
                          {item.market}, {item.district}
                        </p>
                      </div>
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold mt-2">₹{item.modal_price}</p>
                    <p className="text-xs text-muted-foreground">
                      Min ₹{item.min_price} Max ₹{item.max_price}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">per {item.price_unit || 'quintal'}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No results. Try searching for a commodity.</p>
              )}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Price History</h2>
            {selectedItem ? (
              <>
                <div className="mb-6 p-4 bg-secondary rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Commodity</p>
                  <h3 className="font-bold text-xl">{selectedItem.commodity}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedItem.market} | {selectedItem.district}, {selectedItem.state}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Min Price</p>
                      <p className="font-bold text-lg text-primary">₹{selectedItem.min_price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Modal Price</p>
                      <p className="font-bold text-lg">₹{selectedItem.modal_price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Max Price</p>
                      <p className="font-bold text-lg text-destructive">₹{selectedItem.max_price}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Price Trend (Last 7 Days)</p>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                Select an item from the market listings to view price history
              </p>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
// import { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { mandiAPI } from '@/lib/api';
// import { TrendingUp, TrendingDown, Minus, Search } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { Sidebar } from '@/components/Sidebar'; // ✅ uncomment this

// interface MarketPrice {
//   state: string;
//   district: string;
//   market: string;
//   commodity: string;
//   variety: string;
//   arrival_date: string;
//   min_price: string;
//   max_price: string;
//   modal_price: string;
// }

// export default function MarketPrices() {
//   const { t } = useTranslation();
//   const [prices, setPrices] = useState<MarketPrice[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchCommodity, setSearchCommodity] = useState('');
//   const [selectedState, setSelectedState] = useState('all');
//   const [selectedPrice, setSelectedPrice] = useState<MarketPrice | null>(null);

//   const indianStates = [
//     'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//     'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
//     'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
//     'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
//     'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
//   ];

//   // Load default prices when page loads
//   useEffect(() => {
//     loadPrices();
//   }, []);

//   // API call to load market prices
//   const loadPrices = async (state?: string, commodity?: string) => {
//     setLoading(true);
//     try {
//       const data = await mandiAPI.getPrices(state, commodity);
//       if (Array.isArray(data.records)) {
//         setPrices(data.records);
//       } else {
//         setPrices([]);
//       }
//     } catch (error) {
//       console.error('Failed to load prices:', error);
//       setPrices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle user search
//   const handleSearch = () => {
//     loadPrices(selectedState === 'all' ? undefined : selectedState, searchCommodity);
//   };

//   // Determine price trend (up, down, stable)
//   const getPriceTrend = (price: MarketPrice) => {
//     const modal = parseFloat(price.modal_price);
//     const min = parseFloat(price.min_price);
//     const max = parseFloat(price.max_price);
//     const avg = (min + max) / 2;
//     if (modal > avg) return 'up';
//     if (modal < avg) return 'down';
//     return 'stable';
//   };

//   // Generate price trend chart data
//   const generatePriceChart = () => {
//     if (!selectedPrice) return [];
//     const modal = parseFloat(selectedPrice.modal_price);
//     const min = parseFloat(selectedPrice.min_price);
//     const max = parseFloat(selectedPrice.max_price);
//     return [
//       { day: 'Day 1', price: min },
//       { day: 'Day 2', price: min + (modal - min) * 0.3 },
//       { day: 'Day 3', price: min + (modal - min) * 0.6 },
//       { day: 'Day 4', price: modal },
//       { day: 'Day 5', price: modal + (max - modal) * 0.4 },
//       { day: 'Day 6', price: modal + (max - modal) * 0.7 },
//       { day: 'Day 7', price: max },
//     ];
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Header Section */}
//       <Sidebar />
//       <main className="flex-1 p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">
//           {t('marketPrices') || 'Market Prices'}
//         </h1>
//         <p className="text-muted-foreground">
//           Real-time commodity prices from markets across India
//         </p>
//       </div>

//       {/* Search Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle>{t('searchCommodity') || 'Search Commodity'}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="space-y-2">
//               <Label>{t('commodity') || 'Commodity'}</Label>
//               <Input
//                 placeholder="e.g., Wheat, Rice, Tomato"
//                 value={searchCommodity}
//                 onChange={(e) => setSearchCommodity(e.target.value)}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label>{t('state') || 'State'}</Label>
//               <Select value={selectedState} onValueChange={setSelectedState}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="All States" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All States</SelectItem>
//                   {indianStates.map(state => (
//                     <SelectItem key={state} value={state}>{state}</SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex items-end">
//               <Button className="w-full" onClick={handleSearch} disabled={loading}>
//                 <Search className="h-4 w-4 mr-2" />
//                 {loading ? 'Loading...' : t('search') || 'Search'}
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Market Data Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Left Side - Market Listings */}
//         <Card className="lg:col-span-1">
//           <CardHeader>
//             <CardTitle>Market Listings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {loading ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 Loading data...
//               </div>
//             ) : prices.length === 0 ? (
//               <div className="text-center py-8 text-muted-foreground">
//                 No data available.
//               </div>
//             ) : (
//               <div className="space-y-2 max-h-[500px] overflow-y-auto">
//                 {prices.slice(0, 20).map((price, index) => {
//                   const trend = getPriceTrend(price);
//                   return (
//                     <button
//                       key={index}
//                       onClick={() => setSelectedPrice(price)}
//                       className="w-full p-4 bg-accent hover:bg-accent/80 rounded-lg text-left transition-colors"
//                     >
//                       <div className="flex justify-between items-start mb-2">
//                         <div>
//                           <p className="font-semibold">{price.commodity}</p>
//                           <p className="text-sm text-muted-foreground">
//                             {price.market}, {price.district}
//                           </p>
//                         </div>
//                         {trend === 'up' && <TrendingUp className="h-5 w-5 text-green-600" />}
//                         {trend === 'down' && <TrendingDown className="h-5 w-5 text-red-600" />}
//                         {trend === 'stable' && <Minus className="h-5 w-5 text-muted-foreground" />}
//                       </div>
//                       <div className="flex justify-between items-end">
//                         <p className="text-2xl font-bold">₹{price.modal_price}</p>
//                         <p className="text-sm text-muted-foreground">per quintal</p>
//                       </div>
//                       <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
//                         <span>Min: ₹{price.min_price}</span>
//                         <span>Max: ₹{price.max_price}</span>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Right Side - Chart & Details */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Price History</CardTitle>
//           </CardHeader>
//           <CardContent>
//             {selectedPrice ? (
//               <div className="space-y-4">
//                 <div className="p-4 bg-accent rounded-lg">
//                   <p className="text-sm text-muted-foreground mb-1">Commodity</p>
//                   <p className="text-xl font-bold">{selectedPrice.commodity}</p>
//                   <p className="text-sm text-muted-foreground mt-2">
//                     {selectedPrice.variety} | {selectedPrice.market}, {selectedPrice.state}
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
//                     <p className="text-xs text-muted-foreground mb-1">Min Price</p>
//                     <p className="text-lg font-bold text-green-700 dark:text-green-400">₹{selectedPrice.min_price}</p>
//                   </div>
//                   <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
//                     <p className="text-xs text-muted-foreground mb-1">Modal Price</p>
//                     <p className="text-lg font-bold text-blue-700 dark:text-blue-400">₹{selectedPrice.modal_price}</p>
//                   </div>
//                   <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
//                     <p className="text-xs text-muted-foreground mb-1">Max Price</p>
//                     <p className="text-lg font-bold text-orange-700 dark:text-orange-400">₹{selectedPrice.max_price}</p>
//                   </div>
//                 </div>

//                 <div>
//                   <p className="text-sm font-medium mb-3">Price Trend (Last 7 Days)</p>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <LineChart data={generatePriceChart()}>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="day" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line
//                         type="monotone"
//                         dataKey="price"
//                         stroke="hsl(var(--chart-1))"
//                         strokeWidth={2}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             ) : (
//               <div className="text-center py-12 text-muted-foreground">
//                 Select a commodity to view price trends
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//       </main>
//     </div>
//   );
// }

