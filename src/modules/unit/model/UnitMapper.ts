import { Unit } from "./Unit";

export class UnitMapper {

    static toInsert(unit: Unit) {
        return [
            unit.name,
            unit.zipCode,
            unit.street,
            unit.number,
            unit.neighborhood,
            unit.complement,
            unit.userId,
            unit.credits,
            unit.code
        ]
    }

    static toUpdate(unit: Unit) {
        return [
            unit.name,
            unit.zipCode,
            unit.street,
            unit.number,
            unit.neighborhood,
            unit.complement,
            unit.credits,
            unit.code
        ]
    }

    static toDomain(data: any) {
        return Unit.create({
            name: data.nome,
            zipCode: data.nu_cep,
            street: data.tx_logradouro,
            number: data.tx_numero,
            neighborhood: data.tx_bairro,
            complement: data.tx_complemento,
            userId: data.id_usuario,
            credits: data.nu_creditos,
            code: data.cd_instalacao
        },
            data.id_unidade)
    }
}