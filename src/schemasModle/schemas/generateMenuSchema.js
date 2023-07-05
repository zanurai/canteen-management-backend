import { Schema } from "mongoose";

let generateMenuSchema = Schema(
    {
        foodItem: {
            type: Schema.Types.ObjectId,
            ref: "Food",
            unique: true,

        },

        availableTime: {
            from: {
                type: Date,
            },
            to: {
                type: Date,
            },

        },

        rate: {
            type: Number,
            trim: true,
        },

        initialQuantity: {
            type: Number,
            trim: true,

        },

        availableQuantity: {
            type: Number,
            trim: true,
        },

        addQuantity: {
            type: Number,
            trim: true,
        },


    },
    { timestamps: true }
);

export default generateMenuSchema;
