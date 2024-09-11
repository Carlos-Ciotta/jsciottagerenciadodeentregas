//const URL = 'http://localhost:3000';
const URL = 'https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com';
function resetCampos() {
  let allradiobuttons = document.querySelectorAll('.radio-group');
  document.getElementById("id_input").value = "";
  document.getElementById("nome_input").value = "";
  document.getElementById("observacao_input").value = "";
  document.getElementById("cmbOpcoes").selectedIndex = 0;
  allradiobuttons.forEach(value => value.checked = false);
  document.getElementById("datePicker").value = "";
}
function resetCampos_a() {
  let allradiobuttons = document.querySelectorAll('.radio-group');
  document.getElementById("id_input_a").value = "";
  document.getElementById("nome_input_a").value = "";
  document.getElementById("observacao_input_a").value = "";
  document.getElementById("cmbOpcoes_a").selectedIndex = 0;
  allradiobuttons.forEach(value => value.checked = false);
  document.getElementById("datePicker_a").value = "";
}

function abrirPopup() {
  // Exibe o pop-up e o overlay
  document.getElementById('popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function fecharPopup() {
  // Oculta o pop-up e o overlay
  resetCampos_a();
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function ordenarOptions() {
  var select = document.getElementById('cmbOpcoes');
  var options = Array.from(select.options);

  // Manter a opção com índice 0 (Selecione o Bairro) fixa
  var opcaoSelecionar = options.shift();
  options.sort(function (a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });

  // Remover todas as opções do select
  select.innerHTML = '';

  // Adicionar a opção "Selecione o Bairro" de volta
  select.add(opcaoSelecionar);

  // Adicionar as opções ordenadas de volta ao select
  options.forEach(function (option) {
      select.add(option);
  });
}

function atualizarLabels() {
  document.getElementById("labelDiv2_1").innerText = "1";
  document.getElementById("labelDiv2_2").innerText = "1";
  document.getElementById("labelDiv3_1").innerText = "2";
  document.getElementById("labelDiv3_2").innerText = "2";
}

function formatarDataPost(data) {
  const partesData = data.split("-");
  if (partesData.length === 3) {
      // Inverte as partes da data e as une com "-"
      return `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
  }
  // Retorna a data original se não estiver no formato esperado
  return data;
}

function formatarData() {
  const datePicker = document.getElementById('datePicker');
  const dataSelecionada = datePicker.value;

  if (dataSelecionada) {
      const partesData = dataSelecionada.split('-');
      const dataFormatada = `${partesData[2]}/${partesData[1]}/${partesData[0]}`;

      datePicker.value = dataFormatada;
  }
}

function preencherLinhasTabela(tbody, listaDados) {
  listaDados.forEach(dados => {
  const row = tbody.insertRow();
  Object.values(dados).forEach(value => {
      const cell = row.insertCell();
      cell.textContent = value;
  });
});
}

function getEntregasFilter(){
  const tabelaBody = document.getElementById("tabelaBody");
  tabelaBody.innerHTML = ''
  axios.get('https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/getusuario/usuario')
  .then(response => {
    const dados = response.data;
    preencherLinhasTabela(tabelaBody, dados);
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });
}

function getEntregaByIdbtn(){
  const id_entrega= document.getElementById("id_input_a").value;
  const id = document.getElementById('id_input_a');
  axios.get(`https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/${id_entrega}`)
  .then(response => {
    const dados = response.data;
    if(dados.situacao == "Aguardando"){
      preencherInput(dados);
      id.disabled = true;
    }else{
      alert("Não é possível alterar essa entrega. Entrega já está em andamento")
    }
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });
}
function preencherInput(dados){
  
  document.getElementById("nome_input_a").value = dados.nome_cliente;
  document.getElementById("observacao_input_a").value = dados.observacao;
  document.getElementById("datePicker_a").value = dados.data_entrega.split("T")[0];
  const radioButtons = document.querySelectorAll('input[type="radio"][name="opcaoRadio1_a"]');
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].value === dados.hora_entrega) {
       radioButtons[i].checked = true;
    }
  }
  const radioButtons1 = document.querySelectorAll('input[type="radio"][name="opcaoRadio_a"]');
  for (let i = 0; i < radioButtons1.length; i++) {
    if (radioButtons1[i].value === dados.vendedor) {
       radioButtons1[i].checked = true;
    }
  }
  document.getElementById("cmbOpcoes_a").value = dados.bairro;
}
function postEntregas(){
  const id_entrega = document.getElementById('id_input').value;
  const nome_cliente = document.getElementById('nome_input').value;
  const bairro = document.getElementById('cmbOpcoes').value;
  const datePickerValue = document.getElementById('datePicker').value;
  const hora_entrega = document.querySelector("input[name=opcaoRadio1]:checked")?.value;
  const observacao = document.getElementById('observacao_input').value;
  const vendedor = document.querySelector("input[name=opcaoRadio]:checked")?.value;
  
  // Verificar se os campos estão vazios
  if (!id_entrega ) {
    alert('Preencha o número de pedido apenas com números');
  }
  else if(!nome_cliente){
    alert("Preencha o nome do cliente");
  }
  else if(bairro == 'Selecione o Bairro'){
    alert("Selecione um bairro");
  }
  else if(!datePickerValue){
    alert("Selecione uma data de entrega");
  }
  else if(!hora_entrega){
    alert("Selecione o horario de entrega");
  }
  else if(!vendedor){
    alert("Selecione o vendedor");
  } else {
    // Formatar a data de entrega
    const data_entrega = formatarDataPost(datePickerValue);
  
    // Criar o objeto dadosEntrega
    const dadosEntrega = {
      id_entrega: id_entrega,
      nome_cliente: nome_cliente,
      bairro: bairro,
      situacao: "Aguardando",
      data_entrega: data_entrega,
      hora_entrega: hora_entrega,
      observacao: observacao,
      vendedor: vendedor,
      id_veiculo: 0
    };
    // Enviar a requisição POST usando axios
    axios.post('https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas', dadosEntrega)
    .then(response => {
        getEntregasFilter();
        resetCampos();
        alert("Entrega Enviada !")
      })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
  }
}

function atualizarEntrega(){
  const id_entrega= document.getElementById('id_input_a').value;
  const dadosEntrega = {
    nome_cliente: document.getElementById('nome_input_a').value,
    bairro: document.getElementById('cmbOpcoes_a').value,
    situacao: "Aguardando",
    data_entrega: formatarDataPost(document.getElementById('datePicker_a').value),
    hora_entrega: document.querySelector("input[name=opcaoRadio1_a]:checked").value,
    observacao: document.getElementById('observacao_input_a').value,
    vendedor: document.querySelector("input[name=opcaoRadio_a]:checked").value,
  };
  
  if(dadosEntrega.data_entrega.length == 0){
    alert("Preencha a Data")
  }else{
    axios.put(`https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/${id_entrega}`, dadosEntrega)
    .then(response => {
        alert("Entrega Alterada !")
        resetCampos_a();
        fecharPopup();
        getEntregasFilter();
      })
    .catch(error => {
      alert('Erro ao enviar dados:', error);
       // Lógica adicional para lidar com erros, se necessário
    });
  }
  
}