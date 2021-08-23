import {ADD_TODO,DELETE_TODO,CHANGE_STATUS} from '../types';

export const addTodo = (goal,value,status) => {
    return ({
        type:ADD_TODO,
        payload:{goal,value,status}
    })
}

export const statusChange = (status,id) => {
    const status1 = status;
    return({
        type:CHANGE_STATUS,
        payload:{status1,id}
    })
}

export const filterTodo = (id) => {
    const id1 = id;
    return ({
        type:DELETE_TODO,
        payload:{id1}
    })
} 