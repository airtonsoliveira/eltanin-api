import { Invoice } from "./Invoice";

export class InvoiceMapper {

    static toInsert(invoice: Invoice) {
        return [
            invoice.referenceMonth,
            invoice.dueDate,
            invoice.issueDate,
            invoice.value,
            invoice.storedFile,
            invoice.userId,
            invoice.distributorId,
            invoice.unitId
        ]
    }

    static toUpdate(invoice: Invoice) {
        return [
            invoice.referenceMonth,
            invoice.dueDate,
            invoice.issueDate,
            invoice.value,
            invoice.storedFile,
            invoice.distributorId,
            invoice.unitId
        ]
    }

    static toDomain(data: any) {
        return Invoice.create({
            referenceMonth: data?.nu_mes_referencia,
            dueDate: data?.dt_vencimento,
            issueDate: data?.dt_emissao,
            value: data?.nu_valor,
            storedFile: data?.tx_arquivo_armazenado,
            userId: data?.id_usuario,
            distributorId: data?.id_distribuidora,
            unitId: data?.id_unidade,
            items: data?.itens_fatura || [],
            file: data?.file
        },
            data?.id_fatura)
    }
}