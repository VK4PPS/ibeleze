export class Produtos {
    id: string;
    nome: string;
    descricao: string;
    tamanho : string;
    estoque: string;
    preco: string;
    categoria: string;
    imagem: string;
    
    setProdutos(obj: any, id:any) {
        this.id = id;
        this.nome = obj.nome;
        this.tamanho = obj.tamanho;
        this.descricao = obj.descricao;
        this.estoque = obj.estoque;
        this.preco = obj.preco;
        this.categoria = obj.categoria;
        this.imagem = obj.imagem;
}
}
