// This class describes each node of the linked list
class ListNode{
    constructor(value){
        this.value = value;
        this.data = undefined; 
        this.nextNode = undefined; 
    }
}

// This is the linked list class which helps us to traverse through the nodes
// The linked list has been modified to suit the project
class LinkedList{
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
        const newNode = new ListNode(obj.displayName); // node string value is the name + email of the new user
        newNode.data = obj;
        if(this.isEmpty()){ // this the list is empty we make the new node the first node
            this.firstNode = newNode; 
        }else{
            let currentNode = this.firstNode; // we start the comparison from the first node
            let previousNode = undefined; // There is no previous node
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
                }else{ // if the value if greater than the current value we move on
                    previousNode = currentNode;
                    currentNode = currentNode.nextNode; 
                }
            }

            if(!currentNode){ // if the currentNode is undefined it means that we are at the end of the list so we add the new node to end of the list
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


// main application
const loadSettings = () => {
    let settings = localStorage.getItem("app-settings")
    return settings ? JSON.parse(settings): {
        seatNumber: 1,
        displayPassengers: false,  
        availableSeats: [], 
        seatLimit: 15 // maximum number of reservations
    };
};

const saveSettings = (settings) => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
};

const showPassengerList = (settings)=>{
    return settings.displayPassengers || window.location.pathname.includes("display-passengers.html");
};

const getReservations = () => {
    const reservations = localStorage.getItem('app-reservations');
    return reservations ? JSON.parse(reservations): [];
};

const saveReservations = (reservations)=>{
    localStorage.setItem("app-reservations", JSON.stringify(reservations));
};

// NOTE: app settings have already been parsed on each page reload and is ready to be used
let appSettings = loadSettings();
let seatNumber = appSettings.seatNumber; // get the current available seat number from the app settings
const reservationTemplate = {};


const reservationSuccessful = (reservation)=>{
    const resDetailsLocation = document.getElementById("reservation-details");
    const htmlContent = `
    <div class="d-flex gap-2 mb-2">
    <span class="text-muted">NAME</span>
    <span class="fw-bold">${reservation.name}</span>
    </div>
    <div class="d-flex gap-2 mb-2">
        <span class="text-muted">EMAIL</span>
        <span class="fw-bold">${reservation.email}</span>
    </div>
    <div class="d-flex gap-2 mb-2">
        <span class="text-muted">RESERVATION ID</span>
        <span class="fw-bold">${reservation.id}</span>
    </div>
    <div class="d-flex gap-2 mb-2">
        <span class="text-muted">SEAT NUMBER</span>
        <span class="fw-bold">${reservation.seatNumber}</span>
    </div>
    <div class="d-flex gap-2 mb-2">
        <span class="text-muted text-nowrap">DATE BOOKED</span>
        <span class="fw-bold text-nowrap text-truncate">${reservation.dateBooked}</span>
    </div>
    `;
    resDetailsLocation.insertAdjacentHTML("beforeend", htmlContent);
    document.getElementById("success-button").click();
};

const repeatedEmail = (email) => {
    let isRepeated = false
    const reservations = getReservations();
    reservations.forEach((res)=>{
        if(res.email == email){
            isRepeated = true;
            return; // premature exit
        }
    });

    return isRepeated;
};

const validateForm = (form) => {
    for (let i = 0; i < form.elements.length; i++) {
        if (!form.elements[i].checkValidity()) {
            return false;
        }
    }
    return true
};

const clearForm = (form) => {
    for (let i = 0; i < form.elements.length; i++) {
        form.elements[i].value = "";
    }
};


const formatName = (sentence) => {
    // Split the sentence into an array of words
    let words = sentence.split(" ");
    
    // Iterate over each word
    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        // Capitalize the first letter of each word and concatenate with the rest of the word
        words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // Join the capitalized words back into a sentence
    return words.join(" ");
}

// pushing the current reservation details into the local storage
const pushDetails = () => {
    const form = document.getElementById("reservation-form"); // the form element in the html
    if(validateForm(form)){
        const name = document.getElementById("name").value; // gets the value of the input field with name 'id'
        const phone = document.getElementById("phone-number").value;
        const email = document.getElementById("email-address").value; 
        const userPassword = document.getElementById("confirm-password").value;
        // const reservations = []; // storing the current reservation
        // console.log(name, phone, email);
        if(repeatedEmail(email)){
            alert("This email has already been used.");
            return;
        }
        // if(repeatedEmail(email)){
        //     return; // premature exit
        // }
        const reservation = {...reservationTemplate}; 
        const availableSeats = appSettings.availableSeats; // seats avaiblable due to canceled resevations

        // setting the current reservation details of the new user
        reservation.name = formatName(name); 
        reservation.phone = phone; 
        reservation.email = email;
        reservation.displayName = name + ': ' + email // this property is used for the alphabetical comparison (name + email)
        reservation.seatNumber = availableSeats.length > 0 ? availableSeats.pop() : seatNumber++; // an available seat is given otherwise a new seat is given
        reservation.userPassword = userPassword; 
        reservation.dateBooked = new Date(); 
        reservation.id = `${Math.floor(Math.random() * 100)}-${reservation.seatNumber}`;
        
        const storedReservations = getReservations(); // get previously stored reservations
        // If there are stored reservations we parse the array of reservations otherwise we intialize an empty array
        storedReservations.push(reservation); 
        saveReservations(storedReservations) // adding the current reservations to the local storage
        appSettings.seatNumber = seatNumber; // updating available seat number for next passenger
        saveSettings(appSettings); 
        reservationSuccessful(reservation); // drop down menu
        clearForm(form); // clear all form fields
        document.getElementById("confirm-password").classList.remove("is-invalid");
        document.getElementById("confirm-password").classList.remove("is-valid");
        // document.getElementById('false-submit').click();
    }else{document.getElementById('false-submit').click();}
    
}


const displayPassengers = () => {
    appSettings.displayPassengers = true; 
    saveSettings(appSettings);
    window.location.href = "display-passengers.html"
};

// If display passengers is clicked on the main page this will run
if(showPassengerList(appSettings)){
    const tbody = document.getElementById("tbody"); // this is where I'll append a new entry (new passenger detail)
    const reservations = new LinkedList(); // empty alphabetized linked list
    // fix the reservations (make it a function)
    const storedReservations = getReservations(); // getting all reservations stored inside the local storage
    storedReservations.forEach((res)=>{reservations.push(res);}); // putting all reservations into the linked list so that they can be ordered (names)
    
    // filling the table with the passenger details
    reservations.forEach((node, index)=>{
        const reservation = node.data;
        const htmlContent = `
        <tr>
            <td class="fw-bold tw-border-s">${index + 1}</td>
            <td>${reservation.name}</td>
            <td>${reservation.email}</td>
            <td>${reservation.seatNumber}</td>
            <td>${reservation.dateBooked.slice(0, 10)}</td>
        </tr>
        `;
        tbody.insertAdjacentHTML("beforeend", htmlContent);
    });

    appSettings.displayPassengers = false; // resetting this value so that this block of code doesn't run on every page
    saveSettings(appSettings); 
}

const searchReservations = () => {
    // sequential search
    const displayLocation = document.getElementById("display-location"); // where the search appears in the html
    displayLocation.innerHTML = " "; // clear previous search results
    const query = document.getElementById("search-input").value; // query from the search input
    const filter = document.getElementById("filter").value; // filter we are searching by (name, email, id, ....)
    const matches = new LinkedList(); // new linked list to collect matches
    const storedReservations = getReservations(); // all the reservations we currently have in the local storage
    
    storedReservations.forEach((res)=>{
        // console.log(res);
        if(query && res[filter].toLowerCase().includes(query.toLowerCase())){
            matches.push(res); // pushing all reservations that contain the query
        }
    });

    // matches.display();

    // looping through the linked list which has ordered the search results
    let htmlContent;
    matches.forEach((res, index)=>{
        // html to be inserted inside the html document to represent a search result
        let stick = ' <div class="stick"></div>'; // the line design that separates the search results
        if(index == matches.size - 1)stick=""; // if we are on the last item we don't need a line design
        htmlContent = `
        <li class="bg-white p-3 shadow-sm mb-2 d-flex gap-3">
            <span class="text-muted" style="font-style:italic;">${index + 1}</span>
            <span class="fw-bold">${res.value}</span>
        </li>
        ${stick}
        `;
        
        console.log(matches.size);
        displayLocation.insertAdjacentHTML("beforeend", htmlContent);
    });

    if(matches.size == 0){
      htmlContent = `
      <li class="bg-white p-3 shadow-sm mb-2 fw-bold text-center">
        NO MATCHES FOUND
    </li>
      `;
      displayLocation.insertAdjacentHTML("beforeend", htmlContent);
    }


}

const showModal = ()=>{
    const form = document.getElementById("cancel-reservation-form");
    if(validateForm(form)){
        document.getElementById("ask-confirmation").click();
    }else{
        document.getElementById("false-submit").click();
    }
};

const cancelSuccess = () => {
    document.getElementById("cancel-success").click();
    setTimeout(()=>{document.getElementById("close-button").click()}, 1000)
};
const cancelReservation = () => {
  const userPassword = document.getElementById("password").value;
  const email = document.getElementById("email-address").value;
  const storedReservations = getReservations(); 
  const filteredReservations = []; // this will store the reservations excluding the canceled one
  let userFound = false;
  storedReservations.forEach((res)=>{
    console.log(res.userPassword);
    if(res.userPassword == userPassword && res.email == email){
        userFound = true;
        appSettings.availableSeats.push(res.seatNumber);  // reserved seat is now available
        saveSettings(appSettings);
    }else{
        filteredReservations.push(res);
    }
  });
  saveReservations(filteredReservations);
  if(userFound){
    cancelSuccess();
    clearForm(document.getElementById("cancel-reservation-form"));
  }
  else{
    alert("No user with those credentials");
  }
  
};


// sidebar 
const toggle = () => {
    document.getElementById('sidebar').classList.toggle('close');
}

const generateSidebar = () => {
    const sidebarLocation = document.getElementById("sidebar"); 
    const htmlContent = `
    <header>
    <div class="toggle" onclick="toggle()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill:#fff;"><path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path></svg>
    </div>
    </header>

    <menu class="mt-5">
        <ul class="menu-links p-0">
            <li class="nav-link">
                <a href="index.html">
                    <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z"></path></svg>                   
                    </div>
                    <div class="text fw-bold">Home</div>
                </a>
            </li>
            <li class="nav-link">
                <a href="cancel-reservation.html">
                    <div class="icon">
                    <svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cancel</title> <path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path> </g></svg>                    
                        </div>
                    <div class="text text-nowrap fw-bold">Cancel Reservations</div>
                </a>
            </li>
            <li class="nav-link">
                <a href="search-reservation.html">
                    <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path></svg>                   
                        </div>
                    <div class="text fw-bold">Search</div>
                </a>
            </li>
            <li class="nav-link">
                <a href="display-passengers.html">
                    <div class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.5 12c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm1.5 1H8c-3.309 0-6 2.691-6 6v1h15v-1c0-3.309-2.691-6-6-6z"></path><path d="M16.604 11.048a5.67 5.67 0 0 0 .751-3.44c-.179-1.784-1.175-3.361-2.803-4.44l-1.105 1.666c1.119.742 1.8 1.799 1.918 2.974a3.693 3.693 0 0 1-1.072 2.986l-1.192 1.192 1.618.475C18.951 13.701 19 17.957 19 18h2c0-1.789-.956-5.285-4.396-6.952z"></path></svg>
                    </div>
                    <div class="text text-nowrap fw-bold">Display Passengers</div>
                </a>
            </li>
        
        </ul>
    </menu>
    `;

    sidebarLocation.insertAdjacentHTML("beforeend", htmlContent);
};

generateSidebar();



const checkPassword = () => {
    const choosePassword = document.getElementById("choose-password").value;
    const confirmPasswordInput = document.getElementById("confirm-password");
    const confirmPassword = confirmPasswordInput.value;
    if(choosePassword == "" || confirmPassword == ""){
        // remove valid or invalid styles
        confirmPasswordInput.classList.remove("is-invalid");
        confirmPasswordInput.classList.remove("is-valid");
        return; // premature exit
    }

    if(choosePassword == confirmPassword){
        confirmPasswordInput.classList.remove("is-invalid");
        confirmPasswordInput.classList.add("is-valid");
    }
    else{
        confirmPasswordInput.classList.remove("is-valid");
        confirmPasswordInput.classList.add("is-invalid");
    }
};
