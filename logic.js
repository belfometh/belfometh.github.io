const ballOne = document.getElementById("ballOne");
const ballTwo = document.getElementById("ballTwo");
const ballThree = document.getElementById("ballThree");
const ballFour = document.getElementById("ballFour");
const ballFive = document.getElementById("ballFive");
const ballSix = document.getElementById("ballSix");
const ballSeven = document.getElementById("ballSeven");
const ballEight = document.getElementById("ballEight");
const vibracionDia = document.getElementById("vibracionDia");
const vibracionMes = document.getElementById("vibracionMes");
const date_input = document.getElementById('date_input');
const numeros_input = document.getElementById('numeros_input');
const ball1 = document.getElementById("1");
const ball2 = document.getElementById("2");
const ball3 = document.getElementById("3");
const ball4 = document.getElementById("4");
const ball5 = document.getElementById("5");
const ball6 = document.getElementById("6");
const jaladores = [
    [1, 26, 51, 76],
    [2, 27, 52, 77],
    [3, 28, 53, 78],
    [4, 29, 54, 79],
    [5, 30, 55, 80],
    [6, 31, 56, 81],
    [7, 32, 57, 82],
    [8, 33, 58, 83],
    [9, 34, 59, 84],
    [10, 35, 60, 85],
    [11, 36, 61, 86],
    [12, 37, 62, 87],
    [13, 38, 63, 88],
    [14, 39, 64, 89],
    [15, 40, 65, 90],
    [16, 41, 66, 91],
    [17, 42, 67, 92],
    [18, 43, 68, 93],
    [19, 44, 69, 94],
    [20, 45, 70, 95],
    [21, 46, 71, 96],
    [22, 47, 72, 97],
    [23, 48, 73, 98],
    [24, 49, 74, 99],
    [25, 50, 75, 00]
]

let outDays = [];
let inDays = [];

const getVibracion = (date, value) => {
    if (value) {
        switch (date.getDay()) {
            case 0:
                return 7;
            case 1:
                return 3;
            case 2:
                return 8;
            case 3:
                return 9;
            case 4:
                return 1;
            case 5:
                return 6;
            case 6:
                return 5;
        }
    } else {
        switch (date.getMonth() + 1) {
            case 1:
                return 3;
            case 2:
                return 6;
            case 3:
                return 1;
            case 4:
                return 6;
            case 5:
                return 9;
            case 6:
                return 6;
            case 7:
                return 4;
            case 8:
                return 5;
            case 9:
                return 4;
            case 10:
                return 3;
            case 11:
                return 4;
            case 12:
                return 6;
        }
    }

}

date_input.addEventListener("change", (event) => {
    const currentDate = new Date(event.target.value);
    const currentMonth = (currentDate.getMonth() + 1) <= 9 ? `0${currentDate.getMonth() +1}` : currentDate.getMonth() + 1;
    const currentDay = currentDate.getUTCDate()  <= 9 ? `0${currentDate.getUTCDate()}` : currentDate.getUTCDate();
    const currentYear = numberToArray(currentDate.getFullYear());


    vibracionDia.innerHTML = getVibracion(currentDate, true);
    vibracionMes.innerHTML = getVibracion(currentDate, false);
    generateNumbers(currentDay, currentMonth, currentYear);

     ballOne.innerHTML = outDays[0];
     ballTwo.innerHTML = inDays[0];
     ballThree.innerHTML = outDays[1];
     ballFour.innerHTML = inDays[1];
     ballFive.innerHTML = inDays[2];
     ballSix.innerHTML = outDays[2];
     ballSeven.innerHTML = inDays[3];
     ballEight.innerHTML = outDays[3];


    console.log("full", event.target.value, "dia", currentDay, "mes", currentMonth, "anno", currentYear, outDays, inDays);
});

numeros_input.addEventListener("change", (event) => {
    const currentValue = event.target.value;
    let tempArray = [];

    jaladores.forEach(array => {
        if (array.includes(Number(currentValue))) {
           tempArray = array;
        }
    });

    tempArray = tempArray.filter(e => e !== Number(currentValue));

    ball1.innerHTML = ballResult(tempArray[0], 0);
    ball2.innerHTML = ballResult(tempArray[0], 1);
    ball3.innerHTML = ballResult(tempArray[1], 0);
    ball4.innerHTML = ballResult(tempArray[1], 1);
    ball5.innerHTML = ballResult(tempArray[2], 0);
    ball6.innerHTML = ballResult(tempArray[2], 1);
});

const ballResult = (number, position) => {
    let tempNumber = number <= 9 ? `0${number}` : `${number}`;
    let tempArray = tempNumber.split("");

    console.log(tempArray, tempArray[1]);

    return tempArray[position];
}

const loadDate = () => {
    let now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    let today = now.getFullYear() + '-' + month + '-' + day;

    date_input.valueAsDate = new Date(today);
}

loadDate();

const numberToArray = (myInt) => {
    let myFunc = num => Number(num);
    const intArr = Array.from(String(myInt), myFunc);
    const result = `${intArr[intArr.length - 2]}${intArr[intArr.length - 1]}`;

    //return a string
    return result;
}

const generateNumbers = (day, month, year) => {
    const dayArray = (day).toString().split("");
    const monthArray = (month).toString().split("");
    const yearArray = (year).toString().split("");

    generateArrays(dayArray, monthArray, yearArray);
}

const formateNumber = (number) => {
    let tempNumber = numberToArray(number).split("");
    let result = (Number(tempNumber[0]) + Number(tempNumber[1]));

    return result <= 9 ? `0${result}` : result;
}

const generateArrays = (array1, array2, array3) => {
    outDays = [];
    inDays = [];

    array1.forEach((day, i) => {
        let tempValueA = [
            (Number(day) + Number(array2[0])) >= 10 ? formateNumber(Number(day) + Number(array2[0])) : Number(day) + Number(array2[0]),
            (Number(day) + Number(array2[1])) >= 10 ? formateNumber(Number(day) + Number(array2[1])) : Number(day) + Number(array2[1])
        ];
        let tempValueB = [
            (Number(day) + Number(array3[0])) >= 10 ? formateNumber(Number(day) + Number(array3[0])) : Number(day) + Number(array3[0]),
            (Number(day) + Number(array3[1])) >= 10 ? formateNumber(Number(day) + Number(array3[1])) : Number(day) + Number(array3[1])
        ];

        outDays.push(i <= 0 ? Number(tempValueA[0]) : Number(tempValueB[0]));
        outDays.push(i <= 0 ? Number(tempValueA[1]) : Number(tempValueB[1]));
        inDays.push(i <= 0 ? Number(tempValueB[0]) : Number(tempValueA[0]));
        inDays.push(i <= 0 ? Number(tempValueB[1]) : Number(tempValueA[1]));
    });
}