document.addEventListener('DOMContentLoaded', function() {
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');
    const productContainer = document.getElementById('product-container');
    let currentIndex = 0;

    const products = productContainer.querySelectorAll('.product-category');
    const totalProducts = products.length;

    scrollLeftButton.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateProductView();
        }
    });

    scrollRightButton.addEventListener('click', function() {
        if (currentIndex < totalProducts - 1) {
            currentIndex++;
            updateProductView();
        }
    });

    function updateProductView() {
        const offset = -currentIndex * 100;
        productContainer.style.transform = `translateX(${offset}%)`;
    }

    let cart = [];

    function addToCart(product) {
        cart = [];
        const productName = product.querySelector('p').innerText;
        const productPrice = parseFloat(product.querySelectorAll('p')[1].innerText.replace('€', ''));
        cart.push({ name: productName, price: productPrice, quantity: 1 });
        toggleCartModal();
    }

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        cart.forEach((item, index) => {
            const itemContainer = document.createElement('div');
            itemContainer.innerHTML = `
                <p>${item.name} - €<span class="item-price">${item.price * item.quantity}</span></p>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
            `;
            cartItemsContainer.appendChild(itemContainer);
        });
    }

    function updateQuantity(index, quantity) {
        cart[index].quantity = parseInt(quantity);
        renderCartItems();
    }

    function toggleCartModal() {
        const cartModal = document.getElementById('cart-modal');
        if (cartModal.style.display === 'none' || cartModal.style.display === '') {
            renderCartItems();
            cartModal.style.display = 'block';
        } else {
            cartModal.style.display = 'none';
        }
    }

    function placeOrder() {
        const orderForm = document.getElementById('order-form');
        if (!orderForm.checkValidity()) {
            orderForm.reportValidity();
            return;
        }

        document.getElementById('order-form').style.display = 'none';
        document.getElementById('order-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('cart-modal').style.display = 'none';
            document.getElementById('order-form').reset();
            document.getElementById('order-form').style.display = 'block';
            document.getElementById('order-message').style.display = 'none';
            cart.length = 0;
            document.getElementById('cart-items').innerHTML = '';
        }, 3000);
    }

    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', function() {
            const product = button.closest('.product');
            addToCart(product);
        });
    });

    window.updateQuantity = updateQuantity;
    window.toggleCartModal = toggleCartModal;
    window.placeOrder = placeOrder;
});

function showProducts(category) {
    const allProducts = document.querySelectorAll('#editors-picks-products .product');
    allProducts.forEach(product => {
        if (product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
