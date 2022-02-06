export interface estado {
    id: number;
    sigla: string;
    nome: string;
}

export interface endereco {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
    erro: boolean;
}
