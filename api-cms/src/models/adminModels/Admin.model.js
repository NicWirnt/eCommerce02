import AdminSchema from "./Admin.schema.js";

export const insertAdmin = (obj) => {
  return AdminSchema(obj).save();
};

export const getAllAdmin = () => {
  return AdminSchema.find();
};

export const getAdminById = (_id) => {
  return AdminSchema.findById(_id);
};

export const getAdmin = (filter) => {
  return AdminSchema.findOne(filter);
};

export const updateAdmin = (filter, obj) => {
  return AdminSchema.findOneAndUpdate(filter, obj, { new: true });
};
