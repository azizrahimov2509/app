import { Provider } from "react-redux";
import { legacy_createStore } from "redux";

const initialValue = { count: 0, darkmode: false };

function Counter(state = initialValue, action) {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, darkmode: !state?.darkmode };
    case "INCREMENT":
      return { ...state, count: state?.count + 1 };
    default:
      return state;
  }
}

export const countStore = legacy_createStore(Counter);

export function CountProvider({ children }) {
  return <Provider store={countStore}>{children}</Provider>;
}
