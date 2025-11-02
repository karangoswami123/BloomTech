// import { LayoutDashboard, Cloud, Activity, TrendingUp, MessageSquare, LogOut, Globe } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { Button } from './ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { toast } from 'sonner';

// export const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { language, setLanguage, t } = useLanguage();

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       toast.error('Failed to logout');
//     } else {
//       navigate('/auth');
//     }
//   };

//   const menuItems = [
//     { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
//     { path: '/weather', icon: Cloud, label: t('weather') },
//     { path: '/disease-detection', icon: Activity, label: t('diseaseDetection') },
//     { path: '/market-prices', icon: TrendingUp, label: t('marketPrices') },
//     { path: '/ai-assistant', icon: MessageSquare, label: t('aiAssistant') },
//   ];

//   return (
//     <div className="w-48 h-screen bg-card border-r border-border flex flex-col">
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//             <Activity className="w-6 h-6 text-primary-foreground" />
//           </div>
//           <div>
//             <h1 className="font-bold text-sm">BloomTech</h1>
//             <p className="text-xs text-muted-foreground">AgriSmart</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 p-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.path;
//           return (
//             <Link key={item.path} to={item.path}>
//               <div
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
//                   isActive
//                     ? 'bg-primary text-primary-foreground'
//                     : 'hover:bg-secondary text-foreground'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </div>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-border space-y-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="sm" className="w-full justify-start gap-2">
//               <Globe className="w-4 h-4" />
//               <span className="text-xs">
//                 {language === 'en' && t('english')}
//                 {language === 'hi' && t('hindi')}
//                 {language === 'mr' && t('marathi')}
//                 {language === 'gu' && t('gujarati')}
//               </span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start">
//             <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('hi')}>हिंदी</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('mr')}>मराठी</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('gu')}>ગુજરાતી</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
//           <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
//             <span className="text-xs text-primary-foreground font-bold">A</span>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-medium truncate">karangoswami2407</p>
//             <p className="text-xs text-muted-foreground">{t('profile')}</p>
//           </div>
//         </div>

//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
//           onClick={handleLogout}
//         >
//           <LogOut className="w-4 h-4" />
//           <span className="text-sm">{t('logout')}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };








// import { useEffect, useState } from 'react';
// import { LayoutDashboard, Cloud, Activity, TrendingUp, MessageSquare, LogOut, Globe } from 'lucide-react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { useLanguage } from '@/contexts/LanguageContext';
// import { Button } from './ui/button';
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from './ui/dropdown-menu';
// import { toast } from 'sonner';

// export const Sidebar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { language, setLanguage, t } = useLanguage();

//   const [userName, setUserName] = useState<string | null>(null);

//   // 🔹 Fetch the logged-in user's info
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (error) {
//         console.error('Error fetching user:', error);
//       } else if (data?.user) {
//         // You can use 'user_metadata.full_name' if you store names in metadata
//         const name = data.user.user_metadata?.full_name || data.user.email?.split('@')[0];
//         setUserName(name || 'User');
//       }
//     };

//     fetchUser();
//   }, []);

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       toast.error('Failed to logout');
//     } else {
//       navigate('/auth');
//     }
//   };

//   const menuItems = [
//     { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
//     { path: '/weather', icon: Cloud, label: t('weather') },
//     { path: '/disease-detection', icon: Activity, label: t('diseaseDetection') },
//     { path: '/market-prices', icon: TrendingUp, label: t('marketPrices') },
//     { path: '/ai-assistant', icon: MessageSquare, label: t('aiAssistant') },
//   ];

//   return (
//     <div className="w-48 h-screen bg-card border-r border-border flex flex-col">
//       <div className="p-4 border-b border-border">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
//             <Activity className="w-6 h-6 text-primary-foreground" />
//           </div>
//           <div>
//             <h1 className="font-bold text-sm">BloomTech</h1>
//             <p className="text-xs text-muted-foreground">AgriSmart</p>
//           </div>
//         </div>
//       </div>

//       <nav className="flex-1 p-2">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname === item.path;
//           return (
//             <Link key={item.path} to={item.path}>
//               <div
//                 className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
//                   isActive
//                     ? 'bg-primary text-primary-foreground'
//                     : 'hover:bg-secondary text-foreground'
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//                 <span className="text-sm font-medium">{item.label}</span>
//               </div>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-border space-y-2">
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="outline" size="sm" className="w-full justify-start gap-2">
//               <Globe className="w-4 h-4" />
//               <span className="text-xs">
//                 {language === 'en' && t('english')}
//                 {language === 'hi' && t('hindi')}
//                 {language === 'mr' && t('marathi')}
//                 {language === 'gu' && t('gujarati')}
//               </span>
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="start">
//             <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('hi')}>हिंदी</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('mr')}>मराठी</DropdownMenuItem>
//             <DropdownMenuItem onClick={() => setLanguage('gu')}>ગુજરાતી</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>

//         {/* 👇 Dynamic user info */}
//         <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
//           <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
//             <span className="text-xs text-primary-foreground font-bold">
//               {userName ? userName.charAt(0).toUpperCase() : 'U'}
//             </span>
//           </div>
//           <div className="flex-1 min-w-0">
//             <p className="text-xs font-medium truncate">{userName || 'Loading...'}</p>
//             <p className="text-xs text-muted-foreground">{t('profile')}</p>
//           </div>
//         </div>

//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
//           onClick={handleLogout}
//         >
//           <LogOut className="w-4 h-4" />
//           <span className="text-sm">{t('logout')}</span>
//         </Button>
//       </div>
//     </div>
//   );
// };
import { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Cloud,
  Activity,
  TrendingUp,
  MessageSquare,
  LogOut,
  Globe,
  ShoppingBag,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();

  const [userName, setUserName] = useState<string | null>(null);

  // 🔹 Fetch the logged-in user's info
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else if (data?.user) {
        const name =
          data.user.user_metadata?.full_name ||
          data.user.email?.split('@')[0];
        setUserName(name || 'User');
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to logout');
    } else {
      navigate('/auth');
    }
  };

  // 🔹 Sidebar menu items
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('dashboard') },
    { path: '/weather', icon: Cloud, label: t('weather') },
    { path: '/disease-detection', icon: Activity, label: t('diseaseDetection') },
    { path: '/market-prices', icon: TrendingUp, label: t('marketPrices') },
    // 🔹 Added multilingual Store option
    { path: '/inventory', icon: ShoppingBag, label: t('inventory') },
    { path: '/ai-assistant', icon: MessageSquare, label: t('aiAssistant') },
    { path: '/revenuetracker', icon: MessageSquare, label: t('Revenue Tracker') },
  ];

  return (
    <div className="w-48 h-screen bg-card border-r border-border flex flex-col">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-sm">BloomTech</h1>
            <p className="text-xs text-muted-foreground">AgriSmart</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary text-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border space-y-2">
        {/* 🌐 Language Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start gap-2"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs">
                {language === 'en' && t('english')}
                {language === 'hi' && t('hindi')}
                {language === 'mr' && t('marathi')}
                {language === 'gu' && t('gujarati')}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>
              हिंदी
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('mr')}>
              मराठी
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('gu')}>
              ગુજરાતી
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 👤 User Info */}
        <div className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xs text-primary-foreground font-bold">
              {userName ? userName.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">
              {userName || 'Loading...'}
            </p>
            <p className="text-xs text-muted-foreground">{t('profile')}</p>
          </div>
        </div>

        {/* 🚪 Logout */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{t('logout')}</span>
        </Button>
      </div>
    </div>
  );
};
