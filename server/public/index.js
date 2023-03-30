function showStep(stepId) {
    let currentStep = document.getElementsByClassName("active")[0].id;
    document.getElementById(currentStep).classList.remove("active");
    document.getElementById(stepId).classList.add("active");
}

function botInvite() {
    var id = document.getElementById("applicationId").value;
    var link = `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=8&scope=bot`;
    window.open(link, "_blank");
}
var timeout = null;
function startBot(showAlert) {
    var token = document.getElementById("token").value;

    if (token == "") {
        alert("Please enter a token!");
        return;
    }

    document.getElementById("start").disabled = true;
    document.getElementById("start").innerHTML = "Starting...";
    document.getElementById("restart").disabled = true;
    document.getElementById("restart").innerHTML = "Restarting...";

    fetch("/api/login", {
        method: "POST",
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        document.getElementById("start").disabled = false;
        document.getElementById("start").innerHTML = "Start";
        document.getElementById("restart").disabled = false;
        document.getElementById("restart").innerHTML = "Restart Bot";

        if (res.status == 200) {
            if (!showAlert) showStep("step4");
            else alert("Bot restarted!");

            if (timeout != null) clearTimeout(timeout);

            timeout = setTimeout(() => {
                alert(
                    "Bot stopped automatically! Thanks for using this website!"
                );
            }, 300000);
        } else {
            if (res.status == 401) alert("Invalid token!");
            else if (res.status == 400) alert("Bot is already running!");
            else alert("Something went wrong!");
        }
    });
}

function stopBot() {
    var token = document.getElementById("token").value;

    document.getElementById("stop").disabled = true;
    document.getElementById("stop").innerHTML = "Stopping Bot...";

    fetch("/api/logout", {
        method: "POST",
        headers: {
            Authorization: token,
        },
    }).then((res) => {
        document.getElementById("stop").disabled = false;
        document.getElementById("stop").innerHTML = "Stop Bot";
        if (res.status == 200) {
            alert("Bot stopped!");
        } else if (res.status == 401) {
            alert("Invalid token!");
        } else if (res.status == 400) {
            alert("Bot is not running!");
        } else {
            alert("Something went wrong!");
        }
    });
}
