const books=[
["The Very Hungry Caterpillar","Children (1–5)",299,"🐛"],
["Panchatantra Stories","Children (6–12)",180,"📚"],
["Harry Potter Series","Young Adults (13–18)",499,"⚡"],
["NCERT Class 10","Students (13–18)",285,"📘"],
["JEE Main & Advanced","Competitive Exams",620,"🧪"],
["UPSC Civil Services","Competitive Exams",650,"🏛️"],
["Data Structures & Algorithms","Higher Education (19–40)",550,"💻"],
["Medical Entrance Guide","Competitive Exams",720,"🩺"],
["Atomic Habits","Professionals (19–40)",320,"📗"],
["Pride and Prejudice","Fiction & Novels",450,"❤️"],
["Bhagavad Gita","Reference Books",250,"🕉️"],
["Business & Management","Professionals (19–40)",520,"💼"],
["Children's Picture Books","Children (1–5)",150,"🎨"],
["Teen Fiction Collection","Young Adults (13–18)",399,"📖"],
["UPSC General Studies","Competitive Exams",680,"📝"],
["Engineering Mathematics","Higher Education (19–40)",590,"➗"],
["Career Guidance","Young Adults (13–18)",280,"🎯"],
["Self Help Collection","Professionals (19–40)",350,"🌱"],
["Senior Citizen Wellness","Seniors (61–80)",300,"🌼"],
["Large Print Classics","Elderly (81–100)",400,"🔎"]
];
const stationery=[
["Classmate Notebook (Single Line)","Notebooks & Registers",40,"📓"],["Ball Pen (Blue)","Pens & Pencils",15,"🖊️"],["Pencil (HB)","Pens & Pencils",10,"✏️"],["Color Pencils (12 Shades)","Art & Craft Supplies",120,"🖍️"],["Geometry Box","School Supplies",150,"📐"],["Water Bottle","School Supplies",250,"🧴"],["Backpack","School Supplies",899,"🎒"],["Sticky Notes","Office Supplies",60,"🗒️"],["Highlighters (Set of 4)","Office Supplies",100,"🖍️"],["Calculator","Office Supplies",350,"🧮"],["Eraser Pack","Pens & Pencils",30,"◻️"],["Sketch Pens","Art & Craft Supplies",80,"🖌️"],["File & Folder","Files & Folders",55,"📁"],["Correction Pen","Correction Products",45,"🖊️"],["Diary & Planner","Diaries & Planners",220,"📔"],["Stapler","Office Supplies",130,"📎"],["Glue Stick","Art & Craft Supplies",35,"🧴"],["A4 Sheets (100)","Office Supplies",120,"📄"],["Desk Organizer","Office Supplies",280,"🗃️"],["Crayons","Art & Craft Supplies",75,"🖍️"]
];
let cart=JSON.parse(localStorage.getItem("kalpalathaCart")||"[]"), current="books", filter="All";

function img(emoji){return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="300" height="360"><rect width="100%" height="100%" fill="#eef4fb"/><text x="50%" y="48%" text-anchor="middle" font-size="90">${emoji}</text><text x="50%" y="70%" text-anchor="middle" font-family="Arial" font-size="18" fill="#173a62">Kalpalatha</text></svg>`)}`}
function home(){document.getElementById("app").innerHTML=`<section class="hero"><div><h1>Welcome to<br><span style="color:#ffd31a">Kalpalatha</span> Book Store</h1><p>Your one-stop destination for books, competitive exam resources and quality stationery.</p><div class="heroBtns"><button class="bigBtn" onclick="showBooks()">📚 Books<br><small>All ages 1–100</small></button><button class="bigBtn green" onclick="showStationery()">✏️ Stationery<br><small>School • College • Office</small></button></div></div></section><section class="features"><div class="feature">📚<br><b>Wide Range</b><br>Books for every age</div><div class="feature">🎯<br><b>Exam Resources</b><br>Competitive exams</div><div class="feature">✏️<br><b>Quality Stationery</b><br>Trusted products</div><div class="feature">💰<br><b>Best Prices</b><br>Great value</div></section>`}
function showBooks(){current="books";filter="All";render()}
function showStationery(){current="stationery";filter="All";render()}
function render(){let data=current==="books"?books:stationery, q=document.getElementById("search").value.toLowerCase(); data=data.filter(x=>(filter==="All"||x[1]===filter)&&x[0].toLowerCase().includes(q));let cats=[...new Set((current==="books"?books:stationery).map(x=>x[1]))];document.getElementById("app").innerHTML=`<section class="section"><h2>${current==="books"?"📚 All Books":"✏️ All Stationery"}</h2><p>${current==="books"?"Books for every age, from 1 to 100.":"Everything you need for school, college, office and creative work."}</p><div class="chips"><button class="chip" onclick="filter='All';render()">All</button>${cats.map(c=>`<button class="chip" onclick="filter=${JSON.stringify(c)};render()">${c}</button>`).join("")}</div><div class="grid">${data.map((x,i)=>`<div class="card"><img src="${img(x[3])}"><h3>${x[0]}</h3><small>${x[1]}</small><p class="price">₹ ${x[2]}</p><button class="add" onclick='add(${JSON.stringify(x)})'>🛒 Add to Cart</button></div>`).join("")}</div></section>`}
function add(x){cart.push({name:x[0],cat:x[1],price:x[2],emoji:x[3]});save();alert(x[0]+" added to cart");}
function save(){localStorage.setItem("kalpalathaCart",JSON.stringify(cart));document.getElementById("count").textContent=cart.length}
function showCart(){let total=cart.reduce((a,x)=>a+x.price,0);document.getElementById("app").innerHTML=`<section class="cart"><h2>🛒 My Cart</h2>${cart.length?cart.map((x,i)=>`<div class="row"><img src="${img(x.emoji)}"><div class="grow"><b>${x.name}</b><br>₹ ${x.price}</div><button onclick="removeItem(${i})">🗑️</button></div>`).join(""):`<p>Your cart is empty.</p>`}<h2>Total: ₹ ${total}</h2>${cart.length?`<button class="primary" onclick="checkout()">Proceed to Checkout</button>`:""}</section>`}
function removeItem(i){cart.splice(i,1);save();showCart()}
function checkout(){let total=cart.reduce((a,x)=>a+x.price,0);document.getElementById("app").innerHTML=`<section class="cart"><h2>💳 Payment & Billing</h2><div class="checkout"><h3>Customer Details</h3><input id="name" placeholder="Full Name *"><input id="phone" placeholder="Phone Number *"><textarea id="address" placeholder="Delivery Address *"></textarea><h3>Payment Mode</h3><div class="pay"><label><input type="radio" name="pay" value="UPI" checked> UPI (Google Pay / PhonePe / Paytm)</label><label><input type="radio" name="pay" value="Card"> Debit / Credit Card</label><label><input type="radio" name="pay" value="Net Banking"> Net Banking</label><label><input type="radio" name="pay" value="COD"> Cash on Delivery</label></div><h2>Total: ₹ ${total}</h2><button class="primary" onclick="placeOrder()">Confirm Order & Generate Bill</button></div></section>`}
function placeOrder(){let name=document.getElementById("name").value,phone=document.getElementById("phone").value,address=document.getElementById("address").value;if(!name||!phone||!address)return alert("Please fill all customer details.");let method=document.querySelector('input[name="pay"]:checked').value,total=cart.reduce((a,x)=>a+x.price,0);let rows=cart.map((x,i)=>`<tr><td>${i+1}</td><td>${x.name}</td><td>1</td><td>₹ ${x.price}</td><td>₹ ${x.price}</td></tr>`).join("");document.getElementById("app").innerHTML=`<section class="bill"><h2>📖 Kalpalatha Book Store</h2><p>PHX3+73R, Ward 20, Sarvakatta, Proddatur, Andhra Pradesh 516360<br>Phone: 094400 41999</p><hr><h2>INVOICE</h2><p><b>Customer:</b> ${name}<br><b>Phone:</b> ${phone}<br><b>Address:</b> ${address}<br><b>Payment:</b> ${method}</p><table><tr><th>#</th><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>${rows}</table><h2 style="text-align:right">Total: ₹ ${total}</h2><button class="primary" onclick="window.print()">🖨️ Print / Save Bill</button><button class="primary" style="margin-top:10px" onclick="cart=[];save();home()">Done</button></section>`}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
home();save();
