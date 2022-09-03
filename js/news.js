// Load Categories 
const loadCategories = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    } catch (error) {
        console.log(error)
    }
}
// Set Categories
const setCategories = async () => {
    const data = await loadCategories();
    const allCategories = document.getElementById('all-categories');
    data.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('demo')
        li.innerHTML = `
        <button onclick="loadNews('${category.category_id}','${category.category_name}')">${category.category_name}</button>

        `
        allCategories.appendChild(li);
    })
}
// Load News
const loadNews = async (category_id, category_name) => {
    document.getElementById('spinner').classList.remove('hidden');
    try {
        const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
        const res = await fetch(url);
        const data = await res.json();
        document.getElementById('spinner').classList.add('hidden');
        displayNews(data.data)
    } catch (error) {
        console.log(error)
    }
    document.getElementById('category-name').innerHTML = `${category_name}`;

}
// Display News 
const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    document.getElementById('item-count').innerHTML = `${allNews.length == 0 ? 'No' : allNews.length} items found for `;
    newsContainer.innerHTML = '';
    allNews.length == 0 && (newsContainer.innerHTML = `
    <h1 class="font-bold text-2xl mt-40 text-center"> No Data Found! </h1>
    `)
    allNews.sort((a, b) => b.total_view - a.total_view);
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
               
               <span class="font-bold ml-24"> <i class="fa-sharp fa-solid fa-eye"></i> ${news.rating.number}M</span>
               <span>
               <div class="rating ml-24">
               <input type="radio" name="rating-1" class="mask mask-star" />
               <input type="radio" name="rating-1" class="mask mask-star" checked />
               <input type="radio" name="rating-1" class="mask mask-star" />
               <input type="radio" name="rating-1" class="mask mask-star" />
               <input type="radio" name="rating-1" class="mask mask-star" />
             </div>
               </span>
               </div>
                
            </div>
            <div class="card-actions justify-end">
            <div>
            <!-- The button to open modal -->
            <label for="${news._id}" class="btn modal-button capitalize">Details</label>

            <!-- Put this part before -->
            <input type="checkbox" id="${news._id}" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box" >
                <img class="rounded-lg w-full" src="${news.thumbnail_url}" alt="Movie">
                    <h3 class="font-bold text-lg">Author Name: ${news.author.name ? news.author.name : 'No Data Found'
            }</h3>
                    
                        <h6 class="font-semibold">Total View: ${news.total_view ? news.total_view : 'No Data Found'}</h6>
                        <p class="py-4">Details: ${news.details}</p>
                    <div class="modal-action">
                        <label for="${news._id}" class="btn">Close</label>
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
//Blog Event Handler
document.getElementById('blog').addEventListener('click', function () {
    window.location.href = 'blog.html';
})

setCategories()
loadNews('01', 'Breaking News');





