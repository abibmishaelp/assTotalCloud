let async = require("async");
var express = require('express');
var axios = require('axios');
var router = express.Router();

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
        return response.data;
      })
      .catch((error) => {
        console.log("error@20", error);
        return error;
      });
  } catch (e) {
    console.log("TryCatch Error@24", e);
    return e;
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
  } catch (e) {
    console.log("error@54", e);
    return e;
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


module.exports = router;
