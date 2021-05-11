const List = [];

const add = function (res) {
    console.log(res);
    // List.push({
    //     name: res.value,
    //     show: false,
    //     id: List.length + 1,
    // });

    return List;
};
const remove = function (res) {
    const n = List.findIndex((index) => index.id === res.id);
    List.splice(n, 1);
    return List;
};
const change = function (res) {
    const data = List.find((index) => index.id === res.id);
    data.name = res.value;
    return List;
};

// const getTodoList = function (res) {
//     return JSON.parse(JSON.stringify(res.data));
// };

export function todoList(state = List, action) {
    let arr = [];
    switch (action.type) {
        case "addTodoList":
            arr = add(action);
            break;
        case "REMOVETODO":
            arr = remove(action.data);
            break;
        case "CHANGETODO":
            arr = change(action.data);
            break;
        case "setTodoList":
            arr = action.data;
            break;
        case "initTodoList":
            arr = action.data;
            break;
        default:
            arr = state;
            break;
    }
    return [...arr];
}
