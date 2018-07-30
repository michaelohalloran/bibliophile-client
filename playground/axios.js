console.log('wired axios');

//THIS NEEDS the following tacked to the end, but key is another file: &key=<key goes here>
axios.get('https://www.googleapis.com/books/v1/volumes?q=baseball')
  .then(response=> {
    return response.data;
  })
  .then(data=>console.log(data.items))
  .catch(err=>console.log(err));