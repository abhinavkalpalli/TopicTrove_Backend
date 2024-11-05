import { Router } from "express";
import userController from "../controllers/userController";
import { protect } from "../middleware/authMiddleware";
const router=Router()

const UserController= new userController();

router.post('/register',UserController.register.bind(UserController))
router.post("/otpVerify", UserController.otpVerify.bind(UserController));
router.get("/resendOtp", UserController.resendOtp.bind(UserController));
router.post("/login",UserController.login.bind(UserController))
router.put('/editProfile',protect,UserController.editProfile.bind(UserController))
router.post(
    "/forgotPassword",
    UserController.forgotPassword.bind(UserController)
  );
  router.post(
    "/passwordReset",
    UserController.passwordReset.bind(UserController)
  );
  router.post('/createTopic',protect,UserController.createTopic.bind(UserController))
  router.get('/:userId/getPreferences',protect,UserController.getPreferences.bind(UserController))
  router.patch('/editTopic',protect,UserController.editTopic.bind(UserController))
  router.get('/getAllPreferences',UserController.getAllPreferences.bind(UserController))
  router.post('/createPost',protect,UserController.createPost.bind(UserController))
  router.patch('/editPost',protect,UserController.editPost.bind(UserController))
  router.get('/fetchPosts',UserController.fetchPosts.bind(UserController))
  router.patch('/likePost',protect,UserController.likePost.bind(UserController))
  router.patch('/dislikePost',protect,UserController.dislikePost.bind(UserController))
  router.patch('/blockPost',protect,UserController.blockPost.bind(UserController))
  router.get('/:postId/deletePost',protect,UserController.deletePost.bind(UserController))

export const userRoutes = router;
