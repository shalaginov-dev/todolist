import {todolistsReducer} from '../todolists-reducer';
import {v1} from 'uuid';
import {
    AddTodolistAC, SetTodolistEntityStatus,
    ChangeTodolistFilter,
    ChangeTodolistTitle,
    RemoveTodolistAC
} from "../../actions/todolist-actions";
import {ITodolist} from "../../types/todolist-types";

let todolistId1: string
let todolistId2: string
let startState: ITodolist[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    startState = [
        {
            addedDate: '',
            order: 0,
            id: todolistId1,
            title: 'What to learn',
            filter: 'all',
            entityStatus: 'idle',
        },
        {
            addedDate: '',
            order: 0,
            id: todolistId2,
            title: 'What to buy',
            filter: 'all',
            entityStatus: 'idle',
        }
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    const endState = todolistsReducer(startState, AddTodolistAC('todolistId3',"New Todolist"))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe("New Todolist")
});

test('correct todolist should change its name', () => {
    const endState = todolistsReducer(startState, ChangeTodolistTitle(todolistId2, "New Todolist"));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe("New Todolist");
});

test('correct filter of todolist should be changed', () => {
    const endState = todolistsReducer(startState, ChangeTodolistFilter(todolistId2, "completed"));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe("completed");
});

test('correct entity status of todolist should be changed', () => {
    const endState = todolistsReducer(startState, SetTodolistEntityStatus(todolistId2, "loading"));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe("loading");
});
