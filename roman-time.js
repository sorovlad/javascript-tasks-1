(function() {
    'use strict';    
    var time = new Time(process.argv[2], process.argv[3]);

    if (!time.isCorrect()) {
        console.log(time.errors);
        process.exit(1);
    }

    var timeStr = convertTimeToRoman(time.hours, time.minutes);

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

        for (var i = 0; i < mul; i += 1) {
            newStr += str;
        }
        return newStr;
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

        for (var k = 0; k < 4; k += 1 ) {
            for (var i = 0; i < romanNumber.length; i += 1 ) {
                asciArt += textToAsci[romanNumber.charAt(i)][k] + " ";
            }
            asciArt += "\n";
        }
        return asciArt;
    }
    function Time(hours, minutes) {
        this.errors = false;
        this.hours = hours === undefined ? undefined : Number(hours);
        this.minutes = minutes === undefined ? undefined : Number(minutes);

        this.isCorrect = function(){
            if (this.hours === undefined) {
                this.errors = "Первый аргумент не существует.";
                return false;
            }
            if (this.minutes === undefined) {
                this.errors = "Второй аргумент не существует.";
                return false;
            }            
            if (!Number.isInteger(this.hours)) {
                this.errors = "Первый аргумент не является целым числом.";
                return false;
            }
            if (!Number.isInteger(this.minutes)) {
                this.errors = "Второй аргумент не является целым числом.";
                return false;
            }
           if (this.hours > 23 || this.hours < 0) {
                this.errors = "Значение часа не попадает в интервал от 0 до 23.";
                return false;
            }
            if (this.minutes > 59 || this.minutes < 0) {
                this.errors = "Значение минут не попадает в интервал от 0 до 59.";
                return false;
            } 
            return true;
        } 
    }

}());
