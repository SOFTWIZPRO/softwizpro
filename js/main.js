(function ($) {
    "use strict";

    // ===== Modern Toast Notification System =====
    function showToast(title, message, type = 'success', duration = 4000) {
        // Create toast container if it doesn't exist
        if (!$('.toast-container').length) {
            $('body').append('<div class="toast-container"></div>');
        }

        const toastId = 'toast-' + Date.now();
        const icons = {
            'success': '✓',
            'error': '✕',
            'info': 'ℹ',
            'warning': '⚠'
        };

        const toast = $(`
            <div class="modern-toast ${type}" id="${toastId}">
                <div class="toast-icon">${icons[type] || icons.info}</div>
                <div class="toast-content">
                    <div class="toast-title">${title}</div>
                    <p class="toast-message">${message}</p>
                </div>
                <button class="toast-close" onclick="$('#${toastId}').fadeOut(300, function() { $(this).remove(); })">&times;</button>
                <div class="toast-progress"></div>
            </div>
        `);

        $('.toast-container').append(toast);

        // Show toast
        setTimeout(() => {
            toast.addClass('show');
        }, 10);

        // Auto-remove after duration
        setTimeout(() => {
            toast.fadeOut(300, function () {
                $(this).remove();
            });
        }, duration);

        return toast;
    }

    // Expose toast function globally
    window.showToast = showToast;

    // ===== Success Modal Overlay =====
    function showSuccessModal(title = 'Success!', message = 'Your message has been sent successfully.', onClose = null) {
        // Create modal if it doesn't exist
        if (!$('.success-modal-overlay').length) {
            $('body').append(`
                <div class="success-modal-overlay">
                    <div class="success-modal-content">
                        <div class="success-checkmark">✓</div>
                        <h2></h2>
                        <p></p>
                        <button class="btn btn-primary close-success-modal">Close</button>
                    </div>
                </div>
            `);

            // Close button handler
            $(document).on('click', '.close-success-modal', function () {
                closeSuccessModal();
            });

            // Click outside to close
            $(document).on('click', '.success-modal-overlay', function (e) {
                if (e.target === this) {
                    closeSuccessModal();
                }
            });

            // Close on Escape key
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeSuccessModal();
                }
            });
        }

        // Set content
        $('.success-modal-content h2').text(title);
        $('.success-modal-content p').text(message);

        // Show modal
        const modal = $('.success-modal-overlay');
        modal.addClass('show');

        // Auto-close after 5 seconds
        setTimeout(() => {
            closeSuccessModal();
            if (onClose) onClose();
        }, 5000);
    }

    function closeSuccessModal() {
        const modal = $('.success-modal-overlay');
        modal.removeClass('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }

    window.showSuccessModal = showSuccessModal;
    window.closeSuccessModal = closeSuccessModal;

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
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
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

    // Product Read More Modal (Products.html page)
    $(document).on('click', '.read-more-product-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var desc = $btn.data('desc') || '';
        var features = $btn.data('features') || '';
        var icon = $btn.data('icon') || 'fa-shopping-cart';

        // Create product modal if it doesn't exist
        if (!$('#readMoreProductModal').length) {
            $('body').append(`
                <div class="service-detail-modal" id="readMoreProductModal">
                    <div class="service-detail-content">
                        <button class="service-detail-close">&times;</button>
                        <div class="service-detail-body">
                            <div class="text-center mb-4">
                                <div class="btn-square bg-light d-inline-block mb-3">
                                    <i class="fa ${icon} fa-4x text-secondary"></i>
                                </div>
                            </div>
                            <h1 id="readMoreTitle"></h1>
                            <p id="readMoreDesc" class="service-detail-description"></p>
                            
                            <div class="service-benefits-section">
                                <h3>Key Features</h3>
                                <ul id="readMoreFeatures" class="benefits-list"></ul>
                            </div>
                            
                            <div class="service-cta">
                                <a href="get-started.html" class="btn btn-success btn-lg">Get Started</a>
                                <a href="contact.html" class="btn btn-outline-success btn-lg">Contact Sales</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Close button
            $(document).on('click', '#readMoreProductModal .service-detail-close', function () {
                $('#readMoreProductModal').removeClass('show');
                $('body').css('overflow', 'auto');
                setTimeout(() => {
                    $('#readMoreProductModal').remove();
                }, 300);
            });

            // Click outside to close
            $(document).on('click', '#readMoreProductModal', function (e) {
                if (e.target.id === 'readMoreProductModal') {
                    $(this).removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $(this).remove();
                    }, 300);
                }
            });

            // Close on Escape
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape' && $('#readMoreProductModal').length) {
                    $('#readMoreProductModal').removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $('#readMoreProductModal').remove();
                    }, 300);
                }
            });
        }

        // Set content
        $('#readMoreTitle').text(title);
        $('#readMoreDesc').text(desc);

        // Features
        var featuresList = '';
        features.split(',').forEach(function (feature) {
            feature = $.trim(feature);
            if (feature) {
                featuresList += '<li><i class="fa fa-check text-success me-2"></i>' + feature + '</li>';
            }
        });
        $('#readMoreFeatures').html(featuresList || '<li>Contact us for more details</li>');

        // Show modal
        var modal = $('#readMoreProductModal');
        modal.addClass('show');
        $('body').css('overflow', 'hidden');

        // Scroll to top
        $(window).scrollTop(0);
    });

    // Service Detail Modal (Read More buttons on services section)
    $(document).on('click', '.service-read-more-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var desc = $btn.data('desc') || '';
        var benefits = $btn.data('benefits') || '';

        // Create service detail modal if it doesn't exist
        if (!$('#serviceDetailModal').length) {
            $('body').append(`
                <div class="service-detail-modal" id="serviceDetailModal">
                    <div class="service-detail-content">
                        <button class="service-detail-close">&times;</button>
                        <div class="service-detail-body">
                            <h1 id="svcDetailTitle"></h1>
                            <p id="svcDetailDesc" class="service-detail-description"></p>
                            
                            <div class="service-benefits-section">
                                <h3>Key Features & Benefits</h3>
                                <ul id="svcDetailBenefits" class="benefits-list"></ul>
                            </div>
                            
                            <div class="service-cta">
                                <a href="contact.html" class="btn btn-success btn-lg">Get Started</a>
                                <a href="contact.html" class="btn btn-outline-success btn-lg">View Packages</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Close button
            $(document).on('click', '#serviceDetailModal .service-detail-close', function () {
                $('#serviceDetailModal').removeClass('show');
                $('body').css('overflow', 'auto');
                setTimeout(() => {
                    $('#serviceDetailModal').remove();
                }, 300);
            });

            // Click outside to close
            $(document).on('click', '#serviceDetailModal', function (e) {
                if (e.target.id === 'serviceDetailModal') {
                    $(this).removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $(this).remove();
                    }, 300);
                }
            });

            // Close on Escape
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape' && $('#serviceDetailModal').length) {
                    $('#serviceDetailModal').removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $('#serviceDetailModal').remove();
                    }, 300);
                }
            });
        }

        // Set content
        $('#svcDetailTitle').text(title);
        $('#svcDetailDesc').text(desc);

        // Benefits
        var benefitsList = '';
        benefits.split('|').forEach(function (benefit) {
            benefit = $.trim(benefit);
            if (benefit) {
                benefitsList += '<li><i class="fa fa-check text-success me-2"></i>' + benefit + '</li>';
            }
        });
        $('#svcDetailBenefits').html(benefitsList || '<li>Contact us for more details</li>');

        // Show modal
        var modal = $('#serviceDetailModal');
        modal.addClass('show');
        $('body').css('overflow', 'hidden');

        // Scroll to top
        $(window).scrollTop(0);
    });

    // Package Detail Modal (Read More buttons on packages section)
    $(document).on('click', '.package-read-more-btn, .read-more-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var desc = $btn.data('desc') || '';
        var target = $btn.data('target') || '';
        var features = $btn.data('features') || '';
        var image = $btn.data('image') || 'img/package-default.png';

        // Create package detail modal if it doesn't exist
        if (!$('#packageDetailFullModal').length) {
            $('body').append(`
                <div class="package-detail-modal" id="packageDetailFullModal">
                    <div class="package-detail-content">
                        <button class="package-detail-close">&times;</button>
                        <div class="package-detail-header">
                            <img id="pkgDetailImage" src="" alt="" class="package-detail-image">
                            <div class="package-detail-info">
                                <h1 id="pkgDetailTitle"></h1>
                                <p id="pkgDetailDesc" class="package-detail-description"></p>
                            </div>
                        </div>
                        
                        <div class="package-detail-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="package-section">
                                        <h3><i class="fa fa-bullseye text-warning me-2"></i>Ideal For</h3>
                                        <p id="pkgDetailTarget"></p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="package-section">
                                        <h3><i class="fa fa-star text-success me-2"></i>Key Features</h3>
                                        <ul id="pkgDetailFeatures" class="features-list"></ul>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="package-benefits">
                                <h3><i class="fa fa-check-circle text-success me-2"></i>What You'll Get</h3>
                                <div id="pkgDetailBenefits" class="benefits-grid"></div>
                            </div>
                            
                        <div class="package-cta">
                                <a href="get-started.html" class="btn btn-success btn-lg">Get Started Today</a>
                                <a href="contact.html" class="btn btn-outline-success btn-lg">Contact Sales</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Close button
            $(document).on('click', '#packageDetailFullModal .package-detail-close', function () {
                $('#packageDetailFullModal').removeClass('show');
                $('body').css('overflow', 'auto');
                setTimeout(() => {
                    $('#packageDetailFullModal').remove();
                }, 300);
            });

            // Click outside to close
            $(document).on('click', '#packageDetailFullModal', function (e) {
                if (e.target.id === 'packageDetailFullModal') {
                    $(this).removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $(this).remove();
                    }, 300);
                }
            });

            // Close on Escape
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape' && $('#packageDetailFullModal').length) {
                    $('#packageDetailFullModal').removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $('#packageDetailFullModal').remove();
                    }, 300);
                }
            });
        }

        // Define package details
        var packageData = {
            'Lite Package': {
                target: 'Perfect for small businesses and startups. Get started fast with essential features - make sales, manage orders, track inventory, manage customers and suppliers, and generate comprehensive reports with single user access.',
                benefits: [
                    { icon: 'fa-cash-register', title: 'Sales & Orders', desc: 'Make sales and receive orders easily' },
                    { icon: 'fa-cube', title: 'Inventory Management', desc: 'Add and remove items from inventory' },
                    { icon: 'fa-users', title: 'Customer Management', desc: 'Manage customers and suppliers' },
                    { icon: 'fa-user', title: 'Single User', desc: 'Single user access account' },
                    { icon: 'fa-chart-bar', title: 'Sales Reports', desc: 'Generate total and periodic sales reports' },
                    { icon: 'fa-file-lines', title: 'Detailed Reports', desc: 'Reports for items and customers' }
                ],
                pricing: ''
            },
            'Advanced Package': {
                target: 'Perfect for growing businesses with multiple departments and 2-5 locations. Includes production management, full accounting, accounts payable, multi-user access, profit & loss reports, and advanced analytics.',
                benefits: [
                    { icon: 'fa-boxes-stacked', title: 'Sales & Orders', desc: 'Complete sales and order management' },
                    { icon: 'fa-cube', title: 'Inventory Management', desc: 'Add, remove, and track items efficiently' },
                    { icon: 'fa-users', title: 'Multi-User Access', desc: 'Multiple team members can use the system' },
                    { icon: 'fa-industry', title: 'Production Management', desc: 'Manage production workflows and processes' },
                    { icon: 'fa-chart-line', title: 'Full Accounting', desc: 'Complete accounting capabilities and tracking' },
                    { icon: 'fa-receipt', title: 'Accounts Payable', desc: 'Track and manage vendor payments' },
                    { icon: 'fa-chart-pie', title: 'P&L Reports', desc: 'Detailed profit and loss statements' },
                    { icon: 'fa-analytics', title: 'Analytics', desc: 'Business intelligence and insights' }
                ],
                pricing: ''
            },
            'Pro Package': {
                target: 'Designed for established businesses with 5-20 locations. Includes everything in Advanced plus multi-store management, full accounting integration across stores, and priority support with dedicated assistance.',
                benefits: [
                    { icon: 'fa-store', title: 'All Advanced Features', desc: 'Everything from Advanced package included' },
                    { icon: 'fa-buildings', title: 'Multi-Store Management', desc: 'Manage multiple store locations seamlessly' },
                    { icon: 'fa-chart-line', title: 'Full Accounting', desc: 'Integrated accounting across all stores' },
                    { icon: 'fa-headset', title: 'Priority Support', desc: 'Dedicated support assistance available' },
                    { icon: 'fa-layer-group', title: 'Centralized Dashboard', desc: 'Control all stores from one place' },
                    { icon: 'fa-sync', title: 'Real-Time Sync', desc: 'Real-time data synchronization' },
                    { icon: 'fa-users-gear', title: 'Advanced Management', desc: 'Comprehensive management tools' },
                    { icon: 'fa-chart-bar', title: 'Multi-Store Reports', desc: 'Cross-store reporting and analytics' }
                ],
                pricing: ''
            },
            'Enterprise Package': {
                target: 'The complete solution for large enterprises with 20+ locations. Includes everything in Pro plus employee management system, Content Management System (CMS), loyalty points program, and dedicated implementation support.',
                benefits: [
                    { icon: 'fa-tasks-all', title: 'All Pro Features', desc: 'Everything from Pro package included' },
                    { icon: 'fa-people-group', title: 'Employee Management', desc: 'Complete workforce management system' },
                    { icon: 'fa-globe', title: 'CMS System', desc: 'Content Management System for your business' },
                    { icon: 'fa-gift', title: 'Loyalty Program', desc: 'Reward and retain customers effectively' },
                    { icon: 'fa-user-tie', title: 'Dedicated Support', desc: 'Dedicated account management team' },
                    { icon: 'fa-cogs', title: 'Custom Integrations', desc: 'Seamless integration with other systems' },
                    { icon: 'fa-lock', title: 'Advanced Security', desc: 'Enterprise-grade security features' },
                    { icon: 'fa-infinity', title: 'Unlimited Scale', desc: 'Handle unlimited transactions and users' }
                ],
                pricing: ''
            }
        };

        // Get the package data
        var pkgData = packageData[title] || {
            target: target,
            benefits: [
                { icon: 'fa-check', title: 'Feature', desc: 'Included' }
            ],
            pricing: '<p>Contact sales for pricing</p>'
        };

        // Set content
        $('#pkgDetailTitle').text(title);
        $('#pkgDetailImage').attr('src', image).attr('alt', title);
        $('#pkgDetailDesc').text(desc);
        $('#pkgDetailTarget').text(pkgData.target);

        // Features
        var featuresList = '';
        features.split('|').forEach(function (feature) {
            feature = $.trim(feature);
            if (feature) {
                featuresList += '<li><i class="fa fa-check text-success me-2"></i>' + feature + '</li>';
            }
        });
        $('#pkgDetailFeatures').html(featuresList || '<li>Contact sales for details</li>');

        // Benefits grid
        var benefitsHtml = '';
        pkgData.benefits.forEach(function (benefit) {
            benefitsHtml += `
                <div class="benefit-card">
                    <div class="benefit-icon">
                        <i class="fa ${benefit.icon} fa-2x" style="color: #ffc107;"></i>
                    </div>
                    <h4>${benefit.title}</h4>
                    <p>${benefit.desc}</p>
                </div>
            `;
        });
        $('#pkgDetailBenefits').html(benefitsHtml);

        // Show modal
        var modal = $('#packageDetailFullModal');
        modal.addClass('show');
        $('body').css('overflow', 'hidden');

        // Scroll to top
        modal.scrollTop(0);
        $(window).scrollTop(0);
    });




    // Product Detail Modal (Read More buttons on products section)
    $(document).on('click', '.product-read-more-btn', function () {
        var $btn = $(this);
        var title = $btn.data('title') || '';
        var desc = $btn.data('desc') || '';
        var features = $btn.data('features') || '';
        var image = $btn.data('image') || 'img/default-product.png';

        // Create product detail modal if it doesn't exist
        if (!$('#productDetailFullModal').length) {
            $('body').append(`
                <div class="product-detail-modal" id="productDetailFullModal">
                    <div class="product-detail-content">
                        <button class="product-detail-close">&times;</button>
                        
                        <div class="product-detail-hero">
                            <img id="prodDetailImage" src="" alt="" class="product-hero-image">
                            <div class="product-hero-overlay">
                                <h1 id="prodDetailTitle"></h1>
                            </div>
                        </div>
                        
                        <div class="product-detail-body">
                            <div class="product-description-section">
                                <h2>Product Overview</h2>
                                <p id="prodDetailDesc"></p>
                            </div>

                            <div class="product-features-section">
                                <h2>Key Capabilities</h2>
                                <div class="features-showcase">
                                    <div id="prodDetailFeatures" class="features-list"></div>
                                </div>
                            </div>

                            <div class="product-cta-section">
                                <a href="contact.html" class="btn btn-primary btn-lg">Request Demo</a>
                                <a href="contact.html" class="btn btn-outline-primary btn-lg">Learn More</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);

            // Close button
            $(document).on('click', '#productDetailFullModal .product-detail-close', function () {
                $('#productDetailFullModal').removeClass('show');
                $('body').css('overflow', 'auto');
                setTimeout(() => {
                    $('#productDetailFullModal').remove();
                }, 300);
            });

            // Click outside to close
            $(document).on('click', '#productDetailFullModal', function (e) {
                if (e.target.id === 'productDetailFullModal') {
                    $(this).removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $(this).remove();
                    }, 300);
                }
            });

            // Close on Escape
            $(document).on('keydown', function (e) {
                if (e.key === 'Escape' && $('#productDetailFullModal').length) {
                    $('#productDetailFullModal').removeClass('show');
                    $('body').css('overflow', 'auto');
                    setTimeout(() => {
                        $('#productDetailFullModal').remove();
                    }, 300);
                }
            });
        }

        // Set content
        $('#prodDetailTitle').text(title);
        $('#prodDetailImage').attr('src', image).attr('alt', title);
        $('#prodDetailDesc').text(desc);

        // Features
        var featuresList = '';
        features.split('|').forEach(function (feature) {
            feature = $.trim(feature);
            if (feature) {
                featuresList += `
                    <div class="feature-item">
                        <div class="feature-icon">
                            <i class="fa fa-check-circle text-success"></i>
                        </div>
                        <div class="feature-text">
                            <h5>${feature}</h5>
                        </div>
                    </div>
                `;
            }
        });
        $('#prodDetailFeatures').html(featuresList || '<p>Contact us for more details</p>');

        // Show modal
        var modal = $('#productDetailFullModal');
        modal.addClass('show');
        $('body').css('overflow', 'hidden');

        // Scroll to top
        modal.scrollTop(0);
        $(window).scrollTop(0);
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
    }, { offset: '80%' });


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'rotateOutUpRight',
        animateIn: 'rotateInDownLeft',
        items: 1,
        autoplay: true,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav: true,
        navText: [
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
        navText: [
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

