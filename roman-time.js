var hours = process.argv[2];
var minutes = process.argv[3];

hours = +hours;
minutes = +minutes;

if (checkCorrect(hours, minutes))
{
    var timeStr = convertTimeToRoman(hours, minutes);
    console.log(timeStr);
    console.log(convertToAscii(timeStr));
}
else
    console.log("Время указано не верно");

function convertTimeToRoman(hours, minutes)
{
    var hoursInRoman = convertToRoman(hours);
    var minutesInRoman = convertToRoman(minutes);
    return hoursInRoman + ":" + minutesInRoman;
}

function convertToRoman(arabicNumeral)
{
    var romanNumeral;
    var tenNumeral = (arabicNumeral / 10)>>0;
    if (tenNumeral >= 5)
    	romanNumeral = "L" + convertNineNumberToRoman(arabicNumeral % 10);
    if(tenNumeral >= 4 && tenNumeral < 5)
    	romanNumeral = "XL" + convertNineNumberToRoman(arabicNumeral % 10)
    if(tenNumeral < 4)
    	romanNumeral = multiplySting("X", tenNumeral) + convertNineNumberToRoman(arabicNumeral % 10);

    return romanNumeral;
}

function convertNineNumberToRoman(arabicNumeral)
{
    var romanNumeral;
    if (arabicNumeral == 9)
    	romanNumeral = "IX";
    if(arabicNumeral >= 5 && arabicNumeral < 9)
    	romanNumeral = "V" + multiplySting("I", arabicNumeral % 5);
    if(arabicNumeral == 4)
    	romanNumeral = "IV";
    if(arabicNumeral < 4)
    	romanNumeral = multiplySting("I", arabicNumeral % 5);
    if(arabicNumeral == 0)
        romanNumeral = "—";
    return romanNumeral;
}

function multiplySting(str, mul)
{
    var newStr = "";
    for(var i=0; i < mul; i ++)
        newStr += str;
    return newStr
}


function checkCorrect(hours, minutes)
{
    //Магия переехала сюда
    if (hours % 1 !== 0 || minutes % 1 !== 0) {
        return false;
    }
    if(hours > 23 || hours < 0 || minutes > 59 || minutes < 0)
        return false;
    return true;
}


function convertToAscii(romanNumber)
{
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
		"—":{
			0: "    ",
			1: "____",
			2: "||||",
			3: "    "
		}
	 }
	var asciArt = "";
	for(var k = 0; k < 4; k++)
	{
		for(var i = 0; i < romanNumber.length; i++)
		{
			asciArt += textToAsci[romanNumber.charAt(i)][k] + " ";
		}
		asciArt += "\n";
	}
	return asciArt;
}
