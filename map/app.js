ymaps.ready(init);

var store = JSON.parse(localStorage.getItem('marks')) || [];

let reviewBlock = document.querySelector('.review');
let addressField = document.querySelector('.review-header-address');
let name = document.querySelector('#name');
let place = document.querySelector('#place');
let wishes = document.querySelector('#wishes');
let reviewContainer = document.querySelector('.review-content-body');

function init() {
    var myMap = new ymaps.Map('map', {
        center: [59.95, 30.31],
        zoom: 11,
        controls: ['zoomControl'],
        beahviors: ['drag']
    });

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 200,
        clusterBalloonPagerSize: 5
    });

    window.addEventListener( 'click', (e) => {
        if (e.target.classList.contains('link')) {
            let y = event.clientY;

            let x = event.clientX;
            document.querySelector('.no-reviews').style.display = 'none';
            reviewContainer.innerHTML = '';
            store.forEach((mark) =>{
                if (mark.address == e.target.textContent) {
                    revealPopup('flex', y, x, mark);
                    addReview(mark)
                }
            })
            myMap.balloon.close();

        }
    })    
    store.forEach((mark) => {
        let placemark = new ymaps.Placemark(mark.coords, {
            balloonContentHeader: `${mark.place} 
            <br> 
            <a class="link">${mark.address}</a> 
            <br> 
            ${mark.wishes}`,
            balloonContentFooter: `${mark.time}`
        })
        placemark.events.add('click', function(e){
            e.preventDefault();
            let y = event.clientY;

            let x = event.clientX;
            reviewContainer.innerHTML = '';
            revealPopup('flex', y, x, mark);
            store.forEach((piece) => {
                if (piece.coords == mark.coords) {
                    addReview(piece);
                }
            })
        })
        clusterer.add(placemark);
        myMap.geoObjects.add(clusterer); 
    })

    myMap.events.add('click', function (e) {
        const mark = {};
        mark.coords = e.get('coords');

        let y = event.clientY;

        let x = event.clientX;

        ymaps.geocode(mark.coords).then(function(res) {
            return res.geoObjects.get(0).getAddressLine();
        })
        .then(function(address){
            mark.address = address;
            
            reviewContainer.innerHTML = '';
            document.querySelector('.no-reviews').style.display = 'block';
            revealPopup('flex', y, x, mark);
        }) 
    })

    function revealPopup(show, y, x, mark) {
        
        addressField.textContent = mark.address;
        reviewBlock.style.display = show;

        if ((x + 379) > window.innerWidth) {
            x = window.innerWidth - 379;
        } else if ((y + 527) > window.innerHeight) {
            y = window.innerHeight - 527;
        } 

        reviewBlock.style.top = `${y}px`;
        reviewBlock.style.left = `${x}px`;
        
        document.querySelector('#input-button').onclick = function(e) {
            e.preventDefault();
            if (place.value != '' && wishes.value != '' && name.value != '') {
                mark.time = getTime();
                mark.place = place.value;
                mark.name = name.value;
                mark.wishes = wishes.value;
            
                let placemark = new ymaps.Placemark(mark.coords, {
                    balloonContentHeader: `${mark.place} 
                                        <br> 
                                        <a class="link">${mark.address}</a> 
                                        <br> 
                                        ${mark.wishes}`,
                    balloonContentFooter: `${mark.time}`
                })
                store.push(mark);
                localStorage.setItem('marks', JSON.stringify(store))
                
                clusterer.add(placemark);
                myMap.geoObjects.add(clusterer);
                document.querySelector('.no-reviews').style.display = 'none';
                addReview(mark);
                clearFields(reviewBlock);
    
                placemark.events.add('click', function(e){
                    e.preventDefault();
                    reviewContainer.innerHTML = '';
                    revealPopup('flex', y, x, mark);
                    store.forEach((piece) => {
                        if (piece.coords == mark.coords) {
                            addReview(piece);
                        }
                    })
                })
            } 
    
        };
    } 

}

function addReview(mark) {
    reviewContainer.innerHTML += 
        `<div class = "review-container"><span class="review-container-name">${mark.name}</span>
        <span class="review-container-place">${mark.place}</span>
        <span class="review-container-time">${mark.time}</span>
        <br>
        <span class="review-container-wishes">${mark.wishes}</span></div>`;
}

function getTime() {
    let data = new Date();
    return `${data.getFullYear()}.${data.getMonth() + 1}.${data.getDate()}`
}

function clearFields() {
    name.value = '';
    place.value = '';
    wishes.value = '';
}

function hidePopup() {
    reviewBlock.style.display = 'none';
}

