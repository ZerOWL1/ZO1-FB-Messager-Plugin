//LOGIN CONTROL
var inputEmail = $('#input-email');
var inputPassword = $('#input-pass');
var inputIsCheck = $('#input-remember');
var inputLoginForm = $('#form-login');

function checkNumberInputLenght(input, min, max, dataAttri) {
    let result = -1;
    let inputTag = input.parent();
    let inputNameData = input.attr(dataAttri);
    try {
        result = parseInt(input.val().trim());
        if (result.length == 0) {
            inputTag.addClass('error');
            input.next().html(`${inputNameData} cannot enter empty numbers`);
            return 0;
        } else if (result.length < min) {
            inputTag.addClass('error')
            input.next().html(`${inputNameData} must be greater than ${min} characters`);
            return -1;
        } else if (result.length > max) {
            input.next().html(`${inputNameData} must be smaller than ${max} characters`);
            return -1;
        } else if (isNaN(result)) {
            inputTag.addClass('error');
            input.next().html(`${inputNameData} should enter numbers`);
        } else {
            return result;
        }
    } catch (error) {
        console.log("Error at checkNumberInput Func");
    }
}


function checkStringMinMaxInput(input, min, max, dataAttri) {
    let result = input.val().trim();
    let inputTag = input.parent();
    let inputNameData = input.attr(dataAttri);
    if (result.length == 0) {
        inputTag.addClass('error');
        input.next().html(`${inputNameData} cannot enter empty value`);
        return 0;
    } else if (result.length < min) {
        inputTag.addClass('error');
        input.next().html(`${inputNameData} must be greater than ${min} characters`);
        return -1;
    } else if (result.length > max) {
        inputTag.addClass('error');
        input.next().html(`${inputNameData} must be smaller than ${max} characters`);
        return -1;
    } else {
        return result;
    }
}


function removeError(froms, firstClass, secondClass) {
    for (let i = 0; i < froms.length; i++) {
        const element = $(froms[i]);
        if (element.hasClass(firstClass)) {
            element.first().children().val('');
            if (element.hasClass(secondClass)) {
                element.removeClass(secondClass);
            }
        }
    }
}

function isCheckBox(input) {
    return $(input).prop('checked');
}

//check Login
$(inputLoginForm).submit(function(e) {
    var emailLogin = checkStringMinMaxInput(inputEmail, 5, 50, 'data-l-email');
    var passLogin = checkStringMinMaxInput(inputPassword, 8, 30, 'data-l-password');
    var rememberLogin = isCheckBox(inputIsCheck);
    var userAccountLogin = checkLoginUser(emailLogin, passLogin);
    var formLogins = inputLoginForm.children();

    if (userAccountLogin) {
        //login fails
        removeError(formLogins, 'form-group', 'error')
        window.alert("You've login Success!!");
    } else if (emailLogin == -1 || emailLogin == 0 ||
        passLogin == -1 || passLogin == 0) {
        e.preventDefault();
        //show error mess invalid data
    } else {
        window.alert("Your account does not exist!! Re-Enter");
        removeError(formLogins, 'form-group', 'error')
        e.preventDefault();
    }
});

//REGISTER CONTROL
//check Register
var regUserName = $('#reg-name');
var regEmail = $('#reg-email');
var regPass = $('#reg-pass');
var regRePass = $('#reg-repass');
var regForm = $('#form-register');

$(regForm).submit(function(e) {
    var userNameRegInput = checkStringMinMaxInput(regUserName, 3, 30, 'data-r-pass');
    var emailRegInput = checkStringMinMaxInput(regEmail, 5, NaN, 'data-r-email');
    var passRegInput = checkStringMinMaxInput(regPass, 8, 30, 'data-r-pass');
    var repassRegInput = checkStringMinMaxInput(regRePass, 8, 30, 'data-r-repass');
    var formRegisters = regForm.children();

    if (userNameRegInput == -1 || emailRegInput == -1 || passRegInput == -1 || repassRegInput == -1 ||
        userNameRegInput == 0 || emailRegInput == 0 || passRegInput == 0 || repassRegInput == 0) {
        //error mess
        e.preventDefault();
    } else if (passRegInput !== repassRegInput) {
        //error mess passwords
        removeError(formRegisters, 'form-group', 'error')
        window.confirm('Repasswords does not match with password');
        e.preventDefault();
    } else {
        var isRegister = checkRegisterUser(userNameRegInput, emailRegInput, passRegInput)
        if (isRegister) {
            //remove mess error
            window.alert('Register Success');
        } else {
            //register fails
            window.alert('Register Fails');
        }
    }
});

//PROFILE CONTROL
var profileForm = $('#form-profile');
var profileFirstName = $('#p-firtName');
var profileLastName = $('#p-lastName');
var profileEmailName = $('#p-email');
var profilePhone = $('#p-phone');
var profileDesc = $('#p-desc');
var resetBtn = $('.rs-btn');
var rsButton = document.querySelector('.rs-btn');
var userProfileData = [];

$(resetBtn).click(function() {
    var arrDivProfileControl = profileForm.children();
    var arrProfile = profileForm.children().children();
    var arrDivContentControl = contentForm.children();
    var arrContent = contentForm.children().children();
    //remove value of arrProfile
    for (let i = 1; i < arrProfile.length; i += 3) {
        let arrValue = $(arrProfile[i]);
        arrValue.val('');
        arrDivProfileControl.removeClass('error');
    }
    //remove value of arrContent
    for (let i = 1; i < arrContent.length; i += 3) {
        let arrValue = $(arrContent[i]);
        arrValue.val('');
        arrDivContentControl.removeClass('error');
    }
});

$(profileForm).submit(function(e) {
    e.preventDefault();
    var inputProfileFirstName = checkStringMinMaxInput(profileFirstName,
        3, 30, 'data-p-firstName');
    var inputProfileLastName = checkStringMinMaxInput(profileLastName,
        3, 30, 'data-p-lastName');
    var inputProfilePhone = checkNumberInputLenght(profilePhone,
        9, 13, 'data-p-phone');
    var inputProfileDesc = checkStringMinMaxInput(profileDesc,
        1, 200, 'data-p-desc');

    if (inputProfileFirstName == -1 || inputProfileDesc == -1 ||
        inputProfileLastName == -1 || inputProfileFirstName == 0 ||
        inputProfileLastName == 0 ||
        inputProfileDesc == 0 || isNaN(inputProfilePhone)) {
        //show Edit Profile Fails mess
        //window.alert('Edit Profile Fails');
    } else {

        window.alert('Edit Profile Successful')
        $(resetBtn).trigger('click');

        //ajax
        var postData = $(this).serializeArray();
        var formURL = $(this).attr("action");
        $.ajax({
            url: formURL,
            type: 'POST',
            data: postData,
            success: function(data, textStatus) {
                console.log(postData);
            },
            error: function(textStatus) {
                console.log("Error");
            }
        });
    }
});


//CONTENT CONTROL
var contentDataArr = [];
var contentForm = $('#form-content')
var contentTitle = $('#c-title');
var contentBrief = $('#c-brief');
var contentContentDesc = $('#c-content');
var contentID = 1;

$(contentForm).submit(function(e) {
    e.preventDefault();
    var inputContentTitle = checkStringMinMaxInput(contentTitle, 10, 200, 'data-c-title');
    var inputContentBrief = checkStringMinMaxInput(contentBrief, 30, 150, 'data-c-brief');
    var inputContentDesc = checkStringMinMaxInput(contentContentDesc, 50, 1000, 'data-c-content');
    if (inputContentTitle.length > 0 && inputContentBrief.length > 0 &&
        inputContentDesc.length > 0) {
        let contentObj = {
            id: contentID++,
            title: inputContentTitle,
            brief: inputContentBrief,
            desc: inputContentDesc
        }
        contentDataArr.push(contentObj);
        window.confirm('Add New Content Success, Please Check Table');
        $(resetBtn).trigger('click');
    } else {
        //window.alert('Found some error, please check data input');
    }
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var rightBody = document.querySelector('.body-right');

$('.view-content').click(async function() {
    let loading = '<h1>LOADING...</h1>';
    rightBody.innerHTML = loading;
    await sleep(2500);
    $('.body-right').load('../content/view-content.html');
})

$('.form-content').click(async function() {
    let loading = '<h1>LOADING...</h1>';
    rightBody.innerHTML = loading;
    await sleep(2500);
    $('.body-right').load('../content/add-content.html');
})

/** LOGIN SCRIPT
 * 
 */
function getValue() {
    var value = $.ajax({
        url: 'dals/accountRegister.json',
        async: false
    }).responseText;
    return value;
}
var userData = JSON.parse(getValue());

function checkLoginUser(email, pass) {
    for (let i = 0; i < userData.account.length; i++) {
        const element = userData.account[i];
        if (element.email == email &&
            element.password == pass) {
            return true;
        }
    }
    return false;
}

function checkRegisterUser(name, email, pass) {
    for (let i = 0; i < userData.account.length; i++) {
        const element = userData.account[i];
        if (element.email == email) {
            return false;
        } else {
            userData.account.push({
                firstName: name,
                lastName: "",
                email: email,
                password: pass,
                phone: "",
                desc: "",
                roll: "0"
            })
            return true;
        }
    }
}

// TABLE CONTROL
$('.view-content').click(async function() {
    await sleep(2700);
    var currentDate = new Date().toLocaleString();
    for (let i = 0; i < contentDataArr.length; i++) {
        sleep(300);
        const element = contentDataArr[i];
        //console.log(element);
        $('#content-table > tbody:last-child').append(
            "<tr>" +
            `<td scope='row'>${element.id}</td>` +
            `<td>${element.title}</td>` +
            `<td>${element.brief}` +
            "</td>" +
            `<td>${currentDate}` +
            "</tr>"
        );
    }
});

//PROFILE AJAX