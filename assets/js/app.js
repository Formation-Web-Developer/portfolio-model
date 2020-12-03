jQuery(($) => {
    clickMore();
    carrouselAnimation(['parallax1.jpg', 'parallax2.jpg', 'parallax3.jpg'], 1000, {opacity: 1}, {opacity: 0}, 3000);
    scrollHandler([{handler: barListener}, {handler: headerListener}]);
});

/**
 * @param {$ObjMap[]} handlers
 * @param {function(number, number)} handlers[].handler
 * @param {boolean} handlers[].repeat
 */
function scrollHandler(handlers){
    const $w = $(window);
    $w.scroll(() => {
        if(handlers.length === 0){
            $w.unbind('scroll');
            return;
        }
        let i = 0;
        while (i < handlers.length){
            if(handlers[i].handler($w.scrollTop(), $w.height())){
                handlers.splice(i, 1);
                i--;
            }
            i++;
        }
    })
}

/** @param {number} scrollTop
  * @param {number} height
  * @returns {boolean|undefined}*/
function headerListener(scrollTop, height){
    if(scrollTop > 300){
        $('#nav').addClass('scrolled');
    }else{
        $('#nav').removeClass('scrolled');
    }
}

/** @param {number} scrollTop
  * @param {number} height
  * @returns {boolean|undefined} */
function barListener(scrollTop, height){
    const bars = $('.bar');
    if(scrollTop >= $(bars[0]).offset().top - (height * .75)){
        barAnimation(bars, 1000, 250)
        return true;
    }
    return false;
}

/**
 * @param {string[]}    imagePath
 * @param {number}      speed
 *
 * @param {$ObjMap}     from
 * @param {string|int}  from.width
 * @param {int}         from.opacity
 *
 * @param {$ObjMap}     to
 * @param {string|int}  to.width
 * @param {int}         to.opacity
 *
 * @param {number}      delay */
function carrouselAnimation(imagePath, speed, from, to, delay){
    const carrousel = $('.carrousel');
    const firstChild = carrousel.children('div:first-child');
    const lastChild = carrousel.children('div:last-child');
    let index = 0;

    setInterval(() => {
        index = (index+1)%imagePath.length;
        animate(firstChild, to, speed, () => {
            from['background-image'] = lastChild.css('background-image');
            firstChild.css(from);
            lastChild.css('background-image', `url("assets/img/${imagePath[index]}")`);
        }, 0)
    }, delay);
}

/** @param {HTMLElement[]} bars
  * @param {number} speed
  * @param {number} interval */
function barAnimation(bars, speed, interval) {
    if(bars.length === 0) return;
    const $w = $(window);
    for(let i = 0; i < bars.length; i++){
        animateBar(bars[i], interval*i, speed);
    }
}

/** @param {HTMLElement} bar
  * @param {number} interval
  * @param {number} speed */
function animateBar(bar, interval, speed){
    animate($(bar), {width: bar.dataset.progress}, speed, ()=>{}, interval);
}

/** @param {jQuery} element
 *  @param {$ObjMap} to
 *  @param {number} speed
 *  @param {function} complete
 *  @param {number=} delay */
function animate(element, to, speed, complete, delay = 0){
    element.delay(delay).animate(to, speed, complete);
}

function clickMore(){
    const images = '<img src="assets/img/p1.jpg" alt="" class="work"><img src="assets/img/p2.jpg" alt="" class="work"><img src="assets/img/p3.jpg" alt="" class="work"><img src="assets/img/p4.jpg" alt="" class="work"><img src="assets/img/p5.jpg" alt="" class="work"><img src="assets/img/p6.jpg" alt="" class="work"><img src="assets/img/p7.jpg" alt="" class="work"><img src="assets/img/p8.jpg" alt="" class="work">';
    $('#btnWork').click(() => {
        const newImage = $(images).hide();
        $('#workImages').append(newImage);
        let x = 0;
        for(const image of newImage){
            $(image).delay(x).fadeIn(1200);
            x+=150;
        }
    });
}

function showMap() {
    new google.maps.Map(document.getElementById("googleMap"), {
        center: new google.maps.LatLng(41.881832, -87.623177),
        zoom: 11,
    });
}
