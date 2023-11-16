const options = {
    method: 'GET',
    headers: {
        'User-Agent': 'insomnia/8.4.1',
        Authorization: 'Bearer Inyqz1xFVnNhXr3sZDEx0kutyooWX-fSlCrDyT55wzUYi40-4mIW3IBscUSITVlCug_fMyGQsa_JtIF9eywjIOHqJHoM23i5CGLWnxg_Gy-jLKDIQVbx6HyMduNVZXYx'
    }
};

function get_input() {

    let price = [];
    let count = "$";
    for (let x = 0; x < 4; ++x) {
        if (document.getElementById(count).checked) {
            price.push(x + 1);
        }
        count += "$";
    }

    result = {
        location: document.getElementById("locationInput").value,
        price: price
    };

    alert("Location: " + result.location +
        "\nPrice: " + result.price.join(','))

    localStorage.setItem('GLOBAL_INPUT', JSON.stringify(result));
}

function get_data() {
    let storedInput = JSON.parse(localStorage.getItem('GLOBAL_INPUT'));
    const priceString = storedInput.price.join(',');
    const url = `/api?location=${encodeURIComponent(storedInput.location)}&price=${encodeURIComponent(priceString)}`;

    fetch(url, options)
        .then(response => {
            alert('Response status: ' + response.status);
            return response.json();
        })
        .then(response => {
            alert('Data received: ' + JSON.stringify(response));
            localStorage.setItem('GLOBAL_DATA', JSON.stringify(response));
        })
        .catch(err => console.error(err));
}

async function begin_swipe() {
    await get_input();
    await get_data();

    let storedInput = JSON.parse(localStorage.getItem('GLOBAL_INPUT'));
    let storedData = JSON.parse(localStorage.getItem('GLOBAL_DATA'));

    alert("Location: " + storedInput.location +
        "\nPrice: " + storedInput.price.join(',') +
        "\nOutput: " + storedData["categories"].map(category => category.title).join(', '))

    window.location.href = '/swipe';
}


let URLS = [];
let CURRENT = 0; // Declare the variable outside the functions

function loadData() {
    let storedData = JSON.parse(localStorage.getItem('GLOBAL_DATA'));
    URLS = [storedData.image_url].concat(storedData.photos);

    currentImage();
    document.getElementById("name").innerHTML = storedData.name;
    document.getElementById("rating").innerHTML = storedData.rating;
    document.getElementById("count").innerHTML = storedData.review_count;
    document.getElementById("categories").innerHTML = storedData["categories"].map(category => category.title).join(', ');
}

function radioValue(clickedButton) {
    let itemID = clickedButton.id;
    let radio = document.getElementById(itemID);
    radio.value = "true";
}

function currentImage() {
    let image = document.getElementById("url");
    image.src = URLS[CURRENT];
}

function leftButton() {
    let image = document.getElementById("url");
    // Use the global variable
    if (CURRENT === 0) {
        CURRENT = 3;
    } else {
        --CURRENT;
    }

    image.src = URLS[CURRENT];
}

function rightButton() {
    let image = document.getElementById("url");
    if (CURRENT === 3) {
        CURRENT = 0;
    } else {
        ++CURRENT;
    }
    image.src = URLS[CURRENT];
}