(function($){
$(function(){
    $.ajax({
        type:"post",
        url:"http://localhost:3000/test/login",
        success:function(data){
                               // console.log("success:",data);
                               document.getElementById("name").innerHTML = "Paragraph changed!";
                            }
    });
})
})


getLogData(params) {
    return new Promise((resolve, reject) => {
    $.ajax({
    url: this.defaults[params.requestTo].baseUrl + params.endPoints,
    method: "GET",
    
    accepts: this.defaults[params.requestTo].accepts,
    contentType: this.defaults[params.requestTo].contentType,
    data: params.data
    }).success((data) => {
    resolve(data);
    }).error((err) => {
    console.log("get error occurs==>", err);
    if (err.status === 401) {
    this.handleInvalidToken();
    }
    reject(err.responseJSON.error.message);
    })
    });
    }
   