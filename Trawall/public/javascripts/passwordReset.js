$(function () {
        $('#register-form').on('submit', function (e) {
                if ($('#password').val() != $('#password-confirm').val()) {
                        e.preventDefault();
                        alert(`Password does not match!`);
                }
        });
});