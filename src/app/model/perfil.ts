export class Perfil{
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    uLongitude: number;
    uLatitude: number;


    setPerfil(obj: any){
        this.nome = obj.nome;
        this.sobrenome = obj.sobrenome;
        this.email = obj.email;
        this.telefone = obj.telefone;
        this.uLongitude = obj.uLongitude;
        this.uLatitude = obj.uLatitude;
    }
}