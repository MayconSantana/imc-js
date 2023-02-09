//IMC Data
const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Menor que 18,5",
      info: "Magreza",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
];

// Declaração de Variáveis
const imcContainer = document.querySelector('.imc-container');
const tableContainer = document.querySelector('.table-container');
const tableGroup = document.querySelector('.table-group');

const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

const sendBtn = document.querySelector('button#send');
const cleanBtn = document.querySelector('button#clean');
const backBtn = document.querySelector('button#back');

const imcNumber = document.querySelector('#imcNumber');
const imcInfo = document.querySelector('#imcInfo');

//Funções
function createTable(data){
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("line");

        const classification = document.createElement('p');
        classification.innerText = item.classification; 

        const info = document.createElement('p');
        info.innerHTML = item.info;

        const obesity = document.createElement('p');
        obesity.innerHTML = item.obesity;

        div.appendChild(classification);
        div.appendChild(info);
        div.appendChild(obesity);

        tableGroup.appendChild(div);
    })
}

const cleanInputs = () =>{
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
}

const validDigits = (text) =>{
    return text.replace(/[^0-9,]/g, "");
}

const changeWindow = () => {
    imcContainer.classList.toggle('hide');
    tableContainer.classList.toggle('hide');
}

const calcImc = (height, weight) => {
    const imc = (weight / (height*height)).toFixed(1);
    return imc;
}

//Inicialização
createTable(data);

//Eventos
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    })
})


sendBtn.addEventListener("click", ()=>{
    if (!heightInput.value || !weightInput.value) return;

    const height = +heightInput.value.replace(",",".");
    const weight = +weightInput.value.replace(",",".");

    const imc = calcImc(height, weight);
    let info;

    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max){
            info = item.info;
        }
    });

    if (!info) return;

    imcNumber.innerHTML = imc;
    imcInfo.innerHTML = info;

    switch(info){
        case "Magreza":
            imcNumber.classList.add('low');
            imcInfo.classList.add('low');
        break;

        case "Normal":
            imcNumber.classList.add('good');
            imcInfo.classList.add('good');
        break;

        case "Sobrepeso":
            imcNumber.classList.add('low');
            imcInfo.classList.add('low');
        break;

        case "Obesidade":
            imcNumber.classList.add('medium');
            imcInfo.classList.add('medium');
        break;

        case "Obesidade grave":
            imcNumber.classList.add('bad');
            imcInfo.classList.add('bad');
        break;
    }

    changeWindow();
})

cleanBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    cleanInputs();
})

backBtn.addEventListener("click", () => {
    changeWindow();
    cleanInputs();
})