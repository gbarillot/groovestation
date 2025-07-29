save = function() {
  var data = new FormData();
  data.append("email", document.getElementById("input-1").value);
  data.append("message", document.getElementById("input-2").value);
  data.append("_gotcha", "")

  fetch("https://getform.io/f/91e67867-c37b-4aa8-b449-6dfbe0782c4d", {
    method: "POST",
    body: data
  }).then((result) => {
    if (result.status != 200) { 
      alert("Une erreur est survenue"); 
    }
  }).then((response) => {
    document.getElementById("input-1").value = '';
    document.getElementById("input-2").value = '';
    setTimeout(function() {
      alert("Nous avons bien reçu votre message et vous répondrons dès que possible !")
    }, 0)
  }) 
}

toggleMenu = function() {
  document.getElementById('menu').classList.toggle("dropped");
}

load = function() {
  document.getElementById('target').text = "contact" + "@" + "groovestation" + ".live"
}
