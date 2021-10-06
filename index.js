/*
Frontend 1 - Javascript // Nackademin // Group task - Coffeeshop
    
    @author Mattias Söderberg
    @author Hanna Tylna  
    @author Zamir Cohen
    @author Kubilay Demirkiran
*******************************************************************/

// Defines a constant array named "coffees". The array has 3 objects with the elements "name" and "price" with assigned values.
const coffees = [
    { name: "Bryggkaffe", price: 20 },
    { name: "Cappucino", price: 30 },
    { name: "Latte", price: 40 },
    { name: "Chai Latte", price: 50 }
]

// Defines a class named "Customer". 
class Customer {
    constructor() {
        this.transactions = []                          // An array to store all the transactions
        this.boughtCups = 0                             // A variable to keep track of the amount of bought cups
        this.silverThreshold = 10                       // A variable with the threshold for Silver membership set to 10
        this.goldThreshold = 30                         // A variable with the threshold for Gold membership set to 30
        this.smallDiscountThreshold = 500               // A variable with the threshold for small discount at 500
        this.largeDiscountThreshold = 1000              // A variable with the threshold for large discount at 1000
    }
    // A method that adds the transaction to the transactions array and updates the amount of bought cups
    addTransaction(transactionObject) {
        this.transactions.push(transactionObject)
        this.boughtCups += transactionObject.amount
    }
    // A method that calculates and returns total spent 
    getTotalSpent() {
        let sum = 0
        this.transactions.forEach(transaction => {
            sum += transaction.total
        })
        return sum
    }
    // A method that returns the current membershipstatus.
    getMembershipStatus() {
        let status = "Brons"

        if (this.boughtCups >= this.silverThreshold && this.boughtCups < this.goldThreshold) {
            status = "Silver"
        } else if (this.boughtCups >= this.goldThreshold) {
            status = "Guld"
        }
        return status
    }
    // A method that checks if customer is eligible for discount and returns the current discount
    getDiscount(currentTotal) {
        let discount = 1
        const totalSpent = this.getTotalSpent() + currentTotal

        if(totalSpent >= this.smallDiscountThreshold && totalSpent < this.largeDiscountThreshold) {
            discount = 0.9
        } else if(totalSpent >= this.largeDiscountThreshold) {
            discount = 0.85
        }
        return discount
    }
    // A method that returns the latest transaction from the transactions array
    getLatestTransaction() {
        return this.transactions[this.transactions.length - 1]
    }
    // A method that updates the messages on the screen.
    updateMessage() {
        const totalSpentParagraph = document.getElementById("totalSpent")
        const membershipParagraph = document.getElementById("membershipStatus")

        totalSpentParagraph.innerHTML = `Du har handlat för ${this.getTotalSpent()} kr`
        membershipParagraph.innerHTML = `Medlemskapsstatus: ${this.getMembershipStatus()}`
    }
    // A method that updates the transaction list
    updateTransactionList() {
        const transactionList = document.getElementById("transactions")
        const transaction = this.getLatestTransaction()
        const header = document.getElementById("transactionHeader")
        header.innerHTML = "Dina transaktioner"

        const paragraph = document.createElement("p")

        paragraph.innerHTML = `Du köpte ${transaction.amount} st ${transaction.name} för ${transaction.price} kr styck. Summa: ${transaction.total}`

        transactionList.prepend(paragraph)      // Prepend to get the latest transaction at the top
    }
}

// Create a customer from the Customer class
const customer = new Customer()

// Gets all the HTML elements
const button = document.getElementById("buyBtn")
const inputElement = document.getElementById("amountOfCups")
const selectElement = document.getElementById("coffeeType")
const errorMessage = document.getElementById("errorMessage")

// Fills the select element with alla the options from the coffees array
coffees.forEach((coffee, index) => {
    const text = `${coffee.name} - ${coffee.price} kr`
    selectElement.options.add(
        new Option(text, index)
    )
})

// Creates an Eventlistener for the buy button
button.addEventListener("click", () => {
    const name = coffees[selectElement.value].name
    const amount = parseInt(inputElement.value)
    const price = coffees[selectElement.value].price
    let total = 0

    errorMessage.innerHTML = ""         // Sets the innerHTML to an empty string

    // Sets the value to the total variable per cup bought so the discount is applied to every single cup
    for(let i = 0; i < amount; i++) {
        total += price * customer.getDiscount(total)
    }

    // Check if the input is valid and display an error message if not
    if (amount >= 1 && amount <= 10) {
        customer.addTransaction({ name: name, amount: amount, price: price, total: total })
        customer.updateMessage()
        customer.updateTransactionList()
    } else if(amount > 10) {
        errorMessage.innerHTML = "Du får inte beställa så mycket kaffe"
    }
})
