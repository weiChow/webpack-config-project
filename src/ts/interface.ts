export default function ifFunc(): void {
    /**
     * 普通类型接口
     */
    interface List {
        readonly id: number;
        name: string;
        age?: string;

        [x: string]: any;
    }

    interface Result {
        data: List[]
    }

    function render(result: Result): void {
        result.data.forEach((value) => {
            console.log(value.id, value.name);
            if (value.age) {
                console.log(value.age);
            }
        })
    }

    // render({
    //     data: [
    //         {
    //             id: 1,
    //             name: "a",
    //             sex: "m",
    //             age: "18"
    //         },
    //         {
    //             id: 2,
    //             name: "b",
    //             sex: "f"
    //         }
    //     ]
    // });

    // 数字索引
    interface stringArray {
        [index: number]: string
    }

    let char: stringArray = ["A", "B"];
    // console.log(char[0]);

    // 字符串索引
    interface Names {
        [key: string]: string;

        [numberKey: number]: string;    // 数字索引类型需为字符串索引的子类型（JS会做隐式转换）比如：obj[0] === obj["0"]
    }

    let obj: Names = {
        0: "1"
    };

    /**
     * 函数类型接口 （接口定义函数的方式）
     */
        // 方式1
    let Add_1: (x: number, y: number) => number;
    Add_1 = function (a, b) {
        return a + b;
    };
    // console.log(Add_1(1, 10));

    // 方式2
    interface Add_2 {
        (x: number, y: number): number;
    }

    let add2_func: Add_2 = function(a, b) {
        return a + b;
    };
    // console.log(add2_func(1, 10));

    // 方式3
    type Add_3 = (x: number, y: number) => number;

    const add_func: Add_3 = function (x, y) {
        return x + y;
    };

    const add_arrowFunc: Add_3 = (x, y) => x + y;

    // console.log(add_arrowFunc(1, 2));

    /**
     * 混合类型接口
     */

    /*例子 1*/
    interface Counter {
        (start: number): string;

        interval: number;

        reset(): void;
    }

    // 创建多个counter,需使用函数封装,将其定义在一个getCounter函数中,返回counter,这样就可以创建多个实例
    function getCounter(): Counter {
        let counter = <Counter>function (start: number) {
        };
        counter.interval = 123;
        counter.reset = function () {
        };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;

    /*例子 2*/
    interface Face {
        (a: number, b: number): number;

        id: number;

        reset(): boolean;
    }

    let face: Face = ((x, y) => x + y) as Face;
    face.id = 1;
    face.reset = () => {
        console.log(10);
        return true;
    };
}