// script.js

// Mobile Navigation Toggle
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burgerMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burgerMenu.classList.remove('open');
    });
});

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;
const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    document.addEventListener('mousemove', (e) => {
        customCursor.style.left = `${e.clientX}px`;
        customCursor.style.top = `${e.clientY}px`;
    });

function setTheme(theme) {
    if (theme === 'dark') {
        html.classList.add('dark');
        themeIcon.innerHTML = `<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>`;
    } else {
        html.classList.remove('dark');
        themeIcon.innerHTML = `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M4.93 4.93l1.41 1.41"/><path d="M17.66 17.66l1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="M4.93 19.07l1.41-1.41"/><path d="M17.66 6.34l1.41-1.41"/>`;
    }
    localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setTheme('dark');
} else {
    setTheme('light');
}

themeToggle.addEventListener('click', () => {
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Typed Text Animation
class TypedText {
    constructor(elementId, phrases, typeSpeed = 100, backSpeed = 60, loop = true) {
        this.element = document.getElementById(elementId);
        this.phrases = phrases;
        this.typeSpeed = typeSpeed;
        this.backSpeed = backSpeed;
        this.loop = loop;
        this.phraseIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.element.textContent = '';
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.phraseIndex];
        const updatedText = this.isDeleting
            ? currentPhrase.substring(0, this.charIndex - 1)
            : currentPhrase.substring(0, this.charIndex + 1);

        this.element.textContent = updatedText;

        const delta = this.isDeleting ? this.backSpeed : this.typeSpeed;
        this.charIndex += this.isDeleting ? -1 : 1;

        if (!this.isDeleting && updatedText === currentPhrase) {
            this.isDeleting = true;
            setTimeout(() => this.type(), 1500);
        } else if (this.isDeleting && updatedText === '') {
            this.isDeleting = false;
            this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
            setTimeout(() => this.type(), 500);
        } else {
            setTimeout(() => this.type(), delta);
        }
    }
}

// GSAP Animations
document.addEventListener('DOMContentLoaded', () => {
    const heroElements = document.querySelectorAll('[data-animate]');
    
    gsap.set(heroElements, { y: 30, opacity: 0 });

    gsap.to(heroElements, {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
    });

    const phrases = ["PRANAVA S.", "A Full-Stack Developer", "A Problem Solver"];
    new TypedText('typing-text', phrases);
});