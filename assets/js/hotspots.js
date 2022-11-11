// select elements and store them in variables
let categoryContainerEl = document.querySelector("#category-buttons-container");
let hotSpotsEl = document.querySelector("#hotSpots");
let searchForm = document.querySelector("#searchForm");
let searchInput= document.querySelector("#searchInput");


  function getHotspot(cat) {
      console.log("inside getHotpot(", cat, ")");
      // *** compose API URL
      let apiUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${cat.trim().replace(" ", "+")}&location=San Diego&categories=${cat.trim().replace(" ", "+")}&limit=6&image_url&name&rating`;
      var bearer =
        "Bearer " +
        "VQRWH_9SUAQdwLRaHUYIClL3GJ_Aqg6cjrxxN6tEUT6zC2J_2KbnyuiO0euxKAjx-vYckwlwynJcIGxBgpiz4Geih0KRFxh9oFOKt0jklgA9qlTQe8JL0lW3_dNpY3Yx";
      // get data from API server
      fetch(apiUrl, {
        headers: { Authorization: bearer },
      })
        .then(function (response) {
          console.log(response);
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          //     // *** store required data in variables
        template = ``;
        console.log(data.businesses.length);
        for (let i = 0; i < data.businesses.length; i++) {
          var name = data.businesses[i].name;    
          var rating = data.businesses[i].rating;
          var location = data.businesses[i].location.display_address;
          var imageUrl = data.businesses[i].image_url;
          var url = data.businesses[i].url;
          console.log(name,rating,location,imageUrl,url)
              // *** build HTML and display project ideas
          template += `            
            <div class="col-12 col-md-6 fs-5 p-3">                
                <a href="${url}">
                  <image src="${imageUrl}" height="580" width="500">
                </a>
                <div><strong>${name}</strong></div>
                <div>Rating: ${rating} ⭐</div>
                <div>${location}</div>                
            </div>            
          `;               
          hotSpotsEl.innerHTML = template;
        }               
        });
    }

//when page is loaded, parse query string from the URL to get the category
let query = document.location.search;
// if there is query string
if (!!query) {

    let category = query.split("=")[1];
    console.log("category:", category);
    // if there is a catogory
    if (!!category) {
        getHotspot(category);
    }
}

//when user click on a category button 
categoryContainerEl.addEventListener("click", function(event){
    let category = event.target.textContent;
    getHotspot(category);
});

// Adding a search bar for user to search location (future development)
// searchForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log(searchInput.value);
// })

