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
        <button onclick="loadNews('${category.category_id.length > 0 ? category.category_id : ('No Data Found')}')">${category.category_name}</button>

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
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    for (const news of allNews) {
        // console.log(news);
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
            <div>
            <!-- The button to open modal -->
            <label for="my-modal-6" class="btn modal-button capitalize">Details</label>

            <!-- Put this part before -->
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                <img class="rounded-lg" src="${news.thumbnail_url}" alt="Movie">
                    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
                    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia
                        for free!</p>
                    <div class="modal-action">
                        <label for="my-modal-6" class="btn">Close</label>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
        `
        newsContainer.appendChild(div);
    }


}
document.getElementById('blog').addEventListener('click', function () {
    window.location.href = 'blog.html';
})
setCategories()
// loadNews('01');





