const handleSave = (e)=> {
    e.preventDefault();
    // let targetLi = e.target.li;
    // console.log(targetLi);
    // let h1Text = document.querySelector('#title').textContent;
    // console.log(h1Text);
    //grab form
    let el = e.target;
    //get HTML collection of form children
    let children = el.children;
    // console.log(children);
    //change form children into array
    let arr = Array.prototype.slice.call(children);
    console.log(arr);
    // console.log(Array.isArray(arr));
    let textVals = arr
    //grab only the children with classNames and non-empty innerHTML
      .filter(child=>child.className === 'image' || child.innerHTML.length >0 && child.className.length > 0)
      .map(child=>{
      let bookItem = {};
      //push into the object the prop as className and the val as innerHTML or img src
      bookItem[child.className] = child.innerHTML || child.src;
      console.log('bookItem is', bookItem);
      console.log('bookItem type is', typeof bookItem);
      return bookItem;
    })
    console.log(textVals);
    // children.map(child=> console.log(child.innerHTML));
    // for(let i = 0; i < children.length; i++) {
    //   console.log(children[i].innerHTML);
    // }

    // console.log('el is', el);
    // // let title = el.closest('h1');
    // console.log('children are', el.children);
    // let title = el.children.closest('h1');
    // console.log('title is', title);
    // let price = el.closest('.price');
    // console.log('price is', price);
    // // console.log('sibling is', el.previousSibling);
}