import { dbContext } from "../../../shared/database/DbContext";
import { DistributorRepo } from "./DistributorRepo";

const distributorRepo = new DistributorRepo(dbContext)

export {
    distributorRepo
}