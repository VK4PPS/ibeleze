export class PessoaGrupo{
    id : string;
    nome : string;
    email : string;
    idGrupo : string;
    idPessoa : string;
    horas : string;
    
    setPessoaGrupo(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.idGrupo = obj.idGrupo;
        this.idPessoa = obj.idPessoa;
        this.horas = obj.horas;

    }
}