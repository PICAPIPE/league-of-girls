var ROLES_STANDARD = ['User'];

var DB_SERVICES    = [

    // Status

    {
       'name' : 'Status',
       'url'  : 'api/status',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url
               }
           }
       ]

    },

    // Users

    {
       'name' : 'Users',
       'url'  : 'api/users'
    },

    // Current User

    {
       'name' : 'CurrentUser',
       'url'  : 'api/users',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'get',
               name:       'check',
               queryIndex: 2,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'put',
               name:       'save',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current'
               }
           },
           {
               type:       'post',
               name:       'addGame',
               queryIndex: 2,
               dataIndex:  3,
               keep:       true,
               getUrl: function(url)
               {
                   return url + '/current/games'
               }
           }
       ]

    },

    // Current User

    {
       'name' : 'Auth',
       'url'  : 'api/auth',
       'except': ['all','get','show','store','update','destroy'],
       'custom': [
           {
               type:       'post',
               name:       'login',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/login'
               }
           },
           {
               type:       'post',
               name:       'register',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/register'
               }
           },
           {
               type:       'post',
               name:       'reset',
               queryIndex: 2,
               dataIndex:  3,
               keep:       false,
               getUrl: function(url)
               {
                   return url + '/reset'
               }
           }
       ]

    }

];
