
export const createObserver = () => {


    let options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
    }

    let observer = new IntersectionObserver(handleIntersect, options);

    let damageTarget = document.querySelector('.damage-div');
    observer.observe(target);

    let callback = (entries, observer) => {
    entries.forEach(entry => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time
        if (entry.isIntersecting){
            createDmg(dmgData, playerName);
        }
    });
    };
}