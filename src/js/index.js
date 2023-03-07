// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
// - [x] 추가되는 메뉴의 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>`안에 삽입되어야 한다.
// - [x] 메뉴의 이름을 입력받고 확인버튼을 클릭하면 메뉴를 추가한다.
// - [x] 총 메뉴 갯수를 count하여 상단에보여준다.
// - [x] 메뉴가 추가 되고나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력 값이 빈값이라면 추가되지 않는다.
// TODO 메뉴 수정
// - [x] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴수정하는 모달창(prompt)이 뜬다.
// - [x] 모달창에서 신규 메뉴명을 입력 받고. 확인버튼을 누르면 메뉴가 수정된다.
// TODO 메뉴 삭제
// - [x] 메뉴 삭제버튼 클릭 이벤트를 받고ㅡ 메뉴삭제 컨펌 모달창이 뜬다.
// - [x] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [x] 총 메뉴 갯수를 count하여 상단에보여준다.
// TODO localStorage Read & Write
// - [ ] localStorage에 데이터를 저장한다.
// - [ ] 메뉴를 추가할때 저장
// - [ ] 메뉴를 수정할때 저장
// - [ ] 메뉴를 삭제할때 저장
// - [ ] localStorage에 있는 데이터를 읽어준다.
// TODO 카테고리별 메뉴판관리
// - [ ] 에스프레소 메뉴판 관리
// - [ ] 프라푸치노 메뉴판 관리
// - [ ] 블렌디드 메뉴판 관리
// - [ ] 티바나 메뉴판 관리
// - [ ] 디저트 메뉴판 관리
// TODO 페이지 접근시 최초 데이터 Read & Rendering
// - [ ] 페이지에서 최초로 로딩될때 localStorage에 애스프레소메뉴를 읽어온다.
// - [ ] 에스프레소 메뉴를 페이지에 그려준다.
// TODO 품절 상태 관리
// - [ ] 품절상태인 경우를 보여줄구 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
// - [ ] 품절 버튼을 추가한다.
// - [ ] 품절 버튼을 클릭하면 localStorage에 상태값이 저장된다.
// - [ ] 클릭이벤트에서 가장 가까운 li태그의 class 속성 값에 sold-out을 추가한다.

const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

function App() {
  // 상태 (변하는 데이터) - 메뉴명
  // console.log(menu);
  this.menu = [];
  // 상태를 관리 하기 위해 빈 배열로 만듬(메뉴는 여러개이기 때문에 배열로 관리)

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력해 주세요!");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);
    // push를 사용해 새로운 객체를 담을수있다.
    const template = this.menu
      .map((item, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
    </li>`; //문자열을 하나로 합쳐줌
      })
      .join("");
    //여러개의 아이템을 순회하며 렌더링이 되야한다. 메뉴별로 마크업을 만들고 화면에 넣어주기 위해 사용

    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //prompt에 뜨는 menuName이 이전에 입력한 span태그의 값을 가져오게 한다.
    const updateMenuName = prompt("메뉴를 수정해주세요", $menuName.innerText);
    this.menu[menuId].name = updateMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updateMenuName;
    //closest 가장 가까운 li태그를 찾는다.
  };

  const removeMenuName = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };
  //메뉴 수정이벤트
  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }
    //메뉴 삭제 이벤트
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });
  //form 태그가 자동으로 전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);
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
const app = new App();
