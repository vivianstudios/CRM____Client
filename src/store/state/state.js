const State = {
    count: 0,
    user: {},
    theme: JSON.parse(localStorage.getItem("THEME")),
    pageModel: JSON.parse(localStorage.getItem("pageModel")) || {page: 0, pageSize: 100},
    isSearch: false,
    isFilter: false,
    filterParams: {},
    searchValue: "",
    searchPath: "",


};

export default State;