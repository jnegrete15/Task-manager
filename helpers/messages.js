
require('colors')

const showMenu = () => {

  return new Promise ( resolve => {
    
  
    console.log(`${"1.".green} New task`)
    console.log(`${"2.".green} List task`)
    console.log(`${"3.".green} List completed tasks`)
    console.log(`${"4.".green} List pending tasks`)
    console.log(`${"5.".green} Complete task`)
    console.log(`${"6.".green} Delete task`)
    console.log(`${"7.".green} Exit \n`)
  
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
  
    });
  
    readline.question('Choose an option:',  (opt) => {
      readline.close()
      resolve(opt)
    })
  })

  
} 

const pause = () => {

  return new Promise ( resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
  
    });
  
    readline.question(`Type ${"ENTER".cyan} to continue`,  (opt) => {
      console.log(opt);
      readline.close()
      resolve();
    })
  });
  
}

module.exports = {
  showMenu,
  pause
}