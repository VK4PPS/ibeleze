export class Servico{
    id : string;
    nome: string;
    preco : string;
    descricao : string;
    categoria: string;
    duracao: string;

    setServico(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.preco = obj.preco;
        this.descricao = obj.descricao;
        this.categoria = obj.categoria;
        this.duracao = obj.duracao;

    }

}