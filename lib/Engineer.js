// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(id, email, name, gitURL){
        super(id, email, name);
        this.gitURL = this.gitURL;
    }

    getGitURL() {
        return this.gitURL;
    } 

    getRole() {
        return "Engineer";
    };
}

module.exports = Engineer;