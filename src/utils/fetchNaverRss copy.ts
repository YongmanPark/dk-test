import Parser from 'rss-parser';

type NaverRssItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  contentSnippet?: string;
  contentEncoded?: string;
};

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  thumbnail: string;
}

function extractImageFromContent(content?: string): string | null {
  if (!content) return null;
  const cleanContent = content.replace(/\n/g, '');
  const match = cleanContent.match(/<img[^>]+src=['"]([^'">]+)['"]/i);
  return match ? match[1].replace(/^http:/, 'https:') : null;
}

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function fetchNaverRssPosts(count = 16): Promise<BlogPost[]> {
  const parser = new Parser<unknown, NaverRssItem>({
    customFields: {
      item: [['content:encoded', 'contentEncoded']],
    },
  });

  // const feed = await parser.parseURL('https://rss.blog.naver.com/dksys_0814.xml');
  const feed = await parser.parseURL('https://rss.blog.naver.com/petermi');
  const defaultImages = [
    '/images/default1.jpg',
    '/images/default2.jpg',
    '/images/default3.jpg',
    '/images/default4.jpg',
    '/images/default5.jpg',
    '/images/default6.jpg',
    '/images/default7.jpg',
    '/images/default8.jpg',
  ];

  const shuffledDefaults = shuffleArray(defaultImages).slice(0, count);

  return feed.items.slice(0, count).map((item, index) => {
    const thumbnail = extractImageFromContent(item.contentEncoded) || shuffledDefaults[index];

    return {
      title: item.title ?? '',
      link: item.link ?? '',
      pubDate: item.pubDate ?? '',
      contentSnippet: item.contentSnippet ?? '',
      thumbnail,
    };
  });
}
