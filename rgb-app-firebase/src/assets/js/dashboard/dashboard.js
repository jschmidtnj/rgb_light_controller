var jQuery = require("jquery");
require("popper.js");
require("bootstrap");
window.$ = window.jQuery = jQuery;

require("bootstrap-select");
require("bootstrap-select/dist/css/bootstrap-select.css");

var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
var config = require('../../../config/config.json');
firebase.initializeApp(config.firebase);

function handleError(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    //console.log(errorCode, errorMessage);
    var customMessage = "";
    if (errorCode == "auth/notsignedin") {
        customMessage = errorMessage;
    }
    if (error.code !== "" && error.message !== "") {
        if (customMessage !== "") {
            $('#error-info').text(customMessage);
        } else {
            $('#error-info').text("Error: " + errorMessage + " Code: " + errorCode);
        }
    } else {
        $('#error-info').text("No Error code found.");
    }
    $('#alertsignoutfailure').fadeIn();
    setTimeout(function () {
        $('#alertsignoutfailure').fadeOut();
    }, config.other.alerttimeout);
}

$(document).ready(function () {

    $('#toslink').attr('href', config.other.tosUrl);
    $('#privacypolicylink').attr('href', config.other.privacyPolicyUrl);

    function togglePower() {
        if (window.powerMode == 0) {
            //turn power on
            firebase.database().ref('rgb/' + config.other.rgbid).update({
                "power": 1
            }).catch(function(err) {
                handleError(err);
            }).then(function() {
                window.powerMode = 1;
                $("#powerToggle").html("On");
                $('#modeSelect').selectpicker();
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $('#modeSelect').selectpicker('mobile');
                }
                $('.selectpicker').selectpicker();
                //console.log("location select: " + locationSelectString);
                $('.modeSelect').on("change", function (elem) {
                    var modeSelect = elem.target.value;
                    var modeSelectInt = parseInt(modeSelect);
                    firebase.database().ref('rgb/' + config.other.rgbid).update({
                        "mode": modeSelectInt
                    }).catch(function(err) {
                        handleError(err);
                    }).then(function() {
                        console.log("mode updated");
                    });
                });
                $("#modeSelectCollapse").removeClass("collapse");
            });
        } else {
            //turn power off
            firebase.database().ref('rgb/' + config.other.rgbid).update({
                "power": 0
            }).catch(function(err) {
                handleError(err);
            }).then(function() {
                window.powerMode = 0;
                $("#powerToggle").html("Off");
                $("#modeSelectCollapse").addClass("collapse");
            });
        }
    }

    function getInitialValues() {
        firebase.database().ref('rgb/' + config.other.rgbid).once('value').then(function(rgb) {
            var rgbVal = rgb.val();
            var rgbMode = rgbVal.mode;
            var rgbPower = rgbVal.power;
            if (rgbPower == 0) {
                window.powerMode = 1;
            } else {
                window.powerMode = 0;
            }
            togglePower();
            $("#powerToggle").on('click touchstart', function () {
                togglePower();
            });
            $("#powerButtonCollapse").removeClass("collapse");
        }).catch(function(err) {
            handleError(err);
        });
    }

    var signed_in_initially = false;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            //console.log("signed in");
            window.email = user.email;
            $("#bodycollapse").removeClass("collapse");
            signed_in_initially = true;
            getInitialValues();
        } else {
            // No user is signed in. redirect to login page:
            if (signed_in_initially) {
                $('#alertsignoutsuccess').fadeIn();
                setTimeout(function () {
                    $('#alertsignoutsuccess').fadeOut();
                    //console.log("redirecting to login page");
                    setTimeout(function () {
                        window.location.href = 'login.html';
                    }, config.other.redirecttimeout);
                }, config.other.alerttimeout);
            } else {
                //slow redirect
                handleError({
                    code: "auth/notsignedin",
                    message: "Not Signed in. Redirecting."
                });
                //console.log("redirecting to login page");
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, config.other.redirecttimeout);
                //fast redirect
                // window.location.href = 'login.html';
            }
        }
    });

    $("#logoutButton").on('click touchstart', function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
            handleError(error);
        });
    });
});