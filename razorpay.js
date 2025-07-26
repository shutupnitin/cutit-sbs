document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkoutBtn');

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const options = {
                "key": "rzp_live_olqceZcjazpobo", // Your Key ID
                "amount": "100", // Amount in paise (100 paise = ₹1)
                "currency": "INR",
                "name": "cutit.sbs",
                "description": "Remove Watermark from QR Code",
                "image": "assets/logo.png", // Your logo URL
                "handler": function (response) {
                    // Payment successful
                    alert('Payment Successful! Transaction ID: ' + response.razorpay_payment_id);
                    localStorage.setItem('isPremiumPaid', 'true');
                    // Redirect or update UI to reflect premium status
                    window.location.href = 'index.html'; // Go back to homepage
                },
                "prefill": {
                    // Optional: Prefill user details if available
                    // "name": "John Doe",
                    // "email": "john.doe@example.com",
                    // "contact": "9999999999"
                },
                "notes": {
                    "address": "cutit.sbs Office"
                },
                "theme": {
                    "color": "#ff5ea8" // Neon Accent color for Razorpay theme
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open(); // Open Razorpay checkout modal
        });
    }

    // Function to check and update button text on Premium page load
    function updatePremiumButtonState() {
        const isPremiumPaid = localStorage.getItem('isPremiumPaid') === 'true';
        if (checkoutBtn) {
            if (isPremiumPaid) {
                checkoutBtn.textContent = "You're Already Premium! ✨";
                checkoutBtn.disabled = true;
                checkoutBtn.style.opacity = '0.7';
                checkoutBtn.style.cursor = 'not-allowed';
            } else {
                checkoutBtn.textContent = "Get Clean QR for ₹1";
                checkoutBtn.disabled = false;
                checkoutBtn.style.opacity = '1';
                checkoutBtn.style.cursor = 'pointer';
            }
        }
    }

    // Call this function when the Premium page loads
    updatePremiumButtonState();
});
