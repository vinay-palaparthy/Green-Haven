let products=[
{
name:"Rose",
price:10,
cat:"flower",
images:["images/rose1.jpg","images/rose2.jpg","images/rose3.jpg"]
},
{
name:"Jasmine",
price:9,
cat:"flower",
images:["images/jasmine1.jpg","images/jasmine2.jpg","images/jasmine3.jpg"]
},
{
name:"Aloe Vera",
price:8,
cat:"indoor",
images:["images/aloe1.jpg","images/aloe2.jpg","images/aloe3.jpg"]
}
];

let cart=[];
let orders=[];
let total=0;

function renderProducts(){
let list=document.getElementById("productList");
let search=document.getElementById("search").value.toLowerCase();
let filter=document.getElementById("filter").value;
list.innerHTML="";

products.filter(p=>
p.name.toLowerCase().includes(search) &&
(filter==="all" || p.cat===filter)
).forEach((p,i)=>{
list.innerHTML+=`
<div class="card">
<img src="${p.images[0]}" id="img${i}" class="gallery-main">

<div class="gallery-thumbs">
${p.images.map(img=>`
<img src="${img}" onclick="document.getElementById('img${i}').src='${img}'">
`).join("")}
</div>

<h3>${p.name}</h3>
<p>$${p.price}</p>
<button onclick="addToCart('${p.name}',${p.price})">Add to Cart</button>
</div>`;
});
}

function addToCart(name,price){
cart.push({name,price});
total+=price;
renderCart();
}

function renderCart(){
let box=document.getElementById("cartBox");
box.innerHTML="";
cart.forEach((i,x)=>{
box.innerHTML+=`
<div class="cart-item">
${i.name} - $${i.price}
<button onclick="removeItem(${x})">X</button>
</div>`;
});
document.getElementById("total").innerText=total;
}

function removeItem(i){
total-=cart[i].price;
cart.splice(i,1);
renderCart();
}

function placeOrder(){
orders.push({items:[...cart],total});
cart=[];
total=0;
renderCart();
renderOrders();
alert("Order placed successfully 🌱");
showSection("orders");
}

function renderOrders(){
let box=document.getElementById("orderBox");
box.innerHTML="";
orders.forEach((o,i)=>{
box.innerHTML+=`<p>Order ${i+1} - $${o.total}</p>`;
});
}

function addPlant(){
let imgs=[...document.getElementById("pimg").files].map(f=>URL.createObjectURL(f));
products.push({
name:pname.value,
price:pprice.value,
cat:pcat.value,
images:imgs
});
renderProducts();
alert("Plant added 🌿");
}

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.add("hidden"));
document.getElementById(id).classList.remove("hidden");
}

renderProducts();
