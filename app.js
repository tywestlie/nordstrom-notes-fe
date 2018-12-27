$(document).ready(function(){
  $('.dropdown-trigger').dropdown();
   $('select').formSelect();
 });
function getNotes(){
  fetch('https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes')
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2>Notes</h2>';
    let notes = data.notes
    notes.forEach(function(note){
      output += `
      <div class="divider"></div>
        <div class="section">
        <h5>${note.tag}</h5>
        <p>${note.message}</p>
        <p>Date Published:${note.date}</p>
        </div>
      `
    });
    document.getElementById('output').innerHTML = output;
  })
}

getNotes();
