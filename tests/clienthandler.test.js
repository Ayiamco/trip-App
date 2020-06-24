import { addList } from '../src/client/js/clientHandler.js'

test("properly adds two numbers",()=>{
    expect(addList()).toBe('finished')
})
