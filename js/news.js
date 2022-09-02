const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category;
}

const setCategories = async () => {
    const data = await loadCategories();
    const allCategories = document.getElementById('all- categories');
    for (const category of data) {
        console.log(category.category_name);
        const li = document.createElement('li');
        li.innerHTML = `
        <a>${category.category_name}</a>
        `
        allCategories.appendChild(li);
    }
}

setCategories()
// loadCategories()