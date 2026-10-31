const starterProducts = [
  {id:1,name:"Engineering Mathematics",category:"Books",price:250,description:"Good condition, useful for first-year students.",contact:"seller@example.com",emoji:"📚"},
  {id:2,name:"Wireless Headphones",category:"Electronics",price:650,description:"Working perfectly with clear sound.",contact:"9876543210",emoji:"🎧"},
  {id:3,name:"College Bicycle",category:"Bicycles",price:2200,description:"Well maintained and ready to ride.",contact:"9876501234",emoji:"🚲"},
  {id:4,name:"Laptop Backpack",category:"Bags",price:400,description:"Spacious bag with laptop compartment.",contact:"student@example.com",emoji:"🎒"},
  {id:5,name:"Scientific Calculator",category:"Accessories",price:500,description:"Useful for engineering calculations.",contact:"9876512345",emoji:"🧮"},
  {id:6,name:"Android Smartphone",category:"Mobile Phones",price:4500,description:"Good working condition. Contact for details.",contact:"9876523456",emoji:"📱"}
];
let products = JSON.parse(localStorage.getItem("campusReuseProducts") || "null") || starterProducts;
const grid = document.getElementById("productGrid");
const search = document.getElementById("searchInput");
const category = document.getElementById("categoryFilter");
const sort = document.getElementById("sortFilter");
function save(){localStorage.setItem("campusReuseProducts",JSON.stringify(products));}
function render(){
  let list = products.filter(p => (category.value==="All" || p.category===category.value) && (p.name+" "+p.description+" "+p.category).toLowerCase().includes(search.value.toLowerCase()));
  if(sort.value==="low") list.sort((a,b)=>a.price-b.price);
  if(sort.value==="high") list.sort((a,b)=>b.price-a.price);
  if(sort.value==="new") list.sort((a,b)=>b.id-a.id);
  document.getElementById("listingCount").textContent = `${list.length} products`;
  document.getElementById("emptyState").classList.toggle("hidden",list.length!==0);
  grid.innerHTML = list.map(p=>`<article class="product"><div class="product-image">${p.image?`<img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" onerror="this.replaceWith(document.createTextNode('📦'))">`:p.emoji||"📦"}</div><div class="product-info"><span class="tag">${escapeHtml(p.category)}</span><h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.description)}</p><div class="product-bottom"><span class="price">₹${Number(p.price).toLocaleString("en-IN")}</span><a class="contact" href="mailto:${encodeURIComponent(p.contact)}">Contact seller ↗</a></div></div></article>`).join("");
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
[search,category,sort].forEach(el=>el.addEventListener("input",render));
document.getElementById("sellForm").addEventListener("submit",e=>{
  e.preventDefault();const data=Object.fromEntries(new FormData(e.target).entries());
  products.unshift({...data,id:Date.now(),price:Number(data.price),emoji:"📦"});
  save();e.target.reset();render();document.getElementById("market").scrollIntoView({behavior:"smooth"});
  alert("Your product listing has been published!");
});
render();