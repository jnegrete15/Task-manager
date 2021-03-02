const Task = require('./task');
require('colors');

class Tasks {

  _list = {}

  constructor(){
  

    this._list = {}
  }

  deletTask(id = ''){
    if(this._list[id]){
      delete this._list[id];
    }
  }

  get listArr() {

    const list = [];
    Object.keys(this._list).forEach(key => {
      list.push(this._list[key])
    })

    return list
  }

  loadTasksFromArray( tasks = []){
    tasks.forEach(task => {
      this._list[task.id] = task
    });
  }

  createTask( desc = ''){

    const task = new Task(desc)
    this._list[task.id] = task 
  }

  listAllTasks(){
    console.log()
    this.listArr.forEach(( item, i ) => {
      let id = `${i+1}`.green 
      if(item.completedAt){
        console.log(`${id}. ${item.description} :: ${"Completed".green}`);

      }else{
        console.log(`${id}. ${item.description} :: ${"Pending".red}`);
      }
      
    })
  }

  listCompletedPendingTasks(completed = true){
    console.log();
    let count = 1
    this.listArr.forEach( item => {
      if(completed){
        if(item.completedAt){
          console.log(`${(count + ".").green} ${item.description} :: ${item.completedAt.green}`);
          count++
        }
      }else{
        if(!item.completedAt){
          console.log(`${ (count + "." ).green} ${item.description} :: ${"Pending".red}`);
          count++
        }
      }

    })
  }

  toggleCompleted ( ids = []){
    ids.forEach(id => { 
      const task = this._list[id];
      if (!task.completedAt){
        task.completedAt  = new Date().toISOString()
      }
    })

    this.listArr.forEach( task => {
      if (!ids.includes(task.id)){
        this._list[task.id].completedAt = null
      }
    })
  }

}

module.exports = Tasks;