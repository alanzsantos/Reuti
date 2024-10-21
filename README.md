! Variáveis para a validação do CPF
CPF    STRING(11)  ! CPF recebido sem formatação
Soma   LONG
Resto  BYTE
I      BYTE

! Verifica se o CPF possui 11 dígitos e se não é uma sequência repetida
IF LEN(CLIP(CPF)) <> 11 OR CPF = '00000000000' OR CPF = '11111111111' OR CPF = '22222222222' OR CPF = '33333333333' OR CPF = '44444444444' OR CPF = '55555555555' OR CPF = '66666666666' OR CPF = '77777777777' OR CPF = '88888888888' OR CPF = '99999999999'
    MESSAGE('CPF inválido!')
    RETURN
END

! Validação do primeiro dígito verificador
Soma = 0
FOR I = 1 TO 9
    Soma += VAL(SUB(CPF, I, 1)) * (11 - I)
END
Resto = (Soma * 10) % 11
IF Resto = 10 OR Resto = 11
    Resto = 0
END
IF Resto <> VAL(SUB(CPF, 10, 1))
    MESSAGE('CPF inválido!')
    RETURN
END

! Validação do segundo dígito verificador
Soma = 0
FOR I = 1 TO 10
    Soma += VAL(SUB(CPF, I, 1)) * (12 - I)
END
Resto = (Soma * 10) % 11
IF Resto = 10 OR Resto = 11
    Resto = 0
END
IF Resto <> VAL(SUB(CPF, 11, 1))
    MESSAGE('CPF inválido!')
    RETURN
END

! Se chegou até aqui, o CPF é válido
MESSAGE('CPF válido!')








# Reuti
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove tudo que não é número

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false; // CPF deve ter 11 dígitos e não pode ser uma sequência repetida
    }

    // Validação dos dígitos verificadores
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}



function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, ''); // Remove tudo que não é número

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
        return false; // CNPJ deve ter 14 dígitos e não pode ser uma sequência repetida
    }

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
}

