
// packages
const inquirer = require("inquirer");
const axios = require("axios");
const puppeteer = require("puppeteer");
const generateHTML = require("./generateHTML.js");
let html;
let profileFinal;

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
        choices: ["Green", "Blue", "Pink", "Red"]
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
    console.log('\n'+'... getGithub Response ...')
    console.log(profile);
    let { avatar_url, name, company, bio, public_repos, followers, following, html_url, blog, location } = profile;
    profile.color = color;
    console.log("profile.color should be " + profile.color);

    let star = await getStarLength(username);
    console.log('\n'+'... getStarLength Response ...')
    console.log(star);
    profile.star = star;

    profileFinal = username;
    profile.star = star;
    html = generateHTML(profile);

    genPDF();
}

async function genPDF() {
    try {
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html);
        await page.emulateMedia("screen");
        await page.pdf({
            path: `${profileFinal}.pdf`,
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