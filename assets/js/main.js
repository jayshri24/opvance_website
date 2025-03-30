document.addEventListener("DOMContentLoaded", function () {
  // Header position JS Start
  const headerSection = document.querySelector(".header-section");
  const scrollThreshold = 150;

  function handleHeaderScroll() {
    if (window.innerWidth >= 992) {
      if (window.scrollY > scrollThreshold) {
        headerSection.classList.add("sticky-header");
      } else {
        headerSection.classList.remove("sticky-header");
      }
    } else {
      headerSection.classList.remove("sticky-header");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll);
  window.addEventListener("resize", handleHeaderScroll);
  handleHeaderScroll();
  // Header position JS End

  // Nav Links JS Start

  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      navLinks.forEach((otherLink) => {
        otherLink.classList.remove("active");
      });

      this.classList.add("active");
    });
  });
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      scrollToSection(targetId);
    });
  });

  if (window.location.hash) {
    const targetId = window.location.hash.substring(1);
    scrollToSection(targetId);
  }

  function scrollToSection(targetId) {
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      const topOffset = -80;
      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.pageYOffset +
        topOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }

  // Nav Links JS End

  // Swiper Slider JS Start
  const swiperContainer = document.querySelector(".swiper-container");
  if (swiperContainer) {
    // Check if the element exists
    const swiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      spaceBetween: 20,
      centeredSlides: false,
      slidesOffsetAfter: 100,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      grabCursor: true, // Enable grab cursor
      on: {
        touchStart: function () {
          swiperContainer.style.cursor = "grabbing"; // Change cursor on touch start
        },
        touchEnd: function () {
          swiperContainer.style.cursor = "grab"; // Change cursor on touch end
        },
      },
    });
  }
  // Swiper Slider JS End

  // AOS Animation JS Start
  AOS.init({
    once: true,
  });
  // AOS Animation JS End

  // Form Validation JS Start
  const form = document.querySelector("form");
  const nameInput = document.getElementById("name");
  const mobileInput = document.getElementById("mobile");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendButton = form.querySelector("button.btn");
  const formSuccessMessage = document.createElement("div");
  formSuccessMessage.classList.add("form-success-message");

  function validateName() {
    if (nameInput.value.trim() === "") {
      setError(nameInput, "Name is required");
      return false;
    } else {
      setSuccess(nameInput);
      return true;
    }
  }

  function validateMobile() {
    if (mobileInput.value.trim() === "") {
      setError(mobileInput, "Mobile number is required");
      return false;
    } else if (!/^\d{10}$/.test(mobileInput.value.trim())) {
      setError(mobileInput, "Invalid mobile number");
      return false;
    } else {
      setSuccess(mobileInput);
      return true;
    }
  }

  function validateEmail() {
    if (emailInput.value.trim() === "") {
      setError(emailInput, "Email address is required");
      return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      setError(emailInput, "Invalid email address");
      return false;
    } else {
      setSuccess(emailInput);
      return true;
    }
  }

  function validateMessage() {
    if (messageInput.value.trim() === "") {
      setError(messageInput, "Message is required");
      return false;
    } else {
      setSuccess(messageInput);
      return true;
    }
  }

  nameInput.addEventListener("input", validateName);
  mobileInput.addEventListener("input", validateMobile);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  sendButton.addEventListener("click", function (e) {
    e.preventDefault();

    const isNameValid = validateName();
    const isMobileValid = validateMobile();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();

    if (isNameValid && isMobileValid && isEmailValid && isMessageValid) {
      form.appendChild(formSuccessMessage);
      formSuccessMessage.textContent = "Form submitted successfully!";
      console.log("Form submitted!");

      // Clear form fields
      nameInput.value = "";
      mobileInput.value = "";
      emailInput.value = "";
      messageInput.value = "";

      // Clear success and error styles
      clearStyles(nameInput);
      clearStyles(mobileInput);
      clearStyles(emailInput);
      clearStyles(messageInput);
    } else {
      if (form.contains(formSuccessMessage)) {
        form.removeChild(formSuccessMessage);
      }
    }
  });

  function setError(input, message) {
    const errorDiv = document.getElementById(input.id + "-error");
    errorDiv.textContent = message;
    input.classList.add("error");
    input.classList.remove("success");
  }

  function setSuccess(input) {
    const errorDiv = document.getElementById(input.id + "-error");
    errorDiv.textContent = "";
    input.classList.remove("error");
    input.classList.add("success");
  }

  function clearStyles(input) {
    input.classList.remove("error");
    input.classList.remove("success");
    const errorDiv = document.getElementById(input.id + "-error");
    errorDiv.textContent = "";
  }
  // Form Validation JS End
});
