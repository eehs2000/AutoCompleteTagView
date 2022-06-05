const search = document.getElementById("search");
const matchList = document.getElementById("search-list");

const searchItems = async (searchItem) => {
  const result = await fetch("../db.json")
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
  const searchList = result.tagDB;

  let matching = searchList.filter((text) => {
    const regexp = new RegExp(`^${searchItem}`, "gi");
    // console.log(regexp);
    // console.log(text.tags);
    for (let i = 0; i < text.tags.length; i++) {
      let tmp = text.tags[i].match(regexp);
      if (tmp != null) {
        return tmp;
      }
    }
  });
  if (matching.length === searchList.length) {
    matching = [];
    matchList.innerHTML = "";
  }

  const convertToHtml = (matching) => {
    if (matching.length > 0) {
      const html = matching
        .map(
          (match) => `
    <div>
      <img class="matchingImg" src="${match.image}"/>
      <span class="matchingText">${match.tags}</span>
    </div>`
        )
        .join("");
      matchList.innerHTML = html;
    }
  };

  convertToHtml(matching);

  console.log(matching);
};

search.addEventListener("input", () => searchItems(search.value));
