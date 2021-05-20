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

const askGeneralQuestions = [
    {
        type: "input",
        message: "Team Name",
        name: "name"
    },

    {
        type: "input",
        message: "Team ID",
        name: "id"
    },

    {
        type: "input",
        message: "Team Email",
        name: "email"
    }
]

//Questions specific to manager
const askManagerQuestion = {
    type: "input",
    message: "Team Office Number",
    name: "officeNumber"
}

//Questions specific to engineer
const askEngineerQuestions = 
    {
        type: "input",
        message: "Engineer Github",
        name: "gitHub"
    }

//Questions specific to intern
const askInternQuestions = 
    {
        type: "input",
        message: "Intern School",
        name: "school"
    }


//This uses inquire to gather info and create objects
const askManagerQuestions = () => {
    return inquirer.prompt([...askGeneralQuestions, askManagerQuestion])
    .then(managerOutput => {
        
        //Object Destructuring 
        const {name,id,email,officeNumber}=managerOutput
        employees.push(new Manager(name, id, email, officeNumber))
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
    return  inquirer.prompt([...askGeneralQuestions, askEngineerQuestions])
    .then(engineerOutput=> {
       
        const {name,id,email,gitHub}=engineerOutput
        employees.push(new Engineer(name,id,email,gitHub))
        addEmployee();
    })
}

const internQuestions = () => {

    return inquirer.prompt([...askGeneralQuestions, askInternQuestions])
        .then(internOutput => {


            const {name,id,email,school}=internOutput
            employees.push(new Intern(name, id, email, school))
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