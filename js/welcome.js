/* Initial orientation only. Operational access must use a verified login route. */
(function () {
    'use strict';

    const dialog = document.getElementById('logistyka-welcome');
    // Progressive enhancement: unsupported browsers retain the institutional site.
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const storageKey = 'logistyka.welcome.dismissed';
    let dismissed = false;
    let previousFocus;
    let restoreScroll;

    try {
        dismissed = window.sessionStorage.getItem(storageKey) === '1';
    } catch (_) { /* Storage can be unavailable in privacy modes. */ }

    function rememberDismissal() {
        dismissed = true;
        try {
            window.sessionStorage.setItem(storageKey, '1');
        } catch (_) { /* In-memory dismissal still works for this page. */ }
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
        rememberDismissal();
        dialog.close();
    }

    dialog.addEventListener('close', function () {
        rememberDismissal();
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
    dialog.querySelector('[data-welcome-contact]').addEventListener('click', function (event) {
        event.preventDefault();
        dialog.returnValue = 'contact';
        closeWelcome();
    });

    // Native dialog makes the background inert and handles Escape. Keep Tab in its controls.
    dialog.addEventListener('keydown', function (event) {
        if (event.key !== 'Tab') return;
        const controls = Array.from(dialog.querySelectorAll('a[href], button:not([disabled])'));
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
        if (dismissed || dialog.open) return;
        const preloader = document.getElementById('preloader');
        // Wait for Flare's existing loader to finish, without altering its animation.
        if (preloader && window.getComputedStyle(preloader).display !== 'none') {
            window.setTimeout(openWhenReady, 100);
            return;
        }
        previousFocus = document.activeElement;
        dialog.hidden = false;
        try {
            dialog.showModal();
            lockScroll();
            document.getElementById('welcome-title').focus({ preventScroll: true });
        } catch (_) {
            if (restoreScroll) restoreScroll();
            dialog.hidden = true;
        }
    }

    if (document.readyState === 'complete') openWhenReady();
    else window.addEventListener('load', openWhenReady, { once: true });
}());
