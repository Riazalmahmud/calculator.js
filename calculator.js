class calculator {
    constructor(priviousOperendTextElement, correndOperendTextElement) {
        this.priviousOperendTextElement = priviousOperendTextElement;
        this.correndOperendTextElement = correndOperendTextElement;
        this.clear()
    }

    clear() {
        this.correntOperant = ''
        this.priviousOperant = ''
        this.Operation = undefined
    }
    delete() {
        this.correntOperant = this.correntOperant.toString().slice(0, -1)
    }
    appenNumber(number) {
        if (number === '.' && this.correntOperant.includes('.')) return;
        this.correntOperant = this.correntOperant.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.correntOperant === '') return;
        if (this.priviousOperant !== '') {
            this.compute()
        }

        this.operation = operation;
        this.priviousOperant = this.correntOperant;
        this.correntOperant = ' ';
    }
    compute() {
        let computation
        const prev = parseFloat(this.priviousOperant)
        const current = parseFloat(this.correntOperant)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break

            default:
                return
        }
        this.correntOperant = computation
        this.operation = undefined
        this.priviousOperant = ''


    }

    getDesplayNumber(number) {

        const sringNumber = number.toString()
        const integerDigit = parseFloat(sringNumber.split('.')[0])
        const decimalDigit = sringNumber.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigit)) {
            integerDisplay = ''
        }
        else {
            integerDisplay = integerDigit.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`
        }

        else {
            return integerDisplay
        }
    }
    updateDesplay() {
        this.correndOperendTextElement.innerText =
            this.getDesplayNumber(this.correntOperant)
        if (this.operation != null) {

            this.priviousOperendTextElement.innerText =
                `${this.getDesplayNumber(this.priviousOperant)} ${this.operation}`
        }
        else {
            this.priviousOperendTextElement.innerText = ''
        }
    }
}





const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operation]');
const deleteButton = document.querySelector('[data-delete]');
const clearAllButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const priviousOperendTextElement = document.querySelector('[data-privious-operend]');
const correndOperendTextElement = document.querySelector('[data-corrend-operend]');


const calculators = new calculator(priviousOperendTextElement, correndOperendTextElement)


numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculators.appenNumber(button.innerText)
        calculators.updateDesplay()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculators.chooseOperation(button.innerText)
        calculators.updateDesplay()
    })
})

equalsButton.addEventListener('click', button => {

    calculators.compute()
    calculators.updateDesplay()

})
clearAllButton.addEventListener('click', button => {

    calculators.clear()
    calculators.updateDesplay()

})
deleteButton.addEventListener('click', button => {

    calculators.delete()
    calculators.updateDesplay()

})