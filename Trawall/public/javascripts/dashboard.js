var socket = io();
var userId = $('body').attr('id');
var username = $('body').attr('username');

// get all posts when load the page
$(function () {
        $.ajax({
                type: "GET",
                url: `/api/post/0/10`,
                contentType: "application/x-www-form-urlencoded",
                success: function (data) {
                        for (let i = 0; i < data.posts.rows.length; i++) {
                                $("#posts-list").append(`
                                        <div class="row post-row">
                                                <div class="container">
                                                        <div class="col-xs-1">
                                                                <a href='#'><img class='profile-pic' src="../images/3.jpeg" /></a>
                                                        </div>
                                                        <div id="${data.posts.rows[i].id}" class="col-xs-5 content-container paper">
                                                                <span class="post-username">${data.posts.rows[i].username}</span>
                                                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.posts.rows[i].location}</span>
                                                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                                                <div class="post-content">${data.posts.rows[i].content}</div>
                                                                <div class="post-tags">${data.posts.rows[i].tags}</div>
                                                                <div class="like-and-comment-row">
                                                                        <span class="number-likes">46 likes</span>
                                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                                        <i class="fa fa-comment" aria-hidden="true"></i>
                                                                </div>
                                                        </div>
                                                </div>         
                                        </div>
                                `);
                                // TODO: Change tags to an NoSQL array
                                // for (var j = 0; j < data.posts.rows[i].tags.length; j++) {
                                // $("#" + data.posts.rows[i].id + ".post-tags ").append("#" + data.posts.rows[i].tags + " ");
                                // }
                        }
                }
        });
});

// header animation
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

// click header modal
$(function () {
        // show text post dialogue
        $(".navbar-right").on('click', '#textPostBtn', function (e) {
                $('.modal-content').html(`
                        <div id="location-area"><textarea type='text' id='modal-location-area' placeholder='Where are you'></textarea></div>
                        <div id="tag-area"><textarea type='text' id='modal-tag-area' placeholder='Tag'></textarea></div>
                        <hr/>
                        <div id="content"><textarea type='text' id='modal-text-area' placeholder='Your text here'></textarea></div>
                        <hr/>
                        <div id="post-btn-container"><button id='text-post-btn' class='post-btn'>Post</button></div>
                        `);
                $('#myModal').css({ "display": "block" });
        });

        // click on post button for text content
        $('.modal-content').on('click', '#text-post-btn', function () {
                $.ajax({
                        type: "POST",
                        url: `/api/post/new`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                content: $('#modal-text-area').val(),
                                location: $('#modal-location-area').val(),
                                tags: $('#modal-tag-area').val()
                        }
                });
        });

        // show update profile dialogue
        // TODO: add uploading profilePic option
        $(".navbar-right").on('click', '#profileBtn', function (e) {
                $('.modal-content').html(`
                        <div id=‘update-username-area’><textarea type='text' id='modal-update-username' placeholder='Username'></textarea></div>
                        <div id="post-btn-container"><button id='update-profile-btn' class='post-btn'>Update</button></div>
                `);
                $('#myModal').css({ "display": "block" });
        });

        // click on update button for text content
        $('.modal-content').on('click', '#update-profile-btn', function () {
                $.ajax({
                        type: "POST",
                        url: `/api/user/username/update`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                id: $('body').attr('id'),
                                username: $('#modal-update-username').val(),
                        },
                        success: function (data) {
                                $('#myModal').hide();
                        }
                });
        });



        // close the modal
        $('#myModal').on('click', function (e) {
                let node = e.target;
                while (node != null) {
                        if (node.className === 'modal-content')
                                return false;
                        node = node.parentNode;
                }
                $('#myModal').hide();
        });

        // delete a post
        $('#posts-list').on('click', '.delete-post-btn', function (e) {
                let postId = e.target.parentNode.parentNode.getAttribute('id');
                $.ajax({
                        type: "DELETE",
                        url: `/api/post/delete/${postId}`,
                        success: function (data) {

                        }
                });
        });
});

// user likes/unlikes a post
$(function () {
        // like a post
        $('#posts-list').on('click', '.fa-heart', function (e) {
                let postId = e.target.parentNode.parentNode.getAttribute('id');
                if (!$(`#${postId}`).find('.fa-heart').hasClass('liked')) {
                        $.ajax({
                                type: "POST",
                                url: `/api/${userId}/like/${postId}`,
                                success: function (data) {
                                        $(`#${postId}`).find('.fa-heart').addClass('liked');
                                }
                        });
                } else {
                        $.ajax({
                                type: "POST",
                                url: `/api/${userId}/unlike/${postId}`,
                                success: function (data) {
                                        $(`#${postId}`).find('.fa-heart').removeClass('liked');
                                }
                        });
                }
        });
});







// socket response
socket.on('NewPost', function (data) {
        $("#posts-list").append(`
                <div class="row post-row">
                        <div class="container">
                                <div class="col-xs-1">
                                        <a href='#'><img class='profile-pic' src="../images/3.jpeg" /></a>
                                </div>
                                <div id="${data.rows[0].id}" class="col-xs-5 content-container paper">
                                        <span class="post-username">${data.rows[0].username}</span>
                                        <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                        <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                        <div class="post-content">${data.rows[0].content}</div>
                                        <div class="post-tags">${data.rows[0].tags}</div>
                                        <div class="like-and-comment-row">
                                                <span class="number-likes">46 likes</span>
                                                <i class="fa fa-heart" aria-hidden="true"></i>
                                                <i class="fa fa-comment" aria-hidden="true"></i>
                                        </div>
                                </div>
                        </div>
                </div>
        `);
        $('#myModal').hide();
});

socket.on('DeletePost', function (data) {
        $(`#${data.rows[0].id}`).parent().parent().remove();
});