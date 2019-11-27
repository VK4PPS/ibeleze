export class Mensagens{
    id : string;
    nome : string;
    assunto : string;
    email : string;
    telefone : string;
    cidade: string;
    mensagem: string;


    setMensagem(obj : any, id : any){
        this.id = id;
        this.nome = obj.name;
        this.assunto = obj.assunto;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.cidade = obj.cidade;
        this.mensagem = obj.mensagem;
    }
}