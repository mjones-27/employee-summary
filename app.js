const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = []

function start() {
    inquirer
        .prompt([
            {
                type: "confirm",
                name: "choice",
                message: "Enter new hire?"
            }
        ]).then(selection => {
            if (selection.choice) {
                newHire();
            } else {
                end();
            }
        })
}

function newHire() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Employee name: ",
                name: "name"
            },
            {
                type: "input",
                message: "Employee ID: ",
                name: "id"
            },
            {
                type: "input",
                message: "Employee eMail: ",
                name: "email"
            },
            {
                type: "list",
                message: "Employee function: ",
                choices: ["Engineer", "Intern", "Manager"],
                name: "employeeRole"
            },
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
        ]).then(function (response) {
            switch (response.employeeRole) {
                case "Intern":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "University: ",
                                name: "school"
                            }
                        ]).then(function (res) {
                            let newEmp = new Intern(response.name, response.id, response.email, res.school)
                            employeeArr.push(newEmp)
                            start();
                        })
                    break;
                case "Engineer":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Github username: ",
                                name: "github"
                            }
                        ]).then(function (res) {
                            let newEmp = new Engineer(response.name, response.id, response.email, res.github)
                            employeeArr.push(newEmp)
                            start();

                        })
                    break;             
                case "Manager":
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Office number: ",
                                name: "officeNumber"
                            }
                        ]).then(function (res) {
                            let newEmp = new Manager(response.name, response.id, response.email, res.officeNumber)
                            employeeArr.push(newEmp)
                            start();
                        })
                    break;
            }
        })
}

function end() {

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

    let renderCards = render(employeeArr)
    fs.writeFile("output/team.html", renderCards, function(err){
    if(err){
        return console.log(err);
    }
    console.log("muster list created")
     })
}

start();


// TODO: Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// /̶/̶ A̶f̶t̶e̶r̶ y̶o̶u̶ h̶a̶v̶e̶ y̶o̶u̶r̶ h̶t̶m̶l̶,̶ y̶o̶u̶'̶r̶e̶ n̶o̶w̶ r̶e̶a̶d̶y̶ t̶o̶ c̶r̶e̶a̶t̶e̶ a̶n̶ H̶T̶M̶L̶ f̶i̶l̶e̶ u̶s̶i̶n̶g̶ t̶h̶e̶ H̶T̶M̶L̶
// /̶/̶ r̶e̶t̶u̶r̶n̶e̶d̶ f̶r̶o̶m̶ t̶h̶e̶ `̶r̶e̶n̶d̶e̶r̶`̶ f̶u̶n̶c̶t̶i̶o̶n̶.̶ N̶o̶w̶ w̶r̶i̶t̶e̶ i̶t̶ t̶o̶ a̶ f̶i̶l̶e̶ n̶a̶m̶e̶d̶ `̶t̶e̶a̶m̶.̶h̶t̶m̶l̶`̶ i̶n̶ t̶h̶e̶
// /̶/̶ `̶o̶u̶t̶p̶u̶t̶`̶ f̶o̶l̶d̶e̶r̶.̶ Y̶o̶u̶ c̶a̶n̶ u̶s̶e̶ t̶h̶e̶ v̶a̶r̶i̶a̶b̶l̶e̶ `̶o̶u̶t̶p̶u̶t̶P̶a̶t̶h̶`̶ a̶b̶o̶v̶e̶ t̶a̶r̶g̶e̶t̶ t̶h̶i̶s̶ l̶o̶c̶a̶t̶i̶o̶n̶.̶

// /̶/̶ H̶I̶N̶T̶:̶ e̶a̶c̶h̶ e̶m̶p̶l̶o̶y̶e̶e̶ t̶y̶p̶e̶ (̶m̶a̶n̶a̶g̶e̶r̶,̶ e̶n̶g̶i̶n̶e̶e̶r̶,̶ o̶r̶ i̶n̶t̶e̶r̶n̶)̶ h̶a̶s̶ s̶l̶i̶g̶h̶t̶l̶y̶ d̶i̶f̶f̶e̶r̶e̶n̶t̶
// /̶/̶ i̶n̶f̶o̶r̶m̶a̶t̶i̶o̶n̶;̶ w̶r̶i̶t̶e̶ y̶o̶u̶r̶ c̶o̶d̶e̶ t̶o̶ a̶s̶k̶ d̶i̶f̶f̶e̶r̶e̶n̶t̶ q̶u̶e̶s̶t̶i̶o̶n̶s̶ v̶i̶a̶ i̶n̶q̶u̶i̶r̶e̶r̶ d̶e̶p̶e̶n̶d̶i̶n̶g̶ o̶n̶
// /̶/̶ e̶m̶p̶l̶o̶y̶e̶e̶ t̶y̶p̶e̶.̶

// /̶/̶ H̶I̶N̶T̶:̶ m̶a̶k̶e̶ s̶u̶r̶e̶ t̶o̶ b̶u̶i̶l̶d̶ o̶u̶t̶ y̶o̶u̶r̶ c̶l̶a̶s̶s̶e̶s̶ f̶i̶r̶s̶t̶!̶ R̶e̶m̶e̶m̶b̶e̶r̶ t̶h̶a̶t̶ y̶o̶u̶r̶ M̶a̶n̶a̶g̶e̶r̶,̶ E̶n̶g̶i̶n̶e̶e̶r̶,̶
// /̶/̶ a̶n̶d̶ I̶n̶t̶e̶r̶n̶ c̶l̶a̶s̶s̶e̶s̶ s̶h̶o̶u̶l̶d̶ a̶l̶l̶ e̶x̶t̶e̶n̶d̶ f̶r̶o̶m̶ a̶ c̶l̶a̶s̶s̶ n̶a̶m̶e̶d̶ E̶m̶p̶l̶o̶y̶e̶e̶;̶ s̶e̶e̶ t̶h̶e̶ d̶i̶r̶e̶c̶t̶i̶o̶n̶s̶
// /̶/̶ f̶o̶r̶ f̶u̶r̶t̶h̶e̶r̶ i̶n̶f̶o̶r̶m̶a̶t̶i̶o̶n̶.̶ B̶e̶ s̶u̶r̶e̶ t̶o̶ t̶e̶s̶t̶ o̶u̶t̶ e̶a̶c̶h̶ c̶l̶a̶s̶s̶ a̶n̶d̶ v̶e̶r̶i̶f̶y̶ i̶t̶ g̶e̶n̶e̶r̶a̶t̶e̶s̶ a̶n̶ 
// /̶/̶ o̶b̶j̶e̶c̶t̶ w̶i̶t̶h̶ t̶h̶e̶ c̶o̶r̶r̶e̶c̶t̶ s̶t̶r̶u̶c̶t̶u̶r̶e̶ a̶n̶d̶ m̶e̶t̶h̶o̶d̶s̶.̶ T̶h̶i̶s̶ s̶t̶r̶u̶c̶t̶u̶r̶e̶ w̶i̶l̶l̶ b̶e̶ c̶r̶u̶c̶i̶a̶l̶ i̶n̶ o̶r̶d̶e̶r̶
// /̶/̶ f̶o̶r̶ t̶h̶e̶ p̶r̶o̶v̶i̶d̶e̶d̶ `̶r̶e̶n̶d̶e̶r̶`̶ f̶u̶n̶c̶t̶i̶o̶n̶ t̶o̶ w̶o̶r̶k̶!̶`̶`̶`̶