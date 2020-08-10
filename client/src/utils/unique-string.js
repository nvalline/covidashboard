exports.__esModule = true;
var UniqueString = /** @class */ (function () {
    // set the defaults of the member variables
    function UniqueString() {
        this.specialCharacters = "_-~.";
        this.letters = "abcdefghijklmnopqrstuvwxyz";
        // method bindings
        this.getRandomLetter = this.getRandomLetter.bind(this);
        this.getRandomCharacter = this.getRandomCharacter.bind(this);
    }
    // method to generate a random alphabet
    UniqueString.prototype.getRandomLetter = function () {
        return this.letters[Math.floor(Math.random() * 25)];
    };
    // method to generate a random special character
    UniqueString.prototype.getRandomCharacter = function () {
        return this.specialCharacters[Math.floor(Math.random() * 3)];
    };
    // method to generate a unique string
    UniqueString.prototype.generate = function () {
        // generate a random number, and remove the decimal point from it
        var potentialId = Math.random()
            .toString()
            .slice(2);
        /* convert the potentialId string into an array,
         * so we can use splice method on it
         */
        potentialId = Array.from(potentialId);
        /* the following codes will each generate a random character,
         * upper-cased and lower-cased letters based on the
         * special characters and letters provided. If they aren't provide,
         * the default values are used.
         * Then, it'll insert them in the random number generated.
         */
        potentialId.splice(
            4,
            0,
            this.getRandomCharacter(),
            this.getRandomLetter().toLowerCase(),
            this.getRandomLetter().toUpperCase()
        );
        potentialId.splice(
            9,
            0,
            this.getRandomCharacter(),
            this.getRandomLetter().toUpperCase(),
            this.getRandomLetter().toLowerCase()
        );
        potentialId.splice(
            14,
            0,
            this.getRandomCharacter(),
            this.getRandomLetter().toUpperCase(),
            this.getRandomLetter().toLowerCase()
        );
        potentialId.splice(
            19,
            0,
            this.getRandomCharacter(),
            this.getRandomLetter().toUpperCase(),
            this.getRandomLetter().toLowerCase()
        );
        // this doesn't generate random letters
        potentialId.splice(24, 0, this.getRandomCharacter());
        /* join the potentialId array into a string
         * and return it.
         */
        return potentialId.join("");
    };
    return UniqueString;
})();
var id = new UniqueString();
// console.log(id.generate());
exports["default"] = UniqueString;
