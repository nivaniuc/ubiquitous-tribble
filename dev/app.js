const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util")

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const writeFileAsync = util.promisify(fs.writeFile)


const employees = []

//This uses inquire to gather info and create objects
const managerQuestions = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Manager Name?",
            name: "name"
        },

        {
            type: "input",
            message: "Manager ID:",
            name: "id"
        },

        {
            type: "input",
            message: "Manager Email:",
            name: "email"
        },
        {
            type: "input",
            message: "Manager Office Number:",
            name: "officeNumber"
        }
    ]).then(managerOutput => {
        employees.push(new Manager(managerOutput.name, managerOutput.id, managerOutput.email, managerOutput.officeNumber))
        addEmployee();
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of employee are you creating?",
            name: "role",
            choices: [
                "Engineer",
                "Intern",
                "Exit"
            ]
        },
    ]).then(addEmployee => {

        console.log(addEmployee)
        if (addEmployee.role === "Engineer") {
            engineerQuestions()
        }
        else if (addEmployee.role === "Intern") {
            internQuestions()
        }
        else if (addEmployee.role === "Exit") {
            // After all the desired inputs for employees are made, call the render function
            renderHtml()
        }
    })
}

const engineerQuestions = () => {
    return inquirer.prompt([

        {
            type: "input",
            message: "Engineer Name",
            name: "name"
        },

        {
            type: "input",
            message: "Engineer ID",
            name: "id"
        },

        {
            type: "input",
            message: "Engineer Email",
            name: "email"
        },
        {
            type: "input",
            message: "Engineer's Github",
            name: "gitHub"
        },
    ]).then(engineerAnswer => {
        employees.push(new Engineer(engineerAnswer.name, engineerAnswer.id, engineerAnswer.email, engineerAnswer.gitHub))
        addEmployee();
    })
}

const internQuestions = () => {
    return inquirer.prompt([

        {
            type: "input",
            message: "Intern Name:",
            name: "name"
        },

        {
            type: "input",
            message: "Intern ID:",
            name: "id"
        },

        {
            type: "input",
            message: "Intern Email",
            name: "email"
        },
        {
            type: "input",
            message: "Intern School",
            name: "school"
        },
    ]).then(internAnswer => {
        employees.push(new Intern(internAnswer.name, internAnswer.id, internAnswer.email, internAnswer.school))
        addEmployee();
    })
}

function renderHtml() {
    const outputData = render(employees);
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
        writeFileAsync(outputPath, outputData)
    }
    else {
        fs.writeFileSync(outputPath, outputData);
    }
}

init()
function init() {
    askManagerQuestions();
} 