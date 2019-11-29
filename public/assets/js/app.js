// Hebrew app

function makeElement(name,...classes) {
  let el = document.createElement(name)
  for (cssClass of classes) {
    el.classList.add(cssClass)
  }
  return el
}

function getPage() {
  //get document id from DOM
  const docId = document.querySelector('.selected').dataset.id;
  // get document snapshot from DB
  db.collection('pages').doc(docId).get().then(snap => {
    // make HTML element for the conjugation
    let section = makeElement('section','paradigm','grid','c2')
    section.dataset.conjugation = snap.data().title
    //for easy ref
    form = snap.data();
    let tmp = [];
    for (part in form.forms) {
      let element = makeElement('div',part,'section')
      for (let i = 0; i < form.forms[part].pgn.length; i++) {
        let f = form.forms[part].form
        let p = form.forms[part].pgn
        //make each pgn : form element
        let div = makeElement('div','item','grid','c2','center-items');
        div.innerHTML = `
        <span class="pgn">${p[i]}</span>
        <span class="form">${f[i]}</span>
        `

        element.appendChild(div);
      }
      // dont know how to sort query
      // so sorting it manually
      if (element.className.includes('sg')) {
        tmp.unshift(element)
      }
      else {
        tmp.push(element)
      }

      //apending elements in right order
      for (i of tmp) {
        section.appendChild(i)
      }
    }
    // appends everything to the DOM
    document.querySelector('body').appendChild(section)
})
}


function navBar() {
  const navbar = document.querySelector('.navbar').children
  for (let i=0; i < navbar.length; i++) {
    navbar[i].addEventListener('click',(e) => {
      e.preventDefault();
      const href = navbar[i].classList;
      resetSelected();
      navbar[i].classList.add('selected');
      toggleElement(href);
      toggleMenu();
      getPage()
    })
  }
}

const toggleElement = (element) => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.classList.add('hide')
    section.classList.remove('active')
    const target = document.querySelector(`[data-conjugation="${element[0]}"]`)
    target.classList.remove('hide')
    target.classList.add('active')
    target.scrollIntoView();
  })

}

const resetSelected = () => {
  const items = document.querySelector('.navbar').children;
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('selected');
  }
}

const toggleMenu = () => {
  const header = document.querySelector('.menuWrapper')
  header.classList.toggle('closed');
  header.classList.toggle('open');
  //header.classList.toggle('absolute');

  //const section = document.querySelector('.active')
  //if (header.className.includes('open')) {
  //  section.style.marginBottom="0vh"
  //} else {
  //  section.style.marginBottom="15vh"
  //}
};

const menu = document.querySelector('.menuBtn')
menu.addEventListener('click',(e) => {
  e.preventDefault();
  toggleMenu();
})
let gdoc
document.addEventListener('keydown',menuKey)
function menuKey(e) {
  let key = e.code;
  if (key === "KeyM" || key == "Space") {
    toggleMenu();
  }
  if (key === "Enter" && document.querySelector('.open')) {
    const page = document.querySelector(':focus')
    resetSelected();
    page.classList.add('selected');
    toggleElement(page.classList);
    toggleMenu();
    getPage();
  }

  const numberOfMenuItems = document.querySelector('.navbar').children.length
  gdoc = numberOfMenuItems
  const page = document.querySelector(':focus')
  const getTab = (direction, focusItem) => {
    var nextIndex
    if (direction == 'ArrowRight') {
      nextIndex = focusItem.tabIndex + 1
    }
    else if (direction == 'ArrowLeft') {
      nextIndex = focusItem.tabIndex - 1
    }
    else if (direction == 'ArrowUp') {
      nextIndex = focusItem.tabIndex - 3
    }
    else if (direction == 'ArrowDown') {
      nextIndex = focusItem.tabIndex + 3
    }

    if (nextIndex > numberOfMenuItems) {
      return 1
    }
    else if (nextIndex <= 0) {
      return numberOfMenuItems
    }
    else {
      return nextIndex
    }
  }

  if (page) {
    const i = document.querySelector(`[tabindex="${getTab(key,page)}"]`)
    i.focus()
  }
  else if (!page) {
    const i = document.querySelector(`[tabindex="1"]`)
    i.focus()
  }
}
