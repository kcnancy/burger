document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const addBurger = document.getElementById("create-form");
  const addbutton = document.getElementById("create-button");

  addbutton.addEventListener("click", (e) => {
    console.log("adding a burger");
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

  const devour = document.querySelectorAll(".eat");

  if (devour) {
    devour.forEach((button) => {
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

const Offmenu = document.querySelectorAll(".ate");

if (Offmenu) {
  Offmenu.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");

      fetch(`/api/burgers/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.ok) {
          console.log(`deleted the burger}`);
          location.reload("/");
        } else {
          alert("something went wrong!");
        }
      });
    });
  });
}
