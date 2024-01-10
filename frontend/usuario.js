const url_entregas = 'http://127.0.0.1:3000/entregas'
const url_veiculos = "http://127.0.0.1:3000/veiculos"

function resetCampos() {
  let allradiobuttons = document.querySelectorAll('.radio-group');
  document.getElementById("id_input").value = "";
  document.getElementById("nome_input").value = "";
  document.getElementById("rua_input").value = "";
  document.getElementById("telefone_input").value = "";
  document.getElementById("observacao_input").value = "";
  document.getElementById("cmbOpcoes").selectedIndex = 0;
  allradiobuttons.forEach(value => value.checked = false);
  document.getElementById("datePicker").value = "";
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
  axios.get('http://127.0.0.1:3000/entregas/allusuario')
  .then(response => {
    const dados = response.data;
    preencherLinhasTabela(tabelaBody, dados);
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });
}

function postEntregas(){
  const dadosEntrega = {
    id_entrega: document.getElementById('id_input').value,
    nome_cliente: document.getElementById('nome_input').value,
    telefone: document.getElementById('telefone_input').value,
    bairro: document.getElementById('cmbOpcoes').value,
    rua: document.getElementById('rua_input').value,
    situacao: "Aguardando",
    data_cadastro: document.getElementById('datePicker').value,
    hora_cadastro: document.querySelector("input[name=opcaoRadio1]:checked").value,
    data_entrega: document.getElementById('datePicker').value,
    hora_entrega: document.querySelector("input[name=opcaoRadio1]:checked").value,
    observacao: document.getElementById('observacao_input').value,
    vendedor: document.querySelector("input[name=opcaoRadio]:checked").value,
  };

  // Enviar a requisição POST usando axios
  axios.post('http://127.0.0.1:3000/entregas', dadosEntrega)
  .then(response => {
      getEntregasFilter();
      resetCampos();
    })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
     // Lógica adicional para lidar com erros, se necessário
  });
}