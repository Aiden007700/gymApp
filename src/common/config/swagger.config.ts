import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('GymApp')
.setDescription('The gymApp API description')
.setVersion('1.0')
.addTag('gymApp')
.addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    
})
.build();