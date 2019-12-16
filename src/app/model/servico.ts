export class Servico{
    id : string;
    nome: string;
    preco : string;
    desc : string;
    duracao: string;
    uid : string;
  imagem: any;
  categoria: any;

    setServico(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.preco = obj.preco;
        this.desc = obj.desc;
        this.duracao = obj.duracao;
    }

}