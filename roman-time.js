(function() {
    'use strict';
    var hours = process.argv[2];
    var minutes = process.argv[3];
    var error, timeStr;

    error = checkCorrect(hours, minutes);
    if (error) {
        console.log(error);
        process.exit(1);
    }

    timeStr = convertTimeToRoman(hours, minutes);

    console.log(timeStr);
    console.log(convertToAscii(timeStr));


    function convertTimeToRoman(hours, minutes) {
        var hoursInRoman = convertToRoman(hours);
        var minutesInRoman = convertToRoman(minutes);

        return hoursInRoman + ":" + minutesInRoman;
    }

    function convertToRoman(arabicNumeral) {
        var romanNumeral = "";
        var tenNumeral = Math.floor(arabicNumeral / 10);

        if (tenNumeral === 5) {
            romanNumeral = "L";
        }
        if (tenNumeral === 4) {
            romanNumeral = "XL";
        }
        if (tenNumeral < 4 && tenNumeral > 0) {
            romanNumeral = multiplySting("X", tenNumeral);
        }
        if (arabicNumeral % 10 === 0 && tenNumeral > 0) {
            return romanNumeral;
        }
        return romanNumeral + convertNineNumberToRoman(arabicNumeral % 10);
    }

    function convertNineNumberToRoman(arabicNumeral) {
        if (arabicNumeral === 9) {
            return "IX";
        }
        if (arabicNumeral >= 5 && arabicNumeral < 9) {
            return "V" + multiplySting("I", arabicNumeral % 5);
        }
        if (arabicNumeral === 4) {
            return "IV";
        }
        if (arabicNumeral < 4 && arabicNumeral > 0) {
            return multiplySting("I", arabicNumeral % 5);
        }
        if (arabicNumeral === 0) {
            return "—";
        }
        return false;
    }

    function multiplySting(str, mul) {
        var newStr = "";
        var i;

        for (i = 0; i < mul; i += 1) {
            newStr += str;
        }
        return newStr;
    }

    function checkCorrect(hours, minutes) {

        if (hours === undefined) {
            return "Первый аргумент не существует.";
        }
        if (minutes === undefined) {
            return "Второй аргумент не существует.";
        }

        hours = Number(hours);
        minutes = Number(minutes);

        if (!Number.isInteger(hours)) {
            return "Первый аргумент не является целым числом.";
        }
        if (!Number.isInteger(minutes)) {
            return "Второй аргумент не является целым числом.";
        }
        if (hours > 23 || hours < 0) {
            return "Значение часа не попадает в интервал от 0 до 23.";
        }
        if (minutes > 59 || minutes < 0) {
            return "Значение минут не попадает в интервал от 0 до 59.";
        }
        return false;
    }

    function convertToAscii(romanNumber) {
        var textToAsci = {
            L: {
                0: "||     ",
                1: "||     ",
                2: "||____ ",
                3: "||____|"
            },
            I: {
                0: "||",
                1: "||",
                2: "||",
                3: "||"
            },
            V: {
                0: "\\\\    //",
                1: " \\\\  // ",
                2: "  \\\\//  ",
                3: "   ||   "
            },
            X: {
                0: "\\\\  //",
                1: " \\\\// ",
                2: " //\\\\ ",
                3: "//  \\\\"
            },
            ":": {
                0: " _ ",
                1: "|-|",
                2: "   ",
                3: "|_|"
            },
            "—": {
                0: "    ",
                1: "____",
                2: "||||",
                3: "    "
            }

        }
        var asciArt = "";
        var k, i;

        for (k = 0; k < 4; k += 1 ) {
            for (i = 0; i < romanNumber.length; i += 1 ) {
                asciArt += textToAsci[romanNumber.charAt(i)][k] + " ";
            }
            asciArt += "\n";
        }
        return asciArt;
    }
}());
