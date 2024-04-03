//my code
var counter = -1;
var counter_arr = 0;
var pushcount = 0;
var popcount = 0;
var emptycount = 0;
var tmpCount=0;
var isPal=true;

// getting document wrapper
var docWrapper = document.querySelector('.wrapper');

// getting all modals
var pushModal = document.getElementById("pushmodal");
var popModal = document.getElementById("popmodal");
var emptyModal = document.getElementById("emptymodal");

// getting close buttons for all Modals
var closePush = document.getElementsByClassName("close-push")[0];
var closePop = document.getElementsByClassName("close-pop")[0];
var closeEmpty = document.getElementsByClassName("close-empty")[0];




var arr = [];
function push(item="null",into="null") {
  //document.getElementById("current_algo").innerHTML = push_algo;
  let push_item
  if(item=="null"){
push_item=(document.getElementById("push-item").value);
  }
  else{
    push_item=item;
  }
  
  if (push_item.length!=0) {
    
    //trigering popup question
    if(pushcount == 1){
      
    }

  
      counter++;
      pushcount++;
      //setTimeout(function() { callPushBox(); }, 2000);
      document.getElementById("pointer").innerHTML = counter;

      arr.push(document.getElementById("push-item").value);
    if(into=="null"){
      
      $("#stack_input").prepend(
        '<div id="r' +
          counter +
          1 +
          '" class="stack_box">  ' +
          push_item +
          " </div>"
      );
      $("#stack_temporary").prepend(
        '<div id="rt' +
        counter +
        1 +
        '" class="stack_box">  ' +
        push_item +
        " </div>"
      )
    
      //document.getElementById("top_element").innerHTML = arr[tmpCount][0];
      $("#array").append(
        '<div id="a' +
          counter +
          '" class="array_box">  ' +
          push_item +
          " </div>"
      );
    }else{
        $("#stack_output").prepend(
          '<div id="ro' +
          tmpCount +
          1 +
          '" class="stack_box">  ' +
          push_item +
          " </div>")
          document.getElementById("pushed").innerHTML =push_item;
      }

      
     
      document.getElementById("push-item").value = "";
      document.getElementById("popped").innerHTML = "";
    
  } else {
    alert("Input cannot be blank ");
  }
}
async function betterPop(stack1,stack2)
{
  const stk1=document.getElementById(stack1);
  const stk2=document.getElementById(stack2);
  stk1.children[0].classList.add('elevate')
  stk2.children[0].classList.add('elevate')
  const stk1val=stk1.children[0].innerHTML.trim();
  const stk2val=stk2.children[0].innerHTML.trim();
  

  if(stk1val!=stk2val)
   { 
    stk1.children[0].classList.add('red')
    stk2.children[0].classList.add('red')
    isPal=false;
    await sleep(500)
    document.querySelector('.modal h2').innerHTML="False";
    document.querySelector('.modal').classList.add('show')
   }else{
    
  await sleep(500)
  stk1.children[0].remove();
  stk2.children[0].remove();}
  if(stk1.children.length==0)
  {
    document.querySelector('.modal h2').innerHTML="True";
    document.querySelector('.modal').classList.add('show')
  }

}
function pop(from="null") {
 // document.getElementById("current_algo").innerHTML = pop_algo;
  if (counter >= 0) {
    
    if (arr[counter] == undefined) {
    } else {
      document.getElementById("popped").innerHTML = arr[tmpCount];
      document.getElementById("pushed").innerHTML = "";
      arr.pop();
    }
    
    let popedOut;
    
    if(from=="null"){
    $("#r" + counter + 1).remove();
    $("#rt" + counter + 1).remove();
    $(".a" + counter).remove();
    counter--;
    popedOut=document.getElementById("rt" + counter + 1).innerHTML
  }
    else{
      
      tmpCount--;
      //console.log("Trying to remove : > ","rt"+tmpCount+1);
      popedOut=document.getElementById("rt" + tmpCount + 1).innerHTML;
      $("#rt" + tmpCount + 1).remove();
      $(".a" + tmpCount+1).remove();
      
    }

    popcount++;
   
    // if (counter >= 0) {
    //   document.getElementById("top_element").innerHTML = arr[counter];
    // } else {
    //   document.getElementById("top_element").innerHTML = "";
    // }

    document.getElementById("pointer").innerHTML = counter;
    return popedOut;
  } else {
    counter = -1;
    alert("Underflow : Element cannot be popped");
    document.getElementById("top_element").innerHTML = "";
    document.getElementById("pointer").innerHTML = counter;
  }

}

function ispeak() {
  if (arr[counter] != undefined) alert("Element at Peak is : " + arr[counter]);
  else alert("Stack is empty.");
}
function isempty() { 
  //enabling the popup
  emptycount++;
  setTimeout(function() { callEmptyBox(); }, 6000);
  document.getElementById("current_algo").innerHTML = isempty_algo;
  if (counter < 0) {
    alert("Yes , the given stack is empty! You can PUSH elements into it ");
  } else {
    alert("No , the given stack is not empty. It contains items . ");
  }
}

// Get the modal

var modal = document.getElementById("popup");

// Get the button that opens the modal
// var btn = document.getElementById('launch');


// Get the <span> element that closes the modal
//var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
// btn.onclick = function () {
//   popup.style.display = "block";
// };

// When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//   popup.style.display = "none";
// };

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//   if (event.target == popup) {
//     popup.style.display = "none";
//   }
// };

// buttons functionality
// start() function to start predefined simulation
function start() {
  // hiding the start button
  var start = document.getElementById("start");
  start.className = start.className.replace(/\bshow\b/g, "hide");
  // making prev and next buttons visible
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  prev.className = prev.className.replace(/\bhide\b/g, "show");
  next.className = next.className.replace(/\bhide\b/g, "show");
  // hiding user input tab (if displayed at that moment)
  var moveable = document.getElementById("moveable");
  moveable.className = moveable.className.replace(/\bshow\b/g, "hide");
}

// reset() function to reset the simulator
function reset() {
  window.location.reload();
  return false;
}

// input() function to show input tab and take user input
function input() {
  // displaying confirm box
  var choice = confirm("Have you read the Instructions properly?");
  if (choice == true) {
    //displaying the input tab
    var moveable = document.getElementById("moveable");
    moveable.className = moveable.className.replace(/\bhide\b/g, "show");

    //clearing all fields
    $("#start-val").empty();
    $("#mid").empty();
    $("#last").empty();

    //targeting the draggable input box
    document.getElementById("moveable").scrollIntoView(true);

    //closing the instructions tab
    popup.style.display = "none";
  } else {
    reset();
  }
}

var codetab = document.getElementById("code");
codetab.onclick = codetab.className.replace(/\bhide\b/g, "show");

// code to make the div draggable
function makeDragable(dragHandle, dragTarget) {
  let dragObj = null; //object to be moved
  let xOffset = 0; //used to prevent dragged object jumping to mouse location
  let yOffset = 0;

  document
    .querySelector(dragHandle)
    .addEventListener("mousedown", startDrag, true);
  document
    .querySelector(dragHandle)
    .addEventListener("touchstart", startDrag, true);

  /*sets offset parameters and starts listening for mouse-move*/
  function startDrag(e) {
    e.preventDefault();
    e.stopPropagation();
    dragObj = document.querySelector(dragTarget);
    dragObj.style.position = "absolute";
    let rect = dragObj.getBoundingClientRect();

    if (e.type == "mousedown") {
      xOffset = e.clientX - rect.left; //clientX and getBoundingClientRect() both use viewable area adjusted when scrolling aka 'viewport'
      yOffset = e.clientY - rect.top;
      window.addEventListener("mousemove", dragObject, true);
    } else if (e.type == "touchstart") {
      xOffset = e.targetTouches[0].clientX - rect.left;
      yOffset = e.targetTouches[0].clientY - rect.top;
      window.addEventListener("touchmove", dragObject, true);
    }
  }

  /*Drag object*/
  function dragObject(e) {
    e.preventDefault();
    e.stopPropagation();

    if (dragObj == null) {
      return; // if there is no object being dragged then do nothing
    } else if (e.type == "mousemove") {
      dragObj.style.left = e.clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = e.clientY - yOffset + "px";
    } else if (e.type == "touchmove") {
      dragObj.style.left = e.targetTouches[0].clientX - xOffset + "px"; // adjust location of dragged object so doesn't jump to mouse position
      dragObj.style.top = e.targetTouches[0].clientY - yOffset + "px";
    }
  }

  /*End dragging*/
  document.onmouseup = function (e) {
    if (dragObj) {
      dragObj = null;
      window.removeEventListener("mousemove", dragObject, true);
      window.removeEventListener("touchmove", dragObject, true);
    }
  };
}

makeDragable("#handle", "#moveable");





const sleep = ms => new Promise(r => setTimeout(r, ms));

let sleepTime=500;
//palindrom checker
async function checkPalindrom()
{
  let inputText=document.getElementById("push-item").value;
  for(let text of inputText)
  {
    push(text);
    await sleep(sleepTime)
    //add a sleep function here
  }
  tmpCount=counter+1;
  for(let text of inputText)
  {
    push(pop("temporaryStack"),"output");
    await sleep(sleepTime)
    //console.log(pop("tempore"));
  }
  sleep(500);
  document.querySelector(".temporay_stack").classList.add('fadeOut');
  for(let txt of inputText)
  {
    await sleep(800)
    betterPop("stack_input","stack_output")
    if(isPal==false)
    {
      //break;
      
      return 0;
    }
    
    console.log("hello");
   
  }
  
  

}
document.querySelector('#palindromCheck').addEventListener('click',checkPalindrom)
document.querySelector('.ok-btn').addEventListener('click',()=>{
  document.querySelector('.modal').classList.remove('show')
  document.querySelector('.input').innerHTML="";
})