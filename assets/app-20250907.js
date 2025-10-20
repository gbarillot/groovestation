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

SetpilotApi = "https://api.setpilot.app/public/bands/38b18225-ca09-470d-8a88-a82a2d59cd67/gigs"

function loadGigs() {
  fetch(SetpilotApi)
    .then(response => response.json())
    .then(data => {
      showGigs(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showGigs(data) {
  var html = "";
  data.gigs.forEach(gig => {
    const d = new Date(gig.start_at); // gig.start_at is UTC; Date will convert to local when formatting
    const formattedDate = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    }).format(d);

    const wd = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long'
    }).format(d);

    const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
    const hour = String(d.getHours()).padStart(2, '0');
    const minute = String(d.getMinutes()).padStart(2, '0');

    html += `
      <div class="date">
        <h2>${cap(wd)} ${formattedDate}</h2>
        <div class="desc">
          <b>${gig.name}</b><br /><br />
          ${gig.location}<br /><br />
          A partir de ${hour}:${minute}
        </div>
        <div class="gmap">
          <iframe
            width="600"
            height="450"
            style="border:0"
            loading="lazy"
            allowfullscreen
            referrerpolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=${gig.lat},${gig.lng}&hl=fr&z=12&output=embed">
          </iframe>
        </div>
      </div>`;
  });
  document.getElementById('gigs').innerHTML = html;

}
// Auto-call loadGigs on page load for concerts page
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('concerts.html')) {
    loadGigs();
  }
});

function frenchWeekday(input) {
  const d = (input instanceof Date) ? input : new Date(input);
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d);
}

function frenchMonth(input) {
  const d = (input instanceof Date) ? input : new Date(input);
  return new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(d);
}

function frenchDateLong(input) {
  const d = (input instanceof Date) ? input : new Date(input);
  return new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(d);
}
