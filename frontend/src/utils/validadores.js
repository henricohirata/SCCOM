/**
 * Valida um número de CPF.
 * @param {string} cpf - O CPF a ser validado (com ou sem formatação).
 * @returns {boolean} True se for válido, False se inválido.
 */
export function validarCPF(cpf) {
    if (!cpf) return false;
    // Remove tudo que não é dígito
    const cleanCPF = cpf.replace(/[^\d]+/g, '');

    if (cleanCPF.length !== 11 || /^(\d)\1+$/.test(cleanCPF)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) 
        soma += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cleanCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) 
        soma += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    
    return resto === parseInt(cleanCPF.substring(10, 11));
}

/**
 * Valida um número de CNPJ.
 * @param {string} cnpj - O CNPJ a ser validado.
 * @returns {boolean} True se for válido.
 */
export function validarCNPJ(cnpj) {
    if (!cnpj) return false;
    const cleanCNPJ = cnpj.replace(/[^\d]+/g, '');

    if (cleanCNPJ.length !== 14 || /^(\d)\1+$/.test(cleanCNPJ)) return false;

    let tamanho = cleanCNPJ.length - 2;
    let numeros = cleanCNPJ.substring(0, tamanho);
    let digitos = cleanCNPJ.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cleanCNPJ.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === parseInt(digitos.charAt(1));
}

/**
 * Utilitário extra: Remove formatação de documentos.
 * Útil para garantir que sempre enviamos apenas números para a API.
 */
export function limparDocumento(doc) {
    return doc ? doc.replace(/\D/g, '') : '';
}