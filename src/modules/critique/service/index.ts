import { dbContext } from "@shared/database/DbContext";

import GetCritiqueEvaluateService from "./GetCritiqueEvaluateService";

const getCritiqueEvaluateService = new GetCritiqueEvaluateService(dbContext)

export {
    getCritiqueEvaluateService
}