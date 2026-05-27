
const update = document.querySelector('#update-button')

update.addEventListener('submit', _ => {
  fetch('/books', {
    method: 'put',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
   name: document.querySelector('[name="oldName"]').value,
      newName: document.querySelector('[name="newName"]').value,
      genre: document.querySelector('[name="newGenre"]').value
    })
      })
   .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
    })

const deleteButton = document.querySelector('#delete-button')

deleteButton.addEventListener('submit', _ => {
  fetch('/books', {
    method: 'delete',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
   name: document.querySelector('[name="deleteName"]').value,
    })
      })
   .then(res => {
    if (res.ok) return res.json()
  })
  .then(response => {
    window.location.reload(true)
  })
    })
