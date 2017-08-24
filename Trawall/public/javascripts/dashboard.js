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
                                                <div class="col-xs-1">
                                                        <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                                                </div>
                                                <div id="${data.posts.rows[i].id}" class="col-xs-offset-1 col-xs-10 content-container">
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
                $('#posts-list').prepend(`
                        <div class="row post-row">
                                <div class="container">
                                        <div class="col-xs-1">
                                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                                        </div>
                                        <div id="" class="col-xs-5 content-container">
                                                <div id="location-area"><textarea type='text' id='modal-location-area' placeholder='Where are you'></textarea></div>
                                                <div id="tag-area"><textarea type='text' id='modal-tag-area' placeholder='Tag'></textarea></div>
                                                <hr/>
                                                <div id="content"><textarea type='text' id='modal-text-area' placeholder='Your text here'></textarea></div>
                                                <hr/>
                                                <div id="post-btn-container"><button id='text-post-btn' class='post-btn'>Post</button></div>
                                        </div>
                                </div>
                        </div>`
                );
        });

        $('#posts-list').on('click', '#text-post-btn', function () {
                $.ajax({
                        type: "POST",
                        url: `/api/post/new`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                username: username,
                                content: $('#modal-text-area').val(),
                                location: $('#modal-location-area').val(),
                                tags: $('#modal-tag-area').val()
                        }
                });
        });

        // show picture post doialogue
        $(".navbar-right").on('click', '#imagePostBtn', function (e) {
                $('#posts-list').prepend(`
                        <div class="row post-row">
                                <div class="container">
                                        <div class="col-xs-1">
                                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                                        </div>
                                        <div class="col-xs-5 content-container">
                                                <form method="POST" action="/api/post/imgPost" enctype="multipart/form-data" >
                                                        <input type="hidden" name="username" value=${username}>
                                                        <div id="location-area"><textarea type='text' id='modal-location-area' name='location' placeholder='Where are you'></textarea></div>
                                                        <div id="tag-area"><textarea type='text' id='modal-tag-area' name='tags' placeholder='Tag'></textarea></div>
                                                        <hr/>
                                                        <div id="content"><textarea type='text' id='modal-text-area' name='content' placeholder='Your text here'></textarea></div>
                                                        <input id='file-upload' type="file" name="imagePost">
                                                        <input id='image-post-submit' class='post-btn' type="submit" value="Post">
                                                </form>
                                        </div>
                                </div>
                        </div>`
                );
        });

        // show video post doialogue
        $(".navbar-right").on('click', '#videoPostBtn', function (e) {
                $('#posts-list').prepend(`
                        <div class="row post-row">
                                <div class="container">
                                        <div class="col-xs-1">
                                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                                        </div>
                                        <div class="col-xs-5 content-container">
                                                <form method="POST" action="/api/post/vidPost" enctype="multipart/form-data" >
                                                        <input type="hidden" name="username" value=${username}>
                                                        <div id="location-area"><textarea type='text' id='modal-location-area' name='location' placeholder='Where are you'></textarea></div>
                                                        <div id="tag-area"><textarea type='text' id='modal-tag-area' name='tags' placeholder='Tag'></textarea></div>
                                                        <hr/>
                                                        <div id="content"><textarea type='text' id='modal-text-area' name='content' placeholder='Your text here'></textarea></div>
                                                        <input id='file-upload' type="file" name="videoPost">
                                                        <input id='image-post-submit' class='post-btn' type="submit" value="Post">
                                                </form>
                                        </div>
                                </div>
                        </div>`
                );
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

        // click on update button for profile update
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


// // chat box
// $(function() {
//         // message chat-box
//         $(".navbar-right").on('click', '#messageBtn', function (e) {
//                 $('.modal-content').html(`
//                         <div id="location-area"><textarea type='text' id='modal-location-area' placeholder='Whom to send'></textarea></div>
//                         <hr/>
//                         <div id="content"><textarea type='text' id='modal-text-area' placeholder='message...'></textarea></div>
//                         <hr/>
//                         <div id="post-btn-container"><button id='message-sent-btn' class='post-btn'>Send</button></div>
//                         `);
//                 $('#myModal').css({ "display": "block" });
//         });
        
//         // message chat-box on-send
//         $('.modal-content').on('click', '#message-sent-btn', function () {
//                 $.ajax({
//                         type: "POST",
//                         url: `/api/` + username + `/message/` + $('#modal-location-area').val(),
//                         contentType: "application/x-www-form-urlencoded",
//                         data: {
//                                 message: $('#modal-text-area').val()
//                         },
//                         success: function() {
//                                 $('#myModal').css({ "display": "none" });
//                         },
//                         error: function(XMLHttpRequest, textStatus, errorThrown) { 
//                                 alert("User " + $('#modal-location-area').val() + " doesn't exist.");
//                         } 
//                 });
//         });
// });



// socket response
socket.on('NewPost', function (data) {
        $("#posts-list").append(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
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
        `);
        $('#posts-list').find('div').first().remove();
});

socket.on('DeletePost', function (data) {
        $(`#${data.rows[0].id}`).parent().remove();
});

socket.on('NewImgPost', function (data) {
        $("#posts-list").append(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
                                <span class="post-username">${data.rows[0].username}</span>
                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                <div class="post-content">${data.rows[0].content}</div>
                                <div class="post-tags">${data.rows[0].tags}</div>
                                <img class="post-img" src='${data.rows[0].filepath}' />
                                <div class="like-and-comment-row">
                                        <span class="number-likes">46 likes</span>
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                        <i class="fa fa-comment" aria-hidden="true"></i>
                                </div>
                        </div>
                </div>
        `);
        $('#posts-list').find('div').first().remove();
});

socket.on('NewVidPost', function (data) {
        $("#posts-list").append(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
                                <span class="post-username">${data.rows[0].username}</span>
                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                <div class="post-content">${data.rows[0].content}</div>
                                <div class="post-tags">${data.rows[0].tags}</div>
                                <img class="post-img" src='${data.rows[0].filepath}' />
                                <video class="post-vid" controls loop autoplay>
                                        <source src="${data.rows[0].filepath}" type="video/mp4">
                                </video>
                                <div class="like-and-comment-row">
                                        <span class="number-likes">46 likes</span>
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                        <i class="fa fa-comment" aria-hidden="true"></i>
                                </div>
                        </div>
                </div>
        `);
        $('#posts-list').find('div').first().remove();
});


// // notification.
// function notify(queue) {
//         if (!("Notification" in window)) {
//                 alert("This browser does not support system notifications");
//         } else if (Notification.permission === "granted") {
//                 for (var i = 0; i < queue.length; i ++)
//                         new Notification(queue[i]);
//         } else if (Notification.permission !== 'denied') {
//                 Notification.requestPermission(function (permission) {
//                         // If the user accepts, let's create a notification
//                       if (permission === "granted") {
//                                 notify(queue);
//                       }
//                 });
//         }
// }

// // message polling.
// function poll_messages() {
//         $.ajax({
//                 type: "GET",
//                 url: `/api/${userId}/message`,
//                 contentType: "json",
//                 success: function (data) {
//                         notify(data.messages);
//                 },
//                 error: function(XMLHttpRequest, textStatus, errorThrown) { 
//                         console.log(errorThrown);
//                 } 
//         });
//         setTimeout(poll_messages, 5000);
// }

// poll_messages();