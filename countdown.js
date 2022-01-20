'use strict';

let updateProgress = (circle, count, percent) => {
    let radius = circle.querySelector('circle.complete').getAttribute('r'),
        circumference = 2 * Math.PI * radius,
        strokeDashOffset = circumference - ((percent * circumference) / 100);

    circle.querySelector('.percentage').innerHTML = count;
    circle.querySelector('circle.complete').style.transition = 'stroke-dashoffset .5s';
    circle.querySelector('circle.complete').style.strokeDashoffset = strokeDashOffset;
};

let updateCountdown = (elm) => {
    let dateString = elm.getAttribute('data-endtime'),
        endTime = new Date(dateString).getTime(),
        second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24,
        now = new Date().getTime(),
        distance = endTime - now,
        days = Math.floor(distance / (day)),
        hours = Math.floor((distance % (day)) / (hour)),
        minutes = Math.floor((distance % (hour)) / (minute)),
        seconds = Math.floor((distance % (minute)) / second);

    updateProgress(elm.querySelector('.days'), days, (days * 100) / 365),
        updateProgress(elm.querySelector('.hours'), hours, (hours * 100) / 24),
        updateProgress(elm.querySelector('.minutes'), minutes, (minutes * 100) / 60),
        updateProgress(elm.querySelector('.seconds'), seconds, (seconds * 100) / 60);

    //do something later when date is reached
    if (distance < 0) {
        elm.querySelector('.headline').innerHTML = 'The timer has expired.';
        elm.querySelector('.desc').style.display = "none";
        elm.querySelector('.countdown').style.display = "none";

        return false;
    }

    return true;
};

let loadCountdownHtml = (elm) => {
    let title = elm.getAttribute('data-title'),
        description = elm.getAttribute('data-description'),
        html = '';

    // add title tag
    if (title) {
        html += '<h2 class="headline h5 mb-2">' + title + '</h2>';
    }
    if (description) {
        html += '<div class="description mb-4">' + description + '</div>';
    }
    html += '<div class="countdown">' +
        '<ul class="list-unstyled d-flex align-items-center justify-content-center direction-ltr text-left">' +
        '<li class="circle mx-2">' +
        '<svg class="radial-progress days html d-block mx-auto" data-percentage="0" viewBox="0 0 80 80">' +
        '<circle class="incomplete" cx="40" cy="40" r="35"></circle>' +
        '<circle class="complete" cx="40" cy="40" r="35"></circle>' +
        '<text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">0</text>' +
        '</svg>' +
        '<span class="int text-center">Days</span>' +
        '</li>' +
        '<li class="circle mx-2">' +
        '<svg class="radial-progress hours html d-block mx-auto" data-percentage="0" viewBox="0 0 80 80">' +
        '<circle class="incomplete" cx="40" cy="40" r="35"></circle>' +
        '<circle class="complete" cx="40" cy="40" r="35"></circle>' +
        '<text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">0</text>' +
        '</svg>' +
        '<span class="int text-center">Hours</span>' +
        '</li>' +
        '<li class="circle mx-2">' +
        '<svg class="radial-progress minutes html d-block mx-auto" data-percentage="0" viewBox="0 0 80 80">' +
        '<circle class="incomplete" cx="40" cy="40" r="35"></circle>' +
        '<circle class="complete" cx="40" cy="40" r="35"></circle>' +
        '<text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">0</text>' +
        '</svg>' +
        '<span class="int text-center">Minutes</span>' +
        '</li>' +
        '<li class="circle mx-2">' +
        '<svg class="radial-progress seconds html d-block mx-auto" data-percentage="0" viewBox="0 0 80 80">' +
        '<circle class="incomplete" cx="40" cy="40" r="35"></circle>' +
        '<circle class="complete" cx="40" cy="40" r="35"></circle>' +
        '<text class="percentage" x="50%" y="57%" transform="matrix(0, 1, -1, 0, 80, 0)">0</text>' +
        '</svg>' +
        '<span class="int text-center">Seconds</span>' +
        '</li></ul></div>';

    elm.innerHTML = html;
}

let initCountdown = (selector) => {

    document.querySelectorAll(selector)
        .forEach(function (elm) {

            loadCountdownHtml(elm);

            updateCountdown(elm);

            let x = setInterval(function () {

                if (!elm.querySelector('.days') ||
                    !elm.querySelector('.hours') ||
                    !elm.querySelector('.minutes') ||
                    !elm.querySelector('.seconds')) {
                    clearInterval(x);
                    return;
                }

                if (!updateCountdown(elm)) {
                    clearInterval(x);
                    return;
                }

            }, 1000);
        });

};