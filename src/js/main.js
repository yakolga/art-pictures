import modals from "./modules/modals";
import slider from "./modules/sliders";

window.addEventListener('DOMContentLoaded', function() {
    'use strict';
    modals();
    slider('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
    slider('.main-slider-item', 'vertical');
});