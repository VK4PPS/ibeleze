export class ULocation{
    id : string;
    uLatitude : number;
    uLongitude : number;


    


    

    setLocation(obj : any, id : any){
        this.id = id;
        this.uLatitude = obj.uLatitude;
        this.uLongitude = obj.uLongitude;
    }
}