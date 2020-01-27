export default function type(): void {
    /**
     * 数字
     */
    let count: number = 1;
// console.log(count);

    /**
     * 布尔值
     */
    let isDone: boolean = false;
// console.log(isDone);

    /**
     * 字符串
     */
    const charts: string = "bob";
// console.log(charts);

    /**
     * 数组
     */
    const list_one: number[] = [1, 2, 3];
// console.log(list_one);
    const list_two: Array<number | string> = [4, 5, 6, "a"];
// console.log(list_two);
    const list_three: string[] = ["a", "b"];
// console.log(list_three);

    /**
     * 元组
     */
    const tuple: [string, number] = ["tuple", 1];
// console.log(tuple);

    /**
     * 枚举
     */

// 数字枚举（生成反向映射）
    enum Color {Red, Green, Blue}

// console.log(Color);
    let c: Color = Color.Green;
// console.log(c);
// console.log(Color[4]);

// 字符串枚举 （不生成反向映射）
    enum Message {
        success = "success！",
        failed = "failed!"
    }

// console.log(Message);

// 异构枚举 （易混淆 不建议使用）
    enum Answer {
        n,
        a = "124",
        s = "s"
    }

// console.log(Answer);

// 枚举成员（只读）
    enum char {
        // const（常量成员 编译是计算）
        a,
        b = a + 1,
        c = 1 + 3,
        // computed（计算成员 运行时计算）
        d = Math.random(),
        e = [1, 2, 3].length
    }

// console.log(char);

// 常量枚举 （不会编译出代码）
    const enum Month {
        Jan,
        Feb,
        Mar
    }

    let month: number[] = [Month.Jan, Month.Feb, Month.Mar];
    // console.log(month);

// 枚举类型
    enum E {a, b}

    enum F {a = 0, b = 1}

    let eE: E = 2;
    let fF: F = 2;
// console.log(eE === fF); // error

    /**
     * symbol
     */
    let single: symbol = Symbol("a");
// console.log(single);

    /**
     * Any
     */
    let notSure: any = 4;
    notSure = "maybe a string instead";
    notSure = false;

// console.log(notSure);

    /**
     * Void
     */
    function warnUser(): void {
        console.log("This is my warning message!!!");
    }

    const func = (): void => {
        console.log("This is void!!!");
    };

// warnUser();
// func();

    let unusable: void = undefined;

// console.log(unusable);

    /**
     * Never
     */
// 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

// error("错误！");

// 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }

// fail();

// 返回never的函数必须存在无法达到的终点
// function infiniteLoop(): never {
//     while (true) {
//     }
// }

    /**
     * object
     */
// declare function create(o: object | null): void;

// create({ prop: 0 }); // OK
// create(null); // OK

    /**
     * 类型断言
     */
    let someValue: any = "this is a string";
    let strLengthA: number = (<string>someValue).length;
    let strLengthB: number = (someValue as string).length;
// console.log(strLengthA);
// console.log(strLengthB);

    /**
     * 使用对象
     */
    let obj = {
        a: 1,
        b: 2
    };
// console.log(obj);
    let {a, b}: { a: number, b: number } = obj; // 等价与let {a, b} = obj;
// console.log(a, b);
    let newObj: { a: number, b: number } = obj;
// console.log(newObj);

    /**
     * 函数声明
     */
    type C = { a: string, b?: number }; // 类型可直接写在下方C位置
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let {a, b = 1001} = wholeObject;    // 默认值
        console.log(a, b);
    }

// keepWholeObject({a: "abc", b: 999});

    function f({a = "", b = 0} = {a: ""}): void {
        console.log(a, b);
    }

// f({a: "mike"});
}