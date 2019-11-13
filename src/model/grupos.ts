export class Grupos{
    id : string;
    nome : string;
    horas : string;
    horasPorAula : string;
    idPessoa : string;


    setGrupos(obj : any, id : any){
        this.id = id;
        this.nome = obj.nome;
        this.horas = obj.horas;
        this.horasPorAula = obj.horasPorAula;
        this.idPessoa = obj.idPessoa;
    }
}