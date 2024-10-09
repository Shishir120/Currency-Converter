rateUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`;


let containerFrom = document.querySelector("#container-select-from");
let containerTo = document.querySelector("#container-select-to");

let input = document.querySelector(".container-form input");

let exchangeRateMsg = document.querySelector(".container-exchange-rate-msg");

let convertBtn = document.querySelector("#action-btn");

let flagImgFrom = document.querySelector("#flag-img-from");
let flagImgTo = document.querySelector("#flag-img-to");

let swapIcon = document.querySelector("#swap-icon");


// Display list of all countries in countryList.js folder
const displayCountry = () => {

    // Looping over returned array of keys from countryList var in countryList.js folder
    Object.keys(countryList).forEach((country) => {

        let optionFrom = document.createElement("option");
        optionFrom.innerText = country;
        containerFrom.append(optionFrom);
    
        let optionTo = document.createElement("option");
        optionTo.innerText = country;
        containerTo.append(optionTo);
    })

}


// To fetch the exchange rate and perform conversion
let getRate = async() => {

    let currencyCodeFrom = containerFrom.options[containerFrom.selectedIndex].innerText;
    let currencyCodeTo = containerTo.options[containerTo.selectedIndex].innerText;

    let response = await fetch(`${rateUrl}/${currencyCodeFrom.toLowerCase()}.json`);
    let data = await response.json();
    
    let exchangeRate = data[currencyCodeFrom.toLowerCase()][currencyCodeTo.toLowerCase()];
    let totalAmount = input.value * exchangeRate;

    exchangeRateMsg.innerText = `${currencyCodeFrom} ${input.value} = ${currencyCodeTo} ${totalAmount}`;
}


let displayFlag = () => {

    let currencyCodeFrom = containerFrom.options[containerFrom.selectedIndex].innerText;
    let currencyCodeTo = containerTo.options[containerTo.selectedIndex].innerText;

    Object.keys(countryList).forEach((curr) => {
        if (curr === currencyCodeFrom) {
            flagImgFrom.src = `https://flagsapi.com/${countryList[curr]}/flat/48.png`;
            console.log(countryList[curr]);
        
        } else if (curr === currencyCodeTo) {
            flagImgTo.src = `https://flagsapi.com/${countryList[curr]}/flat/48.png`;
        }
    })
}


containerFrom.addEventListener("change", () => {
    displayFlag();
});


containerTo.addEventListener("change", () => {
    displayFlag();
});


convertBtn.addEventListener("click", (event) => {
    event.preventDefault();
    getRate();
});

swapIcon.addEventListener("click", () => {

    const fromSelected = containerFrom.options[containerFrom.selectedIndex];
    const toSelected = containerTo.options[containerTo.selectedIndex];

    const tempValue = fromSelected.innerText;
    
    fromSelected.innerText = toSelected.innerText;
    toSelected.innerText = tempValue;
    getRate();
    displayFlag();
})

displayCountry();