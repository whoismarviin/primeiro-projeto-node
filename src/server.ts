import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes)


app.listen(3333, () =>{

    console.log('Server Has started on port 3333 Baby🚀')}

);

