export class ULocation{
    id : string;
    uLatitude : number;
    uLongitude : number;
    nome : string;
    servicos : string;

    


    

    setLocation(obj : any, id : any){
        this.id = id;
        this.uLatitude = obj.uLatitude;
        this.uLongitude = obj.uLongitude;
        this.nome = obj.nome;
        this.servicos = obj.servicos
    }
}