app.factory('TaskModel', function (taskConfig) {

    var defaults = taskConfig;

    function TaskModel() {
        this.boardList = defaults.boardList;
        this.addListForm = defaults.addListForm;
        this.newListName = defaults.newListName;
        this.newTaskName = defaults.newTaskName;
        this.userActivityLog = defaults.userActivityLog;
        this.boardBackground = defaults.boardBackground;
        this.sideMenuTitle = defaults.sideMenuTitle;
        this.backgroundColorList = defaults.backgroundColorList;
        this.showSideMenu = defaults.showSideMenu;
        this.showEditTaskDesc = defaults.showEditTaskDesc;
        this.newTaskDescription = defaults.newTaskDescription;
        this.currentTaskShiftData = defaults.currentTaskShiftData;
        this.cardSelectedShift = defaults.cardSelectedShift;
    }

    TaskModel.prototype = (function () {

        function addListToBoard() {
            if(this.newListName){
                var newTaskList = {
                    "title" : this.newListName,
                    "tasks" : [],
                    "showAddTask" : false,
                    "showEditList" : false
                };
                this.boardList.push(newTaskList);
                this.userActivityLog.push({
                    "title" : this.newListName + " added to this board",
                    "time" : new Date()
                });
                this.newListName = null;
            }
        }

        function addTaskToList(val){
            if(this.newTaskName){
                var newTask = {
                    "title" : this.newTaskName,
                    "description" : null,
                    "activityList" : []
                }
                this.boardList[val].tasks.push(newTask);
                this.userActivityLog.push({
                    "title" : this.newTaskName + " added to this " + this.boardList[val].title,
                    "time" : new Date()
                });
                this.newTaskName = null;
            }
        }

        function deleteListFromBoard(val){
            this.userActivityLog.push({
                "title" : this.boardList[val].title + " archived",
                "time" : new Date()
            });
            this.boardList.splice(val, 1);
        }

        function deleteTaskFromList(taskIndex, listIndex){
            this.userActivityLog.push({
                "title" : this.boardList[listIndex].tasks[taskIndex].title + " archived",
                "time" : new Date()
            });
            this.boardList[listIndex].tasks.splice(taskIndex, 1);
        }

        function closeTaskForm(){
            for(var i=0;i<this.boardList.length;i++){
                this.boardList[i].showAddTask = false;
            }
            this.newTaskName = null;
        }

        function createActivityLog(val){
            var newActivity = {
                "title" : val,
                "time" : new Date()
            };
            this.userActivityLog.push(newActivity);
        }

        function changeShowTime(val){
            var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var showDate = new Date(val);
            var finalDate = months[showDate.getMonth()] + " " + showDate.getDate() + " at ";
            if(showDate.getHours() % 12 != 0){
                finalDate += showDate.getHours() % 12; 
            }
            else{
                finalDate += showDate.getHours();
            }
            if(showDate.getMinutes() <= 8){
                finalDate += ":0" + showDate.getMinutes();
            }
            else{
                finalDate += ":" + showDate.getMinutes();
            }
            if(showDate.getHours < 12){
                finalDate += " AM";
            }
            else{
                finalDate += " PM";
            }
            return finalDate;
        }

        return {
            addListToBoard: addListToBoard,
            addTaskToList: addTaskToList,
            deleteListFromBoard: deleteListFromBoard,
            deleteTaskFromList: deleteTaskFromList,
            closeTaskForm: closeTaskForm,
            createActivityLog: createActivityLog,
            changeShowTime: changeShowTime
        }
    }());


    var singleton = null;

    function getTaskModel() {
        if (singleton) {

        } 
        else {
            singleton = new TaskModel();
        }
        return singleton;
    }

    return {
        getTaskModel: getTaskModel
    }
});

