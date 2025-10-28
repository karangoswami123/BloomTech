import axios from 'axios';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '{{OPENWEATHER_API_KEY}}';
const MANDI_API_KEY = import.meta.env.VITE_MANDI_API_KEY || '579b464db66ec23bdd000001827d1cec566c4aca4ab2bbe1b1f6eede';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps';

export const mandiAPI = {
  getPrices: async (state?: string, commodity?: string) => {
    const url = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
    const params: any = {
      'api-key': MANDI_API_KEY,
      format: 'json',
      limit: 100
    };
    
    if (state) params['filters[state]'] = state;
    if (commodity) params['filters[commodity]'] = commodity;
    
    const response = await axios.get(url, { params });
    return response.data;
  }
};

export const geminiAPI = {
  chat: async (message: string, context?: string) => {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: context ? `${context}\n\nUser: ${message}` : message
          }]
        }]
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  },
  
  analyzeImage: async (imageBase64: string, prompt: string) => {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            }
          ]
        }]
      }
    );
    
    return response.data.candidates[0].content.parts[0].text;
  }
};


// export const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error('Geolocation not supported'));
//       return;
//     }
    
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           lat: position.coords.latitude,
//           lon: position.coords.longitude
//         });
//       },
//       (error) => reject(error)
//     );
//   });
// };
