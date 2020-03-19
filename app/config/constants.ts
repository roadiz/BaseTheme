import { SwiperOptions } from 'swiper'

export const EVENTS = {
    /**
     * Window events
     * @type {String}
     */
    WINDOW_RESIZE: 'window-resize',
    WINDOW_RESIZE_IMMEDIATE: 'window-resize-immediate',

    /**
     * Key events
     */
    KEY_UP_ESCAPE: 'key-up-escape',

    /**
     * Image events
     */
    IMAGE_LOAD: 'image-load',
    IMAGE_REFRESH: 'image-refresh',

    /**
     * Nav
     */
    NAVIGATION_MOUNTED: 'navigation-mounted',

    /**
     * Transition events
     */
    TRANSITION_START: 'transition-start',
    TRANSITION_END: 'transition-end',

    /**
     * Api
     */
    API_ERROR: 'api-error'
}

export const COLORS = {
    BLUE: '#141b4d',
    DARK: '#111'
}

export const SWIPER: SwiperOptions = {
    loop: false,
    speed: 600,
    grabCursor: true,
    watchOverflow: true,
    wrapperClass: 'default-wrapper',
    slideClass: 'default-item',
    slidesPerView: 'auto',
    /* Fix iOs out of bound unreachable items */
    setWrapperSize: true,
    threshold: 5,
    touchEventsTarget: 'wrapper',
    /* roundLengths: true, */
    init: false,
    resistanceRatio: 0.4,
    longSwipesMs: 100,
    longSwipesRatio: 0.1,
    /* TODO: aria attributes switch bug on window resize */
    a11y: false,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
}
