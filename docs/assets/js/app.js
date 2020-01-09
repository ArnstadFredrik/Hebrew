// Hebrew app

const navbar = document.querySelector('.navbar').children
for (let i=0; i < navbar.length; i++) {
  navbar[i].addEventListener('click',(e) => {
    e.preventDefault();
    const href = navbar[i].classList;
    resetSelected();
    navbar[i].classList.add('selected');
    toggleElement(href);
    toggleMenu();
  })
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
