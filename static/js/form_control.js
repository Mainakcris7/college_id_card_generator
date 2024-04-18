let contact1 = document.querySelector("input#contact1")
let contact2 = document.querySelector("input#contact2")
let pincode = document.querySelector("input#pincode")
let submit_btn = document.querySelector("button#submit-button")

// If both them are true, allow submit else not
var check_pincode = true
var check_contact1 = true
var check_contact2 = true

contact1.addEventListener("input", () => {
    if (contact1.value.length != 10 && contact1.value.length != 0) {
        submit_btn.disabled = true
        check_contact1 = false
        submit_btn.style.cursor = "not-allowed"
        contact1.style.backgroundColor = '#f7b0ab'
    } else {
        check_contact1 = true
        if (check_contact1 && check_contact2 && check_pincode) {
            submit_btn.disabled = false
            submit_btn.style.cursor = "pointer"
        }
        contact1.style.backgroundColor = 'aliceblue'
    }
})

contact2.addEventListener("input", () => {
    if (contact2.value.length != 10 && contact2.value.length != 0) {
        check_contact2 = false;
        submit_btn.disabled = true
        submit_btn.style.cursor = "not-allowed"
        contact2.style.backgroundColor = '#f7b0ab'
    } else {
        check_contact2 = true
        if (check_contact1 && check_contact2 && check_pincode) {
            submit_btn.disabled = false
            submit_btn.style.cursor = "pointer"
        }
        contact2.style.backgroundColor = 'aliceblue'
    }
})

pincode.addEventListener("input", () => {
    if (pincode.value.length != 6 && pincode.value.length != 0) {   //If the field is not empty and the length is not 6
        check_pincode = false
        submit_btn.disabled = true
        submit_btn.style.cursor = "not-allowed"
        pincode.style.backgroundColor = '#f7b0ab'
    } else {
        check_pincode = true
        if (check_contact1 && check_contact2 && check_pincode) {
            submit_btn.disabled = false
            submit_btn.style.cursor = "pointer"
        }
        pincode.style.backgroundColor = 'aliceblue'
    }
})