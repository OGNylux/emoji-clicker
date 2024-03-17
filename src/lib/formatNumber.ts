export function formatNumber(num: number) {
    for (let i = 0; i < stringNumbers.length; i++) {
        const lowerBound = 1000 ** i;
        const upperBound = 1000 ** (i+1);
        if (num < 1e+6) return num.toLocaleString("de-DE");
        if (num < upperBound && num >= lowerBound) {
            const newNum: string = (Math.round((num / lowerBound)  * 1000) / 1000).toLocaleString("de-DE");
            return newNum + " " + stringNumbers[i];
        }
    }
}

const stringNumbers = [
    "",
    "",
    "Million",
    "Billion",
    "Trillion",
    "Quadrillion",
    "Quintillion",
    "Sextillion",
    "Septillion",
    "Octillion",
    "Nonillion",
    "Decillion",
    "Undecillion",
    "Duodecillion",
    "Tredecillion",
    "Quattuordecillion",
    "Quindecillion",
    "Sexdecillion",
    "Septendecillion",
    "Octodecillion",
    "Novemdecillion",
    "Vigintillion",
    "Unvigintillion",
    "Duovigintillion",
    "Trevigintillion",
    "Quattuorvigintillion",
    "Quinvigintillion",
    "Sexvigintillion",
    "Septenvigintillion",
    "Octovigintillion",
    "Novemvigintillion",
    "Trigintillion",
    "Untrigintillion",
    "Duotrigintillion",
    "Tretrigintillion",
    "Quattuortrigintillion",
    "Quintrigintillion",
    "Sextrigintillion",
    "Septentrigintillion",
    "Octotrigintillion",
    "Novemtrigintillion",
    "Quadragintillion",
    "Unquadragintillion",
    "Duoquadragintillion",
    "Trequadragintillion",
    "Quattuorquadragintillion",
    "Quinquadragintillion",
    "Sexquadragintillion",
    "Septenquadragintillion",
    "Octoquadragintillion",
    "Novemquadragintillion",
    "Quinquagintillion",
    "Unquinquagintillion",
    "Duoquinquagintillion",
    "Trequinquagintillion",
    "Quattuorquinquagintillion",
    "Quinquinquagintillion",
    "Sexquinquagintillion",
    "Septenquinquagintillion",
    "Octoquinquagintillion",
    "Novemquinquagintillion",
    "Sexagintillion",
    "Unsexagintillion",
    "Duosexagintillion",
    "Tresexagintillion",
    "Quattuorsexagintillion",
    "Quinsexagintillion",
    "Sexsexagintillion",
    "Septensexagintillion",
    "Octosexagintillion",
    "Novemsexagintillion",
    "Septuagintillion",
    "Unseptuagintillion",
    "Duoseptuagintillion",
    "Treseptuagintillion",
    "Quattuorseptuagintillion",
    "Quinseptuagintillion",
    "Sexseptuagintillion",
    "Septenseptuagintillion",
    "Octoseptuagintillion",
    "Novemseptuagintillion",
    "Octogintillion",
    "Unoctogintillion",
    "Duooctogintillion",
    "Treoctogintillion",
    "Quattuoroctogintillion",
    "Quinoctogintillion",
    "Sexoctogintillion",
    "Septenoctogintillion",
    "Octooctogintillion",
    "Novemoctogintillion",
    "Nonagintillion",
    "Unnonagintillion",
    "Duononagintillion",
    "Trenonagintillion",
    "Quattuornonagintillion",
    "Quinnonagintillion",
    "Sexnonagintillion",
    "Septennonagintillion",
    "Octononagintillion",
    "Novemnonagintillion",
    "Centillion"
];