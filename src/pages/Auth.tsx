// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Activity } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Auth() {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [location, setLocation] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleAuth = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (isLogin) {
//         const { error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         toast.success('Logged in successfully!');
//         navigate('/dashboard');
//       } else {
//         const { error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: {
//               full_name: fullName,
//               phone_number: phoneNumber,
//               location: location,
//             },
//             emailRedirectTo: `${window.location.origin}/dashboard`,
//           },
//         });
//         if (error) throw error;
//         toast.success('Account created successfully!');
//         navigate('/dashboard');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-background">
//       <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3">
//             <Activity className="w-8 h-8 text-primary-foreground" />
//           </div>
//           <h1 className="text-2xl font-bold text-foreground">BloomTech AgriSmart</h1>
//           <p className="text-sm text-muted-foreground mt-1">
//             {isLogin ? 'Sign in to your account' : 'Create a new account'}
//           </p>
//         </div>

//         <form onSubmit={handleAuth} className="space-y-4">
//           {!isLogin && (
//             <>
//               <div>
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   type="text"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   required={!isLogin}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="phoneNumber">Phone Number</Label>
//                 <Input
//                   id="phoneNumber"
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   required={!isLogin}
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="location">Location</Label>
//                 <Input
//                   id="location"
//                   type="text"
//                   value={location}
//                   onChange={(e) => setLocation(e.target.value)}
//                   required={!isLogin}
//                 />
//               </div>
//             </>
//           )}

//           <div>
//             <Label htmlFor="email">Email</Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <Label htmlFor="password">Password</Label>
//             <Input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up'}
//           </Button>
//         </form>

//         <div className="mt-4 text-center">
//           <button
//             type="button"
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-sm text-primary hover:underline"
//           >
//             {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Activity } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success(t('loginSuccess'));
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phoneNumber,
              location: location,
            },
            emailRedirectTo: `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        toast.success(t('signupSuccess'));
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message || t('errorOccurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1500595046743-ff2a7e7d030c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      {/* Semi-transparent overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-green-700/50 to-yellow-600/40 backdrop-blur-sm" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-green-200 relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4"
          >
            <Activity className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-green-800 tracking-tight">
            {t('bloomTechAgriSmart')}
          </h1>
          <p className="text-sm text-green-600 mt-2">
            {isLogin ? t('signInToAccount') : t('createNewAccount')}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Label htmlFor="fullName" className="text-green-700 font-medium">
                    {t('fullName')}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    className="mt-1 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-300 rounded-lg bg-white/80"
                    placeholder={t('Enter your full name')}
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="phoneNumber" className="text-green-700 font-medium">
                    {t('phoneNumber')}
                  </Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required={!isLogin}
                    className="mt-1 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-300 rounded-lg bg-white/80"
                    placeholder={t('Phone number ')}
                  />
                </div>
                <div className="relative">
                  <Label htmlFor="location" className="text-green-700 font-medium">
                    {t('location')}
                  </Label>
                  <Input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required={!isLogin}
                    className="mt-1 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-300 rounded-lg bg-white/80"
                    placeholder={t('Enter your location')}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Label htmlFor="email" className="text-green-700 font-medium">
              {t('email')}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-300 rounded-lg bg-white/80"
              placeholder={t('Enter your email')}
            />
          </div>

          <div className="relative">
            <Label htmlFor="password" className="text-green-700 font-medium">
              {t('password')}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-300 rounded-lg bg-white/80"
              placeholder={t('Enter your password')}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 shadow-md"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z" />
                </svg>
                {t('loading')}
              </span>
            ) : isLogin ? t('login') : t('signUp')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-green-600 hover:text-green-800 hover:underline transition-all duration-200"
          >
            {isLogin ? t('Dont Have Account') : t('Already Have Account')}
          </button>
        </div>
      </motion.div>
    </div>
  );
}



















// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { supabase } from '@/integrations/supabase/client';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from 'sonner';
// import { Tractor } from 'lucide-react';

// export default function FarmerAuth() {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // ✅ Step 1: Send OTP to Farmer’s Phone
//   const sendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signInWithOtp({
//         phone: phone,
//       });
//       if (error) throw error;
//       toast.success('OTP sent to your phone!');
//       setIsOtpSent(true);
//     } catch (err: any) {
//       toast.error(err.message || 'Error sending OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Step 2: Verify OTP and Login Farmer
//   const verifyOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.verifyOtp({
//         phone,
//         token: otp,
//         type: 'sms',
//       });
//       if (error) throw error;
//       toast.success('Login successful!');
//       navigate('/dashboard');
//     } catch (err: any) {
//       toast.error(err.message || 'Invalid OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl">
//         <div className="flex flex-col items-center mb-6">
//           <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center mb-3">
//             <Tractor className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold text-gray-800">BloomTech AgriSmart</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             {isOtpSent
//               ? 'Enter the OTP sent to your phone'
//               : 'Login or Sign up using your phone number'}
//           </p>
//         </div>

//         <form onSubmit={isOtpSent ? verifyOtp : sendOtp} className="space-y-4">
//           <div>
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               type="tel"
//               placeholder="+91 9876543210"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               required
//               disabled={isOtpSent}
//             />
//           </div>

//           {isOtpSent && (
//             <div>
//               <Label htmlFor="otp">Enter OTP</Label>
//               <Input
//                 id="otp"
//                 type="text"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             </div>
//           )}

//           <Button type="submit" className="w-full" disabled={loading}>
//             {loading
//               ? 'Please wait...'
//               : isOtpSent
//               ? 'Verify & Login'
//               : 'Send OTP'}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// }