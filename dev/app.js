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

const outputDir = path.resolve(__dirname, "output")
const writeFileAsync = util.promisify(fs.writeFile)


const questions = [

    {
        type: "input",
        message: "What is Manger Name:",
        name: "name",
    },

    {
        type: "input",
        message: "Manager Id",
        name: "id"
    },

    {
        type: "input",
        message: "Manager EmailAddress",
        name: "email"
    },


    {
        type: "input",
        message: "Manager office number",
        name: "officeNumber"
    },

];

class App {

    askQuestions() {
        return inquirer.prompt(questions).then( val => {
            let manager = new Manager(val.name, val.id, val.email, val.officeNumber)
            console.log(`line 50 app.js ${val.name}, ${val.id}, ${val.email}, ${val.officeNumber}`)
            console.log(`\n output path ${manager} \n`)
            render(manager);
        })
    }
}

let test = new App()
test.askQuestions()