var router = require("koa-router");
var parse = require("co-body");

var router = require('koa-router')();
var bcrypt = require('co-bcrypt');
var jwt = require('koa-jwt');
var secret = process.env.jwt;

router.get('/', function*(next){
   this.body = "hello"; 
});

router.post('/public/api/user/login', function*(next) {
    var user = yield parse(this);
    
    if(!user.username || !user.password) {
        this.throw(401, 'Incorrect username or password');
        yield next;
    }
    var users = yield this.pg.db.client.query_('Select username, hash, user_id from users where username = ($1)', [user.username]);
    users = users.rows;
    console.log(users);
  
    if(users.length === 0){
       this.throw(400, 'Incorrect username or password');
    }
    
    if (yield bcrypt.compare(user.password, users[0].hash)) {
        var token = jwt.sign({"user" : users[0].username, id: users[0].user_id}, secret);
        users[0].token = token;
        delete users[0].hash;
        this.body = users[0];
        this.status = 200;
    } else {
        this.throw(400, 'Incorrect username or password');
    }
});

router.post('/public/api/user/signup', function* (next) {
    var user = yield parse(this);
    
    if(!user.username) {
        this.throw(400, 'You must provide a username');
    }
    if(!user.password || !(user.confirmpassword === user.password)) {
        this.throw(400, 'You must provide a password, and the passwords must match');
    }
    //need to hash the password here
    var salt = yield bcrypt.genSalt(10);
    var hash = yield bcrypt.hash(user.password, salt);
    
    var result = yield this.pg.db.client.query_('INSERT INTO users(username, hash) values($1, $2) RETURNING user_id', [user.username, hash])
    console.log(result);
    //remove the password before returning the response to the view
    user.id = result.rows[0].user_id;
    delete user.password;
    delete user.confirmpassword;
    this.body = user;
    this.status = 201;
});

router.post('/newconversation', function*(next) {
    var user_id = this.state.user.user_id;
    var conversation = yield parse(this);
    if(typeof conversation === 'string') {
        conversation = JSON.parse(conversation);
    }
    var sql = `INSERT INTO public.conversation(
            conversation_name)
    VALUES ($1) RETURNING conversation_id;
    `;
    var data = yield this.pg.db.client.query_(sql, [conversation.name]);
    conversation.id = data.rows[0].conversation_id;
    this.status = 201;
    this.body = conversation;
});

router.post('/newmessage', function*(next) {
    console.log('test');
    var user_id = this.state.user.user_id;
    var message = yield parse(this);
    if(typeof message ==='string') {
        message = JSON.parse(message);
    }
    var sql = `INSERT INTO public.message(
             message_text, message_user, message_conversation, 
            message_owner,message_sender)
    VALUES ($1, $2, $3, $4, $5) RETURNING message_id;`;
    var data = yield this.pg.db.client.query_(sql, [message.text, message.user_id, 
     message.conversation, message.message_owner, message.message_sender]);
    message.id = data.rows[0].message_id;
    this.status = 201;
    this.body = message;
});

router.get('/getallconversation', function*(next) {
    var username = this.state.user.user;
    console.log(this.state.user);
    // var sql = `select m1.conversation_id, m1.conversation_name, m1.m_id, message_text from (select  conversation_id, conversation_name,MAX(message_id) as m_id
    //     from conversation 
    //     inner join message on message.message_conversation = conversation.conversation_id
    //     where conversation.conversation_name like $1
    //     Group By Conversation_id
    //     order by MAX(message_id) ASC) as m1
    //     inner join message on m1.m_id = message.message_id
    //     order by m1.m_id DESC;`
        
    var sql = `
    select m1.conversation_id, m1.conversation_name, m1.m_id, message_text from (select  conversation_id, conversation_name,MAX(message_id) as m_id
        from conversation 
        left outer join message on message.message_conversation = conversation.conversation_id
        where conversation.conversation_name like $1
        Group By Conversation_id
        ORDER BY MAX(message.message_id) NULLS FIRST) as m1
        left outer join message on m1.m_id = message.message_id
        order by m1.m_id DESC NULLS FIRST;
    `;
    var conversations = yield this.pg.db.client.query_(sql, ['%'+ username + '%']);
    conversations = conversations.rows;
    this.body = conversations;
    this.status = 200;
});

router.get('/getallMessageByConversation/:conversation_id', function*(next){
    var user_id = this.state.user.id;
    var conversation_id = this.params.conversation_id;
    console.log(this.state.user);
    //select * is bad.....
    var sql = `select * from message 
    where message_conversation = $1 and message_user = $2;`
    var messages = yield this.pg.db.client.query_(sql, [conversation_id, user_id]);
    messages = messages.rows;
    this.body = messages;
    this.status = 200;
});

router.get('/getnewestMessage', function*(next){
   var user_id = this.state.user.id;
   
   var sql = `select * from message where message_user = $1 and message_owner = 'f' ORDER BY message_id DESC LIMIT 1;`;
   var messages = yield this.pg.db.client.query_(sql, [user_id]);
   messages = messages.rows;
   this.body = messages;
   this.status = 200; 
});
router.get('/getuserid/:username', function*(next) {
   var username = this.params.username;
   var sql = `select user_id, username from users where username = $1`;
   var user = yield this.pg.db.client.query_(sql, [username]);
   user = user.rows[0];
   this.body = user;
   this.status = 200;
    
});



module.exports = router;