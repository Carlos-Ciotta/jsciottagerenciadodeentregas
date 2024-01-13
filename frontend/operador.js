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