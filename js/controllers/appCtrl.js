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
		tm.currentTaskShiftData.taskIndex = taskIndex;
		tm.currentTaskShiftData.listIndex = listIndex;
		tm.cardSelectedShift = true;
		var xpos = event.clientX;
		var ypos = event.clientY;
		console.log(xpos + ", " + ypos);
	}

	$scope.unselectTaskShift = function(){
		tm.currentTaskShiftData.taskIndex = null;
		tm.currentTaskShiftData.listIndex = null;
		tm.cardSelectedShift = false;
	}

	$scope.moveTaskCard = function(event){
		if(tm.cardSelectedShift){
			var xpos = event.clientX;
			var ypos = event.clientY;
			console.log(xpos + ", " + ypos);
			$(".taskBoardList:nth-child("+(tm.currentTaskShiftData.listIndex+1)+") .taskCardList:nth-child("+(tm.currentTaskShiftData.taskIndex+1)+")").addClass("selectedCardItem");
		}
	}

});