import UserModel from "../model/sceema.js";
import bcrypt from "bcryptjs"

class controller {
  static home = async (req, res) => {
    res.send("Hello World!");
    if (res.headersSent !== true) {
      res.send("Hello World!");
    }
  };

  static login = async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body);

    if (!email || !password) {
      res.status(201).json({ status: 201 });
    }

    try {
      const userValid = await UserModel.findOne({ email: email });
      console.log(" email match kiya");
      console.log(userValid);

      if (!userValid) {
        res
          .status(421)
          .json({
            status: 421,
            error: "You have no account create account before login ",
          });
      }

      if (userValid) {

        const isMached = await bcrypt.compare(password, userValid.password)
        //  console.log(isMached)
        //  console.log(userValid.password)
         console.log("is match are working ")

        if(!isMached){

          res
            .status(422)
            .json({
              status: 422,
              error: "invalid detils",
              message: "invalid email or password ",
            });
        

        } else {


          const token = await userValid.genrateAuthtoken();

          // console.log(token);

             
            
            res.cookie("token", token, {
                expires: new Date(Date.now() + 5*60000),
                httpOnly: true,
              })
              

            console.log(" cooke session are  try to work ");
            const result = {
              userValid,
              token,};

              console.log(result);

              res.status(201).json({ status: 201 ,  result });


         

        }

      }
    } catch (error) {
      console.log(error);
      console.log("catch part are working ");
    }
  };

  static inserOne = async (req, res) => {
    const { name, email, password, cpassword } = req.body;

    // console.log(req.body);

    // if (!name || !email || !password || !cpassword) {
    //   res.status(422).json({ error: "fill the all detele" });
    // }

    try {
      console.log("try block are working");

      const preuser = await UserModel.findOne({ email: email });

      if (preuser) {
        res
          .status(422)
          .json({
            status: 422,
            error: "This user alrady exit database ",
            message: " User alrady exit in database  ",
          });
      } else {
        const model = new UserModel({
          name,
          email,
          password,
          cpassword,
        });

        const result = await model.save();
        res
          .status(201)
          .json({ status: 201, message: " Seccessfully Registation" });
        console.log(result);
      }
    } catch (error) {
      // res.status(422).json({ error:error });
      console.log(error);
      console.log("Catch block error");
    }
  };

  static dashboard = async (req, res) => {
    try {
      const validUserOne = await UserModel.findOne({ _id: req.userId });
      // console.log(validUserOne)
      res
        .status(200)
        .json({
          status: 201,
          validUserOne,
          message: " Successfully Authenticate ",
        });
    } catch (error) {
      res
        .status(401)
        .json({
          status: 401,
          error,
          message: " Unauthorized no token provide",
        });
    }
  };
}

export default controller;
