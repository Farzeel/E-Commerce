import mongoose,{Schema} from "mongoose";

const shipmentAddressSchema = new Schema({
    recipientName: {
      type: String,
      required: true
    },
    streetAddress: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
  
  });

   export const shipmentAddress = mongoose.model("shipmentAddress" , shipmentAddressSchema)