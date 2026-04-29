function filterProducts(allProducts) {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const selectedCat = document.getElementById('category-btn').innerText.trim();
    const selectedBrand = document.getElementById('brand-btn').innerText.trim();

    return allProducts.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCat = (selectedCat === "All categories" || selectedCat === "All") ? true : product.type === selectedCat;
        const matchesBrand = (selectedBrand === "All Brands" || selectedBrand === "All") ? true : product.brand === selectedBrand;

        return matchesSearch && matchesCat && matchesBrand;
    });
}

// إضافة المستمعات (EventListeners) للقوائم المنسدلة
document.querySelectorAll('#category-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
        document.getElementById('category-btn').innerText = e.target.innerText;
        renderFilteredUI();
    });
});

document.querySelectorAll('#brand-menu .dropdown-item').forEach(item => {
    item.addEventListener('click', (e) => {
        document.getElementById('brand-btn').innerText = e.target.innerText;
        renderFilteredUI();
    });
});

document.getElementById('search-input').addEventListener('input', () => {
    renderFilteredUI();
});