document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll(".section");
	const burgerBtn = document.querySelector(".burger-btn");
	const burgerBars = document.querySelector(".burger-btn__bars");
	const navMenu = document.querySelector(".navigation__links");
	const navLinks = document.querySelectorAll(".navigation__link");
	const navLinksA = document.querySelectorAll(".navigation__link a");
	const downArrows = document.querySelectorAll(".fa-angle-down");
	const faqQuestion = document.querySelectorAll(".faq__container");
	const getCurrentUrl = window.location.href;

	const deleteLinkAnimation = params => {
		navLinks.forEach(link => {
			link.classList.remove("navigation__link--animation");
		});
	};

	const handleLinkAnimation = params => {
		let deleyTime = 0;
		navLinks.forEach(link => {
			link.classList.toggle("navigation__link--animation");
			link.style.animationDelay = "." + deleyTime + "s";
			deleyTime++;
		});
	};

	const handleNav = params => {
		burgerBars.classList.toggle("burger-btn__bars--active");
		navMenu.classList.toggle("navigation__links--active");

		navLinks.forEach(link => {
			link.addEventListener("click", () => {
				navMenu.classList.remove("navigation__links--active");
				burgerBars.classList.remove("burger-btn__bars--active");
				deleteLinkAnimation();
			});
		});
		handleLinkAnimation();

		// navMenu.addEventListener("click", e => {
		// 	if (e.target != "li") {
		// 		navMenu.classList.remove("navigation__links--active");
		// 		burgerBars.classList.remove("burger-btn__bars--active");
		// 		deleteLinkAnimation();
		// 	}
		// });
	};

	const changeNavFocus = url => {
		if (
			window.location.href === `${url}/` ||
			window.location.href === `${url}/index.html`
		) {
			navLinksA[0].classList.add("navigation__current-page");
		} else if (window.location.href === `${url}/contact.html`) {
			navLinksA[0].classList.remove("navigation__current-page");
			navLinksA[3].classList.add("navigation__current-page");
		} else if (window.location.href === `${url}/offert.html`) {
			navLinksA[0].classList.remove("navigation__current-page");
			navLinksA[2].classList.add("navigation__current-page");
		}
	};

	const makeShortUrl = params => {
		const index = getCurrentUrl.lastIndexOf("/");
		const url = getCurrentUrl.slice(0, index);
		return url;
	};

	const scrollSpy = params => {
		const cords = window.pageYOffset;
		sections.forEach(section => {
			if (section.offsetTop - 88 <= cords && section.hasAttribute("id")) {
				console.log(section.offsetTop);
				clearActiveNavFocus();
				const sectionId = section.id;
				const activeLink = document.querySelector(`a[href*=${sectionId}]`);
				activeLink.classList.add("navigation__current-page");
			}
		});
	};

	const clearActiveNavFocus = params => {
		navLinksA.forEach(link => {
			link.classList.remove("navigation__current-page");
		});
	};

	const showAnswer = params => {
			downArrows.forEach(arrow => {
				arrow.addEventListener("click", e => {
					const clickedArrow = e.target;
					if (clickedArrow.classList.contains("fa-angle-down")) {
						clickedArrow.classList.remove("fa-angle-down");
						clickedArrow.classList.add("fa-angle-up");
					} else {
						clickedArrow.classList.remove("fa-angle-up");
						clickedArrow.classList.add("fa-angle-down");
					}

					const clickedContainer = e.target.parentElement.parentElement;
					const answer = clickedContainer.querySelector(
						".faq__container-answer"
					);
					answer.classList.toggle("faq__container-answer--active");
				});
			});
	};

	const url = makeShortUrl();
	changeNavFocus(url);
	burgerBtn.addEventListener("click", handleNav);
	window.addEventListener("scroll", scrollSpy);
	showAnswer();
});
