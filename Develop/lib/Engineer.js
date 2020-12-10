// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")

class Engineer extends Employee {
    constructor (name, id, email, github)
    {
        super(name, id, email);
        this.github = github;
        console.log("engineer obj instantiated...");
        console.log(name);
        console.log(id);
        console.log(email);
        console.log(github);

    }

    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;