module.exports={
async verifica_nulos(n_pedido, nome, bairro, hora, data, vendedor){
    if (!n_pedido ||!nome ||bairro ||hora ||!data ||!vendedor){
        return false
    }
    else{
        return true
    }
}
}