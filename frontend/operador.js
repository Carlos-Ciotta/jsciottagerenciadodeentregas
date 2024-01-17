function resetCampos() {
  document.getElementById("radOpcao1").checked = false;
  document.getElementById("radOpcao2").checked = false;
}



function getEntregasFilter(){
    const tabelaBody = document.getElementById("tabela-corpo");
    tabelaBody.innerHTML = ''
    axios.get('http://127.0.0.1:3000/entregas/alloperador')
    .then(response => {
      const dados = response.data;
      preencherLinhasTabela(tabelaBody, dados);
    })
    .catch(error => {
      alert('Erro na requisição:', error);
      });
  }

  function getEntregasFilter2(){
  const tabelaBody = document.getElementById("tabela1-corpo");
  tabelaBody.innerHTML = ''
  axios.get('http://127.0.0.1:3000/entregas/byidveiculo/1')
  .then(response => {
    const dados = response.data;
    preencherLinhasTabela(tabelaBody, dados);
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });

  const tabelaBody2 = document.getElementById("tabela2-corpo");
  tabelaBody2.innerHTML = ''
  axios.get('http://127.0.0.1:3000/entregas/byidveiculo/2')
  .then(response => {
    const dados = response.data;
    preencherLinhasTabela(tabelaBody, dados);
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });
}

function preencherLinhasTabela(tbody, listaDados) {
  listaDados.forEach(dados => {
      const row = tbody.insertRow();

       // Itera sobre os valores dos dados
   Object.values(dados).forEach(value => {
    const cell = row.insertCell();
    cell.textContent = value;
    });

 // Adiciona uma célula extra para a checkbox
  const checkboxCell = row.insertCell();
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkboxCell.appendChild(checkbox);
});
}

function updateEntregas(){
  const n_pedidos = [];
  const tbody = document.getElementById("tabela-corpo");
  for (let i = 0; i < tbody.rows.length; i++) {
    const row = tbody.rows[i];
    const checkbox = row.cells[7].querySelector('input[type="checkbox"]');

    if (checkbox.checked) {
      const dado1 = row.cells[0].textContent;
      n_pedidos.push(dado1)
    }
  }
  const opcao1 = document.getElementById('radOpcao1');
  const opcao2 = document.getElementById('radOpcao2');
  
  if (opcao1.checked){
    for(let i = 0; i< n_pedidos.length; i++){
      atualizaVeiculoEntrega(n_pedidos[i], 1)
    }
  }

  else if (opcao2.checked){
    for(let i = 0; i< n_pedidos.length; i++){
      atualizaVeiculoEntrega(n_pedidos[i], 2)
    }
  }

}

function atualizaVeiculoEntrega(id_entrega, id_veiculo){
  // Enviar a requisição POST usando axios
  axios.put(`http://127.0.0.1:3000/entregas/veiculo/${id_entrega}`, id_veiculo)
  .then(response => {
    alert("certo")
    })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
     // Lógica adicional para lidar com erros, se necessário
  });
}