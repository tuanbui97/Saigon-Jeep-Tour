window.addEventListener("load", function () {
  // ========== MENU TOGGLE (đoạn cũ của bạn) ==========
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  toggle && toggle.addEventListener("click", handleToggleMenu);

  function handleToggleMenu(e) {
    menu && menu.classList.add("is-show");
  }

  document.addEventListener("click", handleClickOutside);

  function handleClickOutside(e) {
    console.log('e', e.target.matches(".menu-toggle"));

    if (e.target.matches(".menu-toggle") || e.target.matches(".menu, .menu *")) {
      menu && menu.classList.remove("is-show");

    }
    // return;
  }

  // ========== STICKY HEADER + ANIMATION ==========
  const header = document.querySelector(".header");
  if (!header) return;
  // vị trí ban đầu của header
  const stickyOffset = header.offsetTop;
  // muốn scroll xuống bao nhiêu px thì header bắt đầu dính
  const triggerOffset = stickyOffset + 80; // đổi số này tùy ý (0 là dính ngay)
  window.addEventListener("scroll", function () {
    if (window.scrollY > triggerOffset) {
      if (!header.classList.contains("header--sticky")) {
        header.classList.add("header--sticky");
      }
    } else {
      header.classList.remove("header--sticky");
    }
  });
});
