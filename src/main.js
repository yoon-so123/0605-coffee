console.log("pt.js가 정상적으로 연결되었습니다.");

// // index.html에서만 동작: 50% 확률로 index1.html 또는 index2.html로 리디렉션
// (function () {
//   var to = Math.random() < 0.5 ? "index1.html" : "index2.html";
//   window.location.replace(to);
// })();

// 리디렉션 대상 결정
const to = Math.random() < 0.5 ? "index1.html" : "index2.html";

// 로딩 완료 후 리디렉션 실행
function redirectToPage() {
  console.log("Redirecting to:", to);
  window.location.replace(to);
}

document.addEventListener("DOMContentLoaded", redirectToPage);

// 아래에 원하는 Supabase 연동 코드 추가

document
  .getElementById("deliveryForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    // 버전 구분 (A/B)
    // index1-2.html은 'A', index2-2.html은 'B'로 구분
    const version = window.location.pathname.includes("index2-2") ? "B" : "A";

    // Supabase에 저장
    const { data, error } = await supabase
      .from("delivery_info")
      .insert([{ name, address, phone, version }]);

    if (error) {
      alert("저장 실패: " + error.message);
    } else {
      // 기존 모달/리디렉션 등 추가 동작
      alert("저장 성공!");
    }
  });
