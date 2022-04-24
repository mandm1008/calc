var ans = document.querySelector('.ans')
var ansValue = 0

function calculate(string) {
    ans.innerText = string
    string = string.replaceAll('%', '/100')
    let index
    ans.classList.toggle('action')
    setTimeout(() => {
        if (!ans.classList.contains('action')) ans.classList.toggle('action')
    }, 50)
    if (noficationError(string)) calc.txt.value = 'Error! Click AC!'
    else {
        do {
            index = string.indexOf('ANS')
            if (index !== -1)
                if (string.charAt(index - 1) >= '0' && string.charAt(index - 1) <= '9') {
                    string = string.substring(0, index) + '*' + string.substring(index)
                    string = string.replace('ANS', `${ansValue}`)
                } else string = string.replace('ANS', `${ansValue}`)
        } while (string.includes('ANS'))
        calc.txt.value = new Function(`return ${string}`)()
        ansValue = calc.txt.value
    }
    calc.txt.classList.add('faceIn')
    setTimeout(() => { calc.txt.classList.remove('faceIn') }, 1500)
}

function noficationError(string) {
    let index = [], i = inpect(string)
    while (i < string.length) {
        index.push(i)
        i = inpect(string, i + 1)
    }
    if (index[index.length - 1] === string.length - 1) return true
    for (i = 0; i < index.length - 1; i++) {
        if (index[i] === index[i + 1] === index[i + 2]) return true
        if ((index[i + 1] === index[i] + 1) && (string.charAt(index[i + 1]) !== '*' || string.charAt(index[i]) !== '*')) return true
    }
    return false
}

function inpect(string, start = 0) {
    let min = string.length
    let index = string.indexOf.bind(string)
    if (index('+', start) !== -1) min = min > index('+', start) ? index('+', start) : min
    if (index('-', start) !== -1) min = min > index('-', start) ? index('-', start) : min
    if (index('*', start) !== -1) min = min > index('*', start) ? index('*', start) : min
    if (index('/', start) !== -1) min = min > index('/', start) ? index('/', start) : min
    return min
}

document.querySelector('.clear').addEventListener('click', () => {
    ans.classList.remove('action')
    ans.innerText = ''
})

let spans = document.querySelectorAll('.value span')

document.addEventListener('keydown', (e) => { handleClick(e.key) })

function handleClick(key) {
    let value = calc.txt.value
    if (key === 'Backspace') calc.txt.value = value.substring(0, value.length - 1)
    spans.forEach((item) => {
        if (item.innerText === key) item.click()
    })
    if (key === 'Enter') document.querySelector('.equal').click()
}