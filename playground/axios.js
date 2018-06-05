console.log('wired axios');

axios.get('https://www.googleapis.com/books/v1/volumes?q=baseball&key=AIzaSyBV4JsaEhWuCkhm_6gF-72N6ulSt1LdBRw')
  .then(response=> {
    return response.data;
  })
  .then(data=>console.log(data.items))
  .catch(err=>console.log(err));