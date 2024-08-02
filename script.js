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
