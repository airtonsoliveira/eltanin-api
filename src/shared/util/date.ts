export default {
    get_current_anomes: () => {
        const today = new Date()
        return 100*(today.getFullYear()) + (today.getMonth() + 1)
    },

    get_previous_anomes: () => {
        const today = new Date()
        if(today.getMonth() === 0) {
            return 100*(today.getFullYear() - 1) + 12
        }
        return 100*(today.getFullYear()) + today.getMonth()
    },

    get_anomes_from_interval: (nu_anomes: number, nn: number) => {
        let ano = Math.trunc(nu_anomes/100)
        let mes = nu_anomes-ano*100

        if (mes + nn < 1) {
            ano += Math.trunc((mes + nn - 12)/12)
        } else if (mes + nn > 12) {
            ano += Math.trunc((mes + nn - 1)/12)
        }

        const deslocamentoMes = nn%12
        if(mes + deslocamentoMes < 1) {
            mes += deslocamentoMes + 12
        } else if(mes + deslocamentoMes > 12) {
            mes += deslocamentoMes - 12
        } else {
            mes += deslocamentoMes
        }

        return 100*ano + mes
    }
}