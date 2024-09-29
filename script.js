// script.js

function saveProfile() {
    const name = document.getElementById('nameInput').value;
    const profilePicInput = document.getElementById('profilePicInput');
    const profilePicFile = profilePicInput.files[0];

    if (!name) {
        alert('Please enter your name.');
        return;
    }

    if (!profilePicFile) {
        alert('Please select a profile picture.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const profilePicDataUrl = e.target.result;

        // Save profile data to local storage
        const profileData = {
            name: name,
            profilePic: profilePicDataUrl
        };

        localStorage.setItem('profile', JSON.stringify(profileData));

        alert('Profile saved successfully!');

        // Redirect to the next page
        window.location.href = 'index1.html';
    };

    reader.readAsDataURL(profilePicFile);
}
