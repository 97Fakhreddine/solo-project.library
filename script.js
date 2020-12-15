function each(coll, func) {
  if (Array.isArray(coll)) {
    for (var i = 0; i < coll.length; i++) {
      func(coll[i], i);
    }
  } else {
    for (var key in coll) {
      func(coll[key], key);
    }
  }
}
function map(coll, f) {
  var acc = [];
  if (!Array.isArray(coll)) {
    acc = {};
  }
  each(coll, function (element, key) {
    acc[key] = f(element, key);
  });
  return acc;
}

function filter(coll, predicate) {
  var acc = [];
  if (!Array.isArray(coll)) {
    acc = {};
  }
  each(coll, function (value, key) {
    if (predicate(value, key)) {
      if (Array.isArray(coll)) {
        acc.push(value);
      } else {
        acc[key] = value;
      }
    }
  });
  return acc;
}
// these functions above are online for looping.
function bookStore() {
  var books = {};
  books.store = [];
  books.archive = [];
  books.createandAddBook = createandAddBook;
  books.searchBook = searchBook;
  books.removeBook = removeBook;
  books.updateBook = updateBook;
  books.restoreBook = restoreBook;
  return books;
}
var counter = 0;
var createandAddBook = function (title, price, author, cover) {
  counter += 1;
  var book = {
    id: counter,
    title: title,
    price: price,
    author: author,
    cover: cover,
  };
  this.store.push(book);
};

var searchBook = function (title, array) {
  console.log(title);
  var result = "Your book is not found";
  for (var i = 0; i < array.length; i++) {
    console.log(array[i].title.toUpperCase(), title.toUpperCase());
    if (array[i].title.toUpperCase() === title.toUpperCase()) {
      console.log("Found it !");
      return array[i];
    }
  }
  return result;
};

// var searchBook = function (title, array) {
//   each(array, function (element, i) {
//     console.log(i);
//     console.log(element.title.toUpperCase(), title.toUpperCase());
//     if (element.title.toLocaleUpperCase() === title.toLocaleUpperCase()) {
//       console.log("Found it !", element);
//       return element;
//     }
//     console.log("Your book is not found");
//   });
// };

var removeBook = function (title) {
  var that = this;
  for (var i = 0; i < that.store.length; i++) {
    if (title.toUpperCase() === that.store[i].title.toUpperCase()) {
      var obj = that.store[i];
      that.archive.push(obj);
      that.store.splice(i, 1);
    }
  }
  return;
};
var updateBook = function (title, newPrice) {
  var that = this;
  that.searchBook(title, that.store).price = newPrice;
  console.log(that.searchBook(title, that.store).price);
};
var restoreBook = function (title) {
  var index = this.searchBook(title, this.archive);
  console.log(index);
  this.store.push(index);
  this.archive.splice(index, 1);
};
// ---------------------------these are some books in the store----------------------
var library = bookStore();
library.createandAddBook(
  "Nothing left to lose",
  0,
  "Kirsty Moseley",
  "/books photos/nothing left to lose.jpg"
);

library.createandAddBook(
  "harry potter",
  0,
  "J. K. Rowling",
  "/books photos/71EwgGuAS9L._AC_SL1000_.jpg"
);

library.createandAddBook(
  "Dance of the Gods",
  0,
  "Nora Roberts",
  "/books photos/dance of the god.jpg"
);
library.createandAddBook(
  "Harry Potter and the Philosopher's Stone",
  0,
  "J. K. Rowling",
  "https://images-na.ssl-images-amazon.com/images/I/81iqZ2HHD-L.jpg"
);
library.createandAddBook(
  "Fifty Shades of Grey",
  0,
  "E. L. James",
  "https://images.penguinrandomhouse.com/cover/9780804172073"
);
library.createandAddBook(
  "Live Me",
  0,
  "Celeste Grande",
  "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1517366811l/38306220._SY475_.jpg"
);

// /-------------this is the first button for showing add book--------------------
$(".button-addbook").hide();
$(".add").click(function () {
  $(".adddiv").hide("slow");
  $(".button-addbook").show("slow");
});
$(".removee").click(function () {
  $(".button-addbook").hide("slow");
  $(".adddiv").show("slow");
});
// ------------------------------------------------------------------------------
$("#addbook-button").on("click", function () {
  console.log($("#title-button").val());
  var title = $("#title-button").val();
  var price = $("#Price-button").val();
  var author = $("#Author-button").val();
  var cover = $("#link-image-button").val();
  library.createandAddBook(title, price, author, cover);
  $("#title-button").val("");
  $("#Price-button").val("");
  $("#Author-button").val("");
  $("#link-image-button").val("");
  $("#addbook-button").after("<h1 id='resultOfaddingBook'>Done!</h1>");
});

//-------------- this fuction down here is used to search for a book in the DOM---------

$(".btn-s").on("click", function () {
  $(".searching-result").empty();
  var input = $("#s1").val();
  if (
    searchBook($("#s1").val(), library.store) === "Your book is not found" ||
    !input
  ) {
    $(".searching-result").empty();
    var notFound =
      "<p id='foundBook-pricee'  >" +
      "please check your research  title,your book does not exist " +
      "</p>";
    $(".searching-result").append(notFound);
    return;
  }

  if (input) {
    var foundBook = searchBook(input, library.store);
    var img =
      "<img src='" +
      foundBook.cover +
      "' style='width:40% ; height: 100% ;'  >";
    var result1 =
      "<p id='foundBook-result' class='found-book'  >" +
      foundBook.title +
      "</p>";
    var Price1 =
      "<p id='foundBook-price'  >It Cost's : $" + foundBook.price + "</p>";
    var Author1 =
      "<p class='found-book' > Written by :" + foundBook.author + "</p>";
    $(".searching-result").append(img);
    $(".searching-result").append(result1);
    $(".searching-result").append(Author1);
    $(".searching-result").append(Price1);
    $("#s1").val("");
    return;
  }
  $(".searching-result").empty();
  var notFound =
    "<p id='foundBook-pricee'  >" +
    "please check your research  title,your book does not exist " +
    "</p>";
  $(".searching-result").append(notFound);
});

// ----------------------this part will be for the updating book ----------------------
$(".btn-s2").on("click", function () {
  $(".updating-price").empty();
  var xtitle = $("#s2").val();
  var yprice = $("#s22").val() * 1;
  console.log("this is the price input ===> ", yprice);
  if (
    !xtitle ||
    searchBook(xtitle, library.store) === "Your book is not found"
  ) {
    $(".updating-price").append(
      "<h1 id='updatingDisplay'> please check your research  title,your book does not exist !!</h1>"
    );
    $("#s2").val("");
    $("#s22").val("");
    return;
  } else {
    library.updateBook(xtitle, yprice);
    $(".updating-price").append(
      "<h1 id='updatingDisplay'>Thanks for your  updating price !</h1>"
    );
    $("#s2").val("");
    $("#s22").val("");
  }
});
//------------------------------------ done!!------------------------------------------------
// ------------------------this function of deleting book ------------------------------------
$(".btn-s3").on("click", function () {
  $(".removing-result").empty();
  var newTitle = $("#s3").val();
  if (
    !newTitle ||
    searchBook(newTitle, library.store) === "Your book is not found"
  ) {
    $(".removing-result").append(
      "<h1 id='updatingDisplay'> please check your research  title,your book does not exist !!</h1>"
    );
    $("#s3").val("");
    return;
  }
  library.removeBook(newTitle);
  console.log("thiis =>", library.removeBook(newTitle));
  $(".removing-result").append(
    "<h1 id='updatingDisplay'>the book has been deleted !</h1>"
  );
  $("#s3").val("");
});
// ----------------------------------------------------------------------------------
$(".btn-s4").on("click", function () {
  $(".restored-book").empty();
  var newTitle = $("#s4").val();
  if (
    !newTitle ||
    searchBook(newTitle, library.archive) === "Your book is not found"
  ) {
    $(".restored-book").append(
      "<h1 id='updatingDisplay'> please check your research  title, your book does not exist !!</h1>"
    );
    $("#s4").val("");
    return;
  }
  library.restoreBook(newTitle);
  $(".restored-book").append(
    "<h1 id='updatingDisplay'>the book has been restored !</h1>"
  );
  $("#s4").val("");
});
// -------------------------------------------------------------------------------

for (var i = 0; i < library.store.length; i++) {
  $(".portfolio").append(`
        <div class="categoryStore">
          <img src="${library.store[i].cover}" alt="" class='storeCovering'/>
          <p id='storeCovering'>${library.store[i].title}</p>
      </div>`);
}
$(".btn-s").on("click", function () {
  for (var i = 0; i < library.store.length; i++) {
    $(".portfolio").append(`
        <div class="categoryStore">
          <img src="${library.store[i].cover}" alt="" class='storeCovering'/>
          <p id='storeCovering'>${library.store[i].title}</p>
      </div>`);
  }
});

function go() {
  location.replace("store.html");
}
function goback() {
  location.replace("index.html");
}
function about() {
  location.replace("https://github.com/97Fakhreddine");
}
