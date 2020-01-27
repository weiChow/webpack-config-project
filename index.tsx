import type from "@/ts/type";
import ifFunc from "@/ts/interface";
import fun from "@/ts/function";


import React, {PureComponent} from "react";
import ReactDOM from "react-dom";

if (module.hot) {
    module.hot.accept();
}

// 类型
// type();

// 接口
// ifFunc();

// 函数使用方式
fun();


interface HelloProps {
    name: string;
}

class Hello extends PureComponent {
    constructor(public props: HelloProps) {
        super(props);
    }

    render() {
        const { name } = this.props;
        return (
            <h1>Hello, {name}</h1>
        );
    }
}

ReactDOM.render(<Hello name={"React & TypeScript 实践"} />, document.getElementById("root"));