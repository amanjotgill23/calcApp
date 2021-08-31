"use strict";

var resultShown = false;

// function to display clicked number
function dis(x) {
    if (resultShown === true) {
        clr();
        resultShown = false;
    }
    document.getElementById("display").value+=x;
}

// function to display clicked operator
function disOp(y) {
    let currentDisplay = document.getElementById("display").value;
    let lastDigit = currentDisplay.charAt(currentDisplay.length - 1);
    if (currentDisplay === "") {
        alert("Please enter a number first");
    } else {
        switch (lastDigit) {
            case "-":
            case "+":
            case "*":
            case "/":
                var newDisplay =  currentDisplay.substr(0,[currentDisplay.length - 1]) + y;
                document.getElementById("display").value = newDisplay;
                break;
            default:
                document.getElementById("display").value+=y;            
        }
    }
    resultShown = false;
}

// function to calculate
function calc() {
    var currentDisplay = document.getElementById("display").value;
    var inputArray = currentDisplay.split(/([-,+,*,/])/);

    if (inputArray[1] === "-") {
        inputArray.splice(0, 3, inputArray[1] + inputArray[2]);
    }
    
    var divide = inputArray.indexOf("/");
    while (divide != -1) {
        inputArray.splice((divide - 1), 3, (inputArray[divide - 1] / inputArray[divide + 1]));
        divide = inputArray.indexOf("/");
    }

    var multiply = inputArray.indexOf("*");
    while (multiply != -1) {
        inputArray.splice((multiply - 1), 3, (inputArray[multiply - 1] * inputArray[multiply + 1]));
        multiply = inputArray.indexOf("*");
    }    

    var add = inputArray.indexOf("+");
    while (add != -1) {
        inputArray.splice((add - 1), 3, (parseFloat(inputArray[add - 1]) + parseFloat(inputArray[add + 1])));
        add = inputArray.indexOf("+");
    }

    var sub = inputArray.indexOf("-");
    while (sub != -1) {
        inputArray.splice((sub - 1), 3, (inputArray[sub - 1] - inputArray[sub + 1]));
        sub = inputArray.indexOf("-");
    }

    document.getElementById("display").value = inputArray[0];
    resultShown = true;
}

// function to clear display
function clr() {
    document.getElementById("display").value = "";
}