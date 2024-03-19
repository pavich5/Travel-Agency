import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({

  publicRoutes: ["/",'/api', '/api/createlink','/api/getStripeApi','/cancelled','/vacation/list/:type','/vacation/:name', '/hotel/:name','/offer/:id', '/ai','/booking/confirmation/:id','/booking/confirmed',],
});
 
