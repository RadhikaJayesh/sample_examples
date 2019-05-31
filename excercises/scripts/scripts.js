'use strict'
// function delegate(el, evt, sel, handler) {
//     el.addEventListener(evt, function (event) {
//         var t = event.target;
//         while (t && t !== this) {
//             if (t.matches(sel)) {
//                 handler.call(t, event);
//             }
//             t = t.parentNode;
//         }
//     });
// }
// delegate(document, "click", ".listItem", function (event) {
//     this.style.border = "2px dashed orange";
// });

const setSelectedVal = (element, index) => {
    element.options[index - 1].selected = true;
}

const selectList = document.getElementById('selectList');
setSelectedVal(selectList, 2);

const printList = () => {
    let listItems = ["One", "Two", "Three"];
    listItems.map((item) => {
        let listDom = `<li class="list">${item}</li>`;
        document.getElementById("listContainer").insertAdjacentHTML('beforeend', listDom);
    });
    for (var i = 0; i < 4; i++) {
        let ii = i;
        // setTimeout(function () {
        console.log(ii);
        // }, 1000);
    }
};

printList();

// Event delegation - Attach events to dynamically added elements.
document.addEventListener('DOMContentLoaded', function () {
    const listContainer = document.getElementById("listContainer");
    listContainer.addEventListener('click', function (event) {
        if (event.target.className === 'list') {
            event.target.style.color = "red";
        }
    });
});

document.addEventListener('click', function (event) {
    if (event.target.className == 'listItem') {
        callback(event.target);
    }
});
function callback(target) {
    target.style.border = "2px dashed orange";
}

function square(x) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(Math.pow(x, 2));
        }, 2000);
    });
}

async function layer(x) {
    const value = await square(x);
    console.log(value);
}

layer(10); // 100

// CLosure example
// Closure has still access to outer functions variable and params even after it is returned

function celebrity(firstName) {
    var intro = "the name is";
    function lastName(theLastName) {
        return intro + firstName + theLastName;
    }
    return lastName;
}
var myName = celebrity("Rad"); // function celenrity outer function is returned
//CLosure lastName is called after celebrity is returned.
myName("Jayesh"); // Closure lastName still has access to outer function celebrity's params.

function celebrityID() {
    var celebrityID = 999;
    // We are returning an object with some inner functions
    // All the inner functions have access to the outer function's variables
    return {
        getID: function () {
            // This inner function will return the UPDATED celebrityID variable
            // It will return the current value of celebrityID, even after the changeTheID function changes it
            console.log("celebrityID", celebrityID);
        },
        setID: function (theNewID) {
            // This inner function will change the outer function's variable anytime
            celebrityID = theNewID;
            console.log("celebrityID as newId", celebrityID);
        }
    }

}

var mjID = new celebrityID(); // At this juncture, the celebrityID outer function has returned.
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variable 

var generator = (input) => {
    let index = 0;
    let inputToArray = input.split('');
    return {
        next: () => {
            inputToArray.forEach((i) => {
                console.log("Character", i);
            });
            // if (index < input.length) {
            //     index++;
            //     console.log("Character", input[index - 1]);
            // }
            // return '';
        }
    }
}
var myGenerator = generator("Radhika");
myGenerator.next();