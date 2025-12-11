 async function loadUser() {
  try {
    const res = await fetch("http://127.0.0.1:5001/api/auth/me", {
      credentials: "include"
    });

    if (!res.ok) throw new Error("Not logged in");

    const { user } = await res.json();
    showUserUI(user);
  } catch (err) {
    // silent if guest
    console.log(err);
  }
  
};




function showUserUI(user) {
  // const loginBtn = document.querySelector(".login_btn_header");
  const profileBtn = document.querySelector(".profile_btn");
  // window.currentUser=user;
  // loginBtn.style.display = "none";
  profileBtn.textContent = `Hi, ${user.username}`;
}

// function showGuestUI() {
//   document.querySelector(".login_btn_header").style.display = "inline-block";
  
// }


window.addEventListener("DOMContentLoaded", () => {
  loadUser();

  const profileBtn = document.querySelector(".profile_btn");
  const popup = document.getElementById("profilePopup");

  if (profileBtn) {
    profileBtn.addEventListener("click", async () => {
      const res = await fetch("http://127.0.0.1:5001/api/auth/me", {
        credentials: "include"
      });
      if (res.ok) {
        const { user } = await res.json();
        popup.id="profilepopup"
        document.getElementById("p_username").textContent = user.username;
        document.getElementById("p_email").textContent = user.email;
        document.getElementById("p_userid").textContent = user.userid;
        
      }

      // popup.style.display = popup.style.display === "none" ? "block" : "none";
    });
  }

  document.querySelector(".container").addEventListener("click",(e)=>{
    if(!e.target.closest("#profilepopup"))
    {
      popup.id="";
    }
  })

  document.getElementById("logoutBtn").onclick = async () => {
    await fetch("http://127.0.0.1:5001/api/auth/logout", {
      method: "POST",
      credentials: "include"
    });
    window.location.href = "index.html";
  };
});