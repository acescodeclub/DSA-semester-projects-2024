// This class describes each node of the linked list
export class ListNode{
    constructor(value){
        this.value = value;
        this.data = undefined; 
        this.nextNode = undefined; 
    }
}

// This is the linked list class which helps us to traverse through the nodes
export class LinkedList{
    constructor(){
        this.firstNode = undefined;
        this.size = 0; 
    }

    // This method enables us to get a node by its index
    get(index){
        if(index > -1 && index < this.size){
            let currentIndex = 0;   
            let currentNode = this.firstNode;
            while(currentIndex < index){
                currentNode = currentNode.nextNode; 
                currentIndex++;
            }
            return currentNode;
        }

        // We throw an error if the index is not found in the list
        throw new Error("Index not found");
        
    }

    // This method enables us to search for the index of a value in the linked list
    search(value){
        let currentIndex = 0; 
        let currentNode = this.firstNode; 
        while(currentNode){
            if(currentNode.value == value){
                return currentIndex; 
            }
            currentNode = currentNode.nextNode;
            currentIndex++; 
        }
        return -1; 
    }

    // This method enables us to delete a node by it's index
    delete(index){
        if(index > -1 && index < this.size){
            if(index == 0){
                this.firstNode = this.firstNode.nextNode; 
                this.size--;
            }
            else{
                let currentIndex = 0;
                let currentNode = this.firstNode;
                while(currentIndex < index - 1){
                    currentNode = currentNode.nextNode;
                    currentIndex++;
                }
                currentNode.nextNode = currentNode.nextNode.nextNode;
                this.size--;
            }
            return; 
        }
        
        throw new Error("Index not found");
    }
  
    
    // This method adds values in ascending sorted order
    push(obj){
        const newNode = new ListNode(obj.displayName); // node string value is the email
        newNode.data = obj;
        if(this.isEmpty()){ // this the list is empty we make the new node the first node
            this.firstNode = newNode; 
        }else{
            let currentNode = this.firstNode; 
            let previousNode = undefined;
            while(currentNode){
                if(obj.displayName <= currentNode.value){
                    if(previousNode){ // if theres a previous node we insert in-between the previous and current nodes
                        previousNode.nextNode = newNode; 
                        newNode.nextNode = currentNode; 
                    }else{ // if there's no previous node (meaning the current node is the first node), we insert the new node before the first node
                        this.firstNode = newNode; 
                        newNode.nextNode = currentNode;
                    }
                    break; // we break out of the loop to prevent an infinite loop
                }else{ // if the value if less than the current value we move on
                    previousNode = currentNode;
                    currentNode = currentNode.nextNode; 
                }
            }

            if(!currentNode){ // if the currentNode is undefined it means that we are at the end of the list so we add it to end of the list
                previousNode.nextNode = newNode;
            }

        }
        this.size++; // we increment the size
    }
    // prints the list
    display(){
        let stringRep = '[';
        let currentNode = this.firstNode;
        while(currentNode){
            stringRep += currentNode.value + ', ';
            currentNode = currentNode.nextNode; 
        }
        console.log(stringRep.slice(0, stringRep.length - 2) + ']');   
      }

      // This method applies a function to each node of the linked list
      forEach(func){
        // If the input function has one parameter then the nodes will be ... 
        // ... passed to that parameter during traversal
        // If the input function has two parameters then the nodes will be passed ...
        // ... to the first parameter and their corresponsing index will be passed to the second parameter

        let currentNode = this.firstNode; 
        let currentIndex = 0;
        while(currentNode){
            if(func.length > 1){
                func(currentNode, currentIndex);
            }else{
                func(currentNode); 
            }
            currentNode = currentNode.nextNode;
            currentIndex++;
        }
      }

    // This methods enables us to know if the linked list is empty or not
    isEmpty(){
        return this.size == 0;
    }
}
