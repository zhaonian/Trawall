$(function () {
        // click on username update button for profile username update
        $('#post-btn-container').on('click', '#update-profile-username-btn', function () {
                $.ajax({
                        type: "POST",
                        url: `/api/user/username/update`,
                        contentType: "application/x-www-form-urlencoded",
                        data: {
                                id: $('body').attr('id'),
                                username: $('#modal-update-username').val(),
                        },
                        success: function (data) {

                        }
                });
        });
});