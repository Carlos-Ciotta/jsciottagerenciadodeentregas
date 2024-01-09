const url_entregas = 'http://127.0.0.1:3000/entregas'
const url_veiculos = "http://127.0.0.1:3000/veiculos"

function alerta(){
  alert("AAA")
}

function inserirEntrega() {
  const obj={
    id_entrega: document.getElementById('id_input').value,
    nome_cliente: document.getElementById('nome_input').value,
    telefone: document.getElementById('telefone_input').value,
    bairro: document.getElementById('cmbOpcoes').value,
    rua: document.getElementById('rua_input').value,
    situacao: "Aguardando",
    data_cadastro: document.getElementById('datePicker').value,
    hora_cadastro: document.getElementById('radio').value,
    data_entrega: document.getElementById('datePicker').value,
    hora_entrega: document.getElementById('radio').value,
    observacao: document.getElementById('observacao_input').value,
    vendedor: document.getElementById('radio2').value,
  }

  axios.post(url_entregas, obj)
        .then(response => {
            alert('Objeto inserido com sucesso:', response.data);
            // Adicione o código que deseja executar após a inserção bem-sucedida
        })
        .catch(error => {
            alert('Erro ao inserir o objeto:', error);
            // Adicione o código que deseja executar em caso de erro
        });
  // Adicione o código que deseja executar aqui
};

function getEntregas() {
  axios.get(url_entregas)
      .then(response => {
          const dados = response.data;
          preencherTabela(dados);
      })
      .catch(error => {
          console.error('Erro ao obter dados:', error);
      });
}