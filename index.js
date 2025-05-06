// Tabs
const signupTab = document.getElementById('signup-tab');
const loginTab = document.getElementById('login-tab');
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');

signupTab.onclick = () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
};

loginTab.onclick = () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
};

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === 'password' ? 'text' : 'password';
}

// Country/City dynamic
document.getElementById('signup-country').addEventListener('change', function () {
    const city = document.getElementById('signup-city');
    city.innerHTML = '<option value="">Select city</option>';
    city.disabled = !this.value;

    const cities = {
        Ukraine: ['Kyiv', 'Lviv', 'Chernivtsi'],
        Poland: ['Warsaw', 'Krakow', 'Gdansk']
    };

    if (cities[this.value]) {
        cities[this.value].forEach(c => {
            city.innerHTML += `<option value="${c}">${c}</option>`;
        });
    }
});

// Signup validation
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    function validateField(input, errorId, validatorFn, message) {
        const error = document.getElementById(errorId);
        if (!validatorFn(input.value)) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            error.textContent = message;
            valid = false;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            error.textContent = '';
        }
    }

    validateField(signupForm['signup-firstname'], 'firstname-error', v => v.length >= 3 && v.length <= 15, 'First name must be 3–15 characters.');
    validateField(signupForm['signup-lastname'], 'lastname-error', v => v.length >= 3 && v.length <= 15, 'Last name must be 3–15 characters.');
    validateField(signupForm['signup-email'], 'email-error', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Invalid email format.');
    validateField(signupForm['signup-phone'], 'phone-error', v => /^\+380\d{9}$/.test(v), 'Phone must match +380XXXXXXXXX.');
    validateField(signupForm['signup-sex'], 'sex-error', v => v !== '', 'Please select your sex.');
    validateField(signupForm['signup-city'], 'location-error', v => v !== '', 'Please select your city.');

    const dob = signupForm['signup-dob'];
    const dobError = document.getElementById('dob-error');
    const birthDate = new Date(dob.value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (!dob.value || birthDate > new Date() || age < 12) {
        dob.classList.add('invalid');
        dobError.textContent = age < 12 ? 'You must be at least 12 years old.' : 'Invalid birth date.';
        valid = false;
    } else {
        dob.classList.remove('invalid');
        dob.classList.add('valid');
        dobError.textContent = '';
    }
    const rememberMe = document.getElementById('remember-me').checked;
    console.log("Remember Me:", rememberMe);  // true або false

    const pwd = signupForm['signup-password'];
    const confirm = signupForm['signup-confirm'];
    validateField(pwd, 'password-error', v => v.length >= 6, 'Password must be at least 6 characters.');
    validateField(confirm, 'confirm-error', v => v === pwd.value, 'Passwords do not match.');

    if (valid) {
        alert("Signup successful!");
        signupForm.reset();
        document.querySelectorAll('input, select').forEach(el => el.classList.remove('valid'));
        document.getElementById('signup-city').disabled = true;
    }
});