ymaps.ready(init);
var store = JSON.parse(localStorage.getItem('marks')) || [];

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
        clusterBalloonContentLayoutWidth: 200,
        clusterBalloonContentLayoutHeight: 130,
        clusterBalloonPagerSize: 5
    });

    store.forEach(mark => {
        let placemark = new ymaps.Placemark(mark.coords, {
            balloonContentHeader: `${mark.place} 
            <br> 
            <a id="showBall">${mark.address}</a> 
            <br> 
            ${mark.wishes}`,
            balloonContentFooter: `${mark.time}`
        })

        placemark.events.add('click', function(e){
            e.preventDefault();
            let y = event.clientY;

            let x = event.clientX;

            if (document.body.contains(document.querySelector('.review'))) {
                document.querySelector('.review').remove();
            } else if (document.body.contains(document.querySelector('.review-balloon'))) {
                document.querySelectorAll('.review-balloon').forEach(function(review) {
                    review.style = 'display: none';
                })
            }
            let balloonReview = createPopup(mark.address);
            
            balloonReview.className = 'review-balloon';
            loadReviews(mark, balloonReview.querySelector('.review-content-body'));
            balloonReview.style = 'display: flex';  
            balloonReview.style.top = `${y}px`;
            balloonReview.style.left = `${x}px`;
            balloonReview.querySelector('.fa-remove').addEventListener('click', function(e){
                e.target.parentElement.parentElement.style = 'display: none';
            })
            document.body.appendChild(balloonReview);

            balloonReview.querySelector('#input-button').addEventListener('click', function(e){
                e.preventDefault();
                mark.time = getTime();
                mark.place = balloonReview.querySelector('#place').value;
                mark.name = balloonReview.querySelector('#name').value;
                mark.wishes = balloonReview.querySelector('#wishes').value;

                let placemark = new ymaps.Placemark(mark.coords, {
                    balloonContentHeader: `${mark.place} 
                                          <br> 
                                          <a id="showBall">${mark.address}</a> 
                                          <br> 
                                          ${mark.wishes}`,
                    balloonContentFooter: `${mark.time}`
                })
                store.push(mark);
                localStorage.setItem('marks', JSON.stringify(store))

                clusterer.add(placemark);
                myMap.geoObjects.add(clusterer); 

                addReview(balloonReview, balloonReview.querySelector('.review-content-body'));
                clearFields(balloonReview);
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

        if (document.body.contains(document.querySelector('.review'))) {
            document.querySelector('.review').remove();
        } else if (document.body.contains(document.querySelector('.review-balloon'))) {
          document.querySelectorAll('.review-balloon').forEach(function(review) {
              review.style = 'display: none';
          })
        }
        ymaps.geocode(mark.coords).then(function(res) {
            return res.geoObjects.get(0).getAddressLine();
        })
        .then(function(address){
            mark.address = address;
            
            
            let popup = createPopup(address);
            
            document.body.appendChild(popup);

            popup.style.top = `${y}px`
            popup.style.left = `${x}px`

            popup.querySelector('.fa-remove').addEventListener('click', function(e){
              e.target.parentElement.parentElement.remove();
            })

            popup.querySelector('#input-button').addEventListener('click', function(e){
                e.preventDefault();
                mark.time = getTime();
                mark.place = popup.querySelector('#place').value;
                mark.name = popup.querySelector('#name').value;
                mark.wishes = popup.querySelector('#wishes').value;

                let placemark = new ymaps.Placemark(mark.coords, {
                    balloonContentHeader: `${mark.place} 
                                          <br> 
                                          <a id="showBall">${mark.address}</a> 
                                          <br> 
                                          ${mark.wishes}`,
                    balloonContentFooter: `${mark.time}`
                })

                store.push(mark);
                localStorage.setItem('marks', JSON.stringify(store))

                clusterer.add(placemark);
                myMap.geoObjects.add(clusterer); 

                let balloonReview = createPopup(address);
                balloonReview.className = 'review-balloon';
                document.body.appendChild(balloonReview);
                addReview(popup, popup.querySelector('.review-content-body'));
                addReview(popup, balloonReview.querySelector('.review-content-body'));
                clearFields(popup);
                balloonReview.querySelector('.fa-remove').addEventListener('click', function(e){
                    e.target.parentElement.parentElement.style = 'display: none';
                })

                balloonReview.querySelector('#input-button').addEventListener('click', function(e){
                    e.preventDefault();
                    mark.time = getTime();
                    mark.place = popup.querySelector('#place').value;
                    mark.name = popup.querySelector('#name').value;
                    mark.wishes = popup.querySelector('#wishes').value;

                    let placemark = new ymaps.Placemark(mark.coords, {
                        balloonContentHeader: `${mark.place} 
                                              <br> 
                                              <a id="showBall">${mark.address}</a> 
                                              <br> 
                                              ${mark.wishes}`,
                        balloonContentFooter: `${mark.time}`
                    })
                    store.push(mark);
                    localStorage.setItem('marks', JSON.stringify(store))

                    clusterer.add(placemark);
                    myMap.geoObjects.add(clusterer); 

                    addReview(balloonReview, balloonReview.querySelector('.review-content-body'));
                    clearFields(balloonReview);
                })
                placemark.events.add('click', function(e){
                    e.preventDefault();
                    
                    if (document.body.contains(document.querySelector('.review'))) {
                        document.querySelector('.review').remove();
                    } else if (document.body.contains(document.querySelector('.review-balloon'))) {
                        document.querySelectorAll('.review-balloon').forEach(function(review) {
                          review.style = 'display: none';
                        })
                    }

                    balloonReview.style = 'display: flex';  
                    balloonReview.style.top = `${y}px`;
                    balloonReview.style.left = `${x}px`;
                    
                })
            })
        }) 
    })

}

function createPopup(address) {
    let div = document.createElement('div');
    
    div.classList.add('review');
    div.innerHTML = 
        `<div class="review-header">
            <div class="review-header-icon"><i class="fa fa-map-marker" style="color: white; font-size:16px"></i></div>
            <div class="review-header-address">${address}</div>
            <i class="fa fa-remove" style="font-size:20px; color: white; font-weight: 10"></i>
        </div>
        <div class="review-content">
            <div class="review-content-body"></div>
            <form id="review-content-form" onsubmit="return false">
                <p class ="review-content-headline">ВАШ ОТЗЫВ</p>
                <input type="text" id="name" class="input-text" placeholder="Ваше имя">
                <input type="text" id="place" class="input-text" placeholder="Укажите место">
                <textarea form="review-content-form" id="wishes" class="input-text-area" placeholder="Ваши пожелания"></textarea>
                <button type="submit" id="input-button">Добавить</button>
            </form> 
        </div>`
    return div;
}

function addReview(balloon, reviewField) {
    let time = getTime();

    let name = balloon.querySelector('#name').value;

    let place = balloon.querySelector('#place').value;

    let wishes = balloon.querySelector('#wishes').value;

    let div = document.createElement('div');

    div.classList.add('review-container');
    div.innerHTML = 
        `<span class="review-container-name">${name}</span>
        <span class="review-container-place">${place}</span>
        <span class="review-container-time">${time}</span>
        <br>
        <span class="review-container-wishes">${wishes}</span>`
    
    return reviewField.appendChild(div)
}

function loadReviews(mark, reviewField) {
    let div = document.createElement('div');
    div.classList.add('review-container');
    div.innerHTML = 
        `<span class="review-container-name">${mark.name}</span>
        <span class="review-container-place">${mark.place}</span>
        <span class="review-container-time">${mark.time}</span>
        <br>
        <span class="review-container-wishes">${mark.wishes}</span>`
    
    return reviewField.appendChild(div)
}

function insertReviews(div, review) {
    return div.appendChild(review)
}

function getTime() {
    let data = new Date();
    return `${data.getFullYear()}.${data.getMonth() + 1}.${data.getDate()}`
}

function clearFields(balloon) {
    balloon.querySelector('#name').value = '';
    balloon.querySelector('#place').value = '';
    balloon.querySelector('#wishes').value = '';
}

