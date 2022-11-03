import { CritiqueRepo } from '../model/CritiqueRepo'
import { UseCase } from "../../../shared/UseCase";

export default class GetCritiqueUseCase implements UseCase<any, any> {
    constructor(private critiqueRepo: CritiqueRepo) {}

    async execute (): Promise<any> {
        const result = await this.critiqueRepo.getAll()

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