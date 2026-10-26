/*
  GA4 실습용 클릭 이벤트 (Day 34).
  GA4 태그(gtag.js)를 <head>에 붙이기 전에는 아무 일도 하지 않습니다.
  data-ga="이벤트이름" 이 붙은 버튼·링크를 누르면 GA4로 이벤트를 보냅니다.
  예) <a data-ga="cta_click" data-ga-location="hero">  → 이벤트 cta_click, 파라미터 location=hero
  신청 완료(generate_lead)는 assets/privacy.js 에서 보냅니다.
*/
(function () {
  document.querySelectorAll('[data-ga]').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof window.gtag !== 'function') return;
      window.gtag('event', el.getAttribute('data-ga'), {
        location: el.getAttribute('data-ga-location') || '',
        button_text: (el.textContent || '').trim().slice(0, 40)
      });
    });
  });
})();
