// HN Coaching — small progressive enhancements. The site works without JS.

(function () {
  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Fade-in on scroll
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  // Enquiry form: submit in the background, then go to the thank-you page.
  // Without JS the form still posts normally and Web3Forms redirects.
  var form = document.getElementById("enquiry-form");
  if (!form) return;

  // Preselect the package when arriving from a "/contact?package=..." link
  var requested = new URLSearchParams(window.location.search).get("package");
  if (requested && /^[a-z]+$/.test(requested)) {
    var option = form.querySelector('option[data-package="' + requested + '"]');
    if (option) option.selected = true;
  }

  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");

  function showStatus(type, message) {
    status.className = "form-status show " + type;
    status.textContent = message;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    var accessKey = form.querySelector("[name=access_key]").value;
    if (!accessKey || accessKey.indexOf("YOUR_") === 0) {
      showStatus("error", "The enquiry form hasn't been connected yet. Please email us directly for now.");
      return;
    }

    var originalLabel = button.textContent;
    button.disabled = true;
    button.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form)
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.success) {
          window.location.href = "/thank-you";
        } else {
          throw new Error(data.message || "Submission failed");
        }
      })
      .catch(function () {
        showStatus("error", "Sorry, something went wrong sending your message. Please try again, or email us directly.");
        button.disabled = false;
        button.textContent = originalLabel;
      });
  });
})();
