"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("certificates.json")
    .then((response) => response.json())
    .then((data) => {
      const certificateList = document.getElementById("certificateList");

      data.forEach((cert) => {
        const li = document.createElement("li");
        li.className = "certificate-item active";
        li.setAttribute("data-filter-item", "");
        li.setAttribute("data-category", cert.category.toLowerCase());

        li.innerHTML = `
          <a href="${cert.url}" target="_blank" class="certificate-link">
            <figure class="certificate-img">
              <div class="certificate-item-icon-box">
                <ion-icon name="eye-outline"></ion-icon>
              </div>
              <img src="./assets/images/certs/${cert.category.toLowerCase()}/${
          cert.alt
        }.png" alt="${cert.alt}" loading="lazy">
            </figure>
            <h3 class="certificate-title">${cert.title}</h3>
            <p class="certificate-category">${cert.category}</p>
          </a>
        `;

        certificateList.appendChild(li);
      });

      // Call the function to set up filtering
      setupFiltering();
    })
    .catch((error) => console.error("Error loading certificates:", error));
});

function setupFiltering() {
  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterSelect = document.querySelector(".filter-select");
  const selectValue = document.querySelector(".select-value");
  const selectList = document.querySelector(".select-list");
  const selectItems = document.querySelectorAll(".select-item button");

  function filterCertificates(filterValue) {
    filterItems.forEach((item) => {
      if (
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue
      ) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Button filtering
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter-btn");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update dropdown to match selected filter
      selectValue.textContent = this.textContent;
      selectItems.forEach((item) => {
        item.classList.toggle(
          "active",
          item.getAttribute("data-select-btn") === filterValue
        );
      });

      filterCertificates(filterValue);
    });
  });

  // Dropdown functionality
  filterSelect.addEventListener("click", () => {
    selectList.style.display =
      selectList.style.display === "none" ? "block" : "none";
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!filterSelect.contains(e.target)) {
      selectList.style.display = "none";
    }
  });

  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-select-btn");
      selectValue.textContent = this.textContent;
      selectList.style.display = "none";

      selectItems.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Update filter buttons to match selected dropdown item
      filterButtons.forEach((btn) => {
        btn.classList.toggle(
          "active",
          btn.getAttribute("data-filter-btn") === filterValue
        );
      });

      filterCertificates(filterValue);
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("software.json")
    .then((response) => response.json())
    .then((data) => {
      const toolsList = document.getElementById("softwareList");

      data.forEach((tool) => {
        const li = document.createElement("li");
        li.className = "software-item";

        li.innerHTML = `
          <a href="#">
            <img src="./assets/images/software/${tool.image}" alt="${tool.name}" class="software-image">
          </a>
        `;

        toolsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading software:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  fetch("tools.json")
    .then((response) => response.json())
    .then((data) => {
      const toolsList = document.getElementById("toolsList");

      data.forEach((tool) => {
        const li = document.createElement("li");
        li.className = "tools-item";

        li.innerHTML = `
          <a href="#">
            <img src="./assets/images/tools/${tool.image}" alt="${tool.name}" class="tool-image">
          </a>
        `;

        toolsList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error loading tools:", error));
});
