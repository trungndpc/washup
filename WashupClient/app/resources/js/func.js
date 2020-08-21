function isValidEmailAddress(emailAddress) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test(emailAddress);
}
function isValidPassword(pass) {
	//Minimum six characters, at least one letter and one number
	var pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i;
    return pattern.test(pass);
}