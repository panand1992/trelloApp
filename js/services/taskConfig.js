app.factory('taskConfig', function () {
    return {
        boardList : [],
        addListForm : false,
        newListName : null,
        newTaskName : null,
        userActivityLog : [],
        boardBackground : "#0079BF",
        sideMenuTitle : "Menu",
        backgroundColorList : ["#0079BF", "#D29034", "#519839", "#B04632", "#89609E", "#CD5A91", "#4BBF6B", "#00AECC", "#838C91"],
        showSideMenu : false,
        showEditTaskDesc : false,
        newTaskDescription : null,
        currentTaskShiftData : {
            "taskIndex" : null,
            "listIndex" : null
        },
        cardSelectedShift : false
    }  
});