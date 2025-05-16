import { getPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '회사소개',
      href: '/about',
    },
      {
      text: '제품소개',
      href: '/products/key',
      target: '_self', // 이걸 추가
      rel: 'noopener'
    },
    {
      text: '설치사례',
      links: [
        { text: '아파트', href: '/installations/installations' },
        { text: '기업', href: '/cases/company' },
      ],
    },
    {
      text: '문의',
      href: '/contact',
    },
  ],
};
export const footerData = {
  links: [  
    {
      title: 'Company',
      links: [
        { text: 'About', href: '#' },
        { text: 'Blog', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
        { text: 'Inclusion', href: '#' },
        { text: 'Social Impact', href: '#' },
        { text: 'Shop', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],

};
