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
        this.toDoList[position] = newToDoText;
    },

    delete: function(position) {
        this.toDoList.splice(position, 1);
    },

    toggleCompleted: function(position) {
        var toDoItem = this.toDoList[position];
        toDoItem.isCompleted = !toDoItem.isCompleted;
    },

    toggleAll: function() {
        var totalToDoList = this.toDoList.length;
        var completedItems = 0;

        this.toDoList.forEach(function(toDoItem) {
            if(toDoItem.isCompleted) {
                completedItems++;
            }
        });

        if(completedItems === totalToDoList) {
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
        var toDoUL = document.querySelector("ul");
        toDoUL.innerHTML = "";

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
            toDoUL.appendChild(toDoLI);
        }, this);
    },

    createDeleteButton: function() {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        return deleteButton;
    },

    setUpEventListeners: function() {
        var toDoUL = document.querySelector("ul");

        toDoUL.addEventListener("click", function(event){
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
        var textToAdd = document.getElementById("addText");
        model.add(textToAdd.value);
        textToAdd.value = "";
        view.display();
    },

    changeToDo: function() {
        var positionToChange = document.getElementById("changePosition");
        var replacementText = document.getElementById("changeText");

        if(positionToChange.valueAsNumber < 1) {
            alert("Position must be a positive number.");
        }

        model.change(positionToChange.valueAsNumber, replacementText.value);
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

        if(positionToToggle.valueAsNumber < 1) {
            alert("Position must be a positive number.");
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