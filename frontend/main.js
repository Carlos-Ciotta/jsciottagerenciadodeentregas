const url_entregas = 'http://127.0.0.1:3000/entregas'
const url_veiculos = "http://127.0.0.1:3000/veiculos"

function resetCampos() {
  document.getElementById("id_input").value = "";
  document.getElementById("nome_input").value = "";
  document.getElementById("rua_input").value = "";
  document.getElementById("observacao_input").value = "";
  document.getElementById("cmbOpcoes").selectedIndex = 0;
  document.getElementById("radOpcao1").checked = false;
  document.getElementById("radOpcao2").checked = false;
  document.getElementById("radOpcao3").checked = false;
  document.getElementById("radOpcao4").checked = false;
  document.getElementById("radOpcao5").checked = false;
  document.getElementById("radOpcao6").checked = false;
  document.getElementById("radOpcao7").checked = false;
  document.getElementById("radOpcao8").checked = false;
  document.getElementById("datePicker").value = "";
}

function atualizarLabels() {
  document.getElementById("labelDiv2_1").innerText = "1";
  document.getElementById("labelDiv2_2").innerText = "1";
  document.getElementById("labelDiv3_1").innerText = "2";
  document.getElementById("labelDiv3_2").innerText = "2";
}

