document.getElementById('hireForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Create a FormData object
    const formData = new FormData(e.target);
    
    // Convert FormData to an object
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    // You'll need to replace this URL with your actual endpoint
    const endpoint = 'YOUR_EMAIL_ENDPOINT';
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        });
        
        if (response.ok) {
            alert('Thank you for your submission! I will get back to you soon.');
            e.target.reset();
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        alert('There was an error submitting your form. Please try again or contact me directly.');
        console.error('Error:', error);
    }
});