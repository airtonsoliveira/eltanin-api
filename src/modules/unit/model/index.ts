import { dbContext } from "@shared/database/DbContext";
import { UnitRepo } from "./UnitRepo";

const unitRepo = new UnitRepo(dbContext)

export {
    unitRepo
}