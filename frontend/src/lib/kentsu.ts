import { Article } from '@/types/types';
import { XMLParser } from 'fast-xml-parser';

async function fetchWithRetry(
  url: string,
  retries = 5,
  initialDelay = 1000
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // Increased timeout to 30s

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: '*/*', // Accept any content type
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
        cache: 'no-store', // Disable caching
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        return response;
      }

      throw new Error(`HTTP error! status: ${response.status}`);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      lastError = error;
      const errorMessage = error.message || 'Unknown error';
      console.warn(
        `Attempt ${i + 1}/${retries} failed for ${url}:`,
        errorMessage
      );

      if (i === retries - 1) {
        console.error(
          `All ${retries} attempts failed for ${url}. Last error:`,
          errorMessage
        );
        throw new Error(`Failed to fetch Kentsu blog: ${errorMessage}`);
      }

      // Add jitter to the delay to prevent thundering herd
      const delay = initialDelay * Math.pow(2, i) * (0.5 + Math.random());
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError || new Error('Failed to fetch after all retries');
}

export async function getKentsuArticles(): Promise<Article[]> {
  try {
    // Try fetching with HTTPS first
    let response: Response;
    try {
      response = await fetchWithRetry(
        'https://www.kentsu.website/ja/index.xml'
      );
    } catch (error) {
      console.warn('HTTPS fetch failed, trying HTTP fallback', error);
      response = await fetchWithRetry('http://www.kentsu.website/ja/index.xml');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();
    if (!xmlText || xmlText.trim().length === 0) {
      throw new Error('Received empty response from server');
    }

    const parser = new XMLParser({
      ignoreAttributes: false,
      parseAttributeValue: true,
      trimValues: true,
      isArray: (name) => {
        // Always treat item as array
        return name === 'item';
      },
    });

    const data = parser.parse(xmlText);

    if (!data?.rss?.channel?.item) {
      console.warn('No items found in RSS feed');
      return [];
    }

    const items = data.rss.channel.item;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    return items.map((item: any) => ({
      title: item.title || 'Untitled',
      url: item.link || 'https://www.kentsu.website',
      published_at: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      likes_count: 0,
      user: 'kentsu',
      avatar_small_url: undefined, // This will trigger the fallback to show 'K'
      platform: 'kentsu' as const,
    }));
  } catch (error) {
    console.error('Error fetching Kentsu blog articles:', error);
    throw error; // Re-throw to let the caller handle the error
  }
}
