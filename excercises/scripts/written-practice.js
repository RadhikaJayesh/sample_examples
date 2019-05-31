/* Sample promise code */

// Promise constructor
var promise = new Promise(function (resolve, reject) {
    if (Response) {
        resolve("Worked");
    }
    else {
        reject(console.log("it Broke"));
    }
});

//Using the promise constructor
promise.then(function (result) {
    console.log("results");
}, function (err) {
    console.log("error");
});

function get(url) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function () {
            if (req.status === 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error("Network error"));
        };

        req.send();
    });
}

get("story.json").then(function (response) {
    console.log("Success", response);
}, function (error) {
    console.log("Error", error);
}).catch(function (error) {
    console.log(error);
});

///Chaining
get('story.json').then(function (response) {
    return JSON.parse(response);
}).then(function (response) {
    console.log("Yey", response);
});

get('story.json').then(JSON.parse).then(function () {
    console.log("Yey", response)
});

function getJSON(url) {
    return get(url).then(JSON.parse);
}

//Ajax call
function makeAjaxCall(methodType, url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.state === 200) {
            callback(xhr.response);
        }
    }
    xhr.send();
    console.log("requst has been sent");
}

var url = "https://api.github.com/users";
function renderUsers(data) {
    // Do here
}
makeAJAXCall("GET", url, renderUsers);