import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory cache
let cachedArticles: any = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION_MS = 60 * 60 * 1000; // 1 hour

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY');
    if (!NEWS_API_KEY) {
      console.error('[fetch-pharma-news] NEWS_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'NEWS_API_KEY not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check cache
    const now = Date.now();
    if (cachedArticles && (now - cacheTimestamp) < CACHE_DURATION_MS) {
      console.log('[fetch-pharma-news] Serving from cache');
      return new Response(
        JSON.stringify({ 
          articles: cachedArticles.articles, 
          trendingTopics: cachedArticles.trendingTopics,
          cachedAt: new Date(cacheTimestamp).toISOString(),
          fromCache: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Fetch fresh articles
    console.log('[fetch-pharma-news] Fetching fresh articles from News API');
    
    // Search for pharmaceutical AI articles
    const query = 'pharmaceutical AI OR conversational AI healthcare OR pharma digital transformation';
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${NEWS_API_KEY}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[fetch-pharma-news] News API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ error: `News API error: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();

    // Transform articles
    const articles = (data.articles || []).slice(0, 8).map((article: any) => ({
      title: article.title,
      source: article.source?.name || 'Unknown Source',
      url: article.url,
      publishedAt: article.publishedAt,
      description: article.description || '',
      imageUrl: article.urlToImage || null,
    }));

    // Extract trending keywords/topics
    const stopWords = new Set([
      'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
      'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
      'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
      'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'it',
      'its', 'they', 'them', 'their', 'what', 'which', 'who', 'when', 'where',
      'why', 'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'some',
      'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too',
      'very', 'just', 'about', 'new'
    ]);

    const keywordCounts = new Map<string, number>();
    
    articles.forEach((article: any) => {
      const text = `${article.title} ${article.description}`.toLowerCase();
      const words = text
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => 
          word.length > 3 && 
          !stopWords.has(word) &&
          isNaN(Number(word))
        );

      words.forEach(word => {
        keywordCounts.set(word, (keywordCounts.get(word) || 0) + 1);
      });
    });

    // Get top 8 trending keywords
    const trendingTopics = Array.from(keywordCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([keyword, count]) => ({
        keyword: keyword.charAt(0).toUpperCase() + keyword.slice(1),
        count
      }));

    // Update cache
    cachedArticles = { articles, trendingTopics };
    cacheTimestamp = now;

    console.log(`[fetch-pharma-news] Fetched ${articles.length} articles with ${trendingTopics.length} trending topics, cached for 1 hour`);

    return new Response(
      JSON.stringify({ 
        articles, 
        trendingTopics,
        cachedAt: new Date(cacheTimestamp).toISOString(),
        fromCache: false
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[fetch-pharma-news] Error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
