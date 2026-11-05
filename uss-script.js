(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
  }

  var thanks = document.getElementById("thanks-title");
  if (thanks) {
    var savedName = "";
    try { savedName = sessionStorage.getItem("wfh-thanks-name") || ""; } catch (error) {}
    savedName = savedName.replace(/[<>&"]/g, "").trim();
    if (savedName) thanks.textContent = "Thanks, " + savedName + ".";
  }

  var form = document.getElementById("contact-form");
  if (!form) return;
  function showError(id, message) {
    var input = document.getElementById(id);
    var error = document.getElementById(id + "-error");
    input.setAttribute("aria-invalid", message ? "true" : "false");
    error.textContent = message;
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.elements.name.value.trim();
    var phone = form.elements.phone.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();
    var digits = phone.replace(/\D/g, "");
    showError("contact-name", name.length < 2 ? "Enter your name." : "");
    showError("contact-phone", digits.length < 10 ? "Enter a phone number with at least 10 digits." : "");
    showError("contact-email", form.elements.email.checkValidity() && email ? "" : "Enter a valid email address.");
    showError("contact-message", message.length < 10 ? "Add a short question about the work options." : "");
    var invalid = form.querySelector("[aria-invalid='true']");
    if (invalid) {
      invalid.focus();
      return;
    }
    var first = name.split(/\s+/)[0].slice(0, 40);
    try { sessionStorage.setItem("wfh-thanks-name", first); } catch (error) {}
    window.location.href = "thank-you/";
  });
})();
