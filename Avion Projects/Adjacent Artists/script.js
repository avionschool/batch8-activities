// TESTING
let test = {
    "Similar": {
        "Info": [
            {
                "Name": "Paramore",
                "Type": "music",
                "wTeaser": "Paramore is an American rock band from Franklin, Tennessee, formed in 2004. The band currently consists of lead vocalist Hayley Williams, guitarist Taylor York and drummer Zac Farro. Williams and Farro are founding members of the group, while York, a high school friend of the original lineup, joined in 2007. Williams is the only member listed on the band's recording contract with Warner Music Group's Fueled by Ramen sublabel and the only member to appear on all five of Paramore's studio albums.The group released its debut album All We Know Is Falling in 2005, with the album reaching number four on the UK Rock Chart in 2009 and number thirty on Billboard's Heatseekers Chart in 2006.",
                "wUrl": "https://en.wikipedia.org/wiki/Paramore",
                "yUrl": "https://www.youtube-nocookie.com/embed/aCyGvGEtOwc",
                "yID": "aCyGvGEtOwc"
            }
        ],
        "Results": [
            {
                "Name": "Panic! At The Disco",
                "Type": "music",
                "wTeaser": "Panic! at the Disco is the solo project of American musician Brendon Urie. It was originally a pop rock band from Las Vegas, Nevada, formed in 2004 by childhood friends Brendon Urie, Ryan Ross, Spencer Smith and Brent Wilson. They recorded their first demos while they were in high school. Shortly after, the band recorded and released their debut studio album, A Fever You Can't Sweat Out (2005). Popularized by the second single, \"I Write Sins Not Tragedies\", the album was certified triple platinum in the US. In 2006, founding bassist Brent Wilson was fired from the band during an extensive world tour and subsequently replaced by Jon Walker. The band's second album, Pretty. Odd. (2008), was preceded by the single \"Nine in the Afternoon\". That album marked a significant departure from the sound of the band's debut. Ross and Walker, who favored the band's new direction, departed because Urie and Smith wanted to make further changes to the band's style. Ross and Walker subsequently formed a new band, the Young Veins, leaving Urie and Smith as the sole remaining members of Panic! at the Disco.",
                "wUrl": "http://en.wikipedia.org/wiki/Panic!_at_the_Disco",
                "yUrl": "https://www.youtube-nocookie.com/embed/vc6vs-l5dkc",
                "yID": "vc6vs-l5dkc"
            },
            {
                "Name": "All Time Low",
                "Type": "music",
                "wTeaser": "All Time Low is an American rock band from Towson, Maryland, formed in 2003. The band consists of lead vocalist and rhythm guitarist Alex Gaskarth, lead guitarist Jack Barakat, bassist and backing vocalist Zack Merrick and drummer Rian Dawson. The band's name is taken from lyrics in the song \"Head on Collision\" by New Found Glory. The band consistently tours year-long, has headlined numerous tours, and has appeared at music festivals including Warped Tour, Reading and Leeds and Soundwave.Beginning as a high school band, the band released their debut EP The Three Words to Remember in Dealing with the End EP in 2004 through local label Emerald Moon. Since then the band has released eight studio albums: The Party Scene (2005), So Wrong, It's Right (2007), Nothing Personal (2009), Dirty Work (2011), Don't Panic (2012), Future Hearts (2015), Last Young Renegade (2017), and Wake Up, Sunshine (2020). All Time Low released their first live album, Straight to DVD, in 2010, and released their second live album, Straight to DVD II: Past, Present and Future Hearts, on September 9, 2016.",
                "wUrl": "https://en.wikipedia.org/wiki/All_Time_Low",
                "yUrl": "https://www.youtube-nocookie.com/embed/AXnqkVTFUqY",
                "yID": "AXnqkVTFUqY"
            },
            {
                "Name": "Fall Out Boy",
                "Type": "music",
                "wTeaser": "Fall Out Boy is an American rock band formed in Wilmette, Illinois, a suburb of Chicago, in 2001. The band consists of lead vocalist and rhythm guitarist Patrick Stump, bassist Pete Wentz, lead guitarist Joe Trohman, and drummer Andy Hurley. The band originated from Chicago's hardcore punk scene, with which all members were involved at one point. The group was formed by Wentz and Trohman as a pop punk side project of the members' respective hardcore bands, and Stump joined shortly thereafter. The group went through a succession of drummers before landing Hurley and recording the group's debut album, Take This to Your Grave (2003). The album became an underground success and helped the band gain a dedicated fanbase through heavy touring, as well as commercial success. Take This to Your Grave has commonly been cited as an influential blueprint for pop punk music in the 2000s.",
                "wUrl": "http://en.wikipedia.org/wiki/Fall_Out_Boy",
                "yUrl": "https://www.youtube-nocookie.com/embed/LBr7kECsjcQ",
                "yID": "LBr7kECsjcQ"
            },
            {
                "Name": "Katy Perry",
                "Type": "music",
                "wTeaser": "Katheryn Elizabeth Hudson (born October 25, 1984), known professionally as Katy Perry, is an American singer, songwriter, and television judge. After singing in church during her childhood, she pursued a career in gospel music as a teenager. Perry signed with Red Hill Records and released her debut studio album Katy Hudson under her birth name in 2001, which was commercially unsuccessful. She moved to Los Angeles the following year to venture into secular music after Red Hill ceased operations and she subsequently began working with producers Glen Ballard, Dr. Luke, and Max Martin. After adopting the stage name Katy Perry and being dropped by The Island Def Jam Music Group and Columbia Records, she signed a recording contract with Capitol Records in April 2007.",
                "wUrl": "http://en.wikipedia.org/wiki/Katy_Hudson",
                "yUrl": "https://www.youtube-nocookie.com/embed/0KSOMA3QBU0",
                "yID": "0KSOMA3QBU0"
            },
            {
                "Name": "Boys Like Girls",
                "Type": "music",
                "wTeaser": "Boys Like Girls is an American rock band from Boston, Massachusetts. Formed in 2005, the group gained mainstream recognition when it released its self-titled debut album which went on to sell over 700,000 albums in the United States earning a Gold Record from the RIAA. The group's second studio album Love Drunk, was released on September 8, 2009 and their third album Crazy World, was released December 11, 2012.Boys Like Girls toured worldwide between 2006 and 2013. Notable tours include their main stage appearance on the entire 2007 Vans Warped Tour, their first headline tour \"Tourzilla\" (2007) and a co-headliner with Good Charlotte for the Soundtrack of Your Summer Tour 2008.The music video for their single \"The Great Escape\" (directed by Alan Ferguson) was voted the No. 1 video on MTV's TRL on August 6, 2007 and the band performed at MTV's TRL studio overlooking Times Square.",
                "wUrl": "http://en.wikipedia.org/wiki/Boys_Like_Girls",
                "yUrl": "https://www.youtube-nocookie.com/embed/JGPgxoIPY6Q",
                "yID": "JGPgxoIPY6Q"
            }
        ]
    }
};

// TASTEDIVE
const TASTEDIVE_KEY = `416207-Adjacent-53G7VTDP`;
let artistString = "Paramore";
let requestURL_tastedive = `https://tastedive.com/api/similar?q=${artistString}&k=${TASTEDIVE_KEY}&limit=5&type=music&verbose=1&callback=myDisplayFunction`;
var results; // initialize variable to contain JSON objects

// Functions
async function generateSimilarArtistsScript() {
    let s = document.createElement("script");
    s.src = requestURL_tastedive;
    document.body.appendChild(s);
}

function myDisplayFunction(myObj) {
  results = myObj; // it works!!!
  document.getElementById("demo").innerHTML = results.Similar.Results[0].Name;
} 