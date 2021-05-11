import { put, takeEvery, throttle, select } from "redux-saga/effects";
import rowData from "../components/data.json";

function* add({ data: { value } }) {
    const arr = yield select((state) => state.todoList);
    arr.push({
        id: arr.length + 1,
        name: value,
        show: false,
        ipt: false,
    });
    yield put({
        type: "setTodoList",
        data: arr,
    });
}
function* remove() {
    const arr = yield select((state) => state.todoList);
    const selectList = arr.filter((index) => index.show);
    if (selectList.length > 0) {
        selectList.forEach((index) => {
            const n = arr.findIndex((item) => item.show);
            arr.splice(n, 1);
        });
        arr.forEach((index, n) => (index.id = n + 1));
    } else {
        alert("请选择要删除的内容");
    }
    yield put({
        type: "setTodoList",
        data: arr,
    });
}

function* toggleInput({ data: { id } }) {
    const arr = yield select((state) => state.todoList);
    const data = arr.find((index) => index.id === id);
    if (data) {
        data.ipt = !data.ipt;
        yield put({
            type: "setTodoList",
            data: arr,
        });
    }
}

function* toggleItem({ data: { id } }) {
    const arr = yield select((state) => state.todoList);
    const data = arr.find((index) => index.id === id);
    if (data) {
        data.show = !data.show;
        yield put({
            type: "setTodoList",
            data: arr,
        });
    }
}

function* getTodoList() {
    const List = rowData.map((index) => {
        const item = JSON.parse(JSON.stringify(index));
        item.show = false;
        item.ipt = false;
        return item;
    });
    yield put({
        type: "initTodoList",
        data: List,
    });
}

function* setInputValue({ data: { value } }) {
    const arr = yield select((state) => state.todoList);
    const data = arr.find((index) => index.ipt);
    if (data) {
        if (value) {
            data.name = value;
        }
        data.ipt = !data.ipt;
        yield put({
            type: "setTodoList",
            data: arr,
        });
    }
}
export default function* allSagas(res) {
    console.log(res);
    // 模拟axios  请求
    yield takeEvery("getTodoList", getTodoList);

    yield throttle(1000, "add", add);

    yield throttle(1000, "remove", remove);
    yield takeEvery("toggleItem", toggleItem);
    yield takeEvery("toggleInput", toggleInput);
    yield takeEvery("setInputValue", setInputValue);
}
