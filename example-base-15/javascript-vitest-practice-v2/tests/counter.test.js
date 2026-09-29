import {beforeEach,describe,expect,it} from "vitest"; import {Counter} from "../src/counter.js";
describe("Counter",()=>{let c;beforeEach(()=>c=new Counter(10));it("initializes",()=>expect(c.getValue()).toBe(10));it("increments",()=>expect(c.increment()).toBe(11));it("decrements",()=>expect(c.decrement()).toBe(9));it("resets",()=>{c.increment();c.reset();expect(c.getValue()).toBe(0)})});
