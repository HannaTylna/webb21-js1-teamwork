const coffeeMenu = document.getElementById("coffeeMenu")
const coffees = [
    {name: 'Brygg Kaffe', price: 20},
    {name: 'Cappucino', price: 30},
    {name: 'Latte', price: 40}
];
const menuList = document.createElement("select");
menuList.setAttribute("id", "name", "price"); 
coffeeMenu.appendChild(menuList);
            
coffees.forEach(coffee => {
    const option = document.createElement("option");
    option.setAttribute("value", coffees[coffees.length]);
    option.text = `${coffee.name} - ${coffee.price} kr`;
    menuList.appendChild(option);
})  

class Customer {
    constructor(){
        this.transactions = [];
        this.statusSilver = 10;
        this.statusGuld = 30;
        /* Jag lägger till händelsen som skapas när jag trycker på knappen Köp. Detta ersätter skapandet av en separat funktion för att trycka på en knapp. */
        document.getElementById("submit").addEventListener("click", this.processClick.bind(this));
    }
    /* Metoden som lägger till en transaktion till min array (this.transactions) */
    addTransaction(transaction){
        this.transactions.push(transaction);
    }
    /* Metoden som behandlar data med en knapptryckning (event)*/
    processClick(e){
        const select = document.getElementById("coffeeMenu");
        const qty = parseInt(document.getElementById("amountOfCoffe").value);// quantity
        
        if (!qty) return;//Datainmatningskontroll (antal koppar köpt)

        /* de parametrar som förväntas under transaktionen meddelas */
        this.addTransaction({
            title: select.options[select.selectedIndex].text, 
            price: parseInt(select.value),
            qty: qty,
            transactionValue: qty * parseInt(select.value)
        });
        this.outMessage();
    }
    getTotalAmount(name){
        /* let sum = 0;
        this.transactions.forEach(transaction =>{
            sum += transaction;
        })
        return sum; */
        return this.transactions.reduce((collector, transaction) =>
            collector += transaction[name]
        , 0)
    }
    getMembershipStatus(){
        const qty = this.getTotalAmount("qty");
    

        if(qty < this.statusSilver) return "Brons";

        if(qty >= this.statusSilver && qty < this.statusGuld) return "Silver";
        
        if(qty >= this.statusGuld) return "Guld";
    }
    outMessage(){
        const totalSpentParagraph = document.getElementById("totalSpent");
        const medlemSkap = document.getElementById("medlemskapsStatus");

        totalSpentParagraph.innerHTML = `Du har handlat för: ${this.getTotalAmount("transactionValue")} kr`;
        medlemSkap.innerHTML = `Medlemskapsstatus: ${this.getMembershipStatus()}`; 

        const purchaseParagraph = document.getElementById("purchase");
        const transaction = this.transactions[this.transactions.length - 1]
        purchaseParagraph.innerHTML = purchaseParagraph.innerHTML + `Du köpte ${transaction["qty"]} st ${transaction["title"]} styck. Summa: ${transaction["transactionValue"]} <br> <br>`;
    }

}
const customer = new Customer();