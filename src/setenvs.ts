const { writeFile, readFileSync } = require('fs');
const { argv } = require('yargs');

// read environment variables from .env file
const envFile = require('dotenv').config();

// read the command line arguments passed with yargs
const environmentArgs = argv.environment;
const targetPath = './src/environments/environment.ts';
const isProduction = (argv.environment=='prod') ? true : false;

//
const template = readFileSync('./src/environments/environment.template', 'utf8');

//
const environmentFileTemplate = `export const environment = $CONTENT`;
const envReg = new RegExp(/\$CONTENT/,"gi");

//
const values = Object.assign({APP_ENV: isProduction}, envFile.parsed, argv);
const valuesReg = new RegExp(Object.keys(values).join("|"),"gi");

//
const environmentValues = template.replace(valuesReg, (matched) => values[matched]);
//
const environmentFileContent = environmentFileTemplate.replace(envReg, environmentValues);

//
writeFile(targetPath, environmentFileContent, function (err) {
    if (err) {
       console.log(err);
    }
 
    console.log(`Wrote variables to ${targetPath}`);
});