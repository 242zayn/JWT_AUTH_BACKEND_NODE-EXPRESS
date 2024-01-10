import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

const keysecret = "mynameissarveshsharmaandmybrotha";

// console.log(keysecret.length)

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // trim:true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid email ");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  cpassword: {
    type: String,
    required: true,
    minlength: 6,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// //  make password  crypt
// Schema.pre('save', async function (next) {
//   if (this.is("password")) {
//     this.password = await bcrypt.hash(this.password, 12);
//     this.cpassword = await bcrypt.hash(this.cpassword, 12);
//   }
//   next();

// });


Schema.pre('save' , async function(next){
    if (this.isModified('password ')) {
       this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
       
    }
    next()

})


//  genrate JWT token

Schema.methods.genrateAuthtoken = async function () {
  try {
    let token123 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({ token: token123 });
    await this.save();

    return token123;
  } catch (error) {
    res.status(422).json(error);
  }
};

const UserModel = mongoose.model("loginUser", Schema);

export { keysecret };
export default UserModel;


