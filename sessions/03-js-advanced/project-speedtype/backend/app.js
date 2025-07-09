let users = [{ //This is a json object where we have an array of objects
    "name": "Anirudh",
    "phone_number":977283784,
    "id":1
}];

function display_user(userObj)//This is a function that is used to print the array object
{
    console.log(userObj);
}
function add_user(userObj)//This is a function to add users to the array
{
    users.push(userObj);
}

function main()
{
    if(users.name == "Anirudh")//Will this work? if not why?
    {
        display_user(users);//Can we make this work in any way?
    }
    for(const user of users)//If you said yes, then bingo! we have to access each object of the array separately
    {
        if(user.name == "Anirudh")
        {
            display_user(user);
        }
        if(user.id==1)
        {
            add_user({   "name": "Vrishin",
            "phone_number":977282484,
            "id":user.id+1});//Here I am incrementing the exisitng user.id by 1 so that it can be automated
        }
        display_user(user);
    }
}

main();