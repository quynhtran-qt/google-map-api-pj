//------------------------------MAP----------------------------------

// Initialize and add the map
function initMap() {

    // The location of CSUN
    var csun = { lat: 34.239325, lng: -118.529271 };

    //Map properties
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 17.2,
            center: csun,
            scrollwheel: false,
            zoomControl: false,
            panControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            disableDefaultUI: true,
            draggable: false,
            disableDoubleClickZoom: true,
            keyboardShortcuts: false,
            gestureHandling: 'none',
            styles: [{
                "elementType": "labels",
                "stylers": [{
                    "visibility": "off"
                }]
            }, ]
        });

    // Polygons
    var lib = [
        { lat: 34.240477, lng: -118.530020 },
        { lat: 34.239590, lng: -118.530020 },
        { lat: 34.239590, lng: -118.528631 },
        { lat: 34.240477, lng: -118.528631 }
    ]
    var polyLib = new google.maps.Polygon({
        paths: lib,
    })

    var matSq = [
        { lat: 34.239200, lng: -118.527451 },
        { lat: 34.239737, lng: -118.527451 },
        { lat: 34.239737, lng: -118.528175 },
        { lat: 34.239200, lng: -118.528175 }
    ]
    var polyMatSq = new google.maps.Polygon({
        paths: matSq
    })

    var sierraSq = [
        { lat: 34.237907, lng: -118.528926 },
        { lat: 34.239173, lng: -118.528926 },
        { lat: 34.239173, lng: -118.529682 },
        { lat: 34.237907, lng: -118.529682 }
    ]
    var polySierraSq = new google.maps.Polygon({
        paths: sierraSq
    })

    var duckPond = [
        { lat: 34.235626, lng: -118.525883 },
        { lat: 34.237338, lng: -118.525883 },
        { lat: 34.237338, lng: -118.527299 },
        { lat: 34.235626, lng: -118.527299 }
    ]
    var polyDuckPond = new google.maps.Polygon({
        paths: duckPond
    })

    var adminOffice = [
        { lat: 34.239786, lng: -118.530121 },
        { lat: 34.240753, lng: -118.530121 },
        { lat: 34.240753, lng: -118.531505 },
        { lat: 34.239786, lng: -118.531505 }
    ]
    var polyAdmin = new google.maps.Polygon({
        paths: adminOffice
    })

    var polygons = [polyLib, polyAdmin, polyDuckPond, polyMatSq, polySierraSq]

    //-----------------------------------Quiz Part-----------------------------

    // Array of questions
    var questions = [
        "Where is the Oviatt Library?",
        "Where is the Admissions and Records?",
        "Where is the CSUN Duck Pond?",
        "Where is the Matador Square?",
        "Where is the Sierra Quad?"
    ]

    var q1 = document.createElement("P")
    q1.innerHTML = questions[0]
    q1.classList.add("question")
    document.querySelector(".question-container").appendChild(q1)


    var numClick = 0
    var numWrong = 0
    var numRight = 0

    //add event listener on the map
    google.maps.event.addListener(map, 'dblclick', (e) => {

        checkLocation(e, polygons[numClick])
        numClick++

        if (numClick < 5) {
            createQuestion(questions[numClick])
        }

        if (numClick == 5) {
            console.log("cannot click")
            var result = document.createElement("P")
            result.classList.add("result")
            result.innerHTML = "You answered " + numRight + " right and " + numWrong + " wrong."
            document.querySelector(".question-container").appendChild(result)

            var endQuiz = document.createElement("P")
            endQuiz.classList.add("end")
            document.querySelector("#map").appendChild(endQuiz)

            var resetBtn = document.createElement("BUTTON")
            resetBtn.innerHTML = "Reset"
            document.querySelector(".question-container").appendChild(resetBtn)

            resetBtn.addEventListener("click", () => {
                window.location.reload(false)
            })
        }
    })

    // function to compare the location of the click event and the answer
    function checkLocation(e, polyArray) {
        var resultColor
        if (google.maps.geometry.poly.containsLocation(e.latLng, polyArray)) {
            resultColor = 'green'
            numRight++
            answer("correct")
        } else {
            resultColor = 'red'
            numWrong++
            answer("incorrect")
        }

        polyArray.setOptions({
            fillColor: resultColor,
            strokeColor: resultColor
        })
        polyArray.setMap(map)
    }

    // Add new question
    function createQuestion(questions) {
        var qu = document.createElement("P")
        qu.innerHTML = questions
        qu.classList.add("question")
        document.querySelector(".question-container").appendChild(qu)
    }

    //Result of each answer
    function answer(res) {
        var ans = document.createElement("P")
        ans.innerHTML = "Your answer is " + res
        if (res == "correct") {
            ans.classList.add("correct")
        } else {
            ans.classList.add("incorrect")
        }
        document.querySelector(".question-container").appendChild(ans)
    }

}
