export class Perfil{
    id : string;
    nome : string;
    email : string;
  pagamento: any;
  favoritos: any;
  endereco: any;
  carteira: any;
  cupons: any;
  notificacoes: any;
  servico: any;

    setPerfil(obj : any, id : any){
        this.id = id;
        this.pagamento = obj.pagamento;
        this.favoritos = obj.favoritos;
        this.endereco = obj.endereco;
        this.carteira = obj.carteira;
        this.cupons = obj.cupons;
        this.notificacoes = obj.notificacoes;
        this.servico = obj.servico;


    }
}