import mongoose from "mongoose";

const rateSchema = new mongoose.Schema({
  name: String,
  ratings: { 
    type: mongoose.Mixed, 
    1: Number,
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    6: Number,
    7: Number,
    8: Number,
    9: Number,
    10: Number,
    default: {1:1, 2:1, 3:1, 4:1, 5:1, 6:1, 7:1, 8:1, 9:1, 10:1 }
   },
  
});

export default mongoose.model("Rate", rateSchema);