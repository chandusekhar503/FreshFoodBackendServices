this.application = {
    port : 9000
}
this.database = {
    url: "mongodb://localhost",
    dbname: "chandu" // database name

}
this.email={
    type : 'gmail',
    id : 'mentipoorna@gmail.com',
    password : 'Poorna@4321',
    link:'http://localhost:3000/users/verify/email?userId=',
    subject:'Please verify your emailId'
}

this.default={
        customerDefaultRole:'5b35387ca20d341b91d79996',
        customerCreatedBy:'5b32e78da814c74e74ed3865',
        merchantDefaultRole:'5b353887a20d341b91d79997',
        merchantCreatedBy:'5b32e78da814c74e74ed3865'
}