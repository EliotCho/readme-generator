const inquirer = require("inquirer");
const fs = require("fs");

const generateREADME = ({
  title,
  description,
  installation,
  usage,
  contributing,
  tests,
  githubUsername,
  emailAddress,
  license,
  badgeURL,
}) =>
  // Template for the README file
  `# ${title}

## License

${badgeURL}\n
This project is licensed under the ${license} License - see the LICENSE.md file for details

  ## Table of Contents
<ol>
<li>
<a href="#description"> Description </a>
</li>
<li><a href="#installation"> Installation </a>
</li>
<li><a href="#usage"> Usage </a>
</li>
<li>
<a href="#license"> License </a>
</li>
<li><a href="#contributing"> Contributing </a>
</li>
<li><a href="#tests"> Tests </a>
</li>
<li>
<a href="#questions"> Questions </a>
</li>


</ol>

## Description

${description}

## Installation

${installation}

## Usage

${usage}


## Contributing

${contributing}

## Tests

${tests}

## Questions

If you have any questions, please open an issue or contact me directly.<br>
Email: ${emailAddress}<br>
Github: [Github repo link](https://github.com/${githubUsername}).
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
      name: "installation",
      message: "Any installation instructions?",
    },
    {
      type: "input",
      name: "usage",
      message: "What is the usage of this project?",
    },
    {
      type: "input",
      name: "contributing",
      message: "How can a user contribute to this project?",
    },
    {
      type: "input",
      name: "tests",
      message: "How can a user test this project?",
    },
    // {
    //   type: "input",
    //   name: "authors",
    //   message:
    //     "Who are the authors of this project? (Please separate by commas)",
    // },
    {
      type: "input",
      name: "githubUsername",
      message: "What is your Github username?",
    },
    {
      type: "input",
      name: "emailAddress",
      message: "What is your email address?",
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
    // const authors = nameSeparate(answers.authors);
    // answers["authors"] = authors;

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
