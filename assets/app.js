save = function() {
  var data = new FormData();
  data.append("email", document.getElementById("input-1").value);
  data.append("message", document.getElementById("input-2").value);
 
  fetch("https://app.99inbound.com/api/e/Ap4nFHvh", {
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