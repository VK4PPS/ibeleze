export class Pessoas{
    id : string;
    nome : string;
    sobrenome : string;

    


    

    setPessoas(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
    }
}