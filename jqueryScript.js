/****jquery Code ****/

$(function(){   /*document.ready function alternative*/
	
	var taskList =[];
	var globalId = 1;
	var taskCount=0;

	$("#strong-text").html(taskCount);

	function addTask(taskName){
	
		taskList.push(taskName);
		taskCount++;
		$("#strong-text").html(taskCount);
	}


	function appendLi(task) {  //showing tasks in the task list
	
	var ul = $("#todo-list");
	var li = $("<li></li>");

	li.attr({
		id: 'li_'+task.taskId,
		'class': 'editing'
	});

	
	li.html('<div class="view">'
	+'<input id="li_checkbox_'+task.taskId+'" class="toggle" type="checkbox">'
	+'<label id="li_editing_'+task.taskId+'">'+task.taskName+'</label>'
	+'<button id="li_destroy_'+task.taskId+'" class="destroy">x</button>'
	+'<input id="li_edit_'+task.taskId+'" class="edit"></div>');
	
	ul.append(li);
	  
  
  
	}


	$("ul").on('mouseover','li',function(event) {
   	/* Act on the event */
   	
   		var id = this.id.split("_");
	 	var destroyButtonId = "#li_destroy_"+id[1];
	 	$(destroyButtonId).addClass('displayInlineBlock')

   });

    $("ul").on('mouseout','li',function(event) {
    
   	/* Act on the event */
   		var id = this.id.split("_");
	 	var destroyButtonId = "#li_destroy_"+id[1];
	 	$(destroyButtonId).removeClass('displayInlineBlock')

   });

    $("ul").on('dblclick','.view label',function(event) {
    	
   	/* Act on the event */
   		$(this).addClass("hiddenElement");
		var  id = this.id.split("_");
		var editId = "#li_edit_"+id[2];
		var editInput= $(this).closest('div').children(editId);
		editInput.val($(this).html());
		editInput.addClass('displayBlock');
		

   });

    $("ul").on('blur','input[id^="li_edit_"]',function(event) {
    
   	/* Act on the event */
   		$(this).removeClass("displayBlock");
		var  id = this.id.split("_");
		var editId = "#li_editing_"+id[2];
		var editingLabel= $(this).closest('div').children(editId);
		editingLabel.html($(this).val());
		editingLabel.removeClass('hiddenElement');
		

   });

    $("ul").on('keydown','input[id^="li_edit_"]',function(event) {
    	debugger
   	/* Act on the event */
   		if(event.keyCode==13){
   			$(this).removeClass("displayBlock");
			var  id = this.id.split("_");
			var editId = "#li_editing_"+id[2];
			var editingLabel= $(this).closest('div').children(editId);
			editingLabel.html($(this).val());
			editingLabel.removeClass('hiddenElement');
   		}
   		
		

   });


    $("ul").on('click','input[id^="li_checkbox_"]',function(event) {
    	debugger
   	/* Act on the event */


   	var id = this.id.split("_");
	var labelId = "#li_editing_"+id[2];
	var label = $(this).closest('div').children(labelId);
	if(this.checked){

		for(var i=0 ; i<taskList.length ; i++){

			if(taskList[i].taskId==id[2])
			{
				taskCount--;
				taskList[i].complete = true;
				taskList[i].active = false;
			}
		}
		
		label.addClass("completed");
	}
	else{

		label.removeClass("completed");
		for(var i=0 ; i<taskList.length ; i++){

			if(taskList[i].taskId==id[2])
			{
				taskCount++;
				taskList[i].complete=false;
				taskList[i].active=true;
			}
		}
	}

	$("#strong-text").html(taskCount);

   			
   	
   		
		

   });

	
	

   $("#new-todo").on('blur keydown',function(event) {

   		debugger
   	 if(event.keyCode==13)
   	 {

   	 	//var inputElement = document.getElementsByClassName("new-todo");
	
		if(this.value){

		var task = {
						taskId:globalId,
						taskName:this.value,
						active:true,
						complete:false,
					}
					addTask(task); ///adding task
					globalId++;
					appendLi(task);
		}
	
		this.value="";
	
   	 }
   	/* Act on the event */
   });


$("#footer_selected").on('click',function(event){


		showAllTasks();

})

  


function showAllTasks(){

debugger
  for(var i=0 ; i<taskList.length ; i++){

			var id = taskList[i].taskId;
			var liId="#li_"+id;
			$("ul#todo-list").children(liId).removeClass('hiddenElement');
		}

}


$("#footer_active").on('click',function(event){


		showActiveTasks();

})


function showActiveTasks(){

debugger
for(var i=0 ; i<taskList.length ; i++){

			if(taskList[i].active==false){
			var id = taskList[i].taskId;
			var liId="#li_"+id;
			$("ul#todo-list").children(liId).addClass('hiddenElement');
			}
			else{
					var id = taskList[i].taskId;
					var liId="#li_"+id;
					$("ul#todo-list").children(liId).removeClass('hiddenElement');

			}
			
		}


}
$("#footer_completed").on('click',function(event){


		showcompletedTasks();

})


function showcompletedTasks(){
	debugger
for(var i=0 ; i<taskList.length ; i++){

		if(taskList[i].complete==false){
			var id = taskList[i].taskId;
			var liId="#li_"+id;
			$("ul#todo-list").children(liId).addClass('hiddenElement');
		}
		else{

			var id = taskList[i].taskId;
			var liId="#li_"+id;
			$("ul#todo-list").children(liId).removeClass('hiddenElement');

		}
			
		}
		}

$("#footer_clear").on('click',function(event){


		clearTasks();

})

function clearTasks(){
debugger

 var clearTaskList=[];
 var ul = $("#todo-list");
for(var i=0 ; i<taskList.length ; i++){

   
	if(taskList[i].complete==true){
		    clearTaskList.push(taskList[i].taskId);
			var id = taskList[i].taskId;
			var liId="#li_"+id;
			$("ul#todo-list").children(liId).remove();
	        taskList.splice(i,1);
	        i--;

		}
}



$("#strong-text").html(taskCount);

}


$("ul").on('click','button[id^="li_destroy_"]',function(event) {
    	debugger

    	var id = this.id.split("_");
		var liId ="#li_"+id[2];
	

	for (var i=0 ;i< taskList.length ; i++){

		debugger
		if(taskList[i].taskId==id[2]){

			taskList.splice(i,1);
			taskCount--;
			$("#strong-text").html(taskCount);
		}
	}


	$("ul#todo-list").children(liId).remove();


    });






   

});