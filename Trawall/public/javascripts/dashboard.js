$(function () {
        $("#home").on({
                mouseenter: function () {
                        $('#home').fadeOut('fast', function () {
                                $('#text-home').fadeIn('fast', function () {
                                        $('#text-home').fadeOut(function () {
                                                $('#home').fadeIn('fast');
                                        });
                                });
                        });
                }
        });

        $("#message").on({
                mouseenter: function () {
                        $('#message').fadeOut('fast', function () {
                                $('#text-message').fadeIn('fast', function () {
                                        $('#text-message').fadeOut(function () {
                                                $('#message').fadeIn('fast');
                                        });
                                });
                        });
                }
        });

        $("#text-post").on({
                mouseenter: function () {
                        $('#text-post').fadeOut('fast', function () {
                                $('#text-text-post').fadeIn('fast', function () {
                                        $('#text-text-post').fadeOut(function () {
                                                $('#text-post').fadeIn('fast');
                                        });
                                });
                        });
                }
        });

        $("#pic-post").on({
                mouseenter: function () {
                        $('#pic-post').fadeOut('fast', function () {
                                $('#text-pic-post').fadeIn('fast', function () {
                                        $('#text-pic-post').fadeOut(function () {
                                                $('#pic-post').fadeIn('fast');
                                        });
                                });
                        });
                }
        });

        $("#vid-post").on({
                mouseenter: function () {
                        $('#vid-post').fadeOut('fast', function () {
                                $('#text-vid-post').fadeIn('fast', function () {
                                        $('#text-vid-post').fadeOut(function () {
                                                $('#vid-post').fadeIn('fast');
                                        });
                                });
                        });
                }
        });

        $("#my-profile").on({
                mouseenter: function () {
                        $('#my-profile').fadeOut('fast', function () {
                                $('#text-my-profile').fadeIn('fast', function () {
                                        $('#text-my-profile').fadeOut(function () {
                                                $('#my-profile').fadeIn('fast');
                                        });
                                });
                        });
                }
        });
});