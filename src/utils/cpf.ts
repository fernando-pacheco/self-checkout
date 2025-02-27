function removeCPFPunctuation(cpf: string) {
    return cpf.replace(/[\.\-]/g, "")
}

function isValidCPF(cpf: string): boolean {
    const formatCPF = cpf.replace(/\D/g, "")

    if (formatCPF.length !== 11) {
        return false
    }

    if (/^(\d)\1+$/.test(formatCPF)) {
        return false
    }

    let sum = 0
    for (let i = 0; i < 9; i++) {
        sum += Number.parseInt(formatCPF.charAt(i)) * (10 - i)
    }
    let firstVerifier = (sum * 10) % 11
    firstVerifier = firstVerifier === 10 ? 0 : firstVerifier

    if (firstVerifier !== Number.parseInt(formatCPF.charAt(9))) {
        return false
    }

    sum = 0
    for (let i = 0; i < 10; i++) {
        sum += Number.parseInt(formatCPF.charAt(i)) * (11 - i)
    }
    let secondVerifier = (sum * 10) % 11
    secondVerifier = secondVerifier === 10 ? 0 : secondVerifier

    return secondVerifier === Number.parseInt(formatCPF.charAt(10))
}

export { isValidCPF, removeCPFPunctuation }
