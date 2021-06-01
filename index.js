// index.js
const Mustache = require("mustache");
const fetch = require("node-fetch");
const fs = require("fs");
const MUSTACHE_MAIN_DIR = "./main.mustache";
/**
 * DATA is the object that contains all
 * the data to be provided to Mustache
 * Notice the "name" and "date" property.
 */
let DATA;
fetch("http://numbersapi.com/random?json")
    .then((response) => response.json())
    .then(
        (data) =>
            (DATA = {
                name: "Yash Choudhary",
                date: new Date().toLocaleDateString("en-GB", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    timeZone: "Asia/Kolkata",
                }),
                FACT: data.text,
            })
    )
    .then(() => {
        function generateReadMe() {
            fs.readFile(MUSTACHE_MAIN_DIR, (err, data) => {
                if (err) throw err;
                const output = Mustache.render(data.toString(), DATA);
                fs.writeFileSync("README.md", output);
            });
        }
        generateReadMe();
    });
