import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({

  publicRoutes: ["/",'/api/createlink','/api/getStripeLink','/cancelled','/vacation/list/:type','/vacation/:name', '/hotel/:name','/offer/:id', '/ai','/booking/confirmation/:id','/booking/confirmed',],
});
 
