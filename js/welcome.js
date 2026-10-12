/* Initial orientation only. Operational access must use a verified login route. */
(function () {
    'use strict';

    const dialog = document.getElementById('logistyka-welcome');
    // Progressive enhancement: unsupported browsers retain the institutional site.
    if (!dialog || typeof dialog.showModal !== 'function' || dialog.dataset.welcomeInitialized) return;
    // Per-document guard: repeated script execution must not register or open twice.
    dialog.dataset.welcomeInitialized = 'true';

    let opened = false;
    let previousFocus;
    let restoreScroll;

    const video = dialog.querySelector('video');
    const videoToggle = dialog.querySelector('[data-welcome-video-toggle]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let videoPausedByUser = false;

    function updateVideoLabel() {
        videoToggle.textContent = video.paused ? 'Reproducir video' : 'Pausar video';
    }

    function playVideo() {
        if (!video || !dialog.open || document.hidden) return;
        // Fetch media only when needed; the poster remains if autoplay is unavailable.
        if (!video.getAttribute('src')) video.src = video.dataset.src;
        video.muted = true;
        const playback = video.play();
        if (playback) playback.then(function () {
            if (!dialog.open || document.hidden) video.pause();
        }).catch(updateVideoLabel);
    }

    function syncVideo() {
        if (!video) return;
        if (!dialog.open || document.hidden || reducedMotion.matches ||
            (navigator.connection && navigator.connection.saveData) || videoPausedByUser) {
            video.pause();
        } else {
            playVideo();
        }
    }

    if (video && videoToggle) {
        videoToggle.hidden = false;
        video.addEventListener('play', updateVideoLabel);
        video.addEventListener('pause', updateVideoLabel);
        video.addEventListener('error', function () {
            video.hidden = true;
            videoToggle.hidden = true;
        });
        videoToggle.addEventListener('click', function () {
            videoPausedByUser = !video.paused;
            if (videoPausedByUser) video.pause();
            else playVideo();
        });
        document.addEventListener('visibilitychange', syncVideo);
        window.addEventListener('pagehide', function () { video.pause(); });
        if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', syncVideo);
    }

    function lockScroll() {
        const body = document.body;
        const root = document.documentElement;
        const x = window.scrollX;
        const y = window.scrollY;
        const properties = ['position', 'top', 'left', 'width', 'overflow', 'padding-right'];
        const saved = properties.map(function (name) {
            return [name, body.style.getPropertyValue(name), body.style.getPropertyPriority(name)];
        });
        const rootOverflow = root.style.overflow;
        const gap = window.innerWidth - root.clientWidth;
        const padding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
        body.style.position = 'fixed';
        body.style.top = -y + 'px';
        body.style.left = -x + 'px';
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        body.style.paddingRight = padding + gap + 'px';
        root.style.overflow = 'hidden';
        restoreScroll = function () {
            saved.forEach(function (entry) {
                if (entry[1]) body.style.setProperty(entry[0], entry[1], entry[2]);
                else body.style.removeProperty(entry[0]);
            });
            root.style.overflow = rootOverflow;
            window.scrollTo(x, y);
            restoreScroll = null;
        };
    }

    function closeWelcome() {
        if (!dialog.open) return;
        dialog.close();
    }

    dialog.addEventListener('close', function () {
        if (video) video.pause();
        dialog.hidden = true;
        if (restoreScroll) restoreScroll();
        const target = previousFocus && previousFocus !== document.body && previousFocus.isConnected
            ? previousFocus : document.querySelector('.logistyka-logo');
        if (target) target.focus({ preventScroll: true });
        if (dialog.returnValue === 'contact') {
            const contact = document.getElementById('contact');
            if (contact) {
                window.location.hash = 'contact';
                contact.scrollIntoView();
                const link = contact.querySelector('a[href]');
                if (link) link.focus({ preventScroll: true });
            }
        }
    });

    dialog.querySelectorAll('[data-welcome-close]').forEach(function (button) {
        button.addEventListener('click', closeWelcome);
    });
    dialog.querySelectorAll('[data-welcome-contact]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            dialog.returnValue = 'contact';
            closeWelcome();
        });
    });

    // Native dialog makes the background inert and handles Escape. Keep Tab in its controls.
    dialog.addEventListener('keydown', function (event) {
        if (event.key !== 'Tab') return;
        const controls = Array.from(dialog.querySelectorAll('a[href], button:not([disabled]):not([hidden])'));
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement))) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });

    function openWhenReady() {
        if (opened || dialog.open) return;
        const preloader = document.getElementById('preloader');
        // Wait for Flare's existing loader to finish, without altering its animation.
        if (preloader && window.getComputedStyle(preloader).display !== 'none') {
            window.setTimeout(openWhenReady, 100);
            return;
        }
        previousFocus = document.activeElement;
        opened = true;
        dialog.hidden = false;
        try {
            dialog.showModal();
            lockScroll();
            document.getElementById('welcome-title').focus({ preventScroll: true });
            syncVideo();
        } catch (_) {
            if (restoreScroll) restoreScroll();
            dialog.hidden = true;
        }
    }

    if (document.readyState === 'complete') openWhenReady();
    else window.addEventListener('load', openWhenReady, { once: true });
}());
