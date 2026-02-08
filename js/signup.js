// Alpha Signup Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.alpha-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();

        if (!email) return;

        // Disable form during submission
        emailInput.disabled = true;
        submitBtn.disabled = true;
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Signing up...';

        try {
            // Get UTM source from URL if present
            const urlParams = new URLSearchParams(window.location.search);
            const source = urlParams.get('utm_source') || 'website';

            const response = await fetch('https://YOUR_API_ENDPOINT/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, source })
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to thank you page
                window.location.href = 'thanks.html';
            } else {
                // Show error
                alert(data.message || 'Something went wrong. Please try again.');
                emailInput.disabled = false;
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('Network error. Please check your connection and try again.');
            emailInput.disabled = false;
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
