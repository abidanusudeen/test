const express = require('express');
const cors = require('cors');
const app = express();

const port = 8080;

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

var count = 3;
const array = [
    {cname: "ABC", cmail: "abc@zohocorp.com", cphno: "2323232323", caddr: "No. 23 Street, Chennai, Tamil Nadu", id: 0},
    {cname: "DEFGHI", cmail: "defghi@gmail.com", cphno: "4545454545", caddr: "No. 45, Main Road, Madurai, Tamil Nadu", id: 1},
    {cname: "JKLMNOPQR", cmail: "jklmnopqr@yahoo.com", cphno: "6767676767", caddr: "No. 67 Street, Trichy, Tamil Nadu", id: 2}
];

app.get('/', (req, res) => res.sendFile('index.html', {root : __dirname + '/public'}) );

app.post('/', (req, res) => {
    const customer = req.body;
    array.push({ ...customer, id: count++ });
});

app.get('/list', (req, res) => res.sendFile('list.html', {root : __dirname + '/public'}) );

app.get('/listdetails', (req, res) => res.send(JSON.stringify(array)) );

app.post('/list', (req, res) => {
    const id = req.body.cdele;
    if(id !== undefined)
        for(var i = 0; i < id.length; i++)
            for(var j = 0; j < array.length; j++)
                if(array[j].id == id[i]) {
                    array.splice(j, 1);
                    j--;
                }
});

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});