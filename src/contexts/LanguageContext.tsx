import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'hi' | 'mr' | 'gu';

interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}

const translations: Translations = {
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड', gu: 'ડેશબોર્ડ' },
  weather: { en: 'Weather', hi: 'मौसम', mr: 'हवामान', gu: 'હવામાન' },
  diseaseDetection: { en: 'Disease Detection', hi: 'रोग का पता लगाना', mr: 'रोग शोध', gu: 'રોગ શોધ' },
  marketPrices: { en: 'Market Prices', hi: 'बाज़ार कीमतें', mr: 'बाजार किंमती', gu: 'બજાર ભાવ' },
  aiAssistant: { en: 'AI Assistant', hi: 'AI सहायक', mr: 'AI सहाय्यक', gu: 'AI સહાયક' },
  store: { 
  en: 'Store', 
  hi: 'दुकान', 
  mr: 'दुकान', 
  gu: 'દુકાન' 
},

  logout: { en: 'Logout', hi: 'लॉगआउट', mr: 'लॉगआउट', gu: 'લોગઆઉટ' },
  profile: { en: 'Profile', hi: 'प्रोफ़ाइल', mr: 'प्रोफाइल', gu: 'પ્રોફાઇલ' },
  english: { en: 'English', hi: 'अंग्रेज़ी', mr: 'इंग्रजी', gu: 'અંગ્રેજી' },
  hindi: { en: 'हिंदी', hi: 'हिंदी', mr: 'हिंदी', gu: 'હિન્દી' },
  marathi: { en: 'मराठी', hi: 'मराठी', mr: 'मराठी', gu: 'મરાઠી' },
  gujarati: { en: 'ગુજરાતી', hi: 'गुजराती', mr: 'गुजराती', gu: 'ગુજરાતી' },
  diseaseDetectionDesc: { en: 'Upload crop images for AI-powered disease detection', hi: 'AI-संचालित रोग पहचान के लिए फसल की तस्वीरें अपलोड करें', mr: 'AI-चालित रोग शोधासाठी पीक चित्रे अपलोड करा', gu: 'AI-સંચાલિત રોગ શોધ માટે પાકની તસવીરો અપલોડ કરો' },
  uploadCropImage: { en: 'Upload Crop Image', hi: 'फसल की तस्वीर अपलोड करें', mr: 'पीक चित्र अपलोड करा', gu: 'પાકની તસવીર અપલોડ કરો' },
  cropName: { en: 'Crop Name', hi: 'फसल का नाम', mr: 'पिकाचे नाव', gu: 'પાકનું નામ' },
  cropNamePlaceholder: { en: 'e.g., Tomato, Wheat, Rice', hi: 'जैसे, टमाटर, गेहूं, चावल', mr: 'उदा., टोमॅटो, गहू, तांदूळ', gu: 'દા.ત., ટમેટા, ઘઉં, ચોખા' },
  cropImage: { en: 'Crop Image', hi: 'फसल की तस्वीर', mr: 'पिकाचे चित्र', gu: 'પાકની તસવીર' },
  clickToUpload: { en: 'Click to upload crop image', hi: 'फसल की तस्वीर अपलोड करने के लिए क्लिक करें', mr: 'पीक चित्र अपलोड करण्यासाठी क्लिक करा', gu: 'પાકની તસવીર અપલોડ કરવા માટે ક્લિક કરો' },
  imageFormat: { en: 'PNG, JPG up to 10MB', hi: 'PNG, JPG 10MB तक', mr: 'PNG, JPG 10MB पर्यंत', gu: 'PNG, JPG 10MB સુધી' },
  analyzing: { en: 'Analyzing...', hi: 'विश्लेषण कर रहे हैं...', mr: 'विश्लेषण करत आहे...', gu: 'વિશ્લેષણ કરી રહ્યા છીએ...' },
  detectDisease: { en: 'Detect Disease', hi: 'रोग की पहचान करें', mr: 'रोग शोधा', gu: 'રોગ શોધો' },
  diseaseDetails: { en: 'Disease Details', hi: 'रोग विवरण', mr: 'रोग तपशील', gu: 'રોગ વિગતો' },
  diseaseName: { en: 'Disease Name', hi: 'रोग का नाम', mr: 'रोगाचे नाव', gu: 'રોગનું નામ' },
  severity: { en: 'Severity Level', hi: 'गंभीरता स्तर', mr: 'तीव्रता स्तर', gu: 'ગંભીરતા સ્તર' },
  symptoms: { en: 'Symptoms Observed', hi: 'लक्षण देखे गए', mr: 'लक्षणे आढळली', gu: 'લક્ષણો જોવા મળ્યા' },
  treatmentRecommendations: { en: 'Treatment & Cure', hi: 'उपचार और इलाज', mr: 'उपचार आणि इलाज', gu: 'સારવાર અને ઇલાજ' },
  treatment: { en: 'Treatment', hi: 'उपचार', mr: 'उपचार', gu: 'સારવાર' },
  pesticides: { en: 'Recommended Pesticides/Solutions', hi: 'अनुशंसित कीटनाशक/समाधान', mr: 'शिफारस केलेली कीटकनाशके/उपाय', gu: 'ભલામણ કરેલ જંતુનાશકો/ઉકેલો' },
  preventiveMeasures: { en: 'Preventive Measures', hi: 'निवारक उपाय', mr: 'प्रतिबंधात्मक उपाय', gu: 'નિવારક પગલાં' },
  uploadImageToAnalyze: { en: 'Upload an image and click analyze to see results', hi: 'परिणाम देखने के लिए एक तस्वीर अपलोड करें और विश्लेषण करें', mr: 'परिणाम पाहण्यासाठी चित्र अपलोड करा आणि विश्लेषण करा', gu: 'પરિણામો જોવા માટે તસવીર અપલોડ કરો અને વિશ્લેષણ કરો' },
  pleaseFillAllFields: { en: 'Please provide crop name and upload an image', hi: 'कृपया फसल का नाम दें और एक तस्वीर अपलोड करें', mr: 'कृपया पिकाचे नाव द्या आणि चित्र अपलोड करा', gu: 'કૃપા કરીને પાકનું નામ આપો અને તસવીર અપલોડ કરો' },
  analysisFailed: { en: 'Analysis failed', hi: 'विश्लेषण विफल', mr: 'विश्लेषण अयशस्वी', gu: 'વિશ્લેષણ નિષ્ફળ' },
  analysisComplete: { en: 'Analysis complete!', hi: 'विश्लेषण पूर्ण!', mr: 'विश्लेषण पूर्ण!', gu: 'વિશ્લેષણ પૂર્ણ!' },
  errorOccurred: { en: 'An error occurred', hi: 'एक त्रुटि हुई', mr: 'त्रुटी आली', gu: 'એક ભૂલ આવી' },
  location: { en: 'Location', hi: 'स्थान', mr: 'स्थान', gu: 'સ્થાન' },
  enterLocation: { en: 'Enter city name (e.g., Mumbai, Delhi)', hi: 'शहर का नाम दर्ज करें (जैसे, मुंबई, दिल्ली)', mr: 'शहराचे नाव प्रविष्ट करा (उदा., मुंबई, दिल्ली)', gu: 'શહેરનું નામ દાખલ કરો (દા.ત., મુંબઈ, દિલ્હી)' },
  getWeather: { en: 'Get Weather', hi: 'मौसम प्राप्त करें', mr: 'हवामान मिळवा', gu: 'હવામાન મેળવો' },
  loading: { en: 'Loading...', hi: 'लोड हो रहा है...', mr: 'लोड होत आहे...', gu: 'લોડ થઈ રહ્યું છે...' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('preferred_language')
          .eq('id', user.id)
          .single();
        if (data?.preferred_language) {
          setLanguageState(data.preferred_language as Language);
        }
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_language: lang })
        .eq('id', user.id);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};