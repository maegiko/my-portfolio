let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav ul li a");
const goTopBtn = document.querySelector(".scroll-top");
const nav_links = document.querySelectorAll(".navbar a");
const skills = document.querySelectorAll(".progress_percent");
const animatedSkills = document.querySelectorAll(
  ".html, .css, .javascript, .python, .C, .latex, .maple, .english, .cantonese"
);

// This code here displays the go to top button only if 600px have been
// scrolled
window.addEventListener("scroll", checkHeight);

function checkHeight() {
  if (window.scrollY > 600) {
    goTopBtn.style.display = "flex";
  } else {
    goTopBtn.style.display = "none";
  }
}

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        nav_links.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${id}`
          );
        });
      }
    });
  },
  {
    threshold: 0.6,
  }
);

sections.forEach((section) => observer.observe(section));

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  },
  {
    threshold: 0.7,
  }
);

animatedSkills.forEach((el) => skillObserver.observe(el));

const contentObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        obs.unobserve(entry.target); // Only trigger once
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const content = document.querySelectorAll(
  ".heading, .bar, .timeline, .projects-box, .contact-form, .social, .list, .copyright, .hey-there, .home-img, .home-second, .header"
);

content.forEach((el) => contentObserver.observe(el));
