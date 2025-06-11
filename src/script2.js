import "./style2.css";
import { supabase } from "./supabaseClient.js";

// CTA 버튼 클릭 처리 (addEventListener로 연결)
document.addEventListener("DOMContentLoaded", function () {
  const ctaButton = document.querySelector(".cta-button.ripple");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      // 구매 처리 로직
      window.location.href = "index2-2.html";
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

  // 모든 .cta-button 클릭 이벤트 (index2.html)
  document.querySelectorAll(".cta-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "cta_click", {
          event_category: "CTA",
          event_label: btn.innerText.trim(),
          version: "B",
        });
      }
    });
  });

  // go-to-form-btn 클릭 이벤트 (index2-2.html)
  if (goToFormBtn) {
    goToFormBtn.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "go_to_form_click", {
          event_category: "CTA",
          event_label: "go-to-form-btn",
          version: "B",
        });
      }
    });
  }

  // 배송 정보 제출 이벤트 (index2-2.html)
  if (deliveryForm) {
    deliveryForm.addEventListener("submit", function () {
      if (typeof gtag === "function") {
        gtag("event", "delivery_submit", {
          event_category: "Form",
          event_label: "delivery-submit-btn",
          version: "B",
        });
      }
    });
  }
});

// 스크롤 애니메이션
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// 배송 시간 실시간 업데이트
function updateDeliveryTime() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const deliveryDate = tomorrow.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });

  const deliveryTimeElement = document.querySelector(".delivery-time");
  if (deliveryTimeElement) {
    deliveryTimeElement.innerHTML = `⏰ ${deliveryDate} 도착 예정`;
  }
}

// 카운트다운 타이머
function updateCountdown() {
  const countdownElement = document.querySelector(".delivery-countdown");
  if (!countdownElement) return;

  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(18, 0, 0, 0); // 오후 6시로 설정
  if (now > endOfDay) {
    endOfDay.setDate(endOfDay.getDate() + 1);
  }

  const timeDiff = endOfDay - now;
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `⏰ 빠른 배송 마감까지 ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

// 페이지 로드 시 실행
updateDeliveryTime();
updateCountdown();

// 1초마다 카운트다운 업데이트
setInterval(updateCountdown, 1000);

// 배송 정보 제출 시 모달 표시 및 페이지 이동
const deliveryForm = document.getElementById("deliveryForm");
if (deliveryForm) {
  deliveryForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const version = "B";
    // Supabase 저장
    const { data, error } = await supabase
      .from("delivery_info")
      .insert([{ name, address, phone, version }]);
    if (error) {
      alert("저장 실패: " + error.message);
      return;
    }
    // 기존 모달/리디렉션
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "flex";
      setTimeout(() => {
        modal.style.display = "none";
        window.location.href = "index2.html";
      }, 2000);
    }
  });
}
