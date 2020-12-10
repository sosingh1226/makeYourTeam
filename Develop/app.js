// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "./team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function inputEmployee (){
    inquirer.prompt([
        {
        type: "list",
        message: "choose a job title",
        name: "jobTitleInput",
        choices: [
            "engineer",
            "manager",
            "intern",
        ]
        },
    ])
    .then((res) => {
    console.log(res);
    if (res.jobTitleInput === "engineer"){
    engineerInfo();
    } else if (res.jobTitleInput === "manager"){
    managerInfo();
    }else if (res.jobTitleInput === "intern")
    internInfo();
    });

    // addMore();
}

inputEmployee();

function managerInfo () {
    console.log ("taking manager info")
    inquirer.prompt([
        {
        type: "input",
        name: "managerName",
        message: "What is your manager's name?",
        },
        {
        type: "input",
        name: "managerId",
        message: "What is your manager's ID?",
        },
        {
            type: "input",
            name: "managerEmail",
            message: "What is your manager's email?",
        },
        {
            type: "input",
            name: "managerOfficeNumber",
            message: "What is your manager's office number?",
        }
    ])
    .then (data =>{
        console.log (data);
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.managerOfficeNumber)
        console.log (manager);
        teamMembers.push(manager);
        output();
    })
    
}


function engineerInfo () {
    console.log ("taking engineer info")
    inquirer.prompt([
        {
        type: "input",
        name: "engineerName",
        message: "What is your engineer's name?",
        },
        {
            type: "input",
            name: "engineerId",
            message: "What is your engineer's ID?",
        },
        {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer's email?",
        },
            {
            type: "input",
            name: "engineerGithub",
            message: "What is your engineer's GitHub username?",
        },
    ])
    .then (data =>{
        console.log (data);
        const engineer = new Engineer(data.engineerName, data.engineerId, data.engineerEmail, data.engineerGithub)
        console.log (engineer);
        console.log(data.engineerName);
        console.log(data.engineerId);
        console.log(data.engineerEmail);
        console.log(data.engineerGithub);

        teamMembers.push(engineer);

        console.log(teamMembers)

        output();
    })

    
};

function internInfo () {
    console.log ("taking intern info")
    inquirer.prompt([
        {
        type: "input",
        name: "internName",
        message: "What is your intern's name?",
        },
        {
            type: "input",
            name: "internId",
            message: "What is your intern's ID?",
        },
        {
            type: "input",
            name: "internEmail",
            message: "What is your intern's email?",
        },
            {
                type: "input",
                name: "internSchool",
                message: "What is your intern's School?",
        },
    ])
    .then (data =>{
        console.log (data);
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internGithub)
        console.log (intern);
        teamMembers.push(intern);

        output();
    });
    
    
};

function addMore () {
    inquirer.prompt([
    {
    type: "confirm",
    message: "add more employees?",
    name: "confirmEmployee",
    default: true
    }])
    .then((ans) => {
    // console.log(yes);
    if (ans.confirmEmployee === true){
    inputEmployee();
    } else {
    output();
    return "done";
    }
})
}


// Function to take gathered information and create html file using the htmlRender.js
function output () {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
    if (err) {
    return console.log(err);
    }
    console.log("Success!");
    })
}