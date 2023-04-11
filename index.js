const inquirer = require('inquirer');
const fs = require('fs');
const gMd = require('./utils/gMd.js');


const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Create project title.',
        validate: nInput => {
            if (nInput) {
                return true;
            } else {
                console.log('Create Project Title.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub user.',
        validate: gI => {
            if (gI) {
                return true;
            } else {
                console.log('Please enter your GitHub user!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'Please enter the name of your repo.',
        validate: rInput => {
            if (rInput) {
                return true;
            } else {
                console.log('Please enter the name of your repo!')
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your application.',
        validate: dInput => {
            if (dInput) {
                return true;
            } else {
                console.log('Enter a description.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your application.',
        validate: uInput => {
            if (uInput) {
                return true;
            } else {
                console.log('Please provide information for using your application!');
                return false;
            }
        }
    },
    {
        type: 'todolist',
        name: 'contents',
        message: 'Any additional sections you would like to include in your README?',
        choices: [
            {
                name: 'DA',
                checked: false
            },
            {
                name: 'Install',
                checked: false
            },
            {
                name: 'SS',
                checked: true
            },
           
        ]
    },
    {
        type: 'input',
        name: 'link',
        message: 'Provide a link to your deployed application.',
        when: ({ contents }) => {
            if (contents.indexOf('DA') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: liL => {
            if (liL) {
                return true;
            } else {
                console.log('Enter a link!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'install',
        message: 'Please provide any packages needed for installation of your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Install') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: install => {
            if (install) {
                return true;
            } else {
                console.log('Enter installation instructions!');
                return false;
            }
        }
    },


    
    {
        type: 'input',
        name: 'tests',
        message: 'Provide test information for your application.',
        when: ({ contents }) => {
            if (contents.indexOf('Tests') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: TI => {
            if (TI) {
                return true;
            } else {
                console.log('What packages are required to run tests for your application?');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'questions',
        message: 'Please provide an email address for others to reach you with questions.',
        when: ({ contents }) => {
            if (contents.indexOf('Questions') > -1) {
                return true;
            } else { 
                return false;
            }
        },
        validate: QI => {
            if (QI) {
                return true;
            } else {
                console.log('Please provide an email address!');
                return false;
            }
        }
    }
];
const SSQues = [
    {
        type: 'input',
        name: 'ssLink',
        message: 'Please provide a link for your screenshot.',
        validate: ssLinkInput => {
            if (ssLinkInput) {
                return true;
            } else {
                console.log('Please provide a link for your screenshot!')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'ssAlt',
        message: 'Please provide alt text for your screenshot.',
        validate: screenshotAltInput => {
            if (screenshotAltInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'ssDesc',
        message: 'Provide additional info of your screenshot.'
    },
    {
        type: 'confirm',
        name: 'confirmAddSS',
        message: 'Would you like to add another screenshot?',
        default: false
    }
];


]

addScreenshots = readmeData => {
    
    
    if (!readmeData.screenshots) {
        readmeData.screenshots = [];
    }
    console.log(`
==================
Add New Screenshot
==================
    `);
    return inquirer.prompt(screenshotQues)
    .then(screenshotData => {
        
        readmeData.screenshots.push(screenshotData);
        
        if (screenshotData.confirmAddScreenshot) {
            return addScreenshots(readmeData);
        } else {
            return readmeData;
        };
    });
};




function writeToFile(fileName, data) {
    fs.writeFile(`./dist/${fileName}`, data, err => {
        if (err) {
            throw err
        };
        console.log('README created!')
    });
};

function init() {
    return inquirer.prompt(questions);
};

init()
    .then(userResponse => { 
     
        if (userResponse.contents.indexOf('SS') > -1) {
            return addSS(userResponse);
        } else {
            return userResponse;
        }
    })
    .then(response => {

        if (response.contents.indexOf('Credits') > -1) {
            return addCredits(response);
        } else {
            return response;
        }
    })
    .then(answers => generateMarkdown(answers))
    .then(generatedReadme => writeToFile('README.md', generatedReadme))
    .catch(err => {
        console.log(err);
    });
