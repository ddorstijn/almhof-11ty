const load = (targets, onIntersection) => {
    const observer = new IntersectionObserver((entries, self) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                onIntersection(entry.target)
                self.unobserve(entry.target)
            }
        })
    });

    targets.forEach((target) => observer.observe(target))
}

export function lazyload() {
    load(document.querySelectorAll('.lazy-picture'), (pictureElement) => {
        const img = pictureElement.querySelector('img')
        const sources = pictureElement.querySelectorAll('source')
    
        img.onload = () => {
            pictureElement.dataset.loaded = true
            img.removeAttribute('data-src')
        }
        img.onerror = () => {
            pictureElement.dataset.loaded = false
        }
    
        sources.forEach((source) => {
            source.sizes = source.dataset.sizes
            source.srcset = source.dataset.srcset
            source.removeAttribute('data-srcset')
            source.removeAttribute('data-sizes')
        })
    
        img.src = img.dataset.src
    })
}