
document.getElementById("payBtn").onclick = async function () {

    // 1️⃣ Create order in backend
    const res = await fetch("https://pawsome-41bj.onrender.com/api/payment/create-order", {
        method: "POST",
        credentials: "include",
    });

    const order = await res.json();

    // 2️⃣ OPEN RAZORPAY POPUP
    var options = {
        "key": "YOUR_RAZORPAY_KEY",  
        "amount": order.amount,
        "currency": "INR",
        "name": "Pawsome Care",
        "description": "Pet Service Payment",
        "order_id": order.id,

        "handler": async function (response) {
            // 3️⃣ VERIFY PAYMENT IN BACKEND
            await fetch("https://pawsome-41bj.onrender.com/api/payment/verify", {
                method: "POST",
                headers: {"Content-Type":"application/json"},
                credentials:"include",
                body: JSON.stringify(response)
            });

            // 4️⃣ CLEAR CART (your backend already supports this)
            await fetch("https://pawsome-41bj.onrender.com/api/cart/clear", {
                method: "DELETE",
                credentials: "include"
            });

            alert("Payment Successful!");
            window.location.href = "our_services.html";
        }
    };

    var rzp = new Razorpay(options);
    rzp.open();
};
