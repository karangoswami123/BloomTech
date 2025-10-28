import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { cropName, image } = await req.json();
    const apiKey = 'AIzaSyAJQSqjLfUr7NDnEAFz6Y60jABfbDEKJps';
    
    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, '');
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: `Analyze this ${cropName} crop image for diseases. Provide a detailed diagnosis including: 1) Disease name if any, 2) Severity level, 3) Symptoms observed, 4) Treatment recommendations, 5) Preventive measures, 6) Recommended pesticides or organic solutions. If the crop appears healthy, mention that too.` },
            { 
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Image
              }
            }
          ]
        }]
      }),
    });

    const data = await response.json();
    const diagnosis = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Analysis complete';
    
    return new Response(JSON.stringify({ 
      diagnosis, 
      recommendations: 'Treatment details provided above' 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});