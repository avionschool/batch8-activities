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
    // API auth key
    const apikey = 'CcuPyqRbDfjduAeMwDtydWTYD3Co3HDx'
    const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${q}`
    
    fetch(path).then(function(res) { // fetch the path and once resolved, handle it with callback to get a response
        return res.json(); // return the promise / data
    }).then(function(json) { // callback to hande the JSON that was returned from the response
    console.log(json.data[0].images.fixed_width.url); // get the actual data
    
    const getImages = document.getElementById('images-results');
    let imagesResults = '';
    
    json.data.forEach(function(obj) {
    console.log(obj);
    
    // variables for  GIF image attributes
    const url = obj.url;
    const url2 = obj.images.fixed_width.url;
    const width = obj.images.fixed_width.width;
    const height = obj.images.fixed_width.height;
    const title = obj.title;
    
    // display GIF
    imagesResults += `<a href="${url}" target="_blank"><img class="image-styles" src="${url2}" width="${width}" height="${height}" alt="${title}"></a>`
    })
    getImages.innerHTML = imagesResults;
    }).catch(function(err) { // error event handler / if the server got an error
        console.log(err.message);
    })
    }
    
    function getKeywordsList() {
    var keywordsList = [];
    keywordsList[0] = document.getElementById('btnKeyword').value;
    keywordsList[1] = document.getElementById('btnKeyword1').value;
    console.log(keywordsList);
    
    for ( var x = 0; x < keywordsList.length; x++) {
    if (keywordsList[x] == "laugh") {
        getKeywords();
    }else if (keywordsList[x] == "movies") {
        getKeywords();
        }
      }
    }
    
    function getKeywords() {
        const apikey = 'CcuPyqRbDfjduAeMwDtydWTYD3Co3HDx'
        // const keywords = document.getElementsByClassName('button').value;
        // document.getElementsByClassName('button').innerHTML = keywords;
        const keywords = [
            'laugh', 'movies'];
        // document.getElementById('btnKeyword').innerHTML = keywords;
    
        const path = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${keywords}`
    
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
    
                imagesResults += `<img class="image-styles" src="${url}" width="${width}" height="${height}" alt="${title}">`
            })
            getImages.innerHTML = imagesResults;
        }).catch(function(err) { // error event handler
            console.log(err.message);
        })
    }