document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const addBurger = document.getElementById("create-form");

  if (addBurgerBtn) {
    addBurgerBtn.addEventListener("submit", (e) => {
      e.preventDefault();
      const newBurger = {
        burger_name: document.getElementById("burger").value.trim(),
        devoured: 0,
      };

      fetch("/api/burgers", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify(newBurger),
      }).then(() => {
        document.getElementById("burger").value = "";
        console.log("new burger created");
        location.reload();
      });
    });
  }

  const devourBtn = document.querySelectorAll(".eat");

  if (devourBtn) {
    devourBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.getAttribute("data-id");
        const newDevour = e.target.getAttribute("data-newdevour");

        const newDevourState = {
          devoured: 1,
        };

        fetch(`/api/burgers/${id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify(newDevourState),
        }).then((response) => {
          if (response.ok) {
            console.log(`changed devoured to: ${newDevour}`);
            location.reload("/");
          } else {
            alert("something went wrong!");
          }
        });
      });
    });
  }
});
