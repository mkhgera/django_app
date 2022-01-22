let map;
let markers = [];
let latandlng = [];
// text = document.getElementById("id_lat").value
function initMap() {
    const myLatlng = { lat: 51.175331, lng: 71.393809 };
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: myLatlng,
        mapTypeId: 'hybrid'
    });
    console.log(document.getElementById("id_lat").value);
    if(document.getElementById("id_lat").value != ""){
        latv = parseFloat(document.getElementById("id_lat").value);
    lngv = parseFloat(document.getElementById("id_lng").value);
    latandlng.push({ lat: latv, lng: lngv })
    }
    const geocoder = new google.maps.Geocoder();
    const infowindow = new google.maps.InfoWindow();
    // Паспортные данные
    document.getElementById("id_lastname").setAttribute("placeholder", "Фамилия")
    document.getElementById("id_lastname").setAttribute("class", "form-control")
    document.getElementById("id_firstname").setAttribute("placeholder", "Имя")
    document.getElementById("id_firstname").setAttribute("class", "form-control")
    document.getElementById("id_middleName").setAttribute("placeholder", "Отчество")
    document.getElementById("id_middleName").setAttribute("class", "form-control")
    document.getElementById("id_iin").setAttribute("placeholder", "ИИН")
    document.getElementById("id_iin").setAttribute("class", "form-control")
    //Adrress data
    document.getElementById("id_city").setAttribute("placeholder", "Город")
    document.getElementById("id_city").setAttribute("class", "form-control")
    document.getElementById("id_city").setAttribute("readonly", "readonly");
    document.getElementById("id_street").setAttribute("placeholder", "Улица")
    document.getElementById("id_street").setAttribute("class", "form-control")
    document.getElementById("id_street").setAttribute("readonly", "readonly");
    document.getElementById("id_home").setAttribute("placeholder", "Номер дома")
    if(document.getElementById("id_home").value != ""){
        document.getElementById("id_home").setAttribute("readonly", "readonly");
    }
    document.getElementById("id_home").setAttribute("class", "form-control")
    document.getElementById("id_homeNumber").setAttribute("placeholder", "Номер квартиры")
    document.getElementById("id_homeNumber").setAttribute("class", "form-control")
    //additional
    document.getElementById("id_cadNumber").setAttribute("placeholder", "Кадастровый номер")
    document.getElementById("id_cadNumber").setAttribute("class", "form-control")
    document.getElementById("id_area").setAttribute("placeholder", "Площадь земельного участка")
    document.getElementById("id_area").setAttribute("class", "form-control")
    document.getElementById("id_info").setAttribute("placeholder", "Дополнительные данные")
    document.getElementById("id_info").setAttribute("class", "form-control")
    //
    document.getElementById('id_lat').type = "hidden";
    document.getElementById('id_lng').type = "hidden";

    console.log(latandlng[0]);
    if (latandlng.length == 1) {
        console.log("Srabotal if")
        const infowindow = new google.maps.InfoWindow({
            content: document.getElementById("id_street").value + " " + document.getElementById("id_home").value + ", " + document.getElementById("id_city").value,
        });
        const marker = new google.maps.Marker({
            position: latandlng[0],
            map: map,
        });
        markers.push(marker);
        marker.addListener("click", () => {
            infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false,
            });
        });
    }

    map.addListener("click", (mapsMouseEvent) => {
        // deleteMarkers();
        const latlng = mapsMouseEvent.latLng;
        console.log(latlng);

        geocoder
            .geocode({ location: latlng })
            .then((response) => {
                if (response.results[0] && markers.length <= 0) {
                    const marker = new google.maps.Marker({
                        position: latlng,
                        map: map,
                    });
                    markers.push(marker);
                    latandlng.push(marker);
                    infowindow.setContent(response.results[0].formatted_address);
                    infowindow.open(map, marker);
                    if (response.results[0].address_components.length == 6) {
                        console.log("У нас есть номер дома!");
                        console.log(response.results);
                        document.getElementById("id_home").value = response.results[0].address_components[0]["long_name"];
                        document.getElementById("id_home").setAttribute("readonly", "readonly");
                        document.getElementById("id_street").value = response.results[0].address_components[1]["long_name"];
                        document.getElementById("id_street").setAttribute("readonly", "readonly");
                        document.getElementById("id_city").value = response.results[0].address_components[3]["long_name"];
                        document.getElementById("id_city").setAttribute("readonly", "readonly");
                        document.getElementById("id_lat").value = JSON.stringify(mapsMouseEvent.latLng.toJSON()["lat"]);
                        document.getElementById("id_lat").setAttribute("readonly", "readonly");
                        document.getElementById("id_lng").value = JSON.stringify(mapsMouseEvent.latLng.toJSON()["lng"]);
                        document.getElementById("id_lng").setAttribute("readonly", "readonly");
                    }

                    else {
                        console.log("У нас нету номера дома!")
                        console.log(response.results[0].address_components);
                        id = response.results[0].address_components.length
                        document.getElementById("id_home").value = null;
                        document.getElementById("id_home").removeAttribute("readonly");
                        document.getElementById("id_street").value = response.results[0].address_components[0]["long_name"];
                        document.getElementById("id_street").setAttribute("readonly", "readonly");
                        document.getElementById("id_city").value = response.results[0].address_components[id - 3]["long_name"];
                        document.getElementById("id_city").setAttribute("readonly", "readonly");
                        document.getElementById("id_lat").value = JSON.stringify(mapsMouseEvent.latLng.toJSON()["lat"]);
                        document.getElementById("id_lat").setAttribute("readonly", "readonly");
                        document.getElementById("id_lng").value = JSON.stringify(mapsMouseEvent.latLng.toJSON()["lng"]);
                        document.getElementById("id_lng").setAttribute("readonly", "readonly");
                    }
                    console.log(latandlng);
                } else {
                    window.alert("Нажмите кнопку отменить чтобы выбрать новый участок!");
                }
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));
    }
    )
};

function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function deleteMarkers() {
    setMapOnAll(null);
    markers = [];
}

function addMarker(position) {
    const marker = new google.maps.Marker({
        position,
        map,
    });

    markers.push(marker);
}

function ResetData() {
    let isDelete = confirm("Вы хотите отменить выделение?");
    if (isDelete == true) {
        deleteMarkers();
        document.getElementById("id_home").value = null;
        document.getElementById("id_city").value = null;
        document.getElementById("id_street").value = null;
        document.getElementById("id_street").removeAttribute("readonly");
        document.getElementById("id_home").removeAttribute("readonly");
        document.getElementById("id_city").removeAttribute("readonly");
    }
}

function showAll() {
    let isBoss = confirm("Ты здесь главный?");
    alert(isBoss);
    for (let i = 0; i < latandlng.length; i++) {
        pos = { lat: latandlng[i]["lat"], lng: latandlng[i]["lng"] };
        // const marker = new google.maps.Marker({
        //     position: pos,
        //     map: map,
        // });
        addMarker(pos);
        console.log(pos);
    }
}

function clearAll() {
     document.getElementById("id_lastname").value = "";
     document.getElementById("id_firstname").value = "";
     document.getElementById("id_middleName").value = "";
     document.getElementById("id_iin").value = "";
     document.getElementById("id_city").value = "";
     document.getElementById("id_street").value = "";
     document.getElementById("id_home").value = "";
     document.getElementById("id_homeNumber").value ="";
     document.getElementById("id_cadNumber").value = "";
     document.getElementById("id_area").value = "";
     document.getElementById("id_info").value = "";
}

