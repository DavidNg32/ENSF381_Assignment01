let cart = {};


document.querySelectorAll('.product-card button').forEach(button => {
    button.addEventListener('click', function() {
        let productCard = this.parentElement;
        let productName = productCard.querySelector('h2').innerText;
        let productPrice = productCard.querySelector('p').innerText;

        // If the product is already in the cart, increase the quantity.
        if (cart[productName]) {
            cart[productName].quantity += 1;
        } else {
            // add the product to the cart.
            cart[productName] = {
                price: productPrice,
                quantity: 1
            };
        }
        
        alert(`${productName} has been added to the cart.`);

        
        updateCartDisplay();
    });
});


function updateCartDisplay() {
    let cartDisplay = document.querySelector('.cart-display');
    cartDisplay.innerHTML = '';
    
    let title = document.createElement('h2');
    title.textContent = 'Shopping Cart';
    title.style.textAlign = 'center';
    cartDisplay.appendChild(title);
    
    for (let productName in cart) {
        let product = cart[productName];
        
        let cartItem = document.createElement('div');
        cartItem.innerHTML = `
            <p> Product: ${productName}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
            <button class="remove-button">Remove</button>
        `;

       
        cartItem.querySelector('.remove-button').addEventListener('click', function() {
            // Decrease the quantity of the product.
            product.quantity -= 1;

            
            if (product.quantity === 0) {
                delete cart[productName];
            }

           
            updateCartDisplay();
        });

        // Add the cart item to the cart display.
        cartDisplay.appendChild(cartItem);
    }
}

let pageURL = window.location.href;
if (pageURL.includes('login.html')) {
    document.querySelector('form input[type="submit"]').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting
        let username = document.querySelector('form input[type="text"]').value;
        let password = document.querySelector('form input[type="password"]').value;
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    // Step 3: If the API call is unsuccessful, display an alert.
                    throw new Error('API call unsuccessful');
                }
                return response.json();
            })
            .then(users => {
                // Step 4: Extract the "name" and "email" properties from each user object.
                let validUser = users.find(user => user.username === username && user.email === password);
    
                // Step 5: Validate the user-entered username and password.
                let message;
                if (validUser) {
                    message = 'You are now locked in. Hello, ' + validUser.name + '!';
                } else {
                    message = 'Invalid username or password.';
                }
    
                // Step 6: Display the success or error message.
                let messageBox = document.querySelector('.message-box');
                if (!messageBox) {
                    messageBox = document.createElement('div');
                    messageBox.classList.add('message-box');
                    document.querySelector('main').appendChild(messageBox);
                }
                messageBox.innerHTML = `<p>${message}</p>`;
            })
            .catch(error => {
                alert('API call unsuccessful');
            });
    });
}
if (pageURL.includes('signup.html')) {
    document.querySelector('form').addEventListener('submit', function(event) {
        // Prevent the form from being submitted by default
        event.preventDefault();

        // Get the user's input
        let username = document.querySelector('input[name="username"]').value;
        let password = document.querySelector('input[name="password"]').value;
        let confirmPassword = document.querySelector('input[name="confirm-password"]').value;
        let email = document.querySelector('input[name="email"]').value;
        

        // Validate the user's input
        let usernamePattern = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()-_=+[\]{}|;:'",.<>?/`~]{8,}$/;
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let message;
        if (!usernamePattern.test(username)) {
            message = 'Invalid username.';
        } else if (!passwordPattern.test(password)) {
            message = 'Invalid password.';
        } else if (password !== confirmPassword) {
            message = 'Passwords do not match.';
        } else if (!emailPattern.test(email)) {
            message = 'Invalid email.';
        } else {
            message = 'Signup successful. Welcome, ' + username + ' to Mogwarts';
        }

        // Display the error or success message
        let messageBox = document.querySelector('.message-box');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.classList.add('message-box');
            document.querySelector('main').appendChild(messageBox);
        }
        messageBox.innerHTML = `<p>${message}</p>`;
    });
}
      
