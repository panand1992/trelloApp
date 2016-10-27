app.controller('AppCtrl', function($scope , TaskModel){
	var tm = TaskModel.getTaskModel();
	$scope.taskModel = tm;
	tm.createActivityLog("Board Created");
	
	$scope.showAddListForm = function(){
		tm.addListForm = true;
		$scope.closeAddTaskForm();
	}
	
	$scope.closeAddListForm = function(){
		tm.addListForm = false;
		$scope.closeAddTaskForm();
	}
	
	$scope.addNewList = function(){
		tm.addListToBoard();
		$scope.closeAddTaskForm();
	}
	
	$scope.showEditListMenu = function(val){
		tm.boardList[val].showEditList = true;
		$scope.closeAddTaskForm();
	}

	$scope.closeEditListMenu = function(val){
		tm.boardList[val].showEditList = false;
	}

	$scope.archiveList = function(val){
		tm.deleteListFromBoard(val);
	}
	
	$scope.showAddTaskForm = function(val){
		$scope.closeAddTaskForm();
		tm.boardList[val].showAddTask = true;
	}
	
	$scope.closeAddTaskForm = function(val){
		tm.closeTaskForm();
	}
	
	$scope.addNewTask = function(val){
		tm.addTaskToList(val);
	}
	
	$scope.archiveTask = function(){
		tm.deleteTaskFromList($scope.currentTaskIndex, $scope.currentListIndex);
	}

	$scope.viewTaskDetails = function(taskIndex, listIndex){
		$scope.currentTaskIndex = taskIndex;
		$scope.currentListIndex = listIndex;
	}
	
	$scope.changeBackground = function(val){
		tm.boardBackground = val;
	}
	
	$scope.showSidePanel = function(){
		tm.showSideMenu = true;
	}
	
	$scope.closeSidePanel = function(){
		tm.showSideMenu = false;
	}

	$scope.showEditTaskDescription = function(){
		tm.showEditTaskDesc = true;
		tm.newTaskDescription = tm.boardList[$scope.currentListIndex].tasks[$scope.currentTaskIndex].description;
	}

	$scope.closeEditTaskDescription = function(){
		tm.showEditTaskDesc = false;
		tm.newTaskDescription = null;
	}

	$scope.updateTaskDescription = function(){
		tm.boardList[$scope.currentListIndex].tasks[$scope.currentTaskIndex].description = tm.newTaskDescription;
		$scope.closeEditTaskDescription();
	}

	$scope.modifyTime = function(val){
		return tm.changeShowTime(val);
	}

	$scope.selectTaskShift = function(taskIndex, listIndex, event){
		$scope.closeAddTaskForm();
		tm.currentTaskShiftData.taskIndex = taskIndex;
		tm.currentTaskShiftData.listIndex = listIndex;
		tm.cardSelectedShift = true;
		var xpos = event.clientX;
		var ypos = event.clientY;
		var selectedTask = document.getElementById("task"+taskIndex+"List"+listIndex);
		tm.initialYposDrag = event.clientY - selectedTask.offsetTop;
		tm.initialXposDrag = event.clientX - selectedTask.offsetLeft;
		for(var i=0;i<tm.boardList.length;i++){
			var selectedList = document.getElementById("listBox"+i);
			tm.boardList[i].top = selectedList.offsetTop;
			tm.boardList[i].left = selectedList.offsetLeft;
			tm.boardList[i].height = selectedList.offsetHeight;
			tm.boardList[i].width = selectedList.offsetWidth;
		}
	}

	$scope.unselectTaskShift = function(event){
		var xpos = event.clientX;
		var ypos = event.clientY;
		for(var i=0;i<tm.boardList.length;i++){
			var checkXPosI = tm.boardList[i].left + 4;
			var checkXPosF = tm.boardList[i].left + tm.boardList[i].width - 4;
			var checkYPosI = tm.boardList[i].top + 43;
			var checkYPosF = tm.boardList[i].top + tm.boardList[i].height - 40;
			if((xpos > checkXPosI && xpos < checkXPosF) && ((ypos < checkYPosF && ypos > checkYPosI) || (tm.boardList[i].height == 83))){
				tm.dragTaskOnTo = i;
				break;
			}
		}
		console.log(tm.dragTaskOnTo);
		if(tm.dragTaskOnTo == tm.currentTaskShiftData.listIndex && tm.dragTaskOnTo == null){
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.position = "relative";
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.top = 0;
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.left = 0;
		}
		else{
			tm.boardList[tm.dragTaskOnTo].tasks.splice(0, 0, tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex]);
			tm.boardList[tm.dragTaskOnTo].tasks[0].style.position = "relative";
			tm.boardList[tm.dragTaskOnTo].tasks[0].style.top = 0;
			tm.boardList[tm.dragTaskOnTo].tasks[0].style.left = 0;
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks.splice(tm.currentTaskShiftData.taskIndex, 1);
		}
		tm.currentTaskShiftData.taskIndex = null;
		tm.currentTaskShiftData.listIndex = null;
		tm.cardSelectedShift = false;
	}

	$scope.moveTaskCard = function(event){
		if(tm.cardSelectedShift){
			var xpos = event.clientX;
			var ypos = event.clientY;
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.position = "fixed";
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.left = (xpos - tm.initialXposDrag) + "px";
			tm.boardList[tm.currentTaskShiftData.listIndex].tasks[tm.currentTaskShiftData.taskIndex].style.top = (ypos - tm.initialYposDrag) + "px";
		}
	}

});