const logout = async () => {
    const response = await fetch("api/admins/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if(response.ok) {
        console.log('response ok');
        document.location.replace("/");
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#logout").addEventListener("click", logout);