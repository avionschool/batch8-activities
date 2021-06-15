window.onload=function() {
const searchForm = document.getElementById('search-form');
const inputSearch = document.getElementById('input-search');

    searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const q = inputSearch.value;
    getData(q);
})
}

function getData(q) {

    const apikey = 'CcuPyqRbDfjduAeMwDtydWTYD3Co3HDx'
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}`

    fetch(path).then(function(res) {
        return res.json();
    }).then(function(json) {
        console.log(json.data[0].images.fixed_width.url);
        const getImages = document.getElementById('images-results');
        let imagesResults = '';


        json.data.forEach(function(obj) {
            console.log(obj);

            const url = obj.images.fixed_width.url;
            const width = obj.images.fixed_width.width;
            const height = obj.images.fixed_width.height;
            const title = obj.title;

            imagesResults += `<img src="${url}" width="${width}" height="${height}" alt="${title}">`
        })
        getImages.innerHTML = imagesResults;
    }).catch(function(err) {
        console.log(err.message);
    })
}