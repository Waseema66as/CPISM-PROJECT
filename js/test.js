let $ = document;
let m_container =  $.querySelector('#m-container');
let btn_about = $.querySelector('#about-us');
let about_container = $.querySelector('#about-container');
console.log(m_container);
btn_about.onclick = function() {
    console.log('About Us button clicked!');
    console.log(about_container);
};