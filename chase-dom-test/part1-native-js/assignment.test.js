window.onload = function() {
  var assert = chai.assert;
  var expect = chai.expect;
  mocha.setup('tdd');

  suite('basic dom creation', function () {
    test("it creates a div", function () {
      let div = createDiv()

      assert.strictEqual(div.nodeName, 'DIV')
      assert.isNull(div.parentNode)
    })

    test("it creates a div with the specified class name", function () {
      let happyDiv = createDivWithClass('happy')
      let sadDiv = createDivWithClass('sad')

      assert.isTrue(happyDiv.classList.contains('happy'))
      assert.isTrue(sadDiv.classList.contains('sad'))
      assert.isFalse(sadDiv.classList.contains('happy'))
    })
  })

  suite('updateTodoList', function() {
    var ul;
    var addListText = function(text, precede) {
      var li = document.createElement('li');
      li.textContent = (precede.toUpperCase() + ' ' + text).trim();
      li.className = 'fooStyle'
      ul.appendChild(li);
    };

    setup(function() {
      ul = document.createElement('ul');
    });

    test('Removes items from a todo list', function() {
      addListText('Buy a House', 'COMPLETED');
      addListText('Paint the Rooms', '');
      addListText('Complete the Inspection', 'COMPLETED');
      addListText('Review the Documents', '');
      console.log('the ul', ul)
      updateTodoList(ul);
      assert.strictEqual(ul.childNodes.length, 2);
      assert.strictEqual(ul.firstChild.tagName, 'LI');
      assert.strictEqual(ul.firstChild.textContent, 'Paint the Rooms');
    });

    test('Update urgent list items', function() {
      addListText('Buy a House', '');
      addListText('Paint the Rooms', 'URGENT');
      addListText('Complete the Inspection', '');
      addListText('Review the Documents', 'URGENT');
      console.log('the ul', ul);
      updateTodoList(ul);
      assert.strictEqual(ul.childNodes.length, 4);
      assert.strictEqual(ul.childNodes[0].tagName, 'LI');
      assert.strictEqual(ul.childNodes[0].textContent, 'Buy a House');
      assert.strictEqual(ul.childNodes[1].tagName, 'LI');
      assert.strictEqual(ul.childNodes[1].textContent, 'URGENT Paint the Rooms');
      assert.strictEqual(ul.childNodes[1].className, 'fooStyle important');
      assert.strictEqual(ul.childNodes[2].tagName, 'LI');
      assert.strictEqual(ul.childNodes[2].className, 'fooStyle');
      assert.strictEqual(ul.childNodes[2].textContent, 'Complete the Inspection');
      assert.strictEqual(ul.childNodes[3].tagName, 'LI');
      assert.strictEqual(ul.childNodes[3].className, 'fooStyle important');
      assert.strictEqual(ul.childNodes[3].textContent, 'URGENT Review the Documents');
    });
  });

  suite('createList', function() {
    test('Creates an unordered list with no links', function() {
      var links = {};
      var list = createList(links);
      assert.strictEqual(list.tagName, 'UL');
      assert.strictEqual(list.childNodes.length, 0);
    });

    test('Creates an unordered list of links', function() {
      var links = {
        'Google': 'https://www.google.com',
        'Facebook': 'https://www.facebook.com',
        'Galvanize': 'https://www.galvanize.com'
      };
      var list = createList(links);
      assert.strictEqual(list.tagName, 'UL');
      assert.strictEqual(list.childNodes.length, 3);
      var node, url;
      for(var i = 0; i < list.childNodes.length; i++) {
        var node = list.childNodes[i];
        assert.strictEqual(node.tagName, 'LI');
        assert.strictEqual(node.childNodes.length, 1);
        assert.strictEqual(node.firstChild.tagName, 'A');
        url = links[node.firstChild.textContent];
        assert.strictEqual(node.firstChild.getAttribute('href'), url);
      }
    });
  });

  suite('extractQuote', function() {
    var article, p;
    setup(function() {
      article = document.createElement('article');
      p = document.createElement('p');
      article.appendChild(p);
    });

    test('Does not make any changes if there is no double quote', function() {
      p.textContent = 'There are no quotes here'
      extractQuote(article);
      assert.strictEqual(article.childNodes.length, 1);
      assert.strictEqual(article.firstChild.tagName, 'P');
      assert.strictEqual(article.firstChild.textContent, 'There are no quotes here');
    });

    test('Replaces a quote in a paragraph with a blockquote', function() {
      p.textContent = 'Neale Donald Walsch said, "Life begins at the end of your comfort zone." This is your daily quote.'
      extractQuote(article);
      assert.strictEqual(article.childNodes.length, 1);
      assert.strictEqual(article.firstChild.tagName, 'BLOCKQUOTE');
      assert.strictEqual(article.firstChild.textContent,
        '"Life begins at the end of your comfort zone."');
    });
  });

  suite('createTable', function() {
    var testRow = function(data, cellType, result) {
      assert.strictEqual(result.tagName, 'TR');
      assert.strictEqual(result.childNodes.length, data.length);
      for(var i = 0; i < data.length; i++) {
        assert.strictEqual(result.childNodes[i].tagName,
          cellType.toUpperCase());
        assert.strictEqual(result.childNodes[i].textContent,
          data[i].toString());
      }
    }

    var testTable = function(data, result) {
      assert.strictEqual(result.tagName, 'TABLE');
      assert.strictEqual(result.childNodes.length, 3);

      // Test the thead
      var theads = result.getElementsByTagName('thead');
      assert.strictEqual(theads.length, 1);
      assert.strictEqual(theads[0].childNodes.length, 1);
      testRow(data[0], 'th', theads[0].childNodes[0]);

      // Test the tfoot
      var tfoots = result.getElementsByTagName('tfoot');
      assert.strictEqual(tfoots.length, 1);
      assert.strictEqual(tfoots[0].childNodes.length, 1);
      testRow(data[data.length - 1], 'td', tfoots[0].childNodes[0]);

      // Test the tbody
      var tbodys = result.getElementsByTagName('tbody');
      assert.strictEqual(tbodys.length, 1);
      assert.strictEqual(tbodys[0].childNodes.length, data.length - 2);
      for (var i = 1; i < data.length - 1; i++) {
        testRow(data[i], 'td', tbodys[0].childNodes[i - 1]);
      }
    };

    test('Creates a table', function() {
      var data = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l']
      ];
      var table = createTable(data);
      testTable(data, table);
    });

    test('Creates with many elements', function() {
      var data = [
        ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'],
        ['Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Canidae', 'Canis', 'Canis lupus'],
        ['Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Felis', 'Felis catus'],
        ['Animalia', 'Cnidaria', 'Scyphozoa', 'Semaestomeae', 'Ulmaridae', 'Aurelia', 'Aurelia aurita'],
        ['King', 'Phillip', 'Came', 'Over', 'For', 'Good', 'Soup'],
      ];

      var table = createTable(data);
      testTable(data, table);
    });
  });

  mocha.run();
};
