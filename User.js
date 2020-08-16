const{readPlain,writeToFile,readJsonFile,extractData} = require('./main');
const userTransformer= (row) => ({
    id: row.id,
    first_name: row.first_name,
    last_name: row.last_name,
    email: row.email,
    gender: row.gender,
    ip_address: row.ip_address,
    color: row.color,
    parentId: row.parentId
})

function main(){
    readPlain('input',userTransformer).then(users => {
        writeToFile(users,'user')
    });
    readJsonFile('user');
}
main();