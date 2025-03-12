
import { serve } from '@hono/node-server'
import {  Hono } from 'hono'


const reminders:string[]=[];
const numbers:number[]=[];
const app = new Hono()

app.get('/health',(c)=>{
  return c.json({message:"hello world"},200);
})


app.get('/puppet',(c)=>{
  const queryParameters= c.req.query();
  return c.json({queryParameters},200);
})
// input for above endpoint (http://localhost:3000/puppet?name=mvg&age=20)




 
app.get('/reminders',(context)=>{
  return context.json(reminders,200);
});

app.post('/reminders',async (context)=>{
  const body = await context.req.json();

  const reminder = body["reminder"];

  reminders.push(reminder);
  return context.json(reminders,201);
});

serve(app);





app.get('current-time',(c)=>{
  return c.json({time:new Date().toLocaleTimeString()},200);
})


app.get('/generate',(c)=>{
  return c.json({number:Math.random()*100},200);
});

app.get('/environment',(context)=>{
  const currentNodeVersion = process.version;
  const currentPlatform = process.platform;
  return context.json({nodeVersion:currentNodeVersion,platform:currentPlatform},200);
})



app.post('/number', async (c) => {
  const body = await c.req.json();
  const number = body["number"];
  numbers.push(number);
  return c.json(numbers, 201);
})

app.get('/numbers',(c)=>{
  return c.json(numbers,200);
})



 

console.log("Server is running on http://localhost:3000")
