import { Sidebar } from '@/components/Sidebar';
import { Card } from '@/components/ui/card';
import { Thermometer, Droplets, Wind, AlertTriangle, Cloud, Activity, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const savedWeather = localStorage.getItem('weatherData');
    if (savedWeather) {
      setWeather(JSON.parse(savedWeather));
    }
  }, []);

  const fetchWeather = async (locationInput?: string) => {
    if (!locationInput && !location) {
      toast.error('Please enter a location');
      return;
    }
    
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('weather', {
        body: {
          location: locationInput || location,
        },
      });
      
      if (error) {
        toast.error('Failed to fetch weather data');
        setLoading(false);
      } else if (data) {
        if (data.cod === 401 || data.error) {
          toast.error(data.message || data.error || 'Failed to fetch weather data');
          setLoading(false);
          return;
        }
        setWeather(data);
        localStorage.setItem('weatherData', JSON.stringify(data));
        toast.success('Weather data updated');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error('Error fetching weather');
    }
  };

  const getWeatherAlerts = () => {
    if (!weather?.current) return { count: '0', message: 'Enable location' };
    if (weather?.alerts?.length > 0) {
      return { count: weather.alerts.length.toString(), message: weather.alerts[0].event };
    }
    const alerts = [];
    if (weather.current.temp > 35) alerts.push('High temperature');
    if (weather.current.humidity > 80) alerts.push('High humidity');
    if (weather.current.wind_speed > 10) alerts.push('High wind speed');
    return { count: alerts.length.toString(), message: alerts.length > 0 ? alerts.join(', ') : 'No alerts' };
  };

  const weatherCards = [
    {
      title: 'Temperature',
      value: loading ? 'Loading...' : weather?.current?.temp ? `${Math.round(weather.current.temp)}°C` : 'Enable location',
      subtitle: 'Current temperature',
      icon: Thermometer,
      color: 'hsl(var(--weather-blue))',
      iconColor: 'hsl(var(--weather-blue-fg))',
    },
    {
      title: 'Humidity',
      value: loading ? 'Loading...' : weather?.current?.humidity ? `${weather.current.humidity}%` : 'Enable location',
      subtitle: 'Relative humidity',
      icon: Droplets,
      color: 'hsl(var(--humidity-green))',
      iconColor: 'hsl(var(--humidity-green-fg))',
    },
    {
      title: 'Wind Speed',
      value: loading ? 'Loading...' : weather?.current?.wind_speed ? `${Math.round(weather.current.wind_speed)} m/s` : 'Enable location',
      subtitle: 'Wind conditions',
      icon: Wind,
      color: 'hsl(var(--wind-purple))',
      iconColor: 'hsl(var(--wind-purple-fg))',
    },
    {
      title: 'Alerts',
      value: loading ? '...' : getWeatherAlerts().count,
      subtitle: loading ? 'Loading...' : getWeatherAlerts().message,
      icon: AlertCircle,
      color: 'hsl(var(--alert-yellow))',
      iconColor: 'hsl(var(--alert-yellow-fg))',
    },
  ];

  const quickActions = [
    { icon: Cloud, label: 'Weather', path: '/weather' },
    { icon: Activity, label: 'Disease Detection', path: '/disease-detection' },
    { icon: TrendingUp, label: 'Market Prices', path: '/market-prices' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
          <p className="text-muted-foreground">Here's your farming dashboard overview</p>
        </div>

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
            <Button onClick={() => fetchWeather()} disabled={loading}>
              {loading ? t('loading') : t('getWeather')}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {weatherCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="p-4" style={{ backgroundColor: card.color }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground/80">{card.title}</p>
                    <p className="text-2xl font-bold mt-1">{card.value}</p>
                  </div>
                  <Icon className="w-5 h-5" style={{ color: card.iconColor }} />
                </div>
                <p className="text-xs text-foreground/70">{card.subtitle}</p>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    variant="ghost"
                    className="w-full justify-start gap-3 h-12"
                    onClick={() => navigate(action.path)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Farming Advice</h2>
            <p className="text-sm text-muted-foreground">
              Get AI-powered farming advice based on your location and weather conditions. Visit the AI
              Assistant page to get started.
            </p>
            <Button className="mt-4" onClick={() => navigate('/ai-assistant')}>
              Ask AI Assistant
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}