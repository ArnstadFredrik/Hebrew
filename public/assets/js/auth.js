db.collection('pages').get().then(snap => {
  for (doc of snap.docs){
    //make document reference
    let data = doc.data()

    //create html menu element
    let element = makeElement('span',`${data.title}`)
    element.innerText = data.title
    element.tabIndex = snap.docs.length
    element.dataset.id = doc.id

    let menuBar = document.querySelector('.navbar')
    //add element to menu
    menuBar.appendChild(element)
  }
  navBar();
})
