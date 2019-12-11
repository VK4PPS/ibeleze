export class PerfilPro{
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    uLongitude: number;
    uLatitude: number;
    qualificacoes: string;
    descricao: string;


    setPerfilPro(obj: any){
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.uLongitude = obj.uLongitude;
        this.uLatitude = obj.uLatitude;
        this.qualificacoes = obj.qualificacoes;
        this.descricao = obj.descricao;
    }
}