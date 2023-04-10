const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown.js');


const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Create project title.  (Required)',
        validate: nameInput => {
            if (nameInput) {
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
        message: 'Please enter your GitHub username.',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'Please enter the name of your repo.',
        validate: repoInput => {
            if (repoInput) {
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
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your application.',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information for using your application!');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
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
            {
                name: 'Built With',
                checked: true
            },
            {
                name: 'License',
                checked: false
            },
            {
                name: 'Contributing',
                checked: false
            },
            {
                name: 'Tests',
                checked: false
            },
            {
                name: 'Questions',
                checked: true
            },
            {
                name: 'Credits',
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
                console.log('Please enter installation instructions!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('License') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: LI => {
            if (LI) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        }
    }, 
    {
        type: 'checkbox',
        name: 'built with',
        message: 'Please select the technologies that your application was built with.',
        choices: ['HTML', 'CSS', 'SASS', 'JavaScript', 'Node.js', 'Express.js'],
        default: 0,
        when: ({ contents }) => {
            if (contents.indexOf('Built With') > -1) {
                return true;
            } else {
                return false;
            }
        }
    }, 
    {
        type: 'input',
        name: 'contributing',
        message: 'Provide your guidelines for contributing.',
        when: ({ contents }) => {
            if (contents.indexOf('Contributing') > -1) {
                return true;
            } else {
                return false;
            }
        },
        validate: CI => {
            if (CI) {
                return true;
            } else {
                console.log('Please enter guidelines for contributing!');
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
        name: 'screenshotLink',
        message: 'Please provide a link for your screenshot.',
        validate: screenshotLinkInput => {
            if (screenshotLinkInput) {
                return true;
            } else {
                console.log('Please provide a link for your screenshot!')
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'screenshotAlt',
        message: 'Please provide alt text for your screenshot. (Required)',
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
        name: 'screenshotDesc',
        message: 'Please provide a description of your screenshot. (Optional)'
    },
    {
        type: 'confirm',
        name: 'confirmAddScreenshot',
        message: 'Would you like to add another screenshot?',
        default: false
    }
];

const creditQues = [
    {
        type: 'input',
        name: 'creditName',
        message: 'Give your credit a name.',
        validate: creditN => {
            if (creditN) {
                return true;
            } else {
                console.log('Enter a name for the credit.');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'creditLink',
        message: 'Please provide a link for the credit.',
        validate: creditLink => {
            if (creditLink) {
                return true;
            } else {
                console.log('Enter a name for credit');
                return false;
            }
        }
    },
   
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

addCredits = readmeInfo => {
    
    
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`

    `);
    return inquirer.prompt(creditQues)
    .then(creditData => {
       
        readmeInfo.credits.push(creditData);
        
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
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
     
        if (userResponse.contents.indexOf('Screenshots') > -1) {
            return addScreenshots(userResponse);
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
