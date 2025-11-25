document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const loginInput = document.getElementById('loginInput');
    const passwordInput = document.getElementById('passwordInput');
    const errorContainer = document.getElementById('loginError');

    if (sessionStorage.getItem('isAuthenticated') === 'true') {
        window.location.replace('dashboard.html');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const loginValue = loginInput.value.trim();
        const passwordValue = passwordInput.value.trim();

        if (loginValue === '1' && passwordValue === '1') {
            sessionStorage.setItem('isAuthenticated', 'true');
            errorContainer.textContent = '';
            window.location.href = 'dashboard.html';
        } else {
            errorContainer.textContent = 'Неверный логин или пароль';
        }
    });
});
