const counterReducers = {
    incremented: (state) => {
      state.count += 1;
    },
    decremented: (state) => {
      state.count -= 1;
    },
    reset: (state) => {
      state.count = 0;
    },
    incresByValue: (state,action)=> {
      state.count += action.payload;
    }
  };
  
  export default counterReducers;
  