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
    userData = await axios({
      method: 'get',
      url: 'https://reqres.in/api/users?delay=3',
      responseType: 'json'
    })
      .then((response) => {
        console.log("Data", response.data);
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
    console.log("INHbs", userData.data);
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
    if (totalUser <= userId || totalUser === userId) {
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

router.get('/firstname', async (req, res) => {
  let userData;
  try {
    userData = await axios({
      method: 'get',
      url: 'https://reqres.in/api/users?delay=3',
      responseType: 'json'
    })
      .then((response) => {
        console.log("Data", response.data);
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
    console.log("SortINHbs", userData.data);
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const firstNameA = a.first_name.toUpperCase();
      const firstNameB = b.first_name.toUpperCase();
      let comparison = 0;
      if (firstNameA > firstNameB) {
        comparison = 1;
      } else if (firstNameA < firstNameB) {
        comparison = -1;
      }
      return comparison;
    }
    userData.data.sort(compare);
    console.log("FirstSOrt", userData.data);
    res.render('index', {
      title: 'Assigment for TotalCloud Inc',
      subTitle: "Assignment",
      users: userData.data
    });
  }
});


router.get('/lastname', async (req, res) => {
  let userData;
  try {
    userData = await axios({
      method: 'get',
      url: 'https://reqres.in/api/users?delay=3',
      responseType: 'json'
    })
      .then((response) => {
        console.log("Data", response.data);
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
    console.log("SortINHbs", userData.data);
    function compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const lastNameA = a.last_name.toUpperCase();
      const lastNameB = b.last_name.toUpperCase();
      let comparison = 0;
      if (lastNameA > lastNameB) {
        comparison = 1;
      } else if (lastNameA < lastNameB) {
        comparison = -1;
      }
      return comparison;
    }
    userData.data.sort(compare);
    console.log("LastSort", userData.data);
    res.render('index', {
      title: 'Assigment for TotalCloud Inc',
      subTitle: "Assignment",
      users: userData.data
    });
  }
});

module.exports = router;
