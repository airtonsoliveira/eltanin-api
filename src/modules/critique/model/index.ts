import { dbContext } from "@shared/database/DbContext";
import { CritiqueRepo } from "./CritiqueRepo";

const critiqueRepo = new CritiqueRepo(dbContext)

export {
    critiqueRepo
}