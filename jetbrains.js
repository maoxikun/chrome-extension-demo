function getProductsOfApp() {
    const productCodes = [];
    $.getJSON("https://data.services.jetbrains.com/products", {
        "fields": ["name", "salesCode"].join(",")
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
        for (let i = 0; i < response.length; i++) {
            if (response[i].salesCode != null) {
                productCodes.push(response[i].salesCode);
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
    });
    return productCodes;
}

function getProductsOfPlugin() {
    const productCodes = [];
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
                const authorName = response.vendor.publicName !== undefined ? response.vendor.publicName : response.vendor.name;
                if (authorName === "JetBrains s.r.o.") {
                    productCodes.push(response.purchaseInfo.productCode);
                }
                const tr = document.createElement("tr");
                const td1 = document.createElement("td");
                td1.innerText = authorName;
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
    return productCodes;
}

window.onload = function () {
    const a = getProductsOfApp();
    const b = getProductsOfPlugin();
    setTimeout(() => {
        document.getElementById("app_product_codes").innerText = Array.from(new Set(a.concat(b))).sort().map(item => '"' + item + '"').toString();
    }, 10000);
}