import { $ } from "./utils/dom.js";
//대상이 너무 길어지지 않도록 $를 사용하여 변수를 만듬
import store from "./store/index.js";

function App() {
  // 상태 (변하는 데이터) - 메뉴명
  // console.log(menu);
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.currentCategory = "espresso";
  // 상태를 관리 하기 위해 빈 배열로 만듬(메뉴는 여러개이기 때문에 배열로 관리)
  //초기화 하는 이유는 어떤 종류의 데이터가 들어오는지에 대하여 명시 하는것
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };
  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${
        menuItem.soldOut ? "sold-out" : ""
      }">${menuItem.name}</span>
      <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">품절</button>
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

    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  //페이지 로드시 초기화 하는 메서드 생성
  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("메뉴를 입력해 주세요!");
      return;
    }
    const MenuName = $("#menu-name").value;
    this.menu[this.currentCategory].push({ name: MenuName });
    store.setLocalStorage(this.menu);
    // push를 사용해 새로운 객체를 담을수있다.
    render();
    $("#menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    //prompt에 뜨는 menuName이 이전에 입력한 span태그의 값을 가져오게 한다.
    const updateMenuName = prompt("메뉴를 수정해주세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updateMenuName;
    store.setLocalStorage(this.menu);
    render();
    //closest 가장 가까운 li태그를 찾는다.
    //데이터가 상태를 변경하는것은 최소한의 로직으로 변경하는것이 좋다 안그러면 데이터가 많이 꼬일수가있다.
  };

  const removeMenuName = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };
  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    // 맨처음에 soldOut을 선언해준적이 없어서 읽어오면 undefined라 return이 되는데 undefined의 부정이라 처음에 true로 그게 아닐때는 !때문에 false로 반복이 된다.
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }
      //메뉴 삭제 이벤트
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });
    //form 태그가 자동으로 전송되는걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);
    //메뉴의 이름을 입력받는건
    // 이렇게만 작성하면 키보드 입력 할때마다 이벤트가 발생해 한글자씩 반응하게 된다.
    // form 태그가 전송에 의미가 있기 때문에 enter을 입력하면 자동으로 새로고침을 한다.
    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
        // enter키가 아닐때도 이벤트가 작동하기때문에 enter가 아닐때 리턴추가
      }
      addMenuName();
    });

    $("nav").addEventListener("click", (e) => {
      const isCategoryButton =
        e.target.classList.contains("cafe-category-name");
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  };
  //메뉴 수정이벤트
  //if문이 연속으로 있으면 끝에 return을 입력하는 것이 좋다. 그럼 불필요한 연산들을 할필요가 없기때문에
}
const app = new App();
app.init();
