import { ADD_TODO, CHANGE_STATUS, DELETE_TODO } from '../types';

const initialState = {
    todoArray: []
}


export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            const { goal } = action.payload;
            const { value } = action.payload;
            const { status } = action.payload;
            for (let i = 0; i < 1; i++) {
                state.todoArray.push({ id: Date.now(), goal: goal, category: value, isCompleted: status.toString() })
            }
            console.log(state.todoArray, 'todoArray')
            return {
                ...state,
                todoArray: [...state.todoArray]
            }
        case CHANGE_STATUS:
            const { status1 } = action.payload;
            const { id } = action.payload;
            console.log(id,'id in change status')

            for (let y = 0; y < state.todoArray.length; y++) {
                if (state.todoArray[y].id == id) {
                    state.todoArray[y].isCompleted = status1.toString();
                    break;
                }else{
                    console.log('id doesnot match')
                }
            }
            return {
                ...state,
                todoArray: [...state.todoArray]
            }
        case DELETE_TODO:
            const {id1} = action.payload;
            const filteredData = state.todoArray.filter((item)=>{
                return item.id != id1
            })
            return {
                ...state,
                todoArray:filteredData
            }

        default:
            return {
                ...state
            }
    }
}