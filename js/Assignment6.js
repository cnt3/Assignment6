function MenuChoice()
{
     if (document.getElementById("menu").value == "Add Customer")
    {
        document.getElementById("addCustomer").style.visibility = "visible";
        document.getElementById("changeShippingInfo").style.visibility = "hidden";
        document.getElementById("deleteCustomer").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Change Customer Shipping Address")
    {
        document.getElementById("addCustomer").style.visibility = "hidden";
        document.getElementById("changeShippingInfo").style.visibility = "visible";
        document.getElementById("deleteCustomer").style.visibility = "hidden";
    }
    else if (document.getElementById("menu").value == "Delete Customer")
     {
        document.getElementById("addCustomer").style.visibility = "hidden";
        document.getElementById("changeShippingInfo").style.visibility = "hidden";
        document.getElementById("deleteCustomer").style.visibility = "visible";
    }
    else
    {
        document.getElementById("addCustomer").style.visibility = "hidden";
        document.getElementById("changeShippingInfo").style.visibility = "hidden";
        document.getElementById("deleteCustomer").style.visibility = "hidden";
    }
}

function CreateCustomer()
{
    var XMLRequest = new XMLHttpRequest(); 
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCustomer" ;
    
    // Collect store data from web page
    var customerID = document.getElementById("customerID").value;
    var customerName = document.getElementById("customerName").value;
    var customerCity = document.getElementById("customerCity").value;
    
    //Create the parameter string
    var newCustomer = '{"CustomerID":"' + customerID + '","CompanyName":"' + customerName + '","CustomerCity":"' + customerCity + '"}';
    
    // Checks that the object has returned data
    XMLRequest.onreadystatechange=function()
    {
        if (XMLRequest.readyState == 4 && XMLRequest.status == 200)
        {
           var result= JSON.parse(XMLRequest.responseText);
           
           OperationResult(result);
        }
    }
    
    //Initiate server request
    XMLRequest.open("POST", url, true);
    
    // Set the header
    XMLRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Send the data
    XMLRequest.send(newCustomer);
    
    
}

function OperationResult(output)
{
    if (output.WasSuccessful == 1)
    {
        document.getElementById("result").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("result").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
    }
}

function ChangeShippingInfo()
{
    var objRequest = new XMLHttpRequest();  // Create AJAX request object
    var url = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateOrderAddress" ;
    
        // Collect store data from web page
    var orderNumber = document.getElementById("order#").value;
    var shippingName = document.getElementById("Name").value;
    var streetAddress = document.getElementById("streetAddress").value;
    var shippingCity = document.getElementById("City").value;
    var postalCode = document.getElementById("zip").value;
    
    //Create the parameter string
    var updateShipping = '{"OrderID":"' + orderNumber + '","ShipName":"' + shippingName + '","ShipAddress":"' + streetAddress + '","ShipCity":"' + shippingCity + '", "ShipPostcode":"' + postalCode + '"}';
    
    // Checks that the object has returned data
    objRequest.onreadystatechange=function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
           var result= JSON.parse(objRequest.responseText);
           
           GenerateResult(result);
        }
    }
    
    //Initiate server request
    objRequest.open("POST", url, true);
    
    // Set the header
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //Send the data
    objRequest.send(updateShipping);
    
}

function GenerateResult(result)
{
    if (result.WasSuccessful == 1)
    {
        document.getElementById("changes").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("changes").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
    }
}

function DeleteCustomer()
{
    var XMLobjRequest = new XMLHttpRequest(); 
    var url = " http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCustomer/" ;
    url += document.getElementById("IDcustomer").value;
    confirm("Are you sure you want to delete this?");
    // Checks that the object has returned data
    XMLobjRequest.onreadystatechange = function()
    {
        if (XMLobjRequest.readyState == 4 && XMLobjRequest.status == 200)
        {
           var output = JSON.parse(XMLobjRequest.responseText);
           
           OperationDelete(output);
        }
    }
    
    //Initiate server request
    XMLobjRequest.open("GET", url, true);
    

   XMLobjRequest.send();
    
    
}

function OperationDelete(result)
{
    if (result.DeleteCustomerResult.WasSuccessful == 1)
    {
        document.getElementById("deleted").innerHTML = "The operation was successful!";
    }
    else
    {
        document.getElementById("deleted").innerHTML = "The operation was not successful!" + "<br>" + result.Exception;
    }
}