
document.addEventListener('DOMContentLoaded', function () {

   function getEmojis(data){

    const categoryDropdown = document.getElementsByClassName('category')[0];
    const groupDropdown = document.getElementsByClassName('group')[0];
    const byDropdown = document.getElementsByClassName('basedOn')[0];

   const categoryValue = categoryDropdown.value;
   const groupValue = groupDropdown.value;
   const byValue = byDropdown.value;

   if(data == 'category'){

    fetch(`https://emojihub.yurace.pro/api/${byValue}/${data}/${categoryValue}`)
    .then(response => response.json())
    .then( (result)  => {
        
        console.log(result);

        displayEmoji(result);
        
    })
    .catch(error => console.log('error', error));

   }else{

    fetch(`https://emojihub.yurace.pro/api/${byValue}/${data}/${groupValue}`)
    .then(response => response.json())
            .then((result)  => {
        
                console.log(result);
        
                displayEmoji(result);
                
            })
            .catch(error => console.log('error', error));

   }

}

function displayEmoji(result){
    
    let divTag2 = divTag("emojicontainer");

    let h3Tag = document.createElement('h3');
h3Tag.innerHTML = 'Emojis'

var rowDiv = divTag("row");

result.forEach((result, index) => {

      // Assuming result[i].htmlCode is an array
let emojiHtml = result.htmlCode.join(''); // Join HTML codes if it's an array

    let divtag3 = divTag("col-lg-3 col-sm-12"); // Create a column div
        let divtag4 = divTag("card");
        let divtag5 = divTag("card-header");

        divtag5.innerHTML = `Name: ${result.name}`;
   
   let divtag6 = divTag("card-body");

   let ptag = document.createElement("p");
   ptag.innerHTML = `Group: ${result.group}`;

   let ptag1 = document.createElement("p");
   ptag1.innerHTML = `emoji : ${emojiHtml}`;

   divtag6.append(ptag, ptag1);
        divtag4.append(divtag5, divtag6);
        divtag3.appendChild(divtag4);

   if (index % 5 === 0) {
    // Close the current row and start a new one every 5 cards
    document.body.appendChild(rowDiv);
    rowDiv = divTag("row");
}

rowDiv.appendChild(divtag3);

    })

divTag2.append(h3Tag,rowDiv);

var resultDiv = document.getElementById('resultDiv');
  resultDiv.innerHTML = ''; // Clear previous result
  resultDiv.appendChild(divTag2);

}

const categories = {
    'smileys-and-people': ['body', 'cat-face', 'clothing', 'emotion', 'face-positive'],
    'animals-and-nature': ['animal-bird', 'animal-mammal', 'plant-flower'],
    'food-and-drink': ['drink', 'food-fruit', 'food-sweet'],
    'travel-and-places': ['travel-and-places'],
    'activities': ['activities'],
    'objects': ['objects'],
    'symbols': ['symbols'],
    'flags': ['flags']
};

function loadGroups() {

    const categoryDropdown = document.getElementsByClassName('category')[0];
    const groupDropdown = document.getElementsByClassName('group')[0];

    console.log(categoryDropdown);

    const selectedCategory = categoryDropdown.value;

     // Clear previous groups
     groupDropdown.innerHTML = '';

    // If a category is selected, populate the corresponding groups
    if (selectedCategory && categories[selectedCategory]) {
        categories[selectedCategory].forEach(group => {
            const option = optionTag(group);
            groupDropdown.appendChild(option);
        });
    }
}

function divTag(nameOfClass){
    var divTag = document.createElement('div');
    divTag.className = nameOfClass;
    return divTag;
}

function optionTag(value){
let option = document.createElement('option');
option.value = value;
option.text = value;
return option;
}

function labelTag(labelName){
    let label = document.createElement("Label");
    label.setAttribute("for", labelName);
    label.innerHTML=labelName+" : ";
    return label;
}

let divTag1 = divTag('display');

let h1Tag = document.createElement('h1');
h1Tag.innerHTML = 'Emoji Searcher';

let hrTag = document.createElement('hr');

let br1 = document.createElement('br');

let br11 = document.createElement('br');



let label1 = labelTag('Emoji Category');

let selectTag = document.createElement('select');
selectTag.className = 'category';
selectTag.onchange = loadGroups;

let option0 = document.createElement('option');
option0.value = "";
option0.text = "Select the Category";
selectTag.appendChild(option0);

let option1 = optionTag('smileys-and-people');
selectTag.appendChild(option1);

let option2 = optionTag('animals-and-nature');
selectTag.appendChild(option2);

let option3 = optionTag('food-and-drink');
selectTag.appendChild(option3);

let option4 = optionTag('travel-and-places');
selectTag.appendChild(option4);

let option5 = optionTag('activities');
selectTag.appendChild(option5);

let option6 = optionTag('objects');
selectTag.appendChild(option6);

let option7 = optionTag('symbols');
selectTag.appendChild(option7);

let option8 = optionTag('flags');
selectTag.appendChild(option8);

let br2 = document.createElement('br');
let br12 = document.createElement('br');

let label2 = labelTag('To Get Emojis based on')

let selectTag1 = document.createElement('select');
selectTag1.className = 'basedOn';

let option11 = optionTag('all');
selectTag1.appendChild(option11);

let option12 = optionTag('random');
selectTag1.appendChild(option12);

let br3 = document.createElement('br');

let br13 = document.createElement('br');

let label3 = labelTag('Emoji Groups');

let selectTag2 = document.createElement('select');
selectTag2.className = 'group'

let option01 = document.createElement('option');
option01.value = "";
option01.text = "Select the group";
selectTag2.appendChild(option01);

let br4 = document.createElement('br');

let br14 = document.createElement('br');

let button = document.createElement('button');
button.innerHTML = "Get Emoji by Group";
button.type = 'button';
button.addEventListener('click', () => getEmojis('group'));

let button1 = document.createElement('button');
button1.innerHTML = "Get Emoji by category";
button1.type = 'button';
button1.addEventListener('click', () => getEmojis('category'));

divTag1.append(h1Tag,hrTag,br1,label1,selectTag,br2,br12,label2,selectTag1,br3,br13,label3,selectTag2,
    br4,br14,button,button1);

document.body.append(divTag1);

var resultDiv = document.createElement('div');
resultDiv.setAttribute("id", "resultDiv");
document.body.appendChild(resultDiv);

})
