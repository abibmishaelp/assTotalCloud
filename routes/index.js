let async = require("async");
var express = require('express');
var axios = require('axios');
const e = require("express");
var router = express.Router();
let totalUser;

/* GET home page. */
router.get('/', async (req, res) => {
  let userData;
  try {
    // console.log(req.params.sort);
    // let funcName = req.params.sort;
    userData = await axios({
      method: 'get',
      url: 'https://reqres.in/api/users?delay=3',
      responseType: 'json'
    })
      .then((response) => {
        console.log("Data", response.data);
        // let result = sorting_Function(response.data.data, funcName);
        // console.log(result);
        totalUser = response.data.total;
        return response.data;
      })
      .catch((error) => {
        console.log("error@20", error);
        return error;
      });
  } catch (e) {
    console.log("TryCatch Error@24", e);
    return res.render('error', {
      message: error.message,
      status: error.status,
      stack: eror.stack
    });
  }
  finally {
    console.log(userData.data);
    res.render('index', {
      title: 'Assigment for TotalCloud Inc',
      subTitle: "Assignment",
      users: userData.data
    });
  }
});

router.get('/getDetails/:id', async (req, res, next) => {
  let userDetails;
  try {
    console.log(req.params.id);
    let userId = req.params.id;
    if (totalUser <= userId || totalUser === userId ) {
      return res.render('error', {
        message: "User Not Found",
        status: "NOT FOUND",
        stack: "404"
      });
    } else {
      userDetails = await axios({
        method: 'get',
        url: `https://reqres.in/api/users/${userId}`,
        responseType: 'json'
      }).then((response) => {
        console.log("Data", response.data);
        return response.data;
      }).catch((error) => {
        console.log("Error@50", error);
        return error;
      });
    }
  } catch (e) {
    console.log("error@54", e);
    return res.render('error', {
      message: error.message,
      status: error.status,
      stack: eror.stack
    });
  }
  finally {
    console.log(userDetails);
    res.render('userDetails', {
      title: 'UserDetails',
      subTitle: "User",
      userDetails: userDetails.data
    });
  }
});

// async function sorting_Function(userData, type) {
//   switch (type) {
//     case "none":
//       return userData;
//       break;

//     case "last":
//       // function compare(a, b) {
//       //   if (a.last_name < b.last_name) {
//       //     return -1;
//       //   }
//       //   if (a.last_name > b.last_name) {
//       //     return 1;
//       //   }
//       //   return 0;
//       // }
//       // return userData.sort(compare);
//       userData.sort((a, b) => {
//         let fa = a.last_name.toLowerCase(),
//           fb = b.last_name.toLowerCase();

//         if (fa < fb) {
//           return -1;
//         }
//         if (fa > fb) {
//           return 1;
//         }
//         return 0;
//       });
//       break;

//     case "first":
//       // function compare(a, b) {
//       //   if (a.first_name < b.first_name) {
//       //     return 1;
//       //   }
//       //   if (a.first_name > b.first_name) {
//       //     return -1;
//       //   }
//       //   return 0;
//       // }
//       // return userData.sort(compare);
//       userData.sort((a, b) => {
//         let fa = a.first_name.toLowerCase(),
//           fb = b.first_name.toLowerCase();

//         if (fa < fb) {
//           return -1;
//         }
//         if (fa > fb) {
//           return 1;
//         }
//         return 0;
//       });
//       break;
//   }

// }

module.exports = router;
