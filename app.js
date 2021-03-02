require('colors');
const { saveDB, readDB } = require('./helpers/saveFile')
const { inquirerMenu, 
        pause,
        readInput, 
        listTasksToDelete,
        confirm,
        showCheckList
      } = require('./helpers/inquirer');
const Tasks = require('./models/tasks');

const main = async() => {

  let option = ''
  const tasks = new Tasks();

  const dbTasks = readDB();

  if(dbTasks){
    //show tasks
    tasks.loadTasksFromArray(dbTasks);
  }

  do {
    option  = await inquirerMenu();

    switch (option) {
      case '1':
        const desc = await readInput('Description:')
        tasks.createTask(desc)
      break;
    
      case '2':
        tasks.listAllTasks()
      break;

      case '3':
        tasks.listCompletedPendingTasks()
      break;

      case '4':
        tasks.listCompletedPendingTasks(false)
      break;

      case '5':
        const ids = await showCheckList(tasks.listArr)
        tasks.toggleCompleted(ids);
      break;

      case '6':
        const id = await listTasksToDelete( tasks.listArr)
        if( id !== '0'){
          const ok = await confirm('Are yo sure?')
          if(ok){
            tasks.deletTask(id)
            console.log('Task was deleted');
          }
        }
      
      break;
    }

    saveDB(tasks.listArr)

    await pause();
     
  }while(option !== '0')

}

main()