function verificainput(id_entrega, nome_cliente, bairro, datePickerValue, hora_entrega, vendedor){
    const flag = 1
    if (!id_entrega || !Number.isInteger(id_entrega)) {
    alert('Preencha o número de pedido apenas com números');
    flag = 0;
  }
  else if(!nome_cliente){
    alert("Preencha o nome do cliente");
    flag = 0;
  }
  else if(bairro == 'Selecione o Bairro'){
    alert("Selecione um bairro");
    flag = 0;
  }
  else if(!datePickerValue){
    alert("Selecione uma data de entrega");
    flag = 0;
  }
  else if(!hora_entrega){
    alert("Selecione o horario de entrega");
    flag = 0;
  }
  else if(!vendedor){
    alert("Selecione o vendedor");
    flag = 0;
}
return flag
}
module.exports = verificainput;