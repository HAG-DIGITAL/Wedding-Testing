document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENT HTML
    // =====================================================
    const loadingScreen = document.getElementById("loadingScreen");
    const cover = document.getElementById("cover");
    const openInvitation = document.getElementById("openInvitation");
    const mainContent = document.getElementById("mainContent");

    const guestName = document.getElementById("guestName");

    const bgMusic = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicButton");

        // ======================================================
    // COVER CONTENT MUNCUL SETELAH 15 DETIK
    // ======================================================
    window.setTimeout(() => {
        document.body.classList.add("cover-ready");
    }, 12500);

    const saveDate = document.getElementById("saveDate");

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.querySelector(".close-lightbox");


    // =====================================================
    // LOADING SCREEN
    // =====================================================
    if (loadingScreen) {

        setTimeout(() => {

            loadingScreen.classList.add("loaded");

            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 500);

        }, 300);

    }


    // =====================================================
    // KUNCI SCROLL SEBELUM UNDANGAN DIBUKA
    // =====================================================
    document.body.classList.add("lock-scroll");


    // =====================================================
    // NAMA TAMU DARI URL
    // Contoh:
    // index.html?to=Budi%20Santoso
    // =====================================================
    if (guestName) {

        const params = new URLSearchParams(window.location.search);
        const guest = params.get("to");

        if (guest && guest.trim() !== "") {

            guestName.textContent = guest.trim();

        } else {

            guestName.textContent = "Bapak / Ibu / Saudara(i)";

        }

    }


    // =====================================================
    // BUKA UNDANGAN
    // =====================================================
    if (openInvitation && cover && mainContent) {

        openInvitation.addEventListener("click", () => {

            if (openInvitation.disabled) return;

            openInvitation.disabled = true;


            // Tampilkan konten utama
            mainContent.classList.remove("hidden");

            // Jalankan animasi
            requestAnimationFrame(() => {

                mainContent.classList.add("is-visible");
                cover.classList.add("is-closing");

            });


            // Aktifkan scroll
            document.body.classList.remove("lock-scroll");


            // =================================================
            // MULAI MUSIK
            // Karena dipanggil setelah klik user,
            // browser mengizinkan play()
            // =================================================
            if (bgMusic) {

                bgMusic.play().catch(() => {

                    // Jika browser menolak,
                    // user masih bisa menyalakan musik
                    // melalui tombol musik.

                });

            }


            // Hilangkan cover setelah animasi
            setTimeout(() => {

                cover.style.display = "none";

            }, 1200);

        });

    }


    // =====================================================
    // SAVE THE DATE
    // 30 APRIL 2027
    // =====================================================
    if (saveDate) {

        saveDate.addEventListener("click", () => {

            const title =
                "Pernikahan Utari & Fajar";

            const location =
                "MISAL GEDUNG SERBAGUNA TANGERANG";

            const details =
                "Kami mengundang Anda untuk menghadiri pernikahan Utari & Fajar.";

            // 30 April 2027
            // 09.00 WIB = 02.00 UTC
            const start =
                "20270430T020000Z";

            // 12.00 WIB = 05.00 UTC
            const end =
                "20270430T050000Z";


            const calendarURL =
                "https://calendar.google.com/calendar/render" +
                "?action=TEMPLATE" +
                `&text=${encodeURIComponent(title)}` +
                `&dates=${start}/${end}` +
                `&details=${encodeURIComponent(details)}` +
                `&location=${encodeURIComponent(location)}`;


            window.open(
                calendarURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


document.addEventListener("DOMContentLoaded", () => {

    // kode-kode lu yang lain...


    // =====================================================
    // GALLERY LIGHTBOX + ZOOM
    // =====================================================

    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.querySelector(".close-lightbox");

    const galleryImages = document.querySelectorAll(".gallery-item img");


    // Klik foto gallery
    galleryImages.forEach((image) => {

        image.addEventListener("click", () => {

            lightboxImage.src =
                image.currentSrc || image.src;

            lightboxImage.alt =
                image.alt || "Foto Gallery";

            lightbox.classList.add("show");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add("lock-scroll");

        });

    });


    // Klik foto untuk zoom
    lightboxImage.addEventListener("click", (e) => {

        e.stopPropagation();

        lightboxImage.classList.toggle("zoomed");

    });


    // Fungsi close
    const closeGallery = () => {

        lightbox.classList.remove("show");

        lightboxImage.classList.remove("zoomed");

        lightboxImage.src = "";

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove("lock-scroll");

    };


    // Klik X
    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeGallery
        );

    }


    // Klik background hitam
    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            closeGallery();

        }

    });


    // ESC
    document.addEventListener("keydown", (e) => {

        if (
            e.key === "Escape" &&
            lightbox.classList.contains("show")
        ) {

            closeGallery();

        }

    });


    // =====================================================
    // KODE LAIN LU
    // =====================================================

});

    // =====================================================
    // ANIMASI SAAT SCROLL
    // =====================================================
    const animatedElements =
        document.querySelectorAll(
            "h1, h2, h3, h4, p, span, small, " +
            ".gallery-item img, " +
            ".btn-primary, " +
            ".btn-open"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "show"
                            );

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        animatedElements.forEach((element) => {

            // Jangan animasikan isi cover
            if (
                element.closest(".cover") ||
                element.closest(".loading-screen")
            ) {

                return;

            }


            if (
                element.tagName === "IMG"
            ) {

                element.classList.add(
                    "animate-up"
                );

            }
            else if (
                element.classList.contains(
                    "btn-primary"
                ) ||
                element.classList.contains(
                    "btn-open"
                )
            ) {

                element.classList.add(
                    "animate-right"
                );

            }
            else {

                element.classList.add(
                    "animate-left"
                );

            }


            observer.observe(element);

        });

    }


    // =====================================================
    // MUSIK
    // =====================================================
    if (musicButton && bgMusic) {

        musicButton.addEventListener(
            "click",
            () => {

                if (bgMusic.paused) {

                    bgMusic.play()
                        .then(() => {

                            musicButton.textContent =
                                "🎵";

                        })
                        .catch(() => {

                            musicButton.textContent =
                                "🔇";

                        });

                }
                else {

                    bgMusic.pause();

                    musicButton.textContent =
                        "🔇";

                }

            }
        );


        // Saat musik dimainkan
        bgMusic.addEventListener(
            "play",
            () => {

                musicButton.textContent =
                    "🎵";

            }
        );


        // Saat musik berhenti
        bgMusic.addEventListener(
            "pause",
            () => {

                musicButton.textContent =
                    "🔇";

            }
        );

    }

});