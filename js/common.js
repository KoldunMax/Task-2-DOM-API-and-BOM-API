// Getting data and record everything to an array

function getResponse() {
    fetch("https://api.myjson.com/bins/152f9j")
        .then((res) => res.json())
        .then((info) => {
            let output = "<h2>Users</h2>";

            info['data'].forEach((item) => {
                output += `<ul>
                              <li>${item.title}</li>
                              <li>${item.description}</li>
                              <li>${item.image}</li>
                              <li>${item.createdAt}</li>
                              <li>${item.tags}</li>
                            </ul>`;
            });
            
            document.getElementsByTagName("main")[0].innerHTML = output;
        })
}

getResponse();