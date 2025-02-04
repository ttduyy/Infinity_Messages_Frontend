document.addEventListener("DOMContentLoaded", () => {
    //sidebar
    const menuItems = document.querySelectorAll(".menu-item");
    const messagesNotification = document.querySelector("#messages-notifications");
    const messages = document.querySelector(".messages");
    const message = messages ? messages.querySelectorAll(".message") : [];
    const messageSearch = document.querySelector("#message-search");

    // remove active class from all menu items
    const changeActiveItem = () => {
        menuItems.forEach((item) => {
            item.classList.remove("active");
        });
    };

    menuItems.forEach((item) => {
        item.addEventListener("click", () => {
            changeActiveItem();
            item.classList.add("active");

            if (item.id != "notifications") {
                document.querySelector(".notifications-popup").style.display = "none";
            } else {
                document.querySelector(".notifications-popup").style.display = "block";
                document.querySelector("#notifications .notification-count").style.display = "none";
            }
        });
    });

    // Search messages
    const searchMessage = () => {
        const val = messageSearch.value.toLowerCase();
        message.forEach((chat) => {
            let name = chat.querySelector("h5").textContent.toLowerCase();
            if (name.indexOf(val) != -1) {
                chat.style.display = "flex";
            } else {
                chat.style.display = "none";
            }
        });
    };

    if (messageSearch) {
        messageSearch.addEventListener("keyup", searchMessage);
    }

    if (messagesNotification) {
        messagesNotification.addEventListener("click", () => {
            messages.style.boxShadow = "0 0 1rem var(--color-primary)";
            messagesNotification.querySelector(".notification-count").style.display = "none";
            setTimeout(() => {
                messages.style.boxShadow = "none";
            }, 2000);
        });
    }

});
