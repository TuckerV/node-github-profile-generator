
// packages
const inquirer = require("inquirer");
const axios = require("axios");
const puppeteer = require("puppeteer");
const generateHTML = require("./generateHTML.js");
const html;

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
        return res.data
    })
    
};
function getStarLength(username) {

    return axios.get(`https://api.github.com/users/${username}/starred`).then((res) => {
        // console.log(res.data);
        return res.data.length
    })
    
};

async function init() {
    let {username} = await getName();
    console.log("Your username is " + username);
    let {color} = await getColor();
    console.log("Your favorite color is " + color);

    let profile = await getGithub(username);
    console.log('\n'+'getGithub Response...')
    console.log(profile);
    profile.color = color;

    let star = await getStarLength(username);
    console.log('\n'+'getStarLength Response...')
    console.log(star);
    profile.star = star;

    html = generateHTML(profile);
}

async function genPDF() {
    try {
        
        const page = await browser.newPage();
        const browser = await puppeteer.launch();
        await page.setContent(html);
        await page.emulateMedia("screen");
        await page.pdf({
            path: `${username}.pdf.pdf`,
            printBackground: true,
            format: "A4"
        })
        console.log("PDF file succesfully generated!")
        await browser.close();
        process.exit();
    } 
    catch(err) {
        console.log(err);
    }
}

init();