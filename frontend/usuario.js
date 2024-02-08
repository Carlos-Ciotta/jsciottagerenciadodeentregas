function verifica_nulos(n_pedido, nome, bairro, hora, data, vendedor){
  if (!n_pedido ||!nome ||bairro ||hora ||!data ||!vendedor){
      return false;
  }
  else{
      return true;
  }
}

function resetCampos() {
  let allradiobuttons = document.querySelectorAll('.radio-group');
  document.getElementById("id_input").value = "";
  document.getElementById("nome_input").value = "";
  document.getElementById("observacao_input").value = "";
  document.getElementById("cmbOpcoes").selectedIndex = 0;
  allradiobuttons.forEach(value => value.checked = false);
  document.getElementById("datePicker").value = "";
}

function abrirPopup() {
  // Exibe o pop-up e o overlay
  document.getElementById('popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function fecharPopup() {
  // Oculta o pop-up e o overlay
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
  axios.get('https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/allusuario')
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
  axios.get(`https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/${id_entrega}`)
  .then(response => {
    const dados = response.data;
    preencherInput(dados);
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
    const dadosEntrega = {
      id_entrega: document.getElementById('id_input').value,
      nome_cliente: document.getElementById('nome_input').value,
      bairro: document.getElementById('cmbOpcoes').value,
      situacao: "Aguardando",
      data_entrega: formatarDataPost(document.getElementById('datePicker').value),
      hora_entrega: document.querySelector("input[name=opcaoRadio1]:checked").value,
      observacao: document.getElementById('observacao_input').value,
      vendedor: document.querySelector("input[name=opcaoRadio]:checked").value,
      id_veiculo : 0
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
       // Lógica adicional para lidar com erros, se necessário
    });
  }

function atualizarEntrega(){
  const id_entrega= document.getElementById('id_input_a').value;
  const dadosEntrega = {
    nome_cliente: document.getElementById('nome_input_a').value,
    telefone: 49,
    bairro: document.getElementById('cmbOpcoes_a').value,
    rua: "NULL",
    situacao: "Aguardando",
    data_cadastro: document.getElementById('datePicker_a').value,
    hora_cadastro: document.querySelector("input[name=opcaoRadio1_a]:checked").value,
    data_entrega: document.getElementById('datePicker_a').value,
    hora_entrega: document.querySelector("input[name=opcaoRadio1_a]:checked").value,
    observacao: document.getElementById('observacao_input_a').value,
    vendedor: document.querySelector("input[name=opcaoRadio_a]:checked").value,
  };

  // Enviar a requisição POST usando axios
  axios.put(`https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com/entregas/${id_entrega}`, dadosEntrega)
  .then(response => {
      getEntregasFilter();
      resetCampos();
      fecharPopup();
      alert("Entrega Alterada !")
    })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
     // Lógica adicional para lidar com erros, se necessário
  });
  fecharPopup();
}