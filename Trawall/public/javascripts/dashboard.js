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
                                if (data.posts.rows[i].format === 1) {
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
                                                                <div class="post-tags"><span class='post-tags-text'>#${data.posts.rows[i].tags}</span></div>
                                                                <div class="like-and-comment-row">
                                                                        <span class="number-likes">0 likes</span>
                                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                                </div>
                                                        </div>
                                                </div>
                                        `);
                                } else if (data.posts.rows[i].format === 2) {
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
                                                                <div class="post-tags"><span class='post-tags-text'>#${data.posts.rows[i].tags}</span></div>
                                                                <img class="post-img" src='${data.posts.rows[i].filepath}' />
                                                                <div class="like-and-comment-row">
                                                                        <span class="number-likes">0 likes</span>
                                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                                </div>
                                                        </div>
                                                </div>
                                        `);
                                } else if (data.posts.rows[i].format === 3) {
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
                                                                <div class="post-tags"><span class='post-tags-text'>#${data.posts.rows[i].tags}</span></div>
                                                                <img class="post-img" src='${data.posts.rows[i].filepath}' />
                                                                <video class="post-vid" controls loop autoplay>
                                                                        <source src="${data.posts.rows[i].filepath}" type="video/mp4">
                                                                </video>
                                                                <div class="like-and-comment-row">
                                                                        <span class="number-likes">0 likes</span>
                                                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                                                </div>
                                                        </div>
                                                </div>
                                        `);
                                }
                        }
                }
        });

        // get all the likes
        $.ajax({
                type: "GET",
                url: `/api/like/${userId}`,
                success: function (data) {
                        for (let i = 0; i < data.likedPosts.rows.length; i++) {
                                $(`#${data.likedPosts.rows[i].postid} .like-and-comment-row`).find('i').addClass('liked');
                        }
                }
        });

        // get number of likes
        $.ajax({
                type: "GET",
                url: `/api/number/like`,
                success: function (data) {
                        for (let i = 0; i < data.likes.rows.length; i++) {
                                $(`#${data.likes.rows[i].postid} .like-and-comment-row`).find('span').html(data.likes.rows[i].counter + " likes");
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

        $('#posts-list').on('click', '#text-post-btn', function (e) {
                $.ajax({
                        type: "POST",
                        url: `/api/new/post`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                username: $('body').attr('username'),
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
                                                <form method="POST" action="/api/imgPost" enctype="multipart/form-data" >
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
                                                <form method="POST" action="/api/vidPost" enctype="multipart/form-data" >
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
        // $(".navbar-right").on('click', '#profileBtn', function (e) {
        //         $('.modal-content').html(`
        //                 <div id=‘update-username-area’><textarea type='text' id='modal-update-username' placeholder='Username'></textarea></div>
        //                 <div id="post-btn-container"><button id='update-profile-username-btn' class='post-btn'>Update name</button></div>
        //                 <br><br><br>
        //                 <form method="POST" action="/api/user/profilePic/update" enctype="multipart/form-data" >                        
        //                         <input id='file-upload' type="file" name="profilePic">
        //                         <div id="post-btn-container"><button id='update-profile-pic-btn' class='post-btn'>Update avatar</button></div>                        
        //                 </form>
        //         `);
        //         $('#myModal').css({ "display": "block" });
        // });



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
                        url: `/api/delete/post/${postId}`
                });
        });
});

// user likes/unlikes a post
$(function () {
        $('#posts-list').on('click', '.fa-heart', function (e) {
                let postId = e.target.parentNode.parentNode.getAttribute('id');
                // like a post
                if (!$(`#${postId}`).find('.fa-heart').hasClass('liked')) {
                        $.ajax({
                                type: "POST",
                                url: `/api/${userId}/like/${postId}`,
                                success: function (data) {
                                        $(`#${postId}`).find('.fa-heart').addClass('liked');
                                        let numberLikes = +($(`#${postId} .like-and-comment-row`).find('span').text().split(" ", 1));
                                        $(`#${postId} .like-and-comment-row`).find('span').html((numberLikes+1) + " likes");
                                }
                        });
                // unlike a post 
                } else {                       
                        $.ajax({
                                type: "POST",
                                url: `/api/${userId}/unlike/${postId}`,
                                success: function (data) {
                                        $(`#${postId}`).find('.fa-heart').removeClass('liked');
                                        let numberLikes = +($(`#${postId} .like-and-comment-row`).find('span').text().split(" ", 1));
                                        $(`#${postId} .like-and-comment-row`).find('span').html((numberLikes-1) + " likes");
                                }
                        });
                }
        });
});


// socket response
socket.on('NewPost', function (data) {
        $('#text-post-btn').parent().parent().parent().remove();
        $("#posts-list").prepend(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
                                <span class="post-username">${data.rows[0].username}</span>
                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                <div class="post-content">${data.rows[0].content}</div>
                                <div class="post-tags"><span class='post-tags-text'>#${data.rows[0].tags}</span></div>
                                <div class="like-and-comment-row">
                                        <span class="number-likes">0 likes</span>
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                </div>
                        </div>
                </div>
        `);
});

socket.on('DeletePost', function (data) {
        $(`#${data.rows[0].id}`).parent().remove();
});

socket.on('NewImgPost', function (data) {
        $('#image-post-submit').parent().parent().parent().parent().remove();
        $("#posts-list").prepend(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
                                <span class="post-username">${data.rows[0].username}</span>
                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                <div class="post-content">${data.rows[0].content}</div>
                                <div class="post-tags"><span class='post-tags-text'>#${data.posts.rows[0].tags}</span></div>
                                <img class="post-img" src='${data.rows[0].filepath}' />
                                <div class="like-and-comment-row">
                                        <span class="number-likes">0 likes</span>
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                </div>
                        </div>
                </div>
        `);
});

socket.on('NewVidPost', function (data) {
        $('#image-post-submit').parent().parent().parent().parent().remove();
        $("#posts-list").prepend(`
                <div class="row post-row">
                        <div class="col-xs-1">
                                <a href='#'><img class='profile-pic' src="../images/avatars/3.jpeg" /></a>
                        </div>
                        <div id="${data.rows[0].id}" class="col-xs-offset-1 col-xs-10 content-container">
                                <span class="post-username">${data.rows[0].username}</span>
                                <span class="post-location"><i class="fa fa-map-marker" aria-hidden="true"></i> ${data.rows[0].location}</span>
                                <span class="delete-post-btn"><i class="fa fa-times" aria-hidden="true"></i></span>
                                <div class="post-content">${data.rows[0].content}</div>
                                <div class="post-tags"><span class='post-tags-text'>#${data.posts.rows[0].tags}</span></div>
                                <img class="post-img" src='${data.rows[0].filepath}' />
                                <video class="post-vid" controls loop autoplay>
                                        <source src="${data.rows[0].filepath}" type="video/mp4">
                                </video>
                                <div class="like-and-comment-row">
                                        <span class="number-likes">0 likes</span>
                                        <i class="fa fa-heart" aria-hidden="true"></i>
                                </div>
                        </div>
                </div>
        `);
});


$(function () {
        $('#posts-list').on('click', '.post-tags-text', function (e) {
                let tags = $(this).text().substring(1);
                $.ajax({
                        type: "GET",
                        url: `/api/tag/${tags}`,
                        success: function (data) {
                                for (let i = 0; i < data.posts.rows.length; i++) {
                                        $(`#${data.posts.rows[i].id}`).parent().prependTo("#posts-list");
                                }
                        }
                });
        });
});