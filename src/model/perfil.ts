export class Perfil{
    id : string;
    nome : string;
    email : string;
    uid : string;

    setPerfil(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.email = obj.email;
        this.uid = obj.uid;

    }
}