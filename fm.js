window.onload = function () {
    const ids = ["20500092"];
    const fms = document.getElementById("fms");
    for (let i = 0; i < ids.length; i++) {
        $.getJSON("https://rapi.qtfm.cn/channels/" + ids[i]).then((response) => {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            const button = document.createElement("button");
            button.innerText = response.Data.title;
            button.addEventListener('click', () => {
                const fmimg = document.getElementById("fmimg");
                fmimg.src = response.Data.cover;
                fmimg.height = "200";
                fmimg.width = "200";
                document.getElementById('nowplaying').innerText = response.Data.nowplaying.broadcasters.map((item) => item.username).join(",") + " - " +
                    response.Data.nowplaying.name + " -> " +
                    response.Data.nowplaying.start_time + " - " + response.Data.nowplaying.end_time;
                const audio = document.getElementById('fm');
                audio.src = "https://lhttp.qtfm.cn/live/" + response.Data.id + "/64k.mp3";
                audio.volume = 0.5;
                audio.play();
            });
            td.appendChild(button);
            tr.appendChild(td);
            fms.appendChild(tr);
        });
    }
}