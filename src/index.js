const restify =  require('restify');
const server = restify.createServer();

//settings
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const API = '/api'
const users = [
  {
    id:1,
    name: 'Anderson',
    lastname: 'Rodriguez'
  },
  {
    id:2,
    name: 'Santiago',
    lastname: 'Rodriguez'
  },
  {
    id:3,
    name: 'Ana Milena',
    lastname: 'Bernal'
  }
];
let usersCount = 3;

//routes
server.get(`${API}/users`, (req, res, next) =>{
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify({users:users}));
});

server.get(`${API}/users/:id`, (req, res, next) =>{
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(200);
  res.end(JSON.stringify(users.find((item)=> item.id === parseInt(req.params.id))));
});

server.post(`${API}/user`, (req, res, next) =>{
  let user = req.body;
  usersCount++;
  user.id = usersCount;
  users.push({id: user.id, name: user.name, lastname: user.lastname });
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(201);
  res.end(JSON.stringify(user));
});

server.put(`${API}/user/:id`, (req, res, next) =>{
  const user = users.find(item => item.id === parseInt(req.params.id) );
  const update = req.body;
  console.log(user);
  console.log(update);
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(201);
  res.end(JSON.stringify(user));
});

server.del(`${API}/user/:id`, (req, res, next) =>{
  let index = users.findIndex( item => item.id === parseInt(req.params.id) );
  users.splice(index, 1);
  res.setHeader('Content-Type', 'application/json');
  res.writeHead(201);
  res.end(JSON.stringify(true));
});

//start
server.listen(3000, ()=>{
  console.log("server listen in port 3000");
});
