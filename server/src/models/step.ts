import mongoose from "mongoose";

export interface Step {
  type: "Button" | "Input";
  attribute: "ID" | "ClassName" | "CSSSelector";
  value: string;
}

interface StepsAttrs {
  url: string;
  steps: Step[];
}

interface StepsDoc extends mongoose.Document {
  url: string;
  steps: Step[];
}

interface StepsModel extends mongoose.Model<StepsDoc> {
  build(attrs: StepsAttrs): StepsDoc;
}

const stepSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  steps: [
    {
      type: {
        type: String,
        required: true,
      },
      attribute: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

stepSchema.statics.build = (attrs: StepsAttrs) => {
  return new Steps(attrs);
};

export const Steps = mongoose.model<StepsDoc, StepsModel>("Steps", stepSchema);
