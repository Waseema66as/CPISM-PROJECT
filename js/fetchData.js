function fetchData() {
    return fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
            
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}










// [
//     {
//         "name": "Seasonal Trends",
//         "id": 1,
//         "description": "Trends based on seasonal changes and weather conditions.",
//         "img": "https://drive.google.com/file/d/1DQlp0zondyARLSR5aJVBYgStcJHd017F/view?usp=sharing",
//         "sub_categories": [
//             {
//                 "name": "Spring/Summer",
//                 "id": 11,
//                 "description": "Trends for the Spring and Summer seasons.",
//                 "img": "https://drive.google.com/file/d/1DQlp0zondyARLSR5aJVBYgStcJHd017F/view?usp=sharing",
            
//             },
//             {
//                 "name": "Fall/Winter",
//                 "id": 12,
//                 "description": "Trends for the Fall and Winter seasons.",
//                 "img": "https://drive.google.com/file/d/1oyxsCNI-0tr4AWkAwJdsAitP84jnALJm/view?usp=drive_link",
          
//             }
//         ]
//     },
//     {
//         "name": "Runway Trends",
//         "id": 2,
//         "description": "Trends showcased on high fashion runways.",
//         "img": "https://drive.google.com/file/d/1oyxsCNI-0tr4AWkAwJdsAitP84jnALJm/view?usp=drive_link",
//         "sub_categories": [
//             {
//                 "name": "Haute Couture",
//                 "id": 21,
//                 "description": "Exclusive and high-end runway fashion.",
//                 "img": "https://drive.google.com/file/d/1oyxsCNI-0tr4AWkAwJdsAitP84jnALJm/view?usp=drive_link",
            
//             },
//             {
//                 "name": "High Fashion",
//                 "id": 22,
//                 "description": "Trends and collections from high fashion designers.",
//                 "img": "https://drive.google.com/file/d/1oyxsCNI-0tr4AWkAwJdsAitP84jnALJm/view?usp=drive_link",
             
//             }
//         ]
//     }
// ]