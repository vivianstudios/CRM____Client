const themeReducers = {
    setDarkTheme: (state) => {
        localStorage.setItem("THEME", JSON.stringify("DARK"));
        state.theme = 'DARK';
    },
    setLightTheme: (state) => {
        localStorage.setItem("THEME", JSON.stringify("LIGHT"));
        state.theme = 'LIGHT';
    },
    setPageModel: (state,action) => {
        localStorage.setItem("pageModel", JSON.stringify(action.payload));
        state.pageModel = action.payload;
    },
    setIsSearch: (state,action) => {
        state.isSearch = action.payload;
    },
    setIsFilter: (state,action) => {
        state.isFilter = action.payload;
    },
    setFilterParams: (state,action) => {
        state.filterParams = action.payload;
    },
    setSearchValue: (state,action) => {
        state.searchValue = action.payload;
    },
    setSearchPath: (state,action) => {
        state.searchPath = action.payload;
    },
  };
  
  export default themeReducers;
  