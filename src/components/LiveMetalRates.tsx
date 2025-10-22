import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, TrendingDown, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface MetalPrice {
  id: string;
  metal_type: string;
  price_per_gram: number;
  currency: string;
  last_updated: string;
}

const METAL_NAMES: Record<string, string> = {
  'gold-24k': '24K Gold',
  'gold-22k': '22K Gold',
  'gold-18k': '18K Gold',
  'silver': 'Silver',
  'platinum': 'Platinum',
};

const METAL_ICONS: Record<string, string> = {
  'gold-24k': '',
  'gold-22k': '',
  'gold-18k': '',
  'silver': '',
  'platinum': '',
};

export const LiveMetalRates = () => {
  const [prices, setPrices] = useState<MetalPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

const loadPrices = async () => {
  try {
    // Instead of calling Supabase, use fixed zero data
    const zeroPrices: MetalPrice[] = [
      { id: '1', metal_type: 'gold-18k', price_per_gram: 0, currency: 'INR', last_updated: new Date().toISOString() },
      { id: '2', metal_type: 'gold-22k', price_per_gram: 0, currency: 'INR', last_updated: new Date().toISOString() },
      { id: '3', metal_type: 'gold-24k', price_per_gram: 0, currency: 'INR', last_updated: new Date().toISOString() },
      { id: '4', metal_type: 'platinum', price_per_gram: 0, currency: 'INR', last_updated: new Date().toISOString() },
      { id: '5', metal_type: 'silver', price_per_gram: 0, currency: 'INR', last_updated: new Date().toISOString() },
    ];

    setPrices(zeroPrices);
  } catch (error) {
    console.error('Error loading prices:', error);
    toast.error('Failed to load metal prices');
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    loadPrices();
    
    // Refresh prices every 5 minutes
    const interval = setInterval(loadPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPrices();
  };

  const getRandomTrend = () => {
    const trends = ['+0%', '+0%', '-0%', '+0%', '-0%'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            💰 Live Metal Rates [COMING SOON!]
            <Badge variant="secondary">Real-time</Badge>
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.map((price) => {
            const trend = getRandomTrend();
            const isPositive = trend.startsWith('+');
            
            return (
              <div
                key={price.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{METAL_ICONS[price.metal_type]}</span>
                  <div>
                    <p className="font-medium">{METAL_NAMES[price.metal_type]}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {new Date(price.last_updated).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">₹{price.price_per_gram.toLocaleString()}/g</p>
                  <div className="flex items-center gap-1 justify-end">
                    {isPositive ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        isPositive ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {trend}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          Prices update every 5 minutes. Rates are indicative and subject to market changes.
        </p>
      </CardContent>
    </Card>
  );
};