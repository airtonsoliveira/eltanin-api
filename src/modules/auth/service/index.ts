import SignService from "./SignService";
import SignCheckService from "./SignCheckService";

const signService = new SignService()
const signCheckService = new SignCheckService()

export {
    signService,
    signCheckService
}