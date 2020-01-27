export default function fun(): void {
    /**
     * 函数总结
     */

    // 函数定义
    // 1
    function add1(x: number, y: number): void {
        console.log(x + y);
    }

    // add1(1, 2);

    // 2 （两种写法等价）
    let add2: (x: number, y: number) => void;
    add2 = function (a, b) {
        console.log(a + b);
    };
    // add2(2, 3);
    // let add2: (x: number, y: number) => number = function (x: number, y: number): void {
    //     console.log(a + b);
    // };

    // 3
    type add3 = (x: number, y: number) => void;
    const add3_func: add3 = (a, b) => {
        console.log(a + b);
    };
    // add3_func(1, 9);

    // 4
    interface add4 {
        (x: number, y: number): void;
    }

    let add4_func: add4 = (a, b) => {
        console.log(a + b);
    };
    // add4_func(2, 9);

    // 可选参数
    // 1 （可选参数）
    function add5(a: number, b?: number): void {
        console.log(b ? a + b : a);
    }

    // add5(1, 8);

    // 2
    function add6(x: number, y = 1, z: number): void {
        console.log(x + y + z);
    }

    // add6(1, 1, 3);  // y 只能传入number / undefined

    // 7 （剩余参数：参数数量不确定）
    function add7(x: number, ...rest: number[]): void {
        console.log(x + rest.reduce((acc, curr) => acc + curr));
    }

    // add7(1, 2, 3, 4, 5);

    // 函数  this
    interface Card {
        suit: string;
        card: number;
    }

    interface Deck {
        suits: string[];
        cards: number[];

        createCardPicker(this: Deck): () => Card;
    }

    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function (this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    };

    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();

    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}