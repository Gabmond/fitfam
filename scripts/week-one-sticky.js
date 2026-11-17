(() => {
    const button = document.querySelector(".program-progression__cta .week-1");
    const schedule = document.querySelector(".weekly-schedule");
    const buttonSlot = button?.closest(".program-progression__cta");

    if (!button || !schedule || !buttonSlot) return;

    let framePending = false;

    const updateButtonPosition = () => {
        framePending = false;

        const nav = document.querySelector(".bottom-nav");
        const navIsVisible = nav && getComputedStyle(nav).display !== "none";
        const navTop = navIsVisible ? nav.getBoundingClientRect().top : window.innerHeight;
        const buttonHeight = button.getBoundingClientRect().height;
        const anchorTop = navTop - 16 - buttonHeight;
        const scheduleTop = schedule.getBoundingClientRect().top;
        const naturalButtonTop = buttonSlot.getBoundingClientRect().top;

        // Float from the first schedule card until the button reaches its
        // original place near the end of the progression section.
        const shouldFloat = scheduleTop <= anchorTop && naturalButtonTop > anchorTop;
        button.classList.toggle("is-floating", shouldFloat);

        if (shouldFloat) {
            button.style.bottom = `${window.innerHeight - navTop + 16}px`;
        } else {
            button.style.removeProperty("bottom");
        }
    };

    const scheduleUpdate = () => {
        if (framePending) return;
        framePending = true;
        window.requestAnimationFrame(updateButtonPosition);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();
})();