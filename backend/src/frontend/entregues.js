//const URL = 'http://localhost:3000';
const URL = 'https://sistema-de-entregas-ciotta-25e16c0667db.herokuapp.com';
function preencherLinhasTabela(tbody, listaDados) {
    listaDados.forEach(dados => {
    const row = tbody.insertRow();
    Object.values(dados).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });
  });
  }

  function getLeastEntregues(){
    const tabelaBody = document.getElementById("tabelaBody");
    tabelaBody.innerHTML = ''

    axios.get(`${URL}/entregas/entregues/70`)
    .then(response => {
      const dados = response.data;
      preencherLinhasTabela(tabelaBody, dados);
    })
    .catch(error => {
      alert('Erro na requisição:', error.response.data.message);
      });
  }