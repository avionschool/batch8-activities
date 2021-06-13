// ==========================================
//            GLOBAL VARIABLES
// ==========================================

// container classes
let home = document.querySelector('#home');
let conversation = document.querySelector('#conversation');
let talk = document.querySelector('#talk');

let button = document.querySelector('#play');
let text = document.querySelector('#text');

// unsplash
let imgHolder = document.querySelector('#unsplash-img');

// JS SDK
const VoiceRSS = {
  speech: function (e) {
    this._validate(e), this._request(e);
  },
  _validate: function (e) {
    if (!e) throw 'The settings are undefined';
    if (!e.key) throw 'The API key is undefined';
    if (!e.src) throw 'The text is undefined';
    if (!e.hl) throw 'The language is undefined';
    if (e.c && 'auto' != e.c.toLowerCase()) {
      var a = !1;
      switch (e.c.toLowerCase()) {
        case 'mp3':
          a = new Audio().canPlayType('audio/mpeg').replace('no', '');
          break;
        case 'wav':
          a = new Audio().canPlayType('audio/wav').replace('no', '');
          break;
        case 'aac':
          a = new Audio().canPlayType('audio/aac').replace('no', '');
          break;
        case 'ogg':
          a = new Audio().canPlayType('audio/ogg').replace('no', '');
          break;
        case 'caf':
          a = new Audio().canPlayType('audio/x-caf').replace('no', '');
      }
      if (!a) throw 'The browser does not support the audio codec ' + e.c;
    }
  },
  _request: function (e) {
    var a = this._buildRequest(e),
      t = this._getXHR();
    (t.onreadystatechange = function () {
      if (4 == t.readyState && 200 == t.status) {
        if (0 == t.responseText.indexOf('ERROR')) throw t.responseText;
        new Audio(t.responseText).play();
      }
    }),
      t.open('POST', 'https://api.voicerss.org/', !0),
      t.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'),
      t.send(a);
  },
  _buildRequest: function (e) {
    var a = e.c && 'auto' != e.c.toLowerCase() ? e.c : this._detectCodec();
    return 'key=' + (e.key || '') + '&src=' + (e.src || '') + '&hl=' + (e.hl || '') + '&v=' + (e.v || '') + '&r=' + (e.r || '') + '&c=' + (a || '') + '&f=' + (e.f || '') + '&ssml=' + (e.ssml || '') + '&b64=true';
  },
  _detectCodec: function () {
    var e = new Audio();
    return e.canPlayType('audio/mpeg').replace('no', '') ? 'mp3' : e.canPlayType('audio/wav').replace('no', '') ? 'wav' : e.canPlayType('audio/aac').replace('no', '') ? 'aac' : e.canPlayType('audio/ogg').replace('no', '') ? 'ogg' : e.canPlayType('audio/x-caf').replace('no', '') ? 'caf' : '';
  },
  _getXHR: function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml3.XMLHTTP');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.6.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP.3.0');
    } catch (e) {}
    try {
      return new ActiveXObject('Msxml2.XMLHTTP');
    } catch (e) {}
    try {
      return new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
    throw 'The browser does not support HTTP request';
  },
};

// TEST IF API IS WORKING
// fetch('https://api.fungenerators.com/fact/random')
//   .then((response) => response.status)
//   .then((data) => console.log(data));

button.addEventListener('click', (e) => {
  e.preventDefault();
  VoiceRSS.speech({
    key: '3b34ee60c393405985cc968b8110ba78',
    src: text.value,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
});

// ==========================================
//            CLASSES
// ==========================================
let questArr = ['What can you see in the photo?', 'How does picture make you feel?', "What's the first thing that comes to your mind when you see this?", 'What colors can you see?'];

class Conversation {
  static generateQuestion(randNum) {
    return questArr[this.randomNum(randNum)];
  }

  static randomNum(num) {
    return Math.floor(Math.random() * num);
  }
}

class Settings {
  static getLanguagesKey() {
    let langKey;
    return (langKey = localStorage.getItem('languages') === null ? [] : JSON.parse(localStorage.getItem('languages')));
  }

  static saveLanguage(language) {
    const languages = Settings.getLanguagesKey();

    // will delete value of languages key first
    if (languages.length > 0) {
      languages.splice(0, 1);
    }

    languages.push(language);

    // languages.push(language);
    localStorage.setItem('languages', JSON.stringify(languages));
  }
}

// ==========================================
//            EVENT LISTENERS
// ==========================================

document.querySelector('#save').addEventListener('click', (e) => {
  e.preventDefault();
  const dropdown = document.querySelector('#language');
  const selectedLanguage = dropdown.options[dropdown.selectedIndex].value;
  Settings.saveLanguage(selectedLanguage);
});

document.querySelector('#unsplash-btn').addEventListener('click', () => {
  // displays random question
  document.querySelector('#questions').innerHTML = Conversation.generateQuestion(questArr.length);

  // fetch API
  fetch('https://api.unsplash.com/photos/random?client_id=64opOkeU6MywZlGJ_lWS643OKA_VEQ5ZhFEHnVF5_nM')
    .then((response) => response.json())
    .then((data) => {
      let img = data.urls.regular;
      imgHolder.style.opacity = '1.0';
      document.getElementById('unsplash-img').src = img;
    });
});

window.onload = () => {
  // hide elements
  conversation.classList.add('hide');
  conversation.classList.remove('show');
  talk.classList.add('hide');
  talk.classList.remove('show');
};

document.querySelector('#toggle').addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

document.querySelector('#home-link').addEventListener('click', () => {
  // hide other elements except home
  home.classList.add('show');
  home.classList.remove('hide');

  conversation.classList.remove('show');
  conversation.classList.add('hide');
  talk.classList.add('hide');
  talk.classList.remove('show');
});

document.querySelector('#conversation-link').addEventListener('click', () => {
  // hide other elements except conversation
  conversation.classList.add('show');
  conversation.classList.remove('hide');

  home.classList.remove('hide');
  home.classList.add('hide');
  talk.classList.add('hide');
  talk.classList.remove('show');
});

document.querySelector('#talk-link').addEventListener('click', () => {
  //hide elements except talk
  talk.classList.add('show');
  talk.classList.remove('hide');

  home.classList.remove('hide');
  home.classList.add('hide');
  conversation.classList.add('hide');
  conversation.classList.remove('show');
});

document.querySelector('#read').addEventListener('click', () => {
  fetch('https://uselessfacts.jsph.pl/random.json?language=en')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
});
