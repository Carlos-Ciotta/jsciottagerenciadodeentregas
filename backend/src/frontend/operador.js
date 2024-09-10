const URL = 'https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com';
//const URL = 'http://localhost:3000';

function resetCampos() {
  let allradiobuttons = document.querySelectorAll('.radio-group');
  allradiobuttons.forEach(value => value.checked = false);
}

function PreencherDashboardPrincipal(){
    const tabelaBody = document.getElementById("tabela-corpo");
    axios.get('${URL}/entregas/getoperador/operador/0/Aguardando')
    .then(response => {
      const dados = response.data;
      preencherLinhasTabela(tabelaBody, dados);
    })
    .catch(error => {
      alert('Erro na requisição:', error);
      });
  }

function PreencherDashboardFord(){
    const tabelaBody = document.getElementById("tabela1-corpo");
    axios.get('${URL}/entregas/getoperador/operador2/2/Em%20andamento')
    .then(response => {
      const dados = response.data;
      preencherLinhasTabelaCaminhoes(tabelaBody, dados);
    })
    .catch(error => {
      alert('Erro na requisição:', error);
      });
}

function PreencherDashboardVw(){
  const tabelaBody = document.getElementById("tabela2-corpo");
  axios.get('${URL}/entregas/getoperador/operador2/1/Em%20andamento')
  .then(response => {
    const dados = response.data;
    preencherLinhasTabelaCaminhoes(tabelaBody, dados);
  })
  .catch(error => {
    alert('Erro na requisição:', error);
    });
}

function preencherLinhasTabelaCaminhoes(tbody, listaDados) {
  tbody.innerHTML = ''
  listaDados.forEach(dados => {
    const row = tbody.insertRow();

    // Itera sobre os valores dos dados
    Object.values(dados).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });

    //Adiciona três células extras com uma checkbox em cada uma
    for (let i = 0; i < 2; i++) {
        const checkboxCell = row.insertCell();
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox);
    }
});
  }


function preencherLinhasTabela(tbody, listaDados) {
  tbody.innerHTML = ''
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
      atualizaVeiculoEntrega(n_pedidos[i], 1, 'Em andamento')
    }
    alert("Entregas enviadas")
  }

  else if (opcao2.checked){
    for(let i = 0; i< n_pedidos.length; i++){
      atualizaVeiculoEntrega(n_pedidos[i], 2,'Em andamento')
    }
    alert("Entregas enviadas")
  }
  
}

function updateEntregas1(tbody){
  const n_pedidos_s = [];
  const n_pedidos_e = [];
  for (let i = 0; i < tbody.rows.length; i++) {
    const row = tbody.rows[i];
    const checkbox = row.cells[3].querySelector('input[type="checkbox"]');
    const checkbox1 = row.cells[4].querySelector('input[type="checkbox"]');
    if (checkbox.checked) {
      const dado1 = row.cells[0].textContent;
      n_pedidos_s.push(dado1)
    }
    if (checkbox1.checked) {
      const dado1 = row.cells[0].textContent;
      n_pedidos_e.push(dado1)
    }
  }
    for(let i = 0; i< n_pedidos_e.length; i++){
      atualizaVeiculoEntrega(n_pedidos_e[i], 0, 'Entregue')
    }
    for(let i = 0; i< n_pedidos_s.length; i++){
      atualizaVeiculoEntrega(n_pedidos_s[i], 0, 'Aguardando')
    }
}

function atualizaVeiculoEntrega(id_entrega, id_veiculo, situacao){
  // Enviar a requisição POST usando axios
  axios.put(`${URL}/entregas/veiculo/${id_entrega}/${id_veiculo}/${situacao}`)
  .then(response => {
    PreencherDashboardPrincipal();
    PreencherDashboardVw();
    PreencherDashboardFord();
    resetCampos();
    })
  .catch(error => {
    console.error('Erro ao enviar dados:', error);
     // Lógica adicional para lidar com erros, se necessário
  });
}