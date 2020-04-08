// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(id, email, name, office){
        super(id, email, name);
        this.office = this.office;
    }

    getGitURL() {
        return this.office;
    } 

    getRole() {
        return "Manager";
    };
}

module.exports = Manager;