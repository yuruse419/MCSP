// Define a function named createDiv that takes no arguments.
// Return a <div> element.
function createDiv() {
  return document.createElement('div');
}

// Define a function named createDivWithClass that takes one argument.
//   className (string)
//
// Return a <div> element with the given className.
function createDivWithClass(className) {
  var newDiv = createDiv();
  
  newDiv.className = className;

  return newDiv;
}



// Define a function named updateTodoList that takes one argument.
//   todoList (<ul> DOM element)
//
// The function must iterate over its list items (<li>) and do the following:
//   * Remove items from the list if its text starts with "COMPLETED"
//   * Applies the "important" CSS class if its text starts with "URGENT".
//     TIP: Applying a CSS class means adding on top of what's already there.
//   * Make no change otherwise
function updateTodoList(todoList) {
  var listElements = todoList.getElementsByTagName('li'); //HTMLCollection of elements within todoList that have a tag name 'li'

  for(var i = 0; i < listElements.length; i++) {
    if(listElements[i].textContent.startsWith('COMPLETED')) { //includes is another string method
      listElements[i].remove();
    }
    else if(listElements[i].textContent.startsWith('URGENT')) {
      listElements[i].classList.add('important');
    }
  }
}


// Define a function named createList that takes one argument.
//   createList (object)
//
// The object has the following structure:
//    {
//      'TITLE': 'URL',
//      'TITLE': 'URL',
//      'TITLE': 'URL',
//      ...
//    }
//
// The function must return an <ul> element that contains <li> elements that
// each contain an <a> element. For example, given:
//    {
//      'Google': 'https://www.google.com',
//      'Facebook': 'https://www.facebook.com',
//      'GitHub': 'https://github.com',
//      'Galvanize': 'https://www.galvanize.com'
//    }
//
// It returns the following:
//    <ul>
//      <li><a href="https://www.google.com">Google</a></li>
//      <li><a href="https://www.facebook.com">Facebook</a></li>
//      <li><a href="https://github.com">GitHub</a></li>
//      <li><a href="https://www.galvanize.com">Galvanize</a></li>
//    </ul>
function createList(createListObj) {
  var ulEle = document.createElement('ul');
  var liEle;
  var anchorA;

  for(var key in createListObj) {
    liEle = document.createElement('li');
    anchorA = document.createElement('a');
    anchorA.href = createListObj[key];
    anchorA.textContent = key;

    liEle.appendChild(anchorA);
    ulEle.appendChild(liEle);
  }

  return ulEle;
}



// Write a function named extractQuote that takes in one argument.
//   article (<article> DOM element)
//
// Assume the article contains a paragraph. For example:
//
//    <article>
//      <p>Neale Donald Walsch once said, "Life begins at the end of your
//      comfort zone." This is really important.</p>
//    </article>
//
// The function must check the paragraph for double quotes ("), extract it out,
// add it to the text of a <blockquote> element, and then replace the paragraph
// with that blockquote. For example, given the  above input, it must change the
// article as following:
//
//    <article>
//      <blockquote>"Life begins at the end of your comfort zone."</blockquote>
//    </article>
//
// No changes should be made if there's no quote.
//
// TIP: Assume that if there's an opening double quote, there's a closing
// double quote as well.
function extractQuote(articleTag) {
  var text = articleTag.querySelector('p');
  var start = text.textContent.indexOf('"');

  if(start !== -1) {
    var end = text.textContent.lastIndexOf('"');
    var blockquote = document.createElement('blockquote');

    blockquote.textContent = text.textContent.slice(start, end + 1);
    articleTag.replaceChild(blockquote, text);
  }
}

// Define a function named createTable that takes one argument.
//   data (array of arrays)
//
// The function must return a <table> DOM element that matches the structure of
// the input data. The first element in the data array is the <thead> data, the
// last element is the <tfoot> data, and the remaining elements form the <tbody>
// data. For example, given the following input:
//    [
//      ['a', 'b', 'c'],
//      ['d', 'e', 'f'],
//      ['g', 'h', 'i'],
//      ['j', 'k', 'l']
//    ]
//
// the function returns
//
// <table>
//   <thead>
//     <tr>
//       <th>a</th>
//       <th>b</th>
//       <th>c</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>d</td>
//       <td>e</td>
//       <td>f</td>
//     </tr>
//     <tr>
//       <td>g</td>
//       <td>h</td>
//       <td>i</td>
//     </tr>
//   </tbody>
//   <tfoot>
//     <tr>
//       <td>j</td>
//       <td>k</td>
//       <td>l</td>
//     </tr>
//   </tfoot>
// </table>
//
// TIP: Assume that data array has at least three elements.
// TIP: Assume that the elements of the data array are equal in length.
function createTable(data) { //data is an array of arrays
  var domTable = document.createElement('table'); //<table> element

  var tableHead = document.createElement('thead'); //<thead> element
  var tableBody = document.createElement('tbody'); //<tbody> element
  var tableFoot = document.createElement('tfoot'); //<tfoot> element

  var headRow = document.createElement('tr'); //<tr> element 
  var bodyData; //document.createElement('tr'); //<tr> element
  var footData = document.createElement('tr'); //<tr> element

  var headH; //<th> element
  var bodyD; //<td> element
  var footD; //<td> element

  for(var i = 0; i < data.length; i++) {
    for(var j = 0; j < data[i].length; j++) {
      if(i === 0) { //first data element: <thead>
        headH = document.createElement('th');
        headH.textContent = data[i][j];
        headRow.appendChild(headH);
      }
      else if(i === data.length - 1) { //last data element: <tfoot>
        footD = document.createElement('td');
        footD.textContent = data[i][j];
        footData.appendChild(footD);
      }
      else { //the rest: <tbody>
        if(j === 0) { //new row within table
          bodyData = document.createElement('tr');
        }

        bodyD = document.createElement('td');
        bodyD.textContent = data[i][j];
        bodyData.appendChild(bodyD);

        if(j === data[i].length - 1) { //last column within row
          tableBody.appendChild(bodyData); //append one row's worth of body data to tableBody
        }
      }
    }
  }

  //append heading rows and foot data to tableHead and tableFoot
  tableHead.appendChild(headRow);
  tableFoot.appendChild(footData);

  //append tableHead, tableBody, and tableFoot to domTable
  domTable.replaceChildren(tableHead, tableBody, tableFoot);

  // document.body.appendChild(domTable);

  return domTable;
}