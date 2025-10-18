import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Mock live price data - in production, this would fetch from a real API
const getPriceData = (metal: string) => {
  const basePrices = {
    'gold': 0,
    'silver': 0,
    'platinum': 0,
    'palladium': 0
  };

  const basePrice = basePrices[metal as keyof typeof basePrices] || basePrices.gold;
  const randomChange = 0; // -1% to +1%

  return {
    metal,
    price: basePrice * (1 + randomChange / 100),
    change: randomChange,
    lastUpdate: new Date().toISOString()
  };
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { metal = 'gold' } = await req.json();
    const priceData = getPriceData(metal);

    return new Response(
      JSON.stringify(priceData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error fetching prices:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
