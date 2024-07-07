// slideshow.js
class Slideshow {
    constructor(images, containerId) {
        this.images = images;
        this.container = document.getElementById(containerId);
        this.currentSlide = 0;
        this.init();
    }

    // Initialize the slideshow
    init() {
        //console.log("Initializing slideshow...");
        this.images.forEach((image, index) => {
            this.createImageElement(image, index);
        });

        this.showSlide(this.currentSlide);
        this.startAutoSlide();
        //console.log("Slideshow initialized successfully");
    }

    // Create an image element and add it to the slideshow container
    createImageElement(image, index) {
        //console.log(`Creating image element for image ${index}: ${image}`);
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.classList.add('slides');
        if (index === 0) imgElement.classList.add('active'); // Show the first image initially
        this.container.appendChild(imgElement);
    }

    // Show a specific slide
    showSlide(index) {
        //console.log(`Showing slide ${index}`);
        const slides = this.container.querySelectorAll('.slides');

        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.classList.add('active');
                slide.classList.remove('inactive');
            } else {
                slide.classList.remove('active');
                slide.classList.add('inactive');
            }
        });

        this.currentSlide = index;
    }

    // Show the next slide
    showNextSlide() {
        const nextSlide = (this.currentSlide + 1) % this.images.length;
        //console.log(`Showing next slide: ${nextSlide}`);
        this.showSlide(nextSlide);
    }

    // Start the automatic slide show
    startAutoSlide() {
        //console.log("Starting automatic slide show...");
        setInterval(() => this.showNextSlide(), 3500); // time in milliseconds
    }
}

// Slideshow configurations
const images = [
    'https://lh3.googleusercontent.com/pw/AP1GczO1u9U2JarD4g-BGajL01JtnU_9BqZczsUky8OcNsuF08qmH8PFczxt4w3hw9Xg12Fv8q-U5b4OsUwL66jiw9GtS8uzvi9PG0vwbUi4wanuE-aiAw=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczPFrgCNhHldRjbiL0C-p_JoOqnpQsai2todW5cocNBfj8IoZf95rYgkfwcuO2Yr92ot8N9DIvLk4JgUnTCAnyiDa_0jDWlBtbwUGLvvgbiYNKa_BQ=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczPpDh7w3kNMOcOneTpa3RhdkPNaaVLydVQV86HqXskmnEznLKsUjMyl26rUeSS-9WsaYKai8lV5HSIVbCnmbpFUaI9UsdV82JzE6IaDWH3P8QMTyQ=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczNybatWcgE5yqtC1WD0HQf9z1e9zbFJ_Xhec_Q_ZE1Z6bls4uNF2hVJqr6QGL1Usz8iyEWE2Z3dbgkC5WNNKza-IukCSDEr6lZkcozWaKfR8N2P0Q=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczNPoPRF_nHhgXsxsK-u8A4HKmLri6urf0ORbjFzYBAg4_ws5BIsv11askV6oR3ysYSBy45qAu46bYmCNjBccLDRLfRAcJ0IcIlvdj1HsQo5W_ZoyA=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczMCuevh0O5iVxpD2WPWbLb7NhTvsiWJ57djMjyGkDxpnJ1pCGIeIjUOPnbbugs7YvbihjBRp6dndK9xr010LATx9mXNNhOFhkMNGOlwI8PYTbf7Sw=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczPbjiDmf12ROdKR2WXib4HqL1NJ_oKgpULy5ZW9VExrdaIiEmdI5T2YI1ZOI346IzGBW3R6DtIwIP3LgsP1ofxYauQ6gwa-VlHWzUQu5yHZxytxCA=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczPQV7jUWTYFrtFRpjhUliwX4MQTOqvnvfhTQNQVgwoNK6tIYrSs9NkLfNQAhz2OsjQ9l6UaLwB58Fi6UDlJ058Ui_HtHIGDKzgJYMzzBtMHscI-LQ=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczN1QxhcA0c2t9uOMkF-SUiw2-OHY1rwMXfXc-dZxE76uAvcGWsb1eC6Lzf2m7UHYyDtBK5BvX0xmRp5MueBU0NaQuJXqu4L33ZiFgnurZRpZO-Rmg=w1920-h1080',
    'https://lh3.googleusercontent.com/pw/AP1GczNrXw1-JzjhyhDv9gQyd6aanK3FVWvwR8WwGASXvCFyycL1CwoJZH2FQh5hT7TaAg4dW1qiGwUYJngdCl3H_Lg2hTj9syEsWqB7L750TRZBD8Iz1Q=w1920-h1080'
];

// Initialize slideshow
//console.log("Initializing slideshow instance...");
const slideshow = new Slideshow(images, 'slideshow');
//console.log("Slideshow instance initialized");
