// 타이머 카운트다운
function updateTimer() {
  const timer = document.getElementById("countdown");
  let timeLeft = timer.textContent.split(":");
  let hours = parseInt(timeLeft[0]);
  let minutes = parseInt(timeLeft[1]);
  let seconds = parseInt(timeLeft[2]);

  seconds--;
  if (seconds < 0) {
    seconds = 59;
    minutes--;
    if (minutes < 0) {
      minutes = 59;
      hours--;
      if (hours < 0) {
        hours = 23;
      }
    }
  }

  timer.textContent =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":" +
    String(seconds).padStart(2, "0");
}

setInterval(updateTimer, 1000);

// CTA 버튼 클릭 처리
document.addEventListener("DOMContentLoaded", function () {
  // '지금 할인 받고 구매하기' 버튼에 이벤트 리스너 연결
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      window.location.href = "index1-2.html";
    });
  }
  // go-to-form-btn 스크롤 이벤트
  const goToFormBtn = document.querySelector(".go-to-form-btn");
  const deliveryForm = document.getElementById("deliveryForm");
  if (goToFormBtn && deliveryForm) {
    goToFormBtn.addEventListener("click", function () {
      deliveryForm.scrollIntoView({ behavior: "smooth" });
    });
  }
});

// 페이지 로드 시 애니메이션
window.addEventListener("load", function () {
  var heroSection = document.querySelector(".hero-section");
  if (heroSection) {
    heroSection.style.opacity = "0";
    heroSection.style.transform = "translateY(20px)";
    setTimeout(() => {
      heroSection.style.transition = "all 0.8s ease";
      heroSection.style.opacity = "1";
      heroSection.style.transform = "translateY(0)";
    }, 200);
  }
});

// 배송 정보 제출 시 모달 표시 및 페이지 이동
const deliveryForm = document.getElementById("deliveryForm");
if (deliveryForm) {
  deliveryForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "index.html";
      }, 2000);
    }
  });
}
