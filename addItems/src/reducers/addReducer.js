import { fromJS } from "immutable";

function items(state = fromJS([]), action) {
  switch (action.type) {
    case "addItem": {
      console.log("reducer items", ...state);
      return [...state, action.payload];
    }
    default: {
      return state;
    }
  }
}

// function addItemsReducer(state = fromJS([]), action) {
//   console.log("reducer state items", state.get("items"));
//   const addReducerState = addReducer(state.get("items"), action);
//   return state.set("items", addReducerState);
// }

export default items;
