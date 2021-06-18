// ==========================================
//            GLOBAL VARIABLES
// ==========================================

let containers = document.querySelectorAll('.container');
let settings = document.querySelector('#settings-modal');
let questArr = ['What can you see in the photo?', 'How does picture make you feel?', "What's the first thing that comes to your mind when you see this?", 'What colors can you see?'];

// Speech to text API
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

// ==========================================
//            --FUNCTIONS
// ==========================================

async function callUnsplashAPI() {
  document.querySelector('#image').classList.add('loader');
  document.querySelector('#image').style.backgroundImage = 'none';

  return fetch('https://api.unsplash.com/photos/random?client_id=64opOkeU6MywZlGJ_lWS643OKA_VEQ5ZhFEHnVF5_nM')
    .then((response) => response.json())
    .then((data) => {
      document.querySelector('#image').classList.remove('loader');
      return data;
    });
}

async function callFactsAPI() {
  const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
  if (!response.ok) {
    throw new Error(`Error with Random Facts API. status: ${response.statusText}`);
  }
  return await response.json();
}

function textToSpeech(text) {
  VoiceRSS.speech({
    key: '3b34ee60c393405985cc968b8110ba78',
    src: text,
    hl: Conversation.getLanguage(),
    v: Conversation.getVoice(),
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

// ==========================================
//            --CLASSES
// ==========================================

class Conversation {
  static generateQuestion(randNum) {
    return questArr[this.randomNum(randNum)];
  }

  static randomNum(num) {
    return Math.floor(Math.random() * num);
  }

  static getLanguage() {
    const languages = Settings.getLanguagesKey();

    // if there's no value will default to english (US)
    if (languages.length === 0) {
      return 'en-us';
    } else {
      // splits value by colon and stores into an array
      return languages[0].split(':')[0];
    }
  }

  static getVoice() {
    const languages = Settings.getLanguagesKey();
    // if there's no value will default to Linda
    if (languages.length === 0) {
      return 'Linda';
    } else {
      return languages[0].split(':')[1];
    }
  }
}

class Settings {
  static getLanguagesKey() {
    let langKey;
    return (langKey = localStorage.getItem('languages') === null ? [] : JSON.parse(localStorage.getItem('languages')));
  }

  static saveLanguage(language) {
    const languages = Settings.getLanguagesKey();

    if (languages.length > 0) {
      // delete value to overwrite later
      languages.splice(0, 1);
    }

    languages.push(language);
    localStorage.setItem('languages', JSON.stringify(languages));
  }

  static displayError(type) {
    let msg;
    switch (type) {
      case 'languageError':
        msg = 'Please select a language first.';
        break;
      case 'success':
        msg = 'Success. Changes saved.';
        break;
      default:
        break;
    }

    return msg;
  }
}
// ==========================================
//            EVENT LISTENERS
// ==========================================

// ! TEXT-TO-SPEECH
document.querySelector('#play').addEventListener('click', (e) => {
  e.preventDefault();
  textToSpeech(document.querySelector('#text').value);
});

// ! SETTINGS
document.querySelector('#settings').addEventListener('click', () => {
  settings.classList.add('show');
  settings.classList.remove('hide');
});

document.querySelector('#save').addEventListener('click', (e) => {
  e.preventDefault();
  const dropdown = document.querySelector('#language');
  const selectedLanguage = dropdown.options[dropdown.selectedIndex].value;

  let msg = document.querySelector('#error');

  // if there's no language selected
  if (selectedLanguage === '0') {
    // error msg codes here
    msg.classList.add('alert-danger');
    msg.innerHTML = Settings.displayError('languageError');
    return;
  } else {
    msg.classList.remove('alert-danger');
    msg.classList.add('alert-success');
    msg.innerHTML = Settings.displayError('success');
    Settings.saveLanguage(selectedLanguage);
  }
});

window.addEventListener('click', (e) => {
  if (e.target === settings) {
    settings.classList.add('hide');
    document.querySelector('#error').innerHTML = '';
  } else {
    false;
  }
});

// ! CONVERSATION THERAPY
document.querySelector('#unsplash-btn').addEventListener('click', async () => {
  // displays random question
  document.querySelector('#questions').innerHTML = Conversation.generateQuestion(questArr.length);

  let data = await callUnsplashAPI();
  let img = data.urls.regular;
  // let info = data.urls
  document.querySelector('#image').style.backgroundImage = `url('${img}')`;
});

// ! RANDOM FACTS
document.querySelector('#facts-btn').addEventListener('click', () => {
  callFactsAPI()
    .then((data) => {
      let randomFact = data.text;
      document.querySelector('#facts-text').innerHTML = randomFact;
      // plays audio after 1 second
      setTimeout(function () {
        textToSpeech(randomFact);
      }, 1000);
    })
    .catch((error) => {
      console.log(error);
    });
});

// ! MISC
document.querySelector('#toggle').addEventListener('click', () => {
  document.body.classList.toggle('show-nav');
});

window.onload = () => {
  settings.classList.add('hide');
  settings.classList.remove('show');
  // hide containers except home
  containers.forEach((container) => container.classList.add('hide'));
  containers[0].classList.remove('hide');
  containers[0].classList.add('show');
};

// ! NAV LINKS

document.querySelectorAll('.nav-links').forEach((navLink, index) => {
  navLink.addEventListener('click', () => {
    // hide containers
    containers.forEach((container) => container.classList.add('hide'));
    // show container
    containers[index].classList.remove('hide');
    containers[index].classList.add('show');
  });
});
