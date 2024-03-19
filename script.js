const API_KEY="37aaa45bb8104f5f8fab770d80007ea4";
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data=await res.json();
    bindData(data.articles);
} 
function bindData(articles){
    const cardsContainer=document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article =>{
        if(!article.urlToImage)return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    } )
    
}
function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDescription=cardClone.querySelector('#news-description');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;
    
    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Jakarta"});
    newsSource.innerHTML=`${article.source.name}• ${date}`;

    cardClone.firstElementChild.addEventListener("click",() => {
        window.open(article.url,"_blank");
    })
}
let curSelectedNav=null;
function onNavitemClick(id){
    fetchNews(id);
    const navitem=document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=navitem;
    curSelectedNav.classList.add("active");
    

}
const searchButton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchButton.addEventListener('click',()=>{
    const query=searchText.value ;
    if(!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav=null;
});