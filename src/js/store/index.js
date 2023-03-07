const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  //로컬스토리지 에 데이터 저장/ 불러오기
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};

export default store;
