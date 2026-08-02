/* ═══════════════════════════════════════════
   script.js
   المستشار أحمد مندوه رمضان
═══════════════════════════════════════════ */

// ── NAV — يتغير لما تسكرول ──────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ── SCROLL REVEAL — عناصر تظهر لما توصلها ──
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

// ── COUNTERS — أرقام بتتعد لحالها ──────────
const counterEls = document.querySelectorAll('.counter');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target);
    let current  = 0;
    const step   = Math.ceil(target / 60);

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current.toLocaleString('ar-EG');
      if (current >= target) clearInterval(timer);
    }, 25);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counterEls.forEach(el => counterObserver.observe(el));

// ── FORM — بيبعت رسالة واتساب ──────────────
function sendInquiry() {
  const name  = document.getElementById('f-name').value.trim();
  const phone = document.getElementById('f-phone').value.trim();
  const type  = document.getElementById('f-type').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();

  if (!name || !phone || !type || !msg) {
    alert('من فضلك أكمل جميع الحقول');
    return;
  }

  const whatsappMsg =
    `استفسار جديد من موقع المستشار أحمد مندوه:\n` +
    `الاسم: ${name}\n` +
    `الهاتف: ${phone}\n` +
    `نوع القضية: ${type}\n` +
    `التفاصيل: ${msg}`;

  window.open(
    `https://wa.me/201068789155?text=${encodeURIComponent(whatsappMsg)}`,
    '_blank'
  );
}

// ── SMOOTH SCROLL — للروابط الداخلية ────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
