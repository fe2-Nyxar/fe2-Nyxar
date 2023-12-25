import * as action from "./actiontype.jsx";
// inside the ./actiontypes.jsx
// export const Bug_Added = "BugAdded";
// export const Bug_Removed = "BugRemoved";

function reducer(state = [],action){
    switch(action.type){
        case "BugAdded":
            return [
                ...state, {id: ++lastid, description: action.playload.description,resolved: false}
            ]

        case "BugRemoved":
            return [
                state.filter(bug=> bug.id !== action.id)
            ]

        default:
            return[]
    }
}

