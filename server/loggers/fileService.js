const { mkdir, writeFile, appendFile } = require("fs/promises");
const FS = require("fs");
const chalk = require("chalk");

const createFile = async (day, morganString) => {
  try {
    const URL = `${__dirname}/logs`; // URL - The name of the directory to which the file will belong
    const DAY = `${URL}/${day}.log`; // DAY - the file name according to the date it was created

    let isExists = FS.existsSync(URL); // checks if the directory exists
    if (!isExists) await mkdir(URL); // if it is not exist it creates the directory

    const isFileExists = FS.existsSync(DAY); // checks if the file for the given day exists
    if (!isFileExists) await writeFile(DAY, morganString);
    // if it is not exist it creates the file and writes the morganString in it
    else await appendFile(DAY, morganString); // if the file exist it add the morganString to it
  } catch (error) {
    console.log(chalk.redBright(`Create File Error: ${error.message}`));
  }
};

exports.createFile = createFile;
