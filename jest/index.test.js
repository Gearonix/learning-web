const { func, toBeNull, generateArr , makeRequest} = require("./index");
const axios = require('axios')
describe("describe text:", () => {
    test("test text 2 ", () => {
        expect(toBeNull()).not.toBeTruthy();
    });
});
describe("describe array:", () => {
    let array;

    beforeEach(() => {
        array = [1, 2, 3, 4];
    });

    test("test arrayGenedator", () => {
        expect(generateArr()).toHaveLength(4);
    });
    test("test arrayGenedator 2 ", () => {
        expect(generateArr()).toContain(1);
        expect(generateArr()).toContain(2);
        expect(generateArr()).toContain(3);
        expect(generateArr()).toContain(4);
        expect(generateArr()).toBeDefined();
        expect(generateArr()).toBeInstanceOf(Array);
    });
});
describe("describe axios",() => {
    test('test axios 1', async () => {
        // const response = await makeRequest()
        // const data = response.data
        // expect(data).toBeDefined()
        // expect(typeof data.status).toBe('number')
        // expect(data.status).toBe(500)
        // expect(data.message).toEqual('No cookie')
    })
})
describe('describe map',() => {
    let array;
    let fn;

    beforeEach(() => {
        array = [1,2,3,4]
        fn = jest.fn(x => x * 2)
    })
    test('test map',() => {
        array.map(fn)
        expect(fn).toBeCalled()
        expect(fn).toBeCalledTimes(4)
        console.log(fn.mock)
    })
})
