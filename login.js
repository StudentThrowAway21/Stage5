function validate()
{

    var allUsers=["User1|Pass1","User2|Pass2"]
    var uname=document.getElementById("username").value;
    var upass=document.getElementById("password").value;
    for (i=0; i<allUsers.length;i++)
    {
        var userSpl = allUsers[i].split("|");
        console.log(userSpl);
        console.log(uname);
        console.log(upass);
        if (uname==userSpl[0] && upass==userSpl[1])
        {
            //alert("Login succesfull");
            window.open("home.html");
            return false;

        }
        else if (i==allUsers.length-1)
        {
            alert("Login failed");
        }
    }

}