// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
// - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`안에 삽입되어야 한다.
// - [ ] 메뉴의 이름을 입력받고 확인버튼을 클릭하면 메뉴를 추가한다.
// - [x] 총 메뉴 갯수를 count하여 상단에보여준다.
// - [x] 메뉴가 추가 되고나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력 값이 빈값이라면 추가되지 않는다.

const $ = (selector) => document.querySelector(selector);

function App() {
  // TODO 메뉴 수정
  // - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴수정하는 모달창(prompt)이 뜬다.
  // - [x] 모달창에서 신규 메뉴명을 입력 받고. 확인버튼을 누르면 메뉴가 수정된다.
  // TODO 메뉴 삭제
  // - [ ] 메뉴 삭제버튼 클릭 이벤트를 받고ㅡ 메뉴삭제 컨펌 모달창이 뜬다.
  // - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
  // - [ ] 총 메뉴 갯수를 count하여 상단에보여준다.
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      //prompt에 뜨는 menuName이 이전에 입력한 span태그의 값을 가져오게 한다.
      const updateMenuName = prompt("메뉴를 수정해주세요", $menuName.innerText);
      $menuName.innerText = updateMenuName;
      //closest 가장 가까운 li태그를 찾는다.
    }
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("메뉴를 삭제하시겠습니까?")) {
        e.target.closest("li").remove();
        updateMenuCount();
      }
    }
  });

  //form 태그가 자동으로 전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력해 주세요!");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>`;
    };
    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });
  //메뉴의 이름을 입력받는건
  // 이렇게만 작성하면 키보드 입력 할때마다 이벤트가 발생해 한글자씩 반응하게 된다.
  // form 태그가 전송에 의미가 있기 때문에 enter을 입력하면 자동으로 새로고침을 한다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
      // enter키가 아닐때도 이벤트가 작동하기때문에 enter가 아닐때 리턴추가
    }
    addMenuName();
  });
}
App();
