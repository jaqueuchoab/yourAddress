
const buttonSeach = document.querySelector('.submit')
const input = document.querySelector('#cep')
const image = document.querySelector('.locationIndex')
buttonSeach.addEventListener('click', seachCep)

document.addEventListener('keypress', (e)=> {
  if (e.key == 'Enter') {
    seachCep()
  }
})

function seachCep() {
  const cep = document.querySelector('#cep').value
  const span = document.querySelector('a')
  if (cep.length >= 9 || cep.length == 0) {
    span.classList.add('showSpan')
    image.classList.add('hideImage')
  } else {
    span.classList.remove('showSpan')
    image.classList.remove('hideImage')
    initFetch(cep)
  }
}

function initFetch(cep) {
  const element = document.querySelector('#value')
  const viacep = fetch(`https://viacep.com.br/ws/${cep}/json/`)
  viacep.then(resultAddress => {
    resultAddress.json().then(address => {
      const values = Object.entries(address)
        .filter(arrayOneValue => {
          return arrayOneValue[1].length > 0
        })
        .map(item => {
          const key = item[0]
          const content = item[1]
          const keyContent = {
            key,
            content
          }
          return `${keyContent.key}: ${keyContent.content}`
        })
        .reduce((acumulador, atual) => {
          return acumulador + '\n' + atual
        })

      changeClassTwo()
      setTimeout(() => {
        const h3 = document.querySelector('h3')
        image.classList.remove('showLoading')
        h3.classList.remove('showLoading')
        changeClassOne()
        showValues(element, values)
      }, 3100)
    })
  })
}

const buttonNewSeach = document.querySelector('#newSeach')
buttonNewSeach.addEventListener('click', () => {
  if (document.location.reload()) {
    changeClassOne()
    changeClassTwo()
  }
})

function changeClassOne() {
  const sectionNew = document.querySelector('.content-result')
  sectionNew.classList.toggle('display')
  image.classList.toggle('displayImage')
}

function changeClassTwo() {
  const sectionOld = document.querySelector('.content')
  sectionOld.classList.toggle('none')
  const h3 = document.querySelector('h3')
  h3.classList.add('showLoading')
  image.classList.add('showLoading')
}

function showValues(content, value) {
  if (value.length > 0) {
    return (content.innerText = value)
  } else {
    content.innerText = 'Desculpe, houve um erro inesperado!'
  }
}