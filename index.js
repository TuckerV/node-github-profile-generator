
// packages
const inquirer = require("inquirer");
const axios = require("axios");
const puppeteer = require("puppeteer");
const generateHTML = require("./generateHTML.js");

// User is prompted in Terminal for their Github Username
function getName() {
    const username = inquirer.prompt({
        type: "input",
        message: "Enter your Github profile name?",
        name: "username"
    })
    return username
}
// User is prompted in Terminal for their favorite color
function getColor() {
    const color = inquirer.prompt({
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: ["Red", "Yellow", "Green", "Blue"]
    });
    return color
}
// 
function getGithub(username) {

    return axios.get(`https://api.github.com/users/${username}`).then((res) => {
        // console.log(res.data);
        console.log(res.data);
        return res.data
    })
    
};


async function init() {
    let {username} = await getName();
    console.log("Your username is " + username);
    let {color} = await getColor();
    console.log("Your favorite color is " + color);

    let {data} = await getGithub(username);
}

init();