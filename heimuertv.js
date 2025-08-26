var apis = [
    "https://caiji.dyttzyapi.com",
    "https://cj.rycjapi.com",
    "https://dbzy.tv",
    "https://bfzyapi.com",
    "https://tyyszy.com",
    "https://api.ffzyapi.com",
    "https://360zy.com",
    "https://wolongzyw.com",
    "https://jszyapi.com",
    "https://mozhuazy.com",
    "https://www.mdzyapi.com",
    "https://api.zuidapi.com",
    "https://m3u8.apiyhzy.com",
    "https://api.wujinapi.me",
    "https://wwzy.tv",
    "https://ikunzyapi.com",
    "https://cj.lziapi.com",
    "https://caiji.maotaizy.cc",
    "https://www.hongniuziyuan.com",
    "https://bdzy.tv",
    "https://xinlangzy.com",
    "https://heimuer.tv",
    "https://json.heimuer.xyz"
];
var api = apis[1];

function video(videoId) {
    $.getJSON(api + "/api.php/provide/vod/?ac=detail&ids=" + videoId).then((response) => {
        const videoDetail = response.list[0];
        document.getElementById("videoTitle").innerText = videoDetail.vod_name;
        document.title = videoDetail.vod_name;
        const videoDetails = videoDetail.vod_play_url.split("$$$").filter(x => !x.endsWith(".m3u8"))[0].split("#").sort((a, b) => new Intl.Collator("zh", { numeric: true }).compare(b, a));
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
            button.title = videoItems[0];
            button.addEventListener("click", (e) => {
                let currentVideoButton = document.getElementById("currentVideoButton");
                if (currentVideoButton !== null) {
                    currentVideoButton.removeAttribute("id");
                    currentVideoButton.style.removeProperty("color");
                    currentVideoButton.style.removeProperty("border");
                }
                e.target.id = "currentVideoButton";
                e.target.style.color = "red";
                e.target.style.border = "none";
                document.getElementById("videoTitle").innerText = videoDetail.vod_name + " " + button.innerText;
                document.title = videoDetail.vod_name + " " + button.innerText;
                document.getElementById("videoFrame").src = videoItems[1];
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
    $.getJSON(api + "/api.php/provide/vod/?ac=list&pg=1&pagesize=100&wd=" + keyword).then((response) => {
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
            button.title = videoSearchDetails[i].vod_name;
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
    $.getJSON(api + "/api.php/provide/vod/?ac=list&pg=1&pagesize=100&t=" + categoryVideoId).then((response) => {
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
            button.title = videoSearchDetails[i].vod_name;
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
    $.getJSON(api + "/api.php/provide/vod/?ac=list&pg=1&pagesize=1").then((response) => {
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
