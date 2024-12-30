
function on_load() {
//alert("on_load function called");
// var dynamicUrl = "https://amplify-38891.bubbleapps.io/notesembed?type=job&rec=1733259816547x564004384760021400&zohouserid=6094795000000491234";
// document.getElementById("zoho-iframe").src = dynamicUrl;
var userId;
ZOHO.embeddedApp.on("PageLoad", (entity) => {
    moduleName = entity.Entity;
    moduleID = entity.EntityId;
    if(moduleName === "Deals"){
        recordtype="job";
    }
    else if(moduleName === "Contracts"){
        recordtype = "contract";
    }
    else if(moduleName === "Designs"){
        recordtype = "design";
    }
    else if(moduleName === "EV_Chargers"){
        recordtype = "evcharger";
    }

    //alert(JSON.stringify(entity));
    ZOHO.CRM.CONFIG.getCurrentUser().then(function(data){
	//alert("Logged in User: " + JSON.stringify(data.users[0].id));
    userId = data.users[0].id;


    //alert("Page loaded: " + JSON.stringify(entity));
    ZOHO.CRM.UI.Resize({ height: "480px", width: "100%" })
    .then(function(data) {
        // Construct dynamic URL
        var baseUrl = "https://amplify.plugpv.com/notesembed";  // Your Bubble URL
        var dynamicUrl = baseUrl + "?type=" + recordtype + "&rec=" + moduleID + "&zohouserid=" + userId;
        //alert(dynamicUrl);
        console.log("Dynamic URL: " + dynamicUrl);
        document.getElementById("zoho-iframe").src = dynamicUrl;
    })
    .catch(function(error) {
        //alert("Resize error: " + JSON.stringify(error));
    });
}); 
});

ZOHO.embeddedApp.init();
}
on_load();