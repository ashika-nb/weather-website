console.log('loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const loading = document.querySelector('#loading')
const content = document.querySelector('#content')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value
    loading.textContent = 'loading'
    content.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then(response => {

        response.json().then(data => {
            if (data.error) {
                loading.textContent = data.error
            }
            else {
                loading.textContent = data.location
                content.textContent = data.forecast
            }
        })
    })

})