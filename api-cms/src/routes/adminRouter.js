import express from "express";
import { getAllAdmin, insertAdmin } from "../models/adminModels/Admin.model.js";
import { newAdminValidation } from "../middlewares/joiValidator.js";
import { encryptPassword } from "../helpers/bcryptHelper.js";
import { v4 as uuidv4 } from "uuid";
import { sendMail } from "../helpers/nodeMailer.js";

const router = express.Router();

// get all admin withiout filter
router.get("/alladmin", async (req, res) => {
  try {
    const result = await getAllAdmin(req.body);
    console.log(result);

    if (result?.length) {
      res.json({
        status: "success",
        message: "Showing all Admin",
      });
    } else {
      res.json({
        status: "error",
        message: "Get all admin failed, please try again later",
      });
    }
  } catch (error) {
    res.json({
      status: "error",
      message: error.message,
    });
  }
});

// ROUTER to post new admin with JOI validator as middle ware
router.post("/", newAdminValidation, async (req, res, next) => {
  try {
    const passwordCrypt = encryptPassword(req.body.password);

    req.body.password = passwordCrypt;
    req.body.emailVerificationCode = uuidv4();
    const result = await insertAdmin(req.body);

    if (result?._id) {
      const url = `${process.env.ROOT_URL}/admin/verify-email/?e=${result.email}&e=${result.emailVerificationCode}`;

      sendMail({ fName: result.fName, url });
      res.json({
        status: "success",
        message: "New Admin created successfully",
      });
    } else {
      res.json({
        status: "error",
        message: "Admin creation failed, please try again later",
      });
    }
  } catch (error) {
    // sending the error to next available routes
    error.status = 500;
    if (error.message.includes("E11000 duplicate key")) {
      error.status = 200;
      error.message = "Email already exist, please try again";
    }
    next(error);
  }
});

router.patch("/", (req, res) => {
  res.json({
    status: "success",
    message: "Patch method got hit",
  });
});

export default router;
