import counterReducers from "./counterReducers";
// import leadsReducers from "./leadsReducers";
import themeReducers from "./themeReducers";
import userReducers from "./userReducers";

const reducers = {
    ...counterReducers,
    ...userReducers,
    ...themeReducers,
    // ...leadsReducers
}


export default reducers;