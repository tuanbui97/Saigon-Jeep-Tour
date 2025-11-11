window.addEventListener("load", function () {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".header-top--menu"); // hoặc .menu
  const overlay = document.querySelector(".menu-overlay");
  const body = document.body;

  let isMenuOpen = false;
  let scrollY = 0; // lưu vị trí scroll hiện tại

  function openMenu() {
    if (!menu || !overlay) return;
    scrollY = window.scrollY || window.pageYOffset; // lưu vị trí trước khi khóa
    // body.style.top = `-${scrollY}px`;               // giữ nguyên màn hình
    // body.classList.add("body-no-scroll");           // khóa scroll + ẩn thanh cuộn
    menu.classList.add("is-show");
    overlay.classList.add("is-show");
    isMenuOpen = true;
  }

  function closeMenu() {
    if (!menu || !overlay) return;
    body.classList.remove("body-no-scroll");
    // body.style.top = "";                            // bỏ vị trí cố định
    // window.scrollTo(0, scrollY);                    // trả user về đúng chỗ cũ
    menu.classList.remove("is-show");
    overlay.classList.remove("is-show");
    isMenuOpen = false;
  }

  toggle && toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    if (menu.classList.contains("is-show")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  overlay && overlay.addEventListener("click", closeMenu);
  document.addEventListener("click", function (e) {
    if (isMenuOpen) return;
    if (!menu || !toggle) return;
    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggle = toggle.contains(e.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  // ========== STICKY HEADER + ANIMATION ==========
  if (!header) return;
  const stickyOffset = header.offsetTop;
  const triggerOffset = stickyOffset + 80;

  window.addEventListener("scroll", function () {
    console.log('vao ham nay');

    if (isMenuOpen) return;
    if (window.scrollY > triggerOffset) {
      if (!header.classList.contains("header--sticky")) {
        header.classList.add("header--sticky");
      }
    } else {
      header.classList.remove("header--sticky");
    }
  });

  // ====== ACTIVE MENU ITEM ======
  const menuLinks = document.querySelectorAll(".menu .menu-link");

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      // Nếu bạn không muốn reload trang (link #) thì bỏ comment:
      // e.preventDefault();

      // Bỏ active ở tất cả link
      menuLinks.forEach(function (item) {
        item.classList.remove("is-active");
      });

      // Thêm active cho link được click
      this.classList.add("is-active");

      // Nếu đang ở mobile và menu đang mở, có thể đóng luôn menu:
      // if (menu && menu.classList.contains("is-show")) {
      //   closeMenu();
      // }
    });
  });
  // ====== Close Menu ======
  const closeMenuBtn = document.querySelector(".menu .close-menu");
  closeMenuBtn && closeMenuBtn.addEventListener("click", closeMenu);
  //============END=========

  
});
