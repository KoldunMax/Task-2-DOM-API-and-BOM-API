// Getting data and record everything to an array
 
var arrOfdataProfiles = null;
var main = document.getElementsByTagName("main")[0];
var selectSort = document.getElementsByName("slct")[0];
var startSorting = document.getElementsByClassName("start-sorted-tags")[0];
var headerTags = document.getElementsByClassName("tag");
var options = selectSort.getElementsByTagName("option")
var removeCard = document.getElementsByClassName("remove-card-btn");

fetch("https://api.myjson.com/bins/152f9j")
    .then((res) => res.json())
    .then((info) => {

        let tags = [];
        if(headerTags.length > 0) {
            for(let iTag = 0; iTag < headerTags.length; iTag++) {
                tags.push(headerTags[iTag].innerText);
            }

            console.log(tags);
        }
        
        let mainData = Object.assign([], info["data"]);

        function compareDateUpDown(A, B) {

            var date1 = new Date(A.createdAt);
            var date2 = new Date(B.createdAt);

            return date1 - date2;
        }        
        function compareDateDownUp(A, B) {

            var date1 = new Date(A.createdAt);
            var date2 = new Date(B.createdAt);

            return date2 - date1;
        }//coincidence

        mainData.sort(compareDateUpDown);

        function compareTags(A, B) {
            return B.coincidence - A.coincidence;
        }
                
        showtoDisplay(mainData);

        for(let i = 0; i < mainData.length; i++) {
            removeCard[i].addEventListener("click", () => {
                mainData.splice(i, 1);
                showtoDisplay(mainData);
            });
        }

        function deleteItemsfunc(collection) {

        }

        function showtoDisplay(arrayForShow) {
            let outPut = "";//`<div class="wrapper-profile-cards">`;

            for(let i = 0; i < arrayForShow.length; i++) {
                        
                        outPut += `<div class="wrapper-profile-card">
        
                        <h4 class="title-profile"><i class="fa fa-id-card-o" aria-hidden="true"></i> ${arrayForShow[i].title}</h4>
        
                        <img class="wrapper-img" src=${arrayForShow[i].image} alt="front-img">
                            
                        <div class="wrapper-description-tags-date">
        
                            <h5 class="description-title-profile" >Description: <i class="fa fa-file-text-o" aria-hidden="true"></i></h5>
        
                            <p class="description-text-profile" >${arrayForShow[i].description}</p>
                            <p class="date-profile"><i class="fa fa-calendar" aria-hidden="true"></i> <span>`;
                            
                            let date = new Date(arrayForShow[i].createdAt);
        
                            var mm = date.getMonth(); 
                            var dd = date.getDate();
                            var hh = date.getHours();
                            var min = date.getMinutes();
                            var sec = date.getSeconds();
        
                            var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
        
                            outPut += `${[  (hh>9 ? '' : '0') + hh + 'h', 
                                            (min>9 ? '' : '0') + min + 'm', 
                                            (sec>9 ? '' : '0') + sec + 's',
                                            (dd>9 ? '' : '0') + dd,
                                            mS[+((mm>9 ? '' : '0') + mm)],
                                            date.getFullYear()
                                        ].join(', ')} </span></p>
                                                
                            <ul class="tags-profile">`;
        
                            for(let j = 0; j < arrayForShow[i].tags.length; j++) {
                                outPut += `<li class="tag-profile">${arrayForShow[i].tags[j]}</li>`
                            }
                                
                            outPut += `</ul><div class="remove-card-btn"><i class="fa fa-trash-o"></i></div>
        
                        </div>
        
                    </div>`;
                    

        //        if((i + 1) % 10 == 0 && arrayForShow.length != i ) {
         //           outPut += `</div><div class="wrapper-profile-cards">`;
           //     }
            }
         //   if(arrayForShow.length%9 != 0) {
          //      outPut += `</div>`;
          //  }
            main.innerHTML = outPut;

            for(let i = 0; i < mainData.length; i++) {
                removeCard[i].addEventListener("click", () => {
                    mainData.splice(i, 1);
                    showtoDisplay(mainData);
                });
            }
    
        }

        selectSort.addEventListener("click", function() {
            if(selectSort.value == 1) {
                showtoDisplay(mainData.sort(compareDateUpDown));
            } else {
                showtoDisplay(mainData.sort(compareDateDownUp));
            }
        });

        startSorting.addEventListener("click", sortedByTagsFunc);

        function sortedByTagsFunc() {

            let sortedByTags = Object.assign([], mainData);

            for(let k = 0; k < sortedByTags.length; k++) {
                sortedByTags[k].coincidence = 0;
            }

            tags = [];
            if(headerTags.length > 0) {
                for(let iTag = 0; iTag < headerTags.length; iTag++) {
                    tags.push(headerTags[iTag].innerText);
                }
            }

            //"Business","Culture","Politics"

            for(let i = 0; i < sortedByTags.length; i++) {
                for(let k = 0; k < tags.length; k++) {
                    for(let j = 0; j < sortedByTags[i].tags.length; j++) {
                        if(sortedByTags[i].tags[j].toLowerCase() == tags[k].toLowerCase()) {
                            sortedByTags[i].coincidence += 1;
                        }
                    }
                }
            }

            sortedByTags.sort(compareTags)
            let sosortedByTagsandDate = [];

            for(let i = sortedByTags[0].coincidence; i >= 0; i--) {
                let arrayforsorting = [];
                for(let j = 0; j < sortedByTags.length; j++) {
                    if(i == sortedByTags[j].coincidence) {
                        arrayforsorting.push(sortedByTags[j]);
                    }
                }
                arrayforsorting.sort(compareDateUpDown);

                for(let k = 0; k < arrayforsorting.length; k++) {
                    sosortedByTagsandDate.push(arrayforsorting[k]);
                }
            }

            mainData = Object.assign([], sosortedByTagsandDate);

            showtoDisplay(mainData);
        }

        function filterByTyping() {
            var input, filter, title;
            var progileCard = document.getElementsByClassName("wrapper-profile-card");
 //           progileCard[0].style.display = "";
            input = document.getElementById("input-seatch-titles");
            filter = input.value.toUpperCase();
            titles = document.getElementsByClassName("title-profile");
            progileCard[0].style.display = "none";
            for (let i = 0; i < titles.length; i++) {
                if (titles[i].innerText.toUpperCase().indexOf(filter) > -1 || filter.length == 0) {
                    progileCard[i].style.display = "grid";
                } else {
                    progileCard[i].style.display = "none";
                }
            }
        }
        
        document.getElementById("input-seatch-titles").addEventListener("keyup", filterByTyping);

    })
    .catch((err) => console.log(err))

let getTenCards = document.getElementsByClassName("wrapper-profile-cards");

let getCards = document.getElementsByClassName("wrapper-profile-card");


