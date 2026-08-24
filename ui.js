// این فایل فقط مسئول انیمیشن‌های ورود عناصر به صفحه‌ست
// (کاملاً جدا از منطق فرم رزرو در script.js نگه داشته شده)

document.addEventListener('DOMContentLoaded', () => {
  // ۱) عناصر هیرو: همون لحظه‌ی بارگذاری صفحه با کمی تاخیر پشت‌سرهم ظاهر می‌شن
  const heroItems = document.querySelectorAll('.hero .reveal-up');
  heroItems.forEach((el) => {
    // یک فریم صبر می‌کنیم تا مرورگر حالت اولیه (مخفی) رو ثبت کنه، بعد کلاس نمایش رو اضافه می‌کنیم
    requestAnimationFrame(() => {
      requestAnimationFrame(() => el.classList.add('in-view'));
    });
  });

  // ۲) بقیه‌ی عناصر (مثل کارت‌های منو): وقتی کاربر اسکرول کرد و بهشون رسید ظاهر می‌شن
  const scrollItems = document.querySelectorAll('.reveal-up:not(.hero .reveal-up)');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // فقط یک بار انیمیشن اجرا بشه
          }
        });
      },
      { threshold: 0.2 } // وقتی ۲۰٪ از عنصر دیده شد، انیمیشن اجرا بشه
    );

    scrollItems.forEach((el) => observer.observe(el));
  } else {
    // اگه مرورگر خیلی قدیمی بود و IntersectionObserver رو نداشت، مستقیم نمایش بده
    scrollItems.forEach((el) => el.classList.add('in-view'));
  }
});
