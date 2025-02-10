// https://heimuer.tv/api.php/provide/vod/?ac=list&pg=1&pagesize=100&wd=五福
// https://heimuer.tv/api.php/provide/vod/?ac=list&pg=1&pagesize=100&t=13
// https://heimuer.tv/api.php/provide/vod/?ac=detail&ids=45861

function video(videoId) {
    $.getJSON("https://heimuer.tv/api.php/provide/vod/?ac=detail&ids=" + videoId).then((response) => {
        const videoDetail = response.list[0];
        document.getElementById("videoTitle").innerText = videoDetail.vod_name;
        const videoDetails = videoDetail.vod_play_url.split("#").sort((a, b) => new Intl.Collator("zh", { numeric: true }).compare(a, b));
        let tr = document.createElement("tr");
        document.getElementById("videoTable").appendChild(tr);
        for (let i = 0; i < videoDetails.length; i++) {
            const videoItems = videoDetails[i].split("$");
            const td = document.createElement("td");
            const button = document.createElement("button");
            button.style.width = "8vw";
            button.style.whiteSpace = "nowrap";
            button.style.overflow = "hidden";
            button.style.textOverflow = "ellipsis";
            button.innerText = videoItems[0];
            button.addEventListener("click", () => {
                document.getElementById("videoTitle").innerText = videoDetail.vod_name + " " + button.innerText;
                document.getElementById("videoFrame").src = "https://hoplayer.com/index.html?url=" + videoItems[1];
            });
            td.appendChild(button);
            tr.appendChild(td);
            if ((i + 1) % 10 == 0) {
                tr = document.createElement("tr");
                document.getElementById("videoTable").appendChild(tr);
            }
        }
    });
}

function searchVideo(keyword) {
    $.getJSON("https://heimuer.tv/api.php/provide/vod/?ac=list&pg=1&pagesize=100&wd=" + keyword).then((response) => {
        const videoSearchDetails = response.list;
        let tr = document.createElement("tr");
        document.getElementById("videoSearchTable").innerHTML = "";
        document.getElementById("videoSearchTable").appendChild(tr);
        for (let i = 0; i < videoSearchDetails.length; i++) {
            const td = document.createElement("td");
            const button = document.createElement("button");
            button.style.width = "12vw";
            button.style.whiteSpace = "nowrap";
            button.style.overflow = "hidden";
            button.style.textOverflow = "ellipsis";
            button.innerText = videoSearchDetails[i].vod_name;
            button.addEventListener("click", () => {
                document.getElementById("videoSearch").hidden = true;
                document.getElementById("video").hidden = false;
                video(videoSearchDetails[i].vod_id);
            });
            td.appendChild(button);
            tr.appendChild(td);
            if ((i + 1) % 5 == 0) {
                tr = document.createElement("tr");
                document.getElementById("videoSearchTable").appendChild(tr);
            }
        }
    });
}

function categoryVideo(categoryVideoId) {
    $.getJSON("https://heimuer.tv/api.php/provide/vod/?ac=list&pg=1&pagesize=100&t=" + categoryVideoId).then((response) => {
        const videoSearchDetails = response.list;
        let tr = document.createElement("tr");
        document.getElementById("videoSearchTable").innerHTML = "";
        document.getElementById("videoSearchTable").appendChild(tr);
        for (let i = 0; i < videoSearchDetails.length; i++) {
            const td = document.createElement("td");
            const button = document.createElement("button");
            button.style.width = "12vw";
            button.style.whiteSpace = "nowrap";
            button.style.overflow = "hidden";
            button.style.textOverflow = "ellipsis";
            button.innerText = videoSearchDetails[i].vod_name;
            button.addEventListener("click", () => {
                document.getElementById("videoSearch").hidden = true;
                document.getElementById("video").hidden = false;
                video(videoSearchDetails[i].vod_id);
            });
            td.appendChild(button);
            tr.appendChild(td);
            if ((i + 1) % 5 == 0) {
                tr = document.createElement("tr");
                document.getElementById("videoSearchTable").appendChild(tr);
            }
        }
    });
}

window.onload = function () {
    document.getElementById("video").hidden = true;
    $.getJSON("https://heimuer.tv/api.php/provide/vod/?ac=list&pg=1&pagesize=1").then((response) => {
        const videoCategories = response.class;
        videoCategories.forEach(videoCategory => {
            const option = document.createElement("option");
            option.value = videoCategory.type_id;
            option.innerText = videoCategory.type_name;
            document.getElementById("videoSearchCategory").appendChild(option);
        });
        document.getElementById("videoSearchCategory").addEventListener("change", () => {
            categoryVideo(document.getElementById("videoSearchCategory").value);
        });
        categoryVideo(document.getElementById("videoSearchCategory").value);
    });
    document.getElementById("videoSearchButton").addEventListener("click", () => {
        searchVideo(document.getElementById("videoSearchKeyword").value);
    });
}
