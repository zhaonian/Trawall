$(function () {
        $.ajax({
                type: "GET",
                url: `/api/post/0/3`,
                contentType: "application/x-www-form-urlencoded",
                success: function (data) {
                        console.log(data);
                        for (var i = 0; i < data.posts.rows.length; i++) {
                           $("#posts-list").append(`
                                        <div class="row post-row">
                                                <div class="container">
                                                        <div class="col-xs-1">
                                                                <a href='#'><img class='profile-pic' src="../images/3.jpeg" /></a>
                                                        </div>
                                                        <div class="col-xs-5 content-container paper">
                                                                <span class="post-username">${data.posts.rows[i].username}</span>
                                                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.posts.rows[i].location}</span>
                                                                <div class="post-content">${data.posts.rows[i].content}</div>
                                                                <div id="${data.posts.rows[i].id}" class="post-tags"></div>
                                                                <div class="like-and-comment-row">
                                                                        <span class="number-likes">46 likes</span>
                                                                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                                                                        <i class="fa fa-comment-o" aria-hidden="true"></i>
                                                                </div>
                                                        </div>
                                                </div>         
                                        </div>
                                `);
                                for (var j = 0; j < data.posts.rows[i].tags.length; j++) {
                                        $(".post-tags" + "#" + data.posts.rows[i].id).append("#" + data.posts.rows[i].tags[j] + " ");
                                }
                        }     
                }
        });
});

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