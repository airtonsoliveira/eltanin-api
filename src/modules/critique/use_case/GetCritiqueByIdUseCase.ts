import { CritiqueRepo } from '../model/CritiqueRepo'
import { UseCase } from "@shared/UseCase";

export default class GetCritiqueByIdUseCase implements UseCase<any, any> {
    constructor(private critiqueRepo: CritiqueRepo) {}

    async execute (idCritique: string): Promise<any> {
        const result = await this.critiqueRepo.getById(idCritique)

        return result.map((critique: any) => {
            return {
                id: critique.id_critica,
                name: critique.nome,
                description: critique.tx_descricao,
                formula: critique.tx_formula,
                requirements: critique.tx_requisitos
            }
        })
    }
}