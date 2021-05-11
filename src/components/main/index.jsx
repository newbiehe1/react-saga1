import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

const Temp = function () {
    const list = useSelector((state) => state.todoList);

    const dispatch = useDispatch();
    const inputEl = useRef(null);
    const liIpt = useRef({});
    // 初始化todoList
    useEffect(() => {
        dispatch({
            type: "getTodoList",
        });
        return () => {};
    }, [dispatch]);
    // 反选item
    const toggleItem = function (data) {
        dispatch({
            type: "toggleItem",
            data: JSON.parse(JSON.stringify(data)),
        });
    };
    // 反选输入框
    const toggleInput = function (res) {
        dispatch({
            type: "toggleInput",
            data: JSON.parse(JSON.stringify(res)),
        });
        setTimeout(() => {
            liIpt.current[res.id].focus();
        });
    };

    // 新增todoList
    function addTodoList() {
        if (inputEl.current.value) {
            dispatch({
                type: "add",
                data: {
                    value: inputEl.current.value,
                },
            });
            inputEl.current.value = "";
        } else {
            alert("请输入内容");
        }
    }

    // 获取文本框的值
    function getInputValue(e) {
        dispatch({
            type: "setInputValue",
            data: {
                value: e.target.value,
            },
        });
        e.target.value = "";
    }

    const tableContent = list.map((index) => {
        return (
            <ul key={index.id}>
                <li
                    onClick={() => {
                        toggleItem(index);
                    }}
                    className={
                        "component_main__check" +
                        (index.show
                            ? " component_main__active"
                            : " component_main__inactive")
                    }></li>
                <li className="component_main__tableText">
                    <input
                        type="text"
                        style={index.ipt ? {} : { display: "none" }}
                        ref={(item) => {
                            liIpt.current[index.id] = item;
                        }}
                        onClick={(e) => e.stopPropagation()}
                        onBlur={(e) => {
                            getInputValue(e);
                        }}
                        onKeyDown={(e) => {
                            if (
                                e.keyCode === 13 ||
                                e.code.indexOf("Enter") >= 0
                            ) {
                                getInputValue(e);
                            }
                        }}
                    />
                    <div
                        style={index.ipt ? { display: "none" } : {}}
                        onClick={(e) => e.stopPropagation()}
                        onDoubleClick={() => {
                            toggleInput(index);
                        }}>
                        {index.name}
                    </div>
                </li>
            </ul>
        );
    });

    return (
        <div className="component_main__wrap">
            <div className="component_main__tableRequirement">
                <input
                    type="text"
                    placeholder="请输入新增内容"
                    ref={inputEl}
                    onKeyDown={(e) => {
                        if (e.keyCode === 13 || e.code.indexOf("Enter") >= 0) {
                            addTodoList();
                        }
                    }}
                />
                <button className={"component_main__add"} onClick={addTodoList}>
                    添加
                </button>
                <button
                    className={"component_main__remove"}
                    onClick={() =>
                        dispatch({
                            type: "remove",
                            data: null,
                        })
                    }>
                    删除
                </button>
            </div>
            <div className="component_main__tableContent">{tableContent}</div>
        </div>
    );
};
export default Temp;
