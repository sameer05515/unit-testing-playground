import {describe,expect,it,vi} from "vitest";
const mockedLogger={logInfo:vi.fn(),logError:vi.fn()};
vi.mock("../src/logger.js",()=>mockedLogger);
describe("module mocking",()=>{it("mocks imported module",async()=>{const logger=await import("../src/logger.js");logger.logInfo("Hello");expect(mockedLogger.logInfo).toHaveBeenCalledWith("Hello")})});
