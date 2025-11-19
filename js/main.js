(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 90) {
            $('.nav-bar').addClass('fixed-top').css('padding', '0');
        } else {
            $('.nav-bar').removeClass('fixed-top').css('padding', '0px 90px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Package modal (Read More buttons) - fills and shows the package modal
    $(document).on('click', '.read-more-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var features = $btn.data('features') || '';
        var desc = $btn.data('desc') || '';
        var image = $btn.data('image') || $('#packageModalImage').attr('src');

        $('#packageModalTitle').text(title);
        $('#packageModalFeatures').html('<strong>Includes:</strong> ' + features);
        $('#packageModalDesc').text(desc);
        $('#packageModalImage').attr('src', image).attr('alt', title + ' image');

        var bsModalEl = document.getElementById('packageModal');
        if (bsModalEl) {
            var bsModal = new bootstrap.Modal(bsModalEl);
            bsModal.show();
        }
    });

    // Product modal (Read More buttons) - fills and shows the product modal
    $(document).on('click', '.read-more-product-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var features = $btn.data('features') || '';
        var desc = $btn.data('desc') || '';
        var icon = $btn.data('icon') || 'fa-info';

        $('#productModalTitle').text(title);
        $('#productModalFeatures').html('<strong>Key Features:</strong> ' + features);
        $('#productModalDesc').text(desc);
        $('#productModalIcon').attr('class', 'fa ' + icon + ' fa-4x text-secondary');

        var bsModalEl = document.getElementById('productModal');
        if (bsModalEl) {
            var bsModal = new bootstrap.Modal(bsModalEl);
            bsModal.show();
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Donation progress
    $('.donation-item .donation-progress').waypoint(function () {
        $('.donation-item .progress .progress-bar').each(function () {
            $(this).css("height", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    // Dynamic copyright year
    $(document).ready(function () {
        var currentYear = new Date().getFullYear();
        $('#currentYear').text(currentYear);
    });

    
})(jQuery);

