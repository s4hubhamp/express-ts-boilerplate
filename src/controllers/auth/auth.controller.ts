// import { NextFunction, Request, Response } from 'express';
// import AuthService from '../../services/auth/auth.service';

// class AuthController {
//     private authService = new AuthService();

//     private parseSessionToken(req: Request): string {
//         return <string>req.headers.authorization;
//     }

//     public signUpWithMobileNumber = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const tokenData = await this.authService.signUpWithMobileNumber(req.body, this.parseSessionToken(req));
//             res.status(201).json(tokenData);
//         } catch (error) {
//             next(error);
//         }
//     };

//     public signInWithMobileNumber = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const tokenData = await this.authService.signInWithMobileNumber(req.body);
//             res.json(tokenData);
//         } catch (error) {
//             next(error);
//         }
//     };

//     public verifyMobileNumber = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const result = await this.authService.verifyMobileNumber(req.body, this.parseSessionToken(req));
//             res.json(result);
//         } catch (error) {
//             next(error);
//         }
//     };

//     public resendOtpMobileNumber = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const tokenData = await this.authService.resendMobileVerificationOtp(this.parseSessionToken(req));
//             res.json(tokenData);
//         } catch (error) {
//             next(error);
//         }
//     };

//     public checkUsernameAvailability = async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const result = await this.authService.checkUsernameAvailability(<any>req.params);
//             res.status(200).json(result);
//         } catch (error) {
//             next(error);
//         }
//     };
// }

// export default AuthController;
