function getProductsOfApp() {
    $.getJSON("https://data.services.jetbrains.com/products", {
        "fields": ["name", "salesCode"].join(",")
    }).then((response) => {
        const productCodes = [];
        const products = document.getElementById("products");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.innerText = "Author Name";
        tr.appendChild(th1);
        const th2 = document.createElement("th");
        th2.innerText = "Product Name";
        tr.appendChild(th2);
        const th3 = document.createElement("th");
        th3.innerText = "Product Code";
        tr.appendChild(th3);
        products.appendChild(tr);
        for (let i = 0; i < response.length; i++) {
            if (response[i].salesCode != null) {
                productCodes.push("\"" + response[i].salesCode + "\"");
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerText = "JetBrains s.r.o.";
                tr.appendChild(td1);
                const td2 = document.createElement("td");
                td2.innerText = response[i].name;
                tr.appendChild(td2);
                const td3 = document.createElement("td");
                td3.innerText = response[i].salesCode;
                tr.appendChild(td3);
                products.appendChild(tr);
            }
        }
        document.getElementById("app_product_codes").innerText = productCodes.toString();
    });
}

function getProductsOfPlugin() {
    $.getJSON("https://plugins.jetbrains.com/api/searchPlugins", {
        "max": 10000,
        "offset": 0,
        "search": ""
    }).then((response) => {
        const products = document.getElementById("products");
        const tr = document.createElement("tr");
        const th1 = document.createElement("th");
        th1.innerText = "Author Name";
        tr.appendChild(th1);
        const th2 = document.createElement("th");
        th2.innerText = "Product Name";
        tr.appendChild(th2);
        const th3 = document.createElement("th");
        th3.innerText = "Product Code";
        tr.appendChild(th3);
        products.appendChild(tr);
        for (let i = 0; i < response.plugins.length; i++) {
            if (response.plugins[i].pricingModel === "FREE") {
                continue;
            }
            $.getJSON("https://plugins.jetbrains.com/api/plugins/" + response.plugins[i].id).then((response) => {
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerText = response.vendor.publicName;
                tr.appendChild(td1);
                const td2 = document.createElement("td");
                td2.innerText = response.name;
                tr.appendChild(td2);
                const td3 = document.createElement("td");
                td3.innerText = response.purchaseInfo.productCode;
                tr.appendChild(td3);
                products.appendChild(tr);
            });
        }
    });
}

window.onload = function () {
    getProductsOfApp();
    getProductsOfPlugin();
}