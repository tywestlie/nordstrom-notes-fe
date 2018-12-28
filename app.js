$(document).ready(function(){
  $('.dropdown-trigger').dropdown();
  $('select').formSelect();
});

document.getElementById("submitNote").addEventListener("click", function(){
  postNote();
});

document.getElementById("submitTag").addEventListener("click", function(){
  getNotesByTag();
});

document.getElementById("submitDate").addEventListener("click", function(){
  getNotesByDate();
});

function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}

function getNotesByDate(){
  var e = document.getElementById("filterDate");
  var date = e.options[e.selectedIndex].text;
  console.log(date);
  if(date === 'Oldest'){
    fetch('https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes')
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      let output = '';
      let notes = data.notes
      console.log(notes);
      let sortedOldest = notes.sort(function(a,b){
        console.log(`this is a ${a}`)
        console.log(`this is b ${b}`)
        return (a.submittedAt) - (b.submittedAt);
      });
      console.log(sortedOldest);
      sortedOldest.forEach(function(note){
        output += `
        <div class="divider"></div>
        <div class="section">
        <h5>${note.tag}</h5>
        <p>${note.message}</p>
        <p>Date Published: ${timeConverter(note.submittedAt)}</p>
        </div>
        `
      });
      document.getElementById('output').innerHTML = output;
    })
  } else if(date ==='Newest'){
  fetch('https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes')
  .then((res) => res.json())
  .then((data) => {
    console.log(date)
    let output = '';
    let notes = data.notes
    let sortedNewest = notes.sort(function(a,b){
      return (b.submittedAt) - (a.submittedAt);
    });
    sortedNewest.forEach(function(note){
      output += `
      <div class="divider"></div>
      <div class="section">
      <h5>${note.tag}</h5>
      <p>${note.message}</p>
      <p>Date Published: ${timeConverter(note.submittedAt)}</p>
      </div>
      `
    });
    document.getElementById('output').innerHTML = output;
  })
}
}


function getNotes(){
  fetch('https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes')
  .then((res) => res.json())
  .then((data) => {
    let output = '';
    let notes = data.notes
    notes.forEach(function(note){
      output += `
      <div class="divider"></div>
        <div class="section">
        <h5>${note.tag}</h5>
        <p>${note.message}</p>
        <p>Date Published: ${timeConverter(note.submittedAt)}</p>
        </div>
      `
    });
    document.getElementById('output').innerHTML = output;
  })
}


function getNotesByTag(){
  var e = document.getElementById("filterTag");
  var tag = e.options[e.selectedIndex].text;
  fetch(`https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes/${tag}`)
  .then((res) => res.json())
  .then((data) => {
    let output = '<h2 class="noteTitle">Notes</h2>';
    let notes = data.notes
    notes.forEach(function(note){
      output += `
      <div class="divider"></div>
        <div class="section">
        <h5>${note.tag}</h5>
        <p>${note.message}</p>
        <p>Date Published: ${note.submittedAt}</p>
        </div>
      `
    });
    document.getElementById('output').innerHTML = output;
  })
}

function postNote(){
  var e = document.getElementById("postTag");
  var tag = e.options[e.selectedIndex].text;
  var message = document.getElementById("body").value;
  console.log(tag);
  console.log(message);
  fetch('https://e11gjajxwe.execute-api.us-east-1.amazonaws.com/dev/notes', {
    method: 'post',
    body: JSON.stringify({
      "message": message,
      "tag": tag
    })
  }).then((res) => {
    getNotes();
  });
}

getNotes();
