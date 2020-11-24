jQuery(($) => {
    clickMore();

    carrouselAnimation(['parallax1.jpg', 'parallax2.jpg', 'parallax3.jpg'], 1000, {opacity: 1}, {opacity: 0}, 3000);
    barAnimation($('.bar'), 1000, .75);
});
/** @param {string[]} imagePath
 * @param {number} speed
 * @param {$ObjMap} from
 * @param {string|int} from.width
 * @param {int} from.opacity
 * @param {$ObjMap} to
 * @param {string|int} to.width
 * @param {int} to.opacity
 * @param {number} delay */
function carrouselAnimation(imagePath, speed, from, to, delay){
    const carrousel = $('.carrousel');
    const firstChild = carrousel.children('div:first-child');
    const lastChild = carrousel.children('div:last-child');
    let index = 0;

    setInterval(() => {
        index = (index+1)%imagePath.length;
        animate(firstChild, to, speed, () => {
            firstChild.animate(to,1000, () => {
                from['background-image'] = lastChild.css('background-image');
                firstChild.css(from);
                lastChild.css('background-image', `url("assets/img/${imagePath[index]}")`);
            });
        })
    }, delay);
}

/** @param {HTMLElement[]} bars
  * @param {number} speed
  * @param {number=} offset - 0 à 1 */
function barAnimation(bars, speed, offset = 1) {
    if(bars.length === 0) return;
    const $w = $(window);
    $w.scroll(() => {
        if($w.scrollTop() >= $(bars[0]).offset().top - ($w.height() * offset)){
            animateBarRecursive(bars, speed, 0);
            $w.unbind('scroll');
        }
    })
}

/** @param {HTMLElement[]} bars
  * @param {number} speed
  * @param {number} index */
function animateBarRecursive(bars, speed, index){
    if(index >= bars.length) return;
    animate($(bars[index]), {width: bars[index].dataset.progress+"%"}, speed, () => animateBarRecursive(bars, speed, index+1))
}

/** @param {jQuery} element
 *  @param {$ObjMap} to
 *  @param {number} speed
 *  @param {function} complete */
function animate(element, to, speed, complete){
    element.animate(to, speed, complete);
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