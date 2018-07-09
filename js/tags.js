// Here is a code for displaying tags 

var linkAddTags = document.getElementsByClassName("add-tags-link")[0];
var tagsInput = document.getElementsByClassName("tags-input")[0];
var closeBtnTags = document.getElementsByClassName("done-close-btn")[0];
var closeTags = tagsInput.getElementsByClassName("close");   // close Tags
var getTags = tagsInput.getElementsByClassName("tag");
var mainInput, hiddenInput;

linkAddTags.addEventListener("click", addingTags);

for(let i = 0; i < closeTags.length; i++) {
    closeTags[i].addEventListener("click", (e) => {
        e.target.parentElement.remove();
    });
}

function addingTags() {

    linkAddTags.style.display = "none";
    closeBtnTags.style.display = "inline-block";
    tagsInput.style.backgroundColor = "white";

    [].forEach.call(document.getElementsByClassName('tags-input'), function (el) {

        tags = [];

        hiddenInput = document.createElement('input');
        mainInput = document.createElement('input');
        if(getTags.length > 0) {
            for(let i = 0; i < getTags.length; i++) {
                let tag = {
                    text: getTags[i].value,
                    element: getTags[i]
                }
                tags.push(tag);

                tag.element.getElementsByClassName("close")[0].addEventListener('click', function () {
                    removeTag(tags.indexOf(tag));
                });
            }
        }
        
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', el.getAttribute('data-name'));
    
        mainInput.setAttribute('type', 'text');
        mainInput.classList.add('main-input');

        mainInput.addEventListener('input', function () {
            let enteredTags = mainInput.value.split(',');
            if (enteredTags.length > 1) {
                enteredTags.forEach(function (t) {
                    let filteredTag = filterTag(t);
                    if (filteredTag.length > 0)
                        addTag(filteredTag);
                });
                mainInput.value = '';
            }
        });
    
        mainInput.addEventListener('keydown', function (e) {
            let keyCode = e.which || e.keyCode;
            if (keyCode === 8 && mainInput.value.length === 0 && tags.length > 0) {
                console.log(tags.length);
                removeTag(tags.length - 1);
            }
    
            if(keyCode === 13 && mainInput.value) {
                addTag(filterTag(mainInput.value));
                mainInput.value = "";
            }
        });
    
        el.appendChild(mainInput);
        el.appendChild(hiddenInput);
    
       // addTag('hello!');      example for adding tag

       function addTag (text) {
            let tag = {
                text: text,
                element: document.createElement('span'),
            };
        
            tag.element.classList.add('tag');
            tag.element.textContent = tag.text;
        
            let closeBtn = document.createElement('span');
            closeBtn.classList.add('close');
            closeBtn.addEventListener('click', function () {
                removeTag(tags.indexOf(tag));
            });
            tag.element.appendChild(closeBtn);
        
            tags.push(tag);
        
            el.insertBefore(tag.element, mainInput);
        
            refreshTags();
        }
    
        function removeTag (index) {
            let tag = tags[index];
            tags.splice(index, 1);
            tag.element.remove();
            refreshTags();
        }
    
        function refreshTags () {
            let tagsList = [];
            tags.forEach(function (t) {
                tagsList.push(t.text);
            });
            hiddenInput.value = tagsList.join(',');
        }
    })
}

function filterTag (tag) {
    return tag.replace(/[^\w -]/g, '').trim().replace(/\W+/g, '-');
}

closeBtnTags.addEventListener("click", removeMainHiddenInputs);

function removeMainHiddenInputs() {

    tagsInput.style.backgroundColor = "transparent";
    linkAddTags.style.display = "inline-block";
    closeBtnTags.style.display = "none";

    if(mainInput.value) {
        let tag = {
            text: filterTag(mainInput.value),
            element: document.createElement('span'),
        };
    
        tag.element.classList.add('tag');
        tag.element.textContent = tag.text;
    
        let closeBtn = document.createElement('span');
        closeBtn.classList.add('close');
        closeBtn.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        });

        tag.element.appendChild(closeBtn);

        tagsInput.appendChild(tag.element);

    }

    if(mainInput && hiddenInput) {
        mainInput.remove();
        hiddenInput.remove();
    }
}


function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}