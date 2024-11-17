var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");

var bookmarkList = [];

if (localStorage.getItem("Bookmarks") != null) {
    bookmarkList = JSON.parse(localStorage.getItem("Bookmarks"));
    displayBookmarks(bookmarkList);
}
//^-------------------------------------------------------- addBookmark ----------------------------------------------------------------
function addBookmark() {
    var bookmark = {
        siteName: bookmarkNameInput.value,
        siteURL: bookmarkURLInput.value,
    };

    if (isBookmarkNameUnique(bookmark.siteName)) {
        if (isValidName(bookmark.siteName) && isValidURL(bookmark.siteURL)) {
            bookmarkList.push(bookmark);
            localStorage.setItem("Bookmarks", JSON.stringify(bookmarkList));
            displayBookmarks(bookmarkList);
            clearForm();
            console.log(bookmarkList);
        } else {
            swal({
                title: "Name or URL is not valid!",
                text: `Please follow the rules below:
                > Site name must contain at least 3 characters
                > The URL must start with either http or https followed by ://
                  it must contain www. followed by subdomain of length(2, 256)
                  last part contains top level domain like .com, .org etc.`,
            });
        }
    } else {
        swal({
            title: "Bookmark name already exists!",
            text: "Please enter a unique bookmark name.",
        });
    }
}
//!-------------------------------------------------------- Validation ----------------------------------------------------------------
function isBookmarkNameUnique(name) {
    return !bookmarkList.some((bookmark) => bookmark.siteName === name);
}

function isValidName(name) {
    var validName = /^\w{3,}(\s+\w+)*$/;
    return validName.test(name);
}

function isValidURL(url) {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
        "i"
    );
    return pattern.test(url);
}

function validNameInput() {
    if (isValidName(bookmarkNameInput.value)) {
        bookmarkNameInput.classList.remove("is-invalid");
        bookmarkNameInput.classList.add("is-valid");
    } else {
        bookmarkNameInput.classList.remove("is-valid");
        bookmarkNameInput.classList.add("is-invalid");
    }
}

function validURLInput() {
    if (isValidURL(bookmarkURLInput.value)) {
        bookmarkURLInput.classList.remove("is-invalid");
        bookmarkURLInput.classList.add("is-valid");
    } else {
        bookmarkURLInput.classList.remove("is-valid");
        bookmarkURLInput.classList.add("is-invalid");
    }
}
//^---------------------------------------------------------- clearForm ----------------------------------------------------------------
function clearForm() {
    bookmarkNameInput.value = "";
    bookmarkURLInput.value = "";
    bookmarkNameInput.classList.remove("is-valid");
    bookmarkURLInput.classList.remove("is-valid");
}
//^-------------------------------------------------------- displayBookmarks -----------------------------------------------------------
function displayBookmarks(bookmarkList) {
    var tableContent = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        tableContent += `
    <tr>
      <td class="pt-3">${i + 1}</td>
      <td class="pt-3">${bookmarkList[i].siteName}</td>
      <td><button class="btn btn-outline-main" onclick="visitWebsite(${i});"><i class="fa-solid fa-eye"></i> Visit</button></td>
      <td><button class="btn btn-outline-main" onclick="deleteBookmark(${i});"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `;
    }

    document.getElementById("bookmarkContent").innerHTML = tableContent;
}
//^--------------------------------------------------------- visitWebsite ------------------------------------------------------------
function visitWebsite(i) {
    var httpRegEx = /^https?:\/\//;
    if (httpRegEx.test(bookmarkList[i].siteURL)) {
        window.open(bookmarkList[i].siteURL);
    } else {
        window.open(`https://${bookmarkList[i].siteURL}`);
    }
}
//^-------------------------------------------------------- deleteBookmark -----------------------------------------------------------
function deleteBookmark(i) {
    bookmarkList.splice(i, 1);
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarkList));
    displayBookmarks(bookmarkList);
}
