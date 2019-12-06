export class Perfil{
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    servico: string;
    uLongitude: number;
    uLatitude: number;
    profissional: boolean;

    setPerfil(obj: any){
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.servico = obj.servico;
        this.uLongitude = obj.uLongitude;
        this.uLatitude = obj.uLatitude;
        this.profissional = obj.profissional;
    }
}