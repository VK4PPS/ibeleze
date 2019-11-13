export class Chamados{
    id : string;
    data : string;
    idFuncionario : string;
    nomeEquipamento : string;
    defeito : string;


    setChamados(obj : any, id : any){
        this.id = id;
        this.data = obj.data;
        this.idFuncionario = obj.idFuncionario;
        this.nomeEquipamento = obj.nomeEquipamento;
        this.defeito = obj.defeito;
    }
}
