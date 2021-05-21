console.log('client side js')
/*

*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Message1 = document.querySelector('#message-1')
const Message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e => {

    e.preventDefault();
    const address = search.value
    search.value=''

    if(address.length !==0)
    {
        Message1.textContent='Loading...'
        Message2.textContent=''

        fetch(`http://localhost:3000/weather?address=${address}`).then(response => {
            response.json().then(data => {
            if(data.error){
                Message1.textContent=data.error
            }
            else{
                Message1.textContent = data.location
                Message2.textContent = data.Forecast
        }
    })
})
        
    }
    else{
        Message1.textContent='Enter valid search'
        Message2.textContent=''
    }
        

}))