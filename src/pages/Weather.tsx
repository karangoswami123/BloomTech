// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, CloudRain, Sun, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '@/contexts/LanguageContext';

// export default function Weather() {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState('');
//   const { t } = useLanguage();

//   useEffect(() => {
//     const savedWeather = localStorage.getItem('weatherData');
//     if (savedWeather) {
//       setWeather(JSON.parse(savedWeather));
//     }
//   }, []);

//   const fetchWeather = async (locationInput?: string) => {
//     if (!locationInput && !location) {
//       toast.error('Please enter a location');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const { data, error } = await supabase.functions.invoke('weather', {
//         body: {
//           location: locationInput || location,
//         },
//       });
      
//       if (error) {
//         toast.error('Failed to fetch weather data');
//         setLoading(false);
//       } else if (data) {
//         if (data.cod === 401 || data.error) {
//           toast.error(data.message || data.error || 'Failed to fetch weather data');
//           setLoading(false);
//           return;
//         }
//         setWeather(data);
//         localStorage.setItem('weatherData', JSON.stringify(data));
//         toast.success('Weather data loaded');
//         setLoading(false);
//       }
//     } catch (error) {
//       setLoading(false);
//       toast.error('Error fetching weather');
//     }
//   };

//   const getFarmingAdvice = () => {
//     if (!weather?.current) return 'Enable location to get personalized farming advice';
    
//     const temp = weather.current.temp;
//     const humidity = weather.current.humidity;
//     const rain = weather.daily?.[0]?.rain || 0;
    
//     let advice = [];
    
//     if (temp > 35) {
//       advice.push('🌡️ High temperature: Ensure adequate irrigation. Consider shade nets for sensitive crops.');
//     } else if (temp < 15) {
//       advice.push('❄️ Low temperature: Protect sensitive crops from cold. Consider mulching.');
//     }
    
//     if (humidity > 80) {
//       advice.push('💧 High humidity: Monitor for fungal diseases. Ensure good air circulation.');
//     } else if (humidity < 40) {
//       advice.push('🌵 Low humidity: Increase irrigation frequency. Consider misting for certain crops.');
//     }
    
//     if (rain > 5) {
//       advice.push('🌧️ Rain expected: Delay pesticide application. Check drainage systems.');
//     } else if (rain === 0 && weather.daily?.slice(0, 3).every((d: any) => (d.rain || 0) === 0)) {
//       advice.push('☀️ Dry period ahead: Plan irrigation schedule. Check soil moisture regularly.');
//     }
    
//     if (weather.current.wind_speed > 8) {
//       advice.push('💨 High winds: Secure young plants and structures. Delay spraying operations.');
//     }
    
//     return advice.length > 0 ? advice.join('\n\n') : '✅ Weather conditions are favorable for normal farming operations.';
//   };

//   const getForecastData = () => {
//     if (!weather?.daily) return [];
//     return weather.daily.slice(0, 5).map((day: any, index: number) => ({
//       day: index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//       temp: Math.round(day.temp.day),
//       humidity: day.humidity,
//       rain: Math.round((day.rain || 0) * 100) / 100,
//     }));
//   };

//   const weatherMetrics = [
//     {
//       label: 'Min / Max',
//       value: weather?.current?.temp
//         ? `${Math.round(weather.daily?.[0]?.temp?.min || 0)}° / ${Math.round(
//             weather.daily?.[0]?.temp?.max || 0
//           )}°`
//         : 'NaN° / NaN°',
//       icon: Thermometer,
//       color: 'hsl(var(--humidity-green))',
//     },
//     {
//       label: 'Humidity',
//       value: weather?.current?.humidity ? `${weather.current.humidity}%` : '%',
//       icon: Droplets,
//       color: 'hsl(var(--humidity-green))',
//     },
//     {
//       label: 'Wind Speed',
//       value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : 'NaN m/s',
//       icon: Wind,
//       color: 'hsl(var(--humidity-green))',
//     },
//     {
//       label: 'Visibility',
//       value: weather?.current?.visibility ? `${(weather.current.visibility / 1000).toFixed(1)} km` : 'NaN km',
//       icon: Eye,
//       color: 'hsl(var(--humidity-green))',
//     },
//     {
//       label: 'Pressure',
//       value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : 'hPa',
//       icon: Gauge,
//       color: 'hsl(var(--humidity-green))',
//     },
//     {
//       label: 'Sunrise',
//       value: weather?.current?.sunrise
//         ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : 'Invalid Date',
//       icon: Sunrise,
//       color: 'hsl(var(--humidity-green))',
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">Weather</h1>

//         <Card className="p-4 mb-6">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-2 block">{t('location')}</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder={t('enterLocation')}
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Button onClick={() => fetchWeather()} disabled={loading}>
//               {loading ? t('loading') : t('getWeather')}
//             </Button>
//           </div>
//         </Card>

//         <div className="grid grid-cols-2 gap-6">
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
//             {loading ? (
//               <p className="text-muted-foreground">Loading...</p>
//             ) : (
//               <>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-6xl font-bold">
//                     {weather?.current?.temp ? Math.round(weather.current.temp) : 'NaN'}°C
//                   </span>
//                   <span className="text-lg text-muted-foreground">
//                     Feels like {weather?.current?.feels_like ? Math.round(weather.current.feels_like) : 'NaN'}°C
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   {weatherMetrics.map((metric) => {
//                     const Icon = metric.icon;
//                     return (
//                       <div key={metric.label} className="p-3 rounded-lg" style={{ backgroundColor: metric.color }}>
//                         <div className="flex items-center gap-2 mb-1">
//                           <Icon className="w-4 h-4 text-foreground/70" />
//                           <span className="text-xs text-foreground/70">{metric.label}</span>
//                         </div>
//                         <p className="font-semibold">{metric.value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </Card>

//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Farming Advice</h2>
//             {loading ? (
//               <p className="text-sm text-muted-foreground">Loading advice...</p>
//             ) : (
//               <div className="text-sm whitespace-pre-line">
//                 {getFarmingAdvice()}
//               </div>
//             )}
//           </Card>
//         </div>

//         <Card className="p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
//           {loading ? (
//             <p className="text-sm text-muted-foreground">Loading forecast...</p>
//           ) : weather?.daily ? (
//             <div className="space-y-6">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={getForecastData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip />
//                   <Legend />
//                   <Line yAxisId="left" type="monotone" dataKey="temp" stroke="hsl(var(--weather-blue))" name="Temperature (°C)" />
//                   <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="hsl(var(--humidity-green))" name="Humidity (%)" />
//                   <Line yAxisId="right" type="monotone" dataKey="rain" stroke="hsl(var(--wind-purple))" name="Rain (mm)" />
//                 </LineChart>
//               </ResponsiveContainer>
              
//               <div className="grid grid-cols-5 gap-4">
//                 {weather.daily.slice(0, 5).map((day: any, index: number) => (
//                   <div key={index} className="text-center p-4 rounded-lg bg-muted">
//                     <p className="font-semibold mb-2">
//                       {index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
//                     </p>
//                     <div className="text-2xl mb-2">
//                       {day.weather?.[0]?.main === 'Rain' ? '🌧️' : day.weather?.[0]?.main === 'Clouds' ? '☁️' : '☀️'}
//                     </div>
//                     <p className="text-sm">
//                       {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {day.weather?.[0]?.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground">Enable location to view forecast</p>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// // }
// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '@/contexts/LanguageContext';

// export default function Weather() {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [location, setLocation] = useState('');
//   const { t } = useLanguage();

//   useEffect(() => {
//     const savedWeather = localStorage.getItem('weatherData');
//     if (savedWeather) {
//       setWeather(JSON.parse(savedWeather));
//     }
//   }, []);

//   // 🔹 Direct Fetch from OpenWeatherMap
//   const fetchWeather = async (locationInput?: string) => {
//     if (!locationInput && !location) {
//       toast.error('Please enter a location');
//       return;
//     }

//     setLoading(true);
//     const query = locationInput || location;
//     const apiKey = 'afd5ebe5330358cf21d980967946f38d'; // 🔹 Replace with your actual key

//     try {
//       // Fetch current weather
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`
//       );
//       const weatherData = await weatherRes.json();

//       if (!weatherRes.ok) {
//         toast.error(weatherData.message || 'Failed to fetch weather data');
//         setLoading(false);
//         return;
//       }

//       // Fetch 5-day forecast
//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`
//       );
//       const forecastData = await forecastRes.json();

//       if (!forecastRes.ok) {
//         toast.error(forecastData.message || 'Failed to fetch forecast');
//         setLoading(false);
//         return;
//       }

//       // Combine current + forecast in OneCall-like structure
//       const combinedData = {
//         current: {
//           temp: weatherData.main.temp,
//           feels_like: weatherData.main.feels_like,
//           humidity: weatherData.main.humidity,
//           pressure: weatherData.main.pressure,
//           visibility: weatherData.visibility,
//           wind_speed: weatherData.wind.speed,
//           sunrise: weatherData.sys.sunrise,
//           weather: weatherData.weather,
//         },
//         daily: forecastData.list.slice(0, 5).map((entry: any) => ({
//           dt: entry.dt,
//           temp: {
//             day: entry.main.temp,
//             min: entry.main.temp_min,
//             max: entry.main.temp_max,
//           },
//           humidity: entry.main.humidity,
//           weather: entry.weather,
//           rain: entry.rain ? entry.rain['3h'] || 0 : 0,
//         })),
//       };

//       setWeather(combinedData);
//       localStorage.setItem('weatherData', JSON.stringify(combinedData));
//       toast.success('Weather data loaded');
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching weather');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Farming advice generator
//   const getFarmingAdvice = () => {
//     if (!weather?.current) return 'Enable location to get personalized farming advice';

//     const temp = weather.current.temp;
//     const humidity = weather.current.humidity;
//     const rain = weather.daily?.[0]?.rain || 0;

//     let advice: string[] = [];

//     if (temp > 35) {
//       advice.push('🌡️ High temperature: Ensure adequate irrigation. Consider shade nets for sensitive crops.');
//     } else if (temp < 15) {
//       advice.push('❄️ Low temperature: Protect sensitive crops from cold. Consider mulching.');
//     }

//     if (humidity > 80) {
//       advice.push('💧 High humidity: Monitor for fungal diseases. Ensure good air circulation.');
//     } else if (humidity < 40) {
//       advice.push('🌵 Low humidity: Increase irrigation frequency. Consider misting for certain crops.');
//     }

//     if (rain > 5) {
//       advice.push('🌧️ Rain expected: Delay pesticide application. Check drainage systems.');
//     } else if (rain === 0 && weather.daily?.slice(0, 3).every((d: any) => (d.rain || 0) === 0)) {
//       advice.push('☀️ Dry period ahead: Plan irrigation schedule. Check soil moisture regularly.');
//     }

//     if (weather.current.wind_speed > 8) {
//       advice.push('💨 High winds: Secure young plants and structures. Delay spraying operations.');
//     }

//     return advice.length > 0
//       ? advice.join('\n\n')
//       : '✅ Weather conditions are favorable for normal farming operations.';
//   };

//   // 🔹 Forecast data for chart
//   const getForecastData = () => {
//     if (!weather?.daily) return [];
//     return weather.daily.map((day: any, index: number) => ({
//       day: index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//       temp: Math.round(day.temp.day),
//       humidity: day.humidity,
//       rain: Math.round((day.rain || 0) * 100) / 100,
//     }));
//   };

//   // 🔹 Weather metrics for cards
//   const weatherMetrics = [
//     {
//       label: 'Min / Max',
//       value: weather?.daily?.[0]
//         ? `${Math.round(weather.daily[0].temp.min)}° / ${Math.round(weather.daily[0].temp.max)}°`
//         : 'NaN° / NaN°',
//       icon: Thermometer,
//     },
//     {
//       label: 'Humidity',
//       value: weather?.current?.humidity ? `${weather.current.humidity}%` : '%',
//       icon: Droplets,
//     },
//     {
//       label: 'Wind Speed',
//       value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : 'NaN m/s',
//       icon: Wind,
//     },
//     {
//       label: 'Visibility',
//       value: weather?.current?.visibility ? `${(weather.current.visibility / 1000).toFixed(1)} km` : 'NaN km',
//       icon: Eye,
//     },
//     {
//       label: 'Pressure',
//       value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : 'hPa',
//       icon: Gauge,
//     },
//     {
//       label: 'Sunrise',
//       value: weather?.current?.sunrise
//         ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : 'Invalid Date',
//       icon: Sunrise,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">Weather</h1>

//         <Card className="p-4 mb-6">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-2 block">{t('location')}</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder={t('enterLocation')}
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Button onClick={() => fetchWeather()} disabled={loading}>
//               {loading ? t('loading') : t('getWeather')}
//             </Button>
//           </div>
//         </Card>

//         <div className="grid grid-cols-2 gap-6">
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
//             {loading ? (
//               <p className="text-muted-foreground">Loading...</p>
//             ) : (
//               <>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-6xl font-bold">
//                     {weather?.current?.temp ? Math.round(weather.current.temp) : 'NaN'}°C
//                   </span>
//                   <span className="text-lg text-muted-foreground">
//                     Feels like {weather?.current?.feels_like ? Math.round(weather.current.feels_like) : 'NaN'}°C
//                   </span>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3">
//                   {weatherMetrics.map((metric) => {
//                     const Icon = metric.icon;
//                     return (
//                       <div key={metric.label} className="p-3 rounded-lg bg-muted">
//                         <div className="flex items-center gap-2 mb-1">
//                           <Icon className="w-4 h-4 text-foreground/70" />
//                           <span className="text-xs text-foreground/70">{metric.label}</span>
//                         </div>
//                         <p className="font-semibold">{metric.value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             )}
//           </Card>

//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Farming Advice</h2>
//             {loading ? (
//               <p className="text-sm text-muted-foreground">Loading advice...</p>
//             ) : (
//               <div className="text-sm whitespace-pre-line">{getFarmingAdvice()}</div>
//             )}
//           </Card>
//         </div>

//         <Card className="p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
//           {loading ? (
//             <p className="text-sm text-muted-foreground">Loading forecast...</p>
//           ) : weather?.daily ? (
//             <div className="space-y-6">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={getForecastData()}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="day" />
//                   <YAxis yAxisId="left" />
//                   <YAxis yAxisId="right" orientation="right" />
//                   <Tooltip />
//                   <Legend />
//                   <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#3b82f6" name="Temperature (°C)" />
//                   <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#22c55e" name="Humidity (%)" />
//                   <Line yAxisId="right" type="monotone" dataKey="rain" stroke="#8b5cf6" name="Rain (mm)" />
//                 </LineChart>
//               </ResponsiveContainer>

//               <div className="grid grid-cols-5 gap-4">
//                 {weather.daily.map((day: any, index: number) => (
//                   <div key={index} className="text-center p-4 rounded-lg bg-muted">
//                     <p className="font-semibold mb-2">
//                       {index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
//                     </p>
//                     <div className="text-2xl mb-2">
//                       {day.weather?.[0]?.main === 'Rain'
//                         ? '🌧️'
//                         : day.weather?.[0]?.main === 'Clouds'
//                         ? '☁️'
//                         : '☀️'}
//                     </div>
//                     <p className="text-sm">
//                       {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
//                     </p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       {day.weather?.[0]?.description}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-muted-foreground">Enter a location to view forecast</p>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// }
// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Thermometer, Droplets, Wind, Eye, Gauge, Sunrise, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function Weather() {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [advice, setAdvice] = useState<string>('');
//   const [location, setLocation] = useState('');
//   const { t } = useLanguage();

//   useEffect(() => {
//     const savedWeather = localStorage.getItem('weatherData');
//     if (savedWeather) {
//       setWeather(JSON.parse(savedWeather));
//     }
//   }, []);

//   const genAI = new GoogleGenerativeAI('AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps');

//   // 🔹 Fetch weather data
//   const fetchWeather = async (locationInput?: string) => {
//     if (!locationInput && !location) {
//       toast.error('Please enter a location');
//       return;
//     }

//     setLoading(true);
//     const query = locationInput || location;
//     const apiKey = 'afd5ebe5330358cf21d980967946f38d'; // replace with your OpenWeather API key

//     try {
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`
//       );
//       const weatherData = await weatherRes.json();

//       if (!weatherRes.ok) {
//         toast.error(weatherData.message || 'Failed to fetch weather data');
//         setLoading(false);
//         return;
//       }

//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`
//       );
//       const forecastData = await forecastRes.json();

//       if (!forecastRes.ok) {
//         toast.error(forecastData.message || 'Failed to fetch forecast');
//         setLoading(false);
//         return;
//       }

//       const combinedData = {
//         current: {
//           temp: weatherData.main.temp,
//           feels_like: weatherData.main.feels_like,
//           humidity: weatherData.main.humidity,
//           pressure: weatherData.main.pressure,
//           visibility: weatherData.visibility,
//           wind_speed: weatherData.wind.speed,
//           sunrise: weatherData.sys.sunrise,
//           weather: weatherData.weather,
//         },
//         daily: forecastData.list.slice(0, 5).map((entry: any) => ({
//           dt: entry.dt,
//           temp: {
//             day: entry.main.temp,
//             min: entry.main.temp_min,
//             max: entry.main.temp_max,
//           },
//           humidity: entry.main.humidity,
//           weather: entry.weather,
//           rain: entry.rain ? entry.rain['3h'] || 0 : 0,
//         })),
//       };

//       setWeather(combinedData);
//       localStorage.setItem('weatherData', JSON.stringify(combinedData));
//       toast.success('Weather data loaded');

//       // Fetch AI-powered farming advice
//       await getFarmingAdviceAI(combinedData, query);

//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching weather');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌾 AI-Powered Farming Advice
//   const getFarmingAdviceAI = async (data: any, location: string) => {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt = `
// You are an expert agricultural AI.
// Provide **smart and localized farming advice** based on this weather data.

// Location: ${location}
// Current Temperature: ${data.current.temp}°C
// Feels Like: ${data.current.feels_like}°C
// Humidity: ${data.current.humidity}%
// Wind Speed: ${data.current.wind_speed} m/s
// Pressure: ${data.current.pressure} hPa
// 5-Day Forecast Summary: ${data.daily
//       .map(
//         (d: any) =>
//           `${new Date(d.dt * 1000).toLocaleDateString()}: ${d.weather[0].description}, Temp ${d.temp.min}–${d.temp.max}°C, Humidity ${d.humidity}%`
//       )
//       .join('; ')}

// Your response should be in bullet points, highlighting actionable advice such as:
// - Irrigation
// - Best crop to plant
// - Pest and disease control
// - Fertilizer timing
// - Crop protection
// - Harvesting strategy
// Keep it concise and easy for farmers to follow.
// `;

//     try {
//       const result = await model.generateContent(prompt);
//       const text = await result.response.text();
//       setAdvice(text);
//     } catch (error) {
//       console.error("AI advice error:", error);
//       setAdvice("⚠️ Unable to generate AI advice at the moment.");
//     }
//   };

//   const getForecastData = () => {
//     if (!weather?.daily) return [];
//     return weather.daily.map((day: any, index: number) => ({
//       day: index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//       temp: Math.round(day.temp.day),
//       humidity: day.humidity,
//       rain: Math.round((day.rain || 0) * 100) / 100,
//     }));
//   };

//   const weatherMetrics = [
//     {
//       label: 'Min / Max',
//       value: weather?.daily?.[0]
//         ? `${Math.round(weather.daily[0].temp.min)}° / ${Math.round(weather.daily[0].temp.max)}°`
//         : '--',
//       icon: Thermometer,
//     },
//     {
//       label: 'Humidity',
//       value: weather?.current?.humidity ? `${weather.current.humidity}%` : '--',
//       icon: Droplets,
//     },
//     {
//       label: 'Wind Speed',
//       value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : '--',
//       icon: Wind,
//     },
//     {
//       label: 'Pressure',
//       value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : '--',
//       icon: Gauge,
//     },
//     {
//       label: 'Sunrise',
//       value: weather?.current?.sunrise
//         ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : '--',
//       icon: Sunrise,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">🌤️ Weather & Farming Insights</h1>

//         {/* 🔍 Search Section */}
//         <Card className="p-4 mb-6">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-2 block">{t('location')}</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder={t('enterLocation')}
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Button onClick={() => fetchWeather()} disabled={loading}>
//               {loading ? t('loading') : t('getWeather')}
//             </Button>
//           </div>
//         </Card>

//         {/* 🌡️ Current Weather & Advice */}
//         <div className="grid grid-cols-2 gap-6">
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
//             {weather ? (
//               <>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-6xl font-bold">{Math.round(weather.current.temp)}°C</span>
//                   <span className="text-lg text-muted-foreground">
//                     Feels like {Math.round(weather.current.feels_like)}°C
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {weatherMetrics.map((metric) => {
//                     const Icon = metric.icon;
//                     return (
//                       <div key={metric.label} className="p-3 rounded-lg bg-muted">
//                         <div className="flex items-center gap-2 mb-1">
//                           <Icon className="w-4 h-4 text-foreground/70" />
//                           <span className="text-xs text-foreground/70">{metric.label}</span>
//                         </div>
//                         <p className="font-semibold">{metric.value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <p className="text-muted-foreground">Enter a location to view weather</p>
//             )}
//           </Card>

//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">🌾 AI-Powered Farming Advice</h2>
//             {loading ? (
//               <p className="text-sm text-muted-foreground">Generating advice...</p>
//             ) : (
//               <div className="text-sm whitespace-pre-line">{advice || "Enter a location to get advice."}</div>
//             )}
//           </Card>
//         </div>

//         {/* 📈 Forecast Chart */}
//         <Card className="p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
//           {weather?.daily ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={getForecastData()}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="Temp (°C)" />
//                 <Line type="monotone" dataKey="humidity" stroke="#22c55e" name="Humidity (%)" />
//                 <Line type="monotone" dataKey="rain" stroke="#8b5cf6" name="Rain (mm)" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-muted-foreground">Enter a location to view forecast</p>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// // }
// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Thermometer, Droplets, Wind, Gauge, Sunrise, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function Weather() {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [advice, setAdvice] = useState<string>('');
//   const [location, setLocation] = useState('');
//   const { t } = useLanguage();

//   // ✅ Initialize Gemini
//   const genAI = new GoogleGenerativeAI('AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps');

//   // 🔹 Load cached weather data
//   // useEffect(() => {
//   //   const savedWeather = localStorage.getItem('weatherData');
//   //   if (savedWeather) {
//   //     setWeather(JSON.parse(savedWeather));
//   //   }
//   // }, []);
// useEffect(() => {
//   const savedWeather = localStorage.getItem('weatherData');
//   if (savedWeather) {
//     const parsedWeather = JSON.parse(savedWeather);
//     setWeather(parsedWeather);

//     // 🧠 Auto-generate advice when weather data already exists
//     getFarmingAdviceAI(parsedWeather);
//   }
// }, []);

//   // 🔹 Fetch Weather Data (OpenWeather)
//   const fetchWeather = async () => {
//     if (!location) {
//       toast.error('Please enter a location');
//       return;
//     }

//     setLoading(true);
//     const apiKey = 'afd5ebe5330358cf21d980967946f38d'; // 🔑 OpenWeather API Key

//     try {
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
//       );
//       const weatherData = await weatherRes.json();

//       if (!weatherRes.ok) {
//         toast.error(weatherData.message || 'Failed to fetch weather data');
//         setLoading(false);
//         return;
//       }

//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
//       );
//       const forecastData = await forecastRes.json();

//       if (!forecastRes.ok) {
//         toast.error(forecastData.message || 'Failed to fetch forecast');
//         setLoading(false);
//         return;
//       }

//       const combinedData = {
//         current: {
//           temp: weatherData.main.temp,
//           feels_like: weatherData.main.feels_like,
//           humidity: weatherData.main.humidity,
//           pressure: weatherData.main.pressure,
//           visibility: weatherData.visibility,
//           wind_speed: weatherData.wind.speed,
//           sunrise: weatherData.sys.sunrise,
//           weather: weatherData.weather,
//         },
//         daily: forecastData.list.slice(0, 5).map((entry: any) => ({
//           dt: entry.dt,
//           temp: {
//             day: entry.main.temp,
//             min: entry.main.temp_min,
//             max: entry.main.temp_max,
//           },
//           humidity: entry.main.humidity,
//           weather: entry.weather,
//           rain: entry.rain ? entry.rain['3h'] || 0 : 0,
//         })),
//       };

//       setWeather(combinedData);
//       localStorage.setItem('weatherData', JSON.stringify(combinedData));
//       toast.success('Weather data loaded successfully');

//       // 🌾 Fetch AI Farming Advice Based on Weather Only
//       await getFarmingAdviceAI(combinedData);

//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching weather');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌾 Gemini AI Advice (based only on weather data)
// //   const getFarmingAdviceAI = async (data: any) => {
// //     try {
// //       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// //       const prompt = `
// // You are an expert agricultural assistant.
// // Based ONLY on this weather data, give farming advice. 
// // Do NOT include location-based info.

// // Current Temperature: ${data.current.temp}°C
// // Feels Like: ${data.current.feels_like}°C
// // Humidity: ${data.current.humidity}%
// // Wind Speed: ${data.current.wind_speed} m/s
// // Pressure: ${data.current.pressure} hPa
// // 5-Day Forecast Summary: ${data.daily
// //         .map(
// //           (d: any) =>
// //             `${new Date(d.dt * 1000).toLocaleDateString()}: ${d.weather[0].description}, Temp ${d.temp.min}–${d.temp.max}°C, Humidity ${d.humidity}%`
// //         )
// //         .join('; ')}

// // Generate advice in short bullet points:
// // - Irrigation scheduling 💧
// // - Pest and disease control 🐛
// // - Fertilizer or pesticide timing 🌱
// // - Harvest readiness 🚜
// // Use emojis and keep it simple for farmers.
// //       `;

// //       const result = await model.generateContent(prompt);
// //       const text = await result.response.text();
// //       setAdvice(text);

// //     } catch (error) {
// //       console.error("Gemini error:", error);
// //       setAdvice("⚠️ Unable to generate AI advice. Please try again later.");
// //     }
// //   };
// const getFarmingAdviceAI = async (data: any) => {
//   if (!data || !data.current || !data.daily) {
//     console.warn("⚠️ Missing weather data for AI advice.");
//     setAdvice("⚠️ No sufficient weather data to generate advice.");
//     return;
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//     const prompt = `
// You are an expert agricultural assistant.  
// Provide **farming advice strictly based on weather conditions** below.  
// Do **not** mention or assume any location.

// 🌤️ Current Conditions:
// - Temperature: ${data.current.temp}°C (Feels like ${data.current.feels_like}°C)
// - Humidity: ${data.current.humidity}%
// - Wind Speed: ${data.current.wind_speed} m/s
// - Pressure: ${data.current.pressure} hPa

// 📅 5-Day Forecast Summary:
// ${data.daily
//   .map(
//     (d: any) =>
//       `• ${new Date(d.dt * 1000).toLocaleDateString()}: ${d.weather[0].description}, Temp ${d.temp.min}–${d.temp.max}°C, Humidity ${d.humidity}%`
//   )
//   .join('\n')}

// Now, generate concise bullet-point advice for farmers covering:
// - 💧 Irrigation scheduling  
// - best crop choices
// - 🐛 Pest & disease prevention  
// - 🌱 Fertilizer/pesticide application timing  
// - 🚜 Harvest planning or precautions  

// Keep it short, easy to follow, and include relevant emojis for better readability.
// `;

//     const result = await model.generateContent(prompt);
//     const text = (await result.response.text()).trim();

//     // Small cleanup for consistent formatting
//     const formattedText = text
//       .replace(/\*/g, '•') // Replace * with bullet symbols
//       .replace(/\n{3,}/g, '\n\n') // Remove excessive newlines
//       .trim();

//     setAdvice(formattedText || "⚠️ AI did not return advice. Try again.");

//   } catch (error) {
//     console.error("Gemini AI Error:", error);
//     setAdvice("⚠️ Unable to generate AI advice. Please try again later.");
//   }
// };

//   // 📊 Prepare Forecast Chart Data
//   const getForecastData = () => {
//     if (!weather?.daily) return [];
//     return weather.daily.map((day: any, index: number) => ({
//       day: index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//       temp: Math.round(day.temp.day),
//       humidity: day.humidity,
//       rain: Math.round((day.rain || 0) * 100) / 100,
//     }));
//   };

//   // 🌡️ Weather Metrics
//   const weatherMetrics = [
//     {
//       label: 'Min / Max',
//       value: weather?.daily?.[0]
//         ? `${Math.round(weather.daily[0].temp.min)}° / ${Math.round(weather.daily[0].temp.max)}°`
//         : '--',
//       icon: Thermometer,
//     },
//     {
//       label: 'Humidity',
//       value: weather?.current?.humidity ? `${weather.current.humidity}%` : '--',
//       icon: Droplets,
//     },
//     {
//       label: 'Wind Speed',
//       value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : '--',
//       icon: Wind,
//     },
//     {
//       label: 'Pressure',
//       value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : '--',
//       icon: Gauge,
//     },
//     {
//       label: 'Sunrise',
//       value: weather?.current?.sunrise
//         ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : '--',
//       icon: Sunrise,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">🌤️ Weather & AI Farming Insights</h1>

//         {/* 🔍 Location Search */}
//         <Card className="p-4 mb-6">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-2 block">{t('location')}</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder={t('enterLocation')}
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Button onClick={fetchWeather} disabled={loading}>
//               {loading ? t('loading') : t('getWeather')}
//             </Button>
//           </div>
//         </Card>

//         {/* 🌡️ Current Weather + 🌾 Advice */}
//         <div className="grid grid-cols-2 gap-6">
//           {/* Weather Info */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
//             {weather ? (
//               <>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-6xl font-bold">{Math.round(weather.current.temp)}°C</span>
//                   <span className="text-lg text-muted-foreground">
//                     Feels like {Math.round(weather.current.feels_like)}°C
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {weatherMetrics.map((metric) => {
//                     const Icon = metric.icon;
//                     return (
//                       <div key={metric.label} className="p-3 rounded-lg bg-muted">
//                         <div className="flex items-center gap-2 mb-1">
//                           <Icon className="w-4 h-4 text-foreground/70" />
//                           <span className="text-xs text-foreground/70">{metric.label}</span>
//                         </div>
//                         <p className="font-semibold">{metric.value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <p className="text-muted-foreground">Enter a location to view weather</p>
//             )}
//           </Card>

//           {/* Farming Advice */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">🌾 AI-Powered Farming Advice</h2>
//             {loading ? (
//               <p className="text-sm text-muted-foreground">Generating advice...</p>
//             ) : (
//               <div className="text-sm whitespace-pre-line">
//                 {advice || "Enter a location to get AI weather-based advice."}
//               </div>
//             )}
//           </Card>
//         </div>

//         {/* 📈 Forecast Chart */}
//         <Card className="p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
//           {weather?.daily ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={getForecastData()}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="Temp (°C)" />
//                 <Line type="monotone" dataKey="humidity" stroke="#22c55e" name="Humidity (%)" />
//                 <Line type="monotone" dataKey="rain" stroke="#8b5cf6" name="Rain (mm)" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-muted-foreground">Enter a location to view forecast</p>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// // }
// import { Sidebar } from '@/components/Sidebar';
// import { Card } from '@/components/ui/card';
// import { Thermometer, Droplets, Wind, Gauge, Sunrise, MapPin } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { toast } from 'sonner';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export default function Weather() {
//   const [weather, setWeather] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [advice, setAdvice] = useState<string>(localStorage.getItem('farmingAdvice') || '');
//   const [location, setLocation] = useState(localStorage.getItem('lastLocation') || '');
//   const { t } = useLanguage();

//   // ✅ Initialize Gemini
//   const genAI = new GoogleGenerativeAI('AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps');

//   // 🔹 Load cached weather + advice on page load
//   useEffect(() => {
//     const savedWeather = localStorage.getItem('weatherData');
//     if (savedWeather) {
//       const parsed = JSON.parse(savedWeather);
//       setWeather(parsed);
//       getFarmingAdviceAI(parsed); // regenerate if available
//     }
//   }, []);

//   // 🔹 Fetch Weather Data
//   const fetchWeather = async () => {
//     if (!location) {
//       toast.error('Please enter a location');
//       return;
//     }

//     setLoading(true);
//     const apiKey = 'afd5ebe5330358cf21d980967946f38d'; // OpenWeather API Key

//     try {
//       const weatherRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
//       );
//       const weatherData = await weatherRes.json();

//       if (!weatherRes.ok) {
//         toast.error(weatherData.message || 'Failed to fetch weather');
//         setLoading(false);
//         return;
//       }

//       const forecastRes = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
//       );
//       const forecastData = await forecastRes.json();

//       if (!forecastRes.ok) {
//         toast.error(forecastData.message || 'Failed to fetch forecast');
//         setLoading(false);
//         return;
//       }

//       const combinedData = {
//         current: {
//           temp: weatherData.main.temp,
//           feels_like: weatherData.main.feels_like,
//           humidity: weatherData.main.humidity,
//           pressure: weatherData.main.pressure,
//           visibility: weatherData.visibility,
//           wind_speed: weatherData.wind.speed,
//           sunrise: weatherData.sys.sunrise,
//           weather: weatherData.weather,
//         },
//         daily: forecastData.list.slice(0, 5).map((entry: any) => ({
//           dt: entry.dt,
//           temp: {
//             day: entry.main.temp,
//             min: entry.main.temp_min,
//             max: entry.main.temp_max,
//           },
//           humidity: entry.main.humidity,
//           weather: entry.weather,
//           rain: entry.rain ? entry.rain['3h'] || 0 : 0,
//         })),
//       };

//       setWeather(combinedData);
//       localStorage.setItem('weatherData', JSON.stringify(combinedData));
//       localStorage.setItem('lastLocation', location);
      
//       toast.success('✅ Weather data loaded successfully');

//       await getFarmingAdviceAI(combinedData);
//     } catch (error) {
//       console.error(error);
//       toast.error('Error fetching weather data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🌾 Generate Gemini Advice (Weather-only)
//   const getFarmingAdviceAI = async (data: any) => {
//     if (!data || !data.current || !data.daily) {
//       setAdvice("⚠️ No sufficient weather data to generate advice.");
//       return;
//     }

//     try {
//       const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

//       const prompt = `
// You are an expert agricultural assistant.  
// Provide farming advice strictly based on weather data below — avoid mentioning any location.

// 🌤️ Current Conditions:
// - Temperature: ${data.current.temp}°C (Feels like ${data.current.feels_like}°C)
// - Humidity: ${data.current.humidity}%
// - Wind Speed: ${data.current.wind_speed} m/s
// - Pressure: ${data.current.pressure} hPa

// 📅 5-Day Forecast Summary:
// ${data.daily
//   .map(
//     (d: any) =>
//       `• ${new Date(d.dt * 1000).toLocaleDateString()}: ${d.weather[0].description}, Temp ${d.temp.min}–${d.temp.max}°C, Humidity ${d.humidity}%`
//   )
//   .join('\n')}

// Now, generate concise bullet-point farming advice for:
// - 💧 Irrigation scheduling  
// - 🌱 Fertilizer or pesticide timing  
// - 🐛 Pest & disease prevention  
// - 🚜 Harvest planning  
// Use simple, farmer-friendly language and include relevant emojis.
// `;

//       const result = await model.generateContent(prompt);
//       const text = (await result.response.text()).trim();

//       const formatted = text
//         .replace(/\*/g, '•')
//         .replace(/\n{3,}/g, '\n\n')
//         .trim();

//       setAdvice(formatted);
//       localStorage.setItem('farmingAdvice', formatted);
//       localStorage.setItem("farmingAdvice", text); // ✅ Save AI output

//     } catch (error) {
//       console.error("Gemini AI Error:", error);
//       setAdvice("⚠️ Unable to generate AI advice. Please try again later.");
//     }
//   };

//   // 📊 Prepare Forecast Chart Data
//   const getForecastData = () =>
//     weather?.daily?.map((day: any, i: number) => ({
//       day: i === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
//       temp: Math.round(day.temp.day),
//       humidity: day.humidity,
//       rain: Math.round((day.rain || 0) * 100) / 100,
//     })) || [];

//   // 🌡️ Weather Metrics
//   const weatherMetrics = [
//     {
//       label: 'Min / Max',
//       value: weather?.daily?.[0]
//         ? `${Math.round(weather.daily[0].temp.min)}° / ${Math.round(weather.daily[0].temp.max)}°`
//         : '--',
//       icon: Thermometer,
//     },
//     {
//       label: 'Humidity',
//       value: weather?.current?.humidity ? `${weather.current.humidity}%` : '--',
//       icon: Droplets,
//     },
//     {
//       label: 'Wind Speed',
//       value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : '--',
//       icon: Wind,
//     },
//     {
//       label: 'Pressure',
//       value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : '--',
//       icon: Gauge,
//     },
//     {
//       label: 'Sunrise',
//       value: weather?.current?.sunrise
//         ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
//             hour: '2-digit',
//             minute: '2-digit',
//           })
//         : '--',
//       icon: Sunrise,
//     },
//   ];

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6">🌤️ Weather & AI Farming Insights</h1>

//         {/* 🔍 Location Search */}
//         <Card className="p-4 mb-6">
//           <div className="flex gap-3 items-end">
//             <div className="flex-1">
//               <label className="text-sm font-medium mb-2 block">{t('location')}</label>
//               <div className="relative">
//                 <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                 <Input
//                   placeholder={t('enterLocation')}
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
//                   className="pl-9"
//                 />
//               </div>
//             </div>
//             <Button onClick={fetchWeather} disabled={loading}>
//               {loading ? t('loading') : t('getWeather')}
//             </Button>
//           </div>
//         </Card>

//         {/* 🌡️ Current Weather + 🌾 Advice */}
//         <div className="grid grid-cols-2 gap-6">
//           {/* Weather Info */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
//             {weather ? (
//               <>
//                 <div className="flex items-baseline gap-2 mb-4">
//                   <span className="text-6xl font-bold">{Math.round(weather.current.temp)}°C</span>
//                   <span className="text-lg text-muted-foreground">
//                     Feels like {Math.round(weather.current.feels_like)}°C
//                   </span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-3">
//                   {weatherMetrics.map((metric) => {
//                     const Icon = metric.icon;
//                     return (
//                       <div key={metric.label} className="p-3 rounded-lg bg-muted">
//                         <div className="flex items-center gap-2 mb-1">
//                           <Icon className="w-4 h-4 text-foreground/70" />
//                           <span className="text-xs text-foreground/70">{metric.label}</span>
//                         </div>
//                         <p className="font-semibold">{metric.value}</p>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </>
//             ) : (
//               <p className="text-muted-foreground">Enter a location to view weather</p>
//             )}
//           </Card>

//           {/* AI Advice */}
//           <Card className="p-6">
//             <h2 className="text-lg font-semibold mb-4">🌾 AI-Powered Farming Advice</h2>
//             {loading ? (
//               <p className="text-sm text-muted-foreground">Generating advice...</p>
//             ) : (
//               <div className="text-sm whitespace-pre-line">
//                 {advice || "Enter a location to get AI weather-based advice."}
//               </div>
//             )}
//           </Card>
//         </div>

//         {/* 📈 Forecast Chart */}
//         <Card className="p-6 mt-6">
//           <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
//           {weather?.daily ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={getForecastData()}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="day" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="Temp (°C)" />
//                 <Line type="monotone" dataKey="humidity" stroke="#22c55e" name="Humidity (%)" />
//                 <Line type="monotone" dataKey="rain" stroke="#8b5cf6" name="Rain (mm)" />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-muted-foreground">Enter a location to view forecast</p>
//           )}
//         </Card>
//       </main>
//     </div>
//   );
// }
import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, Gauge, Sunrise, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useLanguage } from '@/contexts/LanguageContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string>(localStorage.getItem('farmingAdvice') || '');
  const [location, setLocation] = useState(localStorage.getItem('lastLocation') || '');
  const { t, language } = useLanguage(); // ✅ we’ll use selected language here

  const genAI = new GoogleGenerativeAI('AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps');

  // ✅ Load cached weather + advice on mount
  useEffect(() => {
    const savedWeather = localStorage.getItem('weatherData');
    const savedAdvice = localStorage.getItem('farmingAdvice');
    if (savedWeather) {
      const parsed = JSON.parse(savedWeather);
      setWeather(parsed);
    }
    if (savedAdvice) setAdvice(savedAdvice);
  }, []);

  // 🔹 Fetch Weather Data
  const fetchWeather = async () => {
    if (!location) {
      toast.error('Please enter a location');
      return;
    }

    setLoading(true);
    const apiKey = 'afd5ebe5330358cf21d980967946f38d';

    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );
      const weatherData = await weatherRes.json();

      if (!weatherRes.ok) {
        toast.error(weatherData.message || 'Failed to fetch weather');
        setLoading(false);
        return;
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json();

      if (!forecastRes.ok) {
        toast.error(forecastData.message || 'Failed to fetch forecast');
        setLoading(false);
        return;
      }

      const combinedData = {
        current: {
          temp: weatherData.main.temp,
          feels_like: weatherData.main.feels_like,
          humidity: weatherData.main.humidity,
          pressure: weatherData.main.pressure,
          visibility: weatherData.visibility,
          wind_speed: weatherData.wind.speed,
          sunrise: weatherData.sys.sunrise,
          weather: weatherData.weather,
        },
        daily: forecastData.list.slice(0, 5).map((entry: any) => ({
          dt: entry.dt,
          temp: {
            day: entry.main.temp,
            min: entry.main.temp_min,
            max: entry.main.temp_max,
          },
          humidity: entry.main.humidity,
          weather: entry.weather,
          rain: entry.rain ? entry.rain['3h'] || 0 : 0,
        })),
      };

      setWeather(combinedData);
      localStorage.setItem('weatherData', JSON.stringify(combinedData));
      localStorage.setItem('lastLocation', location);
      toast.success('✅ Weather data loaded successfully');

      await getFarmingAdviceAI(combinedData);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  };

  // 🌾 Generate Gemini Advice (based on selected language)
  const getFarmingAdviceAI = async (data: any) => {
    if (!data || !data.current || !data.daily) {
      setAdvice("⚠️ No sufficient weather data to generate advice.");
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      // 🌐 Choose language name for Gemini prompt
      const languageMap: Record<string, string> = {
        en: "English",
        hi: "Hindi",
        mr: "Marathi",
        gu: "Gujarati",
      };

      const prompt = `
You are an expert agricultural assistant.
Provide farming advice STRICTLY based on the following weather data.
DO NOT mention the location.
Translate your response into **${languageMap[language]}**.

🌤️ Current Conditions:
- Temperature: ${data.current.temp}°C (Feels like ${data.current.feels_like}°C)
- Humidity: ${data.current.humidity}%
- Wind Speed: ${data.current.wind_speed} m/s
- Pressure: ${data.current.pressure} hPa

📅 5-Day Forecast Summary:
${data.daily
  .map(
    (d: any) =>
      `• ${new Date(d.dt * 1000).toLocaleDateString()}: ${d.weather[0].description}, Temp ${d.temp.min}–${d.temp.max}°C, Humidity ${d.humidity}%`
  )
  .join('\n')}

Generate short, clear bullet-point farming advice:
- 💧 Irrigation scheduling
- 🌱 Fertilizer or pesticide timing
- 🐛 Pest and disease prevention
- 🚜 Harvest planning

Use simple, farmer-friendly language and relevant emojis.
`;

      const result = await model.generateContent(prompt);
      const text = (await result.response.text()).trim();

      setAdvice(text);
      localStorage.setItem('farmingAdvice', text);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      setAdvice("⚠️ Unable to generate AI advice. Please try again later.");
    }
  };

  const getForecastData = () =>
    weather?.daily?.map((day: any, i: number) => ({
      day: i === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: Math.round(day.temp.day),
      humidity: day.humidity,
      rain: Math.round((day.rain || 0) * 100) / 100,
    })) || [];

  const weatherMetrics = [
    {
      label: 'Min / Max',
      value: weather?.daily?.[0]
        ? `${Math.round(weather.daily[0].temp.min)}° / ${Math.round(weather.daily[0].temp.max)}°`
        : '--',
      icon: Thermometer,
    },
    {
      label: 'Humidity',
      value: weather?.current?.humidity ? `${weather.current.humidity}%` : '--',
      icon: Droplets,
    },
    {
      label: 'Wind Speed',
      value: weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : '--',
      icon: Wind,
    },
    {
      label: 'Pressure',
      value: weather?.current?.pressure ? `${weather.current.pressure} hPa` : '--',
      icon: Gauge,
    },
    {
      label: 'Sunrise',
      value: weather?.current?.sunrise
        ? new Date(weather.current.sunrise * 1000).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '--',
      icon: Sunrise,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">🌤️ Weather & AI Farming Insights</h1>

        {/* 🔍 Location Search */}
        <Card className="p-4 mb-6">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">{t('location')}</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('enterLocation')}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                  className="pl-9"
                />
              </div>
            </div>
            <Button onClick={fetchWeather} disabled={loading}>
              {loading ? t('loading') : t('getWeather')}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Current Weather</h2>
            {weather ? (
              <>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-6xl font-bold">{Math.round(weather.current.temp)}°C</span>
                  <span className="text-lg text-muted-foreground">
                    Feels like {Math.round(weather.current.feels_like)}°C
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {weatherMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                      <div key={metric.label} className="p-3 rounded-lg bg-muted">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-4 h-4 text-foreground/70" />
                          <span className="text-xs text-foreground/70">{metric.label}</span>
                        </div>
                        <p className="font-semibold">{metric.value}</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">Enter a location to view weather</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">🌾 AI-Powered Farming Advice</h2>
            {loading ? (
              <p className="text-sm text-muted-foreground">Generating advice...</p>
            ) : (
              <div className="text-sm whitespace-pre-line">
                {advice || "Enter a location to get AI weather-based advice."}
              </div>
            )}
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">5-Day Weather Forecast</h2>
          {weather?.daily ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getForecastData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#3b82f6" name="Temp (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#22c55e" name="Humidity (%)" />
                <Line type="monotone" dataKey="rain" stroke="#8b5cf6" name="Rain (mm)" />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-muted-foreground">Enter a location to view forecast</p>
          )}
        </Card>
      </main>
    </div>
  );
}
