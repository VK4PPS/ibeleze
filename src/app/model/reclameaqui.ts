export class Reclameaqui{
  id : string;
  nome : string;
  atuacao : string;
  satisfacao : string;
  sugestao : string;
  email : string;
  nota : string;

  
  setreclameaqui(obj : any, id : any){
      this.id = id;
      this.nome = obj.nome;
      this.atuacao = obj.atuacao;
      this.satisfacao = obj.satisfacao;
      this.sugestao = obj.sugestao;
      this.email = obj.email;
      this.nota = obj.nota;
  }
}