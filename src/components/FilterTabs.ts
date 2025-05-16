export function setupFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab') as NodeListOf<HTMLElement>;
    const cards = document.querySelectorAll('.product-card') as NodeListOf<HTMLElement>;
  
    function filter(category: string) {
      cards.forEach((card) => {
        const match = category === '전체' || card.dataset.category === category;
        card.style.display = match ? 'block' : 'none';
      });
    }
  
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const selected = tab.dataset.category;
        if (!selected) return;
  
        // 모든 탭에서 active 제거 후 현재 탭에 active 부여
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
  
        filter(selected);
      });
    });
  
    // 페이지 진입 시 첫 번째 탭 강제 실행
    const firstTab = tabs[0];
    if (firstTab) {
      firstTab.classList.add('active');
      const defaultCategory = firstTab.dataset.category;
      if (defaultCategory) {
        filter(defaultCategory);
      }
    }
  }
  