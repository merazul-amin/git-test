
// Dom Element Declaire 
const addButtonEI = document.querySelector(".lws-addMatch")
const resetMatchEI = document.querySelector(".lws-reset")


// constants 
const INCREMENT_VALUE = "increment-value"
const DECREMENT_VALUE = "decrement-value"
const DELETE_MATCH = "delete-match"
const ADD_MATCH = "add-match"
const RESET_MATCH = "reset-match"

// initial state 
const initialState = {
    matches: [
        // { id: 1, title: "MATCH 1", value: 0 },
    ]
}


// actions 
const incrementValueAction = (event, id) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    store.dispatch({
        type: INCREMENT_VALUE,
        payload: {
            id, value
        }
    })
}

const decrementValueAction = (event, id) => {
    event.preventDefault();
    const value = parseInt(event.target.value);
    store.dispatch({
        type: DECREMENT_VALUE,
        payload: { id, value }
    })
}

const deleteMatch = (id) => {
    store.dispatch({
        type: DELETE_MATCH,
        payload: { id }
    })
}

const addMatch = () => {
    store.dispatch({
        type: ADD_MATCH
    })
}

const resetMatch = () => {
    store.dispatch({
        type: RESET_MATCH
    })
}





// reducer 
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT_VALUE:
            return {
                ...state,
                matches: state.matches.map(match => match.id === action.payload.id ? { ...match, value: match.value + action.payload.value } : match)
            }
        case DECREMENT_VALUE:
            const decrementCheck = (a, b) => {
                const total = a - b;
                if (a >= b) { return total }

                else {
                    alert(`You Can't remove move than score`);
                    return a;
                }
            }
            return {
                ...state,
                matches: state.matches.map(match => match.id === action.payload.id ? { ...match, value: decrementCheck(match.value, action.payload.value) } : match)
            }
        case ADD_MATCH:
            return {
                ...state,
                matches: [...state.matches, { id: state.matches.length + 1, title: `MATCH ${state.matches.length + 1}`, value: 0 }]
            }

        case DELETE_MATCH:
            if (state.matches.length < 2) {
                alert("Must be stay  single item")
                return state
            }
            return {
                ...state,
                matches: state.matches.filter(match => match.id !== action.payload.id)
            }

        case RESET_MATCH:
            const updatedMatch = state.matches.map(match => {
                return { ...match, value: 0 };
            });
            return { ...state, matches: updatedMatch };
        default:
            state;
    }
}

// store crate 
const store = Redux.createStore(counterReducer)


// render element 
const render = () => {
    const state = store.getState()
    const matchList = document.querySelector(".all-matches")
    matchList.innerHTML = "",
        state?.matches.forEach(match => {
            const outerElement = `
        <div class="match">
        <div class="wrapper">
       
        <button class="lws-delete"  onclick="deleteMatch(${match.id})">
        <img src="./image/delete.svg" alt="" />
        </button>        
            
            <h3 class="lws-matchName">${match.title}</h3>
        </div>
        <div class="inc-dec">
            <form class="incrementForm">
                <h4>Increment</h4>
                <input
                    type="number"
                    name="increment"
                    class="lws-increment"
                    onchange="incrementValueAction(event, ${match.id})"
                />
            </form>
            <form class="decrementForm">
                <h4>Decrement</h4>
                <input
                    type="number"
                    name="decrement"
                    class="lws-decrement"
                    onchange="decrementValueAction(event, ${match.id})"
                />
            </form>
        </div>
        <div class="numbers">
            <h2 class="lws-singleResult">${match.value}</h2>
        </div>
    </div>  `
            matchList.innerHTML += outerElement;
        })

}


store.subscribe(render)


addMatch()

addButtonEI.addEventListener("click", addMatch)
resetMatchEI.addEventListener("click", resetMatch)