import { dbContext } from "../../../shared/database/DbContext";
import { UserRepo } from "./UserRepo";

const userRepo = new UserRepo(dbContext)

export {
    userRepo
}