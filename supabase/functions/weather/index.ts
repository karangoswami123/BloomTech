// import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// const corsHeaders = {
//   'Access-Control-Allow-Origin': '*',
//   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
// };

// serve(async (req) => {
//   if (req.method === 'OPTIONS') {
//     return new Response(null, { headers: corsHeaders });
//   }

//   try {
//     const { lat, lon, location } = await req.json();
//     const apiKey = '0a0b0e921ba294772e4d0f4b15a22ddf';
    
//     let finalLat = lat;
//     let finalLon = lon;
    
//     // If location (city name) is provided, get coordinates first
//     if (location && !lat && !lon) {
//       const geoResponse = await fetch(
//         `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`
//       );
//       const geoData = await geoResponse.json();
      
//       if (geoData && geoData.length > 0) {
//         finalLat = geoData[0].lat;
//         finalLon = geoData[0].lon;
//       } else {
//         return new Response(JSON.stringify({ error: 'Location not found' }), {
//           status: 404,
//           headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//         });
//       }
//     }
    
//     const response = await fetch(
//       `https://api.openweathermap.org/data/3.0/onecall?lat=${finalLat}&lon=${finalLon}&units=metric&appid=${apiKey}`
//     );
    
//     const data = await response.json();
    
//     return new Response(JSON.stringify(data), {
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
//     return new Response(JSON.stringify({ error: errorMessage }), {
//       status: 500,
//       headers: { ...corsHeaders, 'Content-Type': 'application/json' },
//     });
//   }
// });
// @ts-nocheck

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const API_KEY = "2e3c9edff89c48acf7294c6328333055"; // Replace with your own key

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json() as {
      lat?: number;
      lon?: number;
      location?: string;
    };

    let finalLat = body.lat;
    let finalLon = body.lon;

    // ✅ Get coordinates if only location name is given
    if (body.location && (!body.lat || !body.lon)) {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(body.location)}&limit=1&appid=${API_KEY}`
      );

      if (!geoRes.ok) {
        throw new Error("Failed to fetch geolocation data");
      }

      const geoData = await geoRes.json();

      if (!geoData || geoData.length === 0) {
        return new Response(JSON.stringify({ error: "Location not found" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      finalLat = geoData[0].lat;
      finalLon = geoData[0].lon;
    }

    if (!finalLat || !finalLon) {
      return new Response(JSON.stringify({ error: "Latitude and longitude are required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ✅ Use OpenWeather 2.5 API (free tier)
    const weatherUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${finalLat}&lon=${finalLon}&units=metric&appid=${API_KEY}`;

    const weatherRes = await fetch(weatherUrl);

    if (!weatherRes.ok) {
      const errText = await weatherRes.text();
      throw new Error(`Weather API error: ${errText}`);
    }

    const data = await weatherRes.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
