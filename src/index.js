const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const existingConfig = fs.existsSync('now.json');

console.log(process.cwd());

function buildConfig() {
  inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What is the name of your Project?',
        default: path.basename(process.cwd())
      }
    ])
    .then(answers => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('Bye! 👧');
      }
    });
}

if (existingConfig) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: 'now.json already exists! Would you like to overwrite it?',
        default: false
      }
    ])
    .then(answers => {
      if (answers.overwrite) {
        buildConfig();
      } else {
        console.log('Bye! 👧');
      }
    });
} else {
  buildConfig();
}
