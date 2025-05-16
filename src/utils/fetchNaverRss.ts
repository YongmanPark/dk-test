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
  if (!match) return null;

  const extractedUrl = match[1].replace(/^http:/, 'https:');

  // 네이버 프로필/기본 썸네일 필터링
  if (extractedUrl.includes('blogpfthumb-phinf.pstatic.net') || 
      extractedUrl.includes('static.pstatic.net')) {
    return null;
  }

  return extractedUrl;
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

  const feed = await parser.parseURL('https://rss.blog.naver.com/petermi.xml');

  const defaultImages = [
    '/images/blog/default1.jpg',
    '/images/blog/default2.jpg',
    '/images/blog/default3.jpg',
    '/images/blog/default4.jpg',  
    '/images/blog/default5.jpg',
    '/images/blog/default6.jpg',
    '/images/blog/default7.jpg',
    '/images/blog/default8.jpg',
    '/images/blog/default9.jpg',
    '/images/blog/default10.jpg',
    '/images/blog/default11.jpg',
    '/images/blog/default12.jpg',
    '/images/blog/default13.jpg',
    '/images/blog/default14.jpg',
    '/images/blog/default15.jpg',
    '/images/blog/default16.jpg',
  ];

  const shuffledDefaults = shuffleArray(defaultImages);

  // 먼저 8개는 기본 이미지로 설정
  const posts = feed.items.slice(0, count).map((item, index) => {
    let thumbnail = '';

    if (index < shuffledDefaults.length) {
      // 처음 8개는 기본 이미지 사용
      thumbnail = shuffledDefaults[index];
    } else {
      // 이후 8개는 네이버 썸네일 시도
      const extracted = extractImageFromContent(item.contentEncoded);
      thumbnail = extracted || shuffledDefaults[index % shuffledDefaults.length];
    }

    return {
      title: item.title ?? '',
      link: item.link ?? '',
      pubDate: item.pubDate ?? '',
      contentSnippet: item.contentSnippet ?? '',
      thumbnail,
    };
  });

  return posts;
}
