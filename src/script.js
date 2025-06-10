import "./style.css";
import { supabase } from "./supabaseClient.js";

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

// === Google Analytics Event Tracking & Button Handlers ===
document.addEventListener("DOMContentLoaded", function () {
  // CTA 버튼 클릭 이벤트 (index1.html, index1-2.html)
  document.querySelectorAll(".cta-button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "cta_click", {
          event_category: "CTA",
          event_label: btn.innerText.trim(),
          version: "A",
        });
      }
      // index1.html: 이동, index1-2.html: 없음
      if (btn.classList.contains("cta-button")) {
        // index1.html에서만 이동
        if (window.location.pathname.includes("index1.html")) {
          window.location.href = "index1-2.html";
        }
      }
    });
  });

  // go-to-form-btn 클릭 이벤트 (index1-2.html)
  var goToFormBtn = document.querySelector(".go-to-form-btn");
  var deliveryForm = document.getElementById("deliveryForm");
  if (goToFormBtn && deliveryForm) {
    goToFormBtn.addEventListener("click", function () {
      if (typeof gtag === "function") {
        gtag("event", "go_to_form_click", {
          event_category: "CTA",
          event_label: "go-to-form-btn",
        });
      }
      deliveryForm.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 배송 정보 제출 이벤트 (index1-2.html)
  if (deliveryForm) {
    deliveryForm.addEventListener("submit", function () {
      if (typeof gtag === "function") {
        gtag("event", "delivery_submit", {
          event_category: "Form",
          event_label: "delivery-submit-btn",
        });
      }
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
  deliveryForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const version = "A";
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
        window.location.href = "index.html";
      }, 2000);
    }
  });
}
