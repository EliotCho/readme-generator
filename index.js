const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({
  title,
  description,
  dependencies,
  installation,
  execution,
  authors,
  license,
  badgeURL,
}) =>
  // Template for the README file
  `# ${title}

## Description

${description}

## Dependencies

${dependencies}

## Installing

${installation}

## Executing program

${execution}

## Authors

Contributors names

${authors}

## License

${badgeURL}\n
This project is licensed under the ${license} License - see the LICENSE.md file for details
`;

// Inquirer prompt where the inputs are collected
inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "What is a description of your project?",
    },
    {
      type: "input",
      name: "dependencies",
      message: "What are the dependencies of your project?",
    },
    {
      type: "input",
      name: "installation",
      message: "Any installation instructions?",
    },
    {
      type: "input",
      name: "execution",
      message: "How do you execute this project?",
    },
    {
      type: "input",
      name: "authors",
      message:
        "Who are the authors of this project? (Please separate by commas)",
    },
    {
      type: "list",
      name: "license",
      message: "What license would you like to use?",
      choices: ["MIT", "Apache", "GPL", "None"],
    },
  ])

  .then((answers) => {
    console.log(answers);

    // separate the authors by commas
    const authors = nameSeparate(answers.authors);
    answers["authors"] = authors;

    // generate the badge
    const badgeURL = badge(answers.license);
    answers["badgeURL"] = badgeURL;

    // generate the README file is created as a variable
    const readmeMD = generateREADME(answers);

    // write the README file
    fs.writeFile("readmeGenerated.md", readmeMD, (err) =>
      err ? console.error(err) : console.log("Readme Generated!")
    );
  });

// Function to generate badge
function badge(license) {
  apache =
    "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";

  gpl =
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";

  mit =
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";

  none =
    "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
  if (license === "Apache") {
    return apache;
  } else if (license === "GPL") {
    return gpl;
  } else if (license === "MIT") {
    return mit;
  } else if (license === "None") {
    return none;
  }
}

// Function to separate the authors by commas
function nameSeparate(authors) {
  let authorsArray = authors.split(",");
  let authorString = "";
  authorsArray.forEach((author) => {
    authorString += `* ${author}\n`;
  });
  return authorString;
}
