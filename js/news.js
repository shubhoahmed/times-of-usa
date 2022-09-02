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
        // console.log(category.category_name);
        const li = document.createElement('li');
        li.innerHTML = `
        <a>${category.category_name}</a>
        `
        allCategories.appendChild(li);
    }
}

const loadNews = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data)
    // return data.data;
}

const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container')
    for (const news of allNews) {
        console.log(news);
        const div = document.createElement('div');
        div.classList.add('news');
        div.innerHTML = `
        <div class="card card-side bg-base-100 shadow-xl">
        <figure class="p-6 "><img class="rounded-lg" src="${news.thumbnail_url}" alt="Movie"></figure>
        <div class="card-body">
            <h2 class="card-title">${news.title}</h2>
            <p>${news.details.length > 150 ? news.details.slice(0, 150) + " ...." : news.details}</p>
            <div class="mt-4 flex-row">
                
               <div>
               <img class="inline p-1 rounded-full w-8 h-8" src="${news.author.img}">
               <span>${news.author.name}</span>
               <span class="font-bold ml-24">${news.rating.number}M</span>
               </div>
                
            </div>
            <div class="card-actions justify-end">
                <button class="btn btn-primary capitalize">Details</button>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(div);
    }
}


setCategories()
loadNews('01')
