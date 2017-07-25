var model = {
  toDoList: [],

  add: function(toDoText) {
    var toDoItem = {
      toDoText: toDoText,
      isCompleted: false
    };
    this.toDoList.push(toDoItem);
  },

  change: function(position, newToDoText) {
    var toDoItem = this.toDoList[position];
    toDoItem.toDoText = newToDoText;
  },

  delete: function(position) {
    this.toDoList.splice(position, 1);
  },

  toggleCompleted: function(position) {
    var toDoItem = this.toDoList[position];
    toDoItem.isCompleted = !toDoItem.isCompleted;
  },

  toggleAll: function() {
    var toDoListTotal = this.toDoList.length;
    var completedItems = 0;

    this.toDoList.forEach(function(toDoItem) {
      if(toDoItem.isCompleted) {
        completedItems++;
      }
    });

    if(completedItems === toDoListTotal) {
      this.toDoList.forEach(function(toDoItem) {
        toDoItem.isCompleted = false;
      });
    } else {
      this.toDoList.forEach(function(toDoItem) {
        toDoItem.isCompleted = true;
      });
    }
  }
};

var view = {
  display: function() {
    var toDoFullText = "",
        toDoUL = $("ul");

    toDoUL.html("");

    model.toDoList.forEach(function(toDoItem, position) {
      var toDoLI = document.createElement("li");

      if(toDoItem.isCompleted) {
        toDoFullText = toDoItem.toDoText + "(x)";
      } else {
        toDoFullText = toDoItem.toDoText + "( )";
      }

      toDoLI.id = "item-" + position;
      toDoLI.textContent = toDoFullText;
      toDoLI.appendChild(this.createDeleteButton());
      toDoUL.append(toDoLI);
    }, this);
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    return deleteButton;
  },

  setUpEventListeners: function() {
    var toDoUL = $("ul");

    toDoUL.on("click", function(event){
      var elementClicked = event.target;

      if(elementClicked.className === "delete-button"){
        controller.deleteToDo(
          parseInt(elementClicked.parentNode.id.substr(5))
        );
      }
    });
  }
};

var controller = {
  addToDo: function() {
    var textToAdd = $("#addText");

    if(textToAdd.val() === "") {
      alert("You must input a task to add.");
      return;
    }

    model.add(textToAdd.val());
    textToAdd.val("");
    view.display();
  },

  changeToDo: function() {
    var positionToChange = document.getElementById("changePosition");
    var replacementText = document.getElementById("changeText");

    if(positionToChange.value === "" || replacementText === "") {
      alert("You must include both which task you want to change and a replacement task.");
      positionToToggle.value = "";
      return;
    } else if(positionToChange.valueAsNumber < 1) {
      alert("You must pick a positive number.");
      positionToChange.value = "";
      replacementText.value = "";
      return;
    }

    model.change(positionToChange.valueAsNumber - 1, replacementText.value);
    positionToChange.value = "";
    replacementText.value = "";
    view.display();
  },

  deleteToDo: function(positionToDelete) {
    model.delete(positionToDelete);
    view.display();
  },

  toggleCompleted: function() {
    var positionToToggle = document.getElementById("togglePosition");

    if(positionToToggle.value === "") {
      alert("You must specify which task to toggle completion for.");
      positionToToggle.value = "";
      return;
    } else if(positionToToggle.valueAsNumber < 1) {
      alert("You must pick a positive number.");
      positionToToggle.value = "";
      return;
    }

    model.toggleCompleted(positionToToggle.valueAsNumber - 1);
    positionToToggle.value = "";
    view.display();
  },

  toggleAll: function() {
    model.toggleAll();
    view.display();
  }
};

view.setUpEventListeners();