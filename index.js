
// packages
const inquirer = require("inquirer");
const axios = require("axios");
const puppeteer = require("puppeteer");
const generateHTML = require("./generateHTML.js");

function getName() {
    const username = inquirer.prompt({
        type: "input",
        message: "Enter your Github profile name?",
        name: "username"
    })
    return username
}
function getColor() {
    const color = inquirer.prompt({
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: ["Red", "Yellow", "Green", "Blue"]
    });
    return color
}
async function init() {
    let {username} = await getName();
    console.log("Your username is " + username);
    let {color} = await getColor();
    console.log("Your favorite color is " + color);
}

init();